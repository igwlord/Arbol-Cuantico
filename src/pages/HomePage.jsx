import React from 'react'
import PageWrapper from '../components/PageWrapper'

export default function HomePage({ onNavigate }) {
  const DiamondIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--primary-color)] mt-1 flex-shrink-0">
      <path d="M12 2L2 12l10 10 10-12L12 2z" />
    </svg>
  );

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center text-center space-y-8 sm:space-y-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-[var(--heading-color)] font-serif max-w-4xl">
          Un portal práctico para armonizar tus cuerpos con intención, sonido y geometría sagrada.
        </h1>
        
        <p className="text-base sm:text-lg text-[var(--text-color)]/80 max-w-3xl mx-auto">
          Árbol Cuántico – עץ קוונטי es una herramienta de acompañamiento y sanación energética que integra Cábala vivencial, radiestesia, cristales y frecuencias armónicas junto con el poder de la geometría sagrada. Está pensada para operadores y practicantes que desean medir, enfocar y armonizar sus procesos internos de forma simple, responsable y reproducible.
        </p>
        
        <ul className="space-y-4 text-md sm:text-lg text-[var(--text-color)]/90 text-left max-w-2xl w-full">
          <li className="flex items-start gap-4">
            <DiamondIcon /> <span>Coherencia mente-corazón-acción en sesiones cortas.</span>
          </li>
          <li className="flex items-start gap-4">
            <DiamondIcon /> <span>Protocolo claro: medir → decidir → armonizar → verificar.</span>
          </li>
          <li className="flex items-start gap-4">
            <DiamondIcon /> <span>Frecuencias guía por sefirá y relación con cada dominio, chakras, frecuencias de luz.</span>
          </li>
          <li className="flex items-start gap-4">
            <DiamondIcon /> <span>Personalización por nombre y tema visual (claro/oscuro).</span>
          </li>
        </ul>
        
        <footer className="text-center pt-8 space-y-4">
          <button 
            onClick={() => onNavigate('/comandos')}
            className="bg-[var(--primary-color)] text-white px-8 py-3 rounded-full text-lg sm:text-xl font-bold hover:opacity-90 transition-opacity shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-color)] focus-visible:ring-[var(--primary-color)]"
          >
            Ir a Comandos
          </button>
          <p className="text-xs text-[var(--text-color)]/50 pt-8 max-w-md mx-auto">
            Herramienta complementaria de bienestar. Es un complemento más, no reemplaza asesoramiento médico o psicológico.
          </p>
        </footer>
      </div>
    </PageWrapper>
  );
}