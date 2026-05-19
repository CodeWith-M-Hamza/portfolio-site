import {
  person        as defaultPerson,
  publications  as defaultPublications,
  skills        as defaultSkills,
  collaborators as defaultCollaborators,
  interests     as defaultInterests,
  scholarStats  as defaultScholarStats,
} from '../data/portfolioData'

// ── Storage keys ─────────────────────────────────────────────
const KEYS = {
  person:        'admin_person',
  publications:  'admin_publications',
  skills:        'admin_skills',
  collaborators: 'admin_collaborators',
  interests:     'admin_interests',
  scholarStats:  'admin_scholarStats',
}

// ── localStorage helpers ──────────────────────────────────────
function readStorage(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

function removeStorage(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

// ============================================================
// 📦 useAdminData hook
// ============================================================
import { useState } from 'react'

export function useAdminData(dataKey) {

  const defaultValues = {
    person:        defaultPerson,
    publications:  defaultPublications,
    skills:        defaultSkills,
    collaborators: defaultCollaborators,
    interests:     defaultInterests,
    scholarStats:  defaultScholarStats,
  }

  const storageKey = KEYS[dataKey]
  const defaultVal = defaultValues[dataKey]

  const [data, setData] = useState(() => {
    const stored = readStorage(storageKey)
    return stored !== null ? stored : defaultVal
  })

  const update = (newValue) => {
    writeStorage(storageKey, newValue)
    setData(newValue)
  }

  const reset = () => {
    removeStorage(storageKey)
    setData(defaultVal)
  }

  return { data, update, reset }
}

// ============================================================
// 🔐 Auth — with lockout system
// ============================================================
const AUTH_KEY      = 'admin_authenticated'
const ATTEMPTS_KEY  = 'admin_attempts'
const LOCKOUT_KEY   = 'admin_lockout_until'
const PASSWORD      = 'Usman@COMSATS#2025'
const MAX_ATTEMPTS  = 3
const LOCKOUT_MS    = 30000   // 30 seconds

// ── Check if logged in ────────────────────────────────────────
export function checkAuth() {
  return localStorage.getItem(AUTH_KEY) === 'true'
}

// ── Check if locked out ───────────────────────────────────────
// Returns remaining seconds if locked, null if not locked
export function checkLockout() {
  const lockoutUntil = localStorage.getItem(LOCKOUT_KEY)
  if (!lockoutUntil) return null

  const remaining = parseInt(lockoutUntil) - Date.now()

  if (remaining > 0) {
    return Math.ceil(remaining / 1000)  // return seconds remaining
  }

  // Lockout expired — clean up
  localStorage.removeItem(LOCKOUT_KEY)
  localStorage.removeItem(ATTEMPTS_KEY)
  return null
}

// ── Login attempt ─────────────────────────────────────────────
export function login(password) {

  // Check lockout first
  const locked = checkLockout()
  if (locked) {
    return { success: false, locked, message: null }
  }

  if (password === PASSWORD) {
    // ✅ Correct password
    localStorage.setItem(AUTH_KEY, 'true')
    localStorage.removeItem(ATTEMPTS_KEY)
    localStorage.removeItem(LOCKOUT_KEY)
    return { success: true, locked: null, message: null }
  }

  // ❌ Wrong password — track attempts
  const attempts = parseInt(
    localStorage.getItem(ATTEMPTS_KEY) || '0'
  ) + 1

  localStorage.setItem(ATTEMPTS_KEY, attempts.toString())

  if (attempts >= MAX_ATTEMPTS) {
    // Trigger lockout
    const lockoutUntil = Date.now() + LOCKOUT_MS
    localStorage.setItem(LOCKOUT_KEY, lockoutUntil.toString())
    localStorage.removeItem(ATTEMPTS_KEY)
    return {
      success: false,
      locked:  Math.ceil(LOCKOUT_MS / 1000),
      message: null,
    }
  }

  const remaining = MAX_ATTEMPTS - attempts
  return {
    success: false,
    locked:  null,
    message: `Incorrect password. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`,
  }
}

// ── Logout ────────────────────────────────────────────────────
export function logout() {
  localStorage.removeItem(AUTH_KEY)
}

// ── Reset everything ──────────────────────────────────────────
export function resetAllData() {
  Object.values(KEYS).forEach(key => localStorage.removeItem(key))
  localStorage.removeItem(AUTH_KEY)
  localStorage.removeItem(ATTEMPTS_KEY)
  localStorage.removeItem(LOCKOUT_KEY)
}