import { useState } from 'react'

// This key stores the custom password in localStorage
// If not set → app uses the hardcoded default
const PW_KEY = 'admin_custom_password'

export default function PasswordEditor() {

  const [current,  setCurrent]  = useState('')
  const [newPw,    setNewPw]    = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [error,    setError]    = useState('')
  const [success,  setSuccess]  = useState(false)
  const [show,     setShow]     = useState(false)

  const handleChange = () => {
    setError('')

    // ── Validation ─────────────────────────────────────────
    if (!current) {
      setError('Enter your current password.')
      return
    }
    if (newPw.length < 8) {
      setError('New password must be at least 8 characters.')
      return
    }
    if (newPw !== confirm) {
      setError('New passwords do not match.')
      return
    }
    if (current === newPw) {
      setError('New password must be different from current.')
      return
    }

    // ── Verify current password ────────────────────────────
    // Read custom password from localStorage
    // If none set yet → use hardcoded default
    const storedPw = localStorage.getItem(PW_KEY) || 'Usman@COMSATS#2025'

    if (current !== storedPw) {
      setError('Current password is incorrect.')
      setCurrent('')
      return
    }

    // ── Save new password ──────────────────────────────────
    localStorage.setItem(PW_KEY, newPw)

    // Clear form
    setCurrent('')
    setNewPw('')
    setConfirm('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  // Password strength checker
  const getStrength = (pw) => {
    if (!pw)          return { label: '',        color: 'transparent', width: '0%'   }
    if (pw.length < 6)return { label: 'Weak',    color: '#ff6b6b',     width: '25%'  }
    if (pw.length < 10
      || !/[A-Z]/.test(pw)
      || !/[0-9]/.test(pw))
                      return { label: 'Medium',  color: '#ffaa00',     width: '60%'  }
    if (/[^a-zA-Z0-9]/.test(pw))
                      return { label: 'Strong',  color: 'var(--accent2)', width: '100%' }
    return            { label: 'Good',   color: 'var(--accent)',  width: '80%'  }
  }

  const strength = getStrength(newPw)

  return (
    <>
      <style>{`
        .pw-section {
          margin-bottom: 28px;
        }
        .pw-section-label {
          font-family:    var(--ff-mono);
          font-size:      11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color:          var(--accent2);
          margin-bottom:  16px;
          padding-bottom: 10px;
          border-bottom:  1px solid var(--border);
          display:        block;
        }
        .pw-field {
          display:        flex;
          flex-direction: column;
          gap:            6px;
          margin-bottom:  14px;
        }
        .pw-label {
          font-family:    var(--ff-mono);
          font-size:      11px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color:          var(--text3);
        }
        .pw-input-row {
          position: relative;
          display:  flex;
        }
        .pw-input {
          flex:          1;
          padding:       11px 40px 11px 14px;
          background:    var(--navy3);
          border:        1px solid var(--border);
          border-radius: 8px;
          color:         var(--text);
          font-family:   var(--ff-mono);
          font-size:     14px;
          outline:       none;
          transition:    border-color var(--t);
          letter-spacing: 2px;
          width:         100%;
        }
        .pw-input:focus { border-color: var(--accent); }
        .pw-input::placeholder {
          letter-spacing: 0;
          color: var(--text3);
        }
        .pw-toggle {
          position:    absolute;
          right:       12px;
          top:         50%;
          transform:   translateY(-50%);
          background:  none;
          border:      none;
          color:       var(--text3);
          cursor:      pointer;
          font-size:   14px;
          padding:     4px;
          transition:  color var(--t);
        }
        .pw-toggle:hover { color: var(--text2); }

        /* ── Strength bar ─────────────────────────────────── */
        .pw-strength {
          margin-top: 8px;
        }
        .pw-strength-track {
          height:        4px;
          background:    var(--border);
          border-radius: 2px;
          overflow:      hidden;
          margin-bottom: 4px;
        }
        .pw-strength-fill {
          height:        100%;
          border-radius: 2px;
          transition:    width 0.4s ease, background 0.4s ease;
        }
        .pw-strength-label {
          font-family:    var(--ff-mono);
          font-size:      11px;
          letter-spacing: 1px;
        }

        /* ── Requirements list ────────────────────────────── */
        .pw-requirements {
          padding:       14px 16px;
          background:    var(--card);
          border:        1px solid var(--border);
          border-radius: 10px;
          margin-bottom: 20px;
          display:       flex;
          flex-direction: column;
          gap:           6px;
        }
        .pw-req {
          font-size:   12px;
          font-family: var(--ff-mono);
          display:     flex;
          align-items: center;
          gap:         8px;
          transition:  color var(--t);
        }
        .pw-req.met   { color: var(--accent2); }
        .pw-req.unmet { color: var(--text3);   }

        /* ── Error / success ──────────────────────────────── */
        .pw-error {
          padding:       10px 14px;
          background:    rgba(255,80,80,0.08);
          border:        1px solid rgba(255,80,80,0.2);
          border-radius: 8px;
          font-size:     13px;
          color:         #ff6b6b;
          font-family:   var(--ff-mono);
          margin-bottom: 14px;
        }
        .pw-success {
          padding:       10px 14px;
          background:    rgba(0,229,200,0.08);
          border:        1px solid rgba(0,229,200,0.2);
          border-radius: 8px;
          font-size:     13px;
          color:         var(--accent2);
          font-family:   var(--ff-mono);
          margin-bottom: 14px;
          animation:     fadeInUp 0.3s ease;
        }

        /* ── Save button ──────────────────────────────────── */
        .btn-change-pw {
          padding:       11px 28px;
          background:    var(--accent);
          color:         var(--navy);
          border:        none;
          border-radius: 8px;
          font-family:   var(--ff-body);
          font-size:     14px;
          font-weight:   500;
          cursor:        pointer;
          transition:    all var(--t);
        }
        .btn-change-pw:hover:not(:disabled) { background: #00e8ff; }
        .btn-change-pw:disabled {
          opacity: 0.5;
          cursor:  not-allowed;
        }

        /* ── Warning box ──────────────────────────────────── */
        .pw-warning {
          padding:       14px 16px;
          background:    rgba(255,150,0,0.06);
          border:        1px solid rgba(255,150,0,0.2);
          border-radius: 10px;
          font-size:     12px;
          color:         #ffaa00;
          font-family:   var(--ff-mono);
          line-height:   1.7;
          margin-top:    24px;
          letter-spacing: 0.3px;
        }
        .pw-warning strong { color: #ffcc44; }
      `}</style>

      {/* ── Current Password ────────────────────────────────── */}
      <div className="pw-section">
        <span className="pw-section-label">Verify Identity</span>

        <div className="pw-field">
          <label className="pw-label">Current Password</label>
          <div className="pw-input-row">
            <input
              className="pw-input"
              type={show ? 'text' : 'password'}
              placeholder="Enter current password"
              value={current}
              onChange={e => setCurrent(e.target.value)}
            />
            <button
              className="pw-toggle"
              onClick={() => setShow(s => !s)}
              type="button"
            >
              {show ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
      </div>

      {/* ── New Password ────────────────────────────────────── */}
      <div className="pw-section">
        <span className="pw-section-label">New Password</span>

        <div className="pw-field">
          <label className="pw-label">New Password</label>
          <div className="pw-input-row">
            <input
              className="pw-input"
              type={show ? 'text' : 'password'}
              placeholder="Enter new password"
              value={newPw}
              onChange={e => setNewPw(e.target.value)}
            />
          </div>

          {/* Strength bar */}
          {newPw && (
            <div className="pw-strength">
              <div className="pw-strength-track">
                <div
                  className="pw-strength-fill"
                  style={{
                    width:      strength.width,
                    background: strength.color,
                  }}
                />
              </div>
              <span
                className="pw-strength-label"
                style={{ color: strength.color }}
              >
                {strength.label}
              </span>
            </div>
          )}
        </div>

        <div className="pw-field">
          <label className="pw-label">Confirm New Password</label>
          <div className="pw-input-row">
            <input
              className="pw-input"
              type={show ? 'text' : 'password'}
              placeholder="Repeat new password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
          </div>
        </div>

        {/* Requirements checklist */}
        <div className="pw-requirements">
          {[
            { label: 'At least 8 characters',       met: newPw.length >= 8              },
            { label: 'At least one uppercase letter',met: /[A-Z]/.test(newPw)           },
            { label: 'At least one number',          met: /[0-9]/.test(newPw)           },
            { label: 'At least one special character',met: /[^a-zA-Z0-9]/.test(newPw)  },
            { label: 'Passwords match',              met: newPw === confirm && !!confirm },
          ].map(req => (
            <div
              key={req.label}
              className={`pw-req ${req.met ? 'met' : 'unmet'}`}
            >
              <span>{req.met ? '✅' : '○'}</span>
              {req.label}
            </div>
          ))}
        </div>

      </div>

      {/* ── Feedback ────────────────────────────────────────── */}
      {error   && <div className="pw-error">{error}</div>}
      {success && (
        <div className="pw-success">
          Password changed successfully. Use the new password next login.
        </div>
      )}

      {/* ── Submit ──────────────────────────────────────────── */}
      <button
        className="btn-change-pw"
        onClick={handleChange}
        disabled={!current || !newPw || !confirm}
      >
        Change Password
      </button>

      {/* ── Warning ─────────────────────────────────────────── */}
      <div className="pw-warning">
        <strong>Important:</strong> Password is stored in your browser's
        localStorage. If you clear browser data or use a different device,
        you will need to use the default password{' '}
        <strong>Usman@COMSATS#2025</strong> to log in again.
      </div>

    </>
  )
}