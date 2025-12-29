import http from 'http';
import dotenv from 'dotenv';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import nodeFetch from 'node-fetch';

// Polyfill fetch
if (!globalThis.fetch) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globalThis.fetch = nodeFetch as any;
}

dotenv.config();

const PORT = 3000;
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const SHOPIFY_STORE_DOMAIN = 'aa8x11-j0.myshopify.com';
const SHOPIFY_API_VERSION = '2025-01';

if (!SHOPIFY_ADMIN_TOKEN) {
    console.error("❌ SHOPIFY_ADMIN_TOKEN is missing in .env");
    process.exit(1);
}

const server = http.createServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/webhooks/whop') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const payload = JSON.parse(body);
                console.log('Received Webhook:', payload.type || 'Unknown Event');

                // Basic validation of event type
                // Whop events: checkout.session.completed, payment.succeeded, etc.
                // You might need to adjust based on exact event name from Whop docs
                if (payload.action === 'checkout.session.completed' || payload.type === 'checkout.session.completed' || payload.data?.status === 'paid') {
                    await handleCheckoutCompleted(payload);
                } else {
                    console.log('Ignoring event type:', payload.type);
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ received: true }));
            } catch (error) {
                console.error('Webhook Error:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleCheckoutCompleted(session: any) {
    console.log('Processing Checkout Completion...');
    
    // Extract Metadata
    const metadata = session.metadata || {};
    let shopifyLineItems: any[] = [];

    // -- STRATEGY A: Dynamic Cart Bundle --
    if (metadata.is_cart_bundle === 'true' && metadata.cart_content) {
        console.log('📦 Detected Cart Bundle checkout.');
        try {
            const cartContent = JSON.parse(metadata.cart_content); // Array of { variantId, quantity }
            
            shopifyLineItems = cartContent.map((item: any) => {
                 // Extract numeric ID from GID if present (gid://shopify/ProductVariant/12345678)
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

        // Extract Line Items from Whop Payload
        // Assuming payload.line_items or session.line_items contains the products
        const whopItems = session.line_items || session.products || [];
        
        shopifyLineItems = whopItems.map((item: any) => {
            // item.plan_id or item.id should match our map keys
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
        console.warn('⚠️ No variant_map or cart_content found in metadata. Cannot sync to Shopify.');
        return;
    }

    if (shopifyLineItems.length === 0) {
        console.warn('No valid items to sync to Shopify.');
        return;
    }

    // Create Shopify Order
    await createShopifyOrder(shopifyLineItems, session.customer_details?.email);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createShopifyOrder(lineItems: any[], email?: string) {
    console.log('Creating Shopify Order for items:', lineItems);

    const orderData = {
        order: {
            line_items: lineItems,
            email: email || "customer@example.com",
            financial_status: "paid",
            tags: "whop-sync, src:whop",
            note: "Order created via Whop Webhook"
        }
    };

    try {
        const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/orders.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN!
            },
            body: JSON.stringify(orderData)
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = await response.json();

        if (data.errors) {
            console.error('❌ Shopify Order Creation Failed:', JSON.stringify(data.errors, null, 2));
        } else {
            console.log(`✅ Shopify Order Created: #${data.order.order_number} (ID: ${data.order.id})`);
        }

    } catch (error) {
        console.error('❌ Network Error creating Shopify order:', error);
    }
}

server.listen(PORT, () => {
    console.log(`🚀 Webhook Server running on http://localhost:${PORT}/webhooks/whop`);
    console.log(`👉 Expose this using 'ngrok http ${PORT}' and add the URL to Whop Developer Dashboard.`);
});
