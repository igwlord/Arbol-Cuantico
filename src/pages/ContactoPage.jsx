import React from 'react'
import PageWrapper from '../components/PageWrapper'

export default function ContactoPage() {
  const [formData, setFormData] = React.useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  })
  const [enviado, setEnviado] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simular envío
    console.log('Formulario enviado:', formData)
    setEnviado(true)
    setTimeout(() => {
      setEnviado(false)
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' })
    }, 3000)
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <PageWrapper title="Contacto">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <p className="text-xl text-[var(--text-color)] animate-fade-in">
            ¿Tienes preguntas sobre el Árbol Cuántico? Me encantaría escucharte
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario de contacto */}
          <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg animate-fade-in">
            <h2 className="text-2xl font-heading text-[var(--heading-color)] mb-6">
              Envíame un mensaje
            </h2>
            
            {enviado ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl text-green-500 font-semibold mb-2">
                  ¡Mensaje enviado!
                </h3>
                <p className="text-[var(--text-color)]">
                  Te responderé lo antes posible
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[var(--text-color)] text-sm font-semibold mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-[var(--bg-color)] border border-[var(--primary-color)] border-opacity-30 rounded-lg focus:border-[var(--primary-color)] focus:outline-none text-[var(--text-color)]"
                    placeholder="Tu nombre completo"
                  />
                </div>
                
                <div>
                  <label className="block text-[var(--text-color)] text-sm font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-[var(--bg-color)] border border-[var(--primary-color)] border-opacity-30 rounded-lg focus:border-[var(--primary-color)] focus:outline-none text-[var(--text-color)]"
                    placeholder="tu.email@ejemplo.com"
                  />
                </div>
                
                <div>
                  <label className="block text-[var(--text-color)] text-sm font-semibold mb-2">
                    Asunto *
                  </label>
                  <select
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-[var(--bg-color)] border border-[var(--primary-color)] border-opacity-30 rounded-lg focus:border-[var(--primary-color)] focus:outline-none text-[var(--text-color)]"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="consulta-general">Consulta general</option>
                    <option value="experiencia-tecnica">Experiencia técnica</option>
                    <option value="colaboracion">Colaboración</option>
                    <option value="investigacion">Investigación</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-[var(--text-color)] text-sm font-semibold mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-[var(--bg-color)] border border-[var(--primary-color)] border-opacity-30 rounded-lg focus:border-[var(--primary-color)] focus:outline-none text-[var(--text-color)] resize-none"
                    placeholder="Comparte tu experiencia, pregunta o propuesta..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Enviar Mensaje
                </button>
              </form>
            )}
          </div>

          {/* Información de contacto */}
          <div className="space-y-6">
            <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg animate-fade-in-delay-1">
              <h3 className="text-xl font-heading text-[var(--heading-color)] mb-4">
                📧 Información de Contacto
              </h3>
              <div className="space-y-3 text-[var(--text-color)]">
                <div className="flex items-center">
                  <span className="text-[var(--primary-color)] mr-3">✉️</span>
                  <span>arbol.cuantico@quantum-tree.com</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[var(--primary-color)] mr-3">🌐</span>
                  <span>www.arbol-cuantico.com</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[var(--primary-color)] mr-3">📱</span>
                  <span>Telegram: @ArbolCuantico</span>
                </div>
              </div>
            </div>

            <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg animate-fade-in-delay-2">
              <h3 className="text-xl font-heading text-[var(--heading-color)] mb-4">
                🕒 Horarios de Respuesta
              </h3>
              <div className="space-y-2 text-[var(--text-color)]">
                <p>Lunes a Viernes: 9:00 - 18:00 (GMT-3)</p>
                <p>Sábados: 10:00 - 14:00 (GMT-3)</p>
                <p>Domingos: Solo emergencias</p>
                <p className="text-sm italic mt-3">
                  Tiempo promedio de respuesta: 24-48 horas
                </p>
              </div>
            </div>

            <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg animate-fade-in-delay-3">
              <h3 className="text-xl font-heading text-[var(--heading-color)] mb-4">
                🤝 ¿En qué te puedo ayudar?
              </h3>
              <ul className="space-y-2 text-[var(--text-color)] text-sm">
                <li className="flex items-start">
                  <span className="text-[var(--primary-color)] mr-2">•</span>
                  Preguntas sobre las frecuencias y su uso
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-color)] mr-2">•</span>
                  Consultas técnicas sobre la aplicación
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-color)] mr-2">•</span>
                  Colaboraciones en investigación
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-color)] mr-2">•</span>
                  Experiencias y testimonios
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-color)] mr-2">•</span>
                  Desarrollo de nuevas funcionalidades
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[var(--primary-color)] to-purple-600 rounded-lg p-6 text-white text-center animate-fade-in-delay-4">
          <h3 className="text-xl font-semibold mb-2">
            🌟 Únete a la Comunidad
          </h3>
          <p className="mb-4">
            Comparte tus experiencias y aprende de otros exploradores cuánticos
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all">
              Discord
            </button>
            <button className="bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all">
              Telegram
            </button>
            <button className="bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all">
              YouTube
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}