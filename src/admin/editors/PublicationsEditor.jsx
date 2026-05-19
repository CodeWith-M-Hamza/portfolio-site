import { useState } from 'react'
import { useAdminData } from '../useAdminData'

// Empty publication template for the Add form
const EMPTY_PUB = {
  id:      Date.now(),
  title:   '',
  journal: '',
  authors: '',
  year:    2025,
  tags:    [],
  url:     '#',
}

export default function PublicationsEditor() {

  const { data: pubs, update, reset } = useAdminData('publications')

  // Which pub is being edited (null = none)
  const [editingId,  setEditingId]  = useState(null)

  // Form state for editing
  const [editForm,   setEditForm]   = useState({})

  // Whether Add New form is visible
  const [showAdd,    setShowAdd]    = useState(false)

  // New publication form
  const [newPub,     setNewPub]     = useState({ ...EMPTY_PUB })

  const [saved,      setSaved]      = useState(false)

  // ── Start editing a publication ──────────────────────────
  const startEdit = (pub) => {
    setEditingId(pub.id)
    setEditForm({ ...pub, tags: pub.tags.join(', ') })
    setShowAdd(false)
  }

  // ── Cancel editing ────────────────────────────────────────
  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  // ── Save edited publication ───────────────────────────────
  const saveEdit = () => {
    const updated = pubs.map(p => {
      if (p.id !== editingId) return p
      return {
        ...p,
        ...editForm,
        // Convert comma-separated tag string back to array
        tags: editForm.tags
          .split(',')
          .map(t => t.trim())
          .filter(Boolean),
        year: Number(editForm.year),
      }
    })
    update(updated)
    setEditingId(null)
    showSaved()
  }

  // ── Delete a publication ──────────────────────────────────
  const deletePub = (id) => {
    if (!window.confirm('Delete this publication?')) return
    update(pubs.filter(p => p.id !== id))
    showSaved()
  }

  // ── Add new publication ───────────────────────────────────
  const addPub = () => {
    const pub = {
      ...newPub,
      id:   Date.now(),
      tags: newPub.tags
        .toString()
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
      year: Number(newPub.year),
    }
    update([...pubs, pub])
    setNewPub({ ...EMPTY_PUB })
    setShowAdd(false)
    showSaved()
  }

  const showSaved = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleReset = () => {
    if (window.confirm('Reset all publications to default data?')) {
      reset()
      setEditingId(null)
      setShowAdd(false)
    }
  }

  return (
    <>
      <style>{`
        .pub-editor-toolbar {
          display:         flex;
          align-items:     center;
          justify-content: space-between;
          margin-bottom:   20px;
          flex-wrap:       wrap;
          gap:             12px;
        }
        .pub-count {
          font-family:    var(--ff-mono);
          font-size:      12px;
          color:          var(--text3);
          letter-spacing: 1px;
        }
        .pub-count span { color: var(--accent); }
        .toolbar-right {
          display:     flex;
          gap:         10px;
          align-items: center;
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
        .save-notice {
          font-family:  var(--ff-mono);
          font-size:    12px;
          color:        var(--accent2);
          letter-spacing: 0.5px;
        }

        /* ── Add form ───────────────────────────────────── */
        .add-form {
          padding:       24px;
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
          margin-bottom:  4px;
        }
        .add-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .add-form-field {
          display:        flex;
          flex-direction: column;
          gap:            5px;
        }
        .add-form-field.full { grid-column: 1 / -1; }
        .add-form-label {
          font-family:    var(--ff-mono);
          font-size:      10px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color:          var(--text3);
        }
        .add-form-input {
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
        .add-form-input:focus { border-color: var(--accent); }
        .add-form-actions {
          display: flex;
          gap: 10px;
          margin-top: 4px;
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

        /* ── Publication rows ───────────────────────────── */
        .pub-list {
          display:        flex;
          flex-direction: column;
          gap:            10px;
        }

        .pub-row {
          padding:       16px 20px;
          background:    var(--card);
          border:        1px solid var(--border);
          border-radius: 12px;
          transition:    border-color var(--t);
        }
        .pub-row:hover { border-color: var(--border2); }

        .pub-row-header {
          display:         flex;
          align-items:     flex-start;
          justify-content: space-between;
          gap:             12px;
        }

        .pub-row-title {
          font-size:   14px;
          font-weight: 500;
          color:       var(--text);
          line-height: 1.4;
          flex:        1;
        }

        .pub-row-meta {
          display:     flex;
          align-items: center;
          gap:         8px;
          margin-top:  8px;
          flex-wrap:   wrap;
        }

        .pub-row-year {
          font-family:    var(--ff-mono);
          font-size:      11px;
          color:          var(--navy);
          background:     var(--accent);
          padding:        2px 8px;
          border-radius:  20px;
        }

        .pub-row-journal {
          font-size:  12px;
          color:      var(--text3);
          font-style: italic;
        }

        .pub-row-actions {
          display:    flex;
          gap:        6px;
          flex-shrink: 0;
        }

        .btn-edit {
          padding:       5px 12px;
          background:    transparent;
          color:         var(--accent);
          border:        1px solid var(--border2);
          border-radius: 6px;
          font-size:     12px;
          cursor:        pointer;
          font-family:   var(--ff-mono);
          transition:    all var(--t);
        }
        .btn-edit:hover { background: rgba(0,200,255,0.08); }

        .btn-delete {
          padding:       5px 12px;
          background:    transparent;
          color:         #ff6b6b;
          border:        1px solid rgba(255,80,80,0.25);
          border-radius: 6px;
          font-size:     12px;
          cursor:        pointer;
          font-family:   var(--ff-mono);
          transition:    all var(--t);
        }
        .btn-delete:hover { background: rgba(255,80,80,0.08); }

        /* ── Inline edit form ───────────────────────────── */
        .inline-edit {
          margin-top:    14px;
          padding:       16px;
          background:    var(--navy3);
          border-radius: 8px;
          border:        1px solid var(--border2);
          display:       flex;
          flex-direction: column;
          gap:           10px;
        }
        .inline-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .inline-field {
          display:        flex;
          flex-direction: column;
          gap:            4px;
        }
        .inline-field.full { grid-column: 1 / -1; }
        .inline-label {
          font-family:    var(--ff-mono);
          font-size:      10px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color:          var(--text3);
        }
        .inline-input {
          padding:       8px 12px;
          background:    var(--navy2);
          border:        1px solid var(--border);
          border-radius: 6px;
          color:         var(--text);
          font-family:   var(--ff-body);
          font-size:     13px;
          outline:       none;
          transition:    border-color var(--t);
        }
        .inline-input:focus { border-color: var(--accent); }
        .inline-actions {
          display: flex;
          gap: 8px;
        }
      `}</style>

      {/* Toolbar */}
      <div className="pub-editor-toolbar">
        <p className="pub-count">
          <span>{pubs.length}</span> publications
        </p>
        <div className="toolbar-right">
          {saved && <span className="save-notice">Saved</span>}
          <button
            className="btn-sm-reset"
            onClick={handleReset}
          >
            Reset All
          </button>
          <button
            className="btn-add"
            onClick={() => { setShowAdd(s => !s); setEditingId(null) }}
          >
            {showAdd ? 'Cancel' : '+ Add Publication'}
          </button>
        </div>
      </div>

      {/* Add New Form */}
      {showAdd && (
        <div className="add-form">
          <p className="add-form-title">New Publication</p>
          <div className="add-form-grid">

            <div className="add-form-field full">
              <label className="add-form-label">Title</label>
              <input
                className="add-form-input"
                placeholder="Publication title"
                value={newPub.title}
                onChange={e => setNewPub(p => ({ ...p, title: e.target.value }))}
              />
            </div>

            <div className="add-form-field full">
              <label className="add-form-label">Journal</label>
              <input
                className="add-form-input"
                placeholder="Journal name and volume"
                value={newPub.journal}
                onChange={e => setNewPub(p => ({ ...p, journal: e.target.value }))}
              />
            </div>

            <div className="add-form-field full">
              <label className="add-form-label">Authors</label>
              <input
                className="add-form-input"
                placeholder="Author 1, Author 2, ..."
                value={newPub.authors}
                onChange={e => setNewPub(p => ({ ...p, authors: e.target.value }))}
              />
            </div>

            <div className="add-form-field">
              <label className="add-form-label">Year</label>
              <input
                className="add-form-input"
                type="number"
                placeholder="2025"
                value={newPub.year}
                onChange={e => setNewPub(p => ({ ...p, year: e.target.value }))}
              />
            </div>

            <div className="add-form-field">
              <label className="add-form-label">Tags (comma separated)</label>
              <input
                className="add-form-input"
                placeholder="Machine Learning, NLP"
                value={Array.isArray(newPub.tags) ? newPub.tags.join(', ') : newPub.tags}
                onChange={e => setNewPub(p => ({ ...p, tags: e.target.value }))}
              />
            </div>

            <div className="add-form-field full">
              <label className="add-form-label">Paper URL</label>
              <input
                className="add-form-input"
                placeholder="https://doi.org/..."
                value={newPub.url}
                onChange={e => setNewPub(p => ({ ...p, url: e.target.value }))}
              />
            </div>

          </div>

          <div className="add-form-actions">
            <button
              className="btn-confirm"
              onClick={addPub}
              disabled={!newPub.title}
            >
              Add Publication
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

      {/* Publications list */}
      <div className="pub-list">
        {pubs.map(pub => (
          <div key={pub.id} className="pub-row">

            <div className="pub-row-header">
              <p className="pub-row-title">{pub.title}</p>
              <div className="pub-row-actions">
                <button
                  className="btn-edit"
                  onClick={() => editingId === pub.id ? cancelEdit() : startEdit(pub)}
                >
                  {editingId === pub.id ? 'Cancel' : 'Edit'}
                </button>
                <button
                  className="btn-delete"
                  onClick={() => deletePub(pub.id)}
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="pub-row-meta">
              <span className="pub-row-year">{pub.year}</span>
              <span className="pub-row-journal">{pub.journal}</span>
            </div>

            {/* Inline edit form */}
            {editingId === pub.id && (
              <div className="inline-edit">
                <div className="inline-row">

                  <div className="inline-field full">
                    <label className="inline-label">Title</label>
                    <input
                      className="inline-input"
                      value={editForm.title || ''}
                      onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                    />
                  </div>

                  <div className="inline-field full">
                    <label className="inline-label">Journal</label>
                    <input
                      className="inline-input"
                      value={editForm.journal || ''}
                      onChange={e => setEditForm(f => ({ ...f, journal: e.target.value }))}
                    />
                  </div>

                  <div className="inline-field full">
                    <label className="inline-label">Authors</label>
                    <input
                      className="inline-input"
                      value={editForm.authors || ''}
                      onChange={e => setEditForm(f => ({ ...f, authors: e.target.value }))}
                    />
                  </div>

                  <div className="inline-field">
                    <label className="inline-label">Year</label>
                    <input
                      className="inline-input"
                      type="number"
                      value={editForm.year || ''}
                      onChange={e => setEditForm(f => ({ ...f, year: e.target.value }))}
                    />
                  </div>

                  <div className="inline-field">
                    <label className="inline-label">Tags (comma separated)</label>
                    <input
                      className="inline-input"
                      value={editForm.tags || ''}
                      onChange={e => setEditForm(f => ({ ...f, tags: e.target.value }))}
                    />
                  </div>

                  <div className="inline-field full">
                    <label className="inline-label">Paper URL</label>
                    <input
                      className="inline-input"
                      value={editForm.url || ''}
                      onChange={e => setEditForm(f => ({ ...f, url: e.target.value }))}
                    />
                  </div>

                </div>

                <div className="inline-actions">
                  <button className="btn-confirm" onClick={saveEdit}>
                    Save
                  </button>
                  <button className="btn-cancel" onClick={cancelEdit}>
                    Cancel
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