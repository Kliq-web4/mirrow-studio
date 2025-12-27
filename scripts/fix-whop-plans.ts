
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Whop from '@whop/sdk';
import nodeFetch from 'node-fetch';

if (!globalThis.fetch) {
    globalThis.fetch = nodeFetch as any;
}

dotenv.config();

const WHOP_API_KEY = process.env.VITE_WHOP_API_KEY;
const SYNC_FILE_PATH = path.join(process.cwd(), 'whop_sync_v2.txt');

if (!WHOP_API_KEY) {
    console.error("Missing VITE_WHOP_API_KEY");
    process.exit(1);
}

const whop = new Whop({ apiKey: WHOP_API_KEY });

async function fixWhopPlan(planId: string) {
    try {
        console.log(`Fixing plan: ${planId}`);
        
        // We will try to update using the raw API if SDK doesn't support 'type' specific field on update
        // Endpoint: POST /v2/plans/{id} or PUT
        
        const response = await fetch(`https://api.whop.com/v2/plans/${planId}`, {
            method: 'POST', // Whop uses POST for updates often, or PATCH. Checking docs usually requires trial. SDK 'update' uses POST.
            headers: {
                'Authorization': `Bearer ${WHOP_API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                // strategies to force one-time
                billing_period: null, 
                renewal_price: null,
                plan_type: 'one_time' // Correct key confirmed by testing
            })
        });

        if (!response.ok) {
            const err = await response.json();
            console.error(`❌ Failed to update ${planId}:`, JSON.stringify(err));
            
            // Retry strategy: Maybe just setting billing_period to null is enough?
            // "The billing period cannot be zero if the plan is a renewal" suggests if we remove renewal logic it works.
        } else {
            console.log(`✅ Successfully updated ${planId} to one-time.`);
        }

    } catch (e) {
        console.error(`Error fixing ${planId}:`, e);
    }
}

async function main() {
    if (!fs.existsSync(SYNC_FILE_PATH)) {
        console.error("Sync file not found.");
        return;
    }

    const content = fs.readFileSync(SYNC_FILE_PATH, 'utf16le'); // matching your previous success encoding
    const matches = content.matchAll(/Whop Plan \((plan_[a-zA-Z0-9]+)\)/g);
    
    const planIds = [];
    for (const match of matches) {
        planIds.push(match[1]);
    }

    console.log(`Found ${planIds.length} plans to fix.`);
    
    for (const id of planIds) {
        await fixWhopPlan(id);
        await new Promise(r => setTimeout(r, 200)); // Rate limit safety
    }
}

main();
