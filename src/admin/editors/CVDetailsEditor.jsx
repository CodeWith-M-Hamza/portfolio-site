import { useState } from 'react'

// ── Storage key ───────────────────────────────────────────────
const STORAGE_KEY = 'admin_cv_details'

// ── Default empty structure ───────────────────────────────────
const DEFAULT_DATA = {
  education:      [],
  experience:     [],
  awards:         [],
  certifications: [],
}

// ── Read from localStorage ────────────────────────────────────
const readData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : DEFAULT_DATA
  } catch {
    return DEFAULT_DATA
  }
}

// ── Write to localStorage ─────────────────────────────────────
const writeData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// ── Section config — defines fields for each section ─────────
const SECTIONS = [
  {
    key:   'education',
    label: 'Education',
    icon:  '🎓',
    fields: [
      {
        name:        'degree',
        label:       'Degree / Qualification',
        placeholder: 'MS Computer Science',
        full:        true,
      },
      {
        name:        'institution',
        label:       'Institution',
        placeholder: 'COMSATS University Islamabad',
        full:        true,
      },
      {
        name:        'year',
        label:       'Year',
        placeholder: '2023 — Present',
        full:        false,
      },
      {
        name:        'grade',
        label:       'Grade / CGPA (optional)',
        placeholder: 'CGPA: 3.5 / 4.0',
        full:        false,
      },
      {
        name:        'description',
        label:       'Description (optional)',
        placeholder: 'Specialization in Machine Learning...',
        full:        true,
      },
    ],
  },
  {
    key:   'experience',
    label: 'Experience',
    icon:  '💼',
    fields: [
      {
        name:        'role',
        label:       'Role / Position',
        placeholder: 'Machine Learning Researcher',
        full:        true,
      },
      {
        name:        'place',
        label:       'Organization',
        placeholder: 'COMSATS University Islamabad',
        full:        true,
      },
      {
        name:        'year',
        label:       'Year',
        placeholder: '2023 — Present',
        full:        false,
      },
      {
        name:        'description',
        label:       'Description',
        placeholder: 'Responsibilities and achievements...',
        full:        true,
      },
    ],
  },
  {
    key:   'awards',
    label: 'Awards',
    icon:  '🏆',
    fields: [
      {
        name:        'title',
        label:       'Award Title',
        placeholder: 'Research Excellence Award',
        full:        true,
      },
      {
        name:        'issuer',
        label:       'Issued By',
        placeholder: 'COMSATS University Islamabad',
        full:        false,
      },
      {
        name:        'year',
        label:       'Year',
        placeholder: '2024',
        full:        false,
      },
      {
        name:        'description',
        label:       'Description (optional)',
        placeholder: 'Brief description...',
        full:        true,
      },
    ],
  },
  {
    key:   'certifications',
    label: 'Certifications',
    icon:  '📜',
    fields: [
      {
        name:        'title',
        label:       'Certificate Name',
        placeholder: 'Deep Learning Specialization',
        full:        true,
      },
      {
        name:        'issuer',
        label:       'Issued By',
        placeholder: 'Coursera — deeplearning.ai',
        full:        false,
      },
      {
        name:        'year',
        label:       'Year',
        placeholder: '2023',
        full:        false,
      },
      {
        name:        'description',
        label:       'Description (optional)',
        placeholder: 'Brief description of what you learned...',
        full:        true,
      },
    ],
  },
]

// ── Get display title for an item ─────────────────────────────
const getItemTitle = (sectionKey, item) => {
  switch (sectionKey) {
    case 'education':      return item.degree      || 'Untitled'
    case 'experience':     return item.role        || 'Untitled'
    case 'awards':         return item.title       || 'Untitled'
    case 'certifications': return item.title       || 'Untitled'
    default:               return 'Untitled'
  }
}

const getItemSub = (sectionKey, item) => {
  switch (sectionKey) {
    case 'education':      return item.institution || ''
    case 'experience':     return item.place       || ''
    case 'awards':         return item.issuer      || ''
    case 'certifications': return item.issuer      || ''
    default:               return ''
  }
}

