// ─── Central Product Catalog ─────────────────────────────────────────────────

export type Variant = {
  label: string;   // e.g. "Small (60g)", "100ml"
  price: number;   // price for this specific size
};

export type Product = {
  id: string;
  category: string;
  name: string;
  subtitle: string;
  description: string;
  benefits: string[];
  badge?: string | null;
  images: string[];
  variants: Variant[];
  // Derived helpers (computed from variants, keep for backward compat)
  get price(): number;        // lowest variant price (for card display)
  get priceDisplay(): string; // range string e.g. "₹130 – ₹250"
};

// We use plain objects with variants; price + priceDisplay are computed in helpers below.
export type PlainProduct = Omit<Product, "price" | "priceDisplay"> & {
  variants: Variant[];
};

export function getMinPrice(p: PlainProduct): number {
  return Math.min(...p.variants.map((v) => v.price));
}
export function getPriceDisplay(p: PlainProduct): string {
  if (p.variants.length === 1) return `₹${p.variants[0].price}`;
  const min = Math.min(...p.variants.map((v) => v.price));
  const max = Math.max(...p.variants.map((v) => v.price));
  return min === max ? `₹${min}` : `₹${min} – ₹${max}`;
}

// Image path helpers
const s = (file: string) => `/soaps/${file}`;

// Soap variants (Cold Process)
const cpVariants: Variant[] = [
  { label: "Small (60g)", price: 130 },
  { label: "Medium (80g)", price: 180 },
  { label: "Large (120g)", price: 250 },
];
// Soap variants (Melt & Pour)
const mpVariants: Variant[] = [
  { label: "Small (60g)", price: 80 },
  { label: "Medium (80g)", price: 110 },
  { label: "Large (120g)", price: 150 },
];
// Kesar is premium
const kesarVariants: Variant[] = [
  { label: "Small (60g)", price: 150 },
  { label: "Medium (80g)", price: 200 },
  { label: "Large (120g)", price: 280 },
];

