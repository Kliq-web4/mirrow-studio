
import Whop from '@whop/sdk';
import 'dotenv/config';

const WHOP_API_KEY = process.env.VITE_WHOP_API_KEY;
if (!WHOP_API_KEY) throw new Error("No API Key");

const whop = new Whop({ apiKey: WHOP_API_KEY });

async function run() {
    console.log('Fetching products...');
    const productsResponse = await whop.products.list({ company_id: process.env.VITE_WHOP_COMPANY_ID! });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const products = (productsResponse as any).data || [];
    
    console.log(`Found ${products.length} products.`);
    
    try {
        const plansString = ['plan_wEeBkxf20Amel', 'plan_wEeBkxf20Amel'];
        const lineItems = plansString.map(id => ({ planId: id, quantity: 1 })); // camelCase planId?
        
        console.log("Creating checkout with 'experiences' or 'plans'...");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const config = await (whop as any).checkoutConfigurations.create({
            experiences: lineItems, // Trying experiences
             // or plans: lineItems
             redirectUrl: 'http://localhost:3000'
        });
        
        console.log("RESULT: SUCCESS");
        console.log("Config:", JSON.stringify(config, null, 2));
    } catch (e: unknown) {
        console.error("RESULT: FAILED");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const error: any = e;
        const fs = await import('fs');
        const errorData = {
            message: error.message,
            response: error.response ? { status: error.response.status, data: error.response.data } : null
        };
        fs.writeFileSync('error_details.txt', JSON.stringify(errorData, null, 2));
        console.log("Error details written to error_details.txt");
    }
}

run();
