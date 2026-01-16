import { useState, useEffect } from "react";
import { Menu, X, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CartDrawer } from "./CartDrawer";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Shop All", href: "#products" },
    { label: "Categories", href: "#categories" },
    { label: "Why Us", href: "#features" },
    { label: "Gallery", href: "#community" },
  ];

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
        <span className="animate-pulse">✨</span> FREE SHIPPING on orders over $150 | Use code <span className="font-bold">MIRROR20</span> for 20% OFF <span className="animate-pulse">✨</span>
      </div>
      
      <nav
        className={cn(
          "fixed top-[36px] left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/30 shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="container px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-primary" />
              <span className="font-display text-2xl text-foreground">
                LUXE<span className="gradient-text">MIRRORS</span>
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm tracking-wide font-medium relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <CartDrawer />

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-6 border-t border-border/30 animate-fade-in bg-background/95 backdrop-blur-xl">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left py-2 font-medium"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;