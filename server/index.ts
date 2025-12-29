
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// @ts-ignore
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuration
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const SHOPIFY_STORE_DOMAIN = 'aa8x11-j0.myshopify.com'; // Should ideally be in env
const SHOPIFY_API_VERSION = '2025-01';

// Health Check
app.get('/', (req, res) => {
  res.send('Mirrow Studio Webhook Server is running.');
});

// Webhook Endpoint
app.post('/webhooks/whop', async (req, res) => {
  try {
    const payload = req.body;
    console.log(`[${new Date().toISOString()}] Received Webhook:`, payload.type || payload.action || 'Unknown Event');

    // 1. Validate Event Type
    // Whop events: checkout.session.completed, payment.succeeded
    // Check documentation for exact event names. Assuming 'checkout.session.completed' based on typical patterns.
    const eventType = payload.type || payload.action;
    const validEvents = ['checkout.session.completed', 'payment.succeeded'];
    
    // Also check generic status if event type is missing but data implies success
    const isPaid = payload.data?.status === 'paid' || payload.status === 'paid';

    if (!validEvents.includes(eventType) && !isPaid) {
      console.log(`Ignoring non-checkout event: ${eventType}`);
      return res.status(200).json({ received: true, ignored: true });
    }

    // 2. Extract Data
    const session = payload.data || payload; 
    
    // 3. Handle Fulfillment
    await handleCheckoutCompleted(session);

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Webhook Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function handleCheckoutCompleted(session: any) {
  const metadata = session.metadata || {};
  
  if (!metadata.variant_map) {
    console.warn('⚠️ No variant_map found in metadata. Skipping Shopify sync.');
    return;
  }

  let variantMap: Record<string, string>;
  try {
    variantMap = JSON.parse(metadata.variant_map);
  } catch (e) {
    console.error('Failed to parse variant_map JSON:', e);
    return;
  }

  console.log('Processing Order for Customer:', session.customer_details?.email);

  // Extract Line Items
  // Whop payload structure varies; checking common paths
  const whopItems = session.line_items || session.products || [];
  
  const shopifyLineItems = whopItems.map((item: any) => {
    // Whop Item ID (Plan ID)
    const planId = item.plan_id || item.id; 
    
    // Map to Shopify Variant ID
    const variantId = variantMap[planId];
    
    if (!variantId) {
      console.warn(`No matching Shopify Variant for Whop Plan: ${planId}`);
      return null;
    }

    // Extract numeric ID from GID if present (gid://shopify/ProductVariant/12345678)
    const numericId = variantId.toString().split('/').pop();

    return {
      variant_id: parseInt(numericId || '0'),
      quantity: item.quantity || 1
    };
  }).filter(Boolean);

  if (shopifyLineItems.length === 0) {
    console.warn('No valid items mapped to Shopify. Aborting order creation.');
    return;
  }

  // Create Shopify Order
  await createShopifyOrder(shopifyLineItems, session.customer_details);
}

async function createShopifyOrder(lineItems: any[], customer: any) {
  if (!SHOPIFY_ADMIN_TOKEN) {
    console.error('❌ SHOPIFY_ADMIN_TOKEN not set. Cannot create order.');
    return;
  }

  const orderPayload = {
    order: {
      line_items: lineItems,
      email: customer?.email || "guest@mirrow.studio",
      financial_status: "paid",
      tags: "whop-sync, source:whop",
      note: "Order automatically created via Whop Webhook",
      customer: {
        first_name: customer?.name?.split(' ')[0] || "Guest",
        last_name: customer?.name?.split(' ').slice(1).join(' ') || "User",
        email: customer?.email
      },
      // If address info exists in Whop payload, map it here
      // billing_address: ...
      // shipping_address: ...
    }
  };

  try {
    const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/orders.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN
      },
      body: JSON.stringify(orderPayload)
    });

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

app.listen(PORT, () => {
  console.log(`🚀 Production Webhook Server running on port ${PORT}`);
});
