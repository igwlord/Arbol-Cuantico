import React, { useState, useEffect } from 'react'

const GrowingTree = ({ onComplete }) => {
  const [phase, setPhase] = useState('roots')
  
  useEffect(() => {
    const timeline = [
      { phase: 'sefirots', delay: 0 },
      { phase: 'particles', delay: 1800 }, // Reducido de 3500ms
      { phase: 'aura', delay: 2200 }, // Reducido de 4000ms
      { phase: 'complete', delay: 2500 } // Reducido de 5000ms - Total: 2.5 segundos
    ]
    
    timeline.forEach(({ phase: newPhase, delay }) => {
      setTimeout(() => {
        setPhase(newPhase)
        if (newPhase === 'complete' && onComplete) {
          onComplete()
        }
      }, delay)
    })
  }, [onComplete])

  return (
    <div className="growing-tree-container flex items-center justify-center">
      <svg 
        width="400" 
        height="400" 
        viewBox="0 0 400 400" 
        className="growing-tree"
      >
        {/* Definiciones de gradientes y filtros mejorados */}
        <defs>
          <radialGradient id="sefirotGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="30%" stopColor="#FFD700" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#FFA500" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.2" />
          </radialGradient>

          <radialGradient id="keterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="30%" stopColor="#E6E6FA" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#9370DB" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4B0082" stopOpacity="0.3" />
          </radialGradient>

          <radialGradient id="particleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
            <stop offset="50%" stopColor="#FFA500" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.4" />
          </radialGradient>

          <radialGradient id="auraGradient" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#FFA500" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.1" />
          </radialGradient>
          
          <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="superGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Sefirot con posiciones tradicionales del Árbol de la Vida */}
        <g className={`sefirots ${phase === 'sefirots' || phase === 'particles' || phase === 'aura' || phase === 'complete' ? 'active' : ''}`}>
          {/* Maljut - Reino (base) - PRIMERO en aparecer */}
          <circle cx="200" cy="350" r="16" fill="url(#sefirotGlow)" filter="url(#superGlow)" className="sefirot sefirot-maljut" />
          <text x="200" y="357" textAnchor="middle" className="sefirot-text" fill="#FFFFFF" fontSize="10" fontWeight="bold">מלכות</text>
          
          {/* Yesod - Fundamento */}
          <circle cx="200" cy="290" r="14" fill="url(#sefirotGlow)" filter="url(#strongGlow)" className="sefirot sefirot-yesod" />
          <text x="200" y="297" textAnchor="middle" className="sefirot-text" fill="#FFFFFF" fontSize="9">יסוד</text>
          
          {/* Hod - Esplendor (derecha inferior) */}
          <circle cx="310" cy="230" r="12" fill="url(#sefirotGlow)" filter="url(#strongGlow)" className="sefirot sefirot-hod" />
          <text x="310" y="237" textAnchor="middle" className="sefirot-text" fill="#FFFFFF" fontSize="8">הוד</text>
          
          {/* Nétsaj - Victoria (izquierda inferior) */}
          <circle cx="90" cy="230" r="12" fill="url(#sefirotGlow)" filter="url(#strongGlow)" className="sefirot sefirot-netsaj" />
          <text x="90" y="237" textAnchor="middle" className="sefirot-text" fill="#FFFFFF" fontSize="8">נצח</text>
          
          {/* Tiféret - Belleza (centro) */}
          <circle cx="200" cy="200" r="15" fill="url(#sefirotGlow)" filter="url(#superGlow)" className="sefirot sefirot-tiferet" />
          <text x="200" y="207" textAnchor="middle" className="sefirot-text" fill="#FFFFFF" fontSize="9">תפארת</text>
          
          {/* Guevurá - Rigor (derecha media) */}
          <circle cx="300" cy="150" r="13" fill="url(#sefirotGlow)" filter="url(#strongGlow)" className="sefirot sefirot-guevura" />
          <text x="300" y="157" textAnchor="middle" className="sefirot-text" fill="#FFFFFF" fontSize="8">גבורה</text>
          
          {/* Jésed - Misericordia (izquierda media) */}
          <circle cx="100" cy="150" r="13" fill="url(#sefirotGlow)" filter="url(#strongGlow)" className="sefirot sefirot-jesed" />
          <text x="100" y="157" textAnchor="middle" className="sefirot-text" fill="#FFFFFF" fontSize="8">חסד</text>
          
          {/* Da'at - Conocimiento (centro superior invisible) */}
          <circle cx="200" cy="120" r="10" fill="url(#sefirotGlow)" filter="url(#strongGlow)" className="sefirot sefirot-daat" opacity="0.7" />
          
          {/* Biná - Entendimiento (superior derecha) */}
          <circle cx="280" cy="80" r="14" fill="url(#sefirotGlow)" filter="url(#strongGlow)" className="sefirot sefirot-bina" />
          <text x="280" y="87" textAnchor="middle" className="sefirot-text" fill="#FFFFFF" fontSize="9">בינה</text>
          
          {/* Jojmá - Sabiduría (superior izquierda) */}
          <circle cx="120" cy="80" r="14" fill="url(#sefirotGlow)" filter="url(#strongGlow)" className="sefirot sefirot-jojma" />
          <text x="120" y="87" textAnchor="middle" className="sefirot-text" fill="#FFFFFF" fontSize="9">חכמה</text>
          
          {/* Kéter - Corona (superior central) - ÚLTIMO en aparecer */}
          <circle cx="200" cy="40" r="16" fill="url(#keterGlow)" filter="url(#superGlow)" className="sefirot sefirot-keter" />
          <text x="200" y="47" textAnchor="middle" className="sefirot-text" fill="#FFFFFF" fontSize="10" fontWeight="bold">כתר</text>
        </g>

        {/* Partículas de energía místicas */}
        <g className={`particles ${phase === 'particles' || phase === 'aura' || phase === 'complete' ? 'active' : ''}`}>
          <circle cx="150" cy="130" r="3" fill="url(#particleGlow)" className="particle particle-1" opacity="0.8" filter="url(#strongGlow)" />
          <circle cx="250" cy="100" r="2" fill="url(#particleGlow)" className="particle particle-2" opacity="0.6" filter="url(#strongGlow)" />
          <circle cx="130" cy="260" r="2.5" fill="url(#particleGlow)" className="particle particle-3" opacity="0.9" filter="url(#strongGlow)" />
          <circle cx="270" cy="180" r="1.5" fill="url(#particleGlow)" className="particle particle-4" opacity="0.7" filter="url(#strongGlow)" />
          <circle cx="180" cy="320" r="2" fill="url(#particleGlow)" className="particle particle-5" opacity="0.8" filter="url(#strongGlow)" />
          <circle cx="220" cy="250" r="1.8" fill="url(#particleGlow)" className="particle particle-6" opacity="0.6" filter="url(#strongGlow)" />
          <circle cx="160" cy="190" r="2.2" fill="url(#particleGlow)" className="particle particle-7" opacity="0.7" filter="url(#strongGlow)" />
          <circle cx="240" cy="160" r="1.3" fill="url(#particleGlow)" className="particle particle-8" opacity="0.5" filter="url(#strongGlow)" />
        </g>

        {/* Aura cósmica alrededor de los Sefirot */}
        <g className={`aura ${phase === 'aura' || phase === 'complete' ? 'active' : ''}`}>
          <circle cx="200" cy="200" r="180" fill="none" stroke="url(#auraGradient)" strokeWidth="2" opacity="0.4" className="aura-circle aura-1" />
          <circle cx="200" cy="200" r="150" fill="none" stroke="url(#auraGradient)" strokeWidth="1.5" opacity="0.3" className="aura-circle aura-2" />
          <circle cx="200" cy="200" r="120" fill="none" stroke="url(#auraGradient)" strokeWidth="1" opacity="0.2" className="aura-circle aura-3" />
        </g>
      </svg>
    </div>
  )
}

export default GrowingTree