// ============================================================
// 📝 Single Section Editor
// ============================================================
function SectionEditor({ section, data, onUpdate }) {

  const items = data[section.key] || []

  const [showAdd,   setShowAdd]   = useState(false)
  const [newForm,   setNewForm]   = useState({})
  const [editingId, setEditingId] = useState(null)
  const [editForm,  setEditForm]  = useState({})

  // ── Add new item ─────────────────────────────────────────
  const handleAdd = () => {
    // Check required first field is filled
    const firstField = section.fields[0].name
    if (!newForm[firstField]?.trim()) return

    const newItem = { ...newForm, id: Date.now() }
    const updated = {
      ...data,
      [section.key]: [...items, newItem],
    }
    onUpdate(updated)
    setNewForm({})
    setShowAdd(false)
  }

  // ── Start editing ────────────────────────────────────────
  const startEdit = (item) => {
    setEditingId(item.id)
    setEditForm({ ...item })
    setShowAdd(false)
  }

  // ── Save edit ────────────────────────────────────────────
  const saveEdit = () => {
    const updated = {
      ...data,
      [section.key]: items.map(item =>
        item.id === editingId ? { ...editForm } : item
      ),
    }
    onUpdate(updated)
    setEditingId(null)
    setEditForm({})
  }

  // ── Cancel edit ──────────────────────────────────────────
  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  // ── Delete item ──────────────────────────────────────────
  const deleteItem = (id) => {
    if (!window.confirm('Delete this entry?')) return
    const updated = {
      ...data,
      [section.key]: items.filter(item => item.id !== id),
    }
    onUpdate(updated)
    if (editingId === id) cancelEdit()
  }

  // ── Move item up/down ────────────────────────────────────
  const moveItem = (index, direction) => {
    const newItems = [...items]
    const target   = index + direction
    if (target < 0 || target >= newItems.length) return
    ;[newItems[index], newItems[target]] = [newItems[target], newItems[index]]
    onUpdate({ ...data, [section.key]: newItems })
  }

  return (
    <div className="section-editor">

      {/* Section header */}
      <div className="se-header">
        <div className="se-header-left">
          <span className="se-icon">{section.icon}</span>
          <div>
            <h3 className="se-title">{section.label}</h3>
            <span className="se-count">
              {items.length} {items.length === 1 ? 'entry' : 'entries'}
            </span>
          </div>
        </div>
        <button
          className="btn-add-item"
          onClick={() => {
            setShowAdd(s => !s)
            cancelEdit()
          }}
        >
          {showAdd ? 'Cancel' : '+ Add'}
        </button>
      </div>

      {/* Add new form */}
      {showAdd && (
        <div className="item-form add-form-box">
          <p className="form-box-label">New {section.label} Entry</p>

          <div className="form-grid">
            {section.fields.map(field => (
              <div
                key={field.name}
                className={`form-field${field.full ? ' full' : ''}`}
              >
                <label className="form-label">{field.label}</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder={field.placeholder}
                  value={newForm[field.name] || ''}
                  onChange={e => setNewForm(f => ({
                    ...f,
                    [field.name]: e.target.value,
                  }))}
                />
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button
              className="btn-confirm"
              onClick={handleAdd}
              disabled={!newForm[section.fields[0].name]?.trim()}
            >
              Add Entry
            </button>
            <button
              className="btn-cancel"
              onClick={() => {
                setShowAdd(false)
                setNewForm({})
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Items list */}
      {items.length === 0 ? (
        <div className="se-empty">
          No {section.label.toLowerCase()} entries yet.
          Click + Add to get started.
        </div>
      ) : (
        <div className="items-list">
          {items.map((item, index) => (
            <div key={item.id} className="item-row">

              {/* Row header */}
              <div className="item-row-header">

                <div className="item-row-left">
                  <div className="item-row-info">
                    <span className="item-row-title">
                      {getItemTitle(section.key, item)}
                    </span>
                    {getItemSub(section.key, item) && (
                      <span className="item-row-sub">
                        {getItemSub(section.key, item)}
                      </span>
                    )}
                  </div>
                  {item.year && (
                    <span className="item-row-year">{item.year}</span>
                  )}
                </div>

                <div className="item-row-actions">

                  {/* Move up/down */}
                  <button
                    className="btn-move"
                    onClick={() => moveItem(index, -1)}
                    disabled={index === 0}
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    className="btn-move"
                    onClick={() => moveItem(index, 1)}
                    disabled={index === items.length - 1}
                    title="Move down"
                  >
                    ↓
                  </button>

                  {/* Edit */}
                  <button
                    className="btn-edit"
                    onClick={() =>
                      editingId === item.id
                        ? cancelEdit()
                        : startEdit(item)
                    }
                  >
                    {editingId === item.id ? 'Cancel' : 'Edit'}
                  </button>

                  {/* Delete */}
                  <button
                    className="btn-delete"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>

                </div>
              </div>

              {/* Inline edit form */}
              {editingId === item.id && (
                <div className="item-form edit-form-box">
                  <p className="form-box-label">
                    Editing: {getItemTitle(section.key, item)}
                  </p>

                  <div className="form-grid">
                    {section.fields.map(field => (
                      <div
                        key={field.name}
                        className={`form-field${field.full ? ' full' : ''}`}
                      >
                        <label className="form-label">{field.label}</label>
                        <input
                          className="form-input"
                          type="text"
                          placeholder={field.placeholder}
                          value={editForm[field.name] || ''}
                          onChange={e => setEditForm(f => ({
                            ...f,
                            [field.name]: e.target.value,
                          }))}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="form-actions">
                    <button
                      className="btn-confirm"
                      onClick={saveEdit}
                    >
                      Save Changes
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================================
// 📋 CVDetailsEditor — main export
// ============================================================
export default function CVDetailsEditor() {

  const [data,  setData]  = useState(readData)
  const [saved, setSaved] = useState(false)

  // ── Update data + save to localStorage ──────────────────
  const handleUpdate = (newData) => {
    writeData(newData)
    setData(newData)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // ── Reset all CV details ─────────────────────────────────
  const handleReset = () => {
    if (!window.confirm(
      'This will delete ALL CV entries. Are you sure?'
    )) return
    writeData(DEFAULT_DATA)
    setData(DEFAULT_DATA)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <>
      <style>{`

        /* ── Toolbar ──────────────────────────────────────── */
        .cvd-toolbar {
          display:         flex;
          align-items:     center;
          justify-content: space-between;
          margin-bottom:   24px;
          flex-wrap:       wrap;
          gap:             10px;
        }
        .cvd-toolbar-left {
          font-size:   13px;
          color:       var(--text3);
          font-family: var(--ff-mono);
        }
        .cvd-toolbar-right {
          display:     flex;
          gap:         10px;
          align-items: center;
        }
        .saved-notice {
          font-family:    var(--ff-mono);
          font-size:      12px;
          color:          var(--accent2);
          letter-spacing: 0.5px;
        }
        .btn-reset-all {
          padding:       8px 16px;
          background:    transparent;
          color:         #ff6b6b;
          border:        1px solid rgba(255,80,80,0.25);
          border-radius: 8px;
          font-family:   var(--ff-body);
          font-size:     13px;
          cursor:        pointer;
          transition:    all var(--t);
        }
        .btn-reset-all:hover { background: rgba(255,80,80,0.06); }

        /* ── Section editors ──────────────────────────────── */
        .section-editor {
          margin-bottom:  28px;
          padding:        24px;
          background:     var(--card);
          border:         1px solid var(--border);
          border-radius:  16px;
          transition:     border-color var(--t);
        }
        .section-editor:hover { border-color: var(--border2); }

        /* Section header */
        .se-header {
          display:         flex;
          align-items:     center;
          justify-content: space-between;
          margin-bottom:   16px;
          gap:             12px;
        }
        .se-header-left {
          display:     flex;
          align-items: center;
          gap:         12px;
        }
        .se-icon {
          font-size:       22px;
          width:           44px;
          height:          44px;
          border-radius:   10px;
          background:      rgba(0,200,255,0.06);
          border:          1px solid var(--border);
          display:         flex;
          align-items:     center;
          justify-content: center;
          flex-shrink:     0;
        }
        .se-title {
          font-family:  var(--ff-display);
          font-size:    18px;
          font-weight:  600;
          color:        var(--text);
          margin-bottom: 2px;
        }
        .se-count {
          font-family:    var(--ff-mono);
          font-size:      11px;
          letter-spacing: 1px;
          color:          var(--text3);
        }

        /* Add button */
        .btn-add-item {
          padding:       8px 18px;
          background:    var(--accent);
          color:         var(--navy);
          border:        none;
          border-radius: 8px;
          font-family:   var(--ff-body);
          font-size:     13px;
          font-weight:   500;
          cursor:        pointer;
          transition:    all var(--t);
          flex-shrink:   0;
        }
        .btn-add-item:hover { background: #00e8ff; }

        /* Empty state */
        .se-empty {
          padding:       20px;
          text-align:    center;
          font-size:     13px;
          color:         var(--text3);
          font-family:   var(--ff-mono);
          border:        1px dashed var(--border2);
          border-radius: 10px;
          letter-spacing: 0.3px;
        }

        /* ── Form box ─────────────────────────────────────── */
        .item-form {
          border-radius: 10px;
          padding:       16px;
          margin-bottom: 12px;
          display:       flex;
          flex-direction: column;
          gap:           12px;
        }
        .add-form-box {
          background: rgba(0,200,255,0.03);
          border:     1px solid var(--border2);
        }
        .edit-form-box {
          background: var(--navy3);
          border:     1px solid var(--border2);
          margin-top: 12px;
        }
        .form-box-label {
          font-family:    var(--ff-mono);
          font-size:      11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color:          var(--accent);
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .form-field {
          display:        flex;
          flex-direction: column;
          gap:            5px;
        }
        .form-field.full { grid-column: 1 / -1; }
        .form-label {
          font-family:    var(--ff-mono);
          font-size:      10px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color:          var(--text3);
        }
        .form-input {
          padding:       9px 12px;
          background:    var(--navy2);
          border:        1px solid var(--border);
          border-radius: 7px;
          color:         var(--text);
          font-family:   var(--ff-body);
          font-size:     13px;
          outline:       none;
          transition:    border-color var(--t);
          width:         100%;
        }
        .form-input:focus   { border-color: var(--accent); }
        .form-input::placeholder { color: var(--text3); }
        .form-actions {
          display:     flex;
          gap:         8px;
          align-items: center;
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
        .btn-confirm:hover            { background: #00e8ff; }
        .btn-confirm:disabled         {
          opacity: 0.5;
          cursor:  not-allowed;
          background: var(--navy3);
          color: var(--text3);
        }
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
        .btn-cancel:hover {
          color:        var(--text2);
          border-color: var(--border2);
        }

        /* ── Items list ───────────────────────────────────── */
        .items-list {
          display:        flex;
          flex-direction: column;
          gap:            8px;
        }
        .item-row {
          background:    var(--navy3);
          border:        1px solid var(--border);
          border-radius: 10px;
          overflow:      hidden;
          transition:    border-color var(--t);
        }
        .item-row:hover { border-color: var(--border2); }
        .item-row-header {
          display:         flex;
          align-items:     center;
          justify-content: space-between;
          padding:         12px 14px;
          gap:             10px;
        }
        .item-row-left {
          display:     flex;
          align-items: center;
          gap:         10px;
          flex:        1;
          min-width:   0;
        }
        .item-row-info {
          display:        flex;
          flex-direction: column;
          gap:            2px;
          min-width:      0;
          flex:           1;
        }
        .item-row-title {
          font-size:     13px;
          font-weight:   500;
          color:         var(--text);
          white-space:   nowrap;
          overflow:      hidden;
          text-overflow: ellipsis;
        }
        .item-row-sub {
          font-size:  12px;
          color:      var(--accent2);
          font-style: italic;
          white-space:   nowrap;
          overflow:      hidden;
          text-overflow: ellipsis;
        }
        .item-row-year {
          font-family:    var(--ff-mono);
          font-size:      10px;
          color:          var(--navy);
          background:     var(--accent);
          padding:        2px 8px;
          border-radius:  20px;
          white-space:    nowrap;
          flex-shrink:    0;
        }
        .item-row-actions {
          display:    flex;
          gap:        4px;
          flex-shrink: 0;
        }
        .btn-move {
          width:         26px;
          height:        26px;
          background:    transparent;
          border:        1px solid var(--border);
          border-radius: 6px;
          color:         var(--text3);
          font-size:     12px;
          cursor:        pointer;
          transition:    all var(--t);
          display:       flex;
          align-items:   center;
          justify-content: center;
        }
        .btn-move:hover:not(:disabled) {
          border-color: var(--border2);
          color:        var(--text2);
        }
        .btn-move:disabled {
          opacity: 0.25;
          cursor:  not-allowed;
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

        /* ── Responsive ───────────────────────────────────── */
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr; }
          .item-row-actions { flex-wrap: wrap; }
          .btn-move { display: none; }
        }

      `}</style>

      {/* ── Toolbar ─────────────────────────────────────────── */}
      <div className="cvd-toolbar">
        <span className="cvd-toolbar-left">
          All changes save automatically
        </span>
        <div className="cvd-toolbar-right">
          {saved && (
            <span className="saved-notice">Saved</span>
          )}
          <button className="btn-reset-all" onClick={handleReset}>
            Clear All
          </button>
        </div>
      </div>

      {/* ── 4 section editors ───────────────────────────────── */}
      {SECTIONS.map(section => (
        <SectionEditor
          key={section.key}
          section={section}
          data={data}
          onUpdate={handleUpdate}
        />
      ))}

    </>
  )
}