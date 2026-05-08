import { Instagram, Mail, Phone, Leaf } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-border/50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/60 via-card to-muted/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6 pt-16 pb-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <a href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-md group-hover:bg-primary/30 transition-colors duration-300" />
                <img
                  src={logo}
                  alt="BRIMSTONE"
                  className="relative w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                />
              </div>
              <div>
                <span
                  className="block font-bold text-foreground tracking-widest text-sm"
                  style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.15em" }}
                >
                  BRIMSTONE
                </span>
                <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
                  Spark of wild beauty
                </span>
              </div>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Natural handmade soaps and bath products crafted with love and care for your skin and the planet.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/brimstonebathnbeauti"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass border border-border/60 flex items-center justify-center text-muted-foreground hover:text-pink-500 hover:border-pink-500/40 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:brimstoneoffical2310@gmail.com"
                className="w-9 h-9 rounded-full glass border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="tel:+919971339565"
                className="w-9 h-9 rounded-full glass border border-border/60 flex items-center justify-center text-muted-foreground hover:text-green-500 hover:border-green-500/40 transition-all duration-300 hover:scale-110"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-bold text-foreground mb-5 text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Products", href: "#products" },
                { label: "About Us", href: "#about" },
                { label: "Contact", href: "#contact" },
                { label: "Shop", href: "/shop" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group inline-flex items-center gap-1.5"
                  >
                    <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4
              className="font-bold text-foreground mb-5 text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Products
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Natural Soaps",
                "Bath Bombs",
                "Bath Salts",
                "Natural Shampoo",
                "Hair Gel",
                "Natural Loofa",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Leaf className="w-3 h-3 text-primary/50 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4
              className="font-bold text-foreground mb-5 text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Connect
            </h4>
            <div className="space-y-4 text-sm">
              <a
                href="https://instagram.com/brimstonebathnbeauti"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-pink-500 transition-colors duration-300 group"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500/20 to-pink-500/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Instagram className="w-3.5 h-3.5 text-pink-500" />
                </div>
                @brimstonebathnbeauti
              </a>
              <a
                href="mailto:brimstoneoffical2310@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                </div>
                brimstoneoffical2310@gmail.com
              </a>
              <a
                href="tel:+919971339565"
                className="flex items-center gap-3 text-muted-foreground hover:text-green-500 transition-colors duration-300 group"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-3.5 h-3.5 text-green-500" />
                </div>
                +91 9971339565
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/40">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="text-center sm:text-left">
              <p>© {new Date().getFullYear()} BRIMSTONE. All rights reserved.</p>
              <p className="text-xs mt-0.5">Handcrafted with love for your natural beauty 🌿</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span>Built with ❤️ by</span>
              <a
                href="https://amrendra.engineer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                Amrendra Tripathi
              </a>
              <a
                href="https://instagram.com/amrendratripathi06"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-muted-foreground hover:text-pink-500 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
