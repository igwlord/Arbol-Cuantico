import React from 'react'
import PageWrapper from '../components/PageWrapper'
import Toast from '../components/Toast'
import emailjs from '@emailjs/browser'

export default function ContactoPage() {
  const [formData, setFormData] = React.useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  })
  const [enviando, setEnviando] = React.useState(false)
  const [enviado, setEnviado] = React.useState(false)
  const [errores, setErrores] = React.useState({})
  const [toastMessage, setToastMessage] = React.useState('')

  const showToast = (message) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(''), 3000)
  }

  const validarFormulario = () => {
    const nuevosErrores = {}
    
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido'
    }
    
    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nuevosErrores.email = 'El email no es válido'
    }
    
    if (!formData.asunto) {
      nuevosErrores.asunto = 'Selecciona un asunto'
    }
    
    if (!formData.mensaje.trim()) {
      nuevosErrores.mensaje = 'El mensaje es requerido'
    }
    
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const enviarEmail = async (datos) => {
    // Configuración de EmailJS - Estas claves las obtienes de tu cuenta EmailJS
    const SERVICE_ID = 'service_arbol_cuantico' // Reemplazar con tu Service ID real
    const TEMPLATE_ID = 'template_contacto' // Reemplazar con tu Template ID real
    const PUBLIC_KEY = 'tu_public_key_aqui' // Reemplazar con tu Public Key real
    
    const templateParams = {
      to_email: 'Guidoldipietro@gmail.com',
      from_name: datos.nombre,
      from_email: datos.email,
      subject: `[Árbol Cuántico] ${datos.asunto}`,
      message: datos.mensaje,
      timestamp: new Date().toLocaleString('es-ES', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    try {
      // Por ahora simularemos el envío ya que necesitas configurar EmailJS
      console.log('Email a enviar:', templateParams)
      
      // Para activar EmailJS real, descomenta las siguientes líneas y configura las claves:
      // const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      // console.log('Email enviado:', result)
      
      // Simular delay y éxito
      await new Promise(resolve => setTimeout(resolve, 2000))
      return { success: true }
      
    } catch (error) {
      console.error('Error EmailJS:', error)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validarFormulario()) {
      showToast('Por favor, corrige los errores en el formulario')
      return
    }
    
    setEnviando(true)
    showToast('Enviando mensaje...')
    
    try {
      const resultado = await enviarEmail(formData)
      
      if (resultado.success) {
        setEnviado(true)
        showToast('¡Mensaje enviado correctamente!')
        setTimeout(() => {
          setEnviado(false)
          setFormData({ nombre: '', email: '', asunto: '', mensaje: '' })
          setErrores({})
        }, 3000)
      } else {
        showToast('Error al enviar el mensaje. Inténtalo de nuevo.')
      }
    } catch (error) {
      console.error('Error al enviar:', error)
      showToast('Error al enviar el mensaje. Inténtalo de nuevo.')
    } finally {
      setEnviando(false)
    }
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
            ¿Tienes preguntas sobre el Árbol Cuántico? ¿Queres agendar una sesion?
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
                    className={`w-full px-4 py-2 bg-[var(--bg-color)] border rounded-lg focus:outline-none text-[var(--text-color)] ${
                      errores.nombre 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-[var(--primary-color)] border-opacity-30 focus:border-[var(--primary-color)]'
                    }`}
                    placeholder="Tu nombre completo"
                    title={errores.nombre || ''}
                  />
                  {errores.nombre && (
                    <p className="text-red-500 text-xs mt-1">{errores.nombre}</p>
                  )}
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
                    className={`w-full px-4 py-2 bg-[var(--bg-color)] border rounded-lg focus:outline-none text-[var(--text-color)] ${
                      errores.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-[var(--primary-color)] border-opacity-30 focus:border-[var(--primary-color)]'
                    }`}
                    placeholder="tu.email@ejemplo.com"
                    title={errores.email || ''}
                  />
                  {errores.email && (
                    <p className="text-red-500 text-xs mt-1">{errores.email}</p>
                  )}
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
                    className={`w-full px-4 py-2 bg-[var(--bg-color)] border rounded-lg focus:outline-none text-[var(--text-color)] ${
                      errores.asunto 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-[var(--primary-color)] border-opacity-30 focus:border-[var(--primary-color)]'
                    }`}
                    title={errores.asunto || ''}
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="consulta-herramienta">Consulta sobre la herramienta</option>
                    <option value="consulta-general">Consulta general</option>
                    <option value="agenda-sesion">Agenda una sesion</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errores.asunto && (
                    <p className="text-red-500 text-xs mt-1">{errores.asunto}</p>
                  )}
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
                    className={`w-full px-4 py-2 bg-[var(--bg-color)] border rounded-lg focus:outline-none text-[var(--text-color)] resize-none ${
                      errores.mensaje 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-[var(--primary-color)] border-opacity-30 focus:border-[var(--primary-color)]'
                    }`}
                    placeholder="Comparte tu experiencia, pregunta o propuesta..."
                    title={errores.mensaje || ''}
                  />
                  {errores.mensaje && (
                    <p className="text-red-500 text-xs mt-1">{errores.mensaje}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={enviando}
                  className={`w-full py-3 rounded-lg font-semibold transition-opacity ${
                    enviando 
                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                      : 'bg-[var(--primary-color)] text-white hover:opacity-90'
                  }`}
                >
                  {enviando ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            )}
          </div>

          {/* Información lateral */}
          <div className="space-y-6">
            <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg animate-fade-in-delay-1">
              <h3 className="text-xl font-heading text-[var(--heading-color)] mb-4">
                🕒 Horarios de Respuesta
              </h3>
              <div className="space-y-2 text-[var(--text-color)]">
                <p>Lunes a Viernes: 9:00 hs - 18:00 hs</p>
                <p>Sábados: 10:00 hs - 14:00 hs</p>
                <p className="text-sm italic mt-3">
                  Tiempo promedio de respuesta: 24 hs
                </p>
              </div>
            </div>

            <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg animate-fade-in-delay-2">
              <h3 className="text-xl font-heading text-[var(--heading-color)] mb-4">
                🤝 ¿En qué te puedo ayudar?
              </h3>
              <ul className="space-y-2 text-[var(--text-color)] text-sm">
                <li className="flex items-start">
                  <span className="text-[var(--primary-color)] mr-2">•</span>
                  Preguntas sobre las frecuencias y su uso.
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-color)] mr-2">•</span>
                  Consultas sesiones particulares.
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-color)] mr-2">•</span>
                  Colaboraciones en investigación.
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-color)] mr-2">•</span>
                  Experiencias y testimonios
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-color)] mr-2">•</span>
                  Dudas sobre tu sesión.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Toast show={!!toastMessage} message={toastMessage} />
      </div>
    </PageWrapper>
  )
}