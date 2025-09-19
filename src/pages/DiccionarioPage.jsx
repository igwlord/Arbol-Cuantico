import React from 'react'
import { createPortal } from 'react-dom'
import PageWrapper from '../components/PageWrapper'
import { DICCIONARIO_TERMS } from '../data/diccionario'
import { DICCIONARIO_IMAGES } from '../data/diccionarioImages'
import { CODIGOS_SAGRADOS } from '../data/codigosSagrados'
import { searchTerms } from '../utils/search'

export default function DiccionarioPage() {
  const [activeTab, setActiveTab] = React.useState('terminos') // 'terminos' | 'imagenes' | 'codigos'
  const [query, setQuery] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)
  const totalImages = DICCIONARIO_IMAGES.length
  const [imagesLoaded, setImagesLoaded] = React.useState(0)

  const termResults = React.useMemo(() => {
    return searchTerms(DICCIONARIO_TERMS, query)
  }, [query])

  const codigoResults = React.useMemo(() => {
    return searchCodigosSagrados(CODIGOS_SAGRADOS, query)
  }, [query])

  // Custom search for códigos (searches código number, description, category, tags)
  function searchCodigosSagrados(items, query) {
    const tokens = query.toLowerCase().split(' ').filter(Boolean)
    if (!tokens.length) return items.map(item => ({ item, score: 0 }))

    return items
      .map(item => {
        const searchableText = [
          item.codigo,
          item.descripcion,
          item.categoria,
          ...(item.tags || [])
        ].join(' ').toLowerCase()
        
        let score = 0
        let allPresent = true
        for (const token of tokens) {
          if (searchableText.includes(token)) {
            score += item.codigo.includes(token) ? 3 : 1
          } else {
            allPresent = false
            break
          }
        }
        return { item, score: allPresent ? score : -1 }
      })
      .filter(r => r.score >= 0)
      .sort((a, b) => (b.score - a.score) || a.item.descripcion.localeCompare(b.item.descripcion))
  }

  return (
    <PageWrapper title="Glosario Cuantico">
      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div role="tablist" aria-label="Secciones del diccionario" className="flex flex-wrap justify-center gap-2 mb-6">
          <button
            role="tab"
            aria-selected={activeTab === 'terminos'}
            className={`px-3 py-1.5 rounded-full border text-sm md:text-base whitespace-nowrap ${activeTab === 'terminos' ? 'bg-[var(--primary-color)] text-white border-transparent' : 'bg-[var(--card-bg)]/60 text-[var(--text-color)] border-white/10'}`}
            onClick={() => setActiveTab('terminos')}
          >
            Términos
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'imagenes'}
            className={`px-3 py-1.5 rounded-full border text-sm md:text-base whitespace-nowrap ${activeTab === 'imagenes' ? 'bg-[var(--primary-color)] text-white border-transparent' : 'bg-[var(--card-bg)]/60 text-[var(--text-color)] border-white/10'}`}
            onClick={() => setActiveTab('imagenes')}
          >
            Imágenes
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'codigos'}
            className={`px-3 py-1.5 rounded-full border text-sm md:text-base whitespace-nowrap ${activeTab === 'codigos' ? 'bg-[var(--primary-color)] text-white border-transparent' : 'bg-[var(--card-bg)]/60 text-[var(--text-color)] border-white/10'}`}
            onClick={() => setActiveTab('codigos')}
          >
            Códigos
          </button>
        </div>

        {activeTab === 'terminos' ? (
          <section aria-labelledby="dicc-busqueda" className="space-y-6">
            <div>
              <label htmlFor="buscador" id="dicc-busqueda" className="sr-only">Buscar términos</label>
              <input
                id="buscador"
                type="text"
                placeholder="Buscar por término, categoría o etiqueta..."
                className="w-full px-4 py-3 rounded-xl bg-[var(--card-bg)]/60 border border-white/10 text-[var(--text-color)] placeholder:text-[var(--text-color)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <p className="text-[var(--text-color)]/60 text-sm mt-2">{query ? `${termResults.length} resultado(s)` : `${DICCIONARIO_TERMS.length} términos`}</p>
            </div>

            <ul className="divide-y divide-white/10 rounded-xl overflow-hidden border border-white/10 bg-[var(--card-bg)]/40">
              {(query ? termResults.map(r => r.item) : DICCIONARIO_TERMS).map((t) => (
                <li key={t.id} className="p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 shrink-0 w-2 h-2 rounded-full bg-[var(--primary-color)]"></div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-[var(--heading-color)]">{t.termino} <span className="text-xs md:text-sm text-[var(--text-color)]/60 font-normal">{t.categoria}</span></h3>
                      <p className="text-[var(--text-color)]/85 mt-1 leading-relaxed">{t.definicion}</p>
                      {(t.tags?.length || 0) > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {t.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 text-[var(--text-color)]/70 border border-white/10">#{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
              {query && termResults.length === 0 && (
                <li className="p-6 text-center text-[var(--text-color)]/60">Sin resultados para “{query}”. Prueba con otra palabra clave.</li>
              )}
            </ul>
          </section>
        ) : activeTab === 'imagenes' ? (
          <section className="mt-2 relative">
            {/* Indicador no bloqueante (accesible) */}
            {imagesLoaded < totalImages && (
              <p className="text-center text-sm text-[var(--text-color)]/70 mb-3" aria-live="polite">
                Cargando imágenes… {imagesLoaded}/{totalImages}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {DICCIONARIO_IMAGES.map((img, idx) => (
                <FlipCard
                  key={img.id}
                  index={idx}
                  title={img.title}
                  description={img.description}
                  src={img.src}
                  onImageLoad={() => setImagesLoaded((n) => n + 1)}
                />
              ))}
            </div>
          </section>
        ) : (
          <section className="space-y-6">
            {/* Header especial para Códigos con botón de instrucciones */}
            <div className="bg-gradient-to-r from-[var(--primary-color)]/10 to-purple-600/10 border border-[var(--primary-color)]/20 rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[var(--heading-color)] mb-2">✨ Códigos Sagrados</h3>
                  <p className="text-[var(--text-color)]/80">Frecuencias numéricas para activar sanación y armonización</p>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-[var(--primary-color)] to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-[var(--primary-color)]/30"
                >
                  🌟 Cómo activarlos
                </button>
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="Buscar por código, descripción o categoría..."
                className="w-full px-4 py-3 rounded-xl bg-[var(--card-bg)]/60 border border-white/10 text-[var(--text-color)] placeholder:text-[var(--text-color)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <p className="text-[var(--text-color)]/60 text-sm mt-2">{query ? `${codigoResults.length} resultado(s)` : `${CODIGOS_SAGRADOS.length} códigos`}</p>
            </div>

            <ul className="divide-y divide-white/10 rounded-xl overflow-hidden border border-white/10 bg-[var(--card-bg)]/40">
              {(query ? codigoResults.map(r => r.item) : CODIGOS_SAGRADOS).map((codigo) => (
                <li key={codigo.id} className="p-4 md:p-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 shrink-0 w-16 h-16 bg-gradient-to-br from-[var(--primary-color)]/20 to-purple-600/20 rounded-xl flex items-center justify-center border border-[var(--primary-color)]/30">
                      <span className="text-lg font-bold text-[var(--primary-color)]">{codigo.codigo.split(',')[0]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg md:text-xl font-semibold text-[var(--heading-color)]">{codigo.codigo}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-[var(--primary-color)]/20 text-[var(--primary-color)] border border-[var(--primary-color)]/30">{codigo.categoria}</span>
                      </div>
                      <p className="text-[var(--text-color)]/85 leading-relaxed mb-2">{codigo.descripcion}</p>
                      {(codigo.tags?.length || 0) > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {codigo.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 text-[var(--text-color)]/70 border border-white/10">#{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
              {query && codigoResults.length === 0 && (
                <li className="p-6 text-center text-[var(--text-color)]/60">Sin resultados para "{query}". Prueba con otra palabra clave.</li>
              )}
            </ul>
          </section>
        )}

        {/* Modal de instrucciones */}
        {showModal && (
          <CodigosModal onClose={() => setShowModal(false)} />
        )}
      </div>
    </PageWrapper>
  )
}

function CodigosModal({ onClose }) {
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const modal = (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="relative bg-[var(--card-bg)] border border-white/20 rounded-2xl max-w-2xl mx-4 max-h-[80vh] overflow-y-auto nice-scroll"
        onClick={(e) => e.stopPropagation()}
        role="dialog" aria-modal="true"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[var(--card-bg)] border-b border-white/10 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[var(--heading-color)]">🌟 Procedimiento para activar los Códigos Sagrados</h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[var(--text-color)] transition-colors"
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-8 h-8 bg-gradient-to-br from-[var(--primary-color)] to-purple-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--heading-color)] mb-2">Preparar el espacio</h3>
                <p className="text-[var(--text-color)]/85 leading-relaxed">Busca un lugar tranquilo, respira profundo y centra tu intención. Puedes encender una vela o poner música suave.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-8 h-8 bg-gradient-to-br from-[var(--primary-color)] to-purple-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--heading-color)] mb-2">Definir la intención</h3>
                <p className="text-[var(--text-color)]/85 leading-relaxed">Antes de recitar el código, declara qué deseas sanar, armonizar o proteger. Ejemplo: "Activo este código para la sanación de mi campo emocional".</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-8 h-8 bg-gradient-to-br from-[var(--primary-color)] to-purple-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--heading-color)] mb-2">Repetición del número</h3>
                <p className="text-[var(--text-color)]/85 leading-relaxed mb-3">Los Códigos Sagrados se activan repitiendo el número <strong className="text-[var(--primary-color)]">45 veces seguidas</strong> en voz alta o mentalmente.</p>
                <ul className="text-[var(--text-color)]/75 text-sm space-y-1 ml-4">
                  <li>• Puedes hacerlo con los dedos, con un rosario/japa mala, o anotando en papel.</li>
                  <li>• Lo importante es que la repetición sea consciente y con fe.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-8 h-8 bg-gradient-to-br from-[var(--primary-color)] to-purple-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--heading-color)] mb-2">Sentir la energía</h3>
                <p className="text-[var(--text-color)]/85 leading-relaxed">Visualiza cómo la frecuencia numérica se enciende en tu campo energético, penetrando tus cuerpos sutiles y actuando sobre tu intención.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-8 h-8 bg-gradient-to-br from-[var(--primary-color)] to-purple-600 rounded-full flex items-center justify-center text-white font-bold">5</div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--heading-color)] mb-2">Agradecer y cerrar</h3>
                <p className="text-[var(--text-color)]/85 leading-relaxed">Al finalizar, agradece la energía recibida, a los seres de luz que acompañan el proceso y a ti mismo/a por permitirlo.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}

function FlipCard({ title, description, src, index = 0, onImageLoad }) {
  const [flipped, setFlipped] = React.useState(false)
  const cardId = React.useId()
  const [loaded, setLoaded] = React.useState(false)
  const [visible, setVisible] = React.useState(index < 6) // render inmediato primeras 2 filas aprox
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (visible) return
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') { setVisible(true); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      })
    }, { rootMargin: '300px' })
    io.observe(el)
    return () => io.disconnect()
  }, [visible])
  return (
    <div className="group relative" ref={ref}>
      {/* Glow decorativo como en Home */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/20 to-purple-600/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
      <button
        type="button"
        onClick={() => setFlipped(f => !f)}
        aria-pressed={flipped}
        aria-label={flipped ? 'Ver imagen' : 'Ver descripción'}
        className="relative block w-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-color)]"
      >
        <div className={`flip-card ${flipped ? 'flipped' : ''}`} aria-labelledby={`${cardId}-title`}>
          <div className="flip-card-inner rounded-2xl">
            {/* Frente */}
            <div className="flip-card-front relative bg-[var(--card-bg)] border border-white/10 shadow-xl hover:-translate-y-2 transition-all duration-500 p-3">
              {/* Skeleton mientras la imagen carga */}
              {(!loaded || !visible) && (
                <div className="w-full h-48 md:h-56 rounded-lg bg-white/5 animate-pulse" />
              )}
              {visible && (
                <img
                  src={src}
                  alt={title}
                  className={`w-full h-48 md:h-56 rounded-lg bg-[var(--bg-color)]/40 p-2 object-contain transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  fetchpriority={index < 3 ? 'high' : undefined}
                  onLoad={() => { setLoaded(true); onImageLoad && onImageLoad() }}
                  onError={() => { setLoaded(true); onImageLoad && onImageLoad() }}
                />
              )}
              <div className="mt-3 text-center">
                <h4 id={`${cardId}-title`} className="text-base md:text-lg font-semibold text-[var(--heading-color)]">{title}</h4>
              </div>
            </div>
            {/* Reverso */}
            <div className="flip-card-back">
              <div className="flip-card-back-content">
                <h3 className="mb-3">{title}</h3>
                <p className="text-sm md:text-base">{description}</p>
                <p className="mt-4 text-xs opacity-70">Toca para volver</p>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}
