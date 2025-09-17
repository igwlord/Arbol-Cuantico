import React from 'react'

const FrequencyPlayer = ({ hz, label }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioContextRef = React.useRef(null);
  const oscillatorRef = React.useRef(null);
  const [toastMessage, setToastMessage] = React.useState('');
  
  const stop = React.useCallback(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const play = React.useCallback(() => {
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    } else if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(hz, context.currentTime);
    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start();
    
    oscillatorRef.current = oscillator;

    setIsPlaying(true);
    setToastMessage(`Reproduciendo ${hz} Hz — ${label}`);
    setTimeout(() => setToastMessage(''), 3000);
  }, [hz, label]);

  const togglePlay = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  };
  
  React.useEffect(() => {
    return () => { // Cleanup on unmount
      stop();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(e => console.error(e));
        audioContextRef.current = null;
      }
    };
  }, [stop]);

  return (
    <React.Fragment>
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? `Detener frecuencia ${hz} Hz (${label})` : `Reproducir frecuencia ${hz} Hz (${label})`}
        className={`w-full flex items-center justify-center gap-2 px-4 py-2 border border-[var(--secondary-color)] text-[var(--secondary-color)] rounded-lg hover:bg-[var(--secondary-color)] hover:text-[var(--bg-color)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--card-bg)] focus:ring-[var(--secondary-color)] transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''}`}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        )}
        <span className="text-sm font-medium">{isPlaying ? 'Detener' : 'Reproducir'} {hz} Hz</span>
      </button>
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in-right">
          {toastMessage}
        </div>
      )}
    </React.Fragment>
  )
}

export default FrequencyPlayer