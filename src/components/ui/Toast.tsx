import React from 'react';
import { useToast } from '../../context/ToastContext';
import { Check } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useToast();

  if (!toastMessage) return null;

  return (
    <div
      className="toast-container"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9999,
        backgroundColor: 'var(--color-noir)',
        color: 'var(--color-noir-text)',
        padding: '0.85rem 1.35rem',
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        fontSize: '0.85rem',
        boxShadow: 'var(--shadow-modal)',
        border: '1px solid rgba(255, 255, 255, 0.12)'
      }}
    >
      <div style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'rgba(163, 111, 114, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <Check size={13} style={{ color: 'var(--color-rose)' }} />
      </div>
      <span style={{ fontWeight: 500 }}>{toastMessage}</span>
    </div>
  );
};
