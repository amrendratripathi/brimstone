import { Mail, Phone, Instagram, MessageCircle, MapPin } from "lucide-react";

const schedule = [
  { day: "Monday", hours: "09:00 am – 06:00 pm" },
  { day: "Tuesday", hours: "09:00 am – 06:00 pm" },
  { day: "Wednesday", hours: "09:00 am – 06:00 pm" },
  { day: "Thursday", hours: "09:00 am – 06:00 pm" },
  { day: "Friday", hours: "09:00 am – 06:00 pm" },
  { day: "Saturday", hours: "Closed" },
  { day: "Sunday", hours: "Closed" },
];

const contactMethods = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 89572 94010",
    href: "tel:+918957294010",
    color: "text-green-500",
    bg: "from-green-500/20 to-green-500/5",
    ring: "ring-green-500/20",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9971339565",
    href: "tel:+919971339565",
    color: "text-green-500",
    bg: "from-green-500/20 to-green-500/5",
    ring: "ring-green-500/20",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@brimstonebathnbeauti",
    href: "https://instagram.com/brimstonebathnbeauti",
    color: "text-pink-500",
    bg: "from-pink-500/20 to-pink-500/5",
    ring: "ring-pink-500/20",
    external: true,
  },
];

const Contact = () => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/40 to-background pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative w-full px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20 animate-fade-in">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/80 font-semibold mb-3">
            Reach Out
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Contact Us
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Get in touch with us for any inquiries or support
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Left — Contact Info */}
          <div className="space-y-4 animate-fade-in">
            {/* Address */}
            <div className="flex items-start gap-4 p-5 rounded-2xl glass border border-border/50 hover:border-primary/25 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 ring-2 ring-primary/15">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Address</p>
                <p className="text-foreground font-medium text-sm leading-relaxed">
                  A/275, Vijay Vihar, Rohini,<br />Delhi, 110085, India
                </p>
              </div>
            </div>

            {/* Phone & Social */}
            {contactMethods.map((method) => {
              const Icon = method.icon;
              const content = (
                <div className="flex items-center gap-4 p-5 rounded-2xl glass border border-border/50 hover:border-primary/25 transition-all duration-300 group cursor-pointer">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.bg} flex items-center justify-center flex-shrink-0 ring-2 ${method.ring} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-5 h-5 ${method.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{method.label}</p>
                    <p className={`font-semibold text-sm ${method.color}`}>{method.value}</p>
                  </div>
                </div>
              );

              return method.external ? (
                <a
                  key={method.value}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                <a key={method.value} href={method.href}>
                  {content}
                </a>
              );
            })}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/918957294010"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-green-500 text-white font-semibold text-sm transition-all duration-300 hover:bg-green-600 hover:shadow-[0_0_24px_hsl(142_71%_45%/0.4)] hover:scale-[1.01] overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <MessageCircle className="w-5 h-5 relative" />
              <span className="relative">WhatsApp Us</span>
            </a>
          </div>

          {/* Right — Hours */}
          <div
            className="relative rounded-2xl glass border border-border/50 p-6 md:p-8 overflow-hidden animate-fade-in"
            style={{ animationDelay: "0.15s" }}
          >
            {/* Decorative */}
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary/6 blur-3xl" />

            <h3
              className="text-2xl font-bold text-foreground mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Business Hours
            </h3>

            <div className="space-y-2.5">
              {schedule.map((item) => {
                const isToday = item.day === today;
                return (
                  <div
                    key={item.day}
                    className={`flex justify-between items-center py-2.5 px-3 rounded-xl transition-colors ${
                      isToday
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-muted/40"
                    }`}
                  >
                    <span
                      className={`text-sm font-medium ${isToday ? "text-primary" : "text-foreground"}`}
                    >
                      {item.day}
                      {isToday && (
                        <span className="ml-2 text-[10px] uppercase tracking-widest text-primary/70 font-semibold">
                          Today
                        </span>
                      )}
                    </span>
                    <span
                      className={`text-sm ${
                        item.hours === "Closed"
                          ? "text-muted-foreground"
                          : isToday
                          ? "text-primary font-semibold"
                          : "text-foreground"
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Divider + note */}
            <div className="mt-6 pt-6 border-t border-border/50">
              <p className="text-xs text-muted-foreground text-center">
                📦 Orders placed outside hours will be processed the next business day
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
