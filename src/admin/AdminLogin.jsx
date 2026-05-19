import { useState } from 'react'
import { login } from './useAdminData'

export default function AdminLogin({ onSuccess }) {

  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Small delay — makes it feel like it's checking
    setTimeout(() => {
      const ok = login(password)
      if (ok) {
        onSuccess()
      } else {
        setError('Incorrect password. Try again.')
        setPassword('')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <>
      <style>{`
        .login-page {
          min-height:      100vh;
          background:      var(--navy);
          display:         flex;
          align-items:     center;
          justify-content: center;
          padding:         24px;
        }

        .login-card {
          width:         100%;
          max-width:     420px;
          padding:       48px 40px;
          background:    var(--card);
          border:        1px solid var(--border);
          border-radius: 20px;
          animation:     fadeInUp 0.5s ease forwards;
        }

        .login-icon {
          font-size:     40px;
          text-align:    center;
          margin-bottom: 24px;
        }

        .login-title {
          font-family:   var(--ff-display);
          font-size:     28px;
          font-weight:   600;
          color:         var(--text);
          text-align:    center;
          margin-bottom: 8px;
        }

        .login-sub {
          font-size:     13px;
          color:         var(--text3);
          text-align:    center;
          margin-bottom: 36px;
          font-family:   var(--ff-mono);
          letter-spacing: 0.5px;
        }

        .login-input {
          width:         100%;
          padding:       14px 18px;
          background:    var(--navy3);
          border:        1px solid var(--border);
          border-radius: 10px;
          color:         var(--text);
          font-family:   var(--ff-body);
          font-size:     15px;
          outline:       none;
          transition:    border-color var(--t);
          margin-bottom: 12px;
          letter-spacing: 2px;
        }

        .login-input:focus {
          border-color: var(--accent);
        }

        .login-input::placeholder {
          color:          var(--text3);
          letter-spacing: 0;
        }

        .login-btn {
          width:         100%;
          padding:       14px;
          background:    var(--accent);
          color:         var(--navy);
          border:        none;
          border-radius: 10px;
          font-family:   var(--ff-body);
          font-size:     15px;
          font-weight:   500;
          cursor:        pointer;
          transition:    all var(--t);
          margin-bottom: 16px;
        }

        .login-btn:hover:not(:disabled) {
          background: #00e8ff;
          transform:  translateY(-1px);
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor:  not-allowed;
        }

        .login-error {
          padding:       12px 16px;
          background:    rgba(255,80,80,0.08);
          border:        1px solid rgba(255,80,80,0.25);
          border-radius: 8px;
          font-size:     13px;
          color:         #ff6b6b;
          text-align:    center;
          font-family:   var(--ff-mono);
        }

        .login-back {
          display:     block;
          text-align:  center;
          margin-top:  20px;
          font-size:   13px;
          color:       var(--text3);
          text-decoration: none;
          transition:  color var(--t);
          font-family: var(--ff-mono);
        }

        .login-back:hover { color: var(--text2); }
      `}</style>

      <div className="login-page">
        <div className="login-card">

          <div className="login-icon">🔐</div>

          <h1 className="login-title">Admin Portal</h1>
          <p  className="login-sub">Muhammad Usman Javeed — Portfolio CMS</p>

          <form onSubmit={handleSubmit}>

            <input
              className="login-input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />

            <button
              className="login-btn"
              type="submit"
              disabled={loading || !password}
            >
              {loading ? 'Checking...' : 'Login'}
            </button>

            {error && (
              <div className="login-error">{error}</div>
            )}

          </form>

          <a href="/" className="login-back">
            Back to portfolio
          </a>

        </div>
      </div>
    </>
  )
}