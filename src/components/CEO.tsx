import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const CEO = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <Card className="p-6 md:p-12 lg:p-16 bg-card border-2 border-primary/20 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
                Meet Our Founder
              </h2>
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 text-primary">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm font-medium">Visionary Leader</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-center">
              <div className="md:col-span-2 space-y-4 md:space-y-6">
                <div className="space-y-3 md:space-y-4">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Welcome to BRIMSTONE, where passion meets purpose. I'm <span className="font-bold text-foreground">Shruti Tripathi</span>, 
                    the founder and creative force behind this brand.
                  </p>
                  
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    My journey began with a simple belief: that nature has all the answers for beautiful, healthy skin. 
                    After years of research and experimentation, I've crafted each product in our collection to bring 
                    you the finest natural ingredients sourced with care and respect for our environment.
                  </p>

                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    At BRIMSTONE, we're not just creating products—we're crafting experiences that celebrate the "spark of wild beauty" 
                    in each of us. Every soap, every product is made by hand with love, ensuring that what goes on your skin 
                    is as pure and natural as nature intended.
                  </p>

                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Thank you for being part of our journey toward natural, sustainable beauty.
                  </p>
                </div>

                <div className="pt-4 md:pt-6 border-t border-border">
                  <p className="text-primary font-semibold text-base md:text-lg">Shruti Tripathi</p>
                  <p className="text-sm md:text-base text-muted-foreground">Founder & CEO, BRIMSTONE</p>
                </div>
              </div>

              <div className="flex justify-center md:justify-end">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="w-28 h-28 md:w-44 md:h-44 rounded-full bg-card border-2 md:border-4 border-primary/20 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 md:w-20 md:h-20 text-primary/40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CEO;

