// Utility para reproducir frecuencias de audio
import { logger } from './logger'
let currentGlobalAudio = null; // Variable global para controlar el audio actual

export const playFrequency = async (hz) => {
  // Detener cualquier audio que esté reproduciéndose
  stopAllAudio();
  
  return new Promise((resolve, reject) => {
    // Crear elemento audio temporal
    const audio = document.createElement('audio');
    
    const audioFile = `/audio/${hz}.mp3`;
  logger.info('🎵 Playing frequency:', hz, 'File:', audioFile);
    
    // Event listeners
    audio.addEventListener('canplaythrough', () => {
  logger.info('✅ Audio ready to play');
      audio.play()
        .then(() => {
          logger.info('✅ Audio playing successfully');
          currentGlobalAudio = audio; // Guardar referencia global
          resolve(audio);
        })
        .catch(reject);
    });
    
    audio.addEventListener('error', (e) => {
  logger.error('❌ Audio error:', e, audio.error);
      reject(new Error(`Audio error: ${audio.error?.message || 'Unknown error'}`));
    });
    
    // Configurar audio
    audio.preload = 'auto';
    audio.loop = true;
    audio.volume = 0.7;
    audio.src = audioFile;
    
    // Timeout de seguridad
    setTimeout(() => {
      if (audio.readyState < 4) {
        reject(new Error('Audio loading timeout'));
      }
    }, 10000);
  });
};

export const stopAllAudio = () => {
  logger.info('🛑 Stopping all audio');
  
  // Detener el audio global actual
  if (currentGlobalAudio) {
    currentGlobalAudio.pause();
    currentGlobalAudio.currentTime = 0;
    currentGlobalAudio.src = '';
    currentGlobalAudio = null;
  }
  
  // Detener todos los elementos de audio en la página
  const audioElements = document.querySelectorAll('audio');
  audioElements.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
    audio.src = '';
  });
  
  // Limpiar cualquier audio creado dinámicamente
  document.querySelectorAll('audio[src*="/audio/"]').forEach(audio => {
    audio.remove();
  });
};