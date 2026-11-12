import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}

const SunIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 16, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 16, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', style, size = 16 }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`theme-toggle-btn ${className}`}
      style={{
        background: 'transparent',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        width: '36px',
        height: '36px',
        minWidth: '36px',
        minHeight: '36px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--color-espresso)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: 0,
        ...style
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isDark ? 'rotate(180deg)' : 'rotate(0deg)'
        }}
      >
        {isDark ? (
          <SunIcon size={size + 1} style={{ color: '#F5BE58' }} />
        ) : (
          <MoonIcon size={size} style={{ color: 'var(--color-espresso)' }} />
        )}
      </span>
    </button>
  );
};
