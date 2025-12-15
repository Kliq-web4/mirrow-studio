import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] animate-glow-pulse" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[80px]" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="container relative z-10 px-6 text-center">
        {/* Pre-headline */}
        <p className="text-primary/80 uppercase tracking-[0.3em] text-sm mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Introducing
        </p>

        {/* Main headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <span className="block text-foreground">Step into</span>
          <span className="block gradient-text glow-text mt-2">MIRROW World</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto mb-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          Reflect. Glow. Shine.
        </p>

        {/* Description */}
        <p className="text-muted-foreground/80 max-w-xl mx-auto mb-12 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          Studio-grade LED lighting meets elegant design. Your mirror isn't just a tool — it's your spotlight.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-medium glow-border transition-all duration-300 hover:scale-105"
            onClick={scrollToProducts}
          >
            Shop Now
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-border/50 text-foreground hover:bg-secondary/50 px-8 py-6 text-lg font-medium backdrop-blur-sm"
            onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}
          >
            Discover More
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-up" style={{ animationDelay: "0.7s" }}>
          <button 
            onClick={scrollToProducts}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
