import { createContext, useContext, useState, useCallback } from 'react'

// DEMO oturum yönetimi: hesaplar yalnızca tarayıcının localStorage'ında tutulur.
// Gerçek sürümde bu katman bir backend API'sine bağlanacak.
const AuthContext = createContext(null)

const USERS_KEY = 'setcast_users'
const SESSION_KEY = 'setcast_session'

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const email = localStorage.getItem(SESSION_KEY)
    if (!email) return null
    return loadUsers().find((u) => u.email === email) || null
  })

  const register = useCallback((email, password) => {
    const users = loadUsers()
    if (users.some((u) => u.email === email)) return { error: 'exists' }
    const newUser = { email, password, profile: null, createdAt: new Date().toISOString() }
    users.push(newUser)
    saveUsers(users)
    localStorage.setItem(SESSION_KEY, email)
    setUser(newUser)
    return { ok: true }
  }, [])

  const login = useCallback((email, password) => {
    const found = loadUsers().find((u) => u.email === email && u.password === password)
    if (!found) return { error: 'invalid' }
    localStorage.setItem(SESSION_KEY, email)
    setUser(found)
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }, [])

  const saveProfile = useCallback((profile) => {
    setUser((current) => {
      if (!current) return current
      const users = loadUsers()
      const idx = users.findIndex((u) => u.email === current.email)
      if (idx === -1) return current
      users[idx] = { ...users[idx], profile }
      saveUsers(users)
      return users[idx]
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, register, login, logout, saveProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
