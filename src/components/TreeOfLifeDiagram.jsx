import React from 'react'
import { SEFIROT_DATA } from '../data'

const TreeOfLifeDiagram = ({ onNodeClick, activeSefirotId, isPlaying }) => {
  // Convertir SEFIROT_DATA a un objeto indexado por id para fácil acceso
  const sefirotDescriptions = SEFIROT_DATA.reduce((acc, sefira) => {
    acc[sefira.id] = sefira;
    return acc;
  }, {});

  // Colores específicos para cada Sefirot
  const sefirotColors = {
    maljut: '#DC2626',  // rojo
    yesod: '#EA580C',   // naranja
    hod: '#FCD34D',     // amarillo
    netsaj: '#FCD34D',  // amarillo
    tiferet: '#16A34A', // verde
    guevura: '#16A34A', // verde
    jesed: '#16A34A',   // verde
    daat: '#F59E0B',    // dorado
    bina: '#2563EB',    // azul
    jojma: '#7C3AED',   // violeta
    keter: '#DB2777'    // magenta
  };

  // Mapeo de gradientes para glow
  const sefirotGlowGradients = {
    maljut: 'url(#glowRed)',
    yesod: 'url(#glowOrange)',
    hod: 'url(#glowYellow)',
    netsaj: 'url(#glowYellow)',
    tiferet: 'url(#glowGreen)',
    guevura: 'url(#glowGreen)',
    jesed: 'url(#glowGreen)',
    daat: 'url(#glowGold)',
    bina: 'url(#glowBlue)',
    jojma: 'url(#glowViolet)',
    keter: 'url(#glowMagenta)'
  };

  // Posiciones según modelo.md
  const positions = {
    keter: { cx: 50, cy: 10 }, 
    jojma: { cx: 30, cy: 25 }, 
    bina: { cx: 70, cy: 25 },
    daat: { cx: 50, cy: 35 }, 
    jesed: { cx: 30, cy: 45 }, 
    guevura: { cx: 70, cy: 45 },
    tiferet: { cx: 50, cy: 60 }, 
    netsaj: { cx: 30, cy: 75 }, 
    hod: { cx: 70, cy: 75 },
    yesod: { cx: 50, cy: 90 }, 
    maljut: { cx: 50, cy: 110 }
  };

  // Líneas de conexión según modelo.md
  const paths = [
    // Líneas verticales principales
    { d: "M 50 10 V 35" }, { d: "M 50 35 V 60" }, { d: "M 50 60 V 90" }, { d: "M 50 90 V 110" },
    // Líneas laterales
    { d: "M 30 25 V 45" }, { d: "M 30 45 V 75" }, { d: "M 70 25 V 45" }, { d: "M 70 45 V 75" },
    // Líneas horizontales
    { d: "M 30 25 L 70 25" }, { d: "M 30 45 L 70 45" }, { d: "M 30 75 L 70 75" },
    // Conexiones diagonales desde Keter
    { d: "M 50 10 L 30 25" }, { d: "M 50 10 L 70 25" }, 
    // Conexiones a Tiferet
    { d: "M 30 25 L 50 60" }, { d: "M 70 25 L 50 60" },
    { d: "M 30 45 L 50 60" }, { d: "M 70 45 L 50 60" }, 
    // Conexiones a Yesod
    { d: "M 30 75 L 50 90" }, { d: "M 70 75 L 50 90" },
    { d: "M 50 60 L 30 75" }, { d: "M 50 60 L 70 75" }, 
    // Conexiones cruzadas
    { d: "M 30 25 L 70 45" }, { d: "M 70 25 L 30 45" },
    // Conexiones a Daat (líneas punteadas)
    { d: "M 30 25 L 50 35", strokeDasharray: "2,2" }, { d: "M 70 25 L 50 35", strokeDasharray: "2,2" },
    { d: "M 30 45 L 50 35", strokeDasharray: "2,2" }, { d: "M 70 45 L 50 35", strokeDasharray: "2,2" },
  ];

  // Audio event listener para iluminación
  React.useEffect(() => {
    const handleSefirotAudio = (event) => {
      // Los eventos se manejan en el ComandosPage
    };

    window.addEventListener('sefirotAudioChange', handleSefirotAudio);
    return () => window.removeEventListener('sefirotAudioChange', handleSefirotAudio);
  }, []);

  return (
    <svg 
      viewBox="0 0 100 120" 
      className="w-full max-w-sm mx-auto"
    >
      {/* Definición de gradientes y filtros */}
      <defs>
        {/* Gradientes radiales para cada color de Sefirot */}
        <radialGradient id="glowRed" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.8"/>
          <stop offset="40%" stopColor="#DC2626" stopOpacity="0.4"/>
          <stop offset="70%" stopColor="#DC2626" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#DC2626" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="glowOrange" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#EA580C" stopOpacity="0.8"/>
          <stop offset="40%" stopColor="#EA580C" stopOpacity="0.4"/>
          <stop offset="70%" stopColor="#EA580C" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#EA580C" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="glowYellow" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.8"/>
          <stop offset="40%" stopColor="#FCD34D" stopOpacity="0.4"/>
          <stop offset="70%" stopColor="#FCD34D" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#FCD34D" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="glowGreen" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#16A34A" stopOpacity="0.8"/>
          <stop offset="40%" stopColor="#16A34A" stopOpacity="0.4"/>
          <stop offset="70%" stopColor="#16A34A" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#16A34A" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="glowGold" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8"/>
          <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.4"/>
          <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="glowBlue" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8"/>
          <stop offset="40%" stopColor="#2563EB" stopOpacity="0.4"/>
          <stop offset="70%" stopColor="#2563EB" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="glowViolet" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8"/>
          <stop offset="40%" stopColor="#7C3AED" stopOpacity="0.4"/>
          <stop offset="70%" stopColor="#7C3AED" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="glowMagenta" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#DB2777" stopOpacity="0.8"/>
          <stop offset="40%" stopColor="#DB2777" stopOpacity="0.4"/>
          <stop offset="70%" stopColor="#DB2777" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#DB2777" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Líneas de conexión del árbol */}
      <g>
        {paths.map((path, i) => (
          <path 
            key={i} 
            d={path.d} 
            stroke="var(--primary-color)" 
            strokeOpacity="0.3" 
            strokeWidth="0.5" 
            fill="none" 
            strokeDasharray={path.strokeDasharray || "none"} 
          />
        ))}
      </g>

      {/* Sefirot */}
      <g>
        {SEFIROT_DATA.map(sefira => {
          const position = positions[sefira.id];
          if (!position) return null;

          const isActive = activeSefirotId === sefira.id;
          const isCurrentlyPlaying = isPlaying && activeSefirotId === sefira.id;
          const sefirotColor = sefirotColors[sefira.id] || "var(--primary-color)";
          const glowGradient = sefirotGlowGradients[sefira.id];

          return (
            <g key={sefira.id} onClick={() => onNodeClick(sefira, sefirotDescriptions[sefira.id])} className="cursor-pointer group">
              {/* Círculo de glow de fondo para reproducción */}
              {isCurrentlyPlaying && (
                <circle 
                  cx={position.cx} 
                  cy={position.cy} 
                  r="10" 
                  fill={glowGradient}
                  className="animate-pulse opacity-80"
                  style={{ 
                    animationDuration: '2s',
                    transformOrigin: `${position.cx}px ${position.cy}px`
                  }}
                />
              )}
              
              {/* Círculo base */}
              <circle 
                cx={position.cx} 
                cy={position.cy} 
                r="6" 
                fill="var(--card-bg)" 
                stroke="var(--secondary-color)" 
                strokeWidth="0.5" 
                className="group-hover:stroke-[var(--primary-color)] transition-all" 
              />
              
              {/* Círculo de selección */}
              <circle 
                cx={position.cx} 
                cy={position.cy} 
                r="6" 
                fill={isActive ? sefirotColor : "transparent"}
                className={`transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-30'}`}
              />
              
              {/* Texto del nombre */}
              <text 
                x={position.cx} 
                y={position.cy + 1.5} 
                textAnchor="middle" 
                fontSize="3.5" 
                fill="var(--text-color)" 
                className="pointer-events-none font-sans"
              >
                {sefira.nombre.split('—')[0].trim()}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}

export default TreeOfLifeDiagram