import { useState } from 'react'
import { useAdminData } from '../useAdminData'

const EMPTY_SKILL = {
  name:     '',
  level:    80,
  category: 'Machine Learning',
}

const CATEGORIES = [
  'Programming',
  'ML Frameworks',
  'Deep Learning',
  'Data Science',
]

export default function SkillsEditor() {

  const { data: skills, update, reset } = useAdminData('skills')

  const [editingIdx, setEditingIdx] = useState(null)
  const [editForm,   setEditForm]   = useState({})
  const [showAdd,    setShowAdd]    = useState(false)
  const [newSkill,   setNewSkill]   = useState({ ...EMPTY_SKILL })
  const [saved,      setSaved]      = useState(false)

  const showSaved = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const startEdit = (idx) => {
    setEditingIdx(idx)
    setEditForm({ ...skills[idx] })
    setShowAdd(false)
  }

  const saveEdit = () => {
    const updated = skills.map((s, i) =>
      i === editingIdx
        ? { ...editForm, level: Number(editForm.level) }
        : s
    )
    update(updated)
    setEditingIdx(null)
    showSaved()
  }

  const deleteSkill = (idx) => {
    if (!window.confirm('Delete this skill?')) return
    update(skills.filter((_, i) => i !== idx))
    showSaved()
  }

  const addSkill = () => {
    update([...skills, { ...newSkill, level: Number(newSkill.level) }])
    setNewSkill({ ...EMPTY_SKILL })
    setShowAdd(false)
    showSaved()
  }

  const handleReset = () => {
    if (window.confirm('Reset all skills to default data?')) {
      reset()
      setEditingIdx(null)
      setShowAdd(false)
    }
  }

  return (
    <>
      <style>{`
        .skills-toolbar {
          display:         flex;
          align-items:     center;
          justify-content: space-between;
          margin-bottom:   20px;
          flex-wrap:       wrap;
          gap:             12px;
        }
        .skills-count {
          font-family:    var(--ff-mono);
          font-size:      12px;
          color:          var(--text3);
          letter-spacing: 1px;
        }
        .skills-count span { color: var(--accent); }
        .toolbar-right {
          display:     flex;
          gap:         10px;
          align-items: center;
        }
        .save-notice {
          font-family:  var(--ff-mono);
          font-size:    12px;
          color:        var(--accent2);
          letter-spacing: 0.5px;
        }
        .btn-add {
          padding:       9px 20px;
          background:    var(--accent);
          color:         var(--navy);
          border:        none;
          border-radius: 8px;
          font-family:   var(--ff-body);
          font-size:     13px;
          font-weight:   500;
          cursor:        pointer;
          transition:    all var(--t);
        }
        .btn-add:hover { background: #00e8ff; }
        .btn-sm-reset {
          padding:       9px 16px;
          background:    transparent;
          color:         var(--text3);
          border:        1px solid var(--border);
          border-radius: 8px;
          font-size:     13px;
          cursor:        pointer;
          transition:    all var(--t);
          font-family:   var(--ff-body);
        }
        .btn-sm-reset:hover {
          border-color: rgba(255,80,80,0.4);
          color: #ff6b6b;
        }

        /* Add form */
        .add-form {
          padding:       20px;
          background:    rgba(0,200,255,0.04);
          border:        1px solid var(--border2);
          border-radius: 12px;
          margin-bottom: 20px;
          display:       flex;
          flex-direction: column;
          gap:           12px;
        }
        .add-form-title {
          font-family:    var(--ff-mono);
          font-size:      11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color:          var(--accent);
        }
        .add-form-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 10px;
          align-items: end;
        }
        .add-form-field {
          display:        flex;
          flex-direction: column;
          gap:            5px;
        }
        .add-form-label {
          font-family:    var(--ff-mono);
          font-size:      10px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color:          var(--text3);
        }
        .add-form-input,
        .add-form-select {
          padding:       9px 12px;
          background:    var(--navy3);
          border:        1px solid var(--border);
          border-radius: 7px;
          color:         var(--text);
          font-family:   var(--ff-body);
          font-size:     13px;
          outline:       none;
          transition:    border-color var(--t);
        }
        .add-form-input:focus,
        .add-form-select:focus { border-color: var(--accent); }
        .add-form-actions {
          display: flex;
          gap: 8px;
        }
        .btn-confirm {
          padding:       8px 20px;
          background:    var(--accent);
          color:         var(--navy);
          border:        none;
          border-radius: 7px;
          font-size:     13px;
          font-weight:   500;
          cursor:        pointer;
          font-family:   var(--ff-body);
          transition:    all var(--t);
        }
        .btn-confirm:hover { background: #00e8ff; }
        .btn-confirm:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-cancel {
          padding:       8px 16px;
          background:    transparent;
          color:         var(--text3);
          border:        1px solid var(--border);
          border-radius: 7px;
          font-size:     13px;
          cursor:        pointer;
          font-family:   var(--ff-body);
          transition:    all var(--t);
        }
        .btn-cancel:hover { color: var(--text2); border-color: var(--border2); }

        /* Skill rows */
        .skill-list {
          display:        flex;
          flex-direction: column;
          gap:            8px;
        }
        .skill-row {
          padding:       14px 18px;
          background:    var(--card);
          border:        1px solid var(--border);
          border-radius: 10px;
          transition:    border-color var(--t);
        }
        .skill-row:hover { border-color: var(--border2); }
        .skill-row-header {
          display:         flex;
          align-items:     center;
          justify-content: space-between;
          gap:             12px;
        }
        .skill-row-left {
          display:     flex;
          align-items: center;
          gap:         14px;
          flex:        1;
          min-width:   0;
        }
        .skill-row-name {
          font-size:   14px;
          color:       var(--text);
          min-width:   160px;
        }
        .skill-row-category {
          font-family:    var(--ff-mono);
          font-size:      10px;
          letter-spacing: 1px;
          color:          var(--text3);
          text-transform: uppercase;
        }
        .skill-row-bar {
          flex:           1;
          height:         4px;
          background:     rgba(0,200,255,0.08);
          border-radius:  2px;
          overflow:       hidden;
        }
        .skill-row-fill {
          height:     100%;
          background: linear-gradient(to right, var(--accent3), var(--accent));
          border-radius: 2px;
          transition: width 0.5s ease;
        }
        .skill-row-pct {
          font-family:    var(--ff-mono);
          font-size:      12px;
          color:          var(--accent);
          min-width:      36px;
          text-align:     right;
        }
        .skill-row-actions {
          display:    flex;
          gap:        6px;
          flex-shrink: 0;
        }
        .btn-edit {
          padding:       4px 12px;
          background:    transparent;
          color:         var(--accent);
          border:        1px solid var(--border2);
          border-radius: 6px;
          font-size:     11px;
          cursor:        pointer;
          font-family:   var(--ff-mono);
          transition:    all var(--t);
        }
        .btn-edit:hover { background: rgba(0,200,255,0.08); }
        .btn-delete {
          padding:       4px 12px;
          background:    transparent;
          color:         #ff6b6b;
          border:        1px solid rgba(255,80,80,0.25);
          border-radius: 6px;
          font-size:     11px;
          cursor:        pointer;
          font-family:   var(--ff-mono);
          transition:    all var(--t);
        }
        .btn-delete:hover { background: rgba(255,80,80,0.08); }

        /* Inline edit */
        .inline-edit {
          margin-top:    12px;
          padding:       14px;
          background:    var(--navy3);
          border-radius: 8px;
          border:        1px solid var(--border2);
          display:       grid;
          grid-template-columns: 2fr 1fr 1fr auto;
          gap:           10px;
          align-items:   end;
        }
        .inline-field {
          display:        flex;
          flex-direction: column;
          gap:            4px;
        }
        .inline-label {
          font-family:    var(--ff-mono);
          font-size:      10px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color:          var(--text3);
        }
        .inline-input,
        .inline-select {
          padding:       7px 10px;
          background:    var(--navy2);
          border:        1px solid var(--border);
          border-radius: 6px;
          color:         var(--text);
          font-family:   var(--ff-body);
          font-size:     13px;
          outline:       none;
          transition:    border-color var(--t);
        }
        .inline-input:focus,
        .inline-select:focus { border-color: var(--accent); }
        .inline-actions {
          display:     flex;
          gap:         6px;
          align-items: center;
          padding-bottom: 1px;
        }

        @media (max-width: 640px) {
          .add-form-row    { grid-template-columns: 1fr; }
          .inline-edit     { grid-template-columns: 1fr; }
          .skill-row-bar   { display: none; }
        }
      `}</style>

      {/* Toolbar */}
      <div className="skills-toolbar">
        <p className="skills-count">
          <span>{skills.length}</span> skills
        </p>
        <div className="toolbar-right">
          {saved && <span className="save-notice">Saved</span>}
          <button className="btn-sm-reset" onClick={handleReset}>
            Reset All
          </button>
          <button
            className="btn-add"
            onClick={() => { setShowAdd(s => !s); setEditingIdx(null) }}
          >
            {showAdd ? 'Cancel' : '+ Add Skill'}
          </button>
        </div>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="add-form">
          <p className="add-form-title">New Skill</p>
          <div className="add-form-row">

            <div className="add-form-field">
              <label className="add-form-label">Skill Name</label>
              <input
                className="add-form-input"
                placeholder="e.g. TensorFlow"
                value={newSkill.name}
                onChange={e => setNewSkill(s => ({ ...s, name: e.target.value }))}
              />
            </div>

            <div className="add-form-field">
              <label className="add-form-label">Category</label>
              <select
                className="add-form-select"
                value={newSkill.category}
                onChange={e => setNewSkill(s => ({ ...s, category: e.target.value }))}
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="add-form-field">
              <label className="add-form-label">Level ({newSkill.level}%)</label>
              <input
                className="add-form-input"
                type="range"
                min="10"
                max="100"
                step="5"
                value={newSkill.level}
                onChange={e => setNewSkill(s => ({ ...s, level: e.target.value }))}
                style={{ padding: '4px 0', background: 'transparent', border: 'none' }}
              />
            </div>

          </div>

          <div className="add-form-actions">
            <button
              className="btn-confirm"
              onClick={addSkill}
              disabled={!newSkill.name}
            >
              Add Skill
            </button>
            <button
              className="btn-cancel"
              onClick={() => setShowAdd(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Skills list */}
      <div className="skill-list">
        {skills.map((skill, idx) => (
          <div key={idx} className="skill-row">

            <div className="skill-row-header">
              <div className="skill-row-left">
                <span className="skill-row-name">{skill.name}</span>
                <span className="skill-row-category">{skill.category}</span>
                <div className="skill-row-bar">
                  <div
                    className="skill-row-fill"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="skill-row-pct">{skill.level}%</span>
              </div>

              <div className="skill-row-actions">
                <button
                  className="btn-edit"
                  onClick={() => editingIdx === idx ? setEditingIdx(null) : startEdit(idx)}
                >
                  {editingIdx === idx ? 'Cancel' : 'Edit'}
                </button>
                <button
                  className="btn-delete"
                  onClick={() => deleteSkill(idx)}
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Inline edit */}
            {editingIdx === idx && (
              <div className="inline-edit">

                <div className="inline-field">
                  <label className="inline-label">Name</label>
                  <input
                    className="inline-input"
                    value={editForm.name || ''}
                    onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                  />
                </div>

                <div className="inline-field">
                  <label className="inline-label">Category</label>
                  <select
                    className="inline-select"
                    value={editForm.category || ''}
                    onChange={e => setEditForm(f => ({ ...f, category: e.target.value }))}
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="inline-field">
                  <label className="inline-label">Level ({editForm.level}%)</label>
                  <input
                    className="inline-input"
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={editForm.level || 80}
                    onChange={e => setEditForm(f => ({ ...f, level: e.target.value }))}
                    style={{ padding: '4px 0', background: 'transparent', border: 'none' }}
                  />
                </div>

                <div className="inline-actions">
                  <button className="btn-confirm" onClick={saveEdit}>
                    Save
                  </button>
                </div>

              </div>
            )}

          </div>
        ))}
      </div>
    </>
  )
}