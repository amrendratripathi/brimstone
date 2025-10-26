import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import donationImage from "@/assets/categories/donation.png";

const Donation = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
      {/* Background Image with low opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: `url(${donationImage})`,
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <Card className="p-6 md:p-12 lg:p-16 bg-card border-2 border-primary/20 shadow-lg">
          <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="p-3 md:p-4 bg-primary/10 rounded-full">
                <Heart className="w-8 h-8 md:w-12 md:h-12 text-primary" fill="currentColor" />
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Sprinkle a little kindness! 💖
            </h2>
            
            <p className="text-base md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              We're donating 2% of our profits to special children's NGOs
            </p>
            
            <div className="pt-4 md:pt-8 space-y-3 md:space-y-4 max-w-2xl mx-auto text-left px-4">
              <p className="text-sm md:text-base text-muted-foreground">
                At BRIMSTONE, we believe in making a difference beyond beauty. With every purchase 
                you make, you're not just treating yourself to natural, handcrafted products—you're 
                also contributing to a cause that matters.
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                We're committed to donating <span className="font-bold text-primary">2% of our profits</span> to 
                organizations that support and empower special children. Together, we can create a world 
                where kindness and care extend to everyone.
              </p>
            </div>
            
            <div className="pt-4 md:pt-6 inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-primary/10 rounded-full">
              <span className="text-xs md:text-sm font-medium text-primary">
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

