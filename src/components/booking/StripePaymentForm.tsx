import React, { useState, useMemo } from 'react';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import type { StripeElementsOptions } from '@stripe/stripe-js';
import { stripePromise } from '../../lib/stripe';
import { ShieldCheck, Lock, AlertCircle, ArrowRight } from 'lucide-react';

interface StripePaymentFormProps {
  clientSecret: string;
  amount: number;
  paymentChoice: 'full' | 'deposit';
  isProcessing: boolean;
  onSuccess: (paymentIntentId: string) => void;
  onError: (errorMessage: string) => void;
}

const CheckoutForm: React.FC<{
  amount: number;
  paymentChoice: 'full' | 'deposit';
  onSuccess: (paymentIntentId: string) => void;
  onError: (errorMessage: string) => void;
}> = ({ amount, paymentChoice, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const paymentElementOptions = useMemo(() => ({
    layout: 'accordion' as const
  }), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !isReady) {
      setErrorMessage('Please wait for payment fields to finish loading before confirming.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking-confirmed`,
        },
        redirect: 'if_required',
      });

      if (error) {
        const msg = error.message || 'Payment authorization failed. Please check your card details.';
        setErrorMessage(msg);
        onError(msg);
        setSubmitting(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      } else {
        // Handled via redirect or pending status
        onSuccess(paymentIntent?.id || 'succeeded');
      }
    } catch (err: any) {
      const msg = err.message || 'An unexpected payment error occurred.';
      setErrorMessage(msg);
      onError(msg);
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {/* Stripe Interactive Payment Element with Dedicated Loading Skeleton */}
      <div style={{ position: 'relative', minHeight: '160px', marginBottom: '1.25rem' }}>
        {!isReady && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              zIndex: 2,
              gap: '0.65rem',
              padding: '1.5rem',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                border: '2px solid var(--color-border)',
                borderTopColor: 'var(--color-rose)',
                borderRadius: '50%',
                animation: 'spin 0.75s linear infinite'
              }}
            />
            <span style={{ fontSize: '0.8rem', color: 'var(--color-taupe)' }}>
              Loading secure card inputs...
            </span>
          </div>
        )}

        <PaymentElement
          options={paymentElementOptions}
          onReady={() => setIsReady(true)}
          onLoadError={(event: any) => {
            console.error('PaymentElement load error:', event);
            setErrorMessage(
              event?.error?.message ||
              'Unable to load card payment fields. Please check your network connection.'
            );
          }}
        />
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div
          role="alert"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.85rem 1rem',
            backgroundColor: 'var(--color-error-bg)',
            color: 'var(--color-error)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            border: '1px solid rgba(163, 55, 55, 0.2)'
          }}
        >
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Security note */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.45rem',
        fontSize: '0.75rem',
        color: 'var(--color-taupe)',
        marginBottom: '1.25rem'
      }}>
        <Lock size={12} style={{ color: 'var(--color-rose)' }} />
        <span>256-bit TLS encrypted • Bank-grade SCA 3D-secure checkout</span>
      </div>

      {/* Submit CTA - Responsive and strictly guarded */}
      <button
        type="submit"
        disabled={!stripe || !elements || !isReady || submitting}
        className="btn btn-rose"
        style={{
          width: '100%',
          padding: '0.95rem 1.25rem',
          fontSize: '0.875rem',
          whiteSpace: 'normal',
          textAlign: 'center',
          lineHeight: 1.35,
          letterSpacing: '0.04em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.65rem',
          cursor: !stripe || !elements || !isReady || submitting ? 'not-allowed' : 'pointer',
          opacity: !isReady ? 0.65 : submitting ? 0.75 : 1,
          borderRadius: 'var(--radius-sm)',
          boxSizing: 'border-box'
        }}
      >
        {!isReady ? (
          <span>Loading Payment Methods...</span>
        ) : submitting ? (
          <>
            <span
              style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255,255,255,0.4)',
                borderTopColor: '#FFFFFF',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'spin 0.75s linear infinite'
              }}
            />
            <span>Securing Your Reservation...</span>
          </>
        ) : (
          <>
            <ShieldCheck size={16} style={{ flexShrink: 0 }} />
            <span>
              {paymentChoice === 'full'
                ? `Pay £${amount.toFixed(2)} in Full & Confirm`
                : `Pay £${amount.toFixed(2)} Deposit & Secure Slot`}
            </span>
            <ArrowRight size={15} style={{ flexShrink: 0 }} />
          </>
        )}
      </button>
    </form>
  );
};

export const StripePaymentWrapper: React.FC<StripePaymentFormProps> = ({
  clientSecret,
  amount,
  paymentChoice,
  onSuccess,
  onError
}) => {
  const options = useMemo<StripeElementsOptions>(() => ({
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#A36F72',
        colorBackground: '#FFFFFF',
        colorText: '#221B1A',
        colorDanger: '#A33737',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        borderRadius: '3px',
        spacingUnit: '4.5px'
      }
    }
  }), [clientSecret]);

  if (!stripePromise) {
    return (
      <div style={{
        padding: '1.5rem',
        backgroundColor: 'var(--color-warning-bg)',
        border: '1px solid var(--color-warning)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--color-warning)',
        fontSize: '0.85rem'
      }}>
        <strong>Stripe Setup Notice:</strong> Publishable key is missing.
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options} key={clientSecret}>
      <CheckoutForm
        amount={amount}
        paymentChoice={paymentChoice}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
};
