import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Instagram, Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 md:mb-4">
            Get In Touch
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Have questions? We'd love to hear from you. Send us a message and we'll respond
            as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <a
                    href="mailto:brimstoneoffical2310@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-foreground font-medium">
                        brimstoneoffical2310@gmail.com
                      </p>
                    </div>
                  </a>

                  <div className="space-y-2">
                    <a
                      href="tel:+919971339565"
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="text-foreground font-medium">+91 9971339565</p>
                      </div>
                    </a>

                    <a
                      href="tel:+918957294010"
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="text-foreground font-medium">+91 8957294010</p>
                      </div>
                    </a>
                  </div>

                  <a
                    href="https://instagram.com/brimstonebathnbeauti"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Instagram className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Instagram</p>
                      <p className="text-foreground font-medium">@brimstonebathnbeauti</p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-border animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-foreground mb-6">Send a Message</h3>

              <form className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    className="bg-background border-input"
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="bg-background border-input"
                  />
                </div>

                <div>
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    className="bg-background border-input"
                  />
                </div>

                <div>
                  <Textarea
                    placeholder="Your Message"
                    rows={5}
                    className="bg-background border-input resize-none"
                  />
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 group">
                  Send Message
                  <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
