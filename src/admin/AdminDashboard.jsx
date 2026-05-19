import { useState } from 'react'
import { logout, resetAllData } from './useAdminData'
import ProfileEditor      from './editors/ProfileEditor'
import PublicationsEditor from './editors/PublicationsEditor'
import SkillsEditor       from './editors/SkillsEditor'
import CVEditor           from './editors/CVEditor'
import PasswordEditor     from './editors/PasswordEditor'
import CVDetailsEditor from './editors/CVDetailsEditor'

const TABS = [
  { id: 'overview',    label: 'Overview',     icon: '🏠' },
  { id: 'profile',     label: 'Profile',      icon: '👤' },
  { id: 'publications',label: 'Publications', icon: '📚' },
  { id: 'skills',      label: 'Skills',       icon: '💪' },
  { id: 'cv',          label: 'CV Upload',    icon: '📄' },
  { id: 'cv-details',  label: 'CV Details',   icon: '🎓' },  // ← new
  { id: 'password',    label: 'Password',     icon: '🔑' },
]
export default function AdminDashboard({ onLogout }) {

  const [activeTab, setActiveTab] = useState('overview')

  const handleLogout = () => {
    logout()
    onLogout()
  }

  const handleNuclearReset = () => {
    if (window.confirm(
      'This will reset ALL data to defaults and log you out. Are you sure?'
    )) {
      resetAllData()
      onLogout()
    }
  }

  return (
    <>
      <style>{`
        .admin-layout {
          display:    flex;
          min-height: 100vh;
          background: var(--navy);
        }

        /* ── Sidebar ────────────────────────────────────── */
        .admin-sidebar {
          width:          260px;
          flex-shrink:    0;
          background:     var(--navy2);
          border-right:   1px solid var(--border);
          display:        flex;
          flex-direction: column;
          padding:        28px 0;
          position:       sticky;
          top:            0;
          height:         100vh;
          overflow-y:     auto;
        }

        .sidebar-brand {
          padding:       0 24px 24px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 16px;
        }

        .sidebar-logo {
          font-family:    var(--ff-mono);
          font-size:      13px;
          letter-spacing: 2px;
          color:          var(--accent);
          margin-bottom:  4px;
        }

        .sidebar-sub {
          font-size:      11px;
          color:          var(--text3);
          font-family:    var(--ff-mono);
          letter-spacing: 0.5px;
        }

        .sidebar-nav {
          flex:           1;
          padding:        0 12px;
          display:        flex;
          flex-direction: column;
          gap:            4px;
        }

        .sidebar-tab {
          display:       flex;
          align-items:   center;
          gap:           10px;
          padding:       10px 14px;
          border-radius: 8px;
          border:        none;
          background:    transparent;
          color:         var(--text3);
          font-family:   var(--ff-body);
          font-size:     14px;
          cursor:        pointer;
          text-align:    left;
          transition:    all var(--t);
          width:         100%;
        }

        .sidebar-tab:hover {
          background: rgba(0,200,255,0.05);
          color:      var(--text2);
        }

        .sidebar-tab.active {
          background: rgba(0,200,255,0.1);
          color:      var(--text);
          border:     1px solid var(--border2);
        }

        .sidebar-tab-icon { font-size: 16px; }

        .sidebar-footer {
          padding:        16px 12px 0;
          border-top:     1px solid var(--border);
          margin-top:     16px;
          display:        flex;
          flex-direction: column;
          gap:            6px;
        }

        .btn-logout {
          width:           100%;
          padding:         9px 14px;
          background:      transparent;
          color:           var(--text3);
          border:          1px solid var(--border);
          border-radius:   8px;
          font-family:     var(--ff-body);
          font-size:       13px;
          cursor:          pointer;
          text-align:      left;
          transition:      all var(--t);
          text-decoration: none;
          display:         block;
        }
        .btn-logout:hover {
          color:        var(--text2);
          border-color: var(--border2);
        }

        .btn-danger {
          width:         100%;
          padding:       9px 14px;
          background:    transparent;
          color:         #ff6b6b;
          border:        1px solid rgba(255,80,80,0.25);
          border-radius: 8px;
          font-family:   var(--ff-body);
          font-size:     13px;
          cursor:        pointer;
          text-align:    left;
          transition:    all var(--t);
        }
        .btn-danger:hover { background: rgba(255,80,80,0.06); }

        /* ── Main content ───────────────────────────────── */
        .admin-main {
          flex:       1;
          padding:    40px 48px;
          overflow-y: auto;
          min-width:  0;
        }

        .admin-page-title {
          font-family:   var(--ff-display);
          font-size:     28px;
          font-weight:   600;
          color:         var(--text);
          margin-bottom: 6px;
        }

        .admin-page-sub {
          font-size:      14px;
          color:          var(--text3);
          margin-bottom:  36px;
          font-family:    var(--ff-mono);
          letter-spacing: 0.5px;
        }

        /* ── Overview cards ─────────────────────────────── */
        .overview-grid {
          display:               grid;
          grid-template-columns: repeat(3, 1fr);
          gap:                   16px;
          margin-bottom:         40px;
        }

        .overview-card {
          padding:       24px;
          background:    var(--card);
          border:        1px solid var(--border);
          border-radius: 14px;
          cursor:        pointer;
          transition:    border-color var(--t), transform var(--t);
        }

        .overview-card:hover {
          border-color: var(--border2);
          transform:    translateY(-2px);
        }

        .overview-icon {
          font-size:     28px;
          margin-bottom: 12px;
        }

        .overview-label {
          font-family:    var(--ff-mono);
          font-size:      11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color:          var(--text3);
          margin-bottom:  6px;
        }

        .overview-value {
          font-family: var(--ff-mono);
          font-size:   28px;
          color:       var(--accent);
          line-height: 1;
        }

        .overview-action {
          font-size:  12px;
          color:      var(--text3);
          margin-top: 8px;
          transition: color var(--t);
        }

        .overview-card:hover .overview-action {
          color: var(--accent2);
        }

        .view-portfolio {
          display:         inline-flex;
          align-items:     center;
          gap:             8px;
          font-family:     var(--ff-mono);
          font-size:       12px;
          letter-spacing:  1px;
          color:           var(--text3);
          text-decoration: none;
          padding:         10px 20px;
          border:          1px solid var(--border);
          border-radius:   8px;
          transition:      all var(--t);
          margin-bottom:   32px;
        }
        .view-portfolio:hover {
          color:        var(--accent);
          border-color: var(--border2);
        }

        .admin-info {
          padding:       20px 24px;
          background:    rgba(0,200,255,0.04);
          border:        1px solid var(--border2);
          border-radius: 12px;
          font-size:     13px;
          color:         var(--text3);
          line-height:   1.7;
        }
        .admin-info strong {
          color:       var(--accent);
          font-weight: 500;
        }

        /* ── Responsive ─────────────────────────────────── */
        @media (max-width: 768px) {
          .admin-sidebar { display: none; }
          .admin-main    { padding: 24px 20px; }
          .overview-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="admin-layout">

        {/* ── Sidebar ───────────────────────────────────── */}
        <aside className="admin-sidebar">

          <div className="sidebar-brand">
            <p className="sidebar-logo">ADMIN</p>
            <p className="sidebar-sub">Portfolio CMS</p>
          </div>

          <nav className="sidebar-nav">
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`sidebar-tab${activeTab === tab.id ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="sidebar-tab-icon">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-logout"
            >
              View Portfolio
            </a>
            <button className="btn-logout" onClick={handleLogout}>
              Log Out
            </button>
            <button className="btn-danger" onClick={handleNuclearReset}>
              Reset All Data
            </button>
          </div>

        </aside>

        {/* ── Main ──────────────────────────────────────── */}
        <main className="admin-main">

          {/* ── OVERVIEW ────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div>
              <h1 className="admin-page-title">Dashboard</h1>
              <p  className="admin-page-sub">
                Manage your portfolio content
              </p>

              
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="view-portfolio"
              >
                View live portfolio
              </a>

             <div className="overview-grid">

  <div
    className="overview-card"
    onClick={() => setActiveTab('profile')}
  >
    <div className="overview-icon">👤</div>
    <p className="overview-label">Profile</p>
    <p className="overview-value">1</p>
    <p className="overview-action">Edit name, bio, links</p>
  </div>

  <div
    className="overview-card"
    onClick={() => setActiveTab('publications')}
  >
    <div className="overview-icon">📚</div>
    <p className="overview-label">Publications</p>
    <p className="overview-value">8</p>
    <p className="overview-action">Add, edit, delete papers</p>
  </div>

  <div
    className="overview-card"
    onClick={() => setActiveTab('skills')}
  >
    <div className="overview-icon">💪</div>
    <p className="overview-label">Skills</p>
    <p className="overview-value">8</p>
    <p className="overview-action">Adjust levels and categories</p>
  </div>

  <div
    className="overview-card"
    onClick={() => setActiveTab('cv')}
  >
    <div className="overview-icon">📄</div>
    <p className="overview-label">CV</p>
    <p className="overview-value">PDF</p>
    <p className="overview-action">Upload or link CV file</p>
  </div>

  {/* ← ADD THIS CARD HERE */}
  <div
    className="overview-card"
    onClick={() => setActiveTab('cv-details')}
  >
    <div className="overview-icon">🎓</div>
    <p className="overview-label">CV Details</p>
    <p className="overview-value">4</p>
    <p className="overview-action">Education, Experience, Awards, Certs</p>
  </div>

  <div
    className="overview-card"
    onClick={() => setActiveTab('password')}
  >
    <div className="overview-icon">🔑</div>
    <p className="overview-label">Password</p>
    <p className="overview-value">****</p>
    <p className="overview-action">Change admin password</p>
  </div>

</div>

              <div className="admin-info">
                <strong>How this works:</strong> All edits are saved to your
                browser's localStorage instantly. The portfolio reads from
                localStorage first — so changes appear live on refresh.
                Use <strong>Reset All Data</strong> in the sidebar to revert
                everything back to the original defaults.
              </div>

            </div>
          )}

          {/* ── PROFILE ─────────────────────────────────── */}
          {activeTab === 'profile' && (
            <div>
              <h1 className="admin-page-title">Profile</h1>
              <p  className="admin-page-sub">
                Edit your personal information and links
              </p>
              <ProfileEditor />
            </div>
          )}

          {/* ── PUBLICATIONS ────────────────────────────── */}
          {activeTab === 'publications' && (
            <div>
              <h1 className="admin-page-title">Publications</h1>
              <p  className="admin-page-sub">
                Add, edit, or remove research publications
              </p>
              <PublicationsEditor />
            </div>
          )}

          {/* ── SKILLS ──────────────────────────────────── */}
          {activeTab === 'skills' && (
            <div>
              <h1 className="admin-page-title">Skills</h1>
              <p  className="admin-page-sub">
                Manage technical skills and proficiency levels
              </p>
              <SkillsEditor />
            </div>
          )}

          {/* ── CV ──────────────────────────────────────── */}
          {activeTab === 'cv' && (
            <div>
              <h1 className="admin-page-title">CV</h1>
              <p  className="admin-page-sub">
                Upload your CV PDF or add a download link
              </p>
              <CVEditor />
            </div>
          )}
          {/* ── CV DETAILS ──────────────────────────────── */}
{activeTab === 'cv-details' && (
  <div>
    <h1 className="admin-page-title">CV Details</h1>
    <p  className="admin-page-sub">
      Add your Education, Experience, Awards and Certifications
    </p>
    <CVDetailsEditor />
  </div>
)}

          {/* ── PASSWORD ────────────────────────────────── */}
          {activeTab === 'password' && (
            <div>
              <h1 className="admin-page-title">Change Password</h1>
              <p  className="admin-page-sub">
                Update your admin portal password
              </p>
              <PasswordEditor />
            </div>
          )}

        </main>
      </div>
    </>
  )
}