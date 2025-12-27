import { Button } from "@/components/ui/button";
import { ArrowDown, Play, Star } from "lucide-react";
const HeroSection = () => {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] animate-glow-pulse" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[80px]" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="container relative z-10 px-6 text-center">
        {/* Social proof badge */}
        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8 animate-fade-up" style={{
        animationDelay: "0s"
      }}>
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full bg-primary/30 border-2 border-background" />
            <div className="w-6 h-6 rounded-full bg-primary/50 border-2 border-background" />
            <div className="w-6 h-6 rounded-full bg-primary/70 border-2 border-background" />
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
          </div>
          <span className="text-sm text-muted-foreground">Loved by 10,000+ creators</span>
        </div>

        {/* Main headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium mb-6 animate-fade-up" style={{
        animationDelay: "0.1s"
      }}>
          <span className="block text-foreground">Step into</span>
          <span className="block gradient-text glow-text mt-2">MIRROW World</span>
        </h1>

        {/* Value proposition */}
        <p className="text-xl md:text-2xl text-foreground/90 font-light max-w-2xl mx-auto mb-4 animate-fade-up" style={{
        animationDelay: "0.2s"
      }}>
          Studio-Grade Lighting. Anywhere.
        </p>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-up" style={{
        animationDelay: "0.25s"
      }}>
          <span className="text-sm text-muted-foreground px-3 py-1 rounded-full border border-border/50">✨ Tap-to-change moods</span>
          <span className="text-sm text-muted-foreground px-3 py-1 rounded-full border border-border/50">📱 Creator phone clip</span>
          <span className="text-sm text-muted-foreground px-3 py-1 rounded-full border border-border/50">🔋 30+ routines/charge</span>
        </div>

        {/* Description */}
        <p className="text-muted-foreground/80 max-w-xl mx-auto mb-10 animate-fade-up" style={{
        animationDelay: "0.3s"
      }}>
          Your mirror isn't just a tool — it's your spotlight. Perfect lighting for every selfie, video, and moment that matters.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{
        animationDelay: "0.4s"
      }}>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-medium glow-border transition-all duration-300 hover:scale-105 group" onClick={scrollToProducts}>
            Shop Now — Free Shipping
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Button>
          <Button variant="outline" size="lg" className="border-border/50 text-foreground hover:bg-secondary/50 px-8 py-6 text-lg font-medium backdrop-blur-sm group" onClick={() => document.getElementById("story")?.scrollIntoView({
          behavior: "smooth"
        })}>
            <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            See It in Action
          </Button>
        </div>

        {/* Urgency */}
        <p className="text-sm text-primary/80 mt-6 animate-fade-up" style={{
        animationDelay: "0.5s"
      }}>
          🔥 Limited stock — 23 sold in the last hour
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-up" style={{
        animationDelay: "0.6s"
      }}>
          <button onClick={scrollToProducts} className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>;
};
export default HeroSection;