import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { apiRequest } from "@/lib/api";
import { formatINR } from "@/lib/pricing";
import { Loader2, Package, User as UserIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type Order = {
  id?: string;
  _id?: string;
  status?: string;
  createdAt?: string;
  pricing?: { total?: number };
  total?: number;
  items?: { name: string; qty: number; price: number }[];
};

function statusVariant(status?: string) {
  const s = (status || "").toLowerCase();
  if (s === "delivered") return "secondary";
  if (s === "confirmed") return "default";
  return "outline";
}

export default function AccountPage() {
  const { user, role, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  const load = async () => {
    setLoading(true);
    try {
      await refreshProfile();
      // Backend provides user orders at `/api/orders/user/my-orders` per API spec
      const res = await apiRequest<{ orders: Order[] } | Order[]>("/api/orders/user/my-orders", { method: "GET" });
      if (res.ok) {
        const list = (res.data as any)?.orders ?? res.data;
        setOrders(Array.isArray(list) ? list : []);
      } else {
        setOrders([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totals = useMemo(() => {
    const sum = orders.reduce((acc, o) => acc + Number(o.pricing?.total ?? o.total ?? 0), 0);
    return { sum };
  }, [orders]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-10">
          <div className="w-full px-2 xs:px-3 sm:px-4 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Hi, {user?.name || "User"}</h1>
                <p className="text-muted-foreground">Your profile and orders.</p>
              </div>
              <div className="flex gap-3">
                <Button asChild variant="outline">
                  <Link to="/cart">Cart</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link to="/checkout">Place Order</Link>
                </Button>
              </div>
            </div>

            <Tabs defaultValue="orders">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="orders" className="gap-2">
                  <Package className="w-4 h-4" /> Orders
                </TabsTrigger>
                <TabsTrigger value="profile" className="gap-2">
                  <UserIcon className="w-4 h-4" /> Profile
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="mt-6">
                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-foreground">Your orders</h2>
                        <p className="text-sm text-muted-foreground">Value: {formatINR(totals.sum)}</p>
                      </div>
                      <Button variant="outline" onClick={() => load().then(() => toast.success("Refreshed"))} disabled={loading}>
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh"}
                      </Button>
                    </div>

                    {loading ? (
                      <div className="py-10 flex items-center justify-center text-muted-foreground gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Loading orders...
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="py-10 text-center text-muted-foreground">No orders yet.</div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((o) => {
                          const id = o.id || o._id || "order";
                          const total = Number(o.pricing?.total ?? o.total ?? 0);
                          return (
                            <div key={id} className="rounded-lg border border-border p-4 animate-fade-in">
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-foreground">Order {id.slice(-6)}</p>
                                  <Badge variant={statusVariant(o.status) as any}>{o.status || "pending"}</Badge>
                                </div>
                                <div className="font-semibold text-foreground">{formatINR(total)}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="mt-6">
                <Card className="border-border">
                  <CardContent className="p-6 space-y-3">
                    <h2 className="text-xl font-bold text-foreground">Your details</h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Name</p>
                        <p className="text-foreground font-medium">{user?.name || "-"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Email</p>
                        <p className="text-foreground font-medium">{user?.email || "-"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Mobile</p>
                        <p className="text-foreground font-medium">{user?.mobileno || "-"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Role</p>
                        <p className="text-foreground font-medium">{role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

