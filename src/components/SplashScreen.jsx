import React from 'react'
import Starfield from './Starfield'
import AmbientSoundPlayer from './AmbientSoundPlayer'
import GrowingTree from './GrowingTree'
import Typewriter from './Typewriter'

export default function SplashScreen({ onStart }) {
  const [treeFinished, setTreeFinished] = React.useState(false)
  const [showTitle, setShowTitle] = React.useState(false)
  const [titleFinished, setTitleFinished] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  
  React.useEffect(() => {
    if (treeFinished) {
      // Título aparece más rápido después de que el árbol termine
      const titleTimer = setTimeout(() => setShowTitle(true), 200) // Reducido de 500ms
      return () => clearTimeout(titleTimer)
    }
  }, [treeFinished])
  
  // Indicador de progreso
  React.useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prev + 2 // Incremento cada 50ms para llegar a 100% en ~2.5s
      })
    }, 50)
    
    return () => clearInterval(progressTimer)
  }, [])
  
  return (
    <div className="w-screen h-screen bg-[var(--bg-color)] relative overflow-hidden">
      <Starfield />
      <AmbientSoundPlayer />
      
      {/* Layout épico con árbol persistente */}
      <div className="relative z-10 h-full flex flex-col items-center">
        
        {/* Título hebreo en la parte superior */}
        <div className="flex-shrink-0 pt-12 pb-4">
          {showTitle && (
            <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl text-[var(--heading-color)] font-bold tracking-wider animate-subtle-glow text-center">
              <Typewriter text="עץ קוונטי" onFinished={() => setTitleFinished(true)} speed={80} />
            </h1>
          )}
        </div>

        {/* Árbol central que permanece visible */}
        <div className="flex-grow flex items-center justify-center min-h-0">
          <div className={`transition-all duration-1000 ${treeFinished ? 'scale-90 opacity-95' : 'scale-100 opacity-100'}`}>
            <GrowingTree onComplete={() => setTreeFinished(true)} />
          </div>
        </div>

        {/* Botón CTA en la parte inferior */}
        <div className="flex-shrink-0 pb-12 pt-4">
          {/* Indicador de progreso sutil */}
          <div className="mb-6 flex justify-center">
            <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {titleFinished && (
            <div className="animate-fade-in">
              <button 
                onClick={onStart} 
                className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white px-6 py-3 rounded-lg text-base font-medium hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-color)] focus-visible:ring-[var(--primary-color)] border border-[var(--secondary-color)]/30"
              >
                ✨ Iniciar Experiencia ✨
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}