import { Instagram, Facebook, Twitter, Youtube, Crown, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 bg-card/30">
      {/* Main footer */}
      <div className="container px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Crown className="w-6 h-6 text-primary" />
              <span className="font-display text-2xl text-foreground">
                LUXE<span className="gradient-text">MIRRORS</span>
              </span>
            </div>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              The world's premier destination for luxury mirrors. Hollywood glamour, baroque elegance, and modern statement pieces — all under one roof.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-6">Shop</h4>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li><a href="#products" className="hover:text-primary transition-colors">All Mirrors</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Hollywood Mirrors</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Ornate & Baroque</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Statement Pieces</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">LED Vanity</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Full Length</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-6">Support</h4>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Warranty Information</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Track Order</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-6">Contact</h4>
            <ul className="space-y-4 text-muted-foreground text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5" />
                <span>hello@luxemirrors.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5" />
                <span>1-800-MIRRORS</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>New York, NY 10001</span>
              </li>
            </ul>
            
            {/* Trust badges */}
            <div className="mt-6 pt-6 border-t border-border/30">
              <p className="text-xs text-muted-foreground mb-3">Secure Payment</p>
              <div className="flex gap-2 text-muted-foreground/60 text-xs">
                <span className="px-2 py-1 border border-border/30 rounded">Visa</span>
                <span className="px-2 py-1 border border-border/30 rounded">MC</span>
                <span className="px-2 py-1 border border-border/30 rounded">Amex</span>
                <span className="px-2 py-1 border border-border/30 rounded">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/30 py-6">
        <div className="container px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 LUXEMIRRORS. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;