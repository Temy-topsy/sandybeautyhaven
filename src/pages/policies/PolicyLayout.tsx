import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const PolicyLayout: React.FC = () => {
  const location = useLocation();

  const policyNav = [
    { name: 'Booking Policy', path: '/policies/booking' },
    { name: 'Cancellation & Reschedule', path: '/policies/cancellation' },
    { name: 'Refund Policy', path: '/policies/refunds' },
    { name: 'Privacy Policy (UK GDPR)', path: '/policies/privacy' },
    { name: 'Terms & Conditions', path: '/policies/terms' },
    { name: 'Cookie Policy', path: '/policies/cookies' }
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-ivory)', minHeight: '85vh', paddingBottom: '6rem' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--color-surface-subtle)',
        borderBottom: '1px solid var(--color-border)',
        paddingTop: 'clamp(3rem, 5vw, 4.5rem)',
        paddingBottom: 'clamp(2.5rem, 4vw, 3.5rem)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '640px' }}>
            <span className="section-eyebrow">Legal & Studio Guidelines</span>
            <h1 style={{ marginBottom: '0.75rem' }}>Policies & Client Agreement</h1>
            <p className="lead" style={{ margin: 0 }}>
              Transparent, professional guidelines protecting both our valued clients and our practitioners at Sandy Beauty Haven, Edinburgh.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'clamp(2rem, 4vw, 3.5rem)',
          alignItems: 'start'
        }}>
          {/* Sidebar Nav */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-subtle)',
            position: 'sticky',
            top: '100px'
          }}>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-taupe)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-subtle)' }}>
              Studio Policies
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {policyNav.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 600 : 400,
                      backgroundColor: isActive ? 'var(--color-surface-warm)' : 'transparent',
                      color: isActive ? 'var(--color-espresso)' : 'var(--color-taupe)',
                      textDecoration: 'none',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>

            <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-subtle)', fontSize: '0.8rem', color: 'var(--color-taupe)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-espresso)', fontWeight: 600, marginBottom: '0.35rem' }}>
                <ShieldCheck size={16} style={{ color: 'var(--color-rose)' }} />
                UK Consumer Standards
              </div>
              Updated for October 2026. Compliant with UK Consumer Rights Act 2015 & UK GDPR.
            </div>
          </div>

          {/* Main Content Area */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'clamp(2rem, 4vw, 3rem)',
            boxShadow: 'var(--shadow-subtle)',
            gridColumn: 'span 2'
          }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
