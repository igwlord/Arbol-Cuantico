import React from 'react'
import { playFrequency, stopAllAudio } from '../utils/audioPlayer'

const FrequencyPlayerSimple = ({ hz, label, sefirotId = null, onPlayStart = null, onPlayStop = null }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentAudio, setCurrentAudio] = React.useState(null);
  const [toastMessage, setToastMessage] = React.useState('');
  
  const showToast = React.useCallback((message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  }, []);

  const stop = React.useCallback(() => {
    console.log('🛑 FrequencyPlayer stop called for', hz);
    
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio.src = '';
      setCurrentAudio(null);
    }
    
    // Asegurar que todo esté detenido globalmente
    stopAllAudio(); 
    setIsPlaying(false);
    
    // Emit event to stop Sefirot illumination
    if (sefirotId) {
      const event = new CustomEvent('sefirotAudioChange', {
        detail: { sefirotId, isPlaying: false, hz, label }
      });
      window.dispatchEvent(event);
    }
    
    // Call onPlayStop callback
    if (onPlayStop) {
      onPlayStop();
    }
  }, [currentAudio, sefirotId, hz, label, onPlayStop]);

  const play = React.useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Detener cualquier audio actual
      stop();
      
      // Intentar reproducir nuevo audio
      const audio = await playFrequency(hz);
      setCurrentAudio(audio);
      
      // Configurar event listener para cuando termine
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentAudio(null);
        showToast(`Frecuencia ${hz} Hz completada`);
        
        // Emit event when audio ends
        if (sefirotId) {
          const event = new CustomEvent('sefirotAudioChange', {
            detail: { sefirotId, isPlaying: false, hz, label }
          });
          window.dispatchEvent(event);
        }
        
        if (onPlayStop) {
          onPlayStop();
        }
      });
      
      setIsPlaying(true);
      setIsLoading(false);
      showToast(`Reproduciendo ${hz} Hz — ${label}`);
      
      // Call onPlayStart callback
      if (onPlayStart) {
        onPlayStart();
      }
      
      // Emit event for Sefirot illumination
      if (sefirotId) {
        const event = new CustomEvent('sefirotAudioChange', {
          detail: { sefirotId, isPlaying: true, hz, label }
        });
        window.dispatchEvent(event);
      }
      
    } catch (error) {
      console.error('❌ Error al reproducir la frecuencia:', error);
      showToast(`Error al reproducir ${hz} Hz: ${error.message}`);
      setIsPlaying(false);
      setIsLoading(false);
      setCurrentAudio(null);
    }
  }, [hz, label, sefirotId, showToast, onPlayStart, stop]);

  const togglePlay = React.useCallback(async () => {
    if (isPlaying) {
      stop();
      showToast(`Deteniendo frecuencia ${hz} Hz`);
    } else {
      await play();
    }
  }, [isPlaying, stop, play, hz, showToast]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    };
  }, [currentAudio]);

  return (
    <React.Fragment>
      <button
        onClick={togglePlay}
        disabled={isLoading}
        aria-label={isPlaying ? `Detener frecuencia ${hz} Hz (${label})` : `Reproducir frecuencia ${hz} Hz (${label})`}
        className={`w-full flex items-center justify-center gap-2 px-4 py-2 border border-[var(--secondary-color)] text-[var(--secondary-color)] rounded-lg hover:bg-[var(--secondary-color)] hover:text-[var(--bg-color)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--card-bg)] focus:ring-[var(--secondary-color)] transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''} ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
      >
        {isLoading ? (
          <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
          </svg>
        ) : isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        )}
        <span className="text-sm font-medium">
          {isLoading ? 'Cargando...' : isPlaying ? 'Detener' : 'Reproducir'} {hz} Hz
        </span>
      </button>
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in-right">
          {toastMessage}
        </div>
      )}
    </React.Fragment>
  )
}

export default FrequencyPlayerSimple