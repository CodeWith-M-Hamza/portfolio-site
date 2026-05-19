// import { useScrollReveal } from '../hooks/useScrollReveal'

// const CV_SECTIONS = [
//   {
//     icon:  '🎓',
//     title: 'Education',
//     desc:  'Degree details, institution, graduation year',
//   },
//   {
//     icon:  '💼',
//     title: 'Experience',
//     desc:  'Research positions, teaching, and academic roles',
//   },
//   {
//     icon:  '🏆',
//     title: 'Awards',
//     desc:  'Honors, scholarships, and academic achievements',
//   },
//   {
//     icon:  '📜',
//     title: 'Certifications',
//     desc:  'Professional certifications and completed courses',
//   },
// ]

// export default function CV() {

//   // Read CV from localStorage — admin uploads it from dashboard
//   const cvUrl    = localStorage.getItem('admin_cv_url') || ''
//   const isBase64 = cvUrl.startsWith('data:')
//   const hasCV    = cvUrl.trim() !== ''

//   const labelRef  = useScrollReveal()
//   const titleRef  = useScrollReveal()
//   const subRef    = useScrollReveal()
//   const cardsRef  = useScrollReveal()
//   const bannerRef = useScrollReveal()

//   return (
//     <>
//       <style>{`

//         .cv {
//           padding: 100px 0;
//         }

//         /* ── Placeholder cards grid ───────────────────────── */
//         .cv-grid {
//           display:               grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap:                   16px;
//           margin-bottom:         40px;
//         }

//         .cv-card {
//           padding:        28px 24px;
//           background:     var(--card);
//           border:         1px solid var(--border);
//           border-radius:  16px;
//           display:        flex;
//           align-items:    flex-start;
//           gap:            16px;
//           transition:     border-color var(--t), transform var(--t);
//           position:       relative;
//           overflow:       hidden;
//         }

//         .cv-card:hover {
//           border-color: var(--border2);
//           transform:    translateY(-3px);
//         }

//         /* Diagonal watermark — only shows if no CV uploaded */
//         .cv-card.no-cv::after {
//           content:        'COMING SOON';
//           position:       absolute;
//           top:            18px;
//           right:          -22px;
//           font-family:    var(--ff-mono);
//           font-size:      9px;
//           letter-spacing: 2px;
//           color:          var(--accent);
//           opacity:        0.25;
//           transform:      rotate(35deg);
//           pointer-events: none;
//         }

//         .cv-card-icon {
//           font-size:       24px;
//           line-height:     1;
//           width:           48px;
//           height:          48px;
//           border-radius:   10px;
//           background:      rgba(0,200,255,0.06);
//           border:          1px solid var(--border);
//           display:         flex;
//           align-items:     center;
//           justify-content: center;
//           flex-shrink:     0;
//         }

//         .cv-card-body {
//           display:        flex;
//           flex-direction: column;
//           gap:            6px;
//         }

//         .cv-card-title {
//           font-family:  var(--ff-display);
//           font-size:    18px;
//           font-weight:  600;
//           color:        var(--text);
//         }

//         .cv-card-desc {
//           font-size:   13px;
//           color:       var(--text3);
//           line-height: 1.6;
//         }

//         /* Shimmer placeholder lines */
//         .cv-placeholder-lines {
//           margin-top:     12px;
//           display:        flex;
//           flex-direction: column;
//           gap:            8px;
//         }

//         .cv-placeholder-line {
//           height:          8px;
//           border-radius:   4px;
//           background:      linear-gradient(
//             90deg,
//             var(--border) 25%,
//             rgba(0,200,255,0.08) 50%,
//             var(--border) 75%
//           );
//           background-size: 200% 100%;
//           animation:       shimmer 2s infinite;
//         }

//         @keyframes shimmer {
//           0%   { background-position:  200% 0; }
//           100% { background-position: -200% 0; }
//         }

