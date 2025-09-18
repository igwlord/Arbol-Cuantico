import React from 'react'
import { useAudio } from '../context/AudioContext'

const FrequencyPlayerPro = ({ hz, label, sefirotId }) => {
  const { currentlyPlaying, isPlaying, startPlaying, stopPlaying, togglePlaying, isSefirotPlaying } = useAudio()
  const [isLoading, setIsLoading] = React.useState(false)
  const [toastMessage, setToastMessage] = React.useState('')
  
  const showToast = React.useCallback((message) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(''), 3000)
  }, [])
  
  // Estado del botón para este sefirot específico
  const isThisSefirotPlaying = isSefirotPlaying(sefirotId)
  const isOtherSefirotPlaying = isPlaying && !isThisSefirotPlaying
  
  const handlePlay = React.useCallback(async () => {
    try {
      setIsLoading(true)
      
      // Crear nuevo elemento de audio
      const audio = new Audio(`/audio/${hz}.mp3`)
      
      // Configurar audio
      audio.preload = 'auto'
      audio.loop = true
      audio.volume = 0.7
      
      // Event listeners
      audio.addEventListener('canplaythrough', async () => {
        try {
          await audio.play()
          startPlaying(sefirotId, hz, label, audio)
          setIsLoading(false)
          showToast(`Reproduciendo ${hz} Hz — ${label}`)
          
          // Configurar listener para cuando termine (si no es loop)
          audio.addEventListener('ended', () => {
            stopPlaying()
            showToast(`Frecuencia ${hz} Hz completada`)
          })
          
        } catch (error) {
          console.error('Error playing audio:', error)
          setIsLoading(false)
          showToast('Error al reproducir el audio')
        }
      })
      
      audio.addEventListener('error', (e) => {
        console.error('Audio loading error:', e)
        setIsLoading(false)
        showToast('Error al cargar el archivo de audio')
      })
      
      // Iniciar carga
      audio.load()
      
    } catch (error) {
      console.error('Error in handlePlay:', error)
      setIsLoading(false)
      showToast('Error al inicializar el audio')
    }
  }, [hz, label, sefirotId, startPlaying, stopPlaying, showToast])
  
  const handleStop = React.useCallback(() => {
    stopPlaying()
    showToast(`Deteniendo frecuencia ${hz} Hz`)
  }, [stopPlaying, hz, showToast])
  
  const handleToggle = React.useCallback(() => {
    if (isThisSefirotPlaying) {
      // Si este sefirot está reproduciéndose, pausar/reanudar
      togglePlaying()
    } else if (isOtherSefirotPlaying) {
      // Si otro sefirot está reproduciéndose, cambiar a este
      handlePlay()
    } else {
      // No hay nada reproduciéndose, iniciar este
      handlePlay()
    }
  }, [isThisSefirotPlaying, isOtherSefirotPlaying, togglePlaying, handlePlay])
  
  // Determinar texto y estado del botón
  let buttonText = `Reproducir ${hz} Hz`
  let buttonIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  )
  
  if (isLoading) {
    buttonText = 'Cargando...'
    buttonIcon = (
      <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 11-6.219-8.56"/>
      </svg>
    )
  } else if (isThisSefirotPlaying) {
    buttonText = `Pausar ${hz} Hz`
    buttonIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="4" width="4" height="16"></rect>
        <rect x="14" y="4" width="4" height="16"></rect>
      </svg>
    )
  }
  
  return (
    <React.Fragment>
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-2 px-4 py-2 border border-[var(--secondary-color)] text-[var(--secondary-color)] rounded-lg hover:bg-[var(--secondary-color)] hover:text-[var(--bg-color)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--card-bg)] focus:ring-[var(--secondary-color)] transition-all duration-300 ${isThisSefirotPlaying ? 'animate-pulse' : ''} ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
      >
        {buttonIcon}
        <span className="text-sm font-medium">
          {buttonText}
        </span>
      </button>
      
      {/* Indicador global de reproducción */}
      {currentlyPlaying && (
        <div className="mt-2 text-center">
          <p className="text-xs text-[var(--text-color)]/60">
            {isThisSefirotPlaying ? (
              <span className="text-green-400">● Reproduciendo</span>
            ) : (
              <span>
                Reproduciendo: {currentlyPlaying.label} - {currentlyPlaying.hz} Hz
              </span>
            )}
          </p>
        </div>
      )}
      
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in-right">
          {toastMessage}
        </div>
      )}
    </React.Fragment>
  )
}

export default FrequencyPlayerPro