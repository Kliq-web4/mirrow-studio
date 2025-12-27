import { Fingerprint, Battery, Smartphone, Package, Shield, Truck } from "lucide-react";

const features = [
  {
    icon: Fingerprint,
    title: "Touch-Sensitive Controls",
    description: "Seamless LED adjustments with a simple tap. Intuitive and elegant.",
    highlight: true,
  },
  {
    icon: Battery,
    title: "30+ Routines Per Charge",
    description: "Rechargeable USB-C battery. Your glow, anywhere you go.",
    highlight: false,
  },
  {
    icon: Smartphone,
    title: "Creator-Ready Phone Clip",
    description: "Detachable holder for perfect angles. Content creation made easy.",
    highlight: true,
  },
  {
    icon: Package,
    title: "Luxury Unboxing",
    description: "MIRROW World experience from the moment you open the box.",
    highlight: false,
  },
];

const guarantees = [
  { icon: Truck, text: "Free Express Shipping" },
  { icon: Shield, text: "2-Year Warranty" },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-32 bg-card/30">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
      <div className="container px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            The Design
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-6 text-foreground">
            Every Detail,
            <span className="block gradient-text">Perfectly Considered</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Elegant, slightly oval shape with smooth matte finish. Every touch feels premium.
          </p>
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
            <div key={guarantee.text} className="flex items-center gap-3 text-muted-foreground">
              <guarantee.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{guarantee.text}</span>
            </div>
          ))}
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="text-primary">★★★★★</span>
            <span className="text-sm font-medium">10,000+ Happy Customers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