//         .cv-placeholder-line:nth-child(2) { width: 75%; }
//         .cv-placeholder-line:nth-child(3) { width: 55%; }

//         /* ── Download banner ──────────────────────────────── */
//         .cv-banner {
//           padding:         32px 36px;
//           background:      var(--card);
//           border:          1px solid var(--border);
//           border-radius:   16px;
//           display:         flex;
//           align-items:     center;
//           justify-content: space-between;
//           gap:             24px;
//           flex-wrap:       wrap;
//           transition:      border-color var(--t);
//         }

//         .cv-banner.has-cv {
//           border-color: rgba(0,229,200,0.25);
//           background:   rgba(0,229,200,0.03);
//         }

//         .cv-banner-left {
//           display:        flex;
//           flex-direction: column;
//           gap:            6px;
//         }

//         .cv-banner-title {
//           font-family:  var(--ff-display);
//           font-size:    22px;
//           font-weight:  600;
//           color:        var(--text);
//         }

//         .cv-banner-sub {
//           font-size:   14px;
//           color:       var(--text3);
//           line-height: 1.5;
//         }

//         .cv-banner-sub.ready {
//           color: var(--accent2);
//         }

//         /* ── Active download button ───────────────────────── */
//         .cv-download-active {
//           display:         inline-flex;
//           align-items:     center;
//           gap:             10px;
//           padding:         13px 28px;
//           border-radius:   10px;
//           border:          none;
//           background:      var(--accent);
//           color:           var(--navy);
//           font-family:     var(--ff-body);
//           font-size:       14px;
//           font-weight:     500;
//           cursor:          pointer;
//           text-decoration: none;
//           transition:      all var(--t);
//           white-space:     nowrap;
//           flex-shrink:     0;
//         }

//         .cv-download-active:hover {
//           background:  #00e8ff;
//           transform:   translateY(-2px);
//         }

//         /* ── Disabled download button ─────────────────────── */
//         .cv-download-btn {
//           display:       inline-flex;
//           align-items:   center;
//           gap:           10px;
//           padding:       13px 28px;
//           border-radius: 10px;
//           border:        1px solid var(--border2);
//           background:    transparent;
//           color:         var(--text3);
//           font-family:   var(--ff-body);
//           font-size:     14px;
//           font-weight:   500;
//           cursor:        not-allowed;
//           position:      relative;
//           white-space:   nowrap;
//           flex-shrink:   0;
//         }

//         /* Tooltip on hover */
//         .cv-download-btn::before {
//           content:        'Upload CV from Admin Dashboard';
//           position:       absolute;
//           bottom:         calc(100% + 8px);
//           left:           50%;
//           transform:      translateX(-50%);
//           background:     var(--navy3);
//           border:         1px solid var(--border2);
//           color:          var(--text2);
//           font-size:      12px;
//           padding:        6px 14px;
//           border-radius:  8px;
//           white-space:    nowrap;
//           opacity:        0;
//           pointer-events: none;
//           transition:     opacity var(--t);
//           font-family:    var(--ff-mono);
//           letter-spacing: 0.5px;
//         }

//         .cv-download-btn::after {
//           content:        '';
//           position:       absolute;
//           bottom:         calc(100% + 2px);
//           left:           50%;
//           transform:      translateX(-50%);
//           border:         5px solid transparent;
//           border-top-color: var(--border2);
//           opacity:        0;
//           pointer-events: none;
//           transition:     opacity var(--t);
//         }

//         .cv-download-btn:hover::before,
//         .cv-download-btn:hover::after {
//           opacity: 1;
//         }

//         /* ── Responsive ───────────────────────────────────── */
//         @media (max-width: 640px) {
//           .cv-grid {
//             grid-template-columns: 1fr;
//           }
//           .cv-banner {
//             flex-direction: column;
//             align-items:    flex-start;
//           }
//         }

//       `}</style>

//       <section className="cv section" id="cv">
//         <div className="container">

