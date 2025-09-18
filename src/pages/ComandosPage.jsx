import React from 'react'
import { SEFIROT_DATA } from '../data'
import PageWrapper from '../components/PageWrapper'
import TreeOfLifeDiagram from '../components/TreeOfLifeDiagram'
import FrequencyPlayerPro from '../components/FrequencyPlayerPro'
import { useAudio } from '../context/AudioContext'

export default function ComandosPage() {
  const [selectedSefira, setSelectedSefira] = React.useState(null);
  const [selectedDescription, setSelectedDescription] = React.useState(null);
  const { currentlyPlaying, isPlaying } = useAudio();

  // Función para manejar clic en Sefirot
  const handleSefirotClick = (sefira, description) => {
    // Solo cambiar la selección - NO afectar el audio
    setSelectedSefira(sefira);
    setSelectedDescription(description);
  };



  return (
    <PageWrapper>
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[var(--heading-color)] mb-4">
          Árbol de la Vida Interactivo
        </h1>
        <p className="text-lg text-[var(--text-color)]/80 max-w-3xl mx-auto">
          Selecciona una Sefirá para ver su comando, frecuencia y detalles. Mide antes y después de cada sesión para registrar tu progreso.
        </p>
      </header>
      
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-1/2">
          <TreeOfLifeDiagram 
            onNodeClick={handleSefirotClick} 
            activeSefirotId={currentlyPlaying?.sefirotId}
            isPlaying={isPlaying}
          />
          
          {/* Indicador de Sefirot activo */}
          {currentlyPlaying && (
            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full border border-purple-400/30">
                <div 
                  className={`w-3 h-3 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}
                  style={{ backgroundColor: isPlaying ? '#00FF00' : '#FFD700' }}
                />
                <span className="text-sm font-medium text-[var(--text-color)]">
                  {currentlyPlaying.label} {isPlaying ? '(Reproduciéndose)' : '(Pausado)'}
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="w-full lg:w-1/2">
          {selectedSefira ? (
            <div className="bg-[var(--card-bg)] backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col space-y-4 shadow-lg animate-fade-in max-h-[80vh] overflow-y-auto">
              {/* Header del Sefirot */}
              <div className="text-center border-b border-white/10 pb-4">
                <h3 className="text-2xl font-serif text-[var(--heading-color)]">
                  {selectedSefira.nombre}
                </h3>
                <div className="flex justify-center gap-4 text-sm text-[var(--text-color)]/70 mt-2">
                  <span>{selectedSefira.chakra}</span> | <span>{selectedSefira.frecuenciaHz} Hz</span>
                </div>
                <p className="text-base italic text-[var(--text-color)]/90 mt-3">
                  "{selectedSefira.comando}"
                </p>
              </div>
              
              {/* Información detallada */}
              <div className="space-y-4 flex-grow">
                <div>
                  <h4 className="text-lg font-semibold text-[var(--secondary-color)] mb-2">
                    Significado
                  </h4>
                  <p className="text-sm text-[var(--text-color)]/80 leading-relaxed">
                    {selectedSefira.significado}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-[var(--secondary-color)] mb-2">
                    Energía
                  </h4>
                  <p className="text-sm text-[var(--text-color)]/80 leading-relaxed">
                    {selectedSefira.energia}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-[var(--secondary-color)] mb-2">
                    En Ti
                  </h4>
                  <p className="text-sm text-[var(--text-color)]/80 leading-relaxed">
                    {selectedSefira.enTi}
                  </p>
                </div>
              </div>
              
              {/* Reproductor de audio */}
              <div className="border-t border-white/10 pt-4">
                <h4 className="text-lg font-semibold text-[var(--secondary-color)] mb-3 text-center">
                  Reproductor de Frecuencia
                </h4>
                <div title={selectedSefira.tooltip}>
                  <FrequencyPlayerPro 
                    hz={selectedSefira.frecuenciaHz} 
                    label={selectedSefira.nombre}
                    sefirotId={selectedSefira.id}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[24rem] bg-[var(--card-bg)]/50 rounded-lg text-center p-8">
              <div>
                <p className="text-xl text-[var(--text-color)]/70 mb-2">
                  Selecciona un Sefirot del Árbol
                </p>
                <p className="text-sm text-[var(--text-color)]/50">
                  Haz clic en cualquier esfera para ver su información y reproducir su frecuencia
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}