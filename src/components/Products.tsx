import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import bodyImage from "@/assets/categories/body.jpg";
import hairImage from "@/assets/categories/hair.jpg";
import skinImage from "@/assets/categories/skin.jpg";
import dentalImage from "@/assets/categories/dental.jpg";
import eyesAndLipsImage from "@/assets/categories/eyes and lips.jpg";
import giftImage from "@/assets/categories/gift.jpg";

const categories = [
  {
    name: "BODY",
    image: bodyImage,
    description: "Complete body care products",
  },
  {
    name: "HAIR",
    image: hairImage,
    description: "Natural hair care solutions",
  },
  {
    name: "FACE",
    image: skinImage,
    description: "Skincare for radiant face",
  },
  {
    name: "DENTAL",
    image: dentalImage,
    description: "Natural oral care products",
  },
  {
    name: "EYES AND LIPS",
    image: eyesAndLipsImage,
    description: "Delicate eye and lip care",
  },
  {
    name: "GIFT COMBOS",
    image: giftImage,
    description: "Perfect gift sets",
  },
];

const Products = () => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate('/shop');
  };

  return (
    <section id="products" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Categories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handcrafted with love, every product celebrates the power of natural ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card
              key={category.name}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 animate-fade-in bg-card border-border overflow-hidden relative"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={handleCategoryClick}
            >
              <div className="h-96 relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
