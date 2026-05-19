import { useState, useEffect } from 'react'
import { person } from '../data/portfolioData'

const NAV_LINKS = [
  { label: 'About',         to: 'about'         },
  { label: 'Research',      to: 'research'       },
  { label: 'Publications',  to: 'publications'   },
  { label: 'Skills',        to: 'skills'         },
  { label: 'Collaborators', to: 'collaborators'  },
  { label: 'Contact',       to: 'contact'        },
]

export default function Navbar() {

  const [scrolled,       setScrolled]       = useState(false)
  const [menuOpen,       setMenuOpen]       = useState(false)
  const [activeSection,  setActiveSection]  = useState('')

  // ── Scroll listener → apply blur background ─────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Section observer → highlight active nav link ─────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )

    NAV_LINKS.forEach(link => {
      const el = document.getElementById(link.to)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // ── Smooth scroll to section ─────────────────────────────
  const scrollTo = (id) => {
    const section = document.getElementById(id)
    if (section) section.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 20px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.4s ease,
                      backdrop-filter 0.4s ease,
                      padding 0.4s ease;
        }
        .navbar.scrolled {
          padding: 14px 40px;
          background: rgba(6, 13, 31, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }
        .nav-brand {
          font-family: var(--ff-mono);
          font-size: 14px;
          letter-spacing: 2px;
          color: var(--accent);
          cursor: pointer;
          transition: opacity var(--t);
          user-select: none;
          background: none;
          border: none;
        }
        .nav-brand:hover { opacity: 0.75; }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 36px;
          list-style: none;
        }
        .nav-link {
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.5px;
          color: var(--text2);
          text-decoration: none;
          cursor: pointer;
          position: relative;
          transition: color var(--t);
          background: none;
          border: none;
          font-family: var(--ff-body);
          padding: 0;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--accent);
          transition: width var(--t);
        }
        .nav-link:hover { color: var(--text); }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active {
          color: var(--text);
        }
        .nav-link.active::after {
          width: 100%;
        }
        .nav-scholar {
          font-size: 12px;
          font-family: var(--ff-mono);
          letter-spacing: 0.5px;
          color: var(--accent);
          text-decoration: none;
          border: 1px solid var(--border2);
          padding: 7px 16px;
          border-radius: 6px;
          transition: all var(--t);
          white-space: nowrap;
        }
        .nav-scholar:hover {
          background: rgba(0, 200, 255, 0.08);
          border-color: var(--accent);
        }
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          z-index: 1001;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: var(--text);
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .hamburger.open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999;
          background: rgba(6, 13, 31, 0.97);
          backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          animation: slideDown 0.3s ease forwards;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-link {
          font-family: var(--ff-display);
          font-size: 28px;
          font-weight: 600;
          color: var(--text2);
          cursor: pointer;
          padding: 12px 40px;
          transition: color var(--t);
          background: none;
          border: none;
          text-align: center;
          width: 100%;
        }
        .mobile-link:hover { color: var(--accent); }
        .mobile-scholar {
          margin-top: 24px;
          font-family: var(--ff-mono);
          font-size: 13px;
          color: var(--accent);
          text-decoration: none;
          border: 1px solid var(--border2);
          padding: 10px 24px;
          border-radius: 8px;
        }
        @media (max-width: 768px) {
          .navbar          { padding: 16px 20px; }
          .navbar.scrolled { padding: 12px 20px; }
          .nav-links       { display: none; }
          .nav-scholar     { display: none; }
          .hamburger       { display: flex; }
        }
      `}</style>

      {/* ── Navbar ─────────────────────────────────────────── */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>

        {/* Brand */}
        <button
          className="nav-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          {person.initials}
        </button>

        {/* Desktop links */}
        <ul className="nav-links">
          {NAV_LINKS.map(link => (
            <li key={link.to}>
              <button
                className={`nav-link${activeSection === link.to ? ' active' : ''}`}
                onClick={() => scrollTo(link.to)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Scholar CTA */}
        <a
          href={person.scholar}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-scholar"
        >
          Google Scholar
        </a>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(m => !m)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
          <span />
        </button>

      </nav>

      {/* ── Mobile menu ────────────────────────────────────── */}
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map(link => (
            <button
              key={link.to}
              className="mobile-link"
              onClick={() => scrollTo(link.to)}
            >
              {link.label}
            </button>
          ))}
          
          <a
            href={person.scholar}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-scholar"
            onClick={() => setMenuOpen(false)}
          >
            Google Scholar
          </a>
        </div>
      )}
    </>
  )
}