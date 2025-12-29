
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fetch from 'node-fetch';

// Polyfill fetch
// Polyfill fetch
if (!globalThis.fetch) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globalThis.fetch = fetch as any;
}

dotenv.config();

// Configuration
// You can move these to .env if preferred
const SHOPIFY_STORE_DOMAIN = 'aa8x11-j0.myshopify.com'; 
const SHOPIFY_ADMIN_API_VERSION = '2025-01'; 
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

// Validation
if (!SHOPIFY_ADMIN_TOKEN) {
    console.error("❌ Error: Missing SHOPIFY_ADMIN_TOKEN environment variable.");
    console.error("Please ensure you have set SHOPIFY_ADMIN_TOKEN in your .env file or session.");
    process.exit(1);
}

const MAPPING_FILE_PATH = path.join(process.cwd(), 'whop_mapping.json');

async function updateMetafield(item: { variantId: string, whopPlanId: string, title: string }) {
    const { variantId, whopPlanId, title } = item;

    console.log(`Processing: ${title}`);
    console.log(`  Target: ${variantId} -> ${whopPlanId}`);

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
                'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN!
            },
            body: JSON.stringify({ query, variables })
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await response.json();

        if (result.errors) {
            console.error(`  ❌ GraphQL Error:`, JSON.stringify(result.errors, null, 2));
            return false;
        }

        const userErrors = result.data?.metafieldsSet?.userErrors;
        if (userErrors && userErrors.length > 0) {
            console.error(`  ⚠️ User Error:`, JSON.stringify(userErrors, null, 2));
            return false;
        }

        console.log(`  ✅ Success`);
        return true;

    } catch (error) {
        console.error(`  ❌ Network Error:`, error);
        return false;
    }
}

async function main() {
    if (!fs.existsSync(MAPPING_FILE_PATH)) {
        console.error(`❌ Mapping file not found: ${MAPPING_FILE_PATH}`);
        console.error(`Please run 'npm run sync-whop' first to generate this file.`);
        return;
    }

    const rawData = fs.readFileSync(MAPPING_FILE_PATH, 'utf-8');
    let mappings = [];
    
    try {
        mappings = JSON.parse(rawData);
    } catch (e) {
        console.error(`❌ Failed to parse JSON mapping file.`);
        return;
    }

    console.log(`\n🚀 Starting Bulk Metafield Update for ${mappings.length} variants...\n`);

    let successCount = 0;
    
    for (const item of mappings) {
        const success = await updateMetafield(item);
        if (success) successCount++;
        // Small delay to be kind to API rate limits
        await new Promise(r => setTimeout(r, 200)); 
    }

    console.log(`\n🎉 Complete! Successfully updated ${successCount}/${mappings.length} items.\n`);
}

main();
