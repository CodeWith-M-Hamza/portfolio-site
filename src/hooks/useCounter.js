import { useState, useEffect } from 'react'

// ── How to use ─────────────────────────────────────────────
// const count = useCounter(158, 1800, true)
// → count goes 0, 1, 2 ... 158 over 1800ms
// → pass false as third arg to pause until ready

export function useCounter(
  target,           // number to count up to  e.g. 158
  duration = 1800,  // how long in ms         e.g. 1800
  shouldStart = true // only start when true  e.g. when visible
) {

  const [count, setCount] = useState(0)

  useEffect(() => {
    // Don't run until shouldStart is true
    if (!shouldStart) return

    // Reset to 0 each time it starts
    setCount(0)

    let startTime = null

    // requestAnimationFrame = smooth browser animation loop
    // called ~60 times per second by the browser
    const animate = (timestamp) => {

      // First frame — record the start time
      if (!startTime) startTime = timestamp

      // progress = how far through the animation (0.0 → 1.0)
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // easeOut formula — fast at start, slows at end
      // without easing it looks robotic
      const eased = 1 - Math.pow(1 - progress, 3)

      setCount(Math.floor(eased * target))

      // Keep going until progress reaches 1.0
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Snap to exact target at the end
        setCount(target)
      }
    }

    const animationId = requestAnimationFrame(animate)

    // Cleanup — cancel if component unmounts mid-animation
    return () => cancelAnimationFrame(animationId)

  }, [target, duration, shouldStart])

  return count
}