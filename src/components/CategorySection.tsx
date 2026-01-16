import { Sparkles, Crown, Frame, Lightbulb, Star, Gem } from "lucide-react";

const categories = [
  {
    name: "Hollywood Mirrors",
    description: "Iconic vanity lighting for the ultimate glam experience",
    icon: Lightbulb,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop",
    badge: "Best Seller",
    count: "50+ Designs",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    name: "Ornate & Baroque",
    description: "Exquisite antique-inspired masterpieces",
    icon: Crown,
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&h=400&fit=crop",
    badge: "Luxurious",
    count: "35+ Designs",
    gradient: "from-purple-500/20 to-purple-500/5",
  },
  {
    name: "Statement Mirrors",
    description: "Bold, artistic pieces that demand attention",
    icon: Frame,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
    badge: "Trending",
    count: "40+ Designs",
    gradient: "from-rose-500/20 to-rose-500/5",
  },
  {
    name: "LED Vanity",
    description: "Smart lighting for perfect selfies & makeup",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=400&fit=crop",
    badge: "Tech",
    count: "30+ Designs",
    gradient: "from-blue-500/20 to-blue-500/5",
  },
  {
    name: "Full Length",
    description: "Floor-to-ceiling elegance for your space",
    icon: Gem,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=400&fit=crop",
    badge: "Popular",
    count: "25+ Designs",
    gradient: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    name: "Minimalist",
    description: "Clean, modern designs for contemporary spaces",
    icon: Star,
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&h=400&fit=crop",
    badge: "Modern",
    count: "45+ Designs",
    gradient: "from-slate-500/20 to-slate-500/5",
  },
];

const CategorySection = () => {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="categories" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-primary/3 blur-[150px]" />

      <div className="container px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4 font-medium">
            Shop by Style
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
            Find Your Perfect
            <span className="block gradient-text mt-2">Mirror Style</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From Hollywood glamour to timeless baroque elegance — discover the mirror that transforms your space
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.name}
              onClick={scrollToProducts}
              className="group relative overflow-hidden rounded-2xl cursor-pointer border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} via-background/60 to-transparent opacity-90`} />
              
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full">
                  {category.badge}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <category.icon className="w-5 h-5 text-primary" />
                  <span className="text-xs text-muted-foreground">{category.count}</span>
                </div>
                <h3 className="font-display text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
                
                {/* Hover arrow */}
                <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-sm font-medium">Explore Collection</span>
                  <span className="text-lg">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;