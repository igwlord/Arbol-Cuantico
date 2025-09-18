import React from 'react'
import PageWrapper from '../components/PageWrapper'

export default function QuienSoyPage({ onNavigate }) {
  const [showModal, setShowModal] = React.useState(false)

  // Función para abrir modal y posicionarlo correctamente
  const openModal = () => {
    setShowModal(true)
    // Asegurar que el modal aparezca en la parte superior del viewport
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  // Bloquear scroll del body cuando el modal está abierto
  React.useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup al desmontar el componente
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showModal])

  return (
    <PageWrapper>
      <header className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[var(--heading-color)] mb-2">Quién soy</h1>
        <p className="text-lg sm:text-xl italic text-[var(--text-color)]/80">Un camino entre la luz, el diseño y la conciencia</p>
      </header>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 mb-8 sm:mb-12">
        <img src="https://placehold.co/150x150/FFF5E1/D97706?text=GDP" alt="Guido Di Pietro" className="w-32 sm:w-36 h-32 sm:h-36 rounded-full object-cover shadow-lg border-4 border-[var(--secondary-color)]"/>
        <div className="text-base sm:text-lg text-[var(--text-color)]/90 space-y-3 sm:space-y-4 text-center md:text-left">
          <p>Soy Guido Di Pietro, coach ontológico y terapeuta holístico con más de 10 años acompañando transformaciones.</p>
          <p>Mi camino comenzó en la infancia con mi madre, gran maestra espiritual, quien me introdujo en Reiki, Registros Akáshicos y armonización.</p>
          <p>Trabajé en diseño gráfico y tecnología; en paralelo profundicé en gemoterapia, radiestesia y geometría sagrada.</p>
          <p>Integro lo ancestral con lo moderno para llevar tecnologías de luz a la vida cotidiana.</p>
        </div>
      </div>
      <div className="my-12 sm:my-16">
        <div className="bg-[var(--card-bg)] border-l-4 border-[var(--secondary-color)] p-4 sm:p-6 rounded-r-lg">
          <blockquote className="text-lg sm:text-xl md:text-2xl italic text-center text-[var(--heading-color)] font-serif leading-relaxed">
            "Creo en unir lo ancestral con lo moderno para transformar la vida cotidiana."
          </blockquote>
        </div>
      </div>
      <div className="text-center mb-12 sm:mb-16">
        <button 
          onClick={openModal} 
          className="bg-[var(--primary-color)] text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-bold hover:opacity-90 transition-opacity shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-color)] focus-visible:ring-[var(--primary-color)] w-full sm:w-auto max-w-sm mx-auto"
        >
          Explorar mis servicios
        </button>
      </div>

      {/* Modal de Servicios */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start sm:items-center justify-center z-50 p-2 sm:p-4 animate-fade-in overflow-y-auto">
          <div className="bg-[var(--card-bg)] rounded-xl sm:rounded-2xl max-w-4xl w-full mt-4 sm:mt-0 mb-4 sm:mb-0 shadow-2xl border border-white/10 animate-scale-in flex flex-col max-h-[95vh] sm:max-h-[90vh]">
            {/* Header del Modal */}
            <div className="bg-gradient-to-r from-[var(--card-bg)] to-[var(--card-bg)]/90 p-4 sm:p-6 border-b border-white/10 flex-shrink-0">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-[var(--heading-color)] mb-1 sm:mb-2">Mis Servicios</h2>
                  <p className="text-[var(--text-color)]/70 text-sm sm:text-base md:text-lg">Tecnologías de luz para tu transformación</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/10 text-[var(--text-color)]/70 hover:text-white transition-all duration-200 flex items-center justify-center flex-shrink-0"
                  aria-label="Cerrar modal"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Contenido del Modal */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <div className="space-y-4 sm:space-y-6">
                
                {/* Servicio 1 */}
                <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 border border-white/10 hover:border-purple-400/30 transition-all duration-300">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 self-start">
                        <span className="text-xl sm:text-2xl">✨</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-[var(--heading-color)] mb-2">
                          Armonización Cuántica
                        </h3>
                        <p className="text-sm sm:text-base text-[var(--text-color)]/70 leading-relaxed">
                          Equilibra energía de personas, animales y espacios con geometría sagrada y gemoterapia.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicio 2 */}
                <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 border border-white/10 hover:border-blue-400/30 transition-all duration-300">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0 self-start">
                        <span className="text-xl sm:text-2xl">🌟</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-[var(--heading-color)] mb-2">
                          Armonización Tameana
                        </h3>
                        <p className="text-sm sm:text-base text-[var(--text-color)]/70 leading-relaxed">
                          Lenguaje pleyadiano que reprograma tu campo energético, disuelve bloqueos y reconecta con tu esencia.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicio 3 */}
                <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 border border-white/10 hover:border-green-400/30 transition-all duration-300">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0 self-start">
                        <span className="text-xl sm:text-2xl">🌳</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-[var(--heading-color)] mb-2">
                          Sesión Árbol de la Vida
                        </h3>
                        <p className="text-sm sm:text-base text-[var(--text-color)]/70 leading-relaxed">
                          Cábala vivencial, geometría sagrada y cristales para resetear cuerpos energéticos y alinear tu vida.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-6 sm:mt-8 text-center pt-4 sm:pt-6 border-t border-white/10">
                <button 
                  onClick={() => {
                    setShowModal(false)
                    if (onNavigate) {
                      onNavigate('contacto')
                    }
                  }}
                  className="group relative overflow-hidden bg-gradient-to-r from-[var(--primary-color)] to-purple-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  <span className="relative z-10">Agendar una sesión</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-[var(--primary-color)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}