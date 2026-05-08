import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest } from "@/lib/api";
import { formatINR } from "@/lib/pricing";
import { useProducts } from "@/contexts/ProductContext";
import { categoryInfo, defaultProducts, getMinPrice, getPriceDisplay, PlainProduct, Variant } from "@/data/products";
import {
  Loader2, ShieldCheck, Truck, PackageCheck, ChevronDown,
  MapPin, Phone, User, Package, CreditCard, Pencil, Check, X,
  Plus, Trash2, Image as ImageIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

// ── Types ────────────────────────────────────────────────────────────────────
type Order = {
  id?: string; _id?: string; status?: string; createdAt?: string;
  pricing?: { subtotal?: number; gst?: number; delivery?: number; total?: number };
  total?: number;
  customer?: { name?: string; mobileno?: string; email?: string };
  shippingAddress?: { fullName?: string; mobile?: string; addressLine1?: string; addressLine2?: string; city?: string; state?: string; pin?: string; notes?: string };
  items?: { name: string; qty: number; price: number }[];
};

function getId(o: Order) { return o.id || o._id || ""; }
function badgeColor(s?: string) {
  const v = (s || "").toLowerCase();
  if (v === "confirmed") return "bg-blue-500/10 text-blue-500 border-blue-500/20";
  if (v === "delivered") return "bg-green-500/10 text-green-600 border-green-500/20";
  if (v === "shipped") return "bg-amber-500/10 text-amber-600 border-amber-500/20";
  return "bg-orange-500/10 text-orange-500 border-orange-500/20";
}
function fmtDate(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

// ── Orders Section ────────────────────────────────────────────────────────────
function OrdersSection() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await apiRequest<{ orders: Order[] } | Order[]>("/api/orders/admin/all-orders", { method: "GET" });
      if (res.ok) {
        const list = (res.data as any)?.orders ?? res.data;
        setOrders(Array.isArray(list) ? list.filter((o) => (o.status || "").toLowerCase() !== "delivered") : []);
      } else toast.error("Failed to fetch orders.");
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (orderId: string, status: "confirmed" | "shipped" | "delivered") => {
    const res = await apiRequest(`/api/orders/${orderId}/status`, { method: "PUT", json: { status } });
    if (res.ok) {
      toast.success(`Order marked as ${status}`);
      setOrders((prev) => status === "delivered"
        ? prev.filter((o) => getId(o) !== orderId)
        : prev.map((o) => getId(o) === orderId ? { ...o, status } : o));
    } else toast.error(res.data?.message || "Failed to update.");
  };

  const byStatus = useMemo(() => {
    const g: Record<string, Order[]> = { pending: [], confirmed: [], shipped: [] };
    for (const o of orders) {
      const s = (o.status || "pending").toLowerCase();
      if (s === "confirmed") g.confirmed.push(o);
      else if (s === "shipped") g.shipped.push(o);
      else g.pending.push(o);
    }
    return g;
  }, [orders]);

  const renderList = (list: Order[]) => {
    if (loading) return <div className="py-12 flex items-center justify-center text-muted-foreground gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Loading...</div>;
    if (!list.length) return <div className="py-12 text-center text-muted-foreground">No orders.</div>;
    return (
      <div className="space-y-3">
        {list.map((o) => {
          const id = getId(o);
          const total = Number(o.pricing?.total ?? o.total ?? 0);
          const isOpen = expandedId === id;
          const addr = o.shippingAddress;
          const cust = o.customer;
          return (
            <Card key={id} className={`border-border transition-all duration-200 ${isOpen ? "border-primary/40 shadow-md" : "hover:border-border/80"}`}>
              <button className="w-full text-left" onClick={() => setExpandedId(isOpen ? null : id)}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-foreground">Order #{id.slice(-8).toUpperCase()}</p>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${badgeColor(o.status)}`}>
                          {(o.status || "pending").charAt(0).toUpperCase() + (o.status || "pending").slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{cust?.name || addr?.fullName || "Customer"} • {cust?.mobileno || addr?.mobile || "—"} • {fmtDate(o.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-foreground">{formatINR(total)}</span>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                </CardContent>
              </button>

              {isOpen && (
                <CardContent className="px-5 pb-5 pt-0 border-t border-border/50">
                  <div className="grid sm:grid-cols-2 gap-5 mt-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" /> Delivery Address</h4>
                      <div className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-3 space-y-0.5">
                        <p className="font-medium text-foreground">{addr?.fullName || cust?.name || "—"}</p>
                        {addr?.addressLine1 && <p>{addr.addressLine1}</p>}
                        {addr?.addressLine2 && <p>{addr.addressLine2}</p>}
                        {(addr?.city || addr?.state || addr?.pin) && <p>{[addr.city, addr.state, addr.pin].filter(Boolean).join(", ")}</p>}
                        {addr?.notes && <p className="italic text-xs">📝 {addr.notes}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-primary" /> Customer Info</h4>
                      <div className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-3 space-y-1.5">
                        {cust?.name && <div className="flex items-center gap-2"><User className="w-3 h-3" /><span>{cust.name}</span></div>}
                        {(cust?.mobileno || addr?.mobile) && <div className="flex items-center gap-2"><Phone className="w-3 h-3" /><span>{cust?.mobileno || addr?.mobile}</span></div>}
                        {cust?.email && <div className="flex items-center gap-2"><span className="text-xs">✉</span><span className="truncate">{cust.email}</span></div>}
                        <div className="flex items-center gap-2 mt-1 pt-1 border-t border-border/30"><span className="text-xs">🕐</span><span className="text-xs">{fmtDate(o.createdAt)}</span></div>
                      </div>
                    </div>
                    {o.items && o.items.length > 0 && (
                      <div className="sm:col-span-2 space-y-2">
                        <h4 className="text-sm font-semibold flex items-center gap-1.5"><Package className="w-3.5 h-3.5 text-primary" /> Items Ordered</h4>
                        <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                          {o.items.map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center">{item.qty}</span><span>{item.name}</span></div>
                              <span className="text-muted-foreground">{formatINR(item.price * item.qty)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {o.pricing && (
                      <div className="sm:col-span-2 space-y-2">
                        <h4 className="text-sm font-semibold flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5 text-primary" /> Pricing</h4>
                        <div className="bg-muted/30 rounded-lg p-3 text-sm space-y-1.5">
                          <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{formatINR(o.pricing.subtotal ?? 0)}</span></div>
                          <div className="flex justify-between text-muted-foreground"><span>GST (18%)</span><span>{formatINR(o.pricing.gst ?? 0)}</span></div>
                          <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>{formatINR(o.pricing.delivery ?? 0)}</span></div>
                          <div className="flex justify-between font-semibold text-foreground border-t border-border/50 pt-1.5 mt-1.5"><span>Total</span><span>{formatINR(o.pricing.total ?? 0)}</span></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-border/50">
                    <Button variant="outline" size="sm" onClick={() => updateStatus(id, "confirmed")} className="border-blue-500/40 text-blue-500 hover:bg-blue-500/10"><ShieldCheck className="w-3.5 h-3.5 mr-1.5" />Confirm</Button>
                    <Button variant="outline" size="sm" onClick={() => updateStatus(id, "shipped")} className="border-amber-500/40 text-amber-600 hover:bg-amber-500/10"><Truck className="w-3.5 h-3.5 mr-1.5" />Shipped</Button>
                    <Button size="sm" onClick={() => updateStatus(id, "delivered")} className="bg-green-600 hover:bg-green-700 text-white"><PackageCheck className="w-3.5 h-3.5 mr-1.5" />Delivered</Button>
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
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">Click any order to view delivery details.</p>
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh"}</Button>
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
  );
}

// ── Add Product Form ──────────────────────────────────────────────────────────
function AddProductForm({ onAdd, onCancel }: { onAdd: (p: PlainProduct) => void; onCancel: () => void }) {
  const categories = Object.keys(categoryInfo);
  const [form, setForm] = useState({
    name: "", subtitle: "", description: "", category: categories[0],
    benefits: "", imageUrls: "", badge: "",
  });
  // Dynamic variant rows: [{label, price}]
  const [variantRows, setVariantRows] = useState([{ label: "Small (60g)", price: "" }, { label: "Medium (80g)", price: "" }]);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const setVLabel = (i: number, v: string) => setVariantRows((rows) => rows.map((r, idx) => idx === i ? { ...r, label: v } : r));
  const setVPrice = (i: number, v: string) => setVariantRows((rows) => rows.map((r, idx) => idx === i ? { ...r, price: v } : r));
  const addRow = () => setVariantRows((rows) => [...rows, { label: "", price: "" }]);
  const removeRow = (i: number) => setVariantRows((rows) => rows.filter((_, idx) => idx !== i));

  const handleSubmit = () => {
    if (!form.name || !form.imageUrls) { toast.error("Name and at least one image URL are required."); return; }
    const variants: Variant[] = variantRows
      .filter((r) => r.label && r.price && Number(r.price) > 0)
      .map((r) => ({ label: r.label, price: Number(r.price) }));
    if (!variants.length) { toast.error("Add at least one size with a price."); return; }
    const id = `${form.category}-${form.name}`.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const images = form.imageUrls.split("\n").map((s) => s.trim()).filter(Boolean);
    const benefits = form.benefits.split(",").map((s) => s.trim()).filter(Boolean);
    onAdd({
      id, category: form.category, name: form.name, subtitle: form.subtitle,
      description: form.description,
      benefits: benefits.length ? benefits : ["Natural", "Handcrafted"],
      badge: form.badge || null, images, variants,
    });
  };

  const field = (label: string, key: keyof typeof form, placeholder = "", textarea = false) => (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</label>
      {textarea
        ? <textarea rows={3} placeholder={placeholder} value={form[key]} onChange={(e) => set(key, e.target.value)} className="w-full text-sm bg-muted/30 border border-border rounded-lg px-3 py-2 resize-none outline-none focus:ring-1 focus:ring-primary text-foreground" />
        : <Input placeholder={placeholder} value={form[key]} onChange={(e) => set(key, e.target.value)} className="text-sm" />}
    </div>
  );

  return (
    <div className="bg-card border border-primary/20 rounded-2xl p-5 space-y-4">
      <h3 className="font-semibold text-foreground">Add New Product</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {field("Product Name *", "name", "e.g. Rose Bliss")}
        {field("Subtitle", "subtitle", "e.g. Rose Cold Process Soap")}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Category</label>
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className="w-full text-sm bg-muted/30 border border-border rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary text-foreground">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            <option value="Other">Other</option>
          </select>
        </div>
        {field("Badge", "badge", "e.g. New, Best Seller (optional)")}
        {field("Benefits (comma-separated)", "benefits", "e.g. Moisturising, Brightening")}
      </div>
      {field("Description", "description", "Describe the product...", true)}

      {/* Sizes & Prices */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Sizes & Prices *</label>
          <button onClick={addRow} className="text-xs text-primary hover:underline flex items-center gap-1"><Plus className="w-3 h-3" />Add size</button>
        </div>
        <div className="space-y-2">
          {variantRows.map((row, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input placeholder="Size label e.g. Small (60g)" value={row.label} onChange={(e) => setVLabel(i, e.target.value)} className="text-sm flex-1" />
              <span className="text-muted-foreground text-sm">₹</span>
              <Input placeholder="Price" value={row.price} onChange={(e) => setVPrice(i, e.target.value)} className="text-sm w-24" type="number" min={1} />
              {variantRows.length > 1 && <button onClick={() => removeRow(i)} className="text-muted-foreground hover:text-red-500"><X className="w-4 h-4" /></button>}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5" /> Image URLs (one per line) *</label>
        <textarea rows={3} placeholder={"/soaps/rose.png\n/soaps/rose(2).png"} value={form.imageUrls} onChange={(e) => set("imageUrls", e.target.value)} className="w-full text-sm bg-muted/30 border border-border rounded-lg px-3 py-2 resize-none outline-none focus:ring-1 focus:ring-primary font-mono text-foreground" />
        <p className="text-[11px] text-muted-foreground">Use paths like <code>/soaps/filename.png</code> for images in public/soaps/</p>
      </div>
      <div className="flex gap-2 pt-2">
        <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground"><Plus className="w-4 h-4 mr-1.5" />Add Product</Button>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}

// ── Products Section ──────────────────────────────────────────────────────────
function ProductsSection() {
  const { products, updateVariants, addProduct, deleteProduct, resetToDefaults } = useProducts();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editVariants, setEditVariants] = useState<Variant[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [filterCat, setFilterCat] = useState<string>("all");

  const categories = Array.from(new Set(products.map((p) => p.category)));
  const filtered = filterCat === "all" ? products : products.filter((p) => p.category === filterCat);

  const startEdit = (p: PlainProduct) => {
    setEditingId(p.id);
    setEditVariants(p.variants.map((v) => ({ ...v })));
  };

  const saveEdit = (id: string) => {
    if (editVariants.some((v) => !v.price || v.price < 1)) { toast.error("All prices must be valid positive numbers."); return; }
    updateVariants(id, editVariants);
    toast.success("Prices updated!");
    setEditingId(null);
  };

  const setVariantPrice = (i: number, price: number) => {
    setEditVariants((prev) => prev.map((v, idx) => idx === i ? { ...v, price } : v));
  };

  const handleAdd = (p: PlainProduct) => { addProduct(p); setShowAdd(false); toast.success(`${p.name} added!`); };

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button onClick={() => setFilterCat("all")} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${filterCat === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground bg-muted/40"}`}>All ({products.length})</button>
          {categories.map((c) => (
            <button key={c} onClick={() => setFilterCat(c)} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${filterCat === c ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground bg-muted/40"}`}>{c} ({products.filter((p) => p.category === c).length})</button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setShowAdd(!showAdd)} className="bg-primary hover:bg-primary/90 text-primary-foreground"><Plus className="w-4 h-4 mr-1.5" />Add Product</Button>
          <Button size="sm" variant="outline" onClick={() => { if (confirm("Reset all products to defaults? Admin price edits will be lost.")) { resetToDefaults(); toast.success("Reset to defaults."); } }}>Reset</Button>
        </div>
      </div>

      {showAdd && <AddProductForm onAdd={handleAdd} onCancel={() => setShowAdd(false)} />}

      {/* Product list */}
      <div className="grid gap-4">
        {filtered.map((p) => {
          const isEditing = editingId === p.id;
          return (
            <Card key={p.id} className="border-border">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted/30 flex-shrink-0 mt-1">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap mb-3">
                      <div>
                        <p className="font-semibold text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.category} • {p.images.length} photo{p.images.length !== 1 ? "s" : ""}</p>
                        {!isEditing && <p className="text-sm font-medium text-primary mt-0.5">{getPriceDisplay(p)}</p>}
                      </div>
                      {!isEditing && (
                        <div className="flex gap-2">
                          <button onClick={() => startEdit(p)} className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center hover:text-foreground transition" title="Edit prices"><Pencil className="w-3.5 h-3.5" /></button>
                          <button onClick={() => { if (confirm(`Delete ${p.name}?`)) { deleteProduct(p.id); toast.success("Deleted."); } }} className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center hover:text-red-500 transition" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      )}
                    </div>

                    {/* Variant price editor */}
                    {isEditing ? (
                      <div className="space-y-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Edit price per size</p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {editVariants.map((v, i) => (
                            <div key={i} className="flex items-center gap-2 bg-muted/30 rounded-lg px-3 py-2">
                              <span className="text-sm font-medium text-foreground w-28 flex-shrink-0">{v.label}</span>
                              <span className="text-muted-foreground">₹</span>
                              <Input
                                type="number" min={1} value={v.price}
                                onChange={(e) => setVariantPrice(i, Number(e.target.value))}
                                className="h-8 w-24 text-sm"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 pt-1">
                          <Button size="sm" onClick={() => saveEdit(p.id)} className="bg-green-600 hover:bg-green-700 text-white"><Check className="w-3.5 h-3.5 mr-1.5" />Save Prices</Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      /* Size price chips (read-only) */
                      <div className="flex flex-wrap gap-1.5">
                        {p.variants.map((v, i) => (
                          <span key={i} className="px-2.5 py-1 bg-muted/40 text-xs font-medium rounded-lg border border-border/60 text-muted-foreground">
                            {v.label}: <span className="text-foreground font-semibold">₹{v.price}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {p.badge && !isEditing && <span className="mt-2 inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">{p.badge}</span>}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ── Admin Page ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-10">
          <div className="w-full px-2 xs:px-3 sm:px-4 max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage orders and products from here.</p>
            </div>

            <Tabs defaultValue="orders">
              <TabsList className="w-full justify-start mb-6 border-b border-border rounded-none bg-transparent p-0 gap-1">
                <TabsTrigger value="orders" className="rounded-t-lg data-[state=active]:bg-card data-[state=active]:border data-[state=active]:border-b-card data-[state=active]:border-border px-5 py-2.5">
                  📦 Orders
                </TabsTrigger>
                <TabsTrigger value="products" className="rounded-t-lg data-[state=active]:bg-card data-[state=active]:border data-[state=active]:border-b-card data-[state=active]:border-border px-5 py-2.5">
                  🧼 Products
                </TabsTrigger>
              </TabsList>
              <TabsContent value="orders"><OrdersSection /></TabsContent>
              <TabsContent value="products"><ProductsSection /></TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
