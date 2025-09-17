import React from 'react'
import PageWrapper from '../components/PageWrapper'
import TreeOfLifeDiagram from '../components/TreeOfLifeDiagram'
import FrequencyPlayer from '../components/FrequencyPlayer'

export default function ComandosPage() {
  const [selectedSefira, setSelectedSefira] = React.useState(null);

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
          <TreeOfLifeDiagram onNodeClick={setSelectedSefira} />
        </div>
        
        <div className="w-full lg:w-1/2">
          {selectedSefira ? (
            <div className="bg-[var(--card-bg)] backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col space-y-4 text-center shadow-lg animate-fade-in">
              <h3 className="text-2xl font-serif text-[var(--heading-color)]">
                {selectedSefira.nombre}
              </h3>
              <div className="flex justify-center gap-4 text-sm text-[var(--text-color)]/70">
                <span>{selectedSefira.chakra}</span> | <span>{selectedSefira.frecuenciaHz} Hz</span>
              </div>
              <p className="text-base italic text-[var(--text-color)]/90 flex-grow">
                "{selectedSefira.comando}"
              </p>
              <div title={selectedSefira.tooltip}>
                <FrequencyPlayer 
                  hz={selectedSefira.frecuenciaHz} 
                  label={selectedSefira.nombre} 
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[24rem] bg-[var(--card-bg)]/50 rounded-lg text-center p-8">
              <p className="text-xl text-[var(--text-color)]/70">
                Selecciona un nodo del Árbol para comenzar.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}