import React from 'react'
import PageWrapper from '../components/PageWrapper'

// Componente de estrellas sutiles
const StarField = () => {
  const [windowSize, setWindowSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stars = React.useMemo(() => {
    const starArray = [];
    // Adaptativo según el dispositivo para optimizar rendimiento
    const starCount = windowSize.width < 768 ? 12 : windowSize.width < 1024 ? 20 : 30;
    
    for (let i = 0; i < starCount; i++) {
      starArray.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDelay: Math.random() * 6,
        animationDuration: 3 + Math.random() * 4,
        size: Math.random() * 1.5 + 0.8
      });
    }
    return starArray;
  }, [windowSize]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute bg-white/20 rounded-full animate-pulse"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.animationDelay}s`,
            animationDuration: `${star.animationDuration}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            boxShadow: '0 0 4px rgba(255, 255, 255, 0.3)',
            filter: 'blur(0.3px)'
          }}
        />
      ))}
    </div>
  );
};

export default function HomePage({ onNavigate }) {
  return (
    <PageWrapper>
      {/* Hero Section con estrellas sutiles */}
      <div className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Fondo degradado suave */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 via-purple-900/5 to-blue-900/10"></div>
        
        {/* Sistema de estrellas sutiles */}
        <StarField />
        
        {/* Contenido Hero */}
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-[var(--heading-color)] mb-6 leading-tight">
            <span className="block text-2xl sm:text-3xl md:text-4xl text-[var(--primary-color)] mb-4 font-light">
              REINICIA TU ENERGÍA
            </span>
            <span className="bg-gradient-to-r from-[var(--primary-color)] via-yellow-400 to-[var(--secondary-color)] bg-clip-text text-transparent animate-pulse">
              RESTAURA TU EQUILIBRIO
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-[var(--text-color)]/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Un portal práctico que armoniza tus cuerpos a través de intención, sonido y geometría sagrada.
          </p>
          
          {/* Botón CTA principal con animación */}
          <button 
            onClick={() => onNavigate('comandos')}
            className="group relative bg-gradient-to-r from-[var(--primary-color)] via-purple-600 to-[var(--secondary-color)] text-white px-12 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 hover:rotate-1 transform"
          >
            <span className="relative z-10">✨ Descubre cómo funciona</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
          </button>
        </div>
        
        {/* Partículas flotantes decorativas */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-[var(--primary-color)] rounded-full opacity-70 animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-yellow-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-5 h-5 bg-purple-400 rounded-full opacity-50 animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-[var(--secondary-color)] rounded-full opacity-80 animate-bounce" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Introducción */}
      <section className="py-16 bg-[var(--card-bg)]/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg sm:text-xl text-[var(--text-color)]/90 leading-relaxed max-w-4xl mx-auto">
            <strong className="text-[var(--primary-color)]">Árbol Cuántico – עץ קוונטי</strong> es una experiencia de sanación energética que integra 
            <span className="text-[var(--secondary-color)] font-semibold"> Cábala vivencial, radiestesia, cristales y frecuencias armónicas</span>. 
            Diseñado para operadores y buscadores que desean medir, enfocar y armonizar sus procesos internos de manera 
            <span className="text-[var(--primary-color)] font-semibold"> clara, simple y efectiva</span>.
          </p>
        </div>
      </section>

      {/* Beneficios con cristales flotantes */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-serif text-[var(--heading-color)] text-center mb-16">
            Beneficios que <span className="text-[var(--primary-color)]">experimentarás</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Beneficio 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-[var(--card-bg)] p-8 rounded-2xl border border-green-400/30 shadow-xl hover:shadow-green-400/20 hover:-translate-y-2 transition-all duration-500 text-center">
                <div className="text-6xl mb-4">🌿</div>
                <h3 className="text-xl font-bold text-[var(--heading-color)] mb-3">Alivio Inmediato</h3>
                <p className="text-[var(--text-color)]/80">Tensiones físicas y emocionales se disuelven</p>
              </div>
            </div>

            {/* Beneficio 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-[var(--card-bg)] p-8 rounded-2xl border border-blue-400/30 shadow-xl hover:shadow-blue-400/20 hover:-translate-y-2 transition-all duration-500 text-center">
                <div className="text-6xl mb-4">💎</div>
                <h3 className="text-xl font-bold text-[var(--heading-color)] mb-3">Equilibrio Total</h3>
                <p className="text-[var(--text-color)]/80">Armonía energética en cuerpos y espacios</p>
              </div>
            </div>

            {/* Beneficio 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-violet-600/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-[var(--card-bg)] p-8 rounded-2xl border border-purple-400/30 shadow-xl hover:shadow-purple-400/20 hover:-translate-y-2 transition-all duration-500 text-center">
                <div className="text-6xl mb-4">✨</div>
                <h3 className="text-xl font-bold text-[var(--heading-color)] mb-3">Claridad Mental</h3>
                <p className="text-[var(--text-color)]/80">Decisiones más sabias y conscientes</p>
              </div>
            </div>

            {/* Beneficio 4 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-600/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-[var(--card-bg)] p-8 rounded-2xl border border-yellow-400/30 shadow-xl hover:shadow-yellow-400/20 hover:-translate-y-2 transition-all duration-500 text-center">
                <div className="text-6xl mb-4">🌌</div>
                <h3 className="text-xl font-bold text-[var(--heading-color)] mb-3">Conexión Profunda</h3>
                <p className="text-[var(--text-color)]/80">Con tu esencia y propósito de vida</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona - Proceso visual en 4 pasos */}
      <section className="py-20 bg-gradient-to-r from-[var(--card-bg)]/30 to-[var(--card-bg)]/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-serif text-[var(--heading-color)] text-center mb-16">
            Cómo <span className="text-[var(--primary-color)]">funciona</span>
          </h2>
          
          <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8">
            {/* Paso 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-[var(--primary-color)] to-purple-600 rounded-full flex items-center justify-center text-4xl text-white shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  🔍
                </div>
                <div className="absolute -inset-4 bg-[var(--primary-color)]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-xl font-bold text-[var(--heading-color)] mt-4 mb-2">Medir</h3>
              <p className="text-[var(--text-color)]/80 max-w-32">Evalúa tu estado energético actual</p>
            </div>

            {/* Flecha 1 */}
            <div className="hidden lg:block text-[var(--primary-color)] text-2xl animate-pulse">→</div>

            {/* Paso 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-4xl text-white shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  🎯
                </div>
                <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-xl font-bold text-[var(--heading-color)] mt-4 mb-2">Decidir</h3>
              <p className="text-[var(--text-color)]/80 max-w-32">Elige qué aspectos armonizar</p>
            </div>

            {/* Flecha 2 */}
            <div className="hidden lg:block text-[var(--primary-color)] text-2xl animate-pulse">→</div>

            {/* Paso 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-4xl text-white shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  🔮
                </div>
                <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-xl font-bold text-[var(--heading-color)] mt-4 mb-2">Armonizar</h3>
              <p className="text-[var(--text-color)]/80 max-w-32">Aplica frecuencias y comandos</p>
            </div>

            {/* Flecha 3 */}
            <div className="hidden lg:block text-[var(--primary-color)] text-2xl animate-pulse">→</div>

            {/* Paso 4 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-4xl text-white shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  ✅
                </div>
                <div className="absolute -inset-4 bg-green-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-xl font-bold text-[var(--heading-color)] mt-4 mb-2">Verificar</h3>
              <p className="text-[var(--text-color)]/80 max-w-32">Confirma los cambios logrados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experiencia personalizada */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-[var(--heading-color)] mb-12">
            Experiencia <span className="text-[var(--primary-color)]">personalizada</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[var(--card-bg)] p-8 rounded-2xl border border-[var(--primary-color)]/20 shadow-xl">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-[var(--heading-color)] mb-3">Adaptación Visual</h3>
              <p className="text-[var(--text-color)]/80">Personalizado con tu nombre y tema visual (modo claro / oscuro)</p>
            </div>
            
            <div className="bg-[var(--card-bg)] p-8 rounded-2xl border border-[var(--secondary-color)]/20 shadow-xl">
              <div className="text-5xl mb-4">🔔</div>
              <h3 className="text-xl font-bold text-[var(--heading-color)] mb-3">Frecuencias Específicas</h3>
              <p className="text-[var(--text-color)]/80">Para cada sefirá, chakra y dominio de vida</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer con disclaimer */}
      <footer className="text-center py-8">
        <p className="text-sm text-[var(--text-color)]/60 max-w-md mx-auto">
          Herramienta complementaria de bienestar. Es un complemento más, no reemplaza asesoramiento médico o psicológico.
        </p>
      </footer>
    </PageWrapper>
  );
}