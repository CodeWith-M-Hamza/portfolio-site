import { useState, useEffect } from 'react'

export default function ScrollProgress() {

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop    = window.scrollY
      const docHeight    = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight

      // How far through the page (0 to 100)
      const pct = (scrollTop / (docHeight - windowHeight)) * 100
      setProgress(Math.min(pct, 100))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style>{`
        .scroll-progress {
          position:   fixed;
          top:        0;
          left:       0;
          height:     2px;
          z-index:    9999;
          background: linear-gradient(
            to right,
            var(--accent3),
            var(--accent),
            var(--accent2)
          );
          transition: width 0.1s linear;
          pointer-events: none;
        }
      `}</style>

      <div
        className="scroll-progress"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />
    </>
  )
}