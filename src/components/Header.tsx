import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingBag, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Catagories", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const mobileMenuSections = [
    {
      title: "Shop",
      items: [
        { label: "All Products", href: "/shop" },
        { label: "Categories", href: "#products" },
      ],
    },
    {
      title: "About",
      items: [
        { label: "Our Story", href: "#about" },
        { label: "CEO", href: "#about" },
        { label: "Donation", href: "#about" },
      ],
    },
    {
      title: "Contact",
      items: [
        { label: "Email Us", href: "#contact" },
        { label: "Call Us", href: "#contact" },
        { label: "Instagram", href: "https://instagram.com/brimstonebathnbeauti" },
      ],
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="BRIMSTONE"
              className="w-12 h-12 rounded-full transition-transform duration-300 group-hover:scale-110"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">BRIMSTONE</h1>
              <p className="text-xs text-muted-foreground">Spark of wild beauty</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="w-5 h-5" />
            </Button>
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <a href="/shop">Shop Now</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-2 animate-fade-in bg-card border border-border rounded-lg p-4">
            {navLinks.slice(0, 1).map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground hover:text-primary transition-colors duration-300 py-2 font-medium"
              >
                {link.label}
              </a>
            ))}
            
            {/* Dropdown Sections */}
            {mobileMenuSections.map((section) => (
              <div key={section.title} className="border-t border-border pt-2">
                <button
                  onClick={() => setOpenDropdown(openDropdown === section.title ? null : section.title)}
                  className="w-full flex items-center justify-between py-2 text-foreground hover:text-primary transition-colors font-medium"
                >
                  <span>{section.title}</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform ${openDropdown === section.title ? 'rotate-180' : ''}`}
                  />
                </button>
                {openDropdown === section.title && (
                  <div className="pl-4 mt-2 space-y-1">
                    {section.items.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                        className="block py-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
