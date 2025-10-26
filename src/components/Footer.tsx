import { Instagram, Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="BRIMSTONE" className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="font-bold text-foreground">BRIMSTONE</h3>
                <p className="text-xs text-muted-foreground">Spark of wild beauty</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Natural handmade soaps crafted with love and care for your skin.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="text-muted-foreground hover:text-primary transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Natural Soaps</li>
              <li>Bath Bombs</li>
              <li>Bath Salts</li>
              <li>Natural Shampoo</li>
              <li>Hair Gel</li>
              <li>Natural Loofa</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Connect</h4>
            <div className="space-y-3">
              <a
                href="https://instagram.com/brimstonebathnbeauti"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @brimstonebathnbeauti
              </a>
              <a
                href="mailto:brimstoneoffical2310@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </a>
              <a
                href="tel:+919971339565"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 9971339565
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground space-y-2">
          <p>&copy; {new Date().getFullYear()} BRIMSTONE. All rights reserved.</p>
          <p className="mt-1">Handcrafted with love for your natural beauty</p>
              <p className="mt-2 text-base">
                Built with ❤️ by{' '}
                <a
                  href="https://amrendra.engineer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-semibold text-lg"
                >
                  Amrendra Tripathi
                </a>
                {' '}
                <a
                  href="https://instagram.com/amrendratripathi06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors ml-3"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
