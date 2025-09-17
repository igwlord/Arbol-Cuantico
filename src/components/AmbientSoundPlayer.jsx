import React from 'react'

export default function AmbientSoundPlayer() {
  const [isMuted, setIsMuted] = React.useState(true)
  const audioContextRef = React.useRef(null)
  const gainNodeRef = React.useRef(null)

  const toggleMute = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      const context = audioContextRef.current
      const oscillator = context.createOscillator()
      const gainNode = context.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(111, context.currentTime)
      gainNode.gain.setValueAtTime(0, context.currentTime)
      oscillator.connect(gainNode)
      gainNode.connect(context.destination)
      oscillator.start()
      gainNodeRef.current = gainNode
    }
    const gainNode = gainNodeRef.current
    if (isMuted) {
      gainNode.gain.exponentialRampToValueAtTime(0.05, audioContextRef.current.currentTime + 1)
    } else {
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContextRef.current.currentTime + 1)
    }
    setIsMuted(!isMuted)
  }

  return (
    <button onClick={toggleMute} aria-label={isMuted ? 'Activar sonido ambiental' : 'Silenciar sonido ambiental'} className="fixed top-4 right-4 z-50 p-2 text-white/50 hover:text-white/80 transition-colors">
      {isMuted ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
      )}
    </button>
  )
}