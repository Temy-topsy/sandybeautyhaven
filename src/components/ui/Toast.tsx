import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 10000,
        backgroundColor: 'var(--color-espresso)',
        color: 'var(--color-ivory)',
        padding: '0.85rem 1.25rem',
        borderRadius: 'var(--radius-sm)',
        boxShadow: 'var(--shadow-hover)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        fontSize: '0.875rem',
        fontWeight: 500,
        border: '1px solid rgba(255,255,255,0.12)',
        animation: 'slideUpFade 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        maxWidth: '90vw'
      }}
    >
      <CheckCircle2 size={16} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
      <span>{toastMessage}</span>
    </div>
  );
};
