import { ShopifyProducts } from "./ShopifyProducts";
import { Shield, Truck, RotateCcw } from "lucide-react";

const ProductSection = () => {
  return (
    <section id="products" className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]" />
      
      <div className="container px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            Shop the Collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium mb-4 text-foreground">
            Your Glow Awaits
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Premium LED mirrors designed for your daily ritual. Each piece crafted to illuminate your best self.
          </p>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="w-4 h-4 text-primary" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" />
              <span>2-Year Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RotateCcw className="w-4 h-4 text-primary" />
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>

        {/* Products grid */}
        <ShopifyProducts limit={10} />
        
        {/* Bottom reassurance */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            ⭐ Rated 4.9/5 by 10,000+ customers
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
