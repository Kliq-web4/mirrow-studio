
import dotenv from 'dotenv';
import Whop from '@whop/sdk';
import nodeFetch from 'node-fetch';

if (!globalThis.fetch) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globalThis.fetch = nodeFetch as any;
}

dotenv.config();

const WHOP_API_KEY = process.env.VITE_WHOP_API_KEY;
const WHOP_COMPANY_ID = process.env.VITE_WHOP_COMPANY_ID;

if (!WHOP_API_KEY) {
    console.error("Missing VITE_WHOP_API_KEY");
    process.exit(1);
}

const whop = new Whop({ apiKey: WHOP_API_KEY });

async function setupCartProduct() {
    console.log("Setting up 'Mirrow General Cart' product...");

    try {
        // 1. Check if it already exists (naive check: list last 20 and search)
        // A better way is to just create one and let the user delete duplicates if they run this many times, 
        // or store the ID. We'll create one.
        
        const productRes = await whop.products.create({
            company_id: WHOP_COMPANY_ID!,
            title: "Mirrow General Cart",
            description: "Hidden product for processing custom cart checkouts.",
            visibility: 'hidden' // if supported, otherwise just a standard product
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const product = (productRes as any).data || productRes;
        
        console.log("\n✅ Created Cart Product!");
        console.log(`Product ID: ${product.id}`);
        console.log(`Name: ${product.title}`);
        console.log("\nPlease add this to your .env file:");
        console.log(`VITE_WHOP_CART_PRODUCT_ID=${product.id}`);

    } catch (e) {
        console.error("Failed to create product:", e);
    }
}

setupCartProduct();
