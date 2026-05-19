import { useState } from 'react'

const CV_KEY = 'admin_cv_url'

export default function CVEditor() {

  // CV can be either a URL link or a base64 uploaded file
  const [cvUrl,    setCvUrl]    = useState(
    localStorage.getItem(CV_KEY) || ''
  )
  const [inputUrl, setInputUrl] = useState(
    localStorage.getItem(CV_KEY) || ''
  )
  const [saved,    setSaved]    = useState(false)
  const [uploading,setUploading]= useState(false)
  const [fileName, setFileName] = useState('')

  // ── Save a URL link ───────────────────────────────────────
  const saveUrl = () => {
    if (!inputUrl.trim()) return
    localStorage.setItem(CV_KEY, inputUrl.trim())
    setCvUrl(inputUrl.trim())
    showSaved()
  }

  // ── Handle file upload → convert to base64 ───────────────
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Only allow PDF
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file only.')
      return
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large. Maximum size is 5MB.')
      return
    }

    setUploading(true)
    setFileName(file.name)

    const reader = new FileReader()

    reader.onload = (event) => {
      const base64 = event.target.result
      // base64 = "data:application/pdf;base64,JVBERi0..."
      localStorage.setItem(CV_KEY, base64)
      setCvUrl(base64)
      setInputUrl(base64)
      setUploading(false)
      showSaved()
    }

    reader.onerror = () => {
      alert('Failed to read file. Try again.')
      setUploading(false)
    }

    reader.readAsDataURL(file)
  }

  // ── Remove CV ─────────────────────────────────────────────
  const removeCV = () => {
    if (!window.confirm('Remove the CV?')) return
    localStorage.removeItem(CV_KEY)
    setCvUrl('')
    setInputUrl('')
    setFileName('')
  }

  const showSaved = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const isBase64 = cvUrl.startsWith('data:')
  const hasCV    = cvUrl.trim() !== ''

  return (
    <>
      <style>{`
        .cv-editor-section {
          margin-bottom: 32px;
        }
        .cv-editor-label {
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

        /* ── Current CV status ────────────────────────────── */
        .cv-status {
          display:       flex;
          align-items:   center;
          gap:           14px;
          padding:       16px 20px;
          border-radius: 12px;
          margin-bottom: 24px;
          border:        1px solid var(--border);
          background:    var(--card);
        }
        .cv-status.has-cv {
          border-color: rgba(0,229,200,0.3);
          background:   rgba(0,229,200,0.04);
        }
        .cv-status-icon { font-size: 28px; }
        .cv-status-body {
          flex:           1;
          display:        flex;
          flex-direction: column;
          gap:            3px;
          min-width:      0;
        }
        .cv-status-title {
          font-size:   14px;
          font-weight: 500;
          color:       var(--text);
        }
        .cv-status-sub {
          font-size:     12px;
          color:         var(--text3);
          font-family:   var(--ff-mono);
          white-space:   nowrap;
          overflow:      hidden;
          text-overflow: ellipsis;
        }
        .cv-status-badge {
          font-family:    var(--ff-mono);
          font-size:      10px;
          letter-spacing: 1px;
          padding:        4px 10px;
          border-radius:  20px;
          flex-shrink:    0;
        }
        .cv-status-badge.active {
          background: rgba(0,229,200,0.12);
          border:     1px solid rgba(0,229,200,0.3);
          color:      var(--accent2);
        }
        .cv-status-badge.empty {
          background: rgba(255,255,255,0.04);
          border:     1px solid var(--border);
          color:      var(--text3);
        }

        /* ── Upload box ───────────────────────────────────── */
        .upload-box {
          border:          2px dashed var(--border2);
          border-radius:   14px;
          padding:         32px 24px;
          text-align:      center;
          cursor:          pointer;
          transition:      all var(--t);
          margin-bottom:   20px;
          position:        relative;
        }
        .upload-box:hover {
          border-color: var(--accent);
          background:   rgba(0,200,255,0.03);
        }
        .upload-box input[type="file"] {
          position: absolute;
          inset:    0;
          opacity:  0;
          cursor:   pointer;
          width:    100%;
          height:   100%;
        }
        .upload-icon    { font-size: 32px; margin-bottom: 10px; }
        .upload-title {
          font-size:     14px;
          color:         var(--text);
          font-weight:   500;
          margin-bottom: 6px;
        }
        .upload-sub {
          font-size:   12px;
          color:       var(--text3);
          font-family: var(--ff-mono);
        }
        .upload-filename {
          margin-top:    10px;
          font-size:     12px;
          color:         var(--accent2);
          font-family:   var(--ff-mono);
        }

        /* ── Divider ──────────────────────────────────────── */
        .cv-or {
          display:     flex;
          align-items: center;
          gap:         12px;
          margin:      20px 0;
          color:       var(--text3);
          font-size:   12px;
          font-family: var(--ff-mono);
        }
        .cv-or::before,
        .cv-or::after {
          content:    '';
          flex:       1;
          height:     1px;
          background: var(--border);
        }

        /* ── URL input row ────────────────────────────────── */
        .url-row {
          display: flex;
          gap:     10px;
        }
        .url-input {
          flex:          1;
          padding:       10px 14px;
          background:    var(--navy3);
          border:        1px solid var(--border);
          border-radius: 8px;
          color:         var(--text);
          font-family:   var(--ff-mono);
          font-size:     13px;
          outline:       none;
          transition:    border-color var(--t);
        }
        .url-input:focus { border-color: var(--accent); }
        .url-input::placeholder { color: var(--text3); }

        /* ── Action buttons ───────────────────────────────── */
        .cv-actions {
          display:     flex;
          gap:         10px;
          margin-top:  20px;
          align-items: center;
          flex-wrap:   wrap;
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
        .btn-remove {
          padding:       10px 20px;
          background:    transparent;
          color:         #ff6b6b;
          border:        1px solid rgba(255,80,80,0.25);
          border-radius: 8px;
          font-family:   var(--ff-body);
          font-size:     14px;
          cursor:        pointer;
          transition:    all var(--t);
        }
        .btn-remove:hover { background: rgba(255,80,80,0.08); }
        .btn-preview {
          padding:         10px 20px;
          background:      transparent;
          color:           var(--accent2);
          border:          1px solid rgba(0,229,200,0.25);
          border-radius:   8px;
          font-family:     var(--ff-body);
          font-size:       14px;
          cursor:          pointer;
          transition:      all var(--t);
          text-decoration: none;
          display:         inline-flex;
          align-items:     center;
          gap:             6px;
        }
        .btn-preview:hover { background: rgba(0,229,200,0.08); }
        .save-notice {
          font-family:  var(--ff-mono);
          font-size:    12px;
          color:        var(--accent2);
          letter-spacing: 0.5px;
        }
      `}</style>

      {/* ── Current Status ──────────────────────────────────── */}
      <div className="cv-editor-section">
        <span className="cv-editor-label">Current CV Status</span>

        <div className={`cv-status${hasCV ? ' has-cv' : ''}`}>
          <span className="cv-status-icon">
            {hasCV ? '📄' : '📭'}
          </span>
          <div className="cv-status-body">
            <span className="cv-status-title">
              {hasCV ? 'CV is live on portfolio' : 'No CV uploaded yet'}
            </span>
            <span className="cv-status-sub">
              {hasCV
                ? isBase64
                  ? fileName || 'Uploaded PDF file'
                  : cvUrl
                : 'Upload a PDF or add a link below'
              }
            </span>
          </div>
          <span className={`cv-status-badge ${hasCV ? 'active' : 'empty'}`}>
            {hasCV ? 'Active' : 'Empty'}
          </span>
        </div>
      </div>

      {/* ── Upload PDF ──────────────────────────────────────── */}
      <div className="cv-editor-section">
        <span className="cv-editor-label">Upload PDF File</span>

        <div className="upload-box">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            disabled={uploading}
          />
          <div className="upload-icon">
            {uploading ? '⏳' : '📤'}
          </div>
          <p className="upload-title">
            {uploading ? 'Uploading...' : 'Click or drag PDF here'}
          </p>
          <p className="upload-sub">
            PDF only — max 5MB
          </p>
          {fileName && (
            <p className="upload-filename">{fileName}</p>
          )}
        </div>
      </div>

      {/* ── OR divider ──────────────────────────────────────── */}
      <div className="cv-or">OR</div>

      {/* ── Link URL ────────────────────────────────────────── */}
      <div className="cv-editor-section">
        <span className="cv-editor-label">Paste a Link Instead</span>

        <div className="url-row">
          <input
            className="url-input"
            type="url"
            placeholder="https://drive.google.com/your-cv-link"
            value={isBase64 ? '' : inputUrl}
            onChange={e => setInputUrl(e.target.value)}
          />
          <button className="btn-save" onClick={saveUrl}>
            Save Link
          </button>
        </div>
      </div>

      {/* ── Actions ─────────────────────────────────────────── */}
      <div className="cv-actions">
        {saved && (
          <span className="save-notice">Saved successfully</span>
        )}
        {hasCV && (
          <>
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-preview"
              download={isBase64 ? 'CV.pdf' : undefined}
            >
              Preview CV
            </a>
            <button className="btn-remove" onClick={removeCV}>
              Remove CV
            </button>
          </>
        )}
      </div>
    </>
  )
}