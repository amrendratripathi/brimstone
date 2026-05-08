import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Leaf, Star } from "lucide-react";
import Shuffle from "@/components/ui/shuffle";
import backgroundImage from "@/assets/background.png";

const stats = [
  { label: "Natural", value: "100%", icon: "🌿" },
  { label: "Cruelty Free", value: "✓", icon: "🐇" },
  { label: "Vegan", value: "✓", icon: "🌱" },
];

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  delay: Math.random() * 4,
  duration: 3 + Math.random() * 4,
}));

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Rich Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700"
        style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.12 }}
      />

      {/* Multi-layer gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 via-background/60 to-background z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />

      {/* Floating Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-primary/8 blur-3xl animate-float-slow z-10 pointer-events-none" />
      <div
        className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float-slow z-10 pointer-events-none"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/4 blur-3xl z-10 pointer-events-none"
        style={{ animationDelay: "1s" }}
      />

      {/* Scattered Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute z-10 rounded-full bg-primary/30 pointer-events-none animate-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Decorative ring */}
      <div
        className="absolute top-20 right-16 w-32 h-32 rounded-full border border-primary/20 animate-spin-slow z-10 pointer-events-none"
      />
      <div
        className="absolute bottom-24 left-16 w-20 h-20 rounded-full border border-accent/30 animate-spin-slow z-10 pointer-events-none"
        style={{ animationDirection: "reverse", animationDuration: "15s" }}
      />

      {/* Leaf decoration */}
      <div
        className="absolute top-32 right-32 text-primary/20 animate-float z-10 pointer-events-none"
        style={{ animationDelay: "0.5s" }}
      >
        <Leaf className="w-10 h-10" />
      </div>
      <div
        className="absolute bottom-32 left-32 text-accent/25 animate-float z-10 pointer-events-none"
        style={{ animationDelay: "1.5s" }}
      >
        <Star className="w-8 h-8" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full">
        <div className="w-full px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-28">
          <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 md:space-y-10">

            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 shadow-sm transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping-slow" />
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold tracking-widest uppercase text-primary/90">
                100% Natural & Handmade
              </span>
            </div>

            {/* Brand Name */}
            <div
              className={`relative transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Shuffle
                text="BRIMSTONE"
                tag="h1"
                className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight text-foreground"
                shuffleDirection="right"
                duration={0.35}
                stagger={0.03}
                animationMode="evenodd"
                ease="power3.out"
                triggerOnce={true}
                triggerOnHover={true}
                threshold={0.1}
                rootMargin="-100px"
              />
              {/* Underline accent */}
              <div
                className={`section-divider mt-4 mx-auto transition-all duration-1000 delay-500 ${
                  isVisible ? "opacity-100 w-24" : "opacity-0 w-0"
                }`}
                style={{ width: isVisible ? "6rem" : "0" }}
              />
            </div>

            {/* Tagline */}
            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight">
                <span className="italic">Spark of</span>{" "}
                <span
                  className="text-shimmer font-semibold not-italic"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Wild Beauty
                </span>
              </h2>
            </div>

            {/* Description */}
            <p
              className={`text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Discover the essence of nature with our handcrafted soaps and bath products.
              Pure ingredients, wild benefits — crafted with love and care.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center pt-2 transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <a
                href="#products"
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm sm:text-base overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_hsl(145_28%_40%/0.4)] hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto justify-center"
              >
                {/* Shimmer sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Explore Categories</span>
                <ArrowRight className="w-4 h-4 relative transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="/shop"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-primary/50 text-primary font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-primary/8 hover:border-primary hover:scale-[1.02] active:scale-[0.98] glass w-full sm:w-auto justify-center"
              >
                <Sparkles className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                Shop Now
              </a>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-4 sm:gap-8 pt-8 sm:pt-12 max-w-lg mx-auto transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center group cursor-default"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="text-2xl mb-1 group-hover:animate-wave inline-block transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary font-serif">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-0.5 tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll indicator */}
            <div
              className={`flex flex-col items-center gap-2 pt-4 transition-all duration-700 delay-700 ${
                isVisible ? "opacity-60 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="text-xs tracking-widest uppercase text-muted-foreground">Scroll</span>
              <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent animate-pulse" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
