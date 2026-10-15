import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Calendar } from 'lucide-react';
import { InstagramIcon } from '../components/ui/SocialIcons';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Appointment Enquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: 'Appointment Enquiry', message: '' });
      alert('Thank you! Your message has been received. Sandy will get back to you shortly.');
    }, 1200);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-ivory)', minHeight: '85vh', paddingBottom: '7rem' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--color-surface-subtle)',
        borderBottom: '1px solid var(--color-border-subtle)',
        paddingTop: 'clamp(3.5rem, 6vw, 5.5rem)',
        paddingBottom: 'clamp(2.5rem, 5vw, 4rem)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '600px' }}>
            <span className="section-eyebrow">Location & Enquiries</span>
            <h1 style={{ marginBottom: '1rem' }}>Get In Touch</h1>
            <p className="lead" style={{ margin: 0, color: 'var(--color-taupe)' }}>
              101 Easter Road, Edinburgh. Get in touch for bookings, training enquiries, or after-hours requests.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'clamp(3.5rem, 6vw, 5rem)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(3rem, 6vw, 5.5rem)',
          alignItems: 'start'
        }}>
          {/* Left Column: Studio Specs */}
          <div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '2rem' }}>Studio Details</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              {/* Location Card */}
              <div style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                display: 'flex',
                gap: '1.25rem',
                boxShadow: 'var(--shadow-subtle)'
              }}>
                <MapPin size={22} style={{ color: 'var(--color-rose)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', marginBottom: '0.35rem' }}>Studio Address</h4>
                  <p style={{ margin: 0, color: 'var(--color-taupe)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Sandy Beauty Haven<br />
                    101 Easter Road, Edinburgh, EH7 5PP
                  </p>
                </div>
              </div>

              {/* Hours Card */}
              <div style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                display: 'flex',
                gap: '1.25rem',
                boxShadow: 'var(--shadow-subtle)'
              }}>
                <Clock size={22} style={{ color: 'var(--color-rose)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', marginBottom: '0.35rem' }}>Opening Hours</h4>
                  <p style={{ margin: 0, color: 'var(--color-taupe)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Mon – Sat: 9:00 AM – 5:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              {/* Phone & Direct Text */}
              <div style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                display: 'flex',
                gap: '1.25rem',
                boxShadow: 'var(--shadow-subtle)'
              }}>
                <Phone size={22} style={{ color: 'var(--color-rose)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', marginBottom: '0.35rem' }}>Telephone</h4>
                  <p style={{ margin: 0, color: 'var(--color-taupe)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    <a href="tel:+447733777956" style={{ fontWeight: 600, color: 'var(--color-espresso)' }}>
                      +44 07733777956
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                display: 'flex',
                gap: '1.25rem',
                boxShadow: 'var(--shadow-subtle)'
              }}>
                <Mail size={22} style={{ color: 'var(--color-rose)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', marginBottom: '0.35rem' }}>Email</h4>
                  <p style={{ margin: 0, color: 'var(--color-taupe)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    <a href="mailto:Lashbysandy9@gmail.com" style={{ color: 'var(--color-espresso)' }}>
                      Lashbysandy9@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Socials Box */}
            <div style={{
              backgroundColor: 'var(--color-surface-warm)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Follow On Instagram</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-taupe)' }}>
                  @Lashbysandy__
                </p>
              </div>
              <a
                href="https://instagram.com/Lashbysandy__"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <InstagramIcon size={14} />
                Visit Profile
              </a>
            </div>
          </div>

          {/* Right Column: Contact & Message Form */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: 'clamp(2rem, 4vw, 3rem)',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Send a Message</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-taupe)', marginBottom: '2rem' }}>
              We'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="c-name">Full Name</label>
                <input
                  id="c-name"
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="c-email">Email Address</label>
                  <input
                    id="c-email"
                    type="email"
                    required
                    placeholder="e.g. sarah@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="c-phone">Phone Number</label>
                  <input
                    id="c-phone"
                    type="tel"
                    placeholder="e.g. 07733777956"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="c-subject">Subject</label>
                <select
                  id="c-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-select"
                >
                  <option value="Appointment Enquiry">Appointment Enquiry</option>
                  <option value="Lash Training Course">Lash Training Course (£600)</option>
                  <option value="After-Hours / Squeeze-in Request">After-Hours / Squeeze-in Request (+£15)</option>
                  <option value="Ombré Brow Consultation">Ombré Brow Consultation</option>
                  <option value="Other Question">Other Question</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="c-message">Your Message</label>
                <textarea
                  id="c-message"
                  required
                  rows={4}
                  placeholder="How can we help?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={formSubmitted}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.75rem', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                {formSubmitted ? (
                  <>
                    <CheckCircle2 size={16} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>
            </form>

            <div style={{
              marginTop: '2.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--color-border-subtle)',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe)', marginBottom: '1rem' }}>
                Prefer to book right away?
              </p>
              <Link to="/schedule" className="btn btn-secondary" style={{ width: '100%', padding: '0.95rem' }}>
                <Calendar size={15} />
                Open Live Schedule
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
