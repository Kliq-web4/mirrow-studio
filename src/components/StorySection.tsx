import { Check, Star, Quote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";

const benefits = [
  "Curated from top artisans worldwide",
  "Professional design consultation available",
  "Custom sizing & framing options",
  "White-glove installation service",
  "Lifetime maintenance support",
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Interior Designer",
    quote: "LUXEMIRRORS transformed my client's foyer into a breathtaking statement. The baroque mirror is a masterpiece.",
    rating: 5,
  },
  {
    name: "James Chen",
    role: "Homeowner",
    quote: "The Hollywood mirror exceeded all expectations. Perfect lighting, stunning design, flawless delivery.",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Content Creator",
    quote: "Finally, a mirror that makes my content look professional. The LED lighting is incredible!",
    rating: 5,
  },
];

const StorySection = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts(10);
      if (fetchedProducts.length > 0) {
        const shuffled = [...fetchedProducts].sort(() => Math.random() - 0.5);
        setProducts(shuffled);
      }
    };
    loadProducts();
  }, []);

  // Cycle through products every 4 seconds
  useEffect(() => {
    if (products.length <= 1) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentProductIndex((prev) => (prev + 1) % products.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [products.length]);

  // Cycle testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentProduct = products[currentProductIndex];
  const currentImage = currentProduct?.node?.images?.edges?.[0]?.node?.url;

  const handleShopNow = useCallback(() => {
    if (currentProduct?.node?.handle) {
      navigate(`/product/${currentProduct.node.handle}`);
    } else {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentProduct, navigate]);

  return (
    <section id="story" className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
      
      <div className="container px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4 font-medium">
            Our Promise
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
            More Than Mirrors
            <span className="block gradient-text mt-2">Reflections of Excellence</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Every mirror in our collection tells a story of craftsmanship, elegance, and attention to detail. 
            We source from the world's finest artisans to bring you pieces that transform spaces.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: Image showcase */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden luxury-border shadow-luxury">
              {currentImage ? (
                <img 
                  src={currentImage} 
                  alt={currentProduct?.node?.title || "Featured Mirror"} 
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="w-32 h-40 rounded-xl border-4 border-primary/30 shadow-glow animate-glow-pulse" />
                </div>
              )}
            </div>
            
            {/* Floating price badge */}
            {currentProduct && (
              <div className="absolute -bottom-4 -right-4 glass-card luxury-border px-6 py-3">
                <p className="text-xs text-muted-foreground">Featured</p>
                <p className="text-xl font-display gradient-text">
                  ${parseFloat(currentProduct.node.priceRange.minVariantPrice.amount).toFixed(0)}
                </p>
              </div>
            )}

            {/* Product dots */}
            {products.length > 1 && (
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
                {products.slice(0, 5).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setCurrentProductIndex(idx);
                        setIsTransitioning(false);
                      }, 300);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentProductIndex 
                        ? "bg-primary w-6" 
                        : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Content */}
          <div>
            <h3 className="font-display text-3xl md:text-4xl mb-6 text-foreground">
              The Art of Perfect Reflection
            </h3>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              From the opulent grandeur of baroque designs to the sleek sophistication of modern LED mirrors, 
              our collection spans centuries of design excellence. Each piece is selected for its ability to 
              elevate your space from ordinary to extraordinary.
            </p>
            
            <ul className="space-y-4 mb-10">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              size="lg" 
              onClick={handleShopNow}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-medium shadow-elegant glow-border transition-all duration-300 hover:scale-105 group"
            >
              Shop This Look
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Testimonials */}
        <div className="glass-card luxury-border p-10 md:p-16 max-w-4xl mx-auto text-center">
          <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />
          
          <p className="font-display text-2xl md:text-3xl text-foreground mb-8 italic leading-relaxed">
            "{testimonials[currentTestimonial].quote}"
          </p>
          
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
          </div>
          
          <p className="text-foreground font-medium">{testimonials[currentTestimonial].name}</p>
          <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].role}</p>
          
          {/* Testimonial dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentTestimonial 
                    ? "bg-primary w-6" 
                    : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;