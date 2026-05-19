import { useEffect, useRef } from 'react'

// ── How to use in any component ───────────────────────────
// const ref = useScrollReveal()
// <div ref={ref} className="reveal"> ... </div>
// When this div scrolls into view → className becomes "reveal visible"
// globals.css already has the fade-up animation for .reveal.visible

export function useScrollReveal(options = {}) {

  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // IntersectionObserver watches if element is on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('visible')

          // Stop watching after first reveal — animation only plays once
          observer.disconnect()
        }
      },
      {
        threshold: 0.15,       // trigger when 15% of element is visible
        rootMargin: '0px',     // no offset
        ...options,            // caller can override these
      }
    )

    observer.observe(element)

    // Cleanup — stop observing if component unmounts
    return () => observer.disconnect()

  }, []) // empty array = run once when component mounts

  return ref
}