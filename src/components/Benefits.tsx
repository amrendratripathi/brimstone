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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Natural Benefits
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the transformative power of nature with every use
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group p-6 rounded-2xl bg-card hover:bg-primary/5 border border-border hover:border-primary/20 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-primary" />
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
