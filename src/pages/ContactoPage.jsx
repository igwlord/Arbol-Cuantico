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

  // Función para enviar WhatsApp con el formulario
  const enviarWhatsApp = (datos) => {
    const { nombre, email, asunto, mensaje } = datos
    
    // Crear el mensaje formateado para WhatsApp
    const mensajeWhatsApp = `*Mensaje desde Árbol Cuántico*

*Nombre completo:* ${nombre}
*Correo:* ${email}
*Asunto:* ${asunto}

*Mensaje:*
${mensaje}

---
Enviado desde arbolcuantico.com`

    // Encode para URL
    const mensajeCodificado = encodeURIComponent(mensajeWhatsApp)
    
    // Número de WhatsApp (sin espacios ni símbolos)
    const numeroWhatsApp = "5491125124207"
    
    // Crear URL de WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`
    
    // Abrir WhatsApp
    window.open(urlWhatsApp, '_blank')
    
    return { success: true }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validarFormulario()) {
      showToast('Por favor, corrige los errores en el formulario')
      return
    }
    
    setEnviando(true)
    
    try {
      const resultado = enviarWhatsApp(formData)
      
      if (resultado.success) {
        setEnviado(true)
        showToast('¡Redirigiendo a WhatsApp!')
        setTimeout(() => {
          setEnviado(false)
          setFormData({ nombre: '', email: '', asunto: '', mensaje: '' })
          setErrores({})
        }, 2000)
      }
    } catch (error) {
      console.error('Error al abrir WhatsApp:', error)
      showToast('Error al abrir WhatsApp. Inténtalo de nuevo.')
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
            ¿Tienes preguntas sobre el Árbol Cuántico? ¿Queres agendar una sesión? 
            Envíame un mensaje directo por WhatsApp y conectemos esta transformación.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario de contacto */}
          <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg animate-fade-in">
            <h2 className="text-2xl font-heading text-[var(--heading-color)] mb-6">
              Envíame un mensaje por WhatsApp
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
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    enviando 
                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                      : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg'
                  }`}
                >
                  {enviando ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Abriendo WhatsApp...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                      </svg>
                      Enviar por WhatsApp
                    </>
                  )}
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