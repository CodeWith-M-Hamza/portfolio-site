import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// ── Portfolio Components ─────────────────────────────────────
import Navbar            from './components/Navbar'
import ScrollProgress    from './components/ScrollProgress'
import SectionDivider    from './components/SectionDivider'
import Hero              from './components/Hero'
import About             from './components/About'
import ResearchInterests from './components/ResearchInterests'
import Publications      from './components/Publications'
import Skills            from './components/Skills'
import Collaborators     from './components/Collaborators'
import ScholarStats      from './components/ScholarStats'
import CV                from './components/CV'
import Contact           from './components/Contact'

// ── Admin Components ─────────────────────────────────────────
import AdminLogin     from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import { checkAuth }  from './admin/useAdminData'

// ============================================================
// 🏠 Portfolio — public facing site
// ============================================================
function Portfolio() {
  return (
    <div>

      {/* Thin gradient line at top showing scroll progress */}
      <ScrollProgress />

      {/* Sticky navbar */}
      <Navbar />

      <main>

        <Hero />

        <SectionDivider variant="glow" />

        <About />

        <SectionDivider variant="dots" />

        <ResearchInterests />

        <SectionDivider variant="line" />

        <Publications />

        <SectionDivider variant="glow" />

        <Skills />

        <SectionDivider variant="dots" />

        <Collaborators />

        <SectionDivider variant="line" />

        <ScholarStats />

        <SectionDivider variant="dots" />

        <CV />

        <SectionDivider variant="glow" />

        <Contact />

      </main>
    </div>
  )
}

// ============================================================
// 🔐 Admin — password protected portal
// ============================================================
function Admin() {

  // checkAuth() reads localStorage on first render
  // If user was already logged in → skip login screen
  const [authed, setAuthed] = useState(checkAuth())

  // Not logged in → show login screen
  if (!authed) {
    return (
      <AdminLogin
        onSuccess={() => setAuthed(true)}
      />
    )
  }

  // Logged in → show dashboard
  return (
    <AdminDashboard
      onLogout={() => setAuthed(false)}
    />
  )
}

// ============================================================
// 🚦 App — root component with routing
// ============================================================
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public portfolio → localhost:5173/ */}
        <Route
          path="/"
          element={<Portfolio />}
        />

        {/* Admin portal → localhost:5173/admin */}
        <Route
          path="/admin-muj-9x7k"
          element={<Admin />}
        />

        {/* Catch all → redirect to portfolio */}
        <Route
          path="*"
          element={<Portfolio />}
        />

      </Routes>
    </BrowserRouter>
  )
}