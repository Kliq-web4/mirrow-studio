import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export default function OrderConfirmation() {
  const [params] = useSearchParams();
  const clearCart = useCartStore(state => state.clearCart);
  
  // Whop typically adds ?success=true or similar params
  // Or we just assume if they hit this page, they came from a redirect
  
  useEffect(() => {
    // Clear the cart on successful load of this page
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 flex items-center justify-center py-20">
        <div className="max-w-md w-full text-center space-y-6 bg-card p-8 rounded-2xl border border-border shadow-2xl">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          
          <div className="space-y-2">
            <h1 className="font-display text-3xl text-foreground">Payment Successful!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. You should receive an email confirmation from Whop shortly.
            </p>
          </div>

          <div className="pt-6 space-y-3">
            <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90">
                <Link to="/">
                    Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
            
            <Button asChild variant="ghost" className="w-full">
                {/* Whop typically has a dashboard for users */}
                <a href="https://whop.com/hub" target="_blank" rel="noopener noreferrer">
                    Manage My Orders (Whop)
                </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
