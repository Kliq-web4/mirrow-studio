import Whop from '@whop/sdk';
import { ShopifyProduct } from './shopify';
import { toast } from 'sonner';

// Initialize Whop Client
const WHOP_API_KEY = import.meta.env.VITE_WHOP_API_KEY || ''; 
const WHOP_COMPANY_ID = import.meta.env.VITE_WHOP_COMPANY_ID || '';

// Initialize without throwing immediately if keys are missing to allow app to load
export const whop = new Whop({
  apiKey: WHOP_API_KEY,
});

// Adapter to convert Whop Product to existing UI interface
const mapWhopToShopify = (whopProduct: any): ShopifyProduct => {
  // Use the first pricing option found, or default to 0
  const price = whopProduct.plans?.[0]?.price || 0;
  const currency = whopProduct.plans?.[0]?.currency?.toUpperCase() || 'USD';
  const imageUrl = whopProduct.image_url || 'https://placehold.co/600x600?text=No+Image';
  const variantId = whopProduct.plans?.[0]?.id || whopProduct.id;

  return {
    node: {
      id: whopProduct.id,
      title: whopProduct.name,
      description: whopProduct.description || '',
      handle: whopProduct.id, // Use ID as handle for routing
      priceRange: {
        minVariantPrice: {
          amount: price.toString(),
          currencyCode: currency,
        },
      },
      images: {
        edges: [
            { node: { url: imageUrl, altText: whopProduct.name } }
        ],
      },
      // Mock variants structure for Cart compatibility
      variants: {
        edges: [
            {
                node: {
                    id: variantId, // We use Plan ID as Variant ID for checkout
                    title: 'Default Title',
                    price: { amount: price.toString(), currencyCode: currency },
                    availableForSale: true,
                    selectedOptions: [{ name: 'Title', value: 'Default Title' }],
                }
            }
        ]
      },
      options: [
        { name: 'Title', values: ['Default Title'] }
      ]
    },
  };
};

export const fetchWhopProducts = async (limit = 10): Promise<ShopifyProduct[]> => {
  if (!WHOP_API_KEY) {
    console.error("Whop API Key is missing");
    toast.error("Whop API Key missing. Check .env");
    return [];
  }

  try {
    // Fetch products
    const response = await whop.products.list({ 
      company_id: WHOP_COMPANY_ID,
      limit,
    });
    
    // Check if 'data' is the array or if it's paginated
    // SDK typically returns { data: [...] } or just [...] depending on version.
    // We assume 'data' property exists.
    const products = (response as any).data || [];

    return products.map(mapWhopToShopify);

  } catch (error) {
    console.error("Failed to fetch Whop products:", error);
    toast.error("Failed to load products from Whop");
    return [];
  }
};

export const fetchWhopProductByHandle = async (handle: string): Promise<ShopifyProduct['node'] | null> => {
    // Since we use ID as handle, we can fetch directly or filter from list
    // Whop SDK might have product.retrieve(id)
    try {
        const response = await whop.products.retrieve(handle);
        const mapped = mapWhopToShopify(response);
        return mapped.node;
    } catch(e) {
        console.error("Product not found", e);
        return null;
    }
}

export const createWhopCheckout = async (items: any[]): Promise<string> => {
   try {
     if (items.length === 0) throw new Error("No items in cart");
     
     // Whop limitation: Single plan checkout usually.
     // We will take the first item's Variant ID (which we mapped to Plan ID)
     const targetPlanId = items[0].variantId;
     
     // Optionally check for quantity or creating a bundle on the fly?
     // For now, simple redirect to buy the plan.
     
     const response = await whop.checkouts.create({
        line_items: items.map(item => ({
             plan_id: item.variantId,
             quantity: item.quantity
        })),
        redirect_url: `${window.location.origin}/order-confirmation`
     });

     if ((response as any).url) {
        return (response as any).url;
     }
     
     // If SDK returns differently
     if ((response as any).data?.url) return (response as any).data.url;

     throw new Error("No checkout URL returned");
   } catch (error) {
      console.error("Whop Checkout Error:", error);
      throw error;
   }
}
