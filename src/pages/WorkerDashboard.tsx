/**
 * Worker Dashboard — full featured worker referral dashboard
 * Integrates with Supabase via workerApi.ts
 */

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts";
import {
  TrendingUp, ShoppingCart, Wallet, Copy, CheckCheck, LogOut,
  RefreshCw, ArrowDownToLine, Clock, Package, Star, ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import type { Worker, WorkerPurchase, PayoutRecord } from "@/lib/supabase";
import {
  getMyWorkerProfile, getWorkerPurchases, getWorkerPayouts, requestCashout,
} from "@/lib/workerApi";
import { StatCard } from "@/components/referral/StatCard";
import { DataTable } from "@/components/referral/DataTable";
import { DashboardCard } from "@/components/referral/DashboardCard";
import { DashboardButton } from "@/components/referral/DashboardButton";
import { Badge, payoutStatusBadge } from "@/components/referral/Badge";
import { Modal } from "@/components/referral/Modal";
import { format } from "date-fns";

// ── helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const fmtDate = (s?: string) => (s ? format(new Date(s), "dd MMM yyyy, hh:mm a") : "—");

// ── purchase columns ─────────────────────────────────────────────────────────
const purchaseCols = [
  { key: "customer_name", header: "Customer" },
  {
    key: "order_total", header: "Order Total",
    render: (r: WorkerPurchase) => <span className="font-medium text-white">{fmt(r.order_total)}</span>,
  },
  {
    key: "commission_amount", header: "Commission",
    render: (r: WorkerPurchase) => (
      <span className="text-emerald-400 font-semibold">{fmt(r.commission_amount)}</span>
    ),
  },
  {
    key: "created_at", header: "Date",
    render: (r: WorkerPurchase) => (
      <span className="text-white/50 text-xs">{fmtDate(r.created_at)}</span>
    ),
  },
];

// ── payout columns ───────────────────────────────────────────────────────────
const payoutCols = [
  {
    key: "amount", header: "Amount",
    render: (r: PayoutRecord) => <span className="font-semibold text-white">{fmt(r.amount)}</span>,
  },
  {
    key: "status", header: "Status",
    render: (r: PayoutRecord) => payoutStatusBadge(r.status),
  },
  {
    key: "requested_at", header: "Requested",
    render: (r: PayoutRecord) => (
      <span className="text-white/50 text-xs">{fmtDate(r.requested_at)}</span>
    ),
  },
  {
    key: "processed_at", header: "Processed",
    render: (r: PayoutRecord) => (
      <span className="text-white/50 text-xs">{fmtDate(r.processed_at)}</span>
    ),
  },
];

export default function WorkerDashboard() {
  const navigate = useNavigate();

  const [worker, setWorker] = useState<Worker | null>(null);
  const [purchases, setPurchases] = useState<WorkerPurchase[]>([]);
  const [payouts, setPayouts] = useState<PayoutRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [cashoutOpen, setCashoutOpen] = useState(false);
  const [cashoutAmount, setCashoutAmount] = useState("");
  const [cashoutLoading, setCashoutLoading] = useState(false);

  // ── analytics data derived from purchases ──────────────────────────────────
  const [analyticsData, setAnalyticsData] = useState<
    { month: string; sales: number; commission: number }[]
  >([]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: wData, error: wErr } = await getMyWorkerProfile();
      if (wErr || !wData) { navigate("/worker/login"); return; }
      
      const workerId = wData.id;

      const [pRes, payRes] = await Promise.all([
        getWorkerPurchases(workerId, 50),
        getWorkerPayouts(workerId),
      ]);

      setWorker(wData);
      if (pRes.data) {
        setPurchases(pRes.data.slice(0, 10));
        // Build monthly analytics
        const monthly: Record<string, { sales: number; commission: number }> = {};
        pRes.data.forEach((p) => {
          const month = format(new Date(p.created_at), "MMM yy");
          if (!monthly[month]) monthly[month] = { sales: 0, commission: 0 };
          monthly[month].sales += p.order_total;
          monthly[month].commission += p.commission_amount;
        });
        setAnalyticsData(
          Object.entries(monthly).map(([month, v]) => ({ month, ...v })).slice(-6)
        );
      }
      if (payRes.data) setPayouts(payRes.data);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => { loadData(); }, [loadData]);

  const copyCoupon = () => {
    if (!worker?.coupon_code) return;
    navigator.clipboard.writeText(worker.coupon_code);
    setCopied(true);
    toast.success("Coupon code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCashout = async () => {
    const amt = parseFloat(cashoutAmount);
    if (!amt || amt <= 0) { toast.error("Enter a valid amount"); return; }
    if (!worker) return;
    if (amt > (worker.pending_payout ?? 0)) {
      toast.error("Amount exceeds your pending payout balance");
      return;
    }
    setCashoutLoading(true);
    const { error } = await requestCashout(worker.id, amt);
    setCashoutLoading(false);
    if (error) { toast.error("Failed to submit cashout request"); return; }
    toast.success("Cashout request submitted!");
    setCashoutOpen(false);
    setCashoutAmount("");
    loadData();
  };

  const { signOut: authSignOut } = useAuth();
  
  const signOut = () => {
    authSignOut();
    navigate("/worker/login");
  };

  const pendingPayouts = payouts.filter((p) => p.status === "pending");

  return (
    <div className="min-h-screen bg-[#070711] text-white">
      {/* Background mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-fuchsia-600/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* ── Topbar ─────────────────────────────────────────────────────────── */}
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#070711]/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                W
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-none">
                  {worker?.name ?? "Worker Dashboard"}
                </p>
                <p className="text-xs text-white/40 mt-0.5">Referral Portal</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DashboardButton variant="ghost" size="sm" leftIcon={<RefreshCw className="w-4 h-4" />} onClick={loadData}>
                Refresh
              </DashboardButton>
              <DashboardButton variant="danger" size="sm" leftIcon={<LogOut className="w-4 h-4" />} onClick={signOut}>
                Sign Out
              </DashboardButton>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
          {/* ── Welcome banner ──────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Welcome back, {worker?.name?.split(" ")[0] ?? "—"} 👋
              </h1>
              <p className="text-white/50 mt-1 text-sm">
                Here's your referral performance overview
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success" dot>
                {worker?.is_active ? "Active" : "Inactive"}
              </Badge>
              <Badge variant="purple">
                {((worker?.commission_rate ?? 0) * 100).toFixed(0)}% Commission
              </Badge>
            </div>
          </div>

          {/* ── Stat cards ──────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Sales"
              value={fmt(worker?.total_sales ?? 0)}
              icon={<TrendingUp className="w-5 h-5 text-violet-400" />}
              loading={loading}
              gradient="from-violet-500/10 to-purple-500/5"
            />
            <StatCard
              title="Total Orders"
              value={worker?.total_orders ?? 0}
              icon={<ShoppingCart className="w-5 h-5 text-blue-400" />}
              loading={loading}
              gradient="from-blue-500/10 to-sky-500/5"
            />
            <StatCard
              title="Total Earnings"
              value={fmt(worker?.total_earnings ?? 0)}
              icon={<Star className="w-5 h-5 text-amber-400" />}
              loading={loading}
              gradient="from-amber-500/10 to-yellow-500/5"
            />
            <StatCard
              title="Pending Payout"
              value={fmt(worker?.pending_payout ?? 0)}
              subtitle="Available to cashout"
              icon={<Wallet className="w-5 h-5 text-emerald-400" />}
              loading={loading}
              gradient="from-emerald-500/10 to-green-500/5"
            />
          </div>

          {/* ── Coupon + Cashout ─────────────────────────────────────────────── */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Coupon Card */}
            <DashboardCard
              title="Your Coupon Code"
              description="Share this code with customers to earn commissions"
            >
              <div className="flex items-center gap-3 mt-2">
                <div className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/15 font-mono text-xl font-bold tracking-widest text-violet-300">
                  {worker?.coupon_code ?? "———"}
                </div>
                <DashboardButton
                  onClick={copyCoupon}
                  variant={copied ? "secondary" : "primary"}
                  leftIcon={copied ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                >
                  {copied ? "Copied!" : "Copy"}
                </DashboardButton>
              </div>
              <p className="text-xs text-white/40 mt-3">
                Customers save{" "}
                <span className="text-violet-300 font-medium">
                  {((worker?.commission_rate ?? 0) * 100).toFixed(0)}%
                </span>{" "}
                with this code. You earn a commission on every order.
              </p>
            </DashboardCard>

            {/* Cashout Card */}
            <DashboardCard
              title="Request Cashout"
              description={`Available balance: ${fmt(worker?.pending_payout ?? 0)}`}
            >
              <div className="mt-2 space-y-3">
                {pendingPayouts.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    {pendingPayouts.length} pending request(s) — please wait for processing
                  </div>
                )}
                <DashboardButton
                  className="w-full"
                  leftIcon={<ArrowDownToLine className="w-4 h-4" />}
                  onClick={() => setCashoutOpen(true)}
                  disabled={!worker?.is_active || (worker?.pending_payout ?? 0) <= 0}
                >
                  Request Cashout
                </DashboardButton>
              </div>
            </DashboardCard>
          </div>

          {/* ── Analytics Charts ─────────────────────────────────────────────── */}
          <div className="grid lg:grid-cols-2 gap-4">
            <DashboardCard title="Sales Trend" description="Monthly sales attributed to your coupon">
              <div className="h-56 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticsData}>
                    <defs>
                      <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }}
                      formatter={(v) => [fmt(Number(v)), "Sales"]}
                    />
                    <Area type="monotone" dataKey="sales" stroke="#7c3aed" strokeWidth={2} fill="url(#salesGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>

            <DashboardCard title="Commission Earned" description="Monthly commission breakdown">
              <div className="h-56 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData} barSize={28}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }}
                      formatter={(v) => [fmt(Number(v)), "Commission"]}
                    />
                    <Bar dataKey="commission" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
          </div>

          {/* ── Recent Purchases ─────────────────────────────────────────────── */}
          <DashboardCard
            title="Recent Purchases"
            description="Orders made using your coupon code"
            actions={
              <Badge variant="neutral">{purchases.length} orders</Badge>
            }
            noPadding
          >
            <DataTable
              columns={purchaseCols as Parameters<typeof DataTable>[0]["columns"]}
              data={purchases as Record<string, unknown>[]}
              loading={loading}
              emptyMessage="No purchases yet — share your coupon to start earning!"
              emptyIcon={<Package className="w-10 h-10" />}
              rowKey={(r) => (r as WorkerPurchase).id}
            />
          </DashboardCard>

          {/* ── Payout History ───────────────────────────────────────────────── */}
          <DashboardCard
            title="Payout History"
            description="All cashout requests and their status"
            noPadding
          >
            <DataTable
              columns={payoutCols as Parameters<typeof DataTable>[0]["columns"]}
              data={payouts as Record<string, unknown>[]}
              loading={loading}
              emptyMessage="No payout requests yet"
              emptyIcon={<ArrowDownToLine className="w-10 h-10" />}
              rowKey={(r) => (r as PayoutRecord).id}
            />
          </DashboardCard>

          {/* ── Quick Tips ───────────────────────────────────────────────────── */}
          <DashboardCard title="Tips to Boost Earnings">
            <ul className="space-y-3">
              {[
                "Share your coupon code on social media for maximum reach",
                "Follow up with customers after their first purchase",
                "Promote seasonal sales and new product launches",
                "Request payouts once your balance crosses ₹500",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                  <ChevronRight className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>
          </DashboardCard>
        </main>
      </div>

      {/* ── Cashout Modal ────────────────────────────────────────────────────── */}
      <Modal
        open={cashoutOpen}
        onClose={() => setCashoutOpen(false)}
        title="Request Cashout"
        description={`Available balance: ${fmt(worker?.pending_payout ?? 0)}`}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Amount to withdraw (₹)
            </label>
            <input
              type="number"
              value={cashoutAmount}
              onChange={(e) => setCashoutAmount(e.target.value)}
              max={worker?.pending_payout ?? 0}
              min={1}
              placeholder="Enter amount"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors"
            />
            <p className="text-xs text-white/40 mt-1.5">
              Minimum cashout: ₹100 · Processed within 2–3 business days
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            <DashboardButton variant="outline" className="flex-1" onClick={() => setCashoutOpen(false)}>
              Cancel
            </DashboardButton>
            <DashboardButton
              className="flex-1"
              loading={cashoutLoading}
              onClick={handleCashout}
              leftIcon={<ArrowDownToLine className="w-4 h-4" />}
            >
              Submit Request
            </DashboardButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
