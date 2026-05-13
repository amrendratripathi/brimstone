import { useEffect, useRef, useState } from "react";
import { ArrowRight, Leaf, Heart, Sparkles } from "lucide-react";
import Shuffle from "@/components/ui/shuffle";

const features = [
  { icon: "🌿", title: "Pure Ingredients", sub: "Nature's finest gifts" },
  { icon: "🤲", title: "Handmade", sub: "Small batch crafted" },
  { icon: "❤️", title: "Made with Love", sub: "For healthy glowing skin" },
];

const badges = [
  { icon: "🌱", title: "100% Natural", sub: "Pure & Chemical Free" },
  { icon: "🐇", title: "Cruelty Free", sub: "Not Tested on Animals" },
  { icon: "🌍", title: "Eco Friendly", sub: "Sustainable & Green" },
  { icon: "✨", title: "Skin Loving", sub: "Dermatologically Safe" },
  { icon: "💧", title: "Rich in Glycerin", sub: "Deeply Moisturising" },
];

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-[80vh] md:min-h-screen flex flex-col overflow-hidden">

      {/* ── Full-bleed background image ── */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/brim_background.png')" }}
      />

      {/* ── Overlays for text legibility ── */}
      {/* Strong left-side gradient so white text reads clearly */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/10" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-10 bg-gradient-to-t from-black/60 to-transparent" />
      {/* Subtle green tint to match brand */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-green-950/30 via-transparent to-transparent" />

      {/* ── Main hero content (two-column) ── */}
      <div className="relative z-20 flex-1 flex items-center pt-20 pb-0">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-6 items-center min-h-[60vh] py-8 sm:py-12">

            {/* ── LEFT: Text & CTAs ── */}
            <div className="space-y-6 md:space-y-8">

              {/* Natural badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white text-xs font-semibold tracking-widest uppercase transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <Leaf className="w-3.5 h-3.5 text-green-300" />
                100% Natural & Handmade
              </div>

              {/* Brand name */}
              <div
                className={`transition-all duration-700 delay-100 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <Shuffle
                  text="BRIMSTONE"
                  tag="h1"
                  className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight text-white drop-shadow-lg"
                  shuffleDirection="right"
                  duration={0.35}
                  stagger={0.03}
                  animationMode="evenodd"
                  ease="power3.out"
                  triggerOnce={true}
                  triggerOnHover={true}
                  threshold={0.1}
                  rootMargin="-50px"
                />
                <h2
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white/90 mt-2 leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  <span className="italic text-white/80">Spark of</span>{" "}
                  <span
                    className="font-semibold not-italic"
                    style={{
                      background: "linear-gradient(90deg, #86efac, #fbbf24, #86efac)",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      animation: "shimmer 3s linear infinite",
                    }}
                  >
                    Wild Beauty
                  </span>
                </h2>
              </div>

              {/* Description */}
              <p
                className={`text-base sm:text-lg text-white/75 max-w-md leading-relaxed transition-all duration-700 delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Handcrafted soaps and bath essentials made with pure ingredients and wild nature.
                <span className="block mt-1">Gentle on your skin. Kind to the earth.</span>
              </p>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <a
                  href="/shop"
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full bg-white/15 backdrop-blur-md border-2 border-white/40 text-white font-semibold text-sm hover:bg-white/25 hover:border-white/70 transition-all duration-300 hover:scale-[1.03] overflow-hidden w-full sm:w-auto"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Explore Collection</span>
                  <ArrowRight className="w-4 h-4 relative transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="#about"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full border-2 border-white/25 text-white/80 font-semibold text-sm hover:border-white/50 hover:text-white transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto"
                >
                  Our Story
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>

              {/* Feature pills — Hidden on small mobile to keep it classy */}
              <div
                className={`hidden md:flex flex-wrap gap-3 pt-2 transition-all duration-700 delay-400 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                {features.map((f) => (
                  <div
                    key={f.title}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/15 text-white"
                  >
                    <span className="text-lg">{f.icon}</span>
                    <div>
                      <p className="text-xs font-semibold leading-tight">{f.title}</p>
                      <p className="text-[10px] text-white/60 leading-tight">{f.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: empty — background image provides the visual ── */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </div>

      {/* ── Bottom trust badges bar ── */}
      <div
        className={`relative z-20 w-full transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="bg-white/10 backdrop-blur-xl border-t border-white/15">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4">
            <div className="flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
              {badges.map((b, i) => (
                <div
                  key={b.title}
                  className={`flex items-center gap-2.5 flex-shrink-0 px-3 py-1 ${
                    i < badges.length - 1 ? "border-r border-white/20 pr-5 sm:pr-8" : ""
                  }`}
                >
                  <span className="text-xl">{b.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">{b.title}</p>
                    <p className="text-[10px] text-white/60 leading-tight hidden sm:block">{b.sub}</p>
                  </div>
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
