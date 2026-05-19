import { useState } from 'react'
import { useAdminData } from '../useAdminData'

export default function ProfileEditor() {

  const { data: person, update, reset } = useAdminData('person')

  // Local copy for editing — only save when user clicks Save
  const [form,    setForm]    = useState({ ...person })
  const [saved,   setSaved]   = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    update(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleReset = () => {
    if (window.confirm('Reset profile to default data?')) {
      reset()
      setForm({ ...person })
    }
  }

  return (
    <>
      <style>{`
        .editor-section {
          margin-bottom: 32px;
        }
        .editor-section-title {
          font-family:    var(--ff-mono);
          font-size:      11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color:          var(--accent2);
          margin-bottom:  16px;
          padding-bottom: 10px;
          border-bottom:  1px solid var(--border);
        }
        .editor-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .editor-field {
          display:        flex;
          flex-direction: column;
          gap:            6px;
        }
        .editor-field.full {
          grid-column: 1 / -1;
        }
        .editor-label {
          font-family:    var(--ff-mono);
          font-size:      11px;
          letter-spacing: 1px;
          color:          var(--text3);
          text-transform: uppercase;
        }
        .editor-input,
        .editor-textarea {
          padding:       10px 14px;
          background:    var(--navy3);
          border:        1px solid var(--border);
          border-radius: 8px;
          color:         var(--text);
          font-family:   var(--ff-body);
          font-size:     14px;
          outline:       none;
          transition:    border-color var(--t);
          width:         100%;
        }
        .editor-input:focus,
        .editor-textarea:focus {
          border-color: var(--accent);
        }
        .editor-textarea {
          height:     120px;
          resize:     vertical;
          min-height: 80px;
        }
        .editor-actions {
          display:     flex;
          gap:         12px;
          margin-top:  24px;
          flex-wrap:   wrap;
          align-items: center;
        }
        .btn-save {
          padding:       10px 24px;
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
        .btn-save:hover { background: #00e8ff; }
        .btn-reset {
          padding:       10px 20px;
          background:    transparent;
          color:         var(--text3);
          border:        1px solid var(--border);
          border-radius: 8px;
          font-family:   var(--ff-body);
          font-size:     14px;
          cursor:        pointer;
          transition:    all var(--t);
        }
        .btn-reset:hover {
          border-color: rgba(255,80,80,0.4);
          color:        #ff6b6b;
        }
        .save-notice {
          font-family:  var(--ff-mono);
          font-size:    12px;
          color:        var(--accent2);
          letter-spacing: 0.5px;
        }
      `}</style>

      {/* Basic Info */}
      <div className="editor-section">
        <p className="editor-section-title">Basic Info</p>
        <div className="editor-grid">

          <div className="editor-field">
            <label className="editor-label">Full Name</label>
            <input
              className="editor-input"
              name="name"
              value={form.name || ''}
              onChange={handleChange}
            />
          </div>

          <div className="editor-field">
            <label className="editor-label">Initials</label>
            <input
              className="editor-input"
              name="initials"
              value={form.initials || ''}
              onChange={handleChange}
            />
          </div>

          <div className="editor-field full">
            <label className="editor-label">Title</label>
            <input
              className="editor-input"
              name="title"
              value={form.title || ''}
              onChange={handleChange}
            />
          </div>

          <div className="editor-field full">
            <label className="editor-label">Bio</label>
            <textarea
              className="editor-textarea"
              name="bio"
              value={form.bio || ''}
              onChange={handleChange}
            />
          </div>

        </div>
      </div>

      {/* Affiliation */}
      <div className="editor-section">
        <p className="editor-section-title">Affiliation</p>
        <div className="editor-grid">

          <div className="editor-field full">
            <label className="editor-label">University</label>
            <input
              className="editor-input"
              name="affiliation"
              value={form.affiliation || ''}
              onChange={handleChange}
            />
          </div>

          <div className="editor-field full">
            <label className="editor-label">Department</label>
            <input
              className="editor-input"
              name="department"
              value={form.department || ''}
              onChange={handleChange}
            />
          </div>

          <div className="editor-field full">
            <label className="editor-label">Address</label>
            <input
              className="editor-input"
              name="address"
              value={form.address || ''}
              onChange={handleChange}
            />
          </div>

        </div>
      </div>

      {/* Links */}
      <div className="editor-section">
        <p className="editor-section-title">Links</p>
        <div className="editor-grid">

          <div className="editor-field full">
            <label className="editor-label">Email</label>
            <input
              className="editor-input"
              name="email"
              value={form.email || ''}
              onChange={handleChange}
            />
          </div>

          <div className="editor-field full">
            <label className="editor-label">Google Scholar URL</label>
            <input
              className="editor-input"
              name="scholar"
              value={form.scholar || ''}
              onChange={handleChange}
            />
          </div>

          <div className="editor-field">
            <label className="editor-label">ResearchGate URL</label>
            <input
              className="editor-input"
              name="researchgate"
              value={form.researchgate || ''}
              onChange={handleChange}
            />
          </div>

          <div className="editor-field">
            <label className="editor-label">LinkedIn URL</label>
            <input
              className="editor-input"
              name="linkedin"
              value={form.linkedin || ''}
              onChange={handleChange}
            />
          </div>

        </div>
      </div>

      {/* Actions */}
      <div className="editor-actions">
        <button className="btn-save" onClick={handleSave}>
          Save Changes
        </button>
        <button className="btn-reset" onClick={handleReset}>
          Reset to Default
        </button>
        {saved && (
          <span className="save-notice">Saved successfully</span>
        )}
      </div>
    </>
  )
}