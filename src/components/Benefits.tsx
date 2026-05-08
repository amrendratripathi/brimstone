import { Heart, Leaf, Sparkles, Shield, Droplet, Sun } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Enhances Absorption",
    description: "Natural ingredients penetrate deeply for maximum effectiveness",
    color: "from-rose-500/20 to-rose-500/5",
    iconColor: "text-rose-500",
    ringColor: "ring-rose-500/20",
  },
  {
    icon: Droplet,
    title: "Improves Blood Circulation",
    description: "Stimulates healthy blood flow for radiant, glowing skin",
    color: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-500",
    ringColor: "ring-blue-500/20",
  },
  {
    icon: Sparkles,
    title: "Exfoliates Skin",
    description: "Gently removes dead skin cells for a fresh, luminous glow",
    color: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-500",
    ringColor: "ring-amber-500/20",
  },
  {
    icon: Leaf,
    title: "Reduces Stress",
    description: "Aromatherapy benefits that calm the mind and restore balance",
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
    ringColor: "ring-primary/20",
  },
  {
    icon: Shield,
    title: "Relieves Muscle Tension",
    description: "Soothes tired, aching muscles with natural botanical extracts",
    color: "from-violet-500/20 to-violet-500/5",
    iconColor: "text-violet-500",
    ringColor: "ring-violet-500/20",
  },
  {
    icon: Sun,
    title: "Stimulates Lymphatic Flow",
    description: "Supports your body's natural detoxification and renewal",
    color: "from-orange-500/20 to-orange-500/5",
    iconColor: "text-orange-500",
    ringColor: "ring-orange-500/20",
  },
];

const Benefits = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.05)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--accent)/0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative w-full px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20 max-w-6xl mx-auto animate-fade-in">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/80 font-semibold mb-3">
            Why Natural
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Natural Benefits
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Experience the transformative power of nature with every use
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group relative p-6 md:p-7 rounded-2xl border border-border/50 bg-card hover:border-primary/30 transition-all duration-500 animate-fade-in hover-lift overflow-hidden cursor-default"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                />

                {/* Decorative circle */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />

                {/* Icon */}
                <div
                  className={`relative mb-5 w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center ring-2 ${benefit.ringColor} group-hover:scale-110 transition-transform duration-400`}
                >
                  <Icon className={`w-6 h-6 ${benefit.iconColor}`} />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3
                    className="text-lg font-bold text-foreground mb-2 group-hover:text-foreground transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
