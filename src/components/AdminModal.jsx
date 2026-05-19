import { useState, useEffect } from 'react'
import { login, checkLockout } from '../admin/useAdminData'

export default function AdminModal({ onClose }) {

  const [password,  setPassword]  = useState('')
  const [error,     setError]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Check lockout on mount
  useEffect(() => {
    const locked = checkLockout()
    if (locked) setCountdown(locked)
  }, [])

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return
    const timer = setTimeout(() => {
      setCountdown(c => {
        if (c <= 1) { setError(''); return 0 }
        return c - 1
      })
    }, 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (countdown > 0 || loading) return

    setLoading(true)
    setError('')

    setTimeout(() => {
      const result = login(password)

      if (result.success) {
        // Redirect to secret admin URL
        window.location.href = '/admin-muj-9x7k'
      } else if (result.locked) {
        setCountdown(result.locked)
        setError(`Too many attempts. Locked for ${result.locked}s.`)
        setPassword('')
      } else {
        setError(result.message)
        setPassword('')
      }

      setLoading(false)
    }, 600)
  }

  const isLocked = countdown > 0

  return (
    <>
      <style>{`

        /* ── Overlay backdrop ─────────────────────────────── */
        .modal-overlay {
          position:        fixed;
          inset:           0;
          z-index:         9999;
          background:      rgba(6, 13, 31, 0.85);
          backdrop-filter: blur(8px);
          display:         flex;
          align-items:     center;
          justify-content: center;
          padding:         24px;
          animation:       overlayIn 0.2s ease forwards;
        }

        @keyframes overlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Modal card ───────────────────────────────────── */
        .modal-card {
          width:         100%;
          max-width:     400px;
          background:    var(--navy2);
          border:        1px solid var(--border2);
          border-radius: 20px;
          padding:       40px 36px;
          position:      relative;
          animation:     modalIn 0.3s cubic-bezier(0.4,0,0.2,1) forwards;
        }

        @keyframes modalIn {
          from { opacity: 0; transform: translateY(-20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }

        /* ── Close button top right ───────────────────────── */
        .modal-close {
          position:    absolute;
          top:         16px;
          right:       16px;
          width:       32px;
          height:      32px;
          border-radius: 8px;
          border:      1px solid var(--border);
          background:  transparent;
          color:       var(--text3);
          font-size:   16px;
          cursor:      pointer;
          display:     flex;
          align-items: center;
          justify-content: center;
          transition:  all var(--t);
        }
        .modal-close:hover {
          border-color: var(--border2);
          color:        var(--text);
          background:   rgba(255,255,255,0.04);
        }

        /* ── Header ───────────────────────────────────────── */
        .modal-icon {
          font-size:     36px;
          text-align:    center;
          margin-bottom: 16px;
        }

        .modal-title {
          font-family:   var(--ff-display);
          font-size:     24px;
          font-weight:   600;
          color:         var(--text);
          text-align:    center;
          margin-bottom: 6px;
        }

        .modal-sub {
          font-size:      12px;
          color:          var(--text3);
          text-align:     center;
          margin-bottom:  28px;
          font-family:    var(--ff-mono);
          letter-spacing: 0.5px;
        }

        /* ── Input ────────────────────────────────────────── */
        .modal-input {
          width:          100%;
          padding:        13px 16px;
          background:     var(--navy3);
          border:         1px solid var(--border);
          border-radius:  10px;
          color:          var(--text);
          font-family:    var(--ff-body);
          font-size:      15px;
          outline:        none;
          transition:     border-color var(--t);
          margin-bottom:  12px;
          letter-spacing: 2px;
        }
        .modal-input:focus   { border-color: var(--accent); }
        .modal-input:disabled {
          opacity: 0.4;
          cursor:  not-allowed;
        }
        .modal-input::placeholder {
          color:          var(--text3);
          letter-spacing: 0;
        }

        /* ── Submit button ────────────────────────────────── */
        .modal-btn {
          width:         100%;
          padding:       13px;
          background:    var(--accent);
          color:         var(--navy);
          border:        none;
          border-radius: 10px;
          font-family:   var(--ff-body);
          font-size:     14px;
          font-weight:   500;
          cursor:        pointer;
          transition:    all var(--t);
          margin-bottom: 14px;
        }
        .modal-btn:hover:not(:disabled) {
          background: #00e8ff;
          transform:  translateY(-1px);
        }
        .modal-btn:disabled {
          background: var(--navy3);
          color:      var(--text3);
          cursor:     not-allowed;
        }

        /* ── Error message ────────────────────────────────── */
        .modal-error {
          padding:       10px 14px;
          background:    rgba(255,80,80,0.08);
          border:        1px solid rgba(255,80,80,0.2);
          border-radius: 8px;
          font-size:     12px;
          color:         #ff6b6b;
          text-align:    center;
          font-family:   var(--ff-mono);
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }

        /* ── Lockout box ──────────────────────────────────── */
        .modal-lockout {
          padding:       10px 14px;
          background:    rgba(255,150,0,0.08);
          border:        1px solid rgba(255,150,0,0.2);
          border-radius: 8px;
          font-size:     12px;
          color:         #ffaa00;
          text-align:    center;
          font-family:   var(--ff-mono);
          margin-bottom: 10px;
        }

        .lockout-timer {
          font-size:   20px;
          font-weight: 500;
          display:     block;
          margin-top:  4px;
        }

        /* ── Hint text ────────────────────────────────────── */
        .modal-hint {
          font-size:      11px;
          color:          var(--text3);
          text-align:     center;
          font-family:    var(--ff-mono);
          letter-spacing: 0.5px;
        }

      `}</style>

      {/* Backdrop — click outside to close */}
      <div
        className="modal-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <div className="modal-card">

          {/* Close button */}
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            x
          </button>

          {/* Icon */}
          <div className="modal-icon">
            {isLocked ? '🔒' : '🔐'}
          </div>

          {/* Title */}
          <h2 className="modal-title">Admin Access</h2>
          <p  className="modal-sub">Enter password to continue</p>

          {/* Form */}
          <form onSubmit={handleSubmit}>

            <input
              className="modal-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={isLocked}
              autoFocus
            />

            <button
              className="modal-btn"
              type="submit"
              disabled={loading || !password || isLocked}
            >
              {loading
                ? 'Verifying...'
                : isLocked
                ? `Locked (${countdown}s)`
                : 'Enter Dashboard'
              }
            </button>

          </form>

          {/* Lockout countdown */}
          {isLocked && (
            <div className="modal-lockout">
              Too many failed attempts
              <span className="lockout-timer">{countdown}s</span>
            </div>
          )}

          {/* Error */}
          {error && !isLocked && (
            <div className="modal-error">{error}</div>
          )}

          <p className="modal-hint">
            {isLocked
              ? 'Wait for lockout to expire'
              : '3 attempts before lockout'
            }
          </p>

        </div>
      </div>
    </>
  )
}