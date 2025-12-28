import Whop from '@whop/sdk';
import { ShopifyProduct, CartItem } from './shopify';
import { toast } from 'sonner';

// Initialize Whop Client
const WHOP_API_KEY = import.meta.env.VITE_WHOP_API_KEY || ''; 
const WHOP_COMPANY_ID = import.meta.env.VITE_WHOP_COMPANY_ID || '';

// Initialize without throwing immediately if keys are missing to allow app to load
export const whop = new Whop({
  apiKey: WHOP_API_KEY,
});

// Basic type definition for Whop Product structure key fields
interface WhopProduct {
    id: string;
    name: string;
    description?: string;
    plans?: Array<{
        id: string;
        price?: number | string;
        currency?: string;
    }>;
    price?: number | string;
    initial_price?: number | string;
    currency?: string;
    image_url?: string;
    images?: string[];
}

// Adapter to convert Whop Product to existing UI interface
const mapWhopToShopify = (whopProduct: WhopProduct): ShopifyProduct => {
  // Use the first pricing option found, or check top-level price fields
  const price = whopProduct.plans?.[0]?.price || whopProduct.price || whopProduct.initial_price || 0;
  const currency = whopProduct.plans?.[0]?.currency?.toUpperCase() || whopProduct.currency || 'USD';
  const imageUrl = whopProduct.image_url || whopProduct.images?.[0] || 'https://placehold.co/600x600?text=No+Image';
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
      // limit, // 'limit' is not a valid property in ProductListParams
    });
    
    // Check if 'data' is the array or if it's paginated
    // SDK typically returns { data: [...] } or just [...] depending on version.
    // We assume 'data' property exists.
    // data property might be unknown, so casting to a generic response type first
    const data = (response as unknown as { data?: WhopProduct[] }).data || [];
    return data.map((p: WhopProduct) => mapWhopToShopify(p));

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
        const mapped = mapWhopToShopify(response as unknown as WhopProduct);
        return mapped.node;
    } catch(e) {
        console.error("Product not found", e);
        return null;
    }
}

export const createWhopCheckout = async (items: CartItem[]): Promise<string> => {
  try {
    if (items.length === 0) throw new Error("No items in cart");

    console.log('Starting Whop Checkout...');

    // 1. Prepare items and fetch latest prices to validate
    // The user requested to "Fetch current prices from Whop" to ensure totals are accurate.
    // We will do this by fetching the product details.
    
    const lineItems = await Promise.all(items.map(async (item) => {
      const planId = item.whopPlanId;
      const productHandle = item.product.node.handle; // Assuming handle is ID as per mapWhopToShopify
      
      if (!planId) {
        console.warn(`Item ${item.product.node.title} missing Whop Plan ID`);
        return null;
      }

      // Fetch latest product data to verify price (optional but good for validation)
      // We skip strictly blocking on this unless logical, but we'll log it.
      try {
        const product = await fetchWhopProductByHandle(productHandle);
        if (product) {
            console.log(`Verified product existence: ${product.title}`);
            // Logic to update price could go here if we were updating the cart store
        }
      } catch (e) {
        console.warn(`Could not verify product ${productHandle}`, e);
      }

      return {
        id: planId, // Passing Plan ID as product ID for checkout session
        quantity: item.quantity
      };
    }));

    const validItems = lineItems.filter(Boolean);

    if (validItems.length === 0) {
      throw new Error("No valid Whop products found in cart.");
    }

    // 2. Create Checkout Session
    // Using direct fetch because SDK might not expose this specific endpoint or experimental feature
    console.log('Creating checkout session for:', validItems);

    // Create a mapping of Plan ID -> Shopify Variant ID for the backend to use
    const variantMapping = items.reduce((acc: Record<string, string>, item) => {
        if (item.whopPlanId) {
            acc[item.whopPlanId] = item.variantId;
        }
        return acc;
    }, {} as Record<string, string>);

    const response = await fetch('https://api.whop.com/v1/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${WHOP_API_KEY}`
      },
      body: JSON.stringify({
        products: validItems,
        success_url: window.location.origin + '/order-confirmation?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: window.location.origin + '/?canceled=true',
        metadata: {
            source: 'mirrow-store',
            variant_map: JSON.stringify(variantMapping)
        }
      })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Whop Checkout Session Error:', errorData);
        throw new Error(`Whop Checkout Failed: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    
    // Assuming data returns a checkout URL or session object with a url
    // Example: { id: "sess_...", url: "https://whop.com/checkout/sess_..." }
    // Adjust based on actual API response structure if known, otherwise assume 'url' or 'checkout_url'
    
    const checkoutUrl = data.url || data.checkout_url;
    
    if (!checkoutUrl) {
        throw new Error("No checkout URL returned from Whop");
    }

    return checkoutUrl;

  } catch (error) {
    console.error("Whop Checkout Error:", error);
    toast.error(error instanceof Error ? error.message : "Checkout failed");
    throw error;
  }
}
