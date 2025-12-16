import { ShopifyProducts } from "./ShopifyProducts";

const ProductSection = () => {
  return (
    <section id="products" className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]" />
      
      <div className="container px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            Shop the Collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium mb-4 text-foreground">
            Your Glow Awaits
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Premium LED mirrors designed for your daily ritual. Each piece crafted to illuminate your best self.
          </p>
        </div>

        {/* Products grid */}
        <ShopifyProducts limit={10} />
      </div>
    </section>
  );
};

export default ProductSection;
