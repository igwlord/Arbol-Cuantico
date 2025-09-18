// Mapeo de frecuencias a archivos MP3
export const FREQUENCY_FILES = {
  174: '/audio/174.mp3', // Maljut - Reino / Manifestación
  285: '/audio/285.mp3', // Yesod - Fundamento / Soporte  
  396: '/audio/396.mp3', // Hod - Esplendor / Mente brillante
  417: '/audio/417.mp3', // Guevurá - Rigor / Fuerza
  432: '/audio/432.mp3', // Nétsaj - Victoria / Persistencia
  528: '/audio/528.mp3', // Tiféret - Belleza / Armonía
  639: '/audio/639.mp3', // Jésed - Misericordia / Amor expansivo
  741: '/audio/741.mp3', // Biná - Entendimiento / Estructura
  852: '/audio/852.mp3', // Jojmá - Sabiduría / Visión
  936: '/audio/936.mp3', // Da'at - Puente de conciencia
  963: '/audio/963.mp3'  // Kéter - Corona / Conexión divina
};

// Función para obtener el archivo de audio por frecuencia
export const getAudioFile = (frequency) => {
  return FREQUENCY_FILES[frequency] || null;
};

// Función para precargar todos los archivos de audio
export const preloadAudioFiles = () => {
  const audioCache = {};
  
  Object.entries(FREQUENCY_FILES).forEach(([freq, path]) => {
    const audio = new Audio(path);
    audio.preload = 'metadata';
    audioCache[freq] = audio;
  });
  
  return audioCache;
};