export const defaultProducts: PlainProduct[] = [
  // ── Cold Process Soaps ───────────────────────────────────────────────────────
  {
    id: "cold-process-soaps-cocolumiya",
    category: "Cold Process Soaps",
    name: "Cocolumiya",
    subtitle: "Moisturising Soap",
    description: "A nourishing handmade soap crafted with pure coconut extracts and deeply moisturising oils. Leaves your skin soft, hydrated, and naturally glowing.",
    benefits: ["Deep Moisturising", "Antibacterial", "Vitamin E Rich"],
    badge: "Best Seller",
    images: [s("cocolumia.png"), s("cocolumia2.png"), s("cocolumia3.png")],
    variants: [...cpVariants],
  },
  {
    id: "cold-process-soaps-bean-blam",
    category: "Cold Process Soaps",
    name: "Bean & Blam",
    subtitle: "Coffee Cold Process Soap",
    description: "A handcrafted coffee soap enriched with natural coffee grounds and nourishing oils that gently exfoliates and deeply cleanses, leaving your skin refreshed and smooth.",
    benefits: ["Natural Exfoliation", "Brightens & Reduces Tan", "Rich in Antioxidants"],
    badge: null,
    images: [s("bean_and_blam (1).png"), s("bean_and_blam (2).png"), s("bean_and_blam (3).png")],
    variants: [...cpVariants],
  },
  {
    id: "cold-process-soaps-ashbar",
    category: "Cold Process Soaps",
    name: "Ashbar",
    subtitle: "Activated Charcoal Soap",
    description: "A handcrafted charcoal soap enriched with activated charcoal and nourishing oils that deeply detoxifies and cleanses, leaving your skin clear, fresh, and balanced.",
    benefits: ["Deep Detox", "Controls Acne & Oil", "Unclogs Pores"],
    badge: null,
    images: [s("ashbar.png"), s("ashbar2.png"), s("ashbar3.png")],
    variants: [...cpVariants],
  },
  {
    id: "cold-process-soaps-ritual-roots",
    category: "Cold Process Soaps",
    name: "Ritual Roots",
    subtitle: "Ubtan Cold Process Soap",
    description: "A handcrafted ubtan soap enriched with natural herbs, clays, and nourishing oils that gently cleanses and enhances your skin's natural glow, leaving it soft, smooth, and radiant.",
    benefits: ["Brightens Skin Tone", "Reduces Tan & Pigmentation", "Gentle Exfoliation"],
    badge: null,
    images: [s("ritual_root.png"), s("ritual_root(2).png"), s("ritual_root(3).png")],
    variants: [...cpVariants],
  },
  {
    id: "cold-process-soaps-herbal-heal",
    category: "Cold Process Soaps",
    name: "Herbal Heal",
    subtitle: "Neem & Aloe Vera Soap",
    description: "A handcrafted neem & aloe vera soap that gently purifies, heals, and hydrates the skin, leaving it fresh, calm, and naturally healthy.",
    benefits: ["Fights Acne & Bacteria", "Soothes Redness", "Deeply Hydrates"],
    badge: null,
    images: [s("hearbal_heal (1).png"), s("hearbal_heal (2).png"), s("hearbal_heal (3).png")],
    variants: [...cpVariants],
  },
  {
    id: "cold-process-soaps-tan-off",
    category: "Cold Process Soaps",
    name: "Tan Off",
    subtitle: "Orange Cold Process Soap",
    description: "A handcrafted orange cold process soap enriched with vitamin C–rich orange extracts and nourishing oils that gently cleanse and revitalize, leaving your skin fresh, radiant, and naturally glowing.",
    benefits: ["Brightens Dull Skin", "Rich in Antioxidants", "Reduces Tan & Pigmentation"],
    badge: null,
    images: [s("tanoff (1).png"), s("tanoff (2).png"), s("tanoff (3).png")],
    variants: [...cpVariants],
  },
  {
    id: "cold-process-soaps-kesar",
    category: "Cold Process Soaps",
    name: "Kesar",
    subtitle: "Saffron & Milk Cold Process Soap",
    description: "A luxurious handcrafted soap infused with pure saffron and milk extracts. Known for centuries in Indian beauty rituals, saffron brightens, evens skin tone, and leaves a natural golden glow.",
    benefits: ["Brightens Skin Tone", "Reduces Dark Spots", "Natural Glow"],
    badge: "New",
    images: [s("kesar.png"), s("kesar(2).png")],
    variants: [...kesarVariants],
  },
  {
    id: "cold-process-soaps-lavender",
    category: "Cold Process Soaps",
    name: "Lavender",
    subtitle: "Lavender Cold Process Soap",
    description: "A calming handcrafted soap made with pure lavender essential oil and soothing botanicals. Perfect for winding down — gently cleanses, relaxes the senses, and leaves skin feeling soft and balanced.",
    benefits: ["Calms & Relaxes", "Soothes Sensitive Skin", "Natural Antibacterial"],
    badge: "New",
    images: [s("levender.png"), s("levender (2).png")],
    variants: [...cpVariants],
  },
  {
    id: "cold-process-soaps-mint",
    category: "Cold Process Soaps",
    name: "Mint Fresh",
    subtitle: "Peppermint Cold Process Soap",
    description: "A refreshing handcrafted soap powered by pure peppermint essential oil. Invigorates the senses with a cooling, tingling sensation while deeply cleansing and leaving skin feeling fresh and alive.",
    benefits: ["Cooling & Refreshing", "Controls Oil", "Energises Skin"],
    badge: "New",
    images: [s("mint.png"), s("mint(2).png")],
    variants: [...cpVariants],
  },
  {
    id: "cold-process-soaps-multani-mitti",
    category: "Cold Process Soaps",
    name: "Multani Mitti",
    subtitle: "Fuller's Earth Cold Process Soap",
    description: "A powerful deep-cleansing soap made with pure Multani Mitti (Fuller's Earth) — the age-old Indian beauty secret. Draws out impurities, controls excess oil, tightens pores, and leaves skin matte and clear.",
    benefits: ["Deep Pore Cleansing", "Controls Oil & Acne", "Tightens Pores"],
    badge: "New",
    images: [s("multani_mitti.png"), s("multani_mitti(2).png")],
    variants: [...cpVariants],
  },
  {
    id: "cold-process-soaps-neem-root",
    category: "Cold Process Soaps",
    name: "Neem Root",
    subtitle: "Neem Root Cold Process Soap",
    description: "A potent herbal soap crafted with neem root extract and nourishing oils. Neem's powerful antibacterial and antifungal properties deeply purify skin, fight acne, and promote a clear, healthy complexion.",
    benefits: ["Fights Acne & Bacteria", "Purifies & Detoxes", "Heals & Soothes"],
    badge: "New",
    images: [s("neam_root (1).png"), s("neam_root (2).png")],
    variants: [...cpVariants],
  },
  {
    id: "cold-process-soaps-rose",
    category: "Cold Process Soaps",
    name: "Rose Bliss",
    subtitle: "Rose Cold Process Soap",
    description: "A romantically scented handcrafted soap with pure rose extract and nourishing oils. Rose's natural astringent and hydrating properties tone skin, reduce redness, and leave a delicate floral fragrance.",
    benefits: ["Tones & Firms Skin", "Natural Hydration", "Reduces Redness"],
    badge: "New",
    images: [s("rose.png"), s("rose(2).png")],
    variants: [...cpVariants],
  },

  // ── Melt & Pour Soaps ────────────────────────────────────────────────────────
  {
    id: "melt-pour-soaps-scrubbing-bar",
    category: "Glycerine Soaps",
    name: "Scrubbing Bar",
    subtitle: "Coffee & Oat Milk Melt & Pour Soap",
    description: "A perfect blend of rich coffee and soothing oat milk. Gently exfoliates while deeply nourishing your skin for a refreshing, spa-like experience with every wash.",
    benefits: ["Gentle Exfoliation", "Skin Brightening", "Deep Moisturization"],
    badge: null,
    images: ["/src/assets/products/scrubbing_bar.png"],
    variants: [...mpVariants],
  },
  {
    id: "melt-pour-soaps-detox-skin-bar",
    category: "Glycerine Soaps",
    name: "Detox Skin Bar",
    subtitle: "Activated Charcoal & Tea Tree Soap",
    description: "A powerful detoxifying soap infused with activated charcoal and tea tree essential oil to deeply cleanse and purify your skin. Perfect for oily and acne-prone skin.",
    benefits: ["Deeply Cleanses Pores", "Controls Excess Oil", "Antibacterial & Soothing"],
    badge: null,
    images: ["/src/assets/products/detox_bar.png"],
    variants: [...mpVariants],
  },
  {
    id: "melt-pour-soaps-ubtan-bar",
    category: "Glycerine Soaps",
    name: "Ubtan Bar",
    subtitle: "Traditional 11-Herb Ubtan Soap",
    description: "A traditional skincare blend crafted with 11 powerful herbs and pure Kasturi Haldi. Inspired by age-old ubtan recipes, it gives your skin a healthy, radiant, and refreshed look.",
    benefits: ["Brightens Skin Tone", "Reduces Tan & Dullness", "Deeply Cleanses Without Drying"],
    badge: "Popular",
    images: ["/src/assets/products/ubtan_bar.png"],
    variants: [...mpVariants],
  },
  {
    id: "melt-pour-soaps-brightening-bar",
    category: "Glycerine Soaps",
    name: "Brightening Bar",
    subtitle: "Sandalwood & Saffron Soap",
    description: "A luxurious blend of sandalwood and saffron that gently cleanses while enhancing your skin's natural glow. Its soothing aroma relaxes the senses for a rich, spa-like bathing experience.",
    benefits: ["Brightens & Adds Glow", "Helps Tan Removal", "Keeps Skin Soft & Hydrated"],
    badge: null,
    images: ["/src/assets/products/brightening_bar.png"],
    variants: [...mpVariants],
  },
  {
    id: "melt-pour-soaps-skin-lightening-bar",
    category: "Glycerine Soaps",
    name: "Skin Lightening Bar",
    subtitle: "Pomegranate & Licorice Soap",
    description: "A dreamy antioxidant soap infused with the goodness of pomegranate and licorice to give skin a natural glow and lightness. Gently cleanses and gives a fresh, natural look.",
    benefits: ["Brightens & Evens Tone", "Promotes Glowing Skin", "Antioxidant Rich"],
    badge: null,
    images: ["/src/assets/products/skin_lightening_bar.png"],
    variants: [...mpVariants],
  },
  {
    id: "melt-pour-soaps-anti-acne-bar",
    category: "Glycerine Soaps",
    name: "Anti Acne Bar",
    subtitle: "Tulsi & Neem Herbal Soap",
    description: "A refreshing herbal soap infused with the goodness of Tulsi and Neem, known for their powerful antibacterial and purifying properties. Keeps skin clear, healthy, and naturally balanced.",
    benefits: ["Fights Acne & Pimples", "Deeply Cleanses & Purifies", "Controls Excess Oil"],
    badge: null,
    images: ["/src/assets/products/anti_acne_bar.png"],
    variants: [...mpVariants],
  },
  {
    id: "melt-pour-soaps-tan-removal-bar",
    category: "Glycerine Soaps",
    name: "Tan Removal Bar",
    subtitle: "Orange & Papaya Soap",
    description: "A refreshing blend of citrusy orange and nourishing papaya. Designed to gently cleanse while giving your skin a natural glow. Leaves you feeling fresh, soft, and radiant after every wash.",
    benefits: ["Brightens Dull Skin", "Helps in Tan Removal", "Gently Exfoliates Dead Skin"],
    badge: null,
    images: ["/src/assets/products/tan_removal_bar.png"],
    variants: [...mpVariants],
  },
  {
    id: "melt-pour-soaps-oat-milk",
    category: "Glycerine Soaps",
    name: "Oat Milk Bar",
    subtitle: "Oat Milk Melt & Pour Soap",
    description: "A creamy, ultra-gentle soap enriched with pure oat milk that soothes, nourishes, and moisturises the skin. Perfect for sensitive skin — calms irritation, reduces redness, and leaves skin silky soft.",
    benefits: ["Ultra Gentle & Soothing", "Deep Moisture", "Ideal for Sensitive Skin"],
    badge: "New",
    images: [s("oatmilk.png"), s("oatmilk(2).png")],
    variants: [...mpVariants],
  },

  // ── Oils ──────────────────────────────────────────────────────────────────────
  {
    id: "oils-extra-virgin-coconut-oil",
    category: "Oils",
    name: "Extra Virgin Coconut Oil",
    subtitle: "Pure Unrefined Coconut Oil",
    description: "Pure, unrefined oil extracted from fresh coconuts, rich in nutrients and natural goodness. Deeply moisturizes skin and nourishes hair.",
    benefits: ["Deeply Moisturises Skin", "Nourishes & Strengthens Hair", "Fights Bacteria"],
    badge: null,
    images: [s("extra_virgin_coconut_oil.png"), s("extra_virgin_coconut_oil (2).png")],
    variants: [
      { label: "50ml", price: 80 },
      { label: "100ml", price: 150 },
      { label: "200ml", price: 250 },
      { label: "500ml", price: 350 },
    ],
  },
  {
    id: "oils-grannys-champi-oil",
    category: "Oils",
    name: "Granny's Champi Oil",
    subtitle: "Traditional Hair Growth Oil",
    description: "A nourishing scalp and hair-strengthening oil blend used in traditional Indian head massage (champi). Formulated with natural oils and herbs to support healthy hair growth, reduce hair fall, and strengthen roots.",
    benefits: ["Promotes Hair Growth", "Reduces Hair Fall", "Strengthens Roots"],
    badge: "Best Seller",
    images: [s("granny_champi_oil.png"), s("granny_champi_oil (2).png")],
    variants: [
      { label: "50ml", price: 150 },
      { label: "100ml", price: 280 },
      { label: "200ml", price: 450 },
    ],
  },
  {
    id: "oils-vedanil-oil",
    category: "Oils",
    name: "Vedanil Oil",
    subtitle: "Ayurvedic Pain Relief Oil",
    description: "A powerful Ayurvedic oil that helps relieve joint pain, muscle stiffness, backache, and inflammation while promoting relaxation and improved blood circulation.",
    benefits: ["Relieves Joint & Muscle Pain", "Reduces Inflammation", "Improves Blood Circulation"],
    badge: null,
    images: ["/src/assets/products/vedanil_oil.png"],
    variants: [
      { label: "50ml", price: 180 },
      { label: "100ml", price: 320 },
    ],
  },
];

// Category metadata
export const categoryInfo: Record<string, { emoji: string; description: string }> = {
  "Cold Process Soaps": {
    emoji: "🧼",
    description: "Handcrafted using traditional cold-press methods, preserving all natural goodness",
  },
  "Glycerine Soaps": {
    emoji: "✨",
    description: "Luxurious spa-quality soaps with natural extracts and beautiful designs",
  },
  Oils: {
    emoji: "🌿",
    description: "Pure, natural oils for skin care, hair care, and therapeutic wellness",
  },
};
