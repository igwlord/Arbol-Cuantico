import React from 'react'
import PageWrapper from '../components/PageWrapper'
import Toast from '../components/Toast'

export default function ConfiguracionPage({ theme, setTheme, volume, setVolume, themePalettes }) {
  const [toastMessage, setToastMessage] = React.useState('')

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    setToastMessage(`Tema cambiado a ${newTheme}`)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
  }

  const resetSettings = () => {
    setTheme('dark')
    setVolume(0.5)
    setToastMessage('Configuración restablecida')
  }

  const exportSettings = () => {
    const settings = { theme, volume }
    const dataStr = JSON.stringify(settings, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'arbol-cuantico-config.json'
    link.click()
    setToastMessage('Configuración exportada')
  }

  return (
    <PageWrapper title="Configuración">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <p className="text-xl text-[var(--text-color)] animate-fade-in">
            Personaliza tu experiencia con el Árbol Cuántico
          </p>
        </div>

        {/* Tema */}
        <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg animate-fade-in">
          <h2 className="text-2xl font-heading text-[var(--heading-color)] mb-6">
            🎨 Tema Visual
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(themePalettes).map(([themeKey, palette]) => (
              <button
                key={themeKey}
                onClick={() => handleThemeChange(themeKey)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  theme === themeKey 
                    ? 'border-[var(--primary-color)] scale-105' 
                    : 'border-gray-300 hover:border-[var(--primary-color)] hover:scale-102'
                }`}
                style={{
                  background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`
                }}
              >
                <div className="text-white text-center">
                  <div className="font-semibold capitalize">{themeKey}</div>
                  <div className="text-sm opacity-80">
                    {themeKey === 'dark' && '🌙'}
                    {themeKey === 'light' && '☀️'}
                    {themeKey === 'cosmic' && '🌌'}
                    {themeKey === 'nature' && '🌿'}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <p className="text-sm text-[var(--text-color)] mt-4">
            El tema seleccionado se aplicará automáticamente y se guardará en tu navegador
          </p>
        </div>

        {/* Audio */}
        <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg animate-fade-in-delay-1">
          <h2 className="text-2xl font-heading text-[var(--heading-color)] mb-6">
            🔊 Configuración de Audio
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[var(--text-color)] text-sm font-semibold mb-3">
                Volumen General: {Math.round(volume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${volume * 100}%, #d1d5db ${volume * 100}%, #d1d5db 100%)`
                }}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[var(--bg-color)] rounded-lg p-4">
                <h4 className="font-semibold text-[var(--heading-color)] mb-2">
                  🎵 Frecuencias de Sefirot
                </h4>
                <p className="text-sm text-[var(--text-color)]">
                  Controla el volumen de las frecuencias individuales de cada sefirá
                </p>
                <div className="mt-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1"
                  />
                </div>
              </div>

              <div className="bg-[var(--bg-color)] rounded-lg p-4">
                <h4 className="font-semibold text-[var(--heading-color)] mb-2">
                  🌊 Sonido Ambiental
                </h4>
                <p className="text-sm text-[var(--text-color)]">
                  Ajusta el volumen del sonido de fondo (111Hz)
                </p>
                <div className="mt-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume * 0.3}
                    onChange={(e) => setVolume(parseFloat(e.target.value) / 0.3)}
                    className="w-full h-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accesibilidad */}
        <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg animate-fade-in-delay-2">
          <h2 className="text-2xl font-heading text-[var(--heading-color)] mb-6">
            ♿ Accesibilidad
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-[var(--heading-color)] mb-3">
                Opciones Visuales
              </h4>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-3 w-4 h-4 text-[var(--primary-color)] rounded"
                    defaultChecked={false}
                  />
                  <span className="text-[var(--text-color)]">Reducir animaciones</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-3 w-4 h-4 text-[var(--primary-color)] rounded"
                    defaultChecked={false}
                  />
                  <span className="text-[var(--text-color)]">Alto contraste</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-3 w-4 h-4 text-[var(--primary-color)] rounded"
                    defaultChecked={true}
                  />
                  <span className="text-[var(--text-color)]">Mostrar efectos de brillo</span>
                </label>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[var(--heading-color)] mb-3">
                Opciones de Audio
              </h4>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-3 w-4 h-4 text-[var(--primary-color)] rounded"
                    defaultChecked={true}
                  />
                  <span className="text-[var(--text-color)]">Sonido ambiental automático</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-3 w-4 h-4 text-[var(--primary-color)] rounded"
                    defaultChecked={false}
                  />
                  <span className="text-[var(--text-color)]">Feedback sonoro en botones</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Datos y Privacidad */}
        <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg animate-fade-in-delay-3">
          <h2 className="text-2xl font-heading text-[var(--heading-color)] mb-6">
            🔒 Datos y Privacidad
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[var(--bg-color)] rounded-lg">
              <div>
                <h4 className="font-semibold text-[var(--heading-color)]">
                  Almacenamiento Local
                </h4>
                <p className="text-sm text-[var(--text-color)]">
                  Tus preferencias se guardan solo en tu navegador
                </p>
              </div>
              <span className="text-green-500 text-xl">✅</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={exportSettings}
                className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                📥 Exportar Configuración
              </button>
              <button
                onClick={resetSettings}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                🔄 Restablecer Todo
              </button>
            </div>
          </div>
        </div>

        {/* Información del Sistema */}
        <div className="bg-[var(--card-bg)] rounded-lg p-6 shadow-lg animate-fade-in-delay-4">
          <h2 className="text-2xl font-heading text-[var(--heading-color)] mb-6">
            ℹ️ Información del Sistema
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[var(--text-color)]">Versión:</span>
                <span className="text-[var(--primary-color)] font-mono">v1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-color)]">Navegador:</span>
                <span className="text-[var(--primary-color)] font-mono">
                  {navigator.userAgent.includes('Chrome') ? 'Chrome' : 
                   navigator.userAgent.includes('Firefox') ? 'Firefox' : 
                   navigator.userAgent.includes('Safari') ? 'Safari' : 'Otro'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-color)]">WebAudio API:</span>
                <span className="text-green-500">Soportada ✅</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[var(--text-color)]">Última actualización:</span>
                <span className="text-[var(--primary-color)] font-mono">Dic 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-color)]">Tema activo:</span>
                <span className="text-[var(--primary-color)] font-mono capitalize">{theme}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-color)]">Configuración guardada:</span>
                <span className="text-green-500">Sí ✅</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toast 
        message={toastMessage} 
        onDismiss={() => setToastMessage('')} 
      />
    </PageWrapper>
  )
}