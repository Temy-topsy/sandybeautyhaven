import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Calendar, MessageSquarePlus, CheckCircle2, X } from 'lucide-react';
import { REVIEWS, type ReviewItem } from '../data/reviews';

export const ReviewsPage: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // New review form state
  const [authorName, setAuthorName] = useState('');
  const [serviceDone, setServiceDone] = useState('Hybrid Lash Extensions');
  const [ratingVal, setRatingVal] = useState(5);
  const [commentText, setCommentText] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: authorName,
      service: serviceDone,
      rating: ratingVal,
      date: 'Just now',
      comment: commentText,
      verified: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setModalOpen(false);
      setAuthorName('');
      setCommentText('');
    }, 1800);
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
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '2rem'
          }}>
            <div style={{ maxWidth: '600px' }}>
              <span className="section-eyebrow">Client Feedback</span>
              <h1 style={{ marginBottom: '0.75rem' }}>Reviews & Testimonials</h1>
              <p className="lead" style={{ margin: 0, color: 'var(--color-taupe)' }}>
                Genuine feedback from Edinburgh clients who visit Sandy Beauty Haven.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 1.75rem' }}
            >
              <MessageSquarePlus size={15} />
              Leave a Review
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'clamp(3rem, 5vw, 4.5rem)' }}>
        {/* Rating Summary Card */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: 'clamp(2rem, 4vw, 3rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'clamp(2rem, 4vw, 3rem)',
          alignItems: 'center',
          marginBottom: 'clamp(3.5rem, 6vw, 5rem)',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{ textAlign: 'center', borderRight: '1px solid var(--color-border-subtle)', paddingRight: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', fontWeight: 500, color: 'var(--color-espresso)', lineHeight: 1 }}>
              5.0
            </span>
            <div style={{ display: 'flex', justifyContent: 'center', color: '#B38B59', margin: '0.5rem 0' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#B38B59" />
              ))}
            </div>
            <span style={{ fontSize: '0.825rem', color: 'var(--color-taupe)' }}>
              {reviewsList.length} Verified Reviews
            </span>
          </div>

          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>The Lash Doll Standard</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-taupe)', margin: 0, lineHeight: 1.7 }}>
              Zero-damage isolation, comfortable treatments, and meticulous lash styling at 101 Easter Road.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/schedule" className="btn btn-primary" style={{ padding: '0.9rem 1.85rem', fontSize: '0.8rem' }}>
              <Calendar size={14} />
              Book Appointment
            </Link>
          </div>
        </div>

        {/* Reviews Grid - Spacious & Clean */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(2rem, 4vw, 3rem)'
        }}>
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 'clamp(2rem, 4vw, 2.75rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', color: '#B38B59' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#B38B59" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-taupe)' }}>
                    {rev.date}
                  </span>
                </div>

                <p style={{
                  fontSize: '0.95rem',
                  fontStyle: 'italic',
                  color: 'var(--color-espresso-light)',
                  lineHeight: 1.7,
                  marginBottom: '2rem'
                }}>
                  "{rev.comment}"
                </p>
              </div>

              <div style={{
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--color-border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>
                    {rev.name}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-taupe)' }}>
                    {rev.service}
                  </span>
                </div>

                {rev.verified && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.7rem',
                    color: 'var(--color-success)',
                    backgroundColor: 'var(--color-success-bg)',
                    padding: '0.25rem 0.55rem',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 600
                  }}>
                    <ShieldCheck size={12} />
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(20, 15, 14, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-md)',
              maxWidth: '500px',
              width: '100%',
              padding: 'clamp(2rem, 4vw, 2.75rem)',
              boxShadow: 'var(--shadow-modal)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-taupe)'
              }}
            >
              <X size={20} />
            </button>

            {submittedMessage ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle2 size={40} style={{ color: 'var(--color-success)', margin: '0 auto 1rem' }} />
                <h3>Thank you for your feedback!</h3>
                <p style={{ color: 'var(--color-taupe)' }}>Your testimonial has been submitted.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview}>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Leave a Review</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe)', marginBottom: '1.75rem' }}>
                  Share your experience with Sandy Beauty Haven.
                </p>

                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maggie H."
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Treatment Received</label>
                  <select
                    value={serviceDone}
                    onChange={(e) => setServiceDone(e.target.value)}
                    className="form-select"
                  >
                    <option value="Hybrid Lash Extensions">Hybrid Lash Extensions</option>
                    <option value="Classic Lash Extensions">Classic Lash Extensions</option>
                    <option value="Mega Volume / Russian Lashes">Mega Volume / Russian Lashes</option>
                    <option value="Wispy Lash Set">Wispy Lash Set</option>
                    <option value="Ombré Powder Brows">Ombré Powder Brows</option>
                    <option value="Combo Brows">Combo Brows</option>
                    <option value="CPD 3-Day Beginner Lash Course">CPD 3-Day Beginner Lash Course</option>
                    <option value="Soft Glam Makeup (with Bukky)">Soft Glam Makeup (with Bukky)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Rating</label>
                  <div style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRatingVal(star)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      >
                        <Star
                          size={24}
                          fill={star <= ratingVal ? '#B38B59' : 'none'}
                          stroke="#B38B59"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Testimonial</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us how you loved your treatment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
