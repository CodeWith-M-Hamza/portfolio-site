import { useState, useEffect, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { skills } from '../data/portfolioData'

// ============================================================
// 📊 Single Skill Row with animated progress bar
// ============================================================
function SkillBar({ skill, animate }) {

  // bar fills from 0 to skill.level when animate = true
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!animate) return

    // Small delay so bars dont all fire at same time
    const timer = setTimeout(() => {
      setWidth(skill.level)
    }, 100)

    return () => clearTimeout(timer)
  }, [animate, skill.level])

  return (
    <div className="skill-row">

      {/* Name + percentage on same line */}
      <div className="skill-header">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-percent">{skill.level}%</span>
      </div>

      {/* Track (background) + Fill (animated) */}
      <div className="skill-track" role="progressbar"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={skill.name}
      >
        <div
          className="skill-fill"
          style={{ width: `${width}%` }}
        />

        {/* Glowing dot at the tip of the bar */}
        <div
          className="skill-tip"
          style={{ left: `${width}%` }}
        />
      </div>

    </div>
  )
}

// ============================================================
// 💪 Skills Section — main export
// ============================================================
export default function Skills() {

  // Controls when bars start animating
  const [animate, setAnimate] = useState(false)

  const labelRef    = useScrollReveal()
  const titleRef    = useScrollReveal()
  const subRef      = useScrollReveal()

  // This ref watches the section — triggers bar animation
  const sectionRef  = useRef(null)

  // Get unique categories from skills data
  // ['Programming', 'ML Frameworks', 'Deep Learning', 'Data Science']
  const categories = [...new Set(skills.map(s => s.category))]

  // ── Start animating bars when section enters view ────────
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`

        .skills {
          padding: 100px 0;
        }

        /* ── Two column grid — categories side by side ────── */
        .skills-grid {
          display:               grid;
          grid-template-columns: repeat(2, 1fr);
          gap:                   48px 64px;
        }

        /* ── Category block ───────────────────────────────── */
        .skill-category {
          display:        flex;
          flex-direction: column;
          gap:            20px;
        }

        /* Category label */
        .category-label {
          font-family:    var(--ff-mono);
          font-size:      11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color:          var(--accent2);
          padding-bottom: 12px;
          border-bottom:  1px solid var(--border);
        }

        /* ── Single skill row ─────────────────────────────── */
        .skill-row {
          display:        flex;
          flex-direction: column;
          gap:            8px;
        }

        .skill-header {
          display:         flex;
          justify-content: space-between;
          align-items:     center;
        }

        .skill-name {
          font-size:   14px;
          font-weight: 400;
          color:       var(--text2);
          transition:  color var(--t);
        }

        .skill-row:hover .skill-name {
          color: var(--text);
        }

        .skill-percent {
          font-family:    var(--ff-mono);
          font-size:      12px;
          letter-spacing: 1px;
          color:          var(--accent);
        }

        /* ── Progress track ───────────────────────────────── */
        .skill-track {
          position:      relative;
          height:        4px;
          background:    rgba(0, 200, 255, 0.08);
          border-radius: 2px;
          overflow:      visible;
        }

        /* ── Animated fill bar ────────────────────────────── */
        .skill-fill {
          height:        100%;
          border-radius: 2px;
          background:    linear-gradient(
            to right,
            var(--accent3),
            var(--accent)
          );
          width:         0%;       /* starts at 0 */
          transition:    width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          position:      relative;
        }

        /* ── Glowing dot at bar tip ───────────────────────── */
        .skill-tip {
          position:      absolute;
          top:           50%;
          transform:     translate(-50%, -50%);
          width:         8px;
          height:        8px;
          border-radius: 50%;
          background:    var(--accent);
          transition:    left 1.2s cubic-bezier(0.4, 0, 0.2, 1);

          /* Pulse glow */
          box-shadow: 0 0 6px var(--accent),
                      0 0 12px rgba(0,200,255,0.4);
        }

        /* ── Summary stats at bottom ──────────────────────── */
        .skills-summary {
          margin-top:            56px;
          display:               grid;
          grid-template-columns: repeat(4, 1fr);
          gap:                   1px;
          background:            var(--border);
          border:                1px solid var(--border);
          border-radius:         16px;
          overflow:              hidden;
        }

        .summary-card {
          background:      var(--card);
          padding:         24px 20px;
          text-align:      center;
          transition:      background var(--t);
        }

        .summary-card:hover {
          background: var(--navy3);
        }

        .summary-value {
          font-family:   var(--ff-mono);
          font-size:     28px;
          font-weight:   500;
          color:         var(--accent);
          line-height:   1;
          margin-bottom: 8px;
        }

        .summary-label {
          font-size:      11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color:          var(--text3);
        }

        /* ── Responsive ───────────────────────────────────── */
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .skills-summary {
            grid-template-columns: repeat(2, 1fr);
          }
        }

      `}</style>

      <section
        className="skills section"
        id="skills"
        ref={sectionRef}
      >
        <div className="container">

          {/* Section header */}
          <p  className="section-label reveal" ref={labelRef}>
            Expertise
          </p>
          <h2 className="section-title reveal" ref={titleRef}>
            Technical Skills
          </h2>
          <p  className="section-sub reveal"   ref={subRef}>
            Tools and frameworks used across research
            and production AI systems.
          </p>

          {/* Skills grid grouped by category */}
          <div className="skills-grid">
            {categories.map(category => (
              <div key={category} className="skill-category">

                {/* Category heading */}
                <span className="category-label">{category}</span>

                {/* Skills that belong to this category */}
                {skills
                  .filter(s => s.category === category)
                  .map(skill => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      animate={animate}
                    />
                  ))
                }

              </div>
            ))}
          </div>

          {/* Summary stats at the bottom */}
          <div className="skills-summary">

            <div className="summary-card">
              <div className="summary-value">8+</div>
              <div className="summary-label">Tools</div>
            </div>

            <div className="summary-card">
              <div className="summary-value">4</div>
              <div className="summary-label">Categories</div>
            </div>

            <div className="summary-card">
              <div className="summary-value">3+</div>
              <div className="summary-label">Years</div>
            </div>

            <div className="summary-card">
              <div className="summary-value">8+</div>
              <div className="summary-label">Publications</div>
            </div>

          </div>

        </div>
      </section>
    </>
  )
}