import React from 'react'
import TreeOfLifeDiagram from './TreeOfLifeDiagram'

export default function SplashScreen({ onStart }) {
  return (
    <div className="min-h-screen w-full bg-[var(--bg-color)] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl mx-auto">
        {/* Card central */}
        <div className="bg-[var(--card-bg)]/80 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-10 flex flex-col items-center gap-6">
          {/* Ilustración estática del Árbol */}
          <div className="w-full flex justify-center">
            <TreeOfLifeDiagram 
              onNodeClick={() => {}}
              activeSefirotId={null}
              isPlaying={false}
              enableClickParticles
            />
          </div>

          {/* Texto de portada */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[var(--heading-color)]">Árbol Cuántico</h1>
            <p className="text-[var(--text-color)]/80 text-base sm:text-lg">Geometría sagrada, consciencia y diseño aplicados a la vida cotidiana.</p>
          </div>

          {/* CTA */}
          <div className="w-full">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto mx-auto block bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white px-6 py-3 rounded-full text-base font-semibold shadow-lg hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-color)] focus-visible:ring-[var(--primary-color)]"
              style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
            >
              Entrar
            </button>
          </div>

          {/* Nota removida a pedido: sin leyenda adicional en portada */}
        </div>
      </div>
    </div>
  )
}