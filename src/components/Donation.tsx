import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import donationImage from "@/assets/categories/donation.png";

const Donation = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
      {/* Background Image with low opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: `url(${donationImage})`,
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <Card className="p-12 md:p-16 bg-card border-2 border-primary/20 shadow-lg">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Heart className="w-12 h-12 text-primary" fill="currentColor" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Sprinkle a little kindness! 💖
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              We're donating 2% of our profits to special children's NGOs
            </p>
            
            <div className="pt-8 space-y-4 max-w-2xl mx-auto text-left">
              <p className="text-muted-foreground">
                At BRIMSTONE, we believe in making a difference beyond beauty. With every purchase 
                you make, you're not just treating yourself to natural, handcrafted products—you're 
                also contributing to a cause that matters.
              </p>
              <p className="text-muted-foreground">
                We're committed to donating <span className="font-bold text-primary">2% of our profits</span> to 
                organizations that support and empower special children. Together, we can create a world 
                where kindness and care extend to everyone.
              </p>
            </div>
            
            <div className="pt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">
                Thank you for being part of our journey 💙
              </span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Donation;

