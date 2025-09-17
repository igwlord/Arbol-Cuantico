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

// Sefirot data with exact structure from modelo.md
const SEFIROT_DATA = [
  {"id":"maljut","nombre":"Maljut — Reino / Manifestación","chakra":"Raíz","frecuenciaHz":174,"comando":"Yo anclo la luz en la materia, manifiesto abundancia y orden en mi vida terrenal. Hecho está.","tooltip":"Frecuencia de arraigo y presencia corporal.","orden":1},
  {"id":"yesod","nombre":"Yesod — Fundamento / Soporte","chakra":"Sacro","frecuenciaHz":285,"comando":"Yo activo el fundamento sagrado, alineo mis emociones y creo puentes de energía para manifestar lo invisible. Hecho está.","tooltip":"Integración etérica y emocional.","orden":2},
  {"id":"hod","nombre":"Hod — Esplendor / Mente brillante","chakra":"Plexo solar (aspecto mental)","frecuenciaHz":396,"comando":"Yo despierto la claridad del esplendor, comunico con verdad y libero mi creatividad en forma divina. Hecho está.","tooltip":"Liberación de peso mental, claridad expresiva.","orden":3},
  {"id":"netsaj","nombre":"Nétsaj — Victoria / Persistencia","chakra":"Plexo solar (voluntad)","frecuenciaHz":432,"comando":"Yo activo la energía de la victoria, avanzo con confianza y sostengo mis metas con perseverancia. Hecho está.","tooltip":"Coherencia, vitalidad y avance.","orden":4},
  {"id":"tiferet","nombre":"Tiféret — Belleza / Armonía","chakra":"Corazón","frecuenciaHz":528,"comando":"Yo equilibro mi corazón con la verdad, integro amor y fuerza en perfecta armonía. Hecho está.","tooltip":"Coherencia cardíaca, integración.","orden":5},
  {"id":"guevura","nombre":"Guevurá — Rigor / Fuerza","chakra":"Plexo (disciplina, límites)","frecuenciaHz":417,"comando":"Yo despierto el poder del límite sagrado, fortalezco mi voluntad y sostengo mi vida con disciplina. Hecho está.","tooltip":"Orden, corte de inercia, foco.","orden":6},
  {"id":"jesed","nombre":"Jésed — Misericordia / Amor expansivo","chakra":"Corazón (compasión)","frecuenciaHz":639,"comando":"Yo activo la misericordia infinita, irradio compasión y amor incondicional en cada célula de mi ser. Hecho está.","tooltip":"Apertura afectiva, conexión.","orden":7},
  {"id":"bina","nombre":"Biná — Entendimiento / Estructura","chakra":"Garganta / Tercer ojo (discernimiento)","frecuenciaHz":741,"comando":"Yo ordeno mis pensamientos con discernimiento, transformo la comprensión en acción justa y equilibrada. Hecho está.","tooltip":"Purificación mental, orden.","orden":8},
  {"id":"jojma","nombre":"Jojmá — Sabiduría / Visión","chakra":"Tercer ojo (intuición)","frecuenciaHz":852,"comando":"Yo despierto la chispa de la sabiduría interior, libero la claridad y el entendimiento profundo en mi mente. Hecho está.","tooltip":"Intuición, visión superior.","orden":9},
  {"id":"keter","nombre":"Kéter — Corona / Conexión divina","chakra":"Corona","frecuenciaHz":963,"comando":"Yo activo la luz pura de la creación, abro mi conciencia al Todo y recibo la sabiduría de la Fuente. Hecho está.","tooltip":"Unidad, estado contemplativo.","orden":10},
  {"id":"daat","nombre":"Da'at — Puente de conciencia (opcional)","chakra":"Entre ceja y corona (integración)","frecuenciaHz":936,"comando":"Yo integro sabiduría y entendimiento en presencia consciente. Que el conocimiento se asiente en verdad. Hecho está.","tooltip":"Integración de mente superior.","orden":0,"opcional":true}
].sort((a, b) => a.orden - b.orden);

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

  const handleLogout = () => {
    // Simular cierre de sesión - reinicia la aplicación
    setCurrentPage('home')
    setShowConfig(false)
    setShowSplash(true)
    // Aquí podrías limpiar localStorage si fuera necesario
    // localStorage.clear()
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
            onNavigate={(page) => setCurrentPage(page.replace('/', ''))}
          />
        )
      case 'comandos':
        return <ComandosPage />
      case 'sesiones':
        return <SesionesPage />
      case 'quien-soy':
        return <QuienSoyPage />
      case 'contacto':
        return <ContactoPage />
      default:
        return (
          <HomePage
            onNavigate={(page) => setCurrentPage(page.replace('/', ''))}
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