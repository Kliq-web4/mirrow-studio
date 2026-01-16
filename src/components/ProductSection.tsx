import { ShopifyProducts } from "./ShopifyProducts";
import { Shield, Truck, Award, Clock, RefreshCcw } from "lucide-react";

const ProductSection = () => {
  return (
    <section id="products" className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-primary/3 blur-[180px]" />
      
      <div className="container px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-6">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4 font-medium">
            The Collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 text-foreground">
            Mirrors That
            <span className="gradient-text block mt-2">Define Spaces</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Handpicked selection of Hollywood, baroque, statement, and LED mirrors for every style and space
          </p>
        </div>

        {/* Trust badges above products */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 py-6 border-y border-border/30">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="w-4 h-4 text-primary" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span>5-Year Warranty</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCcw className="w-4 h-4 text-primary" />
            <span>60-Day Returns</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>Ships in 24h</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Award className="w-4 h-4 text-primary" />
            <span>Premium Quality</span>
          </div>
        </div>

        {/* Products grid */}
        <ShopifyProducts limit={12} />
        
        {/* Bottom reassurance */}
        <div className="text-center mt-16">
          <div className="glass-card inline-flex items-center gap-4 px-8 py-4">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-primary text-lg">★</span>
              ))}
            </div>
            <div className="text-left">
              <p className="text-foreground font-medium">Rated 4.9/5</p>
              <p className="text-sm text-muted-foreground">From 25,000+ reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;