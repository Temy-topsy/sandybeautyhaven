import { loadStripe } from '@stripe/stripe-js';

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

if (!publishableKey && typeof window !== 'undefined') {
  console.warn('VITE_STRIPE_PUBLISHABLE_KEY is not defined in environment variables.');
}

export const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

