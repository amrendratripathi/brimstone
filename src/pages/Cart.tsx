import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { calcGST, DELIVERY_CHARGE, formatINR } from "@/lib/pricing";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, subtotal, updateQty, removeItem, clear } = useCart();
  const gst = calcGST(subtotal);
  const total = subtotal + gst + (items.length ? DELIVERY_CHARGE : 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-10">
          <div className="w-full px-2 xs:px-3 sm:px-4 max-w-6xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Your Cart</h1>
              {items.length > 0 && (
                <Button variant="outline" onClick={clear}>
                  Clear cart
                </Button>
              )}
            </div>

            {items.length === 0 ? (
              <Card className="border-border">
                <CardContent className="p-8 text-center space-y-4">
                  <p className="text-muted-foreground">Your cart is empty.</p>
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link to="/shop">Go to Shop</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {items.map((it) => (
                    <Card key={it.id} className="border-border animate-fade-in">
                      <CardContent className="p-4 flex gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          {it.image ? (
                            <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-semibold text-foreground truncate">{it.name}</p>
                              <p className="text-sm text-muted-foreground">{formatINR(it.price)}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(it.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="mt-3 flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">Qty</span>
                            <Input
                              type="number"
                              min={1}
                              max={99}
                              value={it.qty}
                              onChange={(e) => updateQty(it.id, Number(e.target.value))}
                              className="w-20"
                            />
                            <div className="ml-auto font-semibold text-foreground">{formatINR(it.price * it.qty)}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="border-border h-fit sticky top-24">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-bold text-foreground">Summary</h2>
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
                        <span className="text-foreground">{formatINR(DELIVERY_CHARGE)}</span>
                      </div>
                      <div className="border-t border-border pt-3 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{formatINR(total)}</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                      <Link to="/checkout">Proceed to Checkout</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/shop">Continue Shopping</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

