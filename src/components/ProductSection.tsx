import { Button } from "@/components/ui/button";
import { ShoppingBag, Shield, Truck } from "lucide-react";

const ProductSection = () => {
  return (
    <section id="products" className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      
      <div className="container px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Product image placeholder */}
          <div className="relative">
            <div className="aspect-square rounded-3xl glass-card glow-border flex items-center justify-center overflow-hidden">
              {/* Placeholder for product image */}
              <div className="text-center p-12">
                <div className="w-48 h-64 mx-auto rounded-[40%/30%] border-4 border-primary/40 relative animate-float">
                  {/* Mirror glow effect */}
                  <div className="absolute inset-4 rounded-[40%/30%] bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />
                  <div className="absolute inset-0 rounded-[40%/30%] animate-glow-pulse" style={{ boxShadow: "0 0 60px hsl(var(--primary) / 0.3), inset 0 0 40px hsl(var(--primary) / 0.1)" }} />
                </div>
                <p className="text-muted-foreground mt-8 text-sm">Product image placeholder</p>
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 glass-card px-4 py-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-foreground">Limited Edition</span>
            </div>
          </div>

          {/* Product details */}
          <div className="space-y-8">
            <div>
              <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
                MIRROW Original
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-medium mb-4 text-foreground">
                The MIRROW
              </h2>
              <p className="text-muted-foreground text-lg">
                Studio-grade LED lighting in an elegantly designed mirror. Your spotlight, your confidence, in a frame.
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="font-display text-4xl text-foreground">$149</span>
              <span className="text-muted-foreground line-through">$199</span>
              <span className="text-primary text-sm font-medium">Save $50</span>
            </div>

            {/* Features list */}
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Soft gradient LED lighting
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Tap-to-change lighting moods
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Detachable travel base
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Creator-ready phone clip
              </li>
            </ul>

            {/* Add to cart */}
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-6 text-lg font-medium glow-border transition-all duration-300 hover:scale-105"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" />
                30-Day Glow Guarantee
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="w-4 h-4 text-primary" />
                Free Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
