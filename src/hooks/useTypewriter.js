import { useState, useEffect } from 'react'

// ── How to use ─────────────────────────────────────────────
// const text = useTypewriter(["ML Researcher", "Data Scientist"])
// → text = "M", "ML", "ML ", "ML R" ... "ML Researcher" → deletes → next word

export function useTypewriter(
  words,          // array of strings to cycle through
  typeSpeed = 80, // ms per character when typing
  deleteSpeed = 40, // ms per character when deleting
  pauseTime = 2000  // ms to wait at full word before deleting
) {

  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex]     = useState(0)
  const [charIndex, setCharIndex]     = useState(0)
  const [isDeleting, setIsDeleting]   = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]

    let timeout

    if (!isDeleting) {

      // ── TYPING phase ──────────────────────────────────────
      if (charIndex < currentWord.length) {
        // Add one more character
        timeout = setTimeout(() => {
          setCharIndex(i => i + 1)
        }, typeSpeed)
      } else {
        // Word is fully typed → pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, pauseTime)
      }

    } else {

      // ── DELETING phase ────────────────────────────────────
      if (charIndex > 0) {
        // Remove one character
        timeout = setTimeout(() => {
          setCharIndex(i => i - 1)
        }, deleteSpeed)
      } else {
        // Word is fully deleted → move to next word
        setIsDeleting(false)
        setWordIndex(i => (i + 1) % words.length) // loop back to 0
      }

    }

    // Slice the word to current charIndex → the visible text
    setDisplayText(currentWord.slice(0, charIndex))

    return () => clearTimeout(timeout)

  }, [charIndex, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseTime])

  return displayText
}