
import dotenv from 'dotenv';
import Whop from '@whop/sdk';
import nodeFetch from 'node-fetch'; // Standard fetch or use global fetch if Node 18+

// Polyfill fetch if needed (though Node 18 has it)
if (!globalThis.fetch) {
    globalThis.fetch = nodeFetch as any;
}

// Load environment variables
dotenv.config();

const WHOP_API_KEY = process.env.VITE_WHOP_API_KEY;
const WHOP_COMPANY_ID = process.env.VITE_WHOP_COMPANY_ID;
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'aa8x11-j0.myshopify.com';
const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STOREFRONT_TOKEN = '338e8bef7e7378d2391c5fa174eb625e';

const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

if (!WHOP_API_KEY) {
  console.error("Missing VITE_WHOP_API_KEY");
  process.exit(1);
}

const whop = new Whop({
  apiKey: WHOP_API_KEY,
});

async function fetchShopifyProducts() {
    const query = `
      query GetProducts {
        products(first: 20) {
          edges {
            node {
              id
              title
              description
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch(SHOPIFY_STOREFRONT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
        },
        body: JSON.stringify({ query }),
    });

    const data = await response.json();
    return data.data.products.edges;
}


async function syncShopifyToWhop() {
  console.log("Fetching Shopify products...");
  const products = await fetchShopifyProducts(); 
  
  if (products.length === 0) {
    console.log("No Shopify products found.");
    return;
  }

  console.log(`Found ${products.length} products on Shopify.`);

  for (const productWrapper of products) {
    const product = productWrapper.node;
    console.log(`Processing: ${product.title}`);

    try {
        // 1. Create Product on Whop
        console.log(`Creating Whop Product: ${product.title}`);
        
        // Note: The SDK might return data in .data or directly depending on version
        const whopProductRes = await whop.products.create({
            company_id: WHOP_COMPANY_ID!,
            title: product.title.substring(0, 40),
            description: (product.description || '').substring(0, 1000),
        });

        const whopProduct = (whopProductRes as any).data || whopProductRes;
        const whopProductId = whopProduct.id;
        
        console.log(`Created Whop Product ID: ${whopProductId}`);
        
        // 2. Create Plans for each Variant
        for (const variantWrapper of product.variants.edges) {
            const variant = variantWrapper.node;
            console.log(`  > Creating Plan for Variant: ${variant.title} - ${variant.price.amount} ${variant.price.currencyCode}`);
            
            const whopPlanRes = await whop.plans.create({
                company_id: WHOP_COMPANY_ID!,
                product_id: whopProductId,
                title: (variant.title === 'Default Title' ? product.title : `${product.title} - ${variant.title}`).substring(0, 30),
                description: `Variant: ${variant.title}`.substring(0, 1000),
                currency: variant.price.currencyCode.toLowerCase() as any,
                initial_price: parseFloat(variant.price.amount),
                billing_period: 365,
                renewal_price: parseFloat(variant.price.amount),
                stock: 9999,
                unlimited_stock: true
            } as any);
            
            const whopPlan = (whopPlanRes as any).data || whopPlanRes;
            const whopPlanId = whopPlan.id;
            
            console.log(`    -> Created Whop Plan ID: ${whopPlanId}`);
            console.log(`    ----------------------------------------------------------------`);
            console.log(`    MATCH: Shopify Variant (${variant.id}) -> Whop Plan (${whopPlanId})`);
            console.log(`    ACTION: Copy '${whopPlanId}' to Shopify Metafield 'custom.whop_plan_id'`);
            console.log(`    ----------------------------------------------------------------`);
        }

    } catch (error: any) {
        console.error(`Failed to process ${product.title}:`, JSON.stringify(error, null, 2));
        if (error?.response?.data) {
             console.error("API Error Data:", JSON.stringify(error.response.data, null, 2));
        }
    }
  }
}

syncShopifyToWhop();
