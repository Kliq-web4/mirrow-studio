import { Button } from "@/components/ui/button";
import { ArrowDown, Star, Shield, Truck, Crown } from "lucide-react";

const HeroSection = () => {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Luxury background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-primary/3 blur-[150px] animate-glow-pulse" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[80px]" />
      
      {/* Elegant grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_60%)]" />

      <div className="container relative z-10 px-6 text-center">
        {/* Premium badge */}
        <div className="inline-flex items-center gap-3 glass-card luxury-border px-5 py-2.5 mb-10 animate-fade-up" style={{ animationDelay: "0s" }}>
          <Crown className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground tracking-wide">The World's Premier Mirror Destination</span>
          <Crown className="w-4 h-4 text-primary" />
        </div>

        {/* Main headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="block text-foreground">Every Mirror</span>
          <span className="block gradient-text glow-text mt-2">Your Reflection Deserves</span>
        </h1>

        {/* Value proposition */}
        <p className="text-xl md:text-2xl text-foreground/90 font-light max-w-3xl mx-auto mb-6 animate-fade-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
          Hollywood glamour. Baroque elegance. Statement pieces.
          <span className="text-primary block mt-1">One destination. Endless reflections.</span>
        </p>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 animate-fade-up" style={{ animationDelay: "0.25s" }}>
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">✨ Hollywood Mirrors</span>
          <span className="px-4 py-2 rounded-full bg-secondary text-foreground text-sm border border-border/50 hover:border-primary/30 transition-colors cursor-pointer">👑 Ornate & Baroque</span>
          <span className="px-4 py-2 rounded-full bg-secondary text-foreground text-sm border border-border/50 hover:border-primary/30 transition-colors cursor-pointer">🖼️ Statement Pieces</span>
          <span className="px-4 py-2 rounded-full bg-secondary text-foreground text-sm border border-border/50 hover:border-primary/30 transition-colors cursor-pointer">💎 LED Vanity</span>
        </div>

        {/* Social proof */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/50 to-primary/30 border-2 border-background" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-primary/40 border-2 border-background" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/70 to-primary/50 border-2 border-background" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-primary/60 border-2 border-background flex items-center justify-center text-[10px] font-medium text-primary-foreground">+5K</div>
            </div>
            <div className="flex items-center gap-1 ml-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-1">25,000+ Happy Customers</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 animate-fade-up" style={{ animationDelay: "0.35s" }}>
          <Button
            onClick={scrollToProducts}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-7 text-lg font-medium shadow-elegant glow-border transition-all duration-300 hover:scale-105"
          >
            Shop the Collection
          </Button>
          <Button
            onClick={scrollToProducts}
            variant="outline"
            size="lg"
            className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 px-10 py-7 text-lg"
          >
            Explore Categories
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-primary" />
            <span>Free Worldwide Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>5-Year Warranty</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary">🔄</span>
            <span>60-Day Returns</span>
          </div>
        </div>

        {/* Urgency banner */}
        <div className="mt-10 animate-fade-up" style={{ animationDelay: "0.45s" }}>
          <div className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/20 rounded-full px-5 py-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
            </span>
            <span className="text-sm font-medium text-foreground">🔥 Flash Sale: Up to 40% OFF — Ends Midnight</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <button onClick={scrollToProducts} className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
            <span className="text-xs uppercase tracking-widest">Discover</span>
            <ArrowDown className="w-5 h-5 animate-bounce group-hover:text-primary" />
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;