//           {/* Section header */}
//           <p  className="section-label reveal" ref={labelRef}>
//             Curriculum Vitae
//           </p>
//           <h2 className="section-title reveal" ref={titleRef}>
//             Academic Profile
//           </h2>
//           <p  className="section-sub reveal" ref={subRef}>
//             {hasCV
//               ? 'Full CV is available for download below.'
//               : 'Full CV details are being prepared and will be available here shortly.'
//             }
//           </p>

//           {/* Placeholder section cards */}
//           <div className="cv-grid reveal" ref={cardsRef}>
//             {CV_SECTIONS.map(section => (
//               <div
//                 key={section.title}
//                 className={`cv-card${hasCV ? '' : ' no-cv'}`}
//               >
//                 <div className="cv-card-icon">{section.icon}</div>

//                 <div className="cv-card-body">
//                   <h3 className="cv-card-title">{section.title}</h3>
//                   <p  className="cv-card-desc">{section.desc}</p>

//                   {/* Only show shimmer if no CV uploaded */}
//                   {!hasCV && (
//                     <div className="cv-placeholder-lines">
//                       <div className="cv-placeholder-line" />
//                       <div className="cv-placeholder-line" />
//                       <div className="cv-placeholder-line" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Download banner */}
//           <div
//             className={`cv-banner reveal${hasCV ? ' has-cv' : ''}`}
//             ref={bannerRef}
//           >
//             <div className="cv-banner-left">
//               <h3 className="cv-banner-title">Download Full CV</h3>
//               <p className={`cv-banner-sub${hasCV ? ' ready' : ''}`}>
//                 {hasCV
//                   ? 'CV is ready — click to download the full PDF.'
//                   : 'A complete PDF version including education, publications, awards, and research experience will be available soon.'
//                 }
//               </p>
//             </div>

//             {/* Active button if CV exists — disabled if not */}
//             {hasCV ? (
//               <a
//                 href={cvUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="cv-download-active"
//                 download={isBase64
//                   ? 'Muhammad_Usman_Javeed_CV.pdf'
//                   : undefined
//                 }
//               >
//                 <span>📄</span>
//                 Download CV
//               </a>
//             ) : (
//               <button className="cv-download-btn" disabled>
//                 <span>📄</span>
//                 Download CV
//               </button>
//             )}

//           </div>

//         </div>
//       </section>
//     </>
//   )
// }




import { useState, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

// ── Default empty structure ───────────────────────────────────
const DEFAULT_CV = {
  education:      [],
  experience:     [],
  awards:         [],
  certifications: [],
}

// ── Read CV details from localStorage ────────────────────────
const getCvData = () => {
  try {
    const stored = localStorage.getItem('admin_cv_details')
    return stored ? JSON.parse(stored) : DEFAULT_CV
  } catch {
    return DEFAULT_CV
  }
}

// ── Section config ────────────────────────────────────────────
const SECTION_CONFIG = [
  { key: 'education',      icon: '🎓', label: 'Education'      },
  { key: 'experience',     icon: '💼', label: 'Experience'     },
  { key: 'awards',         icon: '🏆', label: 'Awards'         },
  { key: 'certifications', icon: '📜', label: 'Certifications' },
]

// ── Get primary title of an item ──────────────────────────────
const getTitle = (key, item) => {
  switch (key) {
    case 'education':      return item.degree  || ''
    case 'experience':     return item.role    || ''
    case 'awards':         return item.title   || ''
    case 'certifications': return item.title   || ''
    default:               return ''
  }
}

// ── Get subtitle of an item ───────────────────────────────────
const getSub = (key, item) => {
  switch (key) {
    case 'education':      return item.institution || ''
    case 'experience':     return item.place       || ''
    case 'awards':         return item.issuer      || ''
    case 'certifications': return item.issuer      || ''
    default:               return ''
  }
}

// ============================================================
// 📄 CV Component
// ============================================================
export default function CV() {

  // ── Reactive CV data — updates when localStorage changes ──
  const [cvData, setCvData] = useState(getCvData)

  // ── CV download URL ───────────────────────────────────────
  const [cvUrl, setCvUrl] = useState(
    localStorage.getItem('admin_cv_url') || ''
  )

  // ── Listen for changes ────────────────────────────────────
  useEffect(() => {

    // Re-read when user switches back to portfolio tab
    const handleFocus = () => {
      setCvData(getCvData())
      setCvUrl(localStorage.getItem('admin_cv_url') || '')
    }

    // Re-read when admin saves in same browser window
    const handleUpdate = () => {
      setCvData(getCvData())
      setCvUrl(localStorage.getItem('admin_cv_url') || '')
    }

    window.addEventListener('focus',           handleFocus)
    window.addEventListener('cv-data-updated', handleUpdate)

    return () => {
      window.removeEventListener('focus',           handleFocus)
      window.removeEventListener('cv-data-updated', handleUpdate)
    }
  }, [])

  const isBase64 = cvUrl.startsWith('data:')
  const hasCV    = cvUrl.trim() !== ''

  // Check if any CV details have been added
  const hasDetails = SECTION_CONFIG.some(
    s => (cvData[s.key] || []).length > 0
  )

  const labelRef  = useScrollReveal()
  const titleRef  = useScrollReveal()
  const subRef    = useScrollReveal()
  const eduRef    = useScrollReveal()
  const expRef    = useScrollReveal()
  const awardRef  = useScrollReveal()
  const certRef   = useScrollReveal()
  const bannerRef = useScrollReveal()

  const sectionRefs = [eduRef, expRef, awardRef, certRef]

  return (
    <>
      <style>{`

        .cv { padding: 100px 0; }

        /* ── Sections grid ────────────────────────────────── */
        .cv-sections-grid {
          display:               grid;
          grid-template-columns: repeat(2, 1fr);
          gap:                   24px;
          margin-bottom:         40px;
        }

        /* ── Single section block ─────────────────────────── */
        .cv-block {
          display:        flex;
          flex-direction: column;
          gap:            10px;
        }

        /* Section heading */
        .cv-block-heading {
          display:       flex;
          align-items:   center;
          gap:           10px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 4px;
        }

        .cv-block-icon {
          font-size:       18px;
          width:           38px;
          height:          38px;
          border-radius:   10px;
          background:      rgba(0,200,255,0.06);
          border:          1px solid var(--border);
          display:         flex;
          align-items:     center;
          justify-content: center;
          flex-shrink:     0;
        }

        .cv-block-title {
          font-family:  var(--ff-display);
          font-size:    18px;
          font-weight:  600;
          color:        var(--text);
        }

        /* ── Single item card ─────────────────────────────── */
        .cv-item {
          padding:        16px 18px;
          background:     var(--card);
          border:         1px solid var(--border);
          border-radius:  12px;
          display:        flex;
          flex-direction: column;
          gap:            5px;
          position:       relative;
          overflow:       hidden;
          transition:     border-color var(--t), transform var(--t);
        }

        .cv-item:hover {
          border-color: var(--border2);
          transform:    translateY(-2px);
        }

        /* Left accent line on hover */
        .cv-item::before {
          content:       '';
          position:      absolute;
          left:          0;
          top:           0;
          bottom:        0;
          width:         3px;
          background:    linear-gradient(
            to bottom,
            var(--accent),
            var(--accent2)
          );
          border-radius: 2px 0 0 2px;
          opacity:       0;
          transition:    opacity var(--t);
        }

        .cv-item:hover::before { opacity: 1; }

        .cv-item-top {
          display:         flex;
          align-items:     flex-start;
          justify-content: space-between;
          gap:             8px;
        }

        .cv-item-title {
          font-size:   14px;
          font-weight: 500;
          color:       var(--text);
          line-height: 1.3;
          transition:  color var(--t);
          flex:        1;
        }

        .cv-item:hover .cv-item-title { color: var(--accent); }

        .cv-item-year {
          font-family:    var(--ff-mono);
          font-size:      10px;
          color:          var(--navy);
          background:     var(--accent);
          padding:        2px 8px;
          border-radius:  20px;
          white-space:    nowrap;
          flex-shrink:    0;
          line-height:    1.6;
        }

        .cv-item-sub {
          font-size:  12px;
          color:      var(--accent2);
          font-style: italic;
        }

        .cv-item-grade {
          font-family:    var(--ff-mono);
          font-size:      11px;
          letter-spacing: 0.5px;
          color:          var(--accent);
        }

        .cv-item-desc {
          font-size:   12px;
          color:       var(--text3);
          line-height: 1.6;
          transition:  color var(--t);
          margin-top:  2px;
        }

        .cv-item:hover .cv-item-desc { color: var(--text2); }

        /* ── Empty section state ──────────────────────────── */
        .cv-empty-section {
          padding:       20px 16px;
          border:        1px dashed var(--border2);
          border-radius: 10px;
          text-align:    center;
          font-size:     12px;
          color:         var(--text3);
          font-family:   var(--ff-mono);
          letter-spacing: 0.5px;
          line-height:   1.6;
        }

        /* ── Placeholder cards (when NO data at all) ──────── */
        .cv-placeholder-grid {
          display:               grid;
          grid-template-columns: repeat(2, 1fr);
          gap:                   16px;
          margin-bottom:         40px;
        }

        .cv-placeholder-card {
          padding:        28px 24px;
          background:     var(--card);
          border:         1px solid var(--border);
          border-radius:  16px;
          display:        flex;
          align-items:    flex-start;
          gap:            16px;
          position:       relative;
          overflow:       hidden;
          transition:     border-color var(--t), transform var(--t);
        }

        .cv-placeholder-card:hover {
          border-color: var(--border2);
          transform:    translateY(-3px);
        }

        .cv-placeholder-card::after {
          content:        'ADD FROM DASHBOARD';
          position:       absolute;
          top:            16px;
          right:          -28px;
          font-family:    var(--ff-mono);
          font-size:      8px;
          letter-spacing: 1px;
          color:          var(--accent);
          opacity:        0.2;
          transform:      rotate(35deg);
          pointer-events: none;
          white-space:    nowrap;
        }

        .placeholder-icon {
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

        .placeholder-body {
          display:        flex;
          flex-direction: column;
          gap:            6px;
          flex:           1;
        }

        .placeholder-title {
          font-family:  var(--ff-display);
          font-size:    17px;
          font-weight:  600;
          color:        var(--text);
        }

        .placeholder-sub {
          font-size:   12px;
          color:       var(--text3);
          line-height: 1.5;
        }

        .placeholder-lines {
          margin-top:     10px;
          display:        flex;
          flex-direction: column;
          gap:            7px;
        }

        .placeholder-line {
          height:          7px;
          border-radius:   4px;
          background:      linear-gradient(
            90deg,
            var(--border) 25%,
            rgba(0,200,255,0.08) 50%,
            var(--border) 75%
          );
          background-size: 200% 100%;
          animation:       shimmer 2s infinite;
        }

        @keyframes shimmer {
          0%   { background-position:  200% 0; }
          100% { background-position: -200% 0; }
        }

        .placeholder-line:nth-child(2) { width: 75%; }
        .placeholder-line:nth-child(3) { width: 50%; }

        /* ── Dashboard hint banner ────────────────────────── */
        .cv-hint {
          display:       flex;
          align-items:   center;
          gap:           12px;
          padding:       14px 20px;
          background:    rgba(0,200,255,0.04);
          border:        1px solid var(--border2);
          border-radius: 12px;
          margin-bottom: 32px;
          font-size:     13px;
          color:         var(--text3);
          font-family:   var(--ff-mono);
          letter-spacing: 0.3px;
        }

        .cv-hint-icon { font-size: 18px; }

        .cv-hint strong { color: var(--accent); }

        /* ── Download banner ──────────────────────────────── */
        .cv-banner {
          padding:         32px 36px;
          background:      var(--card);
          border:          1px solid var(--border);
          border-radius:   16px;
          display:         flex;
          align-items:     center;
          justify-content: space-between;
          gap:             24px;
          flex-wrap:       wrap;
          transition:      border-color var(--t);
        }

        .cv-banner.has-cv {
          border-color: rgba(0,229,200,0.25);
          background:   rgba(0,229,200,0.03);
        }

        .cv-banner-left {
          display:        flex;
          flex-direction: column;
          gap:            6px;
        }

        .cv-banner-title {
          font-family:  var(--ff-display);
          font-size:    22px;
          font-weight:  600;
          color:        var(--text);
        }

        .cv-banner-sub {
          font-size:   14px;
          color:       var(--text3);
          line-height: 1.5;
        }

        .cv-banner-sub.ready { color: var(--accent2); }

        /* Active download button */
        .cv-download-active {
          display:         inline-flex;
          align-items:     center;
          gap:             10px;
          padding:         13px 28px;
          border-radius:   10px;
          border:          none;
          background:      var(--accent);
          color:           var(--navy);
          font-family:     var(--ff-body);
          font-size:       14px;
          font-weight:     500;
          cursor:          pointer;
          text-decoration: none;
          transition:      all var(--t);
          white-space:     nowrap;
          flex-shrink:     0;
        }

        .cv-download-active:hover {
          background: #00e8ff;
          transform:  translateY(-2px);
        }

        /* Disabled download button */
        .cv-download-btn {
          display:       inline-flex;
          align-items:   center;
          gap:           10px;
          padding:       13px 28px;
          border-radius: 10px;
          border:        1px solid var(--border2);
          background:    transparent;
          color:         var(--text3);
          font-family:   var(--ff-body);
          font-size:     14px;
          font-weight:   500;
          cursor:        not-allowed;
          position:      relative;
          white-space:   nowrap;
          flex-shrink:   0;
        }

        .cv-download-btn::before {
          content:        'Upload CV from Admin Dashboard';
          position:       absolute;
          bottom:         calc(100% + 8px);
          left:           50%;
          transform:      translateX(-50%);
          background:     var(--navy3);
          border:         1px solid var(--border2);
          color:          var(--text2);
          font-size:      12px;
          padding:        6px 14px;
          border-radius:  8px;
          white-space:    nowrap;
          opacity:        0;
          pointer-events: none;
          transition:     opacity var(--t);
          font-family:    var(--ff-mono);
          letter-spacing: 0.5px;
        }

        .cv-download-btn::after {
          content:          '';
          position:         absolute;
          bottom:           calc(100% + 2px);
          left:             50%;
          transform:        translateX(-50%);
          border:           5px solid transparent;
          border-top-color: var(--border2);
          opacity:          0;
          pointer-events:   none;
          transition:       opacity var(--t);
        }

        .cv-download-btn:hover::before,
        .cv-download-btn:hover::after {
          opacity: 1;
        }

        /* ── Responsive ───────────────────────────────────── */
        @media (max-width: 768px) {
          .cv-sections-grid    { grid-template-columns: 1fr; }
          .cv-placeholder-grid { grid-template-columns: 1fr; }
          .cv-banner {
            flex-direction: column;
            align-items:    flex-start;
          }
        }

      `}</style>

      <section className="cv section" id="cv">
        <div className="container">

          {/* Section header */}
          <p  className="section-label reveal" ref={labelRef}>
            Curriculum Vitae
          </p>
          <h2 className="section-title reveal" ref={titleRef}>
            Academic Profile
          </h2>
          <p  className="section-sub reveal" ref={subRef}>
            {hasDetails
              ? 'Academic background, experience, and achievements.'
              : 'Add your CV details from the Admin Dashboard.'
            }
          </p>

          {/* ── Show real data if any details exist ─────────── */}
          {hasDetails ? (
            <div className="cv-sections-grid">
              {SECTION_CONFIG.map((section, idx) => {
                const items = cvData[section.key] || []
                return (
                  <div
                    key={section.key}
                    className="cv-block reveal"
                    ref={sectionRefs[idx]}
                  >
                    {/* Section heading */}
                    <div className="cv-block-heading">
                      <div className="cv-block-icon">{section.icon}</div>
                      <h3 className="cv-block-title">{section.label}</h3>
                    </div>

                    {/* Items or empty state */}
                    {items.length === 0 ? (
                      <div className="cv-empty-section">
                        No {section.label.toLowerCase()} entries yet.
                        <br />
                        Add from Admin Dashboard → CV Details.
                      </div>
                    ) : (
                      items.map(item => (
                        <div key={item.id} className="cv-item">

                          <div className="cv-item-top">
                            <span className="cv-item-title">
                              {getTitle(section.key, item)}
                            </span>
                            {item.year && (
                              <span className="cv-item-year">
                                {item.year}
                              </span>
                            )}
                          </div>

                          {getSub(section.key, item) && (
                            <span className="cv-item-sub">
                              {getSub(section.key, item)}
                            </span>
                          )}

                          {item.grade && (
                            <span className="cv-item-grade">
                              {item.grade}
                            </span>
                          )}

                          {item.description && (
                            <p className="cv-item-desc">
                              {item.description}
                            </p>
                          )}

                        </div>
                      ))
                    )}
                  </div>
                )
              })}
            </div>
          ) : (

            /* ── Show placeholder cards if no data yet ──────── */
            <>
              <div className="cv-hint">
                <span className="cv-hint-icon">💡</span>
                Go to <strong>Admin Dashboard → CV Details</strong> to
                add your Education, Experience, Awards and Certifications.
              </div>

              <div className="cv-placeholder-grid">
                {SECTION_CONFIG.map(section => (
                  <div key={section.key} className="cv-placeholder-card">
                    <div className="placeholder-icon">{section.icon}</div>
                    <div className="placeholder-body">
                      <h3 className="placeholder-title">{section.label}</h3>
                      <p  className="placeholder-sub">
                        {section.key === 'education'      && 'Degree details, institution, graduation year'}
                        {section.key === 'experience'     && 'Research positions, teaching, and academic roles'}
                        {section.key === 'awards'         && 'Honors, scholarships, and academic achievements'}
                        {section.key === 'certifications' && 'Professional certifications and completed courses'}
                      </p>
                      <div className="placeholder-lines">
                        <div className="placeholder-line" />
                        <div className="placeholder-line" />
                        <div className="placeholder-line" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Download banner */}
          <div
            className={`cv-banner reveal${hasCV ? ' has-cv' : ''}`}
            ref={bannerRef}
          >
            <div className="cv-banner-left">
              <h3 className="cv-banner-title">Download Full CV</h3>
              <p className={`cv-banner-sub${hasCV ? ' ready' : ''}`}>
                {hasCV
                  ? 'CV is ready — click to download the full PDF.'
                  : 'Upload your CV PDF from Admin Dashboard → CV Upload to enable download.'
                }
              </p>
            </div>

            {hasCV ? (
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cv-download-active"
                download={isBase64
                  ? 'Muhammad_Usman_Javeed_CV.pdf'
                  : undefined
                }
              >
                <span>📄</span>
                Download CV
              </a>
            ) : (
              <button className="cv-download-btn" disabled>
                <span>📄</span>
                Download CV
              </button>
            )}

          </div>

        </div>
      </section>
    </>
  )
}