import { useScrollReveal } from '../hooks/useScrollReveal'
import { person } from '../data/portfolioData'

export default function About() {

  // Each ref triggers fade-up animation when scrolled into view
  const labelRef  = useScrollReveal()
  const titleRef  = useScrollReveal()
  const leftRef   = useScrollReveal()
  const rightRef  = useScrollReveal()

  return (
    <>
      <style>{`

        .about {
          padding: 100px 0;
          position: relative;
        }

        /* Subtle top border line as section divider */
        .about::before {
          content:    '';
          position:   absolute;
          top:        0;
          left:       50%;
          transform:  translateX(-50%);
          width:      1px;
          height:     80px;
          background: linear-gradient(
            to bottom,
            transparent,
            var(--accent),
            transparent
          );
        }

        /* ── Two column layout ────────────────────────────── */
        .about-grid {
          display:               grid;
          grid-template-columns: 1fr 1.4fr;
          gap:                   80px;
          align-items:           start;
          margin-top:            56px;
        }

        /* ── LEFT — Avatar + quick info ───────────────────── */

        /* Avatar circle with initials */
        .avatar {
          width:           160px;
          height:          160px;
          border-radius:   50%;
          border:          1px solid var(--border2);
          background:      var(--navy3);
          display:         flex;
          align-items:     center;
          justify-content: center;
          margin:          0 auto 32px;
          position:        relative;
          transition:      border-color var(--t);
        }

        /* Rotating dashed ring around avatar */
        .avatar::before {
          content:       '';
          position:      absolute;
          inset:         -8px;
          border-radius: 50%;
          border:        1px dashed rgba(0, 200, 255, 0.25);
          animation:     spin 20s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .avatar:hover {
          border-color: var(--accent);
        }

        .avatar-initials {
          font-family:    var(--ff-display);
          font-size:      42px;
          font-weight:    600;
          color:          var(--accent);
          letter-spacing: 2px;
          line-height:    1;
        }

        /* Quick info cards below avatar */
        .info-cards {
          display:        flex;
          flex-direction: column;
          gap:            10px;
        }

        .info-card {
          display:     flex;
          align-items: center;
          gap:         12px;
          padding:     12px 16px;
          background:  var(--card);
          border:      1px solid var(--border);
          border-radius: 10px;
          transition:  border-color var(--t), transform var(--t);
        }

        .info-card:hover {
          border-color: var(--border2);
          transform:    translateX(4px);
        }

        .info-icon {
          font-size:   18px;
          line-height: 1;
          flex-shrink: 0;    /* never shrink the icon */
        }

        .info-text {
          display:        flex;
          flex-direction: column;
          gap:            2px;
          min-width:      0;  /* allows text-overflow to work */
        }

        .info-label {
          font-family:    var(--ff-mono);
          font-size:      10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color:          var(--text3);
        }

        .info-value {
          font-size:     13px;
          color:         var(--text2);
          white-space:   nowrap;
          overflow:      hidden;
          text-overflow: ellipsis;
        }

        /* ── RIGHT — Bio + tags ───────────────────────────── */

        .about-bio {
          font-size:   16px;
          color:       var(--text2);
          line-height: 1.85;
          margin-bottom: 32px;
        }

        /* Highlighted accent word */
        .about-bio strong {
          color:       var(--text);
          font-weight: 500;
        }

        /* Research focus tags */
        .about-tags {
          display:   flex;
          flex-wrap: wrap;
          gap:       8px;
          margin-bottom: 36px;
        }

        /* Citation badge */
        .citation-badge {
          display:       inline-flex;
          align-items:   center;
          gap:           10px;
          padding:       14px 20px;
          background:    var(--card);
          border:        1px solid var(--border);
          border-radius: 12px;
          transition:    border-color var(--t);
        }

        .citation-badge:hover {
          border-color: var(--border2);
        }

        .citation-number {
          font-family: var(--ff-mono);
          font-size:   28px;
          font-weight: 500;
          color:       var(--accent);
          line-height: 1;
        }

        .citation-text {
          display:        flex;
          flex-direction: column;
          gap:            2px;
        }

        .citation-main {
          font-size:   13px;
          font-weight: 500;
          color:       var(--text);
        }

        .citation-sub {
          font-size: 11px;
          color:     var(--text3);
        }

        /* ── Responsive ───────────────────────────────────── */
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

      `}</style>

      <section className="about section" id="about">
        <div className="container">

          {/* Section header */}
          <p  className="section-label reveal" ref={labelRef}>About</p>
          <h2 className="section-title reveal" ref={titleRef}>
            Researcher. Engineer. Innovator.
          </h2>

          <div className="about-grid">

            {/* ── LEFT column ─────────────────────────────── */}
            <div className="reveal" ref={leftRef}>

              {/* Avatar */}
              <div className="avatar">
                <span className="avatar-initials">
                  {person.initials}
                </span>
              </div>

              {/* Quick info cards */}
              <div className="info-cards">

                <div className="info-card">
                  <span className="info-icon">🎓</span>
                  <div className="info-text">
                    <span className="info-label">Affiliation</span>
                    <span className="info-value">{person.affiliation}</span>
                  </div>
                </div>

                <div className="info-card">
                  <span className="info-icon">🏛️</span>
                  <div className="info-text">
                    <span className="info-label">Department</span>
                    <span className="info-value">{person.department}</span>
                  </div>
                </div>

                <div className="info-card">
                  <span className="info-icon">📧</span>
                  <div className="info-text">
                    <span className="info-label">Email</span>
                    <span className="info-value">{person.email}</span>
                  </div>
                </div>

                <div className="info-card">
                  <span className="info-icon">🔬</span>
                  <div className="info-text">
                    <span className="info-label">Focus</span>
                    <span className="info-value">Machine Learning &amp; Deep Learning</span>
                  </div>
                </div>

                <div className="info-card">
                  <span className="info-icon">📍</span>
                  <div className="info-text">
                    <span className="info-label">Location</span>
                    <span className="info-value">Sahiwal, Punjab, Pakistan</span>
                  </div>
                </div>

              </div>
            </div>

            {/* ── RIGHT column ────────────────────────────── */}
            <div className="reveal" ref={rightRef}>

              <p className="about-bio">
                I am a <strong>Machine Learning Researcher</strong> at{' '}
                <strong>COMSATS University Islamabad, Sahiwal Campus</strong>,
                with a focus on applying deep learning and data-driven approaches
                to solve real-world problems.
              </p>

              <p className="about-bio">
                My research spans <strong>medical image analysis</strong>,
                where I build systems for automated blood cell counting and
                COVID-19 screening, to <strong>cybersecurity</strong>, developing
                ML models for phishing URL detection. I also work on{' '}
                <strong>NLP</strong>, <strong>predictive analytics</strong>, and
                <strong> environmental modeling</strong>.
              </p>

              {/* Research area tags */}
              <div className="about-tags">
                {[
                  'Machine Learning',
                  'Deep Learning',
                  'Computer Vision',
                  'NLP',
                  'Medical AI',
                  'Cybersecurity AI',
                  'Data Science',
                  'Predictive Modeling',
                ].map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              {/* Citation badge */}
              <a
                href={person.scholar}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <div className="citation-badge">
                  <span className="citation-number">158+</span>
                  <div className="citation-text">
                    <span className="citation-main">Google Scholar Citations</span>
                    <span className="citation-sub">View full profile</span>
                  </div>
                </div>
              </a>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}