import { Heart, Leaf, Sparkles, Shield, Droplet, Sun } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Enhances Absorption",
    description: "Natural ingredients penetrate deeply for maximum effectiveness",
  },
  {
    icon: Droplet,
    title: "Improves Blood Circulation",
    description: "Stimulates healthy blood flow for radiant skin",
  },
  {
    icon: Sparkles,
    title: "Exfoliates Skin",
    description: "Gently removes dead skin cells for a fresh glow",
  },
  {
    icon: Leaf,
    title: "Reduces Stress",
    description: "Aromatherapy benefits calm mind and body",
  },
  {
    icon: Shield,
    title: "Relieves Muscle Tension",
    description: "Soothes tired muscles naturally",
  },
  {
    icon: Sun,
    title: "Stimulates Lymphatic Flow",
    description: "Supports natural detoxification processes",
  },
];

const Benefits = () => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 md:mb-4">
            Natural Benefits
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Experience the transformative power of nature with every use
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group p-4 md:p-6 rounded-xl md:rounded-2xl bg-card hover:bg-primary/5 border border-border hover:border-primary/20 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
