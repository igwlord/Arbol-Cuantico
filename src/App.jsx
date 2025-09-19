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
import { AudioProvider } from './context/AudioContext'
import { navItems as NAV_ITEMS_DATA } from './data/index.jsx'

// Datos centralizados: SEFIROT_DATA ahora se usa desde src/data en las páginas que lo requieren

// Usar navItems centralizados y adaptarlos a la navegación interna por id
const navItems = NAV_ITEMS_DATA
  .filter(item => item.href !== '/configuracion')
  .map(({ href, label, icon }) => ({
    id: href === '/' ? 'home' : href.replace(/^\//, ''),
    title: label,
    icon
  }))

function AppContent() {
  const { theme, setTheme, volume, setVolume, themePalettes } = useUserPrefs()
  
  const [showSplash, setShowSplash] = React.useState(true)
  const [currentPage, setCurrentPage] = React.useState('home')
  const [playingFrequency, setPlayingFrequency] = React.useState(null)
  const [toastMessage, setToastMessage] = React.useState('')
  const [showConfig, setShowConfig] = React.useState(false)
  const [isTransitioning, setIsTransitioning] = React.useState(false)

  const handleLogout = () => {
    // Simular cierre de sesión - reinicia la aplicación
    setCurrentPage('home')
    setShowConfig(false)
    setShowSplash(true)
    // Aquí podrías limpiar localStorage si fuera necesario
    // localStorage.clear()
  }

  const handlePageNavigation = (pageId) => {
    if (pageId === currentPage && !showConfig) return
    
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPage(pageId)
      setShowConfig(false)
      setIsTransitioning(false)
    }, 150)
  }

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
          onLogout={handleLogout}
        />
      )
    }

    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={(page) => handlePageNavigation(page.replace('/', ''))}
          />
        )
      case 'comandos':
        return <ComandosPage />
      case 'sesiones':
        return <SesionesPage />
      case 'quien-soy':
        return <QuienSoyPage onNavigate={handlePageNavigation} />
      case 'contacto':
        return <ContactoPage />
      default:
        return (
          <HomePage
            onNavigate={(page) => handlePageNavigation(page.replace('/', ''))}
          />
        )
    }
  }

  if (showSplash) {
    return <SplashScreen onStart={() => setShowSplash(false)} />
  }

  return (
    <div className="min-h-screen">
      <div className={`transition-all duration-300 ease-in-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {renderCurrentPage()}
      </div>
      
      <NavbarDock
        currentPage={showConfig ? 'config' : currentPage}
        onNavigate={handlePageNavigation}
        navItems={navItems}
        onConfigClick={() => {
          setIsTransitioning(true)
          setTimeout(() => {
            setShowConfig(!showConfig)
            setIsTransitioning(false)
          }, 150)
        }}
      />

      {toastMessage && (
        <Toast 
          message={toastMessage} 
          onClose={() => setToastMessage('')}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <UserPrefsProvider>
      <AudioProvider>
        <AppContent />
      </AudioProvider>
    </UserPrefsProvider>
  )
}