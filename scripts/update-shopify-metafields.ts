
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import nodeFetch from 'node-fetch';

// Polyfill fetch
if (!globalThis.fetch) {
    globalThis.fetch = nodeFetch as any;
}

dotenv.config();

// Configuration
const SHOPIFY_STORE_DOMAIN = 'aa8x11-j0.myshopify.com'; // From your shopify.ts
const SHOPIFY_ADMIN_API_VERSION = '2025-01'; // Recent stable version
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

if (!SHOPIFY_ADMIN_TOKEN) {
    console.error("❌ Error: Missing SHOPIFY_ADMIN_TOKEN environment variable.");
    console.error("Please run with: Set-Item -Path Env:SHOPIFY_ADMIN_TOKEN -Value 'shpat_...'; npx tsx scripts/update-shopify-metafields.ts");
    process.exit(1);
}

    const SYNC_FILE_PATH = path.join(process.cwd(), 'whop_sync_v3.txt');

async function updateShopifyMetafield(variantId: string, whopPlanId: string) {
    // Determine the Global ID format (GraphQL Admin API requires gid://shopify/ProductVariant/...)
    // The sync file has full GIDs, so we should be good.
    
    // Mutation to set metafield
    const query = `
        mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
            metafieldsSet(metafields: $metafields) {
                metafields {
                    id
                    key
                    value
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;

    const variables = {
        metafields: [
            {
                ownerId: variantId,
                namespace: "custom",
                key: "whop_plan_id",
                value: whopPlanId,
                type: "single_line_text_field"
            }
        ]
    };

    try {
        const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_ADMIN_API_VERSION}/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN
            },
            body: JSON.stringify({ query, variables })
        });

        const data: any = await response.json();

        if (data.errors) {
            console.error(`❌ API Error for ${variantId}:`, JSON.stringify(data.errors, null, 2));
            return false;
        }

        if (data.data?.metafieldsSet?.userErrors?.length > 0) {
            console.error(`⚠️ Update Failed for ${variantId}:`, JSON.stringify(data.data.metafieldsSet.userErrors, null, 2));
            return false;
        }

        console.log(`✅ Success: Linked ${variantId} -> ${whopPlanId}`);
        return true;

    } catch (error) {
        console.error(`❌ Network/Script Error for ${variantId}:`, error);
        return false;
    }
}

async function main() {
    console.log("📂 Reading sync file:", SYNC_FILE_PATH);
    
    if (!fs.existsSync(SYNC_FILE_PATH)) {
        console.error("Sync file not found. Please run the sync-whop script first.");
        return;
    }

    const content = fs.readFileSync(SYNC_FILE_PATH, 'utf16le');
    const matches = content.matchAll(/MATCH: Shopify Variant \((gid:\/\/shopify\/ProductVariant\/\d+)\) -> Whop Plan \((plan_[a-zA-Z0-9]+)\)/g);
    
    let count = 0;
    const updates = [];

    for (const match of matches) {
        const variantId = match[1];
        const whopPlanId = match[2];
        updates.push({ variantId, whopPlanId });
    }

    console.log(`🔍 Found ${updates.length} variants to update.`);

    for (const item of updates) {
        await updateShopifyMetafield(item.variantId, item.whopPlanId);
        // Small delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 200)); 
    }

    console.log("🎉 Done! All variants processed.");
}

main();
