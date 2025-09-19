import React from 'react'

// Contexto para manejar el estado global del audio
const AudioContext = React.createContext(null)

export const useAudio = () => {
  const context = React.useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider')
  }
  return context
}

export const AudioProvider = ({ children }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = React.useState(null) // { sefirotId, hz, label, audio }
  const [isPlaying, setIsPlaying] = React.useState(false)
  // Volumen por Sefirá (0..1)
  const [volumeBySefirot, setVolumeBySefirot] = React.useState({})

  // Hidratar volúmenes desde localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('arbolCuanticoVolumes')
      if (stored) setVolumeBySefirot(JSON.parse(stored))
    } catch {}
  }, [])

  // Persistir cambios de volumen
  React.useEffect(() => {
    try {
      localStorage.setItem('arbolCuanticoVolumes', JSON.stringify(volumeBySefirot))
    } catch {}
  }, [volumeBySefirot])

  const getVolumeForSefirot = React.useCallback((sefirotId) => {
    if (!sefirotId) return 0.7
    const v = volumeBySefirot[sefirotId]
    return typeof v === 'number' ? v : 0.7
  }, [volumeBySefirot])

  const setVolumeForSefirot = React.useCallback((sefirotId, volume) => {
    setVolumeBySefirot(prev => ({ ...prev, [sefirotId]: Math.max(0, Math.min(1, volume)) }))
    // Si es el que está sonando, aplicar inmediatamente
    if (currentlyPlaying?.audio && currentlyPlaying?.sefirotId === sefirotId) {
      try {
        currentlyPlaying.audio.volume = Math.max(0, Math.min(1, volume))
      } catch {}
    }
  }, [currentlyPlaying])
  
  // Función para iniciar reproducción
  const startPlaying = React.useCallback((sefirotId, hz, label, audioElement) => {
    // Detener audio anterior si existe
    if (currentlyPlaying?.audio) {
      currentlyPlaying.audio.pause()
      currentlyPlaying.audio.currentTime = 0
      currentlyPlaying.audio.src = ''
    }
    
    // Aplicar volumen guardado
    try {
      audioElement.volume = getVolumeForSefirot(sefirotId)
    } catch {}

    setCurrentlyPlaying({ sefirotId, hz, label, audio: audioElement })
    setIsPlaying(true)
    
    // Emit global event
    const event = new CustomEvent('globalAudioChange', {
      detail: { sefirotId, hz, label, isPlaying: true }
    })
    window.dispatchEvent(event)
  }, [currentlyPlaying])
  
  // Función para detener reproducción
  const stopPlaying = React.useCallback(() => {
    if (currentlyPlaying?.audio) {
      currentlyPlaying.audio.pause()
      currentlyPlaying.audio.currentTime = 0
      currentlyPlaying.audio.src = ''
    }
    
    const prevSefirotId = currentlyPlaying?.sefirotId
    setCurrentlyPlaying(null)
    setIsPlaying(false)
    
    // Emit global event
    const event = new CustomEvent('globalAudioChange', {
      detail: { sefirotId: prevSefirotId, isPlaying: false }
    })
    window.dispatchEvent(event)
  }, [currentlyPlaying])
  
  // Función para pausar/reanudar
  const togglePlaying = React.useCallback(() => {
    if (!currentlyPlaying?.audio) return
    
    if (isPlaying) {
      currentlyPlaying.audio.pause()
      setIsPlaying(false)
    } else {
      currentlyPlaying.audio.play()
      setIsPlaying(true)
    }
    
    // Emit global event
    const event = new CustomEvent('globalAudioChange', {
      detail: { 
        sefirotId: currentlyPlaying.sefirotId, 
        hz: currentlyPlaying.hz,
        label: currentlyPlaying.label,
        isPlaying: !isPlaying 
      }
    })
    window.dispatchEvent(event)
  }, [currentlyPlaying, isPlaying])
  
  const value = {
    currentlyPlaying,
    isPlaying,
    startPlaying,
    stopPlaying,
    togglePlaying,
    getVolumeForSefirot,
    setVolumeForSefirot,
    // Helper para saber si un sefirot específico está reproduciéndose
    isSefirotPlaying: (sefirotId) => currentlyPlaying?.sefirotId === sefirotId && isPlaying
  }
  
  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}