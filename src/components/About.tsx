import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const whyChooseUs = [
  "100% Natural Ingredients",
  "Cruelty Free & Vegan",
  "Handmade with Love",
  "No Harmful Chemicals",
  "Eco-Friendly Packaging",
  "Cold Pressed Process",
  "Rich in Natural Oils",
  "Suitable for All Skin Types",
];

const About = () => {
  return (
    <section id="about" className="py-12 md:py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="w-full px-2 xs:px-3 sm:px-4">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-4 md:space-y-6 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Why Choose Natural?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              At BRIMSTONE, we believe that beauty comes from nature. Our products are
              carefully handcrafted using traditional cold-pressed methods to preserve the
              natural goodness of every ingredient.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Each soap is made with love, ensuring that you receive only the finest quality
              products that are gentle on your skin and kind to the environment.
            </p>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 md:mb-4">
                  Our Commitment
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                  {whyChooseUs.map((item, index) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-foreground animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="relative animate-scale-in">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5" />
              <div className="relative h-full flex flex-col justify-center items-center text-center space-y-6">
                <div className="w-32 h-32 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                  <Leaf className="w-16 h-16 text-primary" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">
                    Spark of Wild Beauty
                  </h3>
                  <p className="text-muted-foreground">
                    Handcrafted with nature's finest ingredients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Leaf = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

export default About;
