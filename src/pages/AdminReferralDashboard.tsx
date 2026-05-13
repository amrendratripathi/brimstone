import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Users, TrendingUp, Wallet, ShoppingCart, Search, Download,
  Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Tag, LogOut, RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import type { Worker, PayoutRecord } from "@/lib/supabase";
import {
  getAllWorkers, createWorker, updateWorker, deleteWorker,
  toggleWorkerStatus, getAllPayouts, updatePayoutStatus,
  getAllCoupons, getRevenueStats, getTopWorkers, getAllPurchases
} from "@/lib/workerApi";
import { StatCard } from "@/components/referral/StatCard";
import { DataTable } from "@/components/referral/DataTable";
import { DashboardCard } from "@/components/referral/DashboardCard";
import { DashboardButton } from "@/components/referral/DashboardButton";
import { Badge, payoutStatusBadge } from "@/components/referral/Badge";
import { Modal } from "@/components/referral/Modal";
import { useNavigate } from "react-router-dom";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const fmtDate = (s?: string) => (s ? format(new Date(s), "dd MMM yy") : "—");

type Tab = "workers" | "sales" | "payouts" | "coupons" | "analytics";

const EMPTY_WORKER: Partial<Worker> = {
  name: "", email: "", phone: "", coupon_code: "",
  commission_rate: 0.1, is_active: true,
};

