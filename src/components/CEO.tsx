import { Sparkles, Quote } from "lucide-react";
import ceoImage from "@/assets/categories/CEO.png";

const CEO = () => {
  return (
    <section className="py-14 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/3 to-muted/30 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative w-full px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16 animate-fade-in">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/80 font-semibold mb-3">
            Leadership
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Meet Our Founder
          </h2>
          <div className="section-divider mb-5" />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/25">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold tracking-widest uppercase text-primary/90">
              Visionary Leader
            </span>
          </div>
        </div>

        {/* Content Card */}
        <div className="relative rounded-3xl glass border border-primary/20 p-8 md:p-12 lg:p-16 overflow-hidden shadow-[0_8px_60px_hsl(145_28%_40%/0.1)] animate-fade-in">
          {/* Background decoration */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent/8 blur-3xl" />

          <div className="relative grid md:grid-cols-3 gap-10 md:gap-12 items-center">
            {/* Text */}
            <div className="md:col-span-2 space-y-5">
              {/* Quote icon */}
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Quote className="w-5 h-5 text-primary" />
              </div>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Welcome to BRIMSTONE, where passion meets purpose. I'm{" "}
                <span className="font-bold text-foreground">Shruti Tripathi</span>, the founder
                and creative force behind this brand.
              </p>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                My journey began with a simple belief: that nature has all the answers for
                beautiful, healthy skin. After years of research and experimentation, I've
                crafted each product in our collection to bring you the finest natural
                ingredients sourced with care and respect for our environment.
              </p>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                At BRIMSTONE, we're not just creating products — we're crafting experiences
                that celebrate the{" "}
                <span className="italic font-semibold text-primary">
                  "spark of wild beauty"
                </span>{" "}
                in each of us.
              </p>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Thank you for being part of our journey toward natural, sustainable beauty.
              </p>

              {/* Signature */}
              <div className="pt-6 border-t border-primary/15">
                <p
                  className="text-primary font-semibold text-xl"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Shruti Tripathi
                </p>
                <p className="text-sm text-muted-foreground tracking-wide mt-0.5">
                  Founder & CEO, BRIMSTONE
                </p>
              </div>
            </div>

            {/* CEO Image */}
            <div className="flex justify-center md:justify-end">
              <div className="relative group">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-xl scale-110 opacity-60 group-hover:opacity-90 transition-opacity duration-500 animate-glow-pulse" />

                {/* Image container */}
                <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-primary/25 shadow-[0_8px_40px_hsl(145_28%_40%/0.25)] group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={ceoImage}
                    alt="Shruti Tripathi - Founder & CEO"
                    className="w-full h-full object-cover"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary/25 animate-ping-slow" />
                <div
                  className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-accent/40 animate-ping-slow"
                  style={{ animationDelay: "0.8s" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEO;
