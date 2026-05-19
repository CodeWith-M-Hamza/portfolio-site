import { useScrollReveal } from '../hooks/useScrollReveal'
import { scholarStats, publications } from '../data/portfolioData'

export default function ScholarStats() {

  const labelRef = useScrollReveal()
  const titleRef = useScrollReveal()
  const subRef   = useScrollReveal()
  const cardRef  = useScrollReveal()
  const barRef   = useScrollReveal()

  // Count publications per year for the bar chart
  // { 2025: 8 }
  const yearCounts = publications.reduce((acc, pub) => {
    acc[pub.year] = (acc[pub.year] || 0) + 1
    return acc
  }, {})

  // Get max count — used to calculate bar heights
  const maxCount = Math.max(...Object.values(yearCounts))

  return (
    <>
      <style>{`

        .scholar {
          padding: 100px 0;
        }

        /* ── Main grid: stats left, chart right ───────────── */
        .scholar-grid {
          display:               grid;
          grid-template-columns: 1fr 1.2fr;
          gap:                   48px;
          align-items:           start;
        }

        /* ── Stat cards ───────────────────────────────────── */
        .scholar-cards {
          display:        flex;
          flex-direction: column;
          gap:            16px;
        }

        .scholar-card {
          display:       flex;
          align-items:   center;
          gap:           20px;
          padding:       20px 24px;
          background:    var(--card);
          border:        1px solid var(--border);
          border-radius: 14px;
          transition:    border-color var(--t), transform var(--t);
        }

        .scholar-card:hover {
          border-color: var(--border2);
          transform:    translateX(4px);
        }

        .scholar-card-icon {
          font-size:       28px;
          line-height:     1;
          width:           52px;
          height:          52px;
          border-radius:   12px;
          background:      rgba(0,200,255,0.08);
          border:          1px solid var(--border2);
          display:         flex;
          align-items:     center;
          justify-content: center;
          flex-shrink:     0;
          transition:      background var(--t);
        }

        .scholar-card:hover .scholar-card-icon {
          background: rgba(0,200,255,0.14);
        }

        .scholar-card-body {
          display:        flex;
          flex-direction: column;
          gap:            3px;
        }

        .scholar-card-value {
          font-family: var(--ff-mono);
          font-size:   28px;
          font-weight: 500;
          color:       var(--accent);
          line-height: 1;
        }

        .scholar-card-label {
          font-size:      12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color:          var(--text3);
          font-family:    var(--ff-mono);
        }

        .scholar-card-sub {
          font-size:   12px;
          color:       var(--text3);
          margin-top:  2px;
        }

        /* View profile link inside card */
        .scholar-card-link {
          margin-left:     auto;
          font-family:     var(--ff-mono);
          font-size:       11px;
          letter-spacing:  1px;
          color:           var(--accent);
          text-decoration: none;
          padding:         6px 14px;
          border:          1px solid var(--border2);
          border-radius:   6px;
          white-space:     nowrap;
          transition:      all var(--t);
          flex-shrink:     0;
        }

        .scholar-card-link:hover {
          background: rgba(0,200,255,0.08);
        }

        /* ── Bar chart ────────────────────────────────────── */
        .scholar-chart {
          padding:       28px;
          background:    var(--card);
          border:        1px solid var(--border);
          border-radius: 16px;
        }

        .chart-title {
          font-family:   var(--ff-mono);
          font-size:     11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color:         var(--text3);
          margin-bottom: 32px;
        }

        .chart-bars {
          display:     flex;
          align-items: flex-end;
          gap:         16px;
          height:      160px;
        }

        .chart-bar-group {
          display:        flex;
          flex-direction: column;
          align-items:    center;
          gap:            8px;
          flex:           1;
        }

        .chart-bar-count {
          font-family: var(--ff-mono);
          font-size:   13px;
          font-weight: 500;
          color:       var(--accent);
        }

        .chart-bar-wrap {
          width:         100%;
          display:       flex;
          align-items:   flex-end;
          justify-content: center;
          flex:          1;
        }

        .chart-bar {
          width:         100%;
          border-radius: 4px 4px 0 0;
          background:    linear-gradient(
            to top,
            var(--accent3),
            var(--accent)
          );
          transition:    height 1s cubic-bezier(0.4,0,0.2,1);

          /* Start at 0 height */
          height: 0%;
        }

        /* When parent is .visible → bars grow */
        .scholar-chart.visible .chart-bar {
          /* height set inline via style prop */
        }

        .chart-bar-year {
          font-family:    var(--ff-mono);
          font-size:      11px;
          letter-spacing: 1px;
          color:          var(--text3);
        }

        /* ── Responsive ───────────────────────────────────── */
        @media (max-width: 768px) {
          .scholar-grid {
            grid-template-columns: 1fr;
          }
        }

      `}</style>

      <section className="scholar section" id="scholar">
        <div className="container">

          <p  className="section-label reveal" ref={labelRef}>
            Impact
          </p>
          <h2 className="section-title reveal" ref={titleRef}>
            Research Impact
          </h2>
          <p  className="section-sub reveal"   ref={subRef}>
            Citation metrics and publication output
            tracked via Google Scholar.
          </p>

          <div className="scholar-grid">

            {/* ── Left: stat cards ──────────────────────── */}
            <div className="scholar-cards reveal" ref={cardRef}>

              {/* Citations */}
              <div className="scholar-card">
                <div className="scholar-card-icon">📊</div>
                <div className="scholar-card-body">
                  <span className="scholar-card-value">
                    {scholarStats.citations}+
                  </span>
                  <span className="scholar-card-label">
                    Total Citations
                  </span>
                  <span className="scholar-card-sub">
                    Since {scholarStats.since}
                  </span>
                </div>

                <a
                  href={scholarStats.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="scholar-card-link"
                >
                  View Profile
                </a>
              </div>

              {/* h-index */}
              <div className="scholar-card">
                <div className="scholar-card-icon">📈</div>
                <div className="scholar-card-body">
                  <span className="scholar-card-value">
                    {scholarStats.hIndex}
                  </span>
                  <span className="scholar-card-label">
                    h-index
                  </span>
                  <span className="scholar-card-sub">
                    Update in portfolioData.js
                  </span>
                </div>
              </div>

              {/* i10-index */}
              <div className="scholar-card">
                <div className="scholar-card-icon">📚</div>
                <div className="scholar-card-body">
                  <span className="scholar-card-value">
                    {scholarStats.i10Index}
                  </span>
                  <span className="scholar-card-label">
                    i10-index
                  </span>
                  <span className="scholar-card-sub">
                    Update in portfolioData.js
                  </span>
                </div>
              </div>

              {/* Publications count */}
              <div className="scholar-card">
                <div className="scholar-card-icon">🔬</div>
                <div className="scholar-card-body">
                  <span className="scholar-card-value">
                    {publications.length}+
                  </span>
                  <span className="scholar-card-label">
                    Publications
                  </span>
                  <span className="scholar-card-sub">
                    All in 2025
                  </span>
                </div>
              </div>

            </div>

            {/* ── Right: bar chart ──────────────────────── */}
            <div className="scholar-chart reveal" ref={barRef}>

              <p className="chart-title">Publications by Year</p>

              <div className="chart-bars">
                {Object.entries(yearCounts).map(([year, count]) => {

                  // Height as percentage of tallest bar
                  const heightPct = (count / maxCount) * 100

                  return (
                    <div key={year} className="chart-bar-group">

                      <span className="chart-bar-count">{count}</span>

                      <div className="chart-bar-wrap">
                        <div
                          className="chart-bar"
                          style={{ height: `${heightPct}%` }}
                        />
                      </div>

                      <span className="chart-bar-year">{year}</span>

                    </div>
                  )
                })}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}