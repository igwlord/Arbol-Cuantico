import React from 'react'
import PageWrapper from '../components/PageWrapper'
import Typewriter from '../components/Typewriter'

export default function QuienSoyPage() {
  const [showContent, setShowContent] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif text-[var(--heading-color)] font-bold mb-4">
            <Typewriter text="¿Quién Soy?" speed={120} />
          </h1>
          {showContent && (
            <p className="text-xl text-[var(--text-color)] animate-fade-in">
              Un explorador de las fronteras entre ciencia y espiritualidad
            </p>
          )}
        </div>

        {showContent && (
          <>
            <div className="grid md:grid-cols-2 gap-8 animate-fade-in-delay-1">
              <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-heading text-[var(--heading-color)] mb-4">
                  🧬 Mi Formación
                </h2>
                <ul className="space-y-3 text-[var(--text-color)]">
                  <li className="flex items-start">
                    <span className="text-[var(--primary-color)] mr-2">•</span>
                    Físico especializado en mecánica cuántica
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-color)] mr-2">•</span>
                    Estudiante de Cábala y tradiciones esotéricas
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-color)] mr-2">•</span>
                    Investigador en terapias de frecuencias sonoras
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-color)] mr-2">•</span>
                    Desarrollador de aplicaciones web interactivas
                  </li>
                </ul>
              </div>

              <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-heading text-[var(--heading-color)] mb-4">
                  🌟 Mi Misión
                </h2>
                <p className="text-[var(--text-color)] leading-relaxed">
                  Crear puentes entre el conocimiento ancestral y la ciencia moderna, 
                  explorando cómo las frecuencias y vibraciones pueden influir en 
                  nuestra conciencia y bienestar.
                </p>
              </div>
            </div>

            <div className="bg-[var(--card-bg)] rounded-lg p-8 shadow-lg animate-fade-in-delay-2">
              <h2 className="text-3xl font-heading text-[var(--heading-color)] mb-6 text-center">
                El Origen del Árbol Cuántico
              </h2>
              <div className="prose prose-lg text-[var(--text-color)] max-w-none">
                <p className="mb-4">
                  Todo comenzó durante mis estudios de doctorado en física cuántica, cuando 
                  descubrí las sorprendentes correlaciones entre los principios de la mecánica 
                  cuántica y las estructuras simbólicas de la Cábala, especialmente el Árbol de la Vida.
                </p>
                <p className="mb-4">
                  La idea de que la conciencia podría ser un fenómeno cuántico me llevó a explorar 
                  cómo las frecuencias específicas podrían resonar con diferentes aspectos de 
                  nuestra experiencia consciente, siguiendo el mapa tradicional de las sefirot.
                </p>
                <p className="mb-4">
                  Después de años de investigación y experimentación personal, desarrollé este 
                  sistema interactivo que combina visualización, sonido y meditación para 
                  facilitar estados expandidos de conciencia.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 animate-fade-in-delay-3">
              <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg text-center">
                <div className="text-4xl mb-3">🔬</div>
                <h3 className="text-xl font-heading text-[var(--heading-color)] mb-2">
                  Rigor Científico
                </h3>
                <p className="text-[var(--text-color)] text-sm">
                  Cada frecuencia está calculada según principios físicos y resonancias naturales
                </p>
              </div>

              <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg text-center">
                <div className="text-4xl mb-3">🕉️</div>
                <h3 className="text-xl font-heading text-[var(--heading-color)] mb-2">
                  Sabiduría Ancestral
                </h3>
                <p className="text-[var(--text-color)] text-sm">
                  Basado en milenios de tradición cabalística y conocimiento esotérico
                </p>
              </div>

              <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg text-center">
                <div className="text-4xl mb-3">💫</div>
                <h3 className="text-xl font-heading text-[var(--heading-color)] mb-2">
                  Experiencia Personal
                </h3>
                <p className="text-[var(--text-color)] text-sm">
                  Más de 10 años de práctica y refinamiento de estos métodos
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[var(--primary-color)] to-purple-600 rounded-lg p-8 text-white animate-fade-in-delay-4">
              <blockquote className="text-xl md:text-2xl font-light text-center italic">
                "La verdadera sabiduría surge cuando la ciencia y la espiritualidad 
                danzan juntas en el teatro cuántico de la conciencia"
              </blockquote>
              <p className="text-center mt-4 font-semibold">- Mi filosofía personal</p>
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  )
}