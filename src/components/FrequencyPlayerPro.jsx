import React from 'react'
import { useAudio } from '../context/AudioContext'
import { logger } from '../utils/logger'

const FrequencyPlayerPro = ({ hz, label, sefirotId }) => {
  const { currentlyPlaying, isPlaying, startPlaying, stopPlaying, togglePlaying, isSefirotPlaying } = useAudio()
  const [isLoading, setIsLoading] = React.useState(false)
  
  // Estado del botón para este sefirot específico
  const isThisSefirotPlaying = isSefirotPlaying(sefirotId)
  const isOtherSefirotPlaying = isPlaying && !isThisSefirotPlaying
  
  const handlePlay = React.useCallback(async () => {
    try {
      setIsLoading(true)
      
      // Verificar que el archivo existe antes de crear el Audio
      const audioPath = `/audio/${hz}.mp3`
      
      // Crear nuevo elemento de audio
      const audio = new Audio(audioPath)
      
      // Configurar audio
      audio.preload = 'auto'
      audio.loop = true
      audio.volume = 0.7
      
      // Flag para evitar múltiples errores
      let hasErrored = false
      
      // Event listeners
      audio.addEventListener('canplaythrough', async () => {
        if (hasErrored) return
        
        try {
          await audio.play()
          startPlaying(sefirotId, hz, label, audio)
          setIsLoading(false)
          
          // Configurar listener para cuando termine (si no es loop)
          audio.addEventListener('ended', () => {
            stopPlaying()
          })
          
        } catch (error) {
          logger.error('Error playing audio:', error)
          setIsLoading(false)
          if (!hasErrored) {
            hasErrored = true
          }
        }
      })
      
      audio.addEventListener('error', (e) => {
        if (hasErrored) return
        hasErrored = true
        
  logger.error('Audio loading error:', e)
        setIsLoading(false)
      })
      
      // Timeout para detectar si realmente hay un problema
      const loadTimeout = setTimeout(() => {
        if (audio.readyState < 2 && !hasErrored) { // Si no ha cargado suficientes datos
          hasErrored = true
          setIsLoading(false)
        }
      }, 5000) // 5 segundos de timeout
      
      // Limpiar timeout cuando carga correctamente
      audio.addEventListener('canplaythrough', () => {
        clearTimeout(loadTimeout)
      })
      
      // Iniciar carga
      audio.load()
      
    } catch (error) {
      logger.error('Error in handlePlay:', error)
      setIsLoading(false)
    }
  }, [hz, label, sefirotId, startPlaying, stopPlaying])
  
  const handleStop = React.useCallback(() => {
    stopPlaying()
  }, [stopPlaying])
  
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
    </React.Fragment>
  )
}

export default FrequencyPlayerPro