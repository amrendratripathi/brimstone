import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Instagram, MessageCircle, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-12 md:py-20 bg-muted/30">
      <div className="w-full px-2 xs:px-3 sm:px-4 max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 md:mb-4">
            Contact Us
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Get in touch with us for any inquiries or support
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  BRIMSTONE
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="text-foreground font-medium">
                        A/275, Vijay Vihar, Rohini, Delhi, 110085, India
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a
                      href="tel:+918957294010"
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="text-foreground font-medium text-green-600">+91 89572 94010</p>
                      </div>
                    </a>

                    <a
                      href="tel:+919971339565"
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="text-foreground font-medium text-green-600">+91 9971339565</p>
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
              <h3 className="text-2xl font-bold text-foreground mb-6">Hours</h3>

              <div className="space-y-3">
                {[
                  { day: "Monday", hours: "09:00 am - 06:00 pm" },
                  { day: "Tuesday", hours: "09:00 am - 06:00 pm" },
                  { day: "Wednesday", hours: "09:00 am - 06:00 pm" },
                  { day: "Thursday", hours: "09:00 am - 06:00 pm", current: true },
                  { day: "Friday", hours: "09:00 am - 06:00 pm" },
                  { day: "Saturday", hours: "Closed" },
                  { day: "Sunday", hours: "Closed" },
                ].map((schedule, index) => (
                  <div key={schedule.day} className="flex justify-between items-center py-2">
                    <span className={`font-medium ${schedule.current ? 'text-primary' : 'text-foreground'}`}>
                      {schedule.day}
                    </span>
                    <span className={`text-sm ${schedule.hours === 'Closed' ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <a
                  href="https://wa.me/918957294010"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors group"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
