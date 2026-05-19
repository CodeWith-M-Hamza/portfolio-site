import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { person } from '../data/portfolioData'
import AdminModal from './AdminModal'



// Contact links data
const CONTACT_LINKS = [
  {
    icon:  '📧',
    label: 'Email',
    value: person.email,
    href:  `mailto:${person.email}`,
  },
  {
    icon:  '🎓',
    label: 'Google Scholar',
    value: 'scholar.google.com',
    href:  person.scholar,
  },
  {
    icon:  '🔗',
    label: 'ResearchGate',
    value: 'Coming soon',
    href:  person.researchgate,
  },
  {
    icon:  '💼',
    label: 'LinkedIn',
    value: 'Coming soon',
    href:  person.linkedin,
  },
]

export default function Contact() {

  // Form field values
  const [form, setForm] = useState({
    name:    '',
    email:   '',
    subject: '',
    message: '',
  })

  // Show success message after submit
  const [submitted, setSubmitted] = useState(false)
  const [showAdminModal, setShowAdminModal] = useState(false)

  const labelRef = useScrollReveal()
  const titleRef = useScrollReveal()
  const subRef   = useScrollReveal()
  const leftRef  = useScrollReveal()
  const rightRef = useScrollReveal()

  // ── Update form field on change ──────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // ── Submit → open mailto with form data ─────────────────
  const handleSubmit = (e) => {
    e.preventDefault()

    const subject = encodeURIComponent(form.subject || 'Research Inquiry')
    const body    = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )

    window.location.href =
      `mailto:${person.email}?subject=${subject}&body=${body}`

    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <>
      <style>{`

        .contact {
          padding: 100px 0 60px;
        }

        /* ── Two column grid ──────────────────────────────── */
        .contact-grid {
          display:               grid;
          grid-template-columns: 1fr 1.3fr;
          gap:                   64px;
          align-items:           start;
        }

        /* ── Left: links ──────────────────────────────────── */
        .contact-links {
          display:        flex;
          flex-direction: column;
          gap:            12px;
          margin-bottom:  32px;
        }

        .contact-link {
          display:         flex;
          align-items:     center;
          gap:             16px;
          padding:         16px 20px;
          background:      var(--card);
          border:          1px solid var(--border);
          border-radius:   12px;
          text-decoration: none;
          transition:      border-color var(--t), transform var(--t), background var(--t);
        }

        .contact-link:hover {
          border-color: var(--border2);
          background:   var(--navy3);
          transform:    translateX(4px);
        }

        .contact-link-icon {
          font-size:       20px;
          width:           44px;
          height:          44px;
          border-radius:   10px;
          background:      rgba(0,200,255,0.06);
          border:          1px solid var(--border);
          display:         flex;
          align-items:     center;
          justify-content: center;
          flex-shrink:     0;
          transition:      background var(--t);
        }

        .contact-link:hover .contact-link-icon {
          background: rgba(0,200,255,0.12);
        }

        .contact-link-body {
          display:        flex;
          flex-direction: column;
          gap:            2px;
          min-width:      0;
        }

        .contact-link-label {
          font-family:    var(--ff-mono);
          font-size:      10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color:          var(--text3);
        }

        .contact-link-value {
          font-size:     13px;
          color:         var(--text2);
          white-space:   nowrap;
          overflow:      hidden;
          text-overflow: ellipsis;
          transition:    color var(--t);
        }

        .contact-link:hover .contact-link-value {
          color: var(--accent);
        }

        /* Arrow on right side */
        .contact-link-arrow {
          margin-left: auto;
          font-size:   14px;
          color:       var(--text3);
          transition:  color var(--t), transform var(--t);
          flex-shrink: 0;
        }

        .contact-link:hover .contact-link-arrow {
          color:     var(--accent);
          transform: translateX(3px);
        }

        /* University address card */
        .contact-address {
          padding:       20px;
          background:    var(--card);
          border:        1px solid var(--border);
          border-radius: 12px;
          display:       flex;
          gap:           14px;
        }

        .contact-address-icon {
          font-size:   20px;
          flex-shrink: 0;
          margin-top:  2px;
        }

        .contact-address-text {
          font-size:   13px;
          color:       var(--text3);
          line-height: 1.7;
        }

        /* ── Right: contact form ──────────────────────────── */
        .contact-form {
          display:        flex;
          flex-direction: column;
          gap:            16px;
          padding:        32px;
          background:     var(--card);
          border:         1px solid var(--border);
          border-radius:  16px;
        }

        .form-title {
          font-family:   var(--ff-display);
          font-size:     22px;
          font-weight:   600;
          color:         var(--text);
          margin-bottom: 4px;
        }

        .form-sub {
          font-size:     13px;
          color:         var(--text3);
          margin-bottom: 8px;
        }

        /* Form row — two fields side by side */
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap:     12px;
        }

        /* Input + textarea base styles */
        .form-input,
        .form-textarea {
          width:         100%;
          padding:       12px 16px;
          background:    var(--navy3);
          border:        1px solid var(--border);
          border-radius: 10px;
          color:         var(--text);
          font-family:   var(--ff-body);
          font-size:     14px;
          outline:       none;
          transition:    border-color var(--t), background var(--t);
          resize:        none;
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: var(--text3);
        }

        .form-input:focus,
        .form-textarea:focus {
          border-color: var(--accent);
          background:   var(--navy2);
        }

        .form-textarea {
          height:     140px;
          resize:     vertical;
          min-height: 100px;
          max-height: 300px;
        }

        /* Submit button */
        .form-submit {
          padding:       13px 28px;
          background:    var(--accent);
          color:         var(--navy);
          border:        none;
          border-radius: 10px;
          font-family:   var(--ff-body);
          font-size:     14px;
          font-weight:   500;
          cursor:        pointer;
          transition:    all var(--t);
          align-self:    flex-start;
          letter-spacing: 0.3px;
        }

        .form-submit:hover {
          background: #00e8ff;
          transform:  translateY(-2px);
        }

        .form-submit:active {
          transform: translateY(0);
        }

        /* Success state */
        .form-success {
          display:       flex;
          align-items:   center;
          gap:           12px;
          padding:       16px 20px;
          background:    rgba(0,229,200,0.08);
          border:        1px solid rgba(0,229,200,0.25);
          border-radius: 10px;
          font-size:     14px;
          color:         var(--accent2);
          animation:     fadeInUp 0.4s ease;
        }

        /* ── Footer bar ───────────────────────────────────── */
        .contact-footer {
          margin-top:      64px;
          padding-top:     32px;
          border-top:      1px solid var(--border);
          display:         flex;
          align-items:     center;
          justify-content: space-between;
          flex-wrap:       wrap;
          gap:             16px;
        }

        .footer-copy {
          font-size:   13px;
          color:       var(--text3);
          font-family: var(--ff-mono);
          letter-spacing: 0.5px;
        }

        .footer-copy span {
          color: var(--accent);
        }

        .footer-back-top {
          font-family:    var(--ff-mono);
          font-size:      12px;
          letter-spacing: 1px;
          color:          var(--text3);
          background:     none;
          border:         1px solid var(--border);
          padding:        7px 16px;
          border-radius:  6px;
          cursor:         pointer;
          transition:     all var(--t);
        }

        .footer-back-top:hover {
          border-color: var(--border2);
          color:        var(--text2);
        }

        /* ── Responsive ───────────────────────────────────── */
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }

      `}</style>

      <section className="contact section" id="contact">
        <div className="container">

          <p  className="section-label reveal" ref={labelRef}>
            Get In Touch
          </p>
          <h2 className="section-title reveal" ref={titleRef}>
            Contact
          </h2>
          <p  className="section-sub reveal"   ref={subRef}>
            Open to research collaborations, speaking
            invitations, and academic discussions.
          </p>

          <div className="contact-grid">

            {/* ── Left: links + address ─────────────────── */}
            <div className="reveal" ref={leftRef}>

              <div className="contact-links">
                {CONTACT_LINKS.map(link => (
                  <a
                    key={link.label}
                    href={link.href === '#' ? undefined : link.href}
                    target={link.href !== '#' && !link.href.startsWith('mailto') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="contact-link"
                    onClick={e => link.href === '#' && e.preventDefault()}
                  >
                    <div className="contact-link-icon">{link.icon}</div>
                    <div className="contact-link-body">
                      <span className="contact-link-label">{link.label}</span>
                      <span className="contact-link-value">{link.value}</span>
                    </div>
                    <span className="contact-link-arrow" aria-hidden="true">→</span>
                  </a>
                ))}
              </div>

              {/* Address */}
              <div className="contact-address">
                <span className="contact-address-icon">📍</span>
                <p className="contact-address-text">
                  {person.address}
                </p>
              </div>

            </div>

            {/* ── Right: form ───────────────────────────── */}
            <div className="reveal" ref={rightRef}>

              <div className="contact-form">

                <div>
                  <h3 className="form-title">Send a Message</h3>
                  <p  className="form-sub">
                    For collaborations, questions, or academic inquiries.
                  </p>
                </div>

                {/* Success message */}
                {submitted && (
                  <div className="form-success">
                    <span>✅</span>
                    Opening your email client with the message...
                  </div>
                )}

                {/* Form fields */}
                <div className="form-row">
                  <input
                    className="form-input"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <input
                  className="form-input"
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={handleChange}
                />

                <textarea
                  className="form-textarea"
                  name="message"
                  placeholder="Your message..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />

                <button
                  className="form-submit"
                  onClick={handleSubmit}
                >
                  Send Message
                </button>

              </div>
            </div>
          </div>

          {/* ── Footer ────────────────────────────────────────── */}
<div className="contact-footer">

  <p className="footer-copy">
    &copy; {new Date().getFullYear()}{' '}
    <span>Muhammad Usman Javeed</span>
    {' '}— All rights reserved.
  </p>

  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>

    <button
      className="footer-back-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      Back to top
    </button>

    {/* Admin button — visible to all, but login modal protects it */}
    <button
      onClick={() => setShowAdminModal(true)}
      style={{
        fontFamily:    'var(--ff-mono)',
        fontSize:      '11px',
        color:         'var(--text3)',
        background:    'transparent',
        border:        '1px solid var(--border)',
        padding:       '6px 14px',
        borderRadius:  '6px',
        cursor:        'pointer',
        letterSpacing: '1px',
        transition:    'all 0.3s ease',
      }}
      onMouseEnter={e => {
        e.target.style.borderColor = 'var(--border2)'
        e.target.style.color       = 'var(--text2)'
      }}
      onMouseLeave={e => {
        e.target.style.borderColor = 'var(--border)'
        e.target.style.color       = 'var(--text3)'
      }}
    >
      Dashboard
    </button>

  </div>

</div>

{/* Admin login modal */}
{showAdminModal && (
  <AdminModal onClose={() => setShowAdminModal(false)} />
)}
          </div>
        </section>
      </>
    )
  }

