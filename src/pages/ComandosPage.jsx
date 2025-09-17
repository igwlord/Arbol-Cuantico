import React from 'react'
import PageWrapper from '../components/PageWrapper'
import FrequencyPlayer from '../components/FrequencyPlayer'

export default function ComandosPage({ sefirotData }) {
  const [selectedCommand, setSelectedCommand] = React.useState(null)
  const [playingFrequency, setPlayingFrequency] = React.useState(null)

  const comandos = [
    {
      id: 'activacion',
      titulo: 'Activación Cuántica',
      descripcion: 'Secuencia de activación para sintonizar con las frecuencias del Árbol',
      frecuencias: [222, 333, 444, 555, 666, 777],
      duracion: '5 minutos',
      pasos: [
        'Siéntate cómodamente con la espalda recta',
        'Respira profundamente 3 veces',
        'Escucha cada frecuencia durante 30 segundos',
        'Visualiza la energía ascendiendo por tu columna',
        'Mantén la intención de conexión cuántica'
      ]
    },
    {
      id: 'equilibrio',
      titulo: 'Equilibrio de Polaridades',
      descripcion: 'Armoniza las fuerzas opuestas del Árbol de la Vida',
      frecuencias: [396, 528, 741],
      duracion: '7 minutos',
      pasos: [
        'Centra tu atención en el corazón',
        'Alterna entre Chokmah (sabiduría) y Binah (comprensión)',
        'Equilibra Chesed (misericordia) y Geburah (rigor)',
        'Unifica Netzach (victoria) y Hod (esplendor)',
        'Integra todas las polaridades en Tiferet'
      ]
    },
    {
      id: 'ascension',
      titulo: 'Ascensión por el Árbol',
      descripcion: 'Viaje meditativo desde Malkut hasta Keter',
      frecuencias: [256, 288, 324, 364, 408, 458, 514, 577, 647, 726, 815],
      duracion: '15 minutos',
      pasos: [
        'Comienza en Malkut (reino físico)',
        'Asciende gradualmente por cada sefirá',
        'Permanece 1 minuto en cada nivel',
        'Siente la transformación en cada etapa',
        'Culmina en Keter (corona divina)'
      ]
    }
  ]

  const handleFrequencyPlay = (frequency) => {
    setPlayingFrequency(playingFrequency === frequency ? null : frequency)
  }

  return (
    <PageWrapper title="Comandos de Activación">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <p className="text-xl text-[var(--text-color)] animate-fade-in">
            Protocolos de sintonización con las frecuencias sagradas
          </p>
        </div>

        <div className="grid gap-6">
          {comandos.map((comando) => (
            <div 
              key={comando.id}
              className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg animate-fade-in border border-[var(--primary-color)] border-opacity-20"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-heading text-[var(--heading-color)] mb-2">
                    {comando.titulo}
                  </h3>
                  <p className="text-[var(--text-color)] mb-2">
                    {comando.descripcion}
                  </p>
                  <span className="text-sm text-[var(--primary-color)] font-semibold">
                    Duración: {comando.duracion}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCommand(selectedCommand === comando.id ? null : comando.id)}
                  className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  {selectedCommand === comando.id ? 'Ocultar' : 'Ver Detalles'}
                </button>
              </div>

              {selectedCommand === comando.id && (
                <div className="mt-4 pt-4 border-t border-[var(--primary-color)] border-opacity-20 animate-fade-in">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-heading text-[var(--heading-color)] mb-3">
                        Pasos a Seguir:
                      </h4>
                      <ol className="space-y-2">
                        {comando.pasos.map((paso, index) => (
                          <li key={index} className="text-[var(--text-color)] flex">
                            <span className="text-[var(--primary-color)] font-bold mr-2">
                              {index + 1}.
                            </span>
                            {paso}
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-heading text-[var(--heading-color)] mb-3">
                        Frecuencias:
                      </h4>
                      <div className="space-y-2">
                        {comando.frecuencias.map((freq) => (
                          <div key={freq} className="flex items-center justify-between">
                            <span className="text-[var(--text-color)]">{freq}Hz</span>
                            <FrequencyPlayer
                              frequency={freq}
                              volume={0.3}
                              isPlaying={playingFrequency === freq}
                              onToggle={() => handleFrequencyPlay(freq)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg animate-fade-in">
          <h3 className="text-xl font-heading text-[var(--heading-color)] mb-4">
            💡 Consejos Importantes
          </h3>
          <ul className="space-y-2 text-[var(--text-color)]">
            <li className="flex items-start">
              <span className="text-[var(--primary-color)] mr-2">•</span>
              Usa auriculares para una mejor experiencia inmersiva
            </li>
            <li className="flex items-start">
              <span className="text-[var(--primary-color)] mr-2">•</span>
              Mantén un volumen cómodo, no demasiado alto
            </li>
            <li className="flex items-start">
              <span className="text-[var(--primary-color)] mr-2">•</span>
              Practica en un lugar tranquilo sin interrupciones
            </li>
            <li className="flex items-start">
              <span className="text-[var(--primary-color)] mr-2">•</span>
              La constancia es clave para obtener mejores resultados
            </li>
          </ul>
        </div>
      </div>
    </PageWrapper>
  )
}