import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { ImageCarousel } from "@/components/ui/image-carousel";

const allProducts = [
  // Soaps
  { category: "Soaps", name: "Cocolumiya", subtitle: "Moisturising Soap", description: "Deeply moisturizes and softens skin with pure coconut extracts", weight: "110g", benefits: ["Moisturizing", "Antibacterial", "Vitamin E Rich"], price: "₹250", images: [
    "https://images.unsplash.com/photo-1556228578-7a31d2d79ab6?w=800",
    "https://images.unsplash.com/photo-1630979884301-f428a8ea2b5d?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },
  { category: "Soaps", name: "Ashbar", subtitle: "Deep Cleaning Soap", description: "Gentle yet effective deep cleansing for all skin types", weight: "110g", benefits: ["Deep Cleansing", "Natural Fragrance", "Exfoliating"], price: "₹250", images: [
    "https://images.unsplash.com/photo-1556228578-7a31d2d79ab6?w=800",
    "https://images.unsplash.com/photo-1630979884301-f428a8ea2b5d?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },
  { category: "Soaps", name: "Honey & Oats", subtitle: "Gentle Exfoliating Soap", description: "Natural exfoliation with honey and oat extracts for smooth, glowing skin", weight: "110g", benefits: ["Exfoliating", "Soothing", "Moisturizing"], price: "₹270", images: [
    "https://images.unsplash.com/photo-1556228578-7a31d2d79ab6?w=800",
    "https://images.unsplash.com/photo-1630979884301-f428a8ea2b5d?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },
  { category: "Soaps", name: "Turmeric & Neem", subtitle: "Therapeutic Soap", description: "Antibacterial and anti-inflammatory properties for clear, healthy skin", weight: "110g", benefits: ["Antibacterial", "Anti-inflammatory", "Skin Brightening"], price: "₹280", images: [
    "https://images.unsplash.com/photo-1556228578-7a31d2d79ab6?w=800",
    "https://images.unsplash.com/photo-1630979884301-f428a8ea2b5d?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },
  { category: "Soaps", name: "Lavender Dreams", subtitle: "Aromatherapy Soap", description: "Calming lavender essential oil for relaxation and peaceful sleep", weight: "110g", benefits: ["Relaxing", "Antibacterial", "Aromatherapy"], price: "₹290", images: [
    "https://images.unsplash.com/photo-1556228578-7a31d2d79ab6?w=800",
    "https://images.unsplash.com/photo-1630979884301-f428a8ea2b5d?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },
  { category: "Soaps", name: "Eucalyptus Mint", subtitle: "Refreshing Soap", description: "Invigorating blend for a fresh, energized start to your day", weight: "110g", benefits: ["Refreshing", "Antimicrobial", "Energizing"], price: "₹290", images: [
    "https://images.unsplash.com/photo-1556228578-7a31d2d79ab6?w=800",
    "https://images.unsplash.com/photo-1630979884301-f428a8ea2b5d?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },
  { category: "Soaps", name: "Rose Petal", subtitle: "Luxury Soap", description: "Delicate rose petals and oils for soft, naturally perfumed skin", weight: "110g", benefits: ["Moisturizing", "Antioxidant", "Aromatherapy"], price: "₹300", images: [
    "https://images.unsplash.com/photo-1556228578-7a31d2d79ab6?w=800",
    "https://images.unsplash.com/photo-1630979884301-f428a8ea2b5d?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },
  { category: "Soaps", name: "Tea Tree & Charcoal", subtitle: "Deep Purifying Soap", description: "Deep cleaning action for oily and acne-prone skin", weight: "110g", benefits: ["Purifying", "Antibacterial", "Detoxifying"], price: "₹280", images: [
    "https://images.unsplash.com/photo-1556228578-7a31d2d79ab6?w=800",
    "https://images.unsplash.com/photo-1630979884301-f428a8ea2b5d?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },

  // Hair Care
  { category: "Hair Care", name: "Natural Shampoo", subtitle: "Hair Care", description: "Nourish your hair with nature's finest ingredients", weight: "200ml", benefits: ["Strengthening", "Sulfate-Free", "Natural Shine"], price: "₹350", images: [
    "https://images.unsplash.com/photo-1608248543803-ba4f8e7e4c2f?w=800",
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },
  { category: "Hair Care", name: "Coconut Oil Hair Serum", subtitle: "Deep Conditioning", description: "Intensive hair treatment with pure coconut oil for silky, smooth hair", weight: "150ml", benefits: ["Deep Conditioning", "Frizz Control", "Heat Protection"], price: "₹400", images: [
    "https://images.unsplash.com/photo-1608248543803-ba4f8e7e4c2f?w=800",
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },
  { category: "Hair Care", name: "Amla & Shikakai Hair Oil", subtitle: "Natural Hair Growth", description: "Traditional Ayurvedic blend for strong, long hair", weight: "100ml", benefits: ["Hair Growth", "Dandruff Control", "Strengthening"], price: "₹450", images: [
    "https://images.unsplash.com/photo-1608248543803-ba4f8e7e4c2f?w=800",
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },
  { category: "Hair Care", name: "Herbal Hair Gel", subtitle: "Natural Styling", description: "Chemical-free styling gel made with plant-based ingredients", weight: "100g", benefits: ["Natural Hold", "No Residue", "Nourishing"], price: "₹250", images: [
    "https://images.unsplash.com/photo-1608248543803-ba4f8e7e4c2f?w=800",
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },

  // Body Care
  { category: "Body Care", name: "Body Butter", subtitle: "Rich Moisturizing", description: "Luxuriously rich body butter with shea and cocoa butter", weight: "200g", benefits: ["Intense Hydration", "24h Moisture", "Skin Repair"], price: "₹550", images: [
    "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800",
    "https://images.unsplash.com/photo-1512495855095-c44569725e80?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },
  { category: "Body Care", name: "Scrubbing Loofah", subtitle: "Natural Exfoliation", description: "Eco-friendly loofah sponge for gentle daily exfoliation", weight: "Single Piece", benefits: ["Exfoliating", "Eco-Friendly", "Long-Lasting"], price: "₹150", images: [
    "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800",
    "https://images.unsplash.com/photo-1512495855095-c44569725e80?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },
  { category: "Body Care", name: "Body Scrub", subtitle: "Sugar & Sea Salt", description: "Gentle exfoliating body scrub for smooth, radiant skin", weight: "250g", benefits: ["Exfoliating", "Moisturizing", "Detoxifying"], price: "₹400", images: [
    "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800",
    "https://images.unsplash.com/photo-1512495855095-c44569725e80?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },
  { category: "Body Care", name: "Massage Oil", subtitle: "Aromatherapy", description: "Blend of essential oils for therapeutic massage", weight: "100ml", benefits: ["Relaxing", "Pain Relief", "Moisturizing"], price: "₹500", images: [
    "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800",
    "https://images.unsplash.com/photo-1512495855095-c44569725e80?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },

  // Bath & Spa
  { category: "Bath & Spa", name: "Bath Bombs", subtitle: "Aromatherapy", description: "Transform your bath into a luxurious spa experience", weight: "150g", benefits: ["Relaxing", "Skin Softening", "Aromatic"], price: "₹200", images: [
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800",
    "https://images.unsplash.com/photo-1607820079609-2f90551076dd?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },
  { category: "Bath & Spa", name: "Bath Salts", subtitle: "Muscle Relief", description: "Soothe tired muscles and promote relaxation", weight: "250g", benefits: ["Muscle Relief", "Detoxifying", "Stress Relief"], price: "₹350", images: [
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800",
    "https://images.unsplash.com/photo-1607820079609-2f90551076dd?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },
  { category: "Bath & Spa", name: "Bubble Bath", subtitle: "Luxury Soaking", description: "Create voluminous bubbles for a pampering soak", weight: "300ml", benefits: ["Luxurious", "Skin Soothing", "Aromatic"], price: "₹400", images: [
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800",
    "https://images.unsplash.com/photo-1607820079609-2f90551076dd?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },
  { category: "Bath & Spa", name: "Bath Herbs Bundle", subtitle: "Ayurvedic Bath", description: "Traditional herbal blend for therapeutic bathing", weight: "100g", benefits: ["Therapeutic", "Natural", "Skin Healing"], price: "₹200", images: [
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800",
    "https://images.unsplash.com/photo-1607820079609-2f90551076dd?w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
  ] },

  // Face Care
  { category: "Face Care", name: "Natural Face Wash", subtitle: "Gentle Cleansing", description: "Mild face wash suitable for all skin types", weight: "150ml", benefits: ["Gentle", "pH Balanced", "Non-drying"], price: "₹300", images: [
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800",
    "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=800",
    "https://images.unsplash.com/photo-1630177864481-0bb6e94b1f63?w=800"
  ] },
  { category: "Face Care", name: "Vitamin C Face Serum", subtitle: "Brightening", description: "Brighten and even out skin tone with Vitamin C", weight: "30ml", benefits: ["Brightening", "Antioxidant", "Anti-aging"], price: "₹600", images: [
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800",
    "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=800",
    "https://images.unsplash.com/photo-1630177864481-0bb6e94b1f63?w=800"
  ] },
  { category: "Face Care", name: "Face Mask", subtitle: "Detoxifying", description: "Clay-based face mask for deep pore cleansing", weight: "100g", benefits: ["Detoxifying", "Oil Control", "Deep Cleansing"], price: "₹350", images: [
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800",
    "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=800",
    "https://images.unsplash.com/photo-1630177864481-0bb6e94b1f63?w=800"
  ] },
  { category: "Face Care", name: "Under Eye Cream", subtitle: "Anti-Aging", description: "Reduce dark circles and fine lines naturally", weight: "30ml", benefits: ["Dark Circles", "Hydrating", "Anti-aging"], price: "₹450", images: [
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800",
    "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=800",
    "https://images.unsplash.com/photo-1630177864481-0bb6e94b1f63?w=800"
  ] },

  // Gift Sets
  { category: "Gift Sets", name: "Luxury Bath Set", subtitle: "Complete Experience", description: "A complete bath collection in an elegant gift box", weight: "Varied", benefits: ["Luxury", "Complete Care", "Gift Ready"], price: "₹1,200", images: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800"
  ] },
  { category: "Gift Sets", name: "Skincare Essentials", subtitle: "Daily Routine", description: "Your daily skincare routine in one beautiful set", weight: "Varied", benefits: ["Complete Care", "Routine", "Value"], price: "₹1,500", images: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800"
  ] },
  { category: "Gift Sets", name: "Hair Care Combo", subtitle: "Hair Transformation", description: "Complete hair care solution for healthy locks", weight: "Varied", benefits: ["Complete Care", "Healthy Hair", "Value"], price: "₹1,300", images: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800"
  ] },
];

const Shop = () => {
  const categories = Array.from(new Set(allProducts.map(p => p.category)));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-20 pb-12 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
                Our Shop
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover our complete collection of natural, handcrafted products
              </p>
            </div>
          </div>
        </section>

        {categories.map(category => (
          <section key={category} className="py-12" id={category.toLowerCase().replace(/\s+/g, '-')}>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allProducts
                  .filter(product => product.category === category)
                  .map((product, index) => (
                    <Card
                      key={`${product.name}-${index}`}
                      className="group hover:shadow-lg transition-all duration-300 bg-card border-border overflow-hidden h-full flex flex-col"
                    >
                      <div className="h-64 relative overflow-hidden">
                        {product.images && product.images.length > 0 ? (
                          <ImageCarousel images={product.images} alt={product.name} className="h-full" />
                        ) : (
                          <div className="h-full bg-gradient-to-br from-primary/20 to-accent/20" />
                        )}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-3 py-1 bg-background/90 rounded-full text-xs font-medium text-foreground backdrop-blur-sm">
                            {product.category}
                          </span>
                        </div>
                        <div className="absolute bottom-4 right-4 z-10">
                          <span className="px-3 py-2 bg-background/90 rounded-full text-sm font-bold text-primary backdrop-blur-sm">
                            {product.price}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6 space-y-4 flex-grow flex flex-col">
                        <div>
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-primary font-medium">{product.subtitle}</p>
                        </div>

                        <p className="text-sm text-muted-foreground flex-grow">{product.description}</p>

                        <div className="text-xs text-muted-foreground">
                          Weight: {product.weight}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {product.benefits.slice(0, 3).map((benefit) => (
                            <span
                              key={benefit}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>

                        <Button className="w-full bg-primary hover:bg-primary/90 group mt-auto">
                          <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Shop;

