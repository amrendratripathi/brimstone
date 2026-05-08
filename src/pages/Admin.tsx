import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest } from "@/lib/api";
import { formatINR } from "@/lib/pricing";
import {
  Loader2, ShieldCheck, Truck, PackageCheck,
  ChevronDown, MapPin, Phone, User, Package, CreditCard,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type Order = {
  id?: string;
  _id?: string;
  status?: string;
  createdAt?: string;
  pricing?: { subtotal?: number; gst?: number; delivery?: number; total?: number };
  total?: number;
  customer?: { name?: string; mobileno?: string; email?: string };
  shippingAddress?: {
    fullName?: string;
    mobile?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    pin?: string;
    notes?: string;
  };
  items?: { name: string; qty: number; price: number }[];
};

function getId(o: Order) {
  return o.id || o._id || "";
}

function badgeVariant(status?: string) {
  const s = (status || "").toLowerCase();
  if (s === "confirmed") return "default";
  if (s === "delivered") return "secondary";
  if (s === "shipped") return "outline";
  return "outline";
}

function badgeColor(status?: string) {
  const s = (status || "").toLowerCase();
  if (s === "confirmed") return "bg-blue-500/10 text-blue-500 border-blue-500/20";
  if (s === "delivered") return "bg-green-500/10 text-green-600 border-green-500/20";
  if (s === "shipped") return "bg-amber-500/10 text-amber-600 border-amber-500/20";
  return "bg-orange-500/10 text-orange-500 border-orange-500/20";
}

function formatDate(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await apiRequest<{ orders: Order[] } | Order[]>("/api/orders/admin/all-orders", { method: "GET" });
      if (res.ok) {
        const list = (res.data as any)?.orders ?? res.data;
        const arr = Array.isArray(list) ? list : [];
        setOrders(arr.filter((o) => (o.status || "").toLowerCase() !== "delivered"));
      } else {
        setOrders([]);
        toast.error("Failed to fetch orders.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load().catch(() => {});
  }, []);

  const updateStatus = async (orderId: string, status: "confirmed" | "shipped" | "delivered") => {
    const res = await apiRequest(`/api/orders/${orderId}/status`, { method: "PUT", json: { status } });
    if (res.ok) {
      toast.success(`Order marked as ${status}`);
      setOrders((prev) =>
        status === "delivered"
          ? prev.filter((o) => getId(o) !== orderId)
          : prev.map((o) => (getId(o) === orderId ? { ...o, status } : o)),
      );
    } else {
      toast.error(res.data?.message || "Failed to update status.");
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const byStatus = useMemo(() => {
    const groups: Record<string, Order[]> = { pending: [], confirmed: [], shipped: [] };
    for (const o of orders) {
      const s = (o.status || "pending").toLowerCase();
      if (s === "confirmed") groups.confirmed.push(o);
      else if (s === "shipped") groups.shipped.push(o);
      else groups.pending.push(o);
    }
    return groups;
  }, [orders]);

  const renderList = (list: Order[]) => {
    if (loading) {
      return (
        <div className="py-12 flex items-center justify-center text-muted-foreground gap-2">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading orders...
        </div>
      );
    }
    if (!list.length) return <div className="py-12 text-center text-muted-foreground">No orders.</div>;

    return (
      <div className="space-y-3">
        {list.map((o) => {
          const id = getId(o);
          const total = Number(o.pricing?.total ?? o.total ?? 0);
          const isExpanded = expandedId === id;
          const addr = o.shippingAddress;
          const cust = o.customer;

          return (
            <Card
              key={id}
              className={`border-border transition-all duration-200 ${isExpanded ? "border-primary/40 shadow-md" : "hover:border-border/80"}`}
            >
              {/* ── Header row (always visible, click to expand) ── */}
              <button
                className="w-full text-left"
                onClick={() => toggleExpand(id)}
                aria-expanded={isExpanded}
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-foreground">
                            Order #{id.slice(-8).toUpperCase()}
                          </p>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${badgeColor(o.status)}`}>
                            {(o.status || "pending").charAt(0).toUpperCase() + (o.status || "pending").slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {cust?.name || addr?.fullName || "Customer"} • {cust?.mobileno || addr?.mobile || "—"} • {formatDate(o.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-foreground text-base">{formatINR(total)}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>
                </CardContent>
              </button>

              {/* ── Expanded delivery details ── */}
              {isExpanded && (
                <CardContent className="px-5 pb-5 pt-0 border-t border-border/50 animate-fade-in">
                  <div className="grid sm:grid-cols-2 gap-5 mt-4">

                    {/* Delivery address */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" /> Delivery Address
                      </h4>
                      <div className="text-sm text-muted-foreground space-y-0.5 bg-muted/30 rounded-lg p-3">
                        <p className="font-medium text-foreground">{addr?.fullName || cust?.name || "—"}</p>
                        {addr?.addressLine1 && <p>{addr.addressLine1}</p>}
                        {addr?.addressLine2 && <p>{addr.addressLine2}</p>}
                        {(addr?.city || addr?.state || addr?.pin) && (
                          <p>
                            {[addr.city, addr.state, addr.pin].filter(Boolean).join(", ")}
                          </p>
                        )}
                        {addr?.notes && (
                          <p className="mt-1 italic text-xs text-muted-foreground/80">📝 {addr.notes}</p>
                        )}
                      </div>
                    </div>

                    {/* Customer contact */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-primary" /> Customer Info
                      </h4>
                      <div className="text-sm text-muted-foreground space-y-1.5 bg-muted/30 rounded-lg p-3">
                        {cust?.name && (
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3 shrink-0" />
                            <span>{cust.name}</span>
                          </div>
                        )}
                        {(cust?.mobileno || addr?.mobile) && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3 shrink-0" />
                            <span>{cust?.mobileno || addr?.mobile}</span>
                          </div>
                        )}
                        {cust?.email && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs">✉</span>
                            <span className="truncate">{cust.email}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 mt-1 pt-1 border-t border-border/30">
                          <span className="text-xs">🕐</span>
                          <span className="text-xs">{formatDate(o.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Items ordered */}
                    {o.items && o.items.length > 0 && (
                      <div className="sm:col-span-2 space-y-2">
                        <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5 text-primary" /> Items Ordered
                        </h4>
                        <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                          {o.items.map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                                  {item.qty}
                                </span>
                                <span className="text-foreground truncate">{item.name}</span>
                              </div>
                              <span className="text-muted-foreground shrink-0 ml-2">
                                {formatINR(item.price * item.qty)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pricing breakdown */}
                    {o.pricing && (
                      <div className="sm:col-span-2 space-y-2">
                        <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-primary" /> Pricing Breakdown
                        </h4>
                        <div className="bg-muted/30 rounded-lg p-3 text-sm space-y-1.5">
                          <div className="flex justify-between text-muted-foreground">
                            <span>Subtotal</span>
                            <span>{formatINR(o.pricing.subtotal ?? 0)}</span>
                          </div>
                          <div className="flex justify-between text-muted-foreground">
                            <span>GST (18%)</span>
                            <span>{formatINR(o.pricing.gst ?? 0)}</span>
                          </div>
                          <div className="flex justify-between text-muted-foreground">
                            <span>Delivery</span>
                            <span>{formatINR(o.pricing.delivery ?? 0)}</span>
                          </div>
                          <div className="flex justify-between font-semibold text-foreground border-t border-border/50 pt-1.5 mt-1.5">
                            <span>Total</span>
                            <span>{formatINR(o.pricing.total ?? 0)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-border/50">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStatus(id, "confirmed")}
                      className="border-blue-500/40 text-blue-500 hover:bg-blue-500/10"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                      Confirm Order
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStatus(id, "shipped")}
                      className="border-amber-500/40 text-amber-600 hover:bg-amber-500/10"
                    >
                      <Truck className="w-3.5 h-3.5 mr-1.5" />
                      Mark Shipped
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => updateStatus(id, "delivered")}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <PackageCheck className="w-3.5 h-3.5 mr-1.5" />
                      Mark Delivered
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-10">
          <div className="w-full px-2 xs:px-3 sm:px-4 max-w-5xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Admin Panel</h1>
                <p className="text-sm text-muted-foreground">Click any order to see full delivery details.</p>
              </div>
              <Button variant="outline" onClick={load} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh"}
              </Button>
            </div>

            <Tabs defaultValue="pending">
              <TabsList className="w-full justify-start mb-4">
                <TabsTrigger value="pending">Pending ({byStatus.pending.length})</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed ({byStatus.confirmed.length})</TabsTrigger>
                <TabsTrigger value="shipped">Shipped ({byStatus.shipped.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="pending">{renderList(byStatus.pending)}</TabsContent>
              <TabsContent value="confirmed">{renderList(byStatus.confirmed)}</TabsContent>
              <TabsContent value="shipped">{renderList(byStatus.shipped)}</TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
