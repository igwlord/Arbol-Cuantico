import React from 'react'
import PageWrapper from '../components/PageWrapper'

export default function QuienSoyPage() {
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
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--card-bg)] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[var(--primary-color)]/30">
            <div className="sticky top-0 bg-[var(--card-bg)] p-6 border-b border-[var(--primary-color)]/20 flex justify-between items-center">
              <h2 className="text-2xl sm:text-3xl font-serif text-[var(--heading-color)]">Mis Servicios</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-[var(--text-color)] hover:text-[var(--primary-color)] text-2xl font-bold transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Servicio 1 */}
              <div className="bg-gradient-to-r from-[var(--primary-color)]/10 to-purple-600/10 rounded-lg p-6 border border-[var(--primary-color)]/20">
                <h3 className="text-2xl sm:text-3xl font-serif mb-4 animate-pulse bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">
                  ✨ Sesiones de Armonización Cuántica
                </h3>
                <p className="text-[var(--text-color)] leading-relaxed">
                  Acompañamientos personalizados que equilibran la energía de personas, animales, espacios o situaciones. 
                  Utilizo geometría sagrada y gemoterapia para restaurar la coherencia y la armonía, creando un entorno 
                  más liviano y saludable.
                </p>
              </div>

              {/* Servicio 2 */}
              <div className="bg-gradient-to-r from-blue-500/10 to-[var(--primary-color)]/10 rounded-lg p-6 border border-blue-400/20">
                <h3 className="text-2xl sm:text-3xl font-serif mb-4 relative">
                  <span className="bg-gradient-to-r from-blue-400 to-[var(--primary-color)] bg-clip-text text-transparent animate-pulse">
                    🌟 Sesiones de Armonización Tameana
                  </span>
                  <div className="absolute -top-1 -left-1 w-full h-full bg-gradient-to-r from-blue-400/20 to-[var(--primary-color)]/20 blur-sm -z-10 rounded"></div>
                </h3>
                <p className="text-[var(--text-color)] leading-relaxed">
                  Mediante un lenguaje de origen pleyadiano, activamos frecuencias que reprograman tu campo energético. 
                  Esto permite disolver bloqueos, aliviar cargas emocionales y reconectar con tu esencia, para que la 
                  energía fluya de manera clara y natural.
                </p>
              </div>

              {/* Servicio 3 */}
              <div className="bg-gradient-to-r from-[var(--secondary-color)]/10 to-green-600/10 rounded-lg p-6 border border-[var(--secondary-color)]/20">
                <h3 className="text-2xl sm:text-3xl font-serif mb-4 relative overflow-hidden">
                  <span className="bg-gradient-to-r from-[var(--secondary-color)] to-green-400 bg-clip-text text-transparent animate-pulse">
                    🌳 Sesión con el Árbol de la Vida
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--secondary-color)]/10 to-green-400/10 animate-pulse"></div>
                </h3>
                <p className="text-[var(--text-color)] leading-relaxed">
                  Un trabajo profundo basado en la Cábala vivencial, la geometría sagrada y los cristales. Esta práctica 
                  te ayuda a resetear tus cuerpos energéticos, liberar memorias del linaje y alinear tu vida con principios 
                  de orden y equilibrio.
                </p>
              </div>

              {/* Botón de contacto */}
              <div className="text-center pt-6 border-t border-[var(--primary-color)]/20">
                <button 
                  onClick={() => {
                    setShowModal(false)
                    window.location.href = '/contacto'
                  }}
                  className="bg-gradient-to-r from-[var(--primary-color)] to-purple-600 text-white px-8 py-3 rounded-full text-lg font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
                >
                  Agendar una sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}