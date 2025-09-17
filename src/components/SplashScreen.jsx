import React from 'react'
import Starfield from './Starfield'
import AmbientSoundPlayer from './AmbientSoundPlayer'
import AnimatedSymbol from './AnimatedSymbol'
import Typewriter from './Typewriter'

export default function SplashScreen({ onStart }) {
  const [symbolFinished, setSymbolFinished] = React.useState(false)
  const [titleFinished, setTitleFinished] = React.useState(false)
  
  React.useEffect(() => { 
    const t = setTimeout(() => setSymbolFinished(true), 2500)
    return () => clearTimeout(t) 
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[var(--bg-color)] text-center p-4">
      <Starfield />
      <AmbientSoundPlayer />
      <div className="relative z-10 flex flex-col items-center">
        {!symbolFinished && <AnimatedSymbol />}
        {symbolFinished && (
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-[var(--heading-color)] font-bold tracking-wider animate-subtle-glow">
            <Typewriter text="Árbol Cuántico – עץ קוונטי" onFinished={() => setTitleFinished(true)} speed={80} />
          </h1>
        )}
        {titleFinished && (
          <div className="mt-12 animate-fade-in">
            <button onClick={onStart} className="bg-[var(--primary-color)] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-xl sm:text-2xl font-bold hover:opacity-90 transition-opacity shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-color)] focus-visible:ring-[var(--primary-color)]">Iniciar</button>
          </div>
        )}
      </div>
    </div>
  )
}