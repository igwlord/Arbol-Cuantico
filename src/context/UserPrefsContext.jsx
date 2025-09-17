import React from 'react'

export const themePalettes = {
  default_dark: { name: 'Oscuro', vars: { '--bg-color': '#1a102c', '--text-color': '#FFFFFF', '--heading-color': '#FFD700', '--primary-color': '#a855f7', '--secondary-color': '#FFD700', '--card-bg': 'rgba(26, 16, 44, 0.6)' }},
  default_light: { name: 'Claro', vars: { '--bg-color': '#FFF5E1', '--text-color': '#1A1A1A', '--heading-color': '#D97706', '--primary-color': '#10B981', '--secondary-color': '#F59E0B', '--card-bg': 'rgba(255, 245, 225, 0.6)' }},
  galaxy: { name: 'Galaxia', vars: { '--bg-color': '#000000', '--text-color': '#E0E0E0', '--heading-color': '#33A1C9', '--primary-color': '#9B59B6', '--secondary-color': '#33A1C9', '--card-bg': 'rgba(20, 20, 40, 0.7)' }},
  earth: { name: 'Tierra', vars: { '--bg-color': '#2F3E46', '--text-color': '#F2F2F2', '--heading-color': '#A4AC86', '--primary-color': '#84A98C', '--secondary-color': '#A4AC86', '--card-bg': 'rgba(84, 110, 122, 0.5)' }}
};

const UserPrefsContext = React.createContext(null)

export const useUserPrefs = () => {
  const ctx = React.useContext(UserPrefsContext)
  if (!ctx) throw new Error('useUserPrefs must be used within a UserPrefsProvider')
  return ctx
}

export const UserPrefsProvider = ({ children }) => {
  const [prefs, setPrefs] = React.useState({ name: '', theme: 'default_dark', fontSize: 'normal', motion: 'full' })
  const [sessions, setSessions] = React.useState([])
  const [isHydrated, setIsHydrated] = React.useState(false)
  const [lastRoute, setLastRouteState] = React.useState('/')

  React.useEffect(() => {
    try {
      const storedPrefs = localStorage.getItem('arbolCuanticoPrefs')
      const storedRoute = localStorage.getItem('arbolCuanticoLastRoute')
      const storedSessions = localStorage.getItem('arbolCuanticoSessions')
      if (storedPrefs) setPrefs(JSON.parse(storedPrefs))
      if (storedRoute) setLastRouteState(JSON.parse(storedRoute))
      if (storedSessions) setSessions(JSON.parse(storedSessions))
    } catch (e) {
      console.error('Failed to parse user preferences from localStorage:', e)
    }
    setIsHydrated(true)
  }, [])

  React.useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem('arbolCuanticoPrefs', JSON.stringify(prefs))
      localStorage.setItem('arbolCuanticoSessions', JSON.stringify(sessions))
    } catch (e) {
      console.error('Failed to save data to localStorage:', e)
    }
  }, [prefs, sessions, isHydrated])

  React.useEffect(() => {
    const root = document.documentElement
    const palette = themePalettes[prefs.theme] || themePalettes.default_dark
    Object.entries(palette.vars).forEach(([k, v]) => root.style.setProperty(k, v))
    root.classList.toggle('dark', palette.name.includes('Oscuro') || palette.name.includes('Galaxia'))
    root.classList.toggle('text-large', prefs.fontSize === 'large')
  }, [prefs.theme, prefs.fontSize])

  const setLastRoute = (route) => {
    setLastRouteState(route)
    if (isHydrated) {
      try { localStorage.setItem('arbolCuanticoLastRoute', JSON.stringify(route)) } catch {}
    }
  }

  const value = { prefs, setPrefs, sessions, setSessions, isHydrated, lastRoute, setLastRoute }
  return <UserPrefsContext.Provider value={value}>{children}</UserPrefsContext.Provider>
}