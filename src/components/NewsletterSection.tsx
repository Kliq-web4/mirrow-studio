import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Welcome to LUXEMIRRORS! Check your inbox for exclusive offers.");
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
      
      <div className="container px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass-card luxury-border px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">VIP Access</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl mb-6 text-foreground">
            Join the
            <span className="gradient-text"> Inner Circle</span>
          </h2>
          
          <p className="text-muted-foreground text-lg mb-10">
            Be first to new arrivals, exclusive sales, and design inspiration. 
            Plus get 15% OFF your first order.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20 h-12"
              required
            />
            <Button 
              type="submit"
              disabled={isLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 font-medium"
            >
              {isLoading ? "Joining..." : "Join Now"}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground/60 mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
