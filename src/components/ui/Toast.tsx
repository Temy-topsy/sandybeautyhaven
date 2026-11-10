import React from 'react';
import { useToast } from '../../context/ToastContext';
import { Check } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useToast();

  if (!toastMessage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9999,
        backgroundColor: 'var(--color-espresso)',
        color: '#FFFFFF',
        padding: '0.85rem 1.35rem',
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        fontSize: '0.85rem',
        boxShadow: 'var(--shadow-modal)',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <Check size={16} style={{ color: 'var(--color-rose)' }} />
      <span>{toastMessage}</span>
    </div>
  );
};
