import { Truck, Shield, Award, Clock, Headphones, Gift, Sparkles, Package } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "5-Year Warranty",
    description: "Industry-leading protection on every mirror we sell. Your investment, guaranteed.",
    highlight: true,
  },
  {
    icon: Truck,
    title: "Free White Glove Delivery",
    description: "Careful handling and in-room placement included on all orders over $150.",
    highlight: false,
  },
  {
    icon: Award,
    title: "Premium Craftsmanship",
    description: "Each mirror inspected for perfection. Only the finest materials and finishes.",
    highlight: true,
  },
  {
    icon: Gift,
    title: "Luxury Packaging",
    description: "Unboxing experience worthy of the mirror inside. Perfect for gifting.",
    highlight: false,
  },
];

const stats = [
  { value: "25K+", label: "Happy Customers" },
  { value: "200+", label: "Mirror Designs" },
  { value: "50+", label: "Countries Shipped" },
  { value: "4.9★", label: "Average Rating" },
];

const guarantees = [
  { icon: Truck, text: "Free Shipping Over $150" },
  { icon: Clock, text: "24-Hour Dispatch" },
  { icon: Headphones, text: "24/7 Support" },
  { icon: Package, text: "Safe Packaging" },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24 bg-card/30">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
      <div className="container px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4 font-medium">
            Why Choose Us
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
            The LUXE
            <span className="gradient-text block mt-2">Difference</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We don't just sell mirrors — we deliver an experience of luxury, quality, and unmatched customer care
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 glass-card luxury-border">
              <p className="text-3xl md:text-4xl font-display gradient-text mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group p-8 rounded-2xl border transition-all duration-500 ${
                feature.highlight 
                  ? "border-primary/40 bg-primary/5 hover:border-primary/60 hover:bg-primary/10" 
                  : "border-border/30 bg-background/50 hover:border-primary/30 hover:bg-card/50"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 mb-6 rounded-xl flex items-center justify-center transition-colors duration-500 ${
                feature.highlight 
                  ? "bg-primary/20 group-hover:bg-primary/30" 
                  : "bg-primary/10 group-hover:bg-primary/20"
              }`}>
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Guarantees bar */}
        <div className="flex flex-wrap justify-center gap-8 py-8 border-y border-border/30">
          {guarantees.map((guarantee) => (
            <div key={guarantee.text} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
              <guarantee.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{guarantee.text}</span>
            </div>
          ))}
        </div>

        {/* Trust section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-muted-foreground mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm">Trusted by interior designers & homeowners worldwide</span>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;