import React from 'react'
import SplashScreen from './components/SplashScreen'
import NavbarDock from './components/NavbarDock'
import Toast from './components/Toast'
import HomePage from './pages/HomePage'
import ComandosPage from './pages/ComandosPage'
import SesionesPage from './pages/SesionesPage'
import QuienSoyPage from './pages/QuienSoyPage'
import ContactoPage from './pages/ContactoPage'
import ConfiguracionPage from './pages/ConfiguracionPage'
import { UserPrefsProvider, useUserPrefs } from './context/UserPrefsContext'

// Sefirot data with exact frequencies from modelo.md
const SEFIROT_DATA = [
  { name: 'Keter', hebrew: 'כתר', frequency: 999, color: '#ffffff', x: 200, y: 60 },
  { name: 'Chokmah', hebrew: 'חכמה', frequency: 888, color: '#4a90e2', x: 120, y: 140 },
  { name: 'Binah', hebrew: 'בינה', frequency: 777, color: '#8e44ad', x: 280, y: 140 },
  { name: "Da'at", hebrew: 'דעת', frequency: 666, color: '#34495e', x: 200, y: 100 },
  { name: 'Chesed', hebrew: 'חסד', frequency: 555, color: '#3498db', x: 120, y: 260 },
  { name: 'Geburah', hebrew: 'גבורה', frequency: 444, color: '#e74c3c', x: 280, y: 260 },
  { name: 'Tiferet', hebrew: 'תפארת', frequency: 528, color: '#f39c12', x: 200, y: 200 },
  { name: 'Netzach', hebrew: 'נצח', frequency: 333, color: '#27ae60', x: 120, y: 380 },
  { name: 'Hod', hebrew: 'הוד', frequency: 222, color: '#9b59b6', x: 280, y: 380 },
  { name: 'Yesod', hebrew: 'יסוד', frequency: 111, color: '#1abc9c', x: 200, y: 320 },
  { name: 'Malkut', hebrew: 'מלכות', frequency: 256, color: '#95a5a6', x: 200, y: 440 }
]

const navItems = [
  { id: 'home', title: 'Inicio', icon: '🏠' },
  { id: 'comandos', title: 'Comandos', icon: '⚡' },
  { id: 'sesiones', title: 'Sesiones', icon: '📊' },
  { id: 'quien-soy', title: 'Quién Soy', icon: '👤' },
  { id: 'contacto', title: 'Contacto', icon: '📧' }
]

function AppContent() {
  const { theme, setTheme, volume, setVolume, themePalettes } = useUserPrefs()
  
  const [showSplash, setShowSplash] = React.useState(true)
  const [currentPage, setCurrentPage] = React.useState('home')
  const [playingFrequency, setPlayingFrequency] = React.useState(null)
  const [toastMessage, setToastMessage] = React.useState('')
  const [showConfig, setShowConfig] = React.useState(false)

  const handleSefirahClick = (sefirah) => {
    if (playingFrequency === sefirah.frequency) {
      setPlayingFrequency(null)
    } else {
      setPlayingFrequency(sefirah.frequency)
      setToastMessage(`Reproduciendo ${sefirah.name} - ${sefirah.frequency}Hz`)
    }
  }

  const handleFrequencyToggle = () => {
    setPlayingFrequency(null)
  }

  const renderCurrentPage = () => {
    if (showConfig) {
      return (
        <ConfiguracionPage
          theme={theme}
          setTheme={setTheme}
          volume={volume}
          setVolume={setVolume}
          themePalettes={themePalettes}
        />
      )
    }

    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            sefirotData={SEFIROT_DATA}
            playingFrequency={playingFrequency}
            onSefirahClick={handleSefirahClick}
            onFrequencyToggle={handleFrequencyToggle}
          />
        )
      case 'comandos':
        return <ComandosPage sefirotData={SEFIROT_DATA} />
      case 'sesiones':
        return <SesionesPage />
      case 'quien-soy':
        return <QuienSoyPage />
      case 'contacto':
        return <ContactoPage />
      default:
        return (
          <HomePage
            sefirotData={SEFIROT_DATA}
            playingFrequency={playingFrequency}
            onSefirahClick={handleSefirahClick}
            onFrequencyToggle={handleFrequencyToggle}
          />
        )
    }
  }

  if (showSplash) {
    return <SplashScreen onStart={() => setShowSplash(false)} />
  }

  return (
    <div className="min-h-screen">
      {renderCurrentPage()}
      
      <NavbarDock
        currentPage={showConfig ? 'config' : currentPage}
        onNavigate={(pageId) => {
          setCurrentPage(pageId)
          setShowConfig(false)
        }}
        navItems={navItems}
        onConfigClick={() => setShowConfig(!showConfig)}
      />

      <Toast
        message={toastMessage}
        onDismiss={() => setToastMessage('')}
      />
    </div>
  )
}

export default function App() {
  return (
    <UserPrefsProvider>
      <AppContent />
    </UserPrefsProvider>
  )
}