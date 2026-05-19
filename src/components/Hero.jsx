import { useState, useEffect, useRef } from 'react'
import { person, stats } from '../data/portfolioData'
import { useTypewriter } from '../hooks/useTypewriter'
import { useCounter }    from '../hooks/useCounter'

// ============================================================
// 🎨 Neural Network Canvas
// ============================================================
function NeuralCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let nodes = []

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initNodes()
    }

    const initNodes = () => {
      nodes = []
      const count = Math.floor((canvas.width * canvas.height) / 14000)
      for (let i = 0; i < count; i++) {
        nodes.push({
          x:  Math.random() * canvas.width,
          y:  Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r:  Math.random() * 1.8 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      nodes.forEach(node => {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > canvas.width)  node.vx *= -1
        if (node.y < 0 || node.y > canvas.height)  node.vy *= -1
      })

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 150) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(0,200,255,${(1 - d / 150) * 0.15})`
            ctx.lineWidth   = 0.5
            ctx.stroke()
          }
        }
      }

      nodes.forEach(node => {
        // Outer glow ring
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.r * 3
        )
        gradient.addColorStop(0, `rgba(0,200,255,${node.opacity})`)
        gradient.addColorStop(1, 'rgba(0,200,255,0)')
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,200,255,${node.opacity + 0.2})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
      }}
    />
  )
}

// ============================================================
// 🔢 Stat Counter
// ============================================================
function StatCard({ label, value, suffix, shouldStart }) {
  const count = useCounter(value, 1800, shouldStart)
  return (
    <div className="stat-card">
      <div className="stat-value">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

// ============================================================
// 🦸 Hero
// ============================================================
export default function Hero() {

  const [countersReady, setCountersReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setCountersReady(true), 600)
    return () => clearTimeout(t)
  }, [])

  const typedText = useTypewriter(person.roles, 80, 40, 2200)

  const researchTags = [
    'Machine Learning',
    'Deep Learning',
    'Computer Vision',
    'NLP',
    'Medical AI',
  ]

  return (
    <>
      <style>{`

        /* ── Hero wrapper ─────────────────────────────────── */
        .hero {
          position:        relative;
          min-height:      100vh;
          display:         flex;
          align-items:     center;
          justify-content: center;
          overflow:        hidden;
          padding:         120px 24px 100px;
        }

        /* ── Multi-layer background ───────────────────────── */
        .hero-bg-grid {
          position:    absolute;
          inset:       0;
          background-image:
            linear-gradient(rgba(0,200,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events:  none;
        }

        .hero-bg-radial {
          position:       absolute;
          inset:          0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 40%,
              rgba(0,200,255,0.07) 0%,
              transparent 70%),
            radial-gradient(ellipse 40% 40% at 20% 80%,
              rgba(79,142,255,0.05) 0%,
              transparent 60%),
            radial-gradient(ellipse 40% 40% at 80% 20%,
              rgba(0,229,200,0.04) 0%,
              transparent 60%);
          pointer-events: none;
        }

        /* ── Content wrapper ──────────────────────────────── */
        .hero-content {
          position:   relative;
          z-index:    2;
          width:      100%;
          max-width:  900px;
          text-align: center;
        }

        /* ── Status badge at top ──────────────────────────── */
        .hero-badge {
          display:         inline-flex;
          align-items:     center;
          gap:             8px;
          padding:         7px 16px;
          border-radius:   20px;
          border:          1px solid rgba(0,229,200,0.3);
          background:      rgba(0,229,200,0.06);
          margin-bottom:   28px;
          opacity:         0;
          animation:       fadeInUp 0.6s ease 0.1s forwards;
        }

        .hero-badge-dot {
          width:         6px;
          height:        6px;
          border-radius: 50%;
          background:    var(--accent2);
          animation:     pulseDot 2s ease infinite;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1);   }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }

        .hero-badge-text {
          font-family:    var(--ff-mono);
          font-size:      11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color:          var(--accent2);
        }

        /* ── Name ─────────────────────────────────────────── */
        .hero-name {
          font-family:   var(--ff-display);
          font-size:     clamp(42px, 8vw, 88px);
          font-weight:   600;
          line-height:   1.05;
          color:         var(--text);
          margin-bottom: 6px;
          opacity:       0;
          animation:     fadeInUp 0.7s ease 0.2s forwards;
          letter-spacing: -1px;
        }

        /* Accent highlight on last name */
        .hero-name-accent {
          background:            linear-gradient(
            135deg,
            var(--accent),
            var(--accent2)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip:         text;
        }

        /* ── Typewriter ───────────────────────────────────── */
        .hero-role-wrapper {
          height:          36px;
          display:         flex;
          align-items:     center;
          justify-content: center;
          margin-bottom:   24px;
          opacity:         0;
          animation:       fadeInUp 0.7s ease 0.35s forwards;
        }

        .hero-role {
          font-family:    var(--ff-body);
          font-size:      clamp(16px, 2.5vw, 22px);
          font-weight:    300;
          color:          var(--text2);
          letter-spacing: 0.5px;
        }

        .hero-cursor {
          display:        inline-block;
          width:          2px;
          height:         1.1em;
          background:     var(--accent);
          margin-left:    3px;
          vertical-align: middle;
          animation:      blink 1s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        /* ── Affiliation ──────────────────────────────────── */
        .hero-affiliation {
          display:         flex;
          align-items:     center;
          justify-content: center;
          gap:             8px;
          font-size:       13px;
          color:           var(--text3);
          margin-bottom:   32px;
          letter-spacing:  0.5px;
          opacity:         0;
          animation:       fadeInUp 0.7s ease 0.45s forwards;
        }

        .hero-affiliation-dot {
          width:         3px;
          height:        3px;
          border-radius: 50%;
          background:    var(--text3);
        }

        /* ── Research tags ────────────────────────────────── */
        .hero-tags {
          display:         flex;
          flex-wrap:       wrap;
          gap:             8px;
          justify-content: center;
          margin-bottom:   40px;
          opacity:         0;
          animation:       fadeInUp 0.7s ease 0.5s forwards;
        }

        .hero-tag {
          font-family:    var(--ff-mono);
          font-size:      11px;
          letter-spacing: 0.5px;
          padding:        5px 12px;
          border-radius:  20px;
          border:         1px solid var(--border);
          color:          var(--text3);
          background:     rgba(255,255,255,0.02);
          transition:     all var(--t);
          cursor:         default;
        }

        .hero-tag:hover {
          border-color: var(--border2);
          color:        var(--text2);
          background:   rgba(0,200,255,0.04);
        }

        /* ── CTA buttons ──────────────────────────────────── */
        .hero-buttons {
          display:         flex;
          align-items:     center;
          justify-content: center;
          gap:             12px;
          flex-wrap:       wrap;
          margin-bottom:   64px;
          opacity:         0;
          animation:       fadeInUp 0.7s ease 0.55s forwards;
        }

        /* ── Stats bar ────────────────────────────────────── */
        .hero-stats {
          display:               grid;
          grid-template-columns: repeat(4, 1fr);
          gap:                   1px;
          background:            var(--border);
          border:                1px solid var(--border);
          border-radius:         20px;
          overflow:              hidden;
          opacity:               0;
          animation:             fadeInUp 0.7s ease 0.65s forwards;
          position:              relative;
        }

        /* Top accent line on stats */
        .hero-stats::before {
          content:    '';
          position:   absolute;
          top:        0;
          left:       10%;
          right:      10%;
          height:     1px;
          background: linear-gradient(
            to right,
            transparent,
            var(--accent),
            transparent
          );
        }

        .stat-card {
          background:  var(--card);
          padding:     28px 16px;
          text-align:  center;
          transition:  background var(--t), transform var(--t);
          position:    relative;
          overflow:    hidden;
        }

        .stat-card::after {
          content:    '';
          position:   absolute;
          bottom:     0;
          left:       20%;
          right:      20%;
          height:     1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(0,200,255,0.2),
            transparent
          );
          transform:  scaleX(0);
          transition: transform var(--t);
        }

        .stat-card:hover {
          background: var(--navy3);
          transform:  translateY(-2px);
        }

        .stat-card:hover::after { transform: scaleX(1); }

        .stat-value {
          font-family:   var(--ff-mono);
          font-size:     clamp(28px, 4vw, 42px);
          font-weight:   500;
          color:         var(--accent);
          line-height:   1;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size:      10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color:          var(--text3);
          font-family:    var(--ff-mono);
        }

        /* ── Floating side badges ─────────────────────────── */
        .hero-float-left,
        .hero-float-right {
          position:   absolute;
          top:        50%;
          z-index:    3;
          opacity:    0;
          animation:  fadeInUp 0.7s ease 1s forwards;
        }

        .hero-float-left  { left: 32px;  transform: translateY(-50%); }
        .hero-float-right { right: 32px; transform: translateY(-50%); }

        .float-card {
          padding:        14px 18px;
          background:     var(--card);
          border:         1px solid var(--border);
          border-radius:  14px;
          backdrop-filter: blur(12px);
          display:        flex;
          flex-direction: column;
          gap:            4px;
          animation:      float 4s ease-in-out infinite;
        }

        .hero-float-right .float-card {
          animation-delay: 1s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0);    }
          50%       { transform: translateY(-8px); }
        }

        .float-icon  { font-size: 22px; }
        .float-value {
          font-family: var(--ff-mono);
          font-size:   18px;
          font-weight: 500;
          color:       var(--accent);
          line-height: 1;
        }
        .float-label {
          font-size:      10px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color:          var(--text3);
          font-family:    var(--ff-mono);
        }

        /* ── Scroll indicator ─────────────────────────────── */
        .hero-scroll {
          position:        absolute;
          bottom:          32px;
          left:            50%;
          transform:       translateX(-50%);
          display:         flex;
          flex-direction:  column;
          align-items:     center;
          gap:             8px;
          opacity:         0;
          animation:       fadeInUp 0.7s ease 1.4s forwards;
        }

        .scroll-text {
          font-family:    var(--ff-mono);
          font-size:      9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color:          var(--text3);
        }

        .scroll-line {
          width:      1px;
          height:     48px;
          background: linear-gradient(
            to bottom,
            var(--accent),
            transparent
          );
          animation:  scrollPulse 2s ease infinite;
        }

        @keyframes scrollPulse {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: top; opacity: 0; }
        }

        /* ── Responsive ───────────────────────────────────── */
        @media (max-width: 1024px) {
          .hero-float-left,
          .hero-float-right { display: none; }
        }

        @media (max-width: 640px) {
          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          .hero-buttons {
            flex-direction: column;
            align-items:    stretch;
          }
          .hero-buttons .btn {
            justify-content: center;
          }
          .hero-name { letter-spacing: -0.5px; }
        }

      `}</style>

      <section className="hero" id="hero">

        {/* Grid background */}
        <div className="hero-bg-grid" />

        {/* Radial glow layers */}
        <div className="hero-bg-radial" />

        {/* Neural canvas */}
        <NeuralCanvas />

        {/* Floating side cards — desktop only */}
        <div className="hero-float-left">
          <div className="float-card">
            <span className="float-icon">📊</span>
            <span className="float-value">158+</span>
            <span className="float-label">Citations</span>
          </div>
        </div>

        <div className="hero-float-right">
          <div className="float-card">
            <span className="float-icon">📚</span>
            <span className="float-value">8+</span>
            <span className="float-label">Papers</span>
          </div>
        </div>

        {/* Main content */}
        <div className="hero-content">

          {/* Status badge */}
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span className="hero-badge-text">
              Open to Research Collaborations
            </span>
          </div>

          {/* Name — split for accent effect */}
          <h1 className="hero-name">
            Muhammad Usman{' '}
            <span className="hero-name-accent">Javeed</span>
          </h1>

          {/* Typewriter */}
          <div className="hero-role-wrapper">
            <span className="hero-role">
              {typedText}
              <span className="hero-cursor" aria-hidden="true" />
            </span>
          </div>

          {/* Affiliation */}
          <div className="hero-affiliation">
            <span>{person.department}</span>
            <span className="hero-affiliation-dot" />
            <span>{person.affiliation}</span>
          </div>

          {/* Research area tags */}
          <div className="hero-tags">
            {researchTags.map(tag => (
              <span key={tag} className="hero-tag">{tag}</span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hero-buttons">

            <button
              className="btn btn-primary"
              onClick={() =>
                document
                  .getElementById('publications')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              View Publications
            </button>

            <a
              href={person.scholar}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Google Scholar
            </a>

            <a
              href={`mailto:${person.email}`}
              className="btn btn-outline"
            >
              Contact Me
            </a>

          </div>

          {/* Stats bar */}
          <div className="hero-stats">
            {stats.map(stat => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                shouldStart={countersReady}
              />
            ))}
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll" aria-hidden="true">
          <span className="scroll-text">Scroll</span>
          <div className="scroll-line" />
        </div>

      </section>
    </>
  )
}