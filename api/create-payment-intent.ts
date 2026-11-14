import Stripe from 'stripe';

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

  let stripeSecretKey = (process.env.STRIPE_SECRET_KEY || '').trim();
  // Sanitize: strip quotes, spaces, and non-printable unicode characters
  stripeSecretKey = stripeSecretKey.replace(/^["']|["']$/g, '').trim();
  stripeSecretKey = stripeSecretKey.replace(/[^\x20-\x7E]/g, '').trim();

  if (req.method === 'GET') {
    const isConfigured = Boolean(stripeSecretKey && (stripeSecretKey.startsWith('sk_test_') || stripeSecretKey.startsWith('sk_live_')));
    res.status(200).json({
      status: 'ok',
      endpoint: '/api/create-payment-intent',
      stripeConfigured: isConfigured,
      keyPrefix: stripeSecretKey ? `${stripeSecretKey.slice(0, 8)}...` : 'MISSING',
      message: isConfigured
        ? 'Stripe secret key is properly configured.'
        : 'STRIPE_SECRET_KEY is missing or invalid in Vercel. It must start with sk_test_ or sk_live_.'
    });
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  if (!stripeSecretKey) {
    res.status(500).json({ error: 'STRIPE_SECRET_KEY environment variable is not configured in Vercel.' });
    return;
  }

  if (!stripeSecretKey.startsWith('sk_test_') && !stripeSecretKey.startsWith('sk_live_')) {
    res.status(500).json({
      error: `Invalid STRIPE_SECRET_KEY format in Vercel. The key must start with 'sk_test_' or 'sk_live_', but starts with '${stripeSecretKey.slice(0, 6)}...'. Please check Vercel Settings → Environment Variables.`
    });
    return;
  }

  const stripe = new Stripe(stripeSecretKey);

  try {
    let payload = req.body || {};
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch {
        // payload remains raw
      }
    }

    const { amount, currency = 'gbp', bookingDetails, customer } = payload;

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

