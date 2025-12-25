import { useState, useEffect, useCallback } from "react";
import { X, MapPin, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface PurchaseNotification {
  name: string;
  location: string;
  product: string;
  timeAgo: string;
}

const mockPurchases: PurchaseNotification[] = [
  { name: "Sarah M.", location: "New York, USA", product: "LED Vanity Mirror", timeAgo: "2 mins ago" },
  { name: "Emma L.", location: "London, UK", product: "Tabletop Mirror", timeAgo: "5 mins ago" },
  { name: "Ava K.", location: "Sydney, AU", product: "Hollywood Mirror", timeAgo: "8 mins ago" },
  { name: "Mia R.", location: "Toronto, CA", product: "Compact LED Mirror", timeAgo: "12 mins ago" },
  { name: "Olivia J.", location: "Paris, FR", product: "Ring Light Mirror", timeAgo: "15 mins ago" },
  { name: "Sophia T.", location: "Berlin, DE", product: "Makeup Mirror Pro", timeAgo: "18 mins ago" },
  { name: "Isabella N.", location: "Tokyo, JP", product: "Travel Mirror", timeAgo: "22 mins ago" },
  { name: "Charlotte B.", location: "Dubai, UAE", product: "LED Vanity Set", timeAgo: "25 mins ago" },
];

export const SocialProofNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const showNotification = useCallback(() => {
    if (isPaused) return;
    setIsVisible(true);
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  }, [isPaused]);

  useEffect(() => {
    // Initial delay before first notification
    const initialDelay = setTimeout(() => {
      showNotification();
    }, 8000);

    // Show notifications periodically
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockPurchases.length);
      showNotification();
    }, 25000); // Show every 25 seconds

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [showNotification]);

  const handleClose = () => {
    setIsVisible(false);
    setIsPaused(true);
  };

  const currentPurchase = mockPurchases[currentIndex];

  return (
    <div
      className={cn(
        "fixed bottom-20 left-4 z-50 transition-all duration-500",
        isVisible
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0"
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative bg-card border border-border rounded-xl p-4 shadow-elegant max-w-xs">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-3 h-3" />
        </button>

        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-primary" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground font-medium truncate">
              {currentPurchase.name} just purchased
            </p>
            <p className="text-sm text-primary truncate">
              {currentPurchase.product}
            </p>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{currentPurchase.location}</span>
              <span className="mx-1">•</span>
              <span>{currentPurchase.timeAgo}</span>
            </div>
          </div>
        </div>

        {/* Verified badge */}
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Verified purchase</span>
        </div>
      </div>
    </div>
  );
};

export default SocialProofNotification;
