import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import Stripe from 'stripe'

function stripeDevMiddleware() {
  return {
    name: 'stripe-dev-middleware',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === '/api/create-payment-intent' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const env = loadEnv('development', process.cwd(), '');
              const secretKey = env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY;

              if (!secretKey) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'STRIPE_SECRET_KEY not set in .env' }));
                return;
              }

              const stripe = new Stripe(secretKey);
              const data = JSON.parse(body || '{}');
              const { amount, currency = 'gbp', bookingDetails, customer } = data;

              const numericAmount = parseFloat(amount);
              if (isNaN(numericAmount) || numericAmount <= 0) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Invalid or missing payment amount' }));
                return;
              }

              const amountInPence = Math.round(numericAmount * 100);

              const paymentIntent = await stripe.paymentIntents.create({
                amount: amountInPence,
                currency: currency.toLowerCase(),
                automatic_payment_methods: { enabled: true },
                description: `Sandy Beauty Haven - ${bookingDetails?.serviceName || 'Bespoke Beauty Treatment'}`,
                receipt_email: customer?.email || undefined,
                metadata: {
                  clientName: customer?.fullName || '',
                  clientPhone: customer?.phone || '',
                  clientEmail: customer?.email || '',
                  serviceName: bookingDetails?.serviceName || '',
                  appointmentDate: bookingDetails?.date || '',
                  appointmentTime: bookingDetails?.time || '',
                  paymentChoice: bookingDetails?.paymentChoice || 'deposit',
                  depositAmount: bookingDetails?.depositAmount ? `£${bookingDetails.depositAmount}` : '£50.00',
                  remainingBalance: bookingDetails?.remainingBalance ? `£${bookingDetails.remainingBalance}` : '£0.00'
                },
              });

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                clientSecret: paymentIntent.client_secret,
                id: paymentIntent.id,
              }));
            } catch (err: any) {
              console.error('Local Stripe Dev Error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Payment intent creation failed' }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), stripeDevMiddleware()],
  build: {
    target: 'esnext',
    cssMinify: true,
    rolldownOptions: {
      output: {
        codeSplitting: true
      }
    }
  }
})
