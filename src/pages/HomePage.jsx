import React from 'react'
import PageWrapper from '../components/PageWrapper'
import TreeOfLifeDiagram from '../components/TreeOfLifeDiagram'
import FrequencyPlayer from '../components/FrequencyPlayer'
import Typewriter from '../components/Typewriter'

export default function HomePage({ sefirotData, playingFrequency, onSefirahClick, onFrequencyToggle }) {
  return (
    <PageWrapper>
      <div className="text-center space-y-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif text-[var(--heading-color)] font-bold mb-4 animate-fade-in">
            <Typewriter text="Árbol Cuántico" speed={100} />
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-color)] mb-8 animate-fade-in-delay-1">
            עץ קוונטי - Explora las frecuencias sagradas del Árbol de la Vida
          </p>
        </div>

        <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg animate-fade-in-delay-2">
          <h2 className="text-2xl font-heading text-[var(--heading-color)] mb-4">
            Diagrama Interactivo
          </h2>
          <p className="text-[var(--text-color)] mb-6">
            Haz clic en cualquier sefirá para escuchar su frecuencia correspondiente
          </p>
          
          <TreeOfLifeDiagram 
            sefirotData={sefirotData}
            onSefirahClick={onSefirahClick}
            playingFrequency={playingFrequency}
          />

          {playingFrequency && (
            <div className="mt-6 flex justify-center">
              <FrequencyPlayer
                frequency={playingFrequency}
                volume={0.5}
                isPlaying={true}
                onToggle={onFrequencyToggle}
              />
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6 animate-fade-in-delay-3">
          <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-heading text-[var(--heading-color)] mb-3">
              🎵 Experiencia Sonora
            </h3>
            <p className="text-[var(--text-color)]">
              Cada sefirá vibra con una frecuencia específica que resuena con diferentes aspectos de la conciencia y la realidad cuántica.
            </p>
          </div>
          
          <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-heading text-[var(--heading-color)] mb-3">
              🌌 Conexión Cuántica
            </h3>
            <p className="text-[var(--text-color)]">
              Explora la intersección entre la sabiduría ancestral de la Cábala y los principios de la física cuántica moderna.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}