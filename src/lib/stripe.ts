import { loadStripe } from '@stripe/stripe-js';

// Safe test key fallback ensures client-side Stripe initialization never breaks
const publishableKey =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
  'pk_test_51OWnixDZsSkkHCxw8sIVtrwR1x8F4OtDig8AMPMdm2mECyBGyTM4aP9MqqqWV8qrfdjHYXCQA1vdJZqIzn6OewsN00rpEXgDiR';

export const stripePromise = publishableKey ? loadStripe(publishableKey) : null;


