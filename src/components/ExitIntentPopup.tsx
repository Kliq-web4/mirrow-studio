import { useState, useEffect, useCallback } from "react";
import { X, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (
      e.clientY <= 0 &&
      !hasTriggered &&
      !sessionStorage.getItem("exitPopupShown")
    ) {
      setIsVisible(true);
      setHasTriggered(true);
      sessionStorage.setItem("exitPopupShown", "true");
    }
  }, [hasTriggered]);

  useEffect(() => {
    // Check if already shown this session
    if (sessionStorage.getItem("exitPopupShown")) {
      setHasTriggered(true);
      return;
    }

    // Delay adding listener to prevent immediate trigger
    const timeout = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // In a real app, you'd send this to your backend
      console.log("Exit intent email captured:", email);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative w-full max-w-md bg-card border border-border rounded-2xl overflow-hidden",
          "animate-scale-in shadow-2xl"
        )}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/20 blur-[60px]" />

        {/* Content */}
        <div className="relative p-8 text-center">
          {!isSubmitted ? (
            <>
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Gift className="w-8 h-8 text-primary" />
              </div>

              {/* Headline */}
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                Wait! Don't Miss Out
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Get <span className="text-primary font-semibold">15% OFF</span> your first order
              </p>

              {/* Discount code display */}
              <div className="bg-secondary/50 border border-dashed border-primary/50 rounded-lg p-4 mb-6">
                <p className="text-xs text-muted-foreground mb-1">YOUR EXCLUSIVE CODE</p>
                <p className="text-2xl font-display text-primary tracking-wider">MIRROW15</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary/30 border-border text-foreground placeholder:text-muted-foreground"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-medium"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Claim My 15% Off
                </Button>
              </form>

              <button
                onClick={handleClose}
                className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                No thanks, I'll pay full price
              </button>
            </>
          ) : (
            <>
              {/* Success state */}
              <div className="py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-display text-2xl text-foreground mb-2">
                  You're In! ✨
                </h2>
                <p className="text-muted-foreground mb-4">
                  Use code <span className="text-primary font-semibold">MIRROW15</span> at checkout
                </p>
                <Button
                  onClick={handleClose}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Start Shopping
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
