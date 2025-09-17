import React from 'react'

export default function FrequencyPlayer({ frequency, volume, isPlaying, onToggle }) {
  const audioContextRef = React.useRef(null)
  const oscillatorRef = React.useRef(null)
  const gainNodeRef = React.useRef(null)

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.AudioContext) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop()
        } catch (e) {
          // Oscillator may already be stopped
        }
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  React.useEffect(() => {
    if (!audioContextRef.current) return

    if (isPlaying && frequency) {
      try {
        // Stop any existing oscillator
        if (oscillatorRef.current) {
          oscillatorRef.current.stop()
        }

        // Create new oscillator
        oscillatorRef.current = audioContextRef.current.createOscillator()
        gainNodeRef.current = audioContextRef.current.createGain()
        
        oscillatorRef.current.connect(gainNodeRef.current)
        gainNodeRef.current.connect(audioContextRef.current.destination)
        
        oscillatorRef.current.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
        oscillatorRef.current.type = 'sine'
        
        gainNodeRef.current.gain.setValueAtTime(volume * 0.1, audioContextRef.current.currentTime)
        
        oscillatorRef.current.start()
      } catch (error) {
        console.warn('Error playing frequency:', error)
      }
    } else if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop()
        oscillatorRef.current = null
      } catch (error) {
        console.warn('Error stopping frequency:', error)
      }
    }
  }, [isPlaying, frequency, volume])

  const handlePlay = async () => {
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume()
    }
    onToggle()
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handlePlay}
        className={`px-3 py-1 rounded text-sm transition-colors ${
          isPlaying 
            ? 'bg-red-500 text-white hover:bg-red-600' 
            : 'bg-[var(--primary-color)] text-white hover:opacity-90'
        }`}
      >
        {isPlaying ? '⏹️ Detener' : '▶️ Reproducir'}
      </button>
      <span className="text-sm text-[var(--text-color)]">{frequency}Hz</span>
    </div>
  )
}