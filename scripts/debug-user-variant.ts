
import dotenv from 'dotenv';
import nodeFetch from 'node-fetch';

if (!globalThis.fetch) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globalThis.fetch = nodeFetch as any;
}

dotenv.config();

const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const SHOPIFY_STORE_DOMAIN = 'aa8x11-j0.myshopify.com';

const VARIANT_ID = 'gid://shopify/ProductVariant/49798566084854';

async function verify() {
    console.log(`Checking Variant: ${VARIANT_ID}`);
    const query = `
        query {
            productVariant(id: "${VARIANT_ID}") {
                id
                title
                metafield(namespace: "custom", key: "whop_plan_id") {
                    value
                }
            }
        }
    `;

    const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/admin/api/2025-01/graphql.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN!
        },
        body: JSON.stringify({ query })
    });

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
}

verify();
