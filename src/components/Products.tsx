import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import bodyImage from "@/assets/categories/body.jpg";
import hairImage from "@/assets/categories/hair.jpg";
import skinImage from "@/assets/categories/skin.jpg";
import dentalImage from "@/assets/categories/dental.jpg";
import eyesAndLipsImage from "@/assets/categories/eyes and lips.jpg";
import giftImage from "@/assets/categories/gift.jpg";

const categories = [
  { name: "BODY", image: bodyImage, description: "Complete body care products", emoji: "🧴" },
  { name: "HAIR", image: hairImage, description: "Natural hair care solutions", emoji: "✨" },
  { name: "FACE", image: skinImage, description: "Skincare for radiant face", emoji: "🌸" },
  { name: "DENTAL", image: dentalImage, description: "Natural oral care products", emoji: "🦷" },
  { name: "EYES & LIPS", image: eyesAndLipsImage, description: "Delicate eye and lip care", emoji: "👁️" },
  { name: "GIFT COMBOS", image: giftImage, description: "Perfect gift sets", emoji: "🎁" },
];

const Products = () => {
  const navigate = useNavigate();

  return (
    <section id="products" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-muted/20 to-background pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative w-full px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20 max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/80 font-semibold mb-3">
            Explore
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Our Categories
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Handcrafted with love — every product celebrates the power of natural ingredients
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="group relative cursor-pointer overflow-hidden rounded-2xl hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate("/shop")}
            >
              {/* Image */}
              <div className="h-52 sm:h-64 md:h-80 relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300" />

                {/* Hover tint */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                    <div className="text-2xl mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {category.emoji}
                    </div>
                    <h3
                      className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-wide"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {category.name}
                    </h3>
                    <p className="text-white/75 text-sm leading-snug mb-3">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-white/90 text-xs font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10 md:mt-14">
          <a
            href="/shop"
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border-2 border-primary/40 text-primary font-semibold text-sm hover:bg-primary/8 hover:border-primary transition-all duration-300 glass"
          >
            View All Products
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;
