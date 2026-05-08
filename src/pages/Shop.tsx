import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Leaf, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useState } from "react";

// ─── Product Images ──────────────────────────────────────────────────────────
import cocolumiyaImg    from "@/assets/products/cocolumiya.png";
import cocolumiyaPhoto  from "@/assets/products/cocolumiya_photo.png";
import ashbarImg        from "@/assets/products/ashbar.png";
import ashbarPhoto      from "@/assets/products/ashbar_photo.png";
import beanBlamImg      from "@/assets/products/bean_blam.png";
import ritualRootsImg   from "@/assets/products/ritual_roots.png";
import herbalHealImg    from "@/assets/products/herbal_heal.png";
import tanOffImg        from "@/assets/products/tan_off.png";
import scrubbingBarImg  from "@/assets/products/scrubbing_bar.png";
import detoxBarImg      from "@/assets/products/detox_bar.png";
import ubtanBarImg      from "@/assets/products/ubtan_bar.png";
import brighteningBarImg from "@/assets/products/brightening_bar.png";
import skinLighteningImg from "@/assets/products/skin_lightening_bar.png";
import antiAcneBarImg   from "@/assets/products/anti_acne_bar.png";
import tanRemovalBarImg from "@/assets/products/tan_removal_bar.png";
import coconutOilImg    from "@/assets/products/extra_virgin_coconut_oil.png";
import champiOilImg     from "@/assets/products/grannys_champi_oil.png";
import vedanilOilImg    from "@/assets/products/vedanil_oil.png";

