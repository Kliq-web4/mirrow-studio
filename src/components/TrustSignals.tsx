import { Truck, Shield, RotateCcw, Award, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const trustItems = [
  { icon: Truck, text: "Free Shipping Worldwide", highlight: "FREE" },
  { icon: Shield, text: "Secure SSL Checkout", highlight: "SECURE" },
  { icon: RotateCcw, text: "30-Day Money Back", highlight: "GUARANTEED" },
  { icon: Award, text: "Premium Quality", highlight: "5★ RATED" },
  { icon: Clock, text: "Ships in 24 Hours", highlight: "FAST" },
];

export const TrustSignals = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 transition-all duration-500",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      )}
    >
      {/* Gradient border top */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="bg-background/95 backdrop-blur-xl border-t border-border/30">
        <div className="container px-4">
          <div className="flex items-center justify-center gap-4 md:gap-8 py-3 overflow-x-auto scrollbar-hide">
            {trustItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-xs md:text-sm whitespace-nowrap group"
              >
                <item.icon className="w-4 h-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-muted-foreground hidden md:inline">
                  {item.text}
                </span>
                <span className="text-foreground font-medium md:hidden">
                  {item.highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;
