import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { apiRequest } from "@/lib/api";
import { calcGST, DELIVERY_CHARGE, formatINR } from "@/lib/pricing";
import { Loader2, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CouponInput, type AppliedCoupon } from "@/components/referral/CouponInput";

type OrderCreatePayload = {
  items: { id: string; name: string; price: number; qty: number }[];
  customer: { name?: string; email?: string; mobileno?: string };
  shippingAddress: {
    fullName: string;
    mobile: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pin: string;
    notes?: string;
  };
  pricing: { subtotal: number; gst: number; delivery: number; total: number };
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, subtotal, clear } = useCart();
  const [loading, setLoading] = useState(false);

  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const couponDiscount = appliedCoupon?.discountAmount ?? 0;

  const gst = useMemo(() => calcGST(subtotal), [subtotal]);
  const delivery = items.length ? DELIVERY_CHARGE : 0;
  const total = subtotal + gst + delivery - couponDiscount;

  const [fullName, setFullName] = useState(user?.name || "");
  const [mobile, setMobile] = useState(user?.mobileno || "");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [notes, setNotes] = useState("");

  const placeOrder = async () => {
    if (!items.length) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!fullName.trim() || !mobile.trim() || !address1.trim() || !city.trim() || !state.trim() || !pin.trim()) {
      toast.error("Please fill all required fields.");
      return;
    }
    if (pin.replace(/\D/g, "").length !== 6) {
      toast.error("Please enter a valid 6-digit PIN code.");
      return;
    }

    setLoading(true);
    try {
      const payload: OrderCreatePayload = {
        items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
        customer: { name: user?.name, email: user?.email, mobileno: user?.mobileno },
        shippingAddress: {
          fullName: fullName.trim(),
          mobile: mobile.replace(/\D/g, "").slice(0, 10),
          addressLine1: address1.trim(),
          addressLine2: address2.trim() || undefined,
          city: city.trim(),
          state: state.trim(),
          pin: pin.replace(/\D/g, "").slice(0, 6),
          notes: notes.trim() || undefined,
        },
        pricing: { subtotal, gst, delivery, total, couponCode: appliedCoupon?.coupon.code, couponDiscount },
      };

      const res = await apiRequest("/api/orders", { method: "POST", json: payload, auth: true });
      if (res.ok) {
        toast.success("Order placed successfully!");
        clear();
        navigate("/account");
      } else {
        toast.error(res.data?.message || "Failed to place order.");
      }
    } catch {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-10">
          <div className="w-full px-2 xs:px-3 sm:px-4 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Checkout</h1>
              <Button variant="outline" asChild>
                <Link to="/cart">Back to Cart</Link>
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-border animate-fade-in-up">
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold text-foreground">Delivery details</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full name *</Label>
                      <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Mobile number *</Label>
                      <Input value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Address line 1 *</Label>
                    <Input value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="House no, street, area" />
                  </div>

                  <div className="space-y-2">
                    <Label>Address line 2</Label>
                    <Input value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="Landmark, apartment, etc." />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>City *</Label>
                      <Input value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>State *</Label>
                      <Input value={state} onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>PIN *</Label>
                      <Input value={pin} onChange={(e) => setPin(e.target.value)} inputMode="numeric" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any delivery instructions" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border h-fit sticky top-24 animate-fade-in">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold text-foreground">Order summary</h2>

                  {/* Coupon input */}
                  <CouponInput subtotal={subtotal} onApply={setAppliedCoupon} />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">{formatINR(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GST</span>
                      <span className="text-foreground">{formatINR(gst)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="text-foreground">{formatINR(delivery)}</span>
                    </div>
                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                        <span>Coupon ({appliedCoupon?.coupon.code})</span>
                        <span>−{formatINR(couponDiscount)}</span>
                      </div>
                    )}
                    <div className="border-t border-border pt-3 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{formatINR(Math.max(0, total))}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90" onClick={placeOrder} disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Placing order...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


