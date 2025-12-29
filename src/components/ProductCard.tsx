import { Link } from "react-router-dom";
import { ShopifyProduct, createDirectCheckout } from "@/lib/shopify";
import { getShortDescription } from "@/lib/formatProductDescription";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { UrgencyBadge } from "@/components/UrgencyBadge";
import { useMemo, useState } from "react";

interface ProductCardProps {
  product: ShopifyProduct;
}

// Pseudo-random urgency based on product handle for consistency
const getUrgencyType = (handle: string): "low-stock" | "trending" | "hot" | null => {
  const hash = handle.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const mod = hash % 5;
  if (mod === 0) return "trending";
  if (mod === 1) return "hot";
  if (mod === 2) return "low-stock";
  return null;
};

const getStockCount = (handle: string): number => {
  const hash = handle.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  return 3 + (hash % 8);
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { node } = product;
  
  const mainImage = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const firstVariant = node.variants.edges[0]?.node;

  const urgencyType = useMemo(() => getUrgencyType(node.handle), [node.handle]);
  const stockCount = useMemo(() => getStockCount(node.handle), [node.handle]);

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant || isCheckingOut) return;
    
    setIsCheckingOut(true);
    try {
      const checkoutUrl = await createDirectCheckout(firstVariant.id);
      window.open(checkoutUrl, '_blank');
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error("Checkout failed", {
        description: "Please try again",
        position: "top-center"
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <Link 
      to={`/product/${node.handle}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-xl bg-card border border-border transition-all duration-500 hover:border-primary/50 hover:shadow-glow">
        {/* Urgency badge */}
        {urgencyType && (
          <div className="absolute top-3 left-3 z-10">
            <UrgencyBadge 
              type={urgencyType} 
              value={urgencyType === "low-stock" ? stockCount : undefined}
            />
          </div>
        )}

        {/* Image */}
        <div className="aspect-square overflow-hidden bg-muted">
          {mainImage ? (
            <img
              src={mainImage.url}
              alt={mainImage.altText || node.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
        </div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Buy now button */}
        <Button
          onClick={handleBuyNow}
          disabled={isCheckingOut}
          size="icon"
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant"
        >
          {isCheckingOut ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ExternalLink className="w-4 h-4" />
          )}
        </Button>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {node.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1 min-h-[2.5rem]">
            {getShortDescription(node.description, node.title) || "Premium LED mirror for your daily ritual"}
          </p>
          <p className="mt-3 text-xl font-semibold text-primary">
            {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};
