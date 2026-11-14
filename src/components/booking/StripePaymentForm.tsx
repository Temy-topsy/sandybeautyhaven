import React, { useState } from 'react';
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
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
      {/* Stripe Interactive Payment Element (Card, Apple Pay, Google Pay) */}
      <div style={{ marginBottom: '1.5rem', minHeight: '180px' }}>
        <PaymentElement
          options={{
            layout: 'tabs',
            wallets: {
              applePay: 'auto',
              googlePay: 'auto'
            }
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

      {/* Submit CTA */}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="btn btn-rose"
        style={{
          width: '100%',
          padding: '1.1rem 1.5rem',
          fontSize: '0.925rem',
          letterSpacing: '0.04em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.65rem',
          cursor: !stripe || submitting ? 'not-allowed' : 'pointer',
          opacity: submitting ? 0.75 : 1,
          borderRadius: 'var(--radius-sm)'
        }}
      >
        {submitting ? (
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
            <ShieldCheck size={16} />
            <span>
              {paymentChoice === 'full'
                ? `Pay £${amount.toFixed(2)} in Full & Confirm`
                : `Pay £${amount.toFixed(2)} Deposit & Secure Slot`}
            </span>
            <ArrowRight size={15} />
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
        <strong>Stripe Setup Notice:</strong> Publishable key is missing in environment variables.
      </div>
    );
  }

  const options: StripeElementsOptions = {
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
      },
      rules: {
        '.Input': {
          border: '1px solid #E8E0D7',
          boxShadow: 'none',
          padding: '11px 14px',
          fontSize: '14px',
          transition: 'border-color 0.18s ease'
        },
        '.Input:focus': {
          borderColor: '#A36F72',
          boxShadow: '0 0 0 1px #A36F72'
        },
        '.Label': {
          fontSize: '12px',
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: '#70645F',
          marginBottom: '6px'
        },
        '.Tab': {
          border: '1px solid #E8E0D7',
          backgroundColor: '#FAF7F2',
          color: '#221B1A'
        },
        '.Tab--selected': {
          border: '1px solid #A36F72',
          backgroundColor: '#FFFFFF',
          color: '#A36F72'
        }
      }
    }
  };

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