// ─── Product Catalog ─────────────────────────────────────────────────────────
const allProducts = [
  // ── Cold Process Soaps ────────────────────────────────────────────────────
  // price = numeric cart price (medium/80g size); priceDisplay = full range shown to customer
  {
    category: "Cold Process Soaps",
    name: "Cocolumiya",
    subtitle: "Moisturising Soap",
    description: "A nourishing handmade soap crafted with pure coconut extracts and deeply moisturising oils. Leaves your skin soft, hydrated, and naturally glowing.",
    weight: "Small (60g) / Medium (80g) / Large (120g)",
    benefits: ["Deep Moisturising", "Antibacterial", "Vitamin E Rich"],
    price: 180,
    priceDisplay: "₹130 – ₹250",
    badge: "Best Seller",
    images: [cocolumiyaPhoto, cocolumiyaImg],
  },
  {
    category: "Cold Process Soaps",
    name: "Bean & Blam",
    subtitle: "Coffee Cold Process Soap",
    description: "A handcrafted coffee soap enriched with natural coffee grounds and nourishing oils that gently exfoliates and deeply cleanses, leaving your skin refreshed and smooth.",
    weight: "Small (60g) / Medium (80g) / Large (120g)",
    benefits: ["Natural Exfoliation", "Brightens & Reduces Tan", "Rich in Antioxidants"],
    price: 180,
    priceDisplay: "₹130 – ₹250",
    badge: null,
    images: [beanBlamImg],
  },
  {
    category: "Cold Process Soaps",
    name: "Ashbar",
    subtitle: "Activated Charcoal Soap",
    description: "A handcrafted charcoal soap enriched with activated charcoal and nourishing oils that deeply detoxifies and cleanses, leaving your skin clear, fresh, and balanced.",
    weight: "Small (60g) / Medium (80g) / Large (120g)",
    benefits: ["Deep Detox", "Controls Acne & Oil", "Unclogs Pores"],
    price: 180,
    priceDisplay: "₹130 – ₹250",
    badge: null,
    images: [ashbarPhoto, ashbarImg],
  },
  {
    category: "Cold Process Soaps",
    name: "Ritual Roots",
    subtitle: "Ubtan Cold Process Soap",
    description: "A handcrafted ubtan soap enriched with natural herbs, clays, and nourishing oils that gently cleanses and enhances your skin's natural glow, leaving it soft, smooth, and radiant.",
    weight: "Small (60g) / Medium (80g) / Large (120g)",
    benefits: ["Brightens Skin Tone", "Reduces Tan & Pigmentation", "Gentle Exfoliation"],
    price: 180,
    priceDisplay: "₹130 – ₹250",
    badge: null,
    images: [ritualRootsImg],
  },
  {
    category: "Cold Process Soaps",
    name: "Herbal Heal",
    subtitle: "Neem & Aloe Vera Soap",
    description: "A handcrafted neem & aloe vera soap that gently purifies, heals, and hydrates the skin, leaving it fresh, calm, and naturally healthy.",
    weight: "Small (60g) / Medium (80g) / Large (120g)",
    benefits: ["Fights Acne & Bacteria", "Soothes Redness", "Deeply Hydrates"],
    price: 180,
    priceDisplay: "₹130 – ₹250",
    badge: null,
    images: [herbalHealImg],
  },
  {
    category: "Cold Process Soaps",
    name: "Tan Off",
    subtitle: "Orange Cold Process Soap",
    description: "A handcrafted orange cold process soap enriched with vitamin C–rich orange extracts and nourishing oils that gently cleanse and revitalize, leaving your skin fresh, radiant, and naturally glowing.",
    weight: "Small (60g) / Medium (80g) / Large (120g)",
    benefits: ["Brightens Dull Skin", "Rich in Antioxidants", "Reduces Tan & Pigmentation"],
    price: 180,
    priceDisplay: "₹130 – ₹250",
    badge: null,
    images: [tanOffImg],
  },

  // ── Melt & Pour Soaps ─────────────────────────────────────────────────────
  {
    category: "Melt & Pour Soaps",
    name: "Scrubbing Bar",
    subtitle: "Coffee & Oat Milk Melt & Pour Soap",
    description: "A perfect blend of rich coffee and soothing oat milk. Gently exfoliates while deeply nourishing your skin for a refreshing, spa-like experience with every wash.",
    weight: "Small (60g) / Medium (80g) / Large (120g)",
    benefits: ["Gentle Exfoliation", "Skin Brightening", "Deep Moisturization"],
    price: 110,
    priceDisplay: "₹80 – ₹150",
    badge: null,
    images: [scrubbingBarImg],
  },
  {
    category: "Melt & Pour Soaps",
    name: "Detox Skin Bar",
    subtitle: "Activated Charcoal & Tea Tree Soap",
    description: "A powerful detoxifying soap infused with activated charcoal and tea tree essential oil to deeply cleanse and purify your skin. Perfect for oily and acne-prone skin.",
    weight: "Small (60g) / Medium (80g) / Large (120g)",
    benefits: ["Deeply Cleanses Pores", "Controls Excess Oil", "Antibacterial & Soothing"],
    price: 110,
    priceDisplay: "₹80 – ₹150",
    badge: null,
    images: [detoxBarImg],
  },
  {
    category: "Melt & Pour Soaps",
    name: "Ubtan Bar",
    subtitle: "Traditional 11-Herb Ubtan Soap",
    description: "A traditional skincare blend crafted with 11 powerful herbs and pure Kasturi Haldi. Inspired by age-old ubtan recipes, it gives your skin a healthy, radiant, and refreshed look.",
    weight: "Small (60g) / Medium (80g) / Large (120g)",
    benefits: ["Brightens Skin Tone", "Reduces Tan & Dullness", "Deeply Cleanses Without Drying"],
    price: 110,
    priceDisplay: "₹80 – ₹150",
    badge: "Popular",
    images: [ubtanBarImg],
  },
  {
    category: "Melt & Pour Soaps",
    name: "Brightening Bar",
    subtitle: "Sandalwood & Saffron Soap",
    description: "A luxurious blend of sandalwood and saffron that gently cleanses while enhancing your skin's natural glow. Its soothing aroma relaxes the senses for a rich, spa-like bathing experience.",
    weight: "Small (60g) / Medium (80g) / Large (120g)",
    benefits: ["Brightens & Adds Glow", "Helps Tan Removal", "Keeps Skin Soft & Hydrated"],
    price: 110,
    priceDisplay: "₹80 – ₹150",
    badge: null,
    images: [brighteningBarImg],
  },
  {
    category: "Melt & Pour Soaps",
    name: "Skin Lightening Bar",
    subtitle: "Pomegranate & Licorice Soap",
    description: "A dreamy antioxidant soap infused with the goodness of pomegranate and licorice to give skin a natural glow and lightness. Gently cleanses and gives a fresh, natural look.",
    weight: "Small (60g) / Medium (80g) / Large (120g)",
    benefits: ["Brightens & Evens Tone", "Promotes Glowing Skin", "Antioxidant Rich"],
    price: 110,
    priceDisplay: "₹80 – ₹150",
    badge: null,
    images: [skinLighteningImg],
  },
  {
    category: "Melt & Pour Soaps",
    name: "Anti Acne Bar",
    subtitle: "Tulsi & Neem Herbal Soap",
    description: "A refreshing herbal soap infused with the goodness of Tulsi and Neem, known for their powerful antibacterial and purifying properties. Keeps skin clear, healthy, and naturally balanced.",
    weight: "Small (60g) / Medium (80g) / Large (120g)",
    benefits: ["Fights Acne & Pimples", "Deeply Cleanses & Purifies", "Controls Excess Oil"],
    price: 110,
    priceDisplay: "₹80 – ₹150",
    badge: null,
    images: [antiAcneBarImg],
  },
  {
    category: "Melt & Pour Soaps",
    name: "Tan Removal Bar",
    subtitle: "Orange & Papaya Soap",
    description: "A refreshing blend of citrusy orange and nourishing papaya. Designed to gently cleanse while giving your skin a natural glow. Leaves you feeling fresh, soft, and radiant after every wash.",
    weight: "Small (60g) / Medium (80g) / Large (120g)",
    benefits: ["Brightens Dull Skin", "Helps in Tan Removal", "Gently Exfoliates Dead Skin"],
    price: 110,
    priceDisplay: "₹80 – ₹150",
    badge: null,
    images: [tanRemovalBarImg],
  },

  // ── Oils ──────────────────────────────────────────────────────────────────
  {
    category: "Oils",
    name: "Extra Virgin Coconut Oil",
    subtitle: "Pure Unrefined Coconut Oil",
    description: "Pure, unrefined oil extracted from fresh coconuts, rich in nutrients and natural goodness. Deeply moisturizes skin and nourishes hair.",
    weight: "50ml / 100ml / 200ml / 500ml",
    benefits: ["Deeply Moisturises Skin", "Nourishes & Strengthens Hair", "Fights Bacteria"],
    price: 180,
    priceDisplay: "₹80 – ₹350",
    badge: null,
    images: [coconutOilImg],
  },
  {
    category: "Oils",
    name: "Granny's Champi Oil",
    subtitle: "Traditional Hair Growth Oil",
    description: "A nourishing scalp and hair-strengthening oil blend used in traditional Indian head massage (champi). Formulated with natural oils and herbs to support healthy hair growth, reduce hair fall, and strengthen roots.",
    weight: "50ml / 100ml / 200ml",
    benefits: ["Promotes Hair Growth", "Reduces Hair Fall", "Strengthens Roots"],
    price: 280,
    priceDisplay: "₹150 – ₹450",
    badge: "Best Seller",
    images: [champiOilImg],
  },
  {
    category: "Oils",
    name: "Vedanil Oil",
    subtitle: "Ayurvedic Pain Relief Oil",
    description: "A powerful Ayurvedic oil that helps relieve joint pain, muscle stiffness, backache, and inflammation while promoting relaxation and improved blood circulation.",
    weight: "50ml / 100ml",
    benefits: ["Relieves Joint & Muscle Pain", "Reduces Inflammation", "Improves Blood Circulation"],
    price: 250,
    priceDisplay: "₹180 – ₹320",
    badge: null,
    images: [vedanilOilImg],
  },
];

