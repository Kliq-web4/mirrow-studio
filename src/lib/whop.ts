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

    const CART_PRODUCT_ID = import.meta.env.VITE_WHOP_CART_PRODUCT_ID;
    if (!CART_PRODUCT_ID) {
        throw new Error("Misconfiguration: VITE_WHOP_CART_PRODUCT_ID is missing.");
    }
    if (!WHOP_COMPANY_ID) {
        throw new Error("Misconfiguration: VITE_WHOP_COMPANY_ID is missing.");
    }

    console.log('Starting Whop Checkout (Dynamic Bundle Approach)...');

    // 1. Calculate Totals
    let totalAmount = 0;
    let currency = 'USD';
    
    // Validate items and sum up
    items.forEach(item => {
        totalAmount += parseFloat(item.price.amount) * item.quantity;
        currency = item.price.currencyCode; // Assuming all matches, or take first
    });

    const variantMapping = items.reduce((acc: Record<string, string>, item) => {
        // Since we are creating a single bundle plan, we map the BUNDLE PLAN ID to the list of items?
        // No, the webhook logic expects "item.plan_id" -> "variant_id".
        // But here we have 1 plan = multiple variants.
        // We need to adjust the Webhook Logic or the Metadata structure.
        // Let's store the CART mapping in metadata: "variant_id: quantity".
        // And the webhook will read "variant_map_v2" if present?
        // Let's stick to the current webhook logic if possible, OR upgrade it.
        // Current webhook: iterates line_items, finds plan_id, looks up variant_id.
        
        // If we have 1 line item (the bundle), we need a way to tell the webhook "This bundle contains X, Y, Z".
        // Metadata is the best place.
        return acc;
    }, {} as Record<string, string>);
    
    // We will store the FULL CART CONTENT in metadata to be parsed by the webhook.
    const cartContent = items.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity
    }));

    // 2. Create a Dynamic "Cart Plan"
    // Use raw fetch for plan creation to ensure specific fields
    const planTitle = `Checkout - ${new Date().toLocaleTimeString()}`;
    
    console.log(`Creating Plan: ${planTitle} for ${totalAmount} ${currency}`);

    const planRes = await whop.plans.create({
        company_id: WHOP_COMPANY_ID,
        product_id: CART_PRODUCT_ID,
        title: planTitle,
        description: "Custom Cart Checkout",
        plan_type: 'one_time',
        initial_price: totalAmount,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        currency: currency.toLowerCase() as any,
        stock: 1, // One time use plan ideally
        unlimited_stock: false
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const plan = (planRes as any).data || planRes;
    const planId = plan.id;

    console.log(`Created Cart Plan: ${planId}`);

    // 3. Create Checkout Session for this Single Plan
    const response = await fetch('https://api.whop.com/v2/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${WHOP_API_KEY}`
      },
      body: JSON.stringify({
        items: [
            { plan_id: planId, quantity: 1 }
        ],
        success_url: window.location.origin + '/order-confirmation?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: window.location.origin + '/?canceled=true',
        metadata: {
            source: 'mirrow-store',
            is_cart_bundle: 'true',
            cart_content: JSON.stringify(cartContent)
        }
      })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Whop Checkout Session Error:', response.status, errorText);
        throw new Error(`Whop Checkout Failed: ${response.statusText}`);
    }

    const data = await response.json();
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
