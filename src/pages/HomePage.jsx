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
  // Estado para controlar qué tarjetas están volteadas
  const [flippedCards, setFlippedCards] = React.useState({
    card1: false,
    card2: false,
    card3: false,
    card4: false
  });

  // Función para voltear tarjetas
  const toggleCard = (cardId) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  // Datos de las tarjetas con contenido del frente y reverso
  const benefitsData = [
    {
      id: 'card1',
      icon: '🌿',
      title: 'Alivio Inmediato',
      frontText: 'Tensiones se disuelven',
      backText: 'Tu cuerpo libera bloqueos y la energía vital fluye con libertad.',
      gradientColor: 'from-green-400/20 to-emerald-600/20',
      borderColor: 'border-green-400/30',
      shadowColor: 'hover:shadow-green-400/20'
    },
    {
      id: 'card2',
      icon: '💎',
      title: 'Equilibrio Total',
      frontText: 'Armonía en cuerpo y espacio',
      backText: 'Armonía entre lo físico, emocional y espiritual. Espacios en coherencia.',
      gradientColor: 'from-blue-400/20 to-cyan-600/20',
      borderColor: 'border-blue-400/30',
      shadowColor: 'hover:shadow-blue-400/20'
    },
    {
      id: 'card3',
      icon: '✨',
      title: 'Claridad Mental',
      frontText: 'Decisiones más sabias',
      backText: 'Mente clara, sin distracciones. Visión precisa para decisiones.',
      gradientColor: 'from-purple-400/20 to-violet-600/20',
      borderColor: 'border-purple-400/30',
      shadowColor: 'hover:shadow-purple-400/20'
    },
    {
      id: 'card4',
      icon: '🌌',
      title: 'Conexión Profunda',
      frontText: 'Con tu esencia interior',
      backText: 'Reconecta con tu esencia. Propósito renovado y auténtico.',
      gradientColor: 'from-yellow-400/20 to-orange-600/20',
      borderColor: 'border-yellow-400/30',
      shadowColor: 'hover:shadow-yellow-400/20'
    }
  ];

  return (
    <PageWrapper>
      {/* Hero Section con estrellas sutiles */}
      <div className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Fondo degradado suave */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 via-purple-900/5 to-blue-900/10"></div>
        
        {/* Sistema de estrellas sutiles */}
        <StarField />
        
        {/* Contenido Hero */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-[var(--heading-color)] mb-4 sm:mb-6 leading-tight">
            <span className="block text-lg sm:text-2xl md:text-3xl lg:text-4xl text-[var(--primary-color)] mb-2 sm:mb-4 font-light">
              REINICIA TU ENERGÍA
            </span>
            <span className="bg-gradient-to-r from-[var(--primary-color)] via-yellow-400 to-[var(--secondary-color)] bg-clip-text text-transparent animate-pulse">
              RESTAURA TU EQUILIBRIO
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--text-color)]/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            Portal práctico que armoniza cuerpo y mente con sonido y geometría sagrada.
          </p>
          
          {/* Botón CTA principal con animación */}
          <button 
            onClick={() => onNavigate('comandos')}
            className="group relative bg-gradient-to-r from-[var(--primary-color)] via-purple-600 to-[var(--secondary-color)] text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg md:text-xl font-bold shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 hover:rotate-1 transform w-full sm:w-auto max-w-sm mx-auto"
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
      <section className="py-12 sm:py-16 bg-[var(--card-bg)]/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-base sm:text-lg md:text-xl text-[var(--text-color)]/90 leading-relaxed max-w-4xl mx-auto">
            <strong className="text-[var(--primary-color)]">Árbol Cuántico</strong> integra 
            <span className="text-[var(--secondary-color)] font-semibold"> Cábala, radiestesia, cristales y frecuencias</span>. 
            Una herramienta 
            <span className="text-[var(--primary-color)] font-semibold"> clara y efectiva</span> para medir y armonizar tu energía.
          </p>
        </div>
      </section>

      {/* Beneficios con tarjetas flip */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[var(--heading-color)] text-center mb-12 sm:mb-16">
            Beneficios que <span className="text-[var(--primary-color)]">experimentarás</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefitsData.map((benefit) => (
              <div key={benefit.id} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradientColor} rounded-full blur-xl group-hover:blur-2xl transition-all duration-500`}></div>
                
                {/* Tarjeta Flip */}
                <div 
                  className={`flip-card ${flippedCards[benefit.id] ? 'flipped' : ''}`}
                  onClick={() => toggleCard(benefit.id)}
                >
                  <div className="flip-card-inner">
                    {/* Frente de la tarjeta */}
                    <div className={`flip-card-front relative bg-[var(--card-bg)] ${benefit.borderColor} shadow-xl ${benefit.shadowColor} hover:-translate-y-2 transition-all duration-500`}>
                      <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">{benefit.icon}</div>
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--heading-color)] mb-2 sm:mb-3">{benefit.title}</h3>
                      <p className="text-sm sm:text-base text-[var(--text-color)]/80 leading-relaxed">{benefit.frontText}</p>
                    </div>

                    {/* Reverso de la tarjeta */}
                    <div className="flip-card-back">
                      <div className="flip-card-back-content">
                        <h3>{benefit.title}</h3>
                        <p>"{benefit.backText}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona - Proceso visual en 4 pasos */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[var(--card-bg)]/30 to-[var(--card-bg)]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[var(--heading-color)] text-center mb-12 sm:mb-16">
            Cómo <span className="text-[var(--primary-color)]">funciona</span>
          </h2>
          
          <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8">
            {/* Paso 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative">
                <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-[var(--primary-color)] to-purple-600 rounded-full flex items-center justify-center text-3xl sm:text-4xl text-white shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  🔍
                </div>
                <div className="absolute -inset-4 bg-[var(--primary-color)]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--heading-color)] mt-3 sm:mt-4 mb-2">Medir</h3>
              <p className="text-sm sm:text-base text-[var(--text-color)]/80 max-w-32 leading-relaxed">Evalúa tu estado energético</p>
            </div>

            {/* Flecha 1 */}
            <div className="hidden lg:block text-[var(--primary-color)] text-2xl animate-pulse">→</div>

            {/* Paso 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative">
                <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-3xl sm:text-4xl text-white shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  🎯
                </div>
                <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--heading-color)] mt-3 sm:mt-4 mb-2">Decidir</h3>
              <p className="text-sm sm:text-base text-[var(--text-color)]/80 max-w-32 leading-relaxed">Elige qué armonizar</p>
            </div>

            {/* Flecha 2 */}
            <div className="hidden lg:block text-[var(--primary-color)] text-2xl animate-pulse">→</div>

            {/* Paso 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative">
                <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-3xl sm:text-4xl text-white shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  🔮
                </div>
                <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--heading-color)] mt-3 sm:mt-4 mb-2">Armonizar</h3>
              <p className="text-sm sm:text-base text-[var(--text-color)]/80 max-w-32 leading-relaxed">Aplica frecuencias</p>
            </div>

            {/* Flecha 3 */}
            <div className="hidden lg:block text-[var(--primary-color)] text-2xl animate-pulse">→</div>

            {/* Paso 4 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative">
                <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-3xl sm:text-4xl text-white shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  ✅
                </div>
                <div className="absolute -inset-4 bg-green-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--heading-color)] mt-3 sm:mt-4 mb-2">Verificar</h3>
              <p className="text-sm sm:text-base text-[var(--text-color)]/80 max-w-32 leading-relaxed">Confirma cambios</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer con disclaimer */}
      <footer className="text-center py-6 sm:py-8">
        <p className="text-xs sm:text-sm text-[var(--text-color)]/60 max-w-sm sm:max-w-md mx-auto px-4 leading-relaxed">
          Herramienta complementaria de bienestar. No reemplaza asesoramiento médico.
        </p>
      </footer>
    </PageWrapper>
  );
}