// variant = 'line' | 'dots' | 'glow'
export default function SectionDivider({ variant = 'line' }) {
  return (
    <>
      <style>{`
        .divider {
          display:         flex;
          align-items:     center;
          justify-content: center;
          padding:         0 24px;
          overflow:        hidden;
        }

        /* ── Line variant ─────────────────────────────────── */
        .divider-line {
          width:      100%;
          max-width:  1160px;
          height:     1px;
          background: linear-gradient(
            to right,
            transparent,
            var(--border2),
            transparent
          );
        }

        /* ── Dots variant ─────────────────────────────────── */
        .divider-dots {
          display:     flex;
          align-items: center;
          gap:         8px;
        }

        .divider-dot {
          width:         4px;
          height:        4px;
          border-radius: 50%;
          background:    var(--border2);
        }

        .divider-dot:nth-child(2) {
          width:      6px;
          height:     6px;
          background: var(--accent);
          opacity:    0.5;
        }

        .divider-dot-line {
          width:      60px;
          height:     1px;
          background: linear-gradient(
            to right,
            transparent,
            var(--border2)
          );
        }

        .divider-dot-line.right {
          background: linear-gradient(
            to left,
            transparent,
            var(--border2)
          );
        }

        /* ── Glow variant ─────────────────────────────────── */
        .divider-glow {
          position:   relative;
          width:      100%;
          max-width:  1160px;
          height:     1px;
          background: linear-gradient(
            to right,
            transparent,
            var(--accent),
            transparent
          );
          opacity: 0.3;
        }

        /* Glowing center point */
        .divider-glow::after {
          content:       '';
          position:      absolute;
          top:           50%;
          left:          50%;
          transform:     translate(-50%, -50%);
          width:         6px;
          height:        6px;
          border-radius: 50%;
          background:    var(--accent);
          box-shadow:    0 0 10px var(--accent),
                         0 0 20px rgba(0,200,255,0.4);
        }
      `}</style>

      <div className="divider">

        {variant === 'line' && (
          <div className="divider-line" />
        )}

        {variant === 'dots' && (
          <div className="divider-dots">
            <div className="divider-dot-line" />
            <div className="divider-dot" />
            <div className="divider-dot" />
            <div className="divider-dot" />
            <div className="divider-dot-line right" />
          </div>
        )}

        {variant === 'glow' && (
          <div className="divider-glow" />
        )}

      </div>
    </>
  )
}