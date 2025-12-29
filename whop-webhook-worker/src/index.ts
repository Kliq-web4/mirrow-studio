
export interface Env {
    SHOPIFY_ADMIN_TOKEN: string;
    SHOPIFY_STORE_DOMAIN: string;
    SHOPIFY_API_VERSION: string;
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        if (request.method !== "POST") {
            return new Response("Method Not Allowed", { status: 405 });
        }

        const url = new URL(request.url);
        if (url.pathname !== "/webhooks/whop") {
            return new Response("Not Found", { status: 404 });
        }

        try {
            const payload = await request.json() as any;
            console.log('Received Webhook:', payload.type || payload.action || 'Unknown Event');

            // Basic validation of event type
            const isCheckoutCompleted = 
                payload.action === 'checkout.session.completed' || 
                payload.type === 'checkout.session.completed' || 
                payload.data?.status === 'paid';

            if (isCheckoutCompleted) {
                // We use ctx.waitUntil to let the worker finish responding to Whop while we process Shopify
                ctx.waitUntil(handleCheckoutCompleted(payload, env));
            } else {
                console.log('Ignoring event type:', payload.type || payload.action);
            }

            return new Response(JSON.stringify({ received: true }), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });

        } catch (error) {
            console.error('Webhook Error:', error);
            return new Response(JSON.stringify({ error: "Internal Server Error" }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }
    },
};

async function handleCheckoutCompleted(payload: any, env: Env) {
    console.log('Processing Checkout Completion...');
    
    // Whop payload might put the session in .data
    const session = payload.data || payload;
    const metadata = session.metadata || {};
    let shopifyLineItems: any[] = [];

    // -- STRATEGY A: Dynamic Cart Bundle --
    if (metadata.is_cart_bundle === 'true' && metadata.cart_content) {
        console.log('📦 Detected Cart Bundle checkout.');
        try {
            const cartContent = JSON.parse(metadata.cart_content);
            shopifyLineItems = cartContent.map((item: any) => {
                const numericId = item.variantId ? item.variantId.toString().split('/').pop() : '0';
                return {
                    variant_id: parseInt(numericId || '0'),
                    quantity: item.quantity || 1
                };
            });
        } catch (e) {
            console.error('❌ Failed to parse cart_content:', e);
            return;
        }
    } 
    // -- STRATEGY B: Individual Plan Mapping (Legacy/Direct) --
    else if (metadata.variant_map) {
        console.log('🔗 Detected Direct Plan Mapping checkout.');
        let variantMap: Record<string, string>;
        try {
            variantMap = JSON.parse(metadata.variant_map);
        } catch (e) {
            console.error('Failed to parse variant_map:', e);
            return;
        }

        const whopItems = session.line_items || session.products || [];
        shopifyLineItems = whopItems.map((item: any) => {
            const planId = item.plan_id || item.id; 
            const variantId = variantMap[planId];
            if (!variantId) {
                console.warn(`No matching Shopify Variant for Whop Plan: ${planId}`);
                return null;
            }
            const numericId = variantId.split('/').pop();
            return {
                variant_id: parseInt(numericId || '0'),
                quantity: item.quantity || 1
            };
        }).filter(Boolean);
    } else {
        console.warn('⚠️ No variant_map or cart_content found in metadata.');
        return;
    }

    if (shopifyLineItems.length === 0) {
        console.warn('No valid items to sync to Shopify.');
        return;
    }

    await createShopifyOrder(shopifyLineItems, session.customer_details?.email, env);
}

async function createShopifyOrder(lineItems: any[], email: string | undefined, env: Env) {
    console.log('Creating Shopify Order for items:', lineItems);

    const orderData = {
        order: {
            line_items: lineItems,
            email: email || "customer@example.com",
            financial_status: "paid",
            tags: "whop-sync, src:whop-worker",
            note: "Order created via Cloudflare Worker"
        }
    };

    try {
        const response = await fetch(`https://${env.SHOPIFY_STORE_DOMAIN}/admin/api/${env.SHOPIFY_API_VERSION}/orders.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': env.SHOPIFY_ADMIN_TOKEN
            },
            body: JSON.stringify(orderData)
        });

        const data: any = await response.json();

        if (data.errors) {
            console.error('❌ Shopify Order Creation Failed:', JSON.stringify(data.errors, null, 2));
        } else {
            console.log(`✅ Shopify Order Created: #${data.order.order_number}`);
        }
    } catch (error) {
        console.error('❌ Network Error creating Shopify order:', error);
    }
}
