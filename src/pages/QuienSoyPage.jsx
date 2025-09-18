import React from 'react'
import PageWrapper from '../components/PageWrapper'

export default function QuienSoyPage({ onNavigate }) {
  const [showModal, setShowModal] = React.useState(false)

  return (
    <PageWrapper>
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[var(--heading-color)] mb-2">Quién soy</h1>
        <p className="text-xl italic text-[var(--text-color)]/80">Un camino entre la luz, el diseño y la conciencia</p>
      </header>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <img src="https://placehold.co/150x150/FFF5E1/D97706?text=GDP" alt="Guido Di Pietro" className="w-36 h-36 rounded-full object-cover shadow-lg border-4 border-[var(--secondary-color)]"/>
        <div className="text-lg text-[var(--text-color)]/90 space-y-4 text-center md:text-left">
          <p>Soy Guido Di Pietro, coach ontológico y terapeuta holístico con más de 10 años de experiencia acompañando procesos de transformación.</p>
          <p>Mi camino comenzó en la infancia, inspirado por mi madre, una gran maestra espiritual, quien me introdujo en prácticas de Reiki, Registros Akáshicos y talleres de armonización.</p>
          <p>Trabajé en diseño gráfico y tecnología, adquirí una visión estética y estructurada; en paralelo profundicé en gemoterapia, radiestesia y geometría sagrada.</p>
          <p>Soy un buscador incansable: integro lo ancestral con lo moderno para llevar tecnologías de luz a la vida cotidiana.</p>
          <p>Hoy comparto mesas cuánticas y procesos de reprogramación para que más personas vivan con dicha, paz y armonía.</p>
        </div>
      </div>
      <div className="my-16">
        <div className="bg-[var(--card-bg)] border-l-4 border-[var(--secondary-color)] p-6 rounded-r-lg">
          <blockquote className="text-xl sm:text-2xl italic text-center text-[var(--heading-color)] font-serif">"Creo en unir lo ancestral con lo moderno para transformar la vida cotidiana."</blockquote>
        </div>
      </div>
      <div className="text-center mb-16">
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-[var(--primary-color)] text-white px-8 py-3 rounded-full text-lg font-bold hover:opacity-90 transition-opacity shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-color)] focus-visible:ring-[var(--primary-color)]"
        >
          Explorar mis servicios
        </button>
      </div>

      {/* Modal de Servicios */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-[var(--card-bg)] rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/10 animate-scale-in">
            {/* Header del Modal */}
            <div className="bg-gradient-to-r from-[var(--card-bg)] to-[var(--card-bg)]/90 p-8 border-b border-white/10">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-serif text-[var(--heading-color)] mb-2">Mis Servicios</h2>
                  <p className="text-[var(--text-color)]/70 text-lg">Tecnologías de luz para tu transformación</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-[var(--text-color)]/70 hover:text-white transition-all duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Contenido del Modal */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
                
                {/* Servicio 1 */}
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 border border-white/10 hover:border-purple-400/30 transition-all duration-300">
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">✨</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--heading-color)] mb-2">
                          Sesiones de Armonización Cuántica
                        </h3>
                        <p className="text-[var(--text-color)]/70 leading-relaxed">
                          Acompañamientos personalizados que equilibran la energía de personas, animales, espacios o situaciones. 
                          Utilizo geometría sagrada y gemoterapia para restaurar la coherencia y la armonía.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicio 2 */}
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 border border-white/10 hover:border-blue-400/30 transition-all duration-300">
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🌟</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--heading-color)] mb-2">
                          Sesiones de Armonización Tameana
                        </h3>
                        <p className="text-[var(--text-color)]/70 leading-relaxed">
                          Mediante un lenguaje de origen pleyadiano, activamos frecuencias que reprograman tu campo energético. 
                          Permite disolver bloqueos, aliviar cargas emocionales y reconectar con tu esencia.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicio 3 */}
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 border border-white/10 hover:border-green-400/30 transition-all duration-300">
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🌳</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--heading-color)] mb-2">
                          Sesión con el Árbol de la Vida
                        </h3>
                        <p className="text-[var(--text-color)]/70 leading-relaxed">
                          Un trabajo profundo basado en la Cábala vivencial, la geometría sagrada y los cristales. 
                          Te ayuda a resetear tus cuerpos energéticos y alinear tu vida con principios de orden y equilibrio.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-12 text-center">
                <button 
                  onClick={() => {
                    setShowModal(false)
                    if (onNavigate) {
                      onNavigate('contacto')
                    }
                  }}
                  className="group relative overflow-hidden bg-gradient-to-r from-[var(--primary-color)] to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
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