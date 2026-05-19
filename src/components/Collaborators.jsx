import { useScrollReveal } from '../hooks/useScrollReveal'
import { collaborators } from '../data/portfolioData'

// ============================================================
// 👤 Single Collaborator Card
// ============================================================
function CollabCard({ collab, index }) {

  // Get initials from name — "Dr. Muhammad Farhan" → "MF"
  const initials = collab.name
    .replace(/^Dr\.\s*|^Prof\.\s*/i, '')  // remove Dr. / Prof. prefix
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')

  const delay = `${index * 70}ms`

  return (
    <div
      className="collab-card"
      style={{ animationDelay: delay }}
    >

      {/* Avatar with initials */}
      <div className="collab-avatar">
        <span className="collab-initials">{initials}</span>

        {/* Country flag badge */}
        <span className="collab-flag" title={collab.country}>
          {collab.flag}
        </span>
      </div>

      {/* Name */}
      <h3 className="collab-name">{collab.name}</h3>

      {/* Institution */}
      <p className="collab-institution">{collab.institution}</p>

      {/* Country */}
      <span className="collab-country">{collab.country}</span>

    </div>
  )
}

// ============================================================
// 🌍 Collaborators Section — main export
// ============================================================
export default function Collaborators() {

  const labelRef = useScrollReveal()
  const titleRef = useScrollReveal()
  const subRef   = useScrollReveal()
  const gridRef  = useScrollReveal()

  // Count unique countries from collaborators
  const countries = [...new Set(collaborators.map(c => c.country))]

  return (
    <>
      <style>{`

        .collaborators {
          padding: 100px 0;
        }

        /* ── Stats bar above cards ────────────────────────── */
        .collab-stats {
          display:     flex;
          align-items: center;
          gap:         32px;
          margin-bottom: 48px;
          flex-wrap:   wrap;
        }

        .collab-stat {
          display:     flex;
          align-items: center;
          gap:         10px;
        }

        .collab-stat-value {
          font-family: var(--ff-mono);
          font-size:   24px;
          font-weight: 500;
          color:       var(--accent);
          line-height: 1;
        }

        .collab-stat-label {
          font-size:      12px;
          letter-spacing: 1px;
          color:          var(--text3);
          text-transform: uppercase;
          font-family:    var(--ff-mono);
        }

        .collab-stat-divider {
          width:      1px;
          height:     32px;
          background: var(--border2);
        }

        /* ── Cards grid ───────────────────────────────────── */
        .collab-grid {
          display:               grid;
          grid-template-columns: repeat(4, 1fr);
          gap:                   16px;
        }

        /* Animate when grid scrolls into view */
        .collab-grid.visible .collab-card {
          animation: collabFadeIn 0.5s ease forwards;
        }

        @keyframes collabFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* ── Single card ──────────────────────────────────── */
        .collab-card {
          padding:        24px 20px;
          background:     var(--card);
          border:         1px solid var(--border);
          border-radius:  16px;
          text-align:     center;
          display:        flex;
          flex-direction: column;
          align-items:    center;
          gap:            10px;
          transition:     border-color var(--t),
                          transform var(--t),
                          background var(--t);

          /* Starts invisible — animated by parent .visible */
          opacity:   0;
          animation: none;
        }

        .collab-card:hover {
          border-color: var(--border2);
          background:   var(--navy3);
          transform:    translateY(-4px);
        }

        /* ── Avatar circle ────────────────────────────────── */
        .collab-avatar {
          position:        relative;
          width:           64px;
          height:          64px;
          border-radius:   50%;
          background:      var(--navy3);
          border:          1px solid var(--border2);
          display:         flex;
          align-items:     center;
          justify-content: center;
          margin-bottom:   4px;
          transition:      border-color var(--t), transform var(--t);
          flex-shrink:     0;
        }

        .collab-card:hover .collab-avatar {
          border-color: var(--accent);
          transform:    scale(1.05);
        }

        .collab-initials {
          font-family: var(--ff-display);
          font-size:   20px;
          font-weight: 600;
          color:       var(--accent);
          line-height: 1;
        }

        /* Country flag — bottom right of avatar */
        .collab-flag {
          position:    absolute;
          bottom:      -2px;
          right:       -2px;
          font-size:   16px;
          line-height: 1;
          background:  var(--navy2);
          border:      1px solid var(--border);
          border-radius: 50%;
          width:       24px;
          height:      24px;
          display:     flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Text ─────────────────────────────────────────── */
        .collab-name {
          font-family:  var(--ff-display);
          font-size:    15px;
          font-weight:  600;
          color:        var(--text);
          line-height:  1.3;
          transition:   color var(--t);
        }

        .collab-card:hover .collab-name {
          color: var(--accent);
        }

        .collab-institution {
          font-size:   12px;
          color:       var(--text3);
          line-height: 1.5;
          text-align:  center;
          transition:  color var(--t);
        }

        .collab-card:hover .collab-institution {
          color: var(--text2);
        }

        .collab-country {
          font-family:    var(--ff-mono);
          font-size:      10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color:          var(--accent2);
          margin-top:     auto;
        }

        /* ── World map hint at bottom ─────────────────────── */
        .collab-footer {
          margin-top:  48px;
          padding:     24px 28px;
          background:  var(--card);
          border:      1px solid var(--border);
          border-radius: 16px;
          display:     flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap:   wrap;
          gap:         16px;
        }

        .collab-footer-text {
          font-size:   14px;
          color:       var(--text3);
          line-height: 1.6;
          max-width:   480px;
        }

        .collab-footer-text strong {
          color:       var(--text2);
          font-weight: 500;
        }

        /* Country flag row */
        .collab-flags {
          display:     flex;
          align-items: center;
          gap:         8px;
          flex-wrap:   wrap;
        }

        .collab-flag-item {
          font-size:   22px;
          line-height: 1;
          title:       attr(title);
        }

        /* ── Responsive ───────────────────────────────────── */
        @media (max-width: 1024px) {
          .collab-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .collab-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .collab-grid {
            grid-template-columns: 1fr;
          }
        }

      `}</style>

      <section className="collaborators section" id="collaborators">
        <div className="container">

          {/* Section header */}
          <p  className="section-label reveal" ref={labelRef}>
            Global Network
          </p>
          <h2 className="section-title reveal" ref={titleRef}>
            Collaborators
          </h2>
          <p  className="section-sub reveal"   ref={subRef}>
            Actively collaborating with researchers across
            universities in Asia, Europe, and beyond.
          </p>

          {/* Quick stats */}
          <div className="collab-stats">
            <div className="collab-stat">
              <span className="collab-stat-value">
                {collaborators.length}
              </span>
              <span className="collab-stat-label">Collaborators</span>
            </div>

            <div className="collab-stat-divider" />

            <div className="collab-stat">
              <span className="collab-stat-value">
                {countries.length}
              </span>
              <span className="collab-stat-label">Countries</span>
            </div>

            <div className="collab-stat-divider" />

            <div className="collab-stat">
              <span className="collab-stat-value">
                {collaborators.length + 1}
              </span>
              <span className="collab-stat-label">Institutions</span>
            </div>
          </div>

          {/* Collaborator cards */}
          <div
            className="collab-grid reveal"
            ref={gridRef}
          >
            {collaborators.map((collab, index) => (
              <CollabCard
                key={collab.name}
                collab={collab}
                index={index}
              />
            ))}
          </div>

          {/* Footer info bar */}
          <div className="collab-footer">
            <p className="collab-footer-text">
              Research network spanning{' '}
              <strong>{countries.length} countries</strong> across
              Asia and beyond — actively seeking new
              collaborations in ML and AI research.
            </p>

            {/* Country flags */}
            <div className="collab-flags">
              {collaborators.map(c => (
                <span
                  key={c.country + c.name}
                  className="collab-flag-item"
                  title={c.country}
                >
                  {c.flag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}