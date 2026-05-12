import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Leaf, Star, X, ChevronLeft, ChevronRight, ZoomIn, Search } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductContext";
import { categoryInfo, getMinPrice, getPriceDisplay, PlainProduct } from "@/data/products";
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";

// ── Gallery + Size Selector Modal ─────────────────────────────────────────────
function GalleryModal({
  product,
  onClose,
  onAddToCart,
}: {
  product: PlainProduct;
  onClose: () => void;
  onAddToCart: (p: PlainProduct, variantIdx: number) => void;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const [variantIdx, setVariantIdx] = useState(0);
  const total = product.images.length;
  const selectedVariant = product.variants[variantIdx];

  const prev = useCallback(() => setImgIdx((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setImgIdx((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 md:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ── Left: Image Viewer ── */}
        <div className="relative md:w-[52%] flex-shrink-0 bg-muted/20 flex flex-col">
          <div className="relative flex-1 min-h-[240px] md:min-h-[400px] overflow-hidden">
            <img
              key={imgIdx}
              src={product.images[imgIdx]}
              alt={`${product.name} ${imgIdx + 1}`}
              className="w-full h-full object-cover animate-fade-in"
            />
            {total > 1 && (
              <>
                <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white hover:bg-black/60 flex items-center justify-center transition">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white hover:bg-black/60 flex items-center justify-center transition">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-xs font-semibold">
              {imgIdx + 1} / {total}
            </div>
          </div>

          {/* Thumbnails */}
          {total > 1 && (
            <div className="flex gap-2 p-3 overflow-x-auto scrollbar-none bg-muted/10">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    i === imgIdx ? "border-primary scale-105 shadow-md" : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Product Details ── */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 flex flex-col gap-4">
          {product.badge && (
            <span className="self-start inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold uppercase tracking-widest">
              <Star className="w-3 h-3" fill="currentColor" />
              {product.badge}
            </span>
          )}

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {product.name}
            </h2>
            <p className="text-sm text-primary/80 font-semibold mt-1">{product.subtitle}</p>
          </div>

          {/* Dynamic price based on selected variant */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">₹{selectedVariant.price}</span>
            <span className="text-sm text-muted-foreground">for {selectedVariant.label}</span>
          </div>

          {/* ── Size / Variant Selector ── */}
          <div>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2.5">
              Choose Size
            </p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setVariantIdx(i)}
                  className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                    i === variantIdx
                      ? "border-primary bg-primary text-primary-foreground shadow-md scale-105"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  <span className="block">{v.label}</span>
                  <span className={`block text-xs mt-0.5 ${i === variantIdx ? "text-primary-foreground/80" : "text-primary"}`}>
                    ₹{v.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Benefits */}
          <div>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Key Benefits</p>
            <div className="flex flex-wrap gap-2">
              {product.benefits.map((b) => (
                <span key={b} className="flex items-center gap-1.5 px-3 py-1 bg-primary/8 text-primary text-xs font-semibold rounded-full border border-primary/15">
                  <Leaf className="w-3 h-3" />{b}
                </span>
              ))}
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            Category: <span className="text-foreground font-medium">{product.category}</span>
          </div>

          <Button
            className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl text-base hover:shadow-[0_0_24px_hsl(145_28%_40%/0.4)] transition-all duration-300"
            onClick={() => { onAddToCart(product, variantIdx); onClose(); }}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add {selectedVariant.label} to Cart — ₹{selectedVariant.price}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Shop Page ─────────────────────────────────────────────────────────────────
const Shop = () => {
  const { products } = useProducts();
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const { addItem } = useCart();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<string | null>(
    (location.state as any)?.category || null
  );

  useEffect(() => {
    if ((location.state as any)?.category) {
      setActiveCategory((location.state as any).category);
    }
  }, [location.state]);
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});
  const [selectedProduct, setSelectedProduct] = useState<PlainProduct | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const filtered = products.filter((p) => {
    const matchCat = activeCategory ? p.category === activeCategory : true;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAddToCart = useCallback((product: PlainProduct, variantIdx = 0) => {
    const variant = product.variants[variantIdx];
    const cartId = `${product.id}__${variantIdx}`;
    addItem(
      { id: cartId, name: `${product.name} – ${variant.label}`, price: variant.price, image: product.images[0], category: product.category },
      1,
    );
    toast.success(`${product.name} (${variant.label}) added to cart!`);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedMap((prev) => ({ ...prev, [product.id]: false })), 2000);
  }, [addItem]);

  return (
    <div className="min-h-screen">
      {selectedProduct && (
        <GalleryModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <Header />
      <main id="home">
        {/* Hero */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-background to-background pointer-events-none" />
          <div className="relative container mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-primary/80 font-semibold mb-3">Natural & Handmade</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Our Products
            </h1>
            <div className="section-divider mb-6" />
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Discover our complete collection — click any product to choose your size and view all photos.
            </p>
          </div>
        </section>

        {/* Filter & Search tabs */}
        <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row gap-3 md:justify-between md:items-center">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 md:pb-0">
              <button
                onClick={() => setActiveCategory(null)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === null ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
              >
                All ({products.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
                >
                  {categoryInfo[cat]?.emoji ?? "🌿"} {cat} ({products.filter((p) => p.category === cat).length})
                </button>
              ))}
            </div>
            
            {/* Search Input */}
            <div className="relative w-full md:w-64 flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-4 py-2 rounded-full bg-muted/30 border border-border text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Products by category */}
        {(activeCategory ? [activeCategory] : categories).map((category) => {
          const categoryProducts = filtered.filter((p) => p.category === category);
          if (categoryProducts.length === 0) return null; // hide if search yields no results for this category

          return (
          <section key={category} className="py-14 md:py-20 relative" id={category.toLowerCase().replace(/\s+/g, "-")}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-10 md:mb-14">
                <div className="text-3xl mb-3">{categoryInfo[category]?.emoji ?? "🌿"}</div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {category}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
                  {categoryInfo[category]?.description ?? "Natural handcrafted products made with love"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                {categoryProducts.map((product) => {
                  const isAdded = addedMap[product.id];
                  const minPrice = getMinPrice(product);
                  const priceDisplay = getPriceDisplay(product);
                  return (
                    <div
                      key={product.id}
                      className="group relative bg-card border border-border/60 rounded-2xl overflow-hidden hover-lift hover:border-primary/30 transition-all duration-400 flex flex-col cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      {product.badge && (
                        <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest shadow-sm">
                          <Star className="w-2.5 h-2.5" fill="currentColor" />{product.badge}
                        </div>
                      )}
                      {product.images.length > 1 && (
                        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 text-white text-[10px] font-semibold">
                          <ZoomIn className="w-3 h-3" />{product.images.length}
                        </div>
                      )}

                      <div className="relative h-56 sm:h-60 overflow-hidden bg-muted/30">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        {product.images[1] && (
                          <img src={product.images[1]} alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-3 right-3 z-10 px-3 py-1.5 glass rounded-full text-sm font-bold text-primary border border-primary/20 shadow-sm backdrop-blur">
                          {priceDisplay}
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-grow gap-3">
                        <div>
                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}>
                            {product.name}
                          </h3>
                          <p className="text-xs text-primary/80 font-semibold tracking-wide mt-0.5">{product.subtitle}</p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed flex-grow line-clamp-3">{product.description}</p>

                        <div className="flex flex-wrap gap-1.5">
                          {product.benefits.slice(0, 3).map((b) => (
                            <span key={b} className="flex items-center gap-1 px-2 py-0.5 bg-primary/8 text-primary text-[10px] font-semibold rounded-full">
                              <Leaf className="w-2.5 h-2.5" />{b}
                            </span>
                          ))}
                        </div>

                        {/* Size chips preview */}
                        <div className="flex flex-wrap gap-1">
                          {product.variants.map((v, i) => (
                            <span key={i} className="px-2 py-0.5 bg-muted/40 text-muted-foreground text-[10px] font-medium rounded-md border border-border/50">
                              {v.label}
                            </span>
                          ))}
                        </div>

                        <button
                          className={`group/btn relative w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-300 mt-auto ${
                            isAdded ? "bg-green-500 text-white" : "bg-primary text-primary-foreground hover:shadow-[0_0_20px_hsl(145_28%_40%/0.35)] hover:scale-[1.02]"
                          }`}
                          onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                          <ShoppingCart className="w-4 h-4 relative" />
                          <span className="relative">{isAdded ? "Added!" : "Select Size & Add"}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )})}

        {/* WhatsApp CTA */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-accent/5 pointer-events-none" />
          <div className="relative container mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-2xl mx-auto glass rounded-3xl border border-primary/20 p-8 md:p-12">
              <div className="text-4xl mb-4">💬</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Need Help Choosing?
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Chat with us on WhatsApp for personalized recommendations, custom orders, or any questions.
              </p>
              <a href="https://wa.me/918957294010" target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-green-500 text-white font-bold text-sm hover:bg-green-600 transition-all duration-300 hover:shadow-[0_0_24px_rgba(34,197,94,0.4)] hover:scale-[1.02]">
                <span className="text-lg">📱</span>WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;

