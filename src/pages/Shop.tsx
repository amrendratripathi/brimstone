import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShoppingCart, Leaf, Star, ChevronLeft, Search, Shield, Award, BadgeCheck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductContext";
import { categoryInfo, getMinPrice, getPriceDisplay, PlainProduct } from "@/data/products";
import { toast } from "sonner";
import { useState, useEffect, useCallback, useRef } from "react";

// ── Product Detail Modal (mobile-first, like beyondgud.com) ───────────────────
function ProductModal({
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
  const scrollRef = useRef<HTMLDivElement>(null);

  // Swipe support for image gallery
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) setImgIdx((i) => (i + 1) % total);
      else setImgIdx((i) => (i - 1 + total) % total);
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setImgIdx((i) => (i - 1 + total) % total);
      if (e.key === "ArrowRight") setImgIdx((i) => (i + 1) % total);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Intercept browser / hardware back button to close modal instead of navigating away
  useEffect(() => {
    history.pushState({ modalOpen: true }, "");
    const onPop = () => onClose();
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full md:max-w-4xl bg-background md:bg-card md:rounded-3xl md:shadow-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: "100dvh", height: "100dvh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Sticky header bar (clears navbar) ── */}
        <div className="flex-shrink-0 h-14 bg-background/95 backdrop-blur-md border-b border-border/30 flex items-center px-3 gap-3 z-30">
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-muted/60 text-foreground hover:bg-muted transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="flex-1 text-sm font-semibold text-foreground truncate">{product.name}</span>
          {product.badge && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest">
              <Star className="w-2.5 h-2.5" fill="currentColor" />{product.badge}
            </span>
          )}
        </div>

        {/* ── Scrollable Body ── */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain pb-28 md:pb-24" style={{ WebkitOverflowScrolling: "touch" }}>

          {/* ── Image Gallery ── */}
          <div
            className="relative bg-muted/10 select-none"
            style={{ aspectRatio: "1 / 1" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Badge inside gallery (since header bar handles it on mobile) */}
            <img
              key={imgIdx}
              src={product.images[imgIdx]}
              alt={`${product.name} ${imgIdx + 1}`}
              className="w-full h-full object-contain p-6 md:p-10"
              style={{ animation: "fadeIn 0.25s ease" }}
            />

            {/* Nav arrows — desktop only */}
            {total > 1 && (
              <>
                <button
                  onClick={() => setImgIdx((i) => (i - 1 + total) % total)}
                  className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white hover:bg-black/60 items-center justify-center transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setImgIdx((i) => (i + 1) % total)}
                  className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white hover:bg-black/60 items-center justify-center transition"
                >
                  <ChevronLeft className="w-5 h-5 rotate-180" />
                </button>
              </>
            )}

            {/* Dot indicators */}
            {total > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`rounded-full transition-all duration-200 ${i === imgIdx ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-black/30"}`}
                  />
                ))}
              </div>
            )}

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest shadow">
                <Star className="w-2.5 h-2.5" fill="currentColor" />{product.badge}
              </div>
            )}
          </div>

          {/* ── Thumbnail strip ── */}
          {total > 1 && (
            <div className="flex gap-2 px-4 py-2.5 overflow-x-auto scrollbar-none border-b border-border/30">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${i === imgIdx ? "border-primary shadow-md scale-105" : "border-transparent opacity-50 hover:opacity-80"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* ── Product Info ── */}
          <div className="px-4 pt-4 pb-2 flex flex-col gap-3">

            {/* Name & subtitle */}
            <div>
              <h2
                className="text-2xl md:text-3xl font-bold text-foreground leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {product.name}
              </h2>
              <p className="text-sm text-primary/80 font-medium mt-0.5">{product.subtitle}</p>
            </div>

            {/* Price row */}
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <span className="text-3xl font-bold text-foreground">₹{selectedVariant.price}</span>
              <span className="text-sm text-muted-foreground font-medium">for {selectedVariant.label}</span>
            </div>

            {/* ── Size/Variant Selector ── */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">Select size</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setVariantIdx(i)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all duration-200 ${i === variantIdx
                      ? "border-primary bg-primary/5 text-primary shadow-sm"
                      : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Trust Badges ── */}
            <div className="flex items-center justify-around py-3 border-y border-border/30 mt-1">
              <div className="flex flex-col items-center gap-1 text-muted-foreground">
                <Award className="w-6 h-6 text-primary/60" />
                <span className="text-[10px] font-semibold text-center leading-tight">Premium<br />Quality</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-muted-foreground">
                <span className="text-2xl">🇮🇳</span>
                <span className="text-[10px] font-semibold text-center leading-tight">Made<br />In India</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-muted-foreground">
                <Shield className="w-6 h-6 text-primary/60" />
                <span className="text-[10px] font-semibold text-center leading-tight">Secure<br />Checkout</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-muted-foreground">
                <BadgeCheck className="w-6 h-6 text-primary/60" />
                <span className="text-[10px] font-semibold text-center leading-tight">100%<br />Natural</span>
              </div>
            </div>

            {/* ── Product Details ── */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-1.5">Product details</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* ── Key Benefits ── */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">Key Benefits:</p>
              <ul className="flex flex-col gap-1.5">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Leaf className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span><strong className="text-foreground font-semibold">{b.split(":")[0]}</strong>{b.includes(":") ? `: ${b.split(":")[1]}` : ""}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-xs text-muted-foreground mt-1">
              Category: <span className="text-foreground font-medium">{product.category}</span>
            </div>
          </div>
        </div>

        {/* ── Sticky Bottom CTA ── */}
        <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border/50 px-4 py-3 flex gap-3 safe-bottom">
          <button
            onClick={() => { onAddToCart(product, variantIdx); onClose(); }}
            className="flex-1 py-3.5 rounded-xl border-2 border-primary text-primary font-bold text-sm tracking-wide transition-all duration-200 hover:bg-primary/5 active:scale-[0.98]"
          >
            ADD TO CART
          </button>
          <button
            onClick={() => { onAddToCart(product, variantIdx); onClose(); }}
            className="flex-1 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-wide transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] shadow-lg"
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Product Card (mobile-optimised 2-col grid) ────────────────────────────────
function ProductCard({
  product,
  isAdded,
  onOpen,
  onQuickAdd,
}: {
  product: PlainProduct;
  isAdded: boolean;
  onOpen: () => void;
  onQuickAdd: (e: React.MouseEvent) => void;
}) {
  const priceDisplay = getPriceDisplay(product);

  return (
    <div
      className="group relative bg-card border border-border/60 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary/30 hover:shadow-lg flex flex-col"
      onClick={onOpen}
    >
      {/* Badges */}
      {product.badge && (
        <div className="absolute top-2 left-2 z-10 flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-widest shadow">
          <Star className="w-2 h-2" fill="currentColor" />{product.badge}
        </div>
      )}

      {/* Image */}
      <div className="relative overflow-hidden bg-muted/10" style={{ aspectRatio: "1 / 1" }}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt=""
            className="absolute inset-0 w-full h-full object-contain p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          />
        )}
        {/* Price pill */}
        <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm text-primary text-xs font-bold border border-primary/20 shadow-sm">
          {priceDisplay}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-2 flex-grow">
        <div>
          <h3
            className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem" }}
          >
            {product.name}
          </h3>
          <p className="text-[11px] text-primary/70 font-medium mt-0.5 leading-tight">{product.subtitle}</p>
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap gap-1">
          {product.benefits.slice(0, 2).map((b) => (
            <span key={b} className="flex items-center gap-0.5 px-1.5 py-0.5 bg-primary/8 text-primary text-[9px] font-semibold rounded-full">
              <Leaf className="w-2 h-2" />{b}
            </span>
          ))}
        </div>

        {/* Add button */}
        <button
          className={`w-full mt-auto flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${isAdded
            ? "bg-green-500 text-white"
            : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.97]"
            }`}
          onClick={(e) => { e.stopPropagation(); onOpen(); }}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          {isAdded ? "Added!" : "Add to Cart"}
        </button>
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
  const savedScrollY = useRef(0);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory ? p.category === activeCategory : true;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        <ProductModal
          product={selectedProduct}
          onClose={() => {
            setSelectedProduct(null);
            // Restore scroll position after modal closes
            requestAnimationFrame(() => window.scrollTo({ top: savedScrollY.current, behavior: "instant" }));
          }}
          onAddToCart={handleAddToCart}
        />
      )}

      <Header />
      <main id="home">
        {/* ── Hero ── */}
        <section className="pt-32 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-background to-background pointer-events-none" />
          <div className="relative container mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-primary/80 font-semibold mb-3">Natural & Handmade</p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Our Products
            </h1>
            <div className="section-divider mb-6" />
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Discover our complete collection of natural handmade skincare products.
            </p>
          </div>
        </section>

        {/* ── Filter & Search ── */}
        <div className="sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border/50 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 py-3 flex flex-col gap-2.5">
            {/* Category pills */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveCategory(null)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${activeCategory === null ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground bg-muted/40"}`}
              >
                All ({products.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${activeCategory === cat ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground bg-muted/40"}`}
                >
                  {categoryInfo[cat]?.emoji ?? "🌿"} {cat} ({products.filter((p) => p.category === cat).length})
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full">
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

        {/* ── Products by category ── */}
        {(activeCategory ? [activeCategory] : categories).map((category) => {
          const categoryProducts = filtered.filter((p) => p.category === category);
          if (categoryProducts.length === 0) return null;

          return (
            <section
              key={category}
              className="py-10 md:py-20 relative"
              id={category.toLowerCase().replace(/\s+/g, "-")}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              <div className="container mx-auto px-4 sm:px-6">
                {/* Category header */}
                <div className="text-center mb-7 md:mb-14">
                  <div className="text-3xl mb-2">{categoryInfo[category]?.emoji ?? "🌿"}</div>
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {category}
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                    {categoryInfo[category]?.description ?? "Natural handcrafted products made with love"}
                  </p>
                </div>

                {/* 2-col grid on mobile, 3-col on md, 4-col on xl */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isAdded={!!addedMap[product.id]}
                      onOpen={() => { savedScrollY.current = window.scrollY; setSelectedProduct(product); }}
                      onQuickAdd={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* ── WhatsApp CTA ── */}
        <section className="py-14 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-accent/5 pointer-events-none" />
          <div className="relative container mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-2xl mx-auto glass rounded-3xl border border-primary/20 p-8 md:p-12">
              <div className="text-4xl mb-4">💬</div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-foreground mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Need Help Choosing?
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Chat with us on WhatsApp for personalized recommendations, custom orders, or any questions.
              </p>
              <a
                href="https://wa.me/918957294010"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-green-500 text-white font-bold text-sm hover:bg-green-600 transition-all duration-300 hover:shadow-[0_0_24px_rgba(34,197,94,0.4)] hover:scale-[1.02]"
              >
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
