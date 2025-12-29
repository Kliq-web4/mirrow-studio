
import dotenv from 'dotenv';
import Whop from '@whop/sdk';
import nodeFetch from 'node-fetch'; // Standard fetch or use global fetch if Node 18+

// Polyfill fetch if needed (though Node 18 has it)
if (!globalThis.fetch) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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


import fs from 'fs';
import path from 'path';

// ... (existing helper function remain the same)

async function syncShopifyToWhop() {
  console.log("Fetching Shopify products...");
  const products = await fetchShopifyProducts(); 
  
  if (products.length === 0) {
    console.log("No Shopify products found.");
    return;
  }

  console.log(`Found ${products.length} products on Shopify.`);

  const mappingData = [];

  for (const productWrapper of products) {
    const product = productWrapper.node;
    console.log(`Processing: ${product.title}`);

    try {
        // 1. Create Product on Whop
        const whopProductRes = await whop.products.create({
            company_id: WHOP_COMPANY_ID!,
            title: product.title.substring(0, 40),
            description: (product.description || '').substring(0, 1000),
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const whopProduct = (whopProductRes as any).data || whopProductRes;
        const whopProductId = whopProduct.id;
        
        console.log(`Created Whop Product ID: ${whopProductId}`);
        
        // 2. Create Plans for each Variant
        for (const variantWrapper of product.variants.edges) {
            const variant = variantWrapper.node;
            
            const whopPlanRes = await whop.plans.create({
                company_id: WHOP_COMPANY_ID!,
                product_id: whopProductId,
                title: (variant.title === 'Default Title' ? product.title : `${product.title} - ${variant.title}`).substring(0, 30),
                description: `Variant: ${variant.title}`.substring(0, 1000),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                currency: variant.price.currencyCode.toLowerCase() as any,
                initial_price: parseFloat(variant.price.amount),
                plan_type: 'one_time',
                stock: 9999,
                unlimited_stock: true
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any);
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const whopPlan = (whopPlanRes as any).data || whopPlanRes;
            const whopPlanId = whopPlan.id;
            
            console.log(`    MATCH: Shopify Variant (${variant.id}) -> Whop Plan (${whopPlanId})`);
            
            mappingData.push({
                variantId: variant.id,
                whopPlanId: whopPlanId,
                title: variant.title === 'Default Title' ? product.title : `${product.title} - ${variant.title}`
            });
        }

    } catch (error: unknown) {
        console.error(`Failed to process ${product.title}:`, JSON.stringify(error, null, 2));
    }
  }

  // Save to file
  const outputPath = path.join(process.cwd(), 'whop_mapping.json');
  fs.writeFileSync(outputPath, JSON.stringify(mappingData, null, 2));
  console.log(`\n✅ Saved ${mappingData.length} mappings to whop_mapping.json`);
}

syncShopifyToWhop();
