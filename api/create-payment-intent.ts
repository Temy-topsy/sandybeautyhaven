import type { IncomingMessage, ServerResponse } from 'http';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';

const stripe = new Stripe(stripeSecretKey);

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  if (!stripeSecretKey) {
    res.status(500).json({ error: 'STRIPE_SECRET_KEY environment variable is not configured.' });
    return;
  }

  try {
    const { amount, currency = 'gbp', bookingDetails, customer } = req.body || {};

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      res.status(400).json({ error: 'Invalid or missing payment amount' });
      return;
    }

    // Convert amount to pence (e.g. £50.00 -> 5000)
    const amountInPence = Math.round(numericAmount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPence,
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
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

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  } catch (err: any) {
    console.error('Stripe PaymentIntent error:', err);
    res.status(500).json({
      error: err.message || 'Payment intent creation failed'
    });
  }
}

