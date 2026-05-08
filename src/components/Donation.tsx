import { Heart, Sparkles } from "lucide-react";
import donationImage from "@/assets/categories/donation.png";

const Donation = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/8 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative w-full px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/80 font-semibold mb-3">
            Our Mission
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Giving Back 💖
          </h2>
          <div className="section-divider" />
        </div>

        {/* Main card */}
        <div className="relative rounded-3xl glass border border-primary/20 overflow-hidden shadow-[0_8px_60px_hsl(145_28%_40%/0.1)] animate-fade-in">
          {/* Background image overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-5 pointer-events-none"
            style={{ backgroundImage: `url(${donationImage})` }}
          />

          {/* Background blobs */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative grid md:grid-cols-2 gap-0 items-stretch">
            {/* Left — Text */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-6">
              {/* Heart icon */}
              <div className="relative w-16 h-16 mx-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-500/5 flex items-center justify-center border border-rose-500/20">
                  <Heart className="w-8 h-8 text-rose-500" fill="currentColor" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500/30 animate-ping-slow" />
              </div>

              <div>
                <h3
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Sprinkle a Little Kindness
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  At BRIMSTONE, we believe in making a difference beyond beauty. With every
                  purchase you make, you're not just treating yourself to natural, handcrafted
                  products — you're also contributing to a cause that truly matters.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  We're committed to donating{" "}
                  <span className="font-bold text-primary text-xl">2% of our profits</span> to
                  organizations that support and empower special children. Together, we can
                  create a world where kindness and care extend to everyone.
                </p>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full glass border border-primary/25 self-start">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  Thank you for being part of our journey 💙
                </span>
              </div>
            </div>

            {/* Right — Image */}
            <div className="relative min-h-64 md:min-h-full overflow-hidden">
              <img
                src={donationImage}
                alt="Children supported by our donations"
                className="w-full h-full object-cover min-h-64 md:min-h-96"
              />
              {/* Gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-card/30" />
              {/* Stats overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-2xl p-4 border border-white/20">
                  <p className="text-white font-bold text-2xl mb-0.5">2%</p>
                  <p className="text-white/80 text-sm">of every purchase goes to NGOs supporting special children</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;
