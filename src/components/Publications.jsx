import { useState, useRef, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { publications, publicationFilters } from '../data/portfolioData'

// ============================================================
// 🏷️ Filter Bar — tag buttons at the top
// ============================================================
function FilterBar({ active, onChange }) {
  return (
    <div className="filter-bar">
      {publicationFilters.map(filter => (
        <button
          key={filter}
          className={`filter-btn${active === filter ? ' active' : ''}`}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

// ============================================================
// 📄 Single Publication Card
// ============================================================
function PubCard({ pub, index }) {

  // Stagger each card's appearance
  const delay = `${index * 60}ms`

  return (
    <article
      className="pub-card"
      style={{ animationDelay: delay }}
    >
      {/* ── Top row: year badge + tags ─────────────────── */}
      <div className="pub-top">

        <span className="pub-year">{pub.year}</span>

        <div className="pub-tags">
          {pub.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

      </div>

      {/* ── Title ──────────────────────────────────────── */}
      <h3 className="pub-title">{pub.title}</h3>

      {/* ── Journal ────────────────────────────────────── */}
      <p className="pub-journal">{pub.journal}</p>

      {/* ── Authors ────────────────────────────────────── */}
      <p className="pub-authors">{pub.authors}</p>

      {/* ── Bottom action ──────────────────────────────── */}
      <div className="pub-footer">
        <a
          href={pub.url}
          target="_blank"
          rel="noopener noreferrer"
          className="pub-link"
          onClick={e => pub.url === '#' && e.preventDefault()}
        >
          {pub.url === '#' ? 'Coming Soon' : 'View Paper'}
          <span className="pub-link-arrow" aria-hidden="true">→</span>
        </a>

        {/* Accent line grows on hover — same trick as interest cards */}
        <div className="pub-accent-line" aria-hidden="true" />
      </div>

    </article>
  )
}

// ============================================================
// 📚 Publications Section — main export
// ============================================================
export default function Publications() {

  // Which filter is currently active — 'All' by default
  const [activeFilter, setActiveFilter] = useState('All')

  // Are cards currently transitioning (fading out/in)
  const [transitioning, setTransitioning] = useState(false)

  // The list currently being shown on screen
  const [visiblePubs, setVisiblePubs] = useState(publications)

  const labelRef  = useScrollReveal()
  const titleRef  = useScrollReveal()
  const subRef    = useScrollReveal()
  const filterRef = useScrollReveal()

  // ── Handle filter change ─────────────────────────────────
  // We fade cards out → swap data → fade back in
  // This gives a smooth transition instead of instant swap
  const handleFilterChange = (filter) => {
    if (filter === activeFilter) return  // already selected

    // Step 1 — start fade out
    setTransitioning(true)

    setTimeout(() => {
      // Step 2 — swap the data while cards are invisible
      setActiveFilter(filter)

      if (filter === 'All') {
        setVisiblePubs(publications)
      } else {
        setVisiblePubs(
          publications.filter(pub => pub.tags.includes(filter))
        )
      }

      // Step 3 — fade back in
      setTransitioning(false)
    }, 250) // 250ms = fade out duration in CSS
  }

  // ── Count per filter (shows number on each button) ───────
  const getCount = (filter) => {
    if (filter === 'All') return publications.length
    return publications.filter(p => p.tags.includes(filter)).length
  }

  return (
    <>
      <style>{`

        .publications {
          padding: 100px 0;
          position: relative;
        }

        /* ── Section header row ───────────────────────────── */
        .pub-header {
          display:         flex;
          align-items:     flex-end;
          justify-content: space-between;
          flex-wrap:       wrap;
          gap:             24px;
          margin-bottom:   48px;
        }

        .pub-header-left { flex: 1; }

        /* Total count badge */
        .pub-count-badge {
          font-family:    var(--ff-mono);
          font-size:      12px;
          letter-spacing: 1px;
          color:          var(--text3);
          padding:        6px 14px;
          border:         1px solid var(--border);
          border-radius:  20px;
          white-space:    nowrap;
          align-self:     center;
        }

        .pub-count-badge span {
          color: var(--accent);
        }

        /* ── Filter bar ───────────────────────────────────── */
        .filter-bar {
          display:   flex;
          flex-wrap: wrap;
          gap:       8px;
          margin-bottom: 40px;
        }

        .filter-btn {
          font-family:    var(--ff-mono);
          font-size:      11px;
          letter-spacing: 1px;
          padding:        7px 16px;
          border-radius:  20px;
          border:         1px solid var(--border);
          background:     transparent;
          color:          var(--text3);
          cursor:         pointer;
          transition:     all var(--t);
          white-space:    nowrap;
        }

        .filter-btn:hover {
          border-color: var(--border2);
          color:        var(--text2);
          background:   rgba(0,200,255,0.04);
        }

        /* Active filter button */
        .filter-btn.active {
          background:   rgba(0, 200, 255, 0.12);
          border-color: var(--accent);
          color:        var(--accent);
        }

        /* ── Cards grid ───────────────────────────────────── */
        .pub-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap:     20px;

          /* Fade controlled by transitioning state */
          transition: opacity 0.25s ease;
        }

        .pub-grid.fading {
          opacity: 0;
        }

        /* ── Single pub card ──────────────────────────────── */
        .pub-card {
          position:       relative;
          padding:        28px;
          background:     var(--card);
          border:         1px solid var(--border);
          border-radius:  16px;
          display:        flex;
          flex-direction: column;
          gap:            12px;
          overflow:       hidden;
          transition:     border-color var(--t), transform var(--t), background var(--t);

          /* Stagger fade-in when filter changes */
          opacity:   0;
          animation: pubFadeIn 0.4s ease forwards;
        }

        @keyframes pubFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        .pub-card:hover {
          border-color: var(--border2);
          background:   var(--navy3);
          transform:    translateY(-3px);
        }

        /* ── Top row ──────────────────────────────────────── */
        .pub-top {
          display:     flex;
          align-items: center;
          flex-wrap:   wrap;
          gap:         10px;
        }

        /* Year badge */
        .pub-year {
          font-family:    var(--ff-mono);
          font-size:      11px;
          letter-spacing: 1px;
          color:          var(--navy);
          background:     var(--accent);
          padding:        3px 10px;
          border-radius:  20px;
          font-weight:    500;
          flex-shrink:    0;
        }

        .pub-tags {
          display:   flex;
          flex-wrap: wrap;
          gap:       6px;
        }

        /* ── Title ────────────────────────────────────────── */
        .pub-title {
          font-family:  var(--ff-display);
          font-size:    18px;
          font-weight:  600;
          color:        var(--text);
          line-height:  1.35;
          transition:   color var(--t);
        }

        .pub-card:hover .pub-title {
          color: var(--accent);
        }

        /* ── Journal ──────────────────────────────────────── */
        .pub-journal {
          font-size:   13px;
          font-style:  italic;
          color:       var(--accent2);
          line-height: 1.5;
        }

        /* ── Authors ──────────────────────────────────────── */
        .pub-authors {
          font-size:   12px;
          color:       var(--text3);
          line-height: 1.6;

          /* Show max 2 lines then ellipsis */
          display:            -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow:           hidden;
        }

        /* ── Footer ───────────────────────────────────────── */
        .pub-footer {
          margin-top:  auto;   /* push to bottom of card */
          padding-top: 12px;
          border-top:  1px solid var(--border);
          position:    relative;
        }

        /* View paper link */
        .pub-link {
          display:         inline-flex;
          align-items:     center;
          gap:             6px;
          font-family:     var(--ff-mono);
          font-size:       12px;
          letter-spacing:  1px;
          color:           var(--text3);
          text-decoration: none;
          transition:      color var(--t), gap var(--t);
        }

        .pub-link:hover {
          color: var(--accent);
          gap:   10px;   /* arrow moves right on hover */
        }

        .pub-link-arrow {
          transition: transform var(--t);
        }

        .pub-link:hover .pub-link-arrow {
          transform: translateX(3px);
        }

        /* Bottom accent line */
        .pub-accent-line {
          position:         absolute;
          bottom:           0;
          left:             0;
          right:            0;
          height:           2px;
          background:       linear-gradient(
            to right,
            var(--accent),
            var(--accent2)
          );
          transform:        scaleX(0);
          transform-origin: left;
          transition:       transform 0.35s ease;
        }

        .pub-card:hover .pub-accent-line {
          transform: scaleX(1);
        }

        /* ── Empty state ──────────────────────────────────── */
        .pub-empty {
          grid-column:     1 / -1;   /* span full width */
          text-align:      center;
          padding:         60px 20px;
          color:           var(--text3);
          font-family:     var(--ff-mono);
          font-size:       13px;
          letter-spacing:  1px;
        }

        /* ── Scholar link below grid ──────────────────────── */
        .pub-scholar-row {
          margin-top:      40px;
          text-align:      center;
        }

        .pub-scholar-link {
          display:         inline-flex;
          align-items:     center;
          gap:             8px;
          font-family:     var(--ff-mono);
          font-size:       12px;
          letter-spacing:  1px;
          color:           var(--text3);
          text-decoration: none;
          padding:         10px 24px;
          border:          1px solid var(--border);
          border-radius:   8px;
          transition:      all var(--t);
        }

        .pub-scholar-link:hover {
          color:        var(--accent);
          border-color: var(--border2);
          background:   rgba(0,200,255,0.04);
        }

        /* ── Responsive ───────────────────────────────────── */
        @media (max-width: 768px) {
          .pub-grid {
            grid-template-columns: 1fr;
          }
          .pub-header {
            flex-direction: column;
            align-items:    flex-start;
          }
        }

      `}</style>

      <section className="publications section" id="publications">
        <div className="container">

          {/* ── Section header ────────────────────────────── */}
          <div className="pub-header">
            <div className="pub-header-left">
              <p  className="section-label reveal" ref={labelRef}>
                Published Work
              </p>
              <h2 className="section-title reveal" ref={titleRef}>
                Publications
              </h2>
              <p  className="section-sub reveal"   ref={subRef}
                style={{ marginBottom: 0 }}>
                Peer-reviewed research across machine learning,
                deep learning, and applied AI domains.
              </p>
            </div>

            {/* Live count badge — updates as filter changes */}
            <div className="pub-count-badge">
              Showing <span>{visiblePubs.length}</span> of {publications.length}
            </div>
          </div>

          {/* ── Filter buttons ────────────────────────────── */}
          <div className="reveal" ref={filterRef}>
            <FilterBar
              active={activeFilter}
              onChange={handleFilterChange}
            />
          </div>

          {/* ── Publication cards ─────────────────────────── */}
          <div className={`pub-grid${transitioning ? ' fading' : ''}`}>

            {visiblePubs.length > 0 ? (
              visiblePubs.map((pub, index) => (
                <PubCard
                  key={pub.id}
                  pub={pub}
                  index={index}
                />
              ))
            ) : (
              <div className="pub-empty">
                No publications found for this filter.
              </div>
            )}

          </div>

          {/* ── Google Scholar link ────────────────────────── */}
          <div className="pub-scholar-row">
            <a
              href="https://scholar.google.com/citations?user=j8SPSQEAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="pub-scholar-link"
            >
              View all on Google Scholar
              <span aria-hidden="true">→</span>
            </a>
          </div>

        </div>
      </section>
    </>
  )
}