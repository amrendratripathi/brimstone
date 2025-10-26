import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Shuffle from "@/components/ui/shuffle";
import backgroundImage from "@/assets/background.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Scrolling Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background z-10" />

      {/* Content */}
      <div className="relative z-20 w-full">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />

        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 text-primary">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm font-medium">100% Natural & Handmade</span>
            </div>

            {/* BRRIMSTONE with Shuffle Animation */}
            <Shuffle
              text="BRIMSTONE"
              tag="h1"
              className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold leading-none"
              shuffleDirection="right"
              duration={0.35}
              stagger={0.03}
              animationMode="evenodd"
              ease="power3.out"
              triggerOnce={true}
              triggerOnHover={true}
            />

            <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold text-foreground leading-tight mb-2 md:mb-4">
              Spark of
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Wild Beauty
              </span>
            </h2>

            <p className="text-base md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto px-4">
              Discover the essence of nature with our handcrafted soaps and bath products.
              Pure ingredients, wild benefits.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center pt-2 md:pt-4 px-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground group px-6 py-5 md:px-8 md:py-6 text-base md:text-lg w-full sm:w-auto"
                asChild
              >
                <a href="#products">Explore Catagories</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/10 px-6 py-5 md:px-8 md:py-6 text-base md:text-lg w-full sm:w-auto"
                asChild
              >
                <a href="/shop">Shop Now</a>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 md:pt-12 max-w-2xl mx-auto px-4">
              {[
                { label: "Natural", value: "100%" },
                { label: "Cruelty Free", value: "✓" },
                { label: "Vegan", value: "✓" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
