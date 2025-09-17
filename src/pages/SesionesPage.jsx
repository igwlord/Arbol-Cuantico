import React from 'react'
import PageWrapper from '../components/PageWrapper'

export default function SesionesPage() {
  const sesiones = [
    {
      id: 1,
      titulo: 'Despertar Cuántico',
      fecha: '2024-12-15',
      duracion: '45 min',
      tipo: 'Iniciación',
      descripcion: 'Primera aproximación a las frecuencias del Árbol de la Vida',
      sefirotFocus: ['Malkut', 'Yesod', 'Tiferet'],
      notas: 'Sesión introductoria con énfasis en el grounding y la conexión inicial con las energías sutiles.',
      efectos: ['Mayor claridad mental', 'Sensación de paz', 'Conexión con la naturaleza']
    },
    {
      id: 2,
      titulo: 'Equilibrio de Polaridades',
      fecha: '2024-12-22',
      duracion: '60 min',
      tipo: 'Equilibrio',
      descripcion: 'Armonización de las fuerzas opuestas complementarias',
      sefirotFocus: ['Chokmah', 'Binah', 'Chesed', 'Geburah'],
      notas: 'Trabajo profundo con las polaridades masculina-femenina y misericordia-rigor.',
      efectos: ['Balance emocional', 'Reducción de ansiedad', 'Mayor discernimiento']
    },
    {
      id: 3,
      titulo: 'Ascensión Consciencial',
      fecha: '2024-12-29',
      duracion: '90 min',
      tipo: 'Avanzado',
      descripcion: 'Viaje completo desde la materia hasta la corona divina',
      sefirotFocus: ['Todas las Sefirot'],
      notas: 'Sesión completa de ascensión por todo el Árbol, requiere experiencia previa.',
      efectos: ['Expansión de conciencia', 'Visiones intuitivas', 'Conexión espiritual profunda']
    },
    {
      id: 4,
      titulo: 'Sanación Cuántica',
      fecha: '2025-01-05',
      duracion: '75 min',
      tipo: 'Sanación',
      descripcion: 'Uso de frecuencias específicas para armonización energética',
      sefirotFocus: ['Tiferet', 'Netzach', 'Hod'],
      notas: 'Enfoque en la sanación del cuerpo emocional y mental a través del corazón.',
      efectos: ['Alivio del estrés', 'Sanación emocional', 'Renovación energética']
    }
  ]

  const [selectedSesion, setSelectedSesion] = React.useState(null)

  const getTipoColor = (tipo) => {
    const colors = {
      'Iniciación': 'bg-green-500',
      'Equilibrio': 'bg-blue-500',
      'Avanzado': 'bg-purple-500',
      'Sanación': 'bg-pink-500'
    }
    return colors[tipo] || 'bg-gray-500'
  }

  return (
    <PageWrapper title="Registro de Sesiones">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <p className="text-xl text-[var(--text-color)] animate-fade-in">
            Historial de experiencias con las frecuencias del Árbol Cuántico
          </p>
        </div>

        <div className="grid gap-6">
          {sesiones.map((sesion) => (
            <div 
              key={sesion.id}
              className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg animate-fade-in border border-[var(--primary-color)] border-opacity-20 hover:border-opacity-40 transition-all"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-2xl font-heading text-[var(--heading-color)]">
                      {sesion.titulo}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getTipoColor(sesion.tipo)}`}>
                      {sesion.tipo}
                    </span>
                  </div>
                  <p className="text-[var(--text-color)] mb-3">
                    {sesion.descripcion}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-[var(--text-color)]">
                    <span className="flex items-center">
                      <span className="text-[var(--primary-color)] mr-1">📅</span>
                      {new Date(sesion.fecha).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center">
                      <span className="text-[var(--primary-color)] mr-1">⏱️</span>
                      {sesion.duracion}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSesion(selectedSesion === sesion.id ? null : sesion.id)}
                  className="mt-4 md:mt-0 bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  {selectedSesion === sesion.id ? 'Ocultar' : 'Ver Detalles'}
                </button>
              </div>

              {selectedSesion === sesion.id && (
                <div className="mt-4 pt-4 border-t border-[var(--primary-color)] border-opacity-20 animate-fade-in">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-lg font-heading text-[var(--heading-color)] mb-3">
                        Sefirot Trabajadas:
                      </h4>
                      <div className="space-y-2">
                        {sesion.sefirotFocus.map((sefira) => (
                          <span 
                            key={sefira}
                            className="inline-block bg-[var(--primary-color)] bg-opacity-20 text-[var(--primary-color)] px-3 py-1 rounded-full text-sm mr-2 mb-2"
                          >
                            {sefira}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-heading text-[var(--heading-color)] mb-3">
                        Efectos Observados:
                      </h4>
                      <ul className="space-y-2">
                        {sesion.efectos.map((efecto, index) => (
                          <li key={index} className="text-[var(--text-color)] flex items-start">
                            <span className="text-[var(--primary-color)] mr-2">✨</span>
                            {efecto}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-heading text-[var(--heading-color)] mb-3">
                        Notas de la Sesión:
                      </h4>
                      <p className="text-[var(--text-color)] text-sm leading-relaxed">
                        {sesion.notas}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg animate-fade-in">
          <h3 className="text-xl font-heading text-[var(--heading-color)] mb-4 text-center">
            📊 Estadísticas de Práctica
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-[var(--primary-color)] bg-opacity-10 rounded-lg p-4">
              <div className="text-2xl font-bold text-[var(--primary-color)]">4</div>
              <div className="text-sm text-[var(--text-color)]">Sesiones</div>
            </div>
            <div className="bg-[var(--primary-color)] bg-opacity-10 rounded-lg p-4">
              <div className="text-2xl font-bold text-[var(--primary-color)]">4.5h</div>
              <div className="text-sm text-[var(--text-color)]">Total</div>
            </div>
            <div className="bg-[var(--primary-color)] bg-opacity-10 rounded-lg p-4">
              <div className="text-2xl font-bold text-[var(--primary-color)]">11</div>
              <div className="text-sm text-[var(--text-color)]">Sefirot</div>
            </div>
            <div className="bg-[var(--primary-color)] bg-opacity-10 rounded-lg p-4">
              <div className="text-2xl font-bold text-[var(--primary-color)]">85%</div>
              <div className="text-sm text-[var(--text-color)]">Efectividad</div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}