const categoryInfo: Record<string, { emoji: string; description: string }> = {
  "Cold Process Soaps": {
    emoji: "🧼",
    description: "Handcrafted using traditional cold-press methods, preserving all natural goodness",
  },
  "Melt & Pour Soaps": {
    emoji: "✨",
    description: "Luxurious spa-quality soaps with natural extracts and beautiful designs",
  },
  Oils: {
    emoji: "🌿",
    description: "Pure, natural oils for skin care, hair care, and therapeutic wellness",
  },
};

// ─── Shop Page ────────────────────────────────────────────────────────────────
const Shop = () => {
  const categories = Array.from(new Set(allProducts.map((p) => p.category)));
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  const filtered = activeCategory
    ? allProducts.filter((p) => p.category === activeCategory)
    : allProducts;

  const handleAddToCart = (product: typeof allProducts[0]) => {
    const id = `${product.category}-${product.name}`.toLowerCase().replace(/\s+/g, "-");
    addItem(
      {
        id,
        name: product.name,
        price: product.price, // numeric — no longer a range string
        image: product.images?.[0],
        category: product.category,
      },
      1
    );
    toast.success(`${product.name} added to cart!`);
    setAddedMap((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setAddedMap((prev) => ({ ...prev, [id]: false })), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="home">
        {/* Hero */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-background to-background pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.1)_0%,transparent_60%)] pointer-events-none" />
          <div className="relative container mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-primary/80 font-semibold mb-3">
              Natural & Handmade
            </p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Our Products
            </h1>
            <div className="section-divider mb-6" />
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Discover our complete collection of natural, handcrafted products — made with love
              and the finest ingredients from nature
            </p>
          </div>
        </section>

        {/* Filter tabs */}
        <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveCategory(null)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === null
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                All ({allProducts.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {categoryInfo[cat]?.emoji} {cat} ({allProducts.filter((p) => p.category === cat).length})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products by category */}
        {(activeCategory ? [activeCategory] : categories).map((category) => (
          <section
            key={category}
            className="py-14 md:py-20 relative"
            id={category.toLowerCase().replace(/\s+/g, "-")}
          >
            {/* Section separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="container mx-auto px-4 sm:px-6">
              {/* Category header */}
              <div className="text-center mb-10 md:mb-14">
                <div className="text-3xl mb-3">{categoryInfo[category]?.emoji}</div>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {category}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
                  {categoryInfo[category]?.description}
                </p>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                {filtered
                  .filter((p) => p.category === category)
                  .map((product) => {
                    const id = `${product.category}-${product.name}`.toLowerCase().replace(/\s+/g, "-");
                    const isAdded = addedMap[id];
                    return (
                      <div
                        key={id}
                        className="group relative bg-card border border-border/60 rounded-2xl overflow-hidden hover-lift hover:border-primary/30 transition-all duration-400 flex flex-col"
                      >
                        {/* Badge */}
                        {product.badge && (
                          <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest shadow-sm">
                            <Star className="w-2.5 h-2.5" fill="currentColor" />
                            {product.badge}
                          </div>
                        )}

                        {/* Image */}
                        <div className="relative h-56 sm:h-60 overflow-hidden bg-muted/30">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Hover overlay with second image if available */}
                          {product.images[1] && (
                            <img
                              src={product.images[1]}
                              alt={`${product.name} detail`}
                              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            />
                          )}
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Price badge */}
                          <div className="absolute bottom-3 right-3 z-10 px-3 py-1.5 glass rounded-full text-sm font-bold text-primary border border-primary/20 shadow-sm backdrop-blur">
                            {product.priceDisplay}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-grow gap-3">
                          <div>
                            <h3
                              className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300"
                              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}
                            >
                              {product.name}
                            </h3>
                            <p className="text-xs text-primary/80 font-semibold tracking-wide mt-0.5">
                              {product.subtitle}
                            </p>
                          </div>

                          <p className="text-sm text-muted-foreground leading-relaxed flex-grow line-clamp-3">
                            {product.description}
                          </p>

                          {/* Benefits */}
                          <div className="flex flex-wrap gap-1.5">
                            {product.benefits.slice(0, 3).map((b) => (
                              <span
                                key={b}
                                className="flex items-center gap-1 px-2 py-0.5 bg-primary/8 text-primary text-[10px] font-semibold rounded-full"
                              >
                                <Leaf className="w-2.5 h-2.5" />
                                {b}
                              </span>
                            ))}
                          </div>

                          {/* Weight */}
                          <p className="text-[11px] text-muted-foreground">
                            📦 Available: {product.weight}
                          </p>

                          {/* CTA */}
                          <button
                            className={`group/btn relative w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-300 mt-auto ${
                              isAdded
                                ? "bg-green-500 text-white"
                                : "bg-primary text-primary-foreground hover:shadow-[0_0_20px_hsl(145_28%_40%/0.35)] hover:scale-[1.02]"
                            }`}
                            onClick={() => handleAddToCart(product)}
                          >
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                            <ShoppingCart className="w-4 h-4 relative transition-transform duration-300 group-hover/btn:scale-110" />
                            <span className="relative">{isAdded ? "Added!" : "Add to Cart"}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        ))}

        {/* WhatsApp Order CTA */}
        <section className="py-16 relative overflow-hidden">
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
                Chat with us on WhatsApp for personalized product recommendations, custom orders,
                or any questions you have.
              </p>
              <a
                href="https://wa.me/918957294010"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-green-500 text-white font-bold text-sm hover:bg-green-600 transition-all duration-300 hover:shadow-[0_0_24px_rgba(34,197,94,0.4)] hover:scale-[1.02]"
              >
                <span className="text-lg">📱</span>
                WhatsApp Us
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
