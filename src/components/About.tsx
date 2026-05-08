import { Check, Leaf } from "lucide-react";

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
    <section
      id="about"
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-muted/20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative w-full px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Left — Text */}
            <div className="space-y-6 md:space-y-8 animate-fade-in">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-primary/80 font-semibold mb-3">
                  Our Philosophy
                </p>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Why Choose{" "}
                  <span className="italic text-primary">Natural?</span>
                </h2>
                <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
              </div>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                At BRIMSTONE, we believe that beauty comes from nature. Our products are
                carefully handcrafted using traditional cold-pressed methods to preserve the
                natural goodness of every ingredient.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Each soap is made with love, ensuring you receive only the finest quality
                products — gentle on your skin, kind to the environment.
              </p>

              {/* Commitment card */}
              <div className="relative p-6 rounded-2xl glass border border-primary/20 overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-primary/8 blur-2xl" />
                <h3
                  className="text-lg font-bold text-foreground mb-5"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}
                >
                  Our Commitment
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {whyChooseUs.map((item, index) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-foreground animate-fade-in"
                      style={{ animationDelay: `${index * 0.06}s` }}
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
                      </div>
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — Visual */}
            <div className="relative flex items-center justify-center animate-scale-in">
              {/* Morphing blob background */}
              <div
                className="absolute w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-primary/20 via-accent/15 to-secondary/20 animate-morph blur-sm"
              />

              {/* Main visual card */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl glass border border-primary/25 flex flex-col items-center justify-center text-center p-8 shadow-[0_8px_40px_hsl(145_28%_40%/0.15)] overflow-hidden group">
                {/* Rotating ring decoration */}
                <div className="absolute w-full h-full rounded-3xl border border-dashed border-primary/15 animate-spin-slow" />

                {/* Center Icon */}
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <Leaf className="w-10 h-10 text-primary" />
                  </div>
                  {/* Ping ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping-slow" />
                </div>

                <h3
                  className="text-2xl font-bold text-foreground mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Spark of Wild Beauty
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Handcrafted with nature's finest ingredients
                </p>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/40 animate-ping-slow" style={{ animationDelay: "0.5s" }} />
                <div className="absolute bottom-6 left-6 w-1.5 h-1.5 rounded-full bg-accent/60 animate-ping-slow" style={{ animationDelay: "1s" }} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
