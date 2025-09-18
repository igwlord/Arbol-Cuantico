import React from 'react'
import { getAudioFile } from '../utils/audioFiles'

const FrequencyPlayer = ({ hz, label }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const audioRef = React.useRef(null);
  const [toastMessage, setToastMessage] = React.useState('');
  
  const showToast = React.useCallback((message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  }, []);

  const stop = React.useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  const play = React.useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Get the audio file path for this frequency
      const audioFile = getAudioFile(hz);
      
      if (!audioFile) {
        showToast(`No se encontró archivo para la frecuencia ${hz} Hz`);
        setIsLoading(false);
        return;
      }

      // Create or update audio element
      if (!audioRef.current) {
        audioRef.current = new Audio();
        
        // Add event listeners
        audioRef.current.addEventListener('loadstart', () => setIsLoading(true));
        audioRef.current.addEventListener('canplay', () => setIsLoading(false));
        audioRef.current.addEventListener('ended', () => {
          setIsPlaying(false);
          showToast(`Frecuencia ${hz} Hz completada`);
        });
        audioRef.current.addEventListener('error', (e) => {
          console.error('Error loading audio:', e);
          showToast('Error al cargar el archivo de audio');
          setIsLoading(false);
          setIsPlaying(false);
        });
      }

      // Set the source and play
      audioRef.current.src = audioFile;
      audioRef.current.loop = true; // Loop the frequency
      audioRef.current.volume = 0.7; // Set comfortable volume
      
      // Load the audio first
      audioRef.current.load();
      
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        await playPromise;
      }
      
      setIsPlaying(true);
      setIsLoading(false);
      showToast(`Reproduciendo ${hz} Hz — ${label}`);
      
    } catch (error) {
      console.error('Error al reproducir la frecuencia:', error);
      showToast('Error al reproducir el audio');
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, [hz, label, showToast]);

  const togglePlay = React.useCallback(async () => {
    if (isPlaying) {
      stop();
      showToast(`Deteniendo frecuencia ${hz} Hz`);
    } else {
      // Ensure user interaction for audio playback
      try {
        await play();
      } catch (error) {
        console.error('Error in togglePlay:', error);
        // If play fails, try creating a new audio element
        if (audioRef.current) {
          audioRef.current.remove();
          audioRef.current = null;
        }
        await play();
      }
    }
  }, [isPlaying, stop, play, hz, showToast]);
  
  React.useEffect(() => {
    return () => { // Cleanup on unmount
      stop();
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadstart', () => {});
        audioRef.current.removeEventListener('canplay', () => {});
        audioRef.current.removeEventListener('ended', () => {});
        audioRef.current.removeEventListener('error', () => {});
        audioRef.current = null;
      }
    };
  }, [stop]);

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

export default FrequencyPlayer