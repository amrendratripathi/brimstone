import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingBag, ChevronDown, LogIn, LogOut, User, Shield } from "lucide-react";
import logo from "@/assets/logo.jpg";
import AuthDialog from "@/components/AuthDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext.tsx";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { isAuthed, role, signOut } = useAuth();
  const { count } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "#products" },
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
        { label: "Our Story", href: "/#about" },
        { label: "CEO", href: "/#about" },
        { label: "Donation", href: "/#about" },
      ],
    },
    {
      title: "Contact",
      items: [
        { label: "Email Us", href: "/#contact" },
        { label: "Call Us", href: "/#contact" },
        { label: "Instagram", href: "https://instagram.com/brimstonebathnbeauti" },
      ],
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass shadow-[0_4px_30px_hsl(145_28%_40%/0.1)] py-2"
          : "bg-transparent py-3"
      }`}
    >
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-md group-hover:bg-primary/35 transition-all duration-300" />
              <img
                src={logo}
                alt="BRIMSTONE"
                className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover transition-transform duration-300 group-hover:scale-110 ring-2 ring-primary/20"
              />
            </div>
            <div>
              <span
                className="block text-sm sm:text-lg md:text-xl font-bold text-foreground tracking-widest"
                style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.15em" }}
              >
                BRIMSTONE
              </span>
              <span className="text-[10px] text-muted-foreground hidden sm:block tracking-widest uppercase">
                Spark of wild beauty
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart */}
            <button
              onClick={() => {
                if (!isAuthed) return setAuthDialogOpen(true);
                window.location.href = "/cart";
              }}
              className="relative p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 group"
            >
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[9px] font-bold leading-none w-4 h-4 flex items-center justify-center rounded-full animate-scale-in">
                  {count}
                </span>
              )}
            </button>

            {!isAuthed ? (
              <button
                onClick={() => setAuthDialogOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 text-primary text-sm font-medium hover:bg-primary/10 hover:border-primary transition-all duration-300 glass"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            ) : (
              <>
                <a
                  href="/account"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-foreground text-sm font-medium hover:border-primary/40 hover:text-primary transition-all duration-300 glass"
                >
                  <User className="w-4 h-4" />
                  Account
                </a>
                {role === "admin" && (
                  <a
                    href="/admin"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 text-primary text-sm font-medium hover:bg-primary/10 transition-all duration-300"
                  >
                    <Shield className="w-4 h-4" />
                    Admin
                  </a>
                )}
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 px-3 py-2 rounded-full text-muted-foreground text-sm hover:text-foreground transition-colors duration-300"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}

            <a
              href="/shop"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_hsl(145_28%_40%/0.4)] hover:scale-[1.03]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Shop Now</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-primary/10 text-foreground transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className={`transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : "rotate-0"}`}>
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="glass border border-border/60 rounded-2xl p-4 mx-0 sm:mx-2 space-y-1">
            {/* Primary links */}
            {navLinks.slice(0, 1).map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl text-foreground hover:text-primary hover:bg-primary/8 transition-all duration-200 font-medium text-sm"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => {
                if (!isAuthed) {
                  setAuthDialogOpen(true);
                } else {
                  window.location.href = "/account";
                }
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:text-primary hover:bg-primary/8 transition-all duration-200 font-medium text-sm"
            >
              {isAuthed ? <User className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
              {isAuthed ? "Account" : "Sign In"}
            </button>

            {isAuthed && role === "admin" && (
              <a
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:text-primary hover:bg-primary/8 transition-all duration-200 font-medium text-sm"
              >
                <Shield className="w-4 h-4" />
                Admin Panel
              </a>
            )}

            <a
              href={isAuthed ? "/cart" : "#"}
              onClick={(e) => {
                if (!isAuthed) {
                  e.preventDefault();
                  setAuthDialogOpen(true);
                }
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:text-primary hover:bg-primary/8 transition-all duration-200 font-medium text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Cart {count > 0 ? `(${count})` : ""}
            </a>

            {isAuthed && (
              <button
                onClick={() => {
                  signOut();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:text-destructive hover:bg-destructive/5 transition-all duration-200 font-medium text-sm"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            )}

            {/* Divider */}
            <div className="border-t border-border/60 my-2" />

            {/* Dropdown Sections */}
            {mobileMenuSections.map((section) => (
              <div key={section.title}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === section.title ? null : section.title)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-foreground hover:text-primary hover:bg-primary/8 transition-all duration-200 font-medium text-sm"
                >
                  <span>{section.title}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${openDropdown === section.title ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openDropdown === section.title ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-6 pb-1 space-y-0.5">
                    {section.items.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                        className="flex items-center px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Shop CTA */}
            <div className="pt-2">
              <a
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:opacity-90"
              >
                Shop Now
              </a>
            </div>
          </nav>
        </div>
      </div>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </header>
  );
};

export default Header;