export default function AdminReferralDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("workers");
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [payouts, setPayouts] = useState<(PayoutRecord & { workers?: { name: string; email: string } })[]>([]);
  const [coupons, setCoupons] = useState<unknown[]>([]);
  const [topWorkers, setTopWorkers] = useState<Worker[]>([]);
  const [stats, setStats] = useState<{ totalRevenue: number; totalCommissions: number; totalOrders: number; pendingPayouts: number } | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Worker modal
  const [workerModal, setWorkerModal] = useState(false);
  const [editWorker, setEditWorker] = useState<Partial<Worker>>(EMPTY_WORKER);
  const [isEditing, setIsEditing] = useState(false);
  const [savingWorker, setSavingWorker] = useState(false);

  // Delete confirm
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const [wRes, pRes, cRes, topRes, statsRes, sRes] = await Promise.all([
      getAllWorkers(search),
      getAllPayouts(),
      getAllCoupons(),
      getTopWorkers(5),
      getRevenueStats(),
      getAllPurchases(),
    ]);
    if (wRes.data) setWorkers(wRes.data);
    if (pRes.data) setPayouts(pRes.data as typeof payouts);
    if (cRes.data) setCoupons(cRes.data);
    if (topRes.data) setTopWorkers(topRes.data);
    if (statsRes.data) setStats(statsRes.data);
    if (sRes.data) setSales(sRes.data);
    setLoading(false);
  }, [search]);

  useEffect(() => { load(); }, [load]);

  // ── Worker save ────────────────────────────────────────────────────────────
  const saveWorker = async () => {
    if (!editWorker.name || !editWorker.email || !editWorker.coupon_code) {
      toast.error("Name, email and coupon code are required");
      return;
    }
    setSavingWorker(true);
    if (isEditing && editWorker.id) {
      const { error } = await updateWorker(editWorker.id, editWorker);
      if (error) { toast.error("Failed to update worker"); }
      else { toast.success("Worker updated"); }
    } else {
      const { error } = await createWorker(editWorker);
      if (error) { toast.error("Failed to create worker: " + (error as Error).message); }
      else { toast.success("Worker created"); }
    }
    setSavingWorker(false);
    setWorkerModal(false);
    load();
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const { error } = await deleteWorker(deleteId);
    if (error) toast.error("Delete failed");
    else { toast.success("Worker deleted"); load(); }
    setDeleting(false);
    setDeleteId(null);
  };

  const handleToggle = async (w: Worker) => {
    await toggleWorkerStatus(w.id, !w.is_active);
    toast.success(`Worker ${w.is_active ? "deactivated" : "activated"}`);
    load();
  };

  const handlePayoutAction = async (id: string, status: PayoutRecord["status"]) => {
    const { error } = await updatePayoutStatus(id, status);
    if (error) toast.error("Failed to update payout");
    else { toast.success(`Payout marked as ${status}`); load(); }
  };

  const exportCSV = () => {
    const rows = [["Name", "Email", "Coupon", "Sales", "Orders", "Earnings", "Pending", "Status"]];
    workers.forEach((w) =>
      rows.push([w.name, w.email, w.coupon_code, String(w.total_sales), String(w.total_orders), String(w.total_earnings), String(w.pending_payout), w.is_active ? "Active" : "Inactive"])
    );
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "workers.csv"; a.click();
  };

  // ── Columns ────────────────────────────────────────────────────────────────
  const workerCols = [
    { key: "name", header: "Worker", render: (r: Worker) => (
      <div>
        <p className="font-medium text-white">{r.name}</p>
        <p className="text-xs text-white/40">{r.email}</p>
      </div>
    )},
    { key: "coupon_code", header: "Coupon", render: (r: Worker) => (
      <span className="font-mono text-sm text-violet-300 bg-violet-500/10 px-2 py-0.5 rounded">{r.coupon_code}</span>
    )},
    { key: "total_sales", header: "Sales", render: (r: Worker) => <span className="font-semibold">{fmt(r.total_sales)}</span> },
    { key: "total_orders", header: "Orders" },
    { key: "total_earnings", header: "Earned", render: (r: Worker) => <span className="text-emerald-400">{fmt(r.total_earnings)}</span> },
    { key: "is_active", header: "Status", render: (r: Worker) => (
      <Badge variant={r.is_active ? "success" : "error"} dot>{r.is_active ? "Active" : "Inactive"}</Badge>
    )},
    { key: "actions", header: "Actions", render: (r: Worker) => (
      <div className="flex items-center gap-1">
        <button onClick={() => { setEditWorker(r); setIsEditing(true); setWorkerModal(true); }}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors">
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => handleToggle(r)}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors">
          {r.is_active ? <ToggleRight className="w-4 h-4 text-emerald-400" /> : <ToggleLeft className="w-4 h-4" />}
        </button>
        <button onClick={() => setDeleteId(r.id)}
          className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    )},
  ];

  const payoutCols = [
    { key: "workers", header: "Worker", render: (r: typeof payouts[0]) => (
      <div>
        <p className="font-medium text-white">{r.workers?.name ?? "—"}</p>
        <p className="text-xs text-white/40">{r.workers?.email}</p>
      </div>
    )},
    { key: "amount", header: "Amount", render: (r: typeof payouts[0]) => <span className="font-semibold">{fmt(r.amount)}</span> },
    { key: "status", header: "Status", render: (r: typeof payouts[0]) => payoutStatusBadge(r.status) },
    { key: "requested_at", header: "Requested", render: (r: typeof payouts[0]) => <span className="text-white/50 text-xs">{fmtDate(r.requested_at)}</span> },
    { key: "actions", header: "Actions", render: (r: typeof payouts[0]) => (
      <div className="flex items-center gap-1">
        {r.status === "pending" && <>
          <DashboardButton size="sm" variant="secondary" onClick={() => handlePayoutAction(r.id, "processing")}>Process</DashboardButton>
          <DashboardButton size="sm" variant="primary" onClick={() => handlePayoutAction(r.id, "paid")}>Mark Paid</DashboardButton>
          <DashboardButton size="sm" variant="danger" onClick={() => handlePayoutAction(r.id, "rejected")}>Reject</DashboardButton>
        </>}
        {r.status === "processing" && (
          <DashboardButton size="sm" variant="primary" onClick={() => handlePayoutAction(r.id, "paid")}>Mark Paid</DashboardButton>
        )}
      </div>
    )},
  ];

  const topWorkerChartData = topWorkers.map((w) => ({ name: w.name.split(" ")[0], earnings: w.total_earnings, sales: w.total_sales }));

  return (
    <div className="min-h-screen bg-[#070711] text-white">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 right-0 w-96 h-96 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-fuchsia-600/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#070711]/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center font-bold text-sm">A</div>
              <div>
                <p className="text-sm font-semibold leading-none">Admin Panel</p>
                <p className="text-xs text-white/40 mt-0.5">Referral Management</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DashboardButton variant="ghost" size="sm" leftIcon={<RefreshCw className="w-4 h-4" />} onClick={load}>Refresh</DashboardButton>
              <DashboardButton variant="danger" size="sm" leftIcon={<LogOut className="w-4 h-4" />} onClick={async () => { await supabase.auth.signOut(); navigate("/worker/login"); }}>Sign Out</DashboardButton>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Revenue" value={fmt(stats?.totalRevenue ?? 0)} icon={<TrendingUp className="w-5 h-5 text-violet-400" />} loading={loading} gradient="from-violet-500/10 to-purple-500/5" />
            <StatCard title="Total Orders" value={stats?.totalOrders ?? 0} icon={<ShoppingCart className="w-5 h-5 text-blue-400" />} loading={loading} gradient="from-blue-500/10 to-sky-500/5" />
            <StatCard title="Commissions Paid" value={fmt(stats?.totalCommissions ?? 0)} icon={<Wallet className="w-5 h-5 text-amber-400" />} loading={loading} gradient="from-amber-500/10 to-yellow-500/5" />
            <StatCard title="Total Workers" value={workers.length} icon={<Users className="w-5 h-5 text-emerald-400" />} loading={loading} gradient="from-emerald-500/10 to-green-500/5" />
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 w-fit">
            {(["workers", "sales", "payouts", "coupons", "analytics"] as Tab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${tab === t ? "bg-violet-600 text-white shadow-lg" : "text-white/50 hover:text-white"}`}>
                {t}
              </button>
            ))}
          </div>

          {/* Workers Tab */}
          {tab === "workers" && (
            <DashboardCard
              title="All Workers"
              description={`${workers.length} registered referral workers`}
              noPadding
              actions={
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search workers…"
                      className="pl-9 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/15 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500 w-48" />
                  </div>
                  <DashboardButton size="sm" variant="outline" leftIcon={<Download className="w-3.5 h-3.5" />} onClick={exportCSV}>Export</DashboardButton>
                  <DashboardButton size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => { setEditWorker(EMPTY_WORKER); setIsEditing(false); setWorkerModal(true); }}>Add Worker</DashboardButton>
                </div>
              }
            >
              <DataTable columns={workerCols as Parameters<typeof DataTable>[0]["columns"]} data={workers as Record<string, unknown>[]} loading={loading}
                emptyMessage="No workers found" emptyIcon={<Users className="w-10 h-10" />} rowKey={(r) => (r as Worker).id} />
            </DashboardCard>
          )}

          {/* Sales Tab */}
          {tab === "sales" && (
            <DashboardCard
              title="Referral Sales"
              description="Individual transactions made using referral coupons"
              noPadding
            >
              <DataTable
                columns={[
                  { key: "id", header: "Order ID", render: (r: any) => <span className="text-white font-medium">#{r.id.slice(-8).toUpperCase()}</span> },
                  { key: "worker", header: "Worker", render: (r: any) => (
                    <div>
                      <p className="text-sm text-white">{r.workers?.users?.name || "—"}</p>
                      <p className="text-xs text-white/40">{r.coupon_code}</p>
                    </div>
                  )},
                  { key: "customer", header: "Customer", render: (r: any) => (
                    <div>
                      <p className="text-sm text-white">{r.customer?.name || "—"}</p>
                      <p className="text-xs text-white/40">{r.customer?.email}</p>
                    </div>
                  )},
                  { key: "final_amount", header: "Amount", render: (r: any) => <span className="font-semibold">{fmt(r.final_amount)}</span> },
                  { key: "order_status", header: "Status", render: (r: any) => (
                    <Badge variant={r.order_status === "delivered" ? "success" : r.order_status === "cancelled" ? "error" : "neutral"} dot>
                      {r.order_status}
                    </Badge>
                  )},
                  { key: "created_at", header: "Date", render: (r: any) => <span className="text-white/40 text-xs">{fmtDate(r.created_at)}</span> },
                ]}
                data={sales as Record<string, unknown>[]}
                loading={loading}
                emptyMessage="No referral sales found"
                rowKey={(r) => (r as any).id}
              />
            </DashboardCard>
          )}

          {/* Payouts Tab */}
          {tab === "payouts" && (
            <DashboardCard title="Payout Requests" description="Manage worker cashout requests" noPadding>
              <DataTable columns={payoutCols as Parameters<typeof DataTable>[0]["columns"]} data={payouts as Record<string, unknown>[]} loading={loading}
                emptyMessage="No payout requests" rowKey={(r) => (r as PayoutRecord).id} />
            </DashboardCard>
          )}

          {/* Coupons Tab */}
          {tab === "coupons" && (
            <DashboardCard title="Coupon Codes" description="All active and inactive coupon codes" noPadding>
              <DataTable
                columns={[
                  { key: "code", header: "Code", render: (r: Record<string,unknown>) => <span className="font-mono text-violet-300 bg-violet-500/10 px-2 py-0.5 rounded">{String(r.code)}</span> },
                  { key: "workers", header: "Worker", render: (r: Record<string,unknown>) => <span>{(r.workers as {name:string})?.name ?? "—"}</span> },
                  { key: "discount_value", header: "Discount", render: (r: Record<string,unknown>) => <span className="text-emerald-400">{String(r.discount_value)}{r.discount_type === "percentage" ? "%" : "₹"} off</span> },
                  { key: "usage_count", header: "Uses" },
                  { key: "is_active", header: "Status", render: (r: Record<string,unknown>) => <Badge variant={r.is_active ? "success" : "error"} dot>{r.is_active ? "Active" : "Inactive"}</Badge> },
                  { key: "expires_at", header: "Expires", render: (r: Record<string,unknown>) => <span className="text-white/50 text-xs">{fmtDate(r.expires_at as string)}</span> },
                ]}
                data={coupons as Record<string, unknown>[]} loading={loading} emptyMessage="No coupons found" emptyIcon={<Tag className="w-10 h-10" />} />
            </DashboardCard>
          )}

          {/* Analytics Tab */}
          {tab === "analytics" && (
            <div className="space-y-6">
              <DashboardCard title="Top Performing Workers" description="Ranked by total earnings">
                <div className="h-64 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topWorkerChartData} barSize={32}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                      <Tooltip contentStyle={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }} formatter={(v) => [fmt(Number(v))]} />
                      <Bar dataKey="earnings" fill="#7c3aed" radius={[6, 6, 0, 0]} name="Earnings" />
                      <Bar dataKey="sales" fill="#10b981" radius={[6, 6, 0, 0]} name="Sales" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardCard>

              <DashboardCard title="Worker Leaderboard" noPadding>
                <DataTable
                  columns={[
                    { key: "name", header: "Worker" },
                    { key: "coupon_code", header: "Coupon", render: (r: Record<string,unknown>) => <span className="font-mono text-violet-300">{String(r.coupon_code)}</span> },
                    { key: "total_orders", header: "Orders" },
                    { key: "total_sales", header: "Sales", render: (r: Record<string,unknown>) => <span>{fmt(Number(r.total_sales))}</span> },
                    { key: "total_earnings", header: "Earned", render: (r: Record<string,unknown>) => <span className="text-emerald-400 font-semibold">{fmt(Number(r.total_earnings))}</span> },
                    { key: "commission_rate", header: "Rate", render: (r: Record<string,unknown>) => <span className="text-violet-300">{(Number(r.commission_rate) * 100).toFixed(0)}%</span> },
                  ]}
                  data={topWorkers as Record<string, unknown>[]} loading={loading} rowKey={(r) => (r as Worker).id} />
              </DashboardCard>
            </div>
          )}
        </main>
      </div>

      {/* Worker Modal */}
      <Modal open={workerModal} onClose={() => setWorkerModal(false)} title={isEditing ? "Edit Worker" : "Add Worker"} size="lg">
        <div className="grid grid-cols-2 gap-4">
          {(["name", "email", "phone", "coupon_code"] as const).map((field) => (
            <div key={field} className={field === "name" || field === "email" ? "col-span-2 sm:col-span-1" : "col-span-2 sm:col-span-1"}>
              <label className="block text-sm text-white/60 mb-1.5 capitalize">{field.replace("_", " ")} {["name","email","coupon_code"].includes(field) && "*"}</label>
              <input value={String(editWorker[field] ?? "")} onChange={(e) => setEditWorker({ ...editWorker, [field]: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors text-sm" />
            </div>
          ))}
          <div>
            <label className="block text-sm text-white/60 mb-1.5">Commission Rate (0–1)</label>
            <input type="number" step="0.01" min="0" max="1" value={editWorker.commission_rate ?? 0.1}
              onChange={(e) => setEditWorker({ ...editWorker, commission_rate: parseFloat(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-violet-500 transition-colors text-sm" />
          </div>
          <div className="flex items-center gap-3 mt-6">
            <label className="text-sm text-white/60">Active</label>
            <button onClick={() => setEditWorker({ ...editWorker, is_active: !editWorker.is_active })}
              className={`relative w-10 h-5 rounded-full transition-colors ${editWorker.is_active ? "bg-violet-600" : "bg-white/20"}`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${editWorker.is_active ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <DashboardButton variant="outline" className="flex-1" onClick={() => setWorkerModal(false)}>Cancel</DashboardButton>
          <DashboardButton className="flex-1" loading={savingWorker} onClick={saveWorker}>{isEditing ? "Save Changes" : "Create Worker"}</DashboardButton>
        </div>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Worker" size="sm">
        <p className="text-white/60 text-sm">This action cannot be undone. All worker data will be permanently removed.</p>
        <div className="flex gap-3 mt-6">
          <DashboardButton variant="outline" className="flex-1" onClick={() => setDeleteId(null)}>Cancel</DashboardButton>
          <DashboardButton variant="danger" className="flex-1" loading={deleting} onClick={confirmDelete}>Delete</DashboardButton>
        </div>
      </Modal>
    </div>
  );
}
