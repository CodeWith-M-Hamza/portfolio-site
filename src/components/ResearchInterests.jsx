import { useScrollReveal } from '../hooks/useScrollReveal'
import { interests } from '../data/portfolioData'

// Single interest card
function InterestCard({ icon, title, desc, index }) {

  // Stagger delay based on card position
  // Card 0 = 0ms, Card 1 = 80ms, Card 2 = 160ms ...
  const delay = `${index * 80}ms`

  return (
    <div
      className="interest-card"
      style={{ animationDelay: delay }}
    >
      <div className="interest-icon">{icon}</div>
      <h3 className="interest-title">{title}</h3>
      <p  className="interest-desc">{desc}</p>

      {/* Hover reveal line at bottom */}
      <div className="interest-line" aria-hidden="true" />
    </div>
  )
}

export default function ResearchInterests() {

  const labelRef = useScrollReveal()
  const titleRef = useScrollReveal()
  const subRef   = useScrollReveal()
  const gridRef  = useScrollReveal()

  return (
    <>
      <style>{`

        .research {
          padding: 100px 0;
          position: relative;
        }

        /* ── Cards grid ───────────────────────────────────── */
        .interests-grid {
          display:               grid;
          grid-template-columns: repeat(4, 1fr);
          gap:                   16px;
        }

        /* ── Single card ──────────────────────────────────── */
        .interest-card {
          position:       relative;
          padding:        28px 24px 32px;
          background:     var(--card);
          border:         1px solid var(--border);
          border-radius:  16px;
          overflow:       hidden;
          cursor:         default;
          transition:     border-color var(--t),
                          transform var(--t),
                          background var(--t);

          /* Cards fade in when grid scrolls into view */
          opacity:   0;
          transform: translateY(20px);
          animation: none;
        }

        /* This class is added by JS when grid is visible */
        .interests-grid.visible .interest-card {
          animation: cardFadeUp 0.5s ease forwards;
        }

        @keyframes cardFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        .interest-card:hover {
          border-color: var(--border2);
          background:   var(--navy3);
          transform:    translateY(-4px);
        }

        /* ── Icon ─────────────────────────────────────────── */
        .interest-icon {
          font-size:     32px;
          line-height:   1;
          margin-bottom: 16px;

          /* Float effect on hover */
          display:    inline-block;
          transition: transform 0.4s ease;
        }

        .interest-card:hover .interest-icon {
          transform: scale(1.15) translateY(-2px);
        }

        /* ── Title ────────────────────────────────────────── */
        .interest-title {
          font-family:   var(--ff-display);
          font-size:     18px;
          font-weight:   600;
          color:         var(--text);
          margin-bottom: 10px;
          line-height:   1.2;
        }

        /* ── Description ──────────────────────────────────── */
        .interest-desc {
          font-size:   13px;
          color:       var(--text3);
          line-height: 1.7;
          transition:  color var(--t);
        }

        .interest-card:hover .interest-desc {
          color: var(--text2);
        }

        /* ── Bottom accent line (grows on hover) ──────────── */
        .interest-line {
          position:   absolute;
          bottom:     0;
          left:       0;
          right:      0;
          height:     2px;
          background: linear-gradient(
            to right,
            var(--accent),
            var(--accent2)
          );
          transform:        scaleX(0);
          transform-origin: left;
          transition:       transform 0.35s ease;
        }

        .interest-card:hover .interest-line {
          transform: scaleX(1);
        }

        /* ── Responsive ───────────────────────────────────── */
        @media (max-width: 1024px) {
          .interests-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .interests-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .interests-grid {
            grid-template-columns: 1fr;
          }
        }

      `}</style>

      <section className="research section" id="research">
        <div className="container">

          {/* Section header */}
          <p  className="section-label reveal" ref={labelRef}>Focus Areas</p>
          <h2 className="section-title reveal" ref={titleRef}>
            Research Interests
          </h2>
          <p  className="section-sub reveal"   ref={subRef}>
            Exploring the intersection of machine learning, deep learning,
            and real-world applications across multiple domains.
          </p>

          {/* Cards grid — ref triggers .visible which starts animations */}
          <div
            className="interests-grid reveal"
            ref={gridRef}
          >
            {interests.map((item, index) => (
              <InterestCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                desc={item.desc}
                index={index}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  )
}