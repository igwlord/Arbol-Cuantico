import React from 'react'

const TreeOfLifeDiagram = ({ onNodeClick }) => {
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
    maljut: { cx: 50, cy: 110 },
  };

  const paths = [
    { d: "M 50 10 V 35" }, 
    { d: "M 50 35 V 60" }, 
    { d: "M 50 60 V 90" }, 
    { d: "M 50 90 V 110" },
    { d: "M 30 25 V 45" }, 
    { d: "M 30 45 V 75" }, 
    { d: "M 70 25 V 45" }, 
    { d: "M 70 45 V 75" },
    { d: "M 30 25 L 70 25" }, 
    { d: "M 30 45 L 70 45" }, 
    { d: "M 30 75 L 70 75" },
    { d: "M 50 10 L 30 25" }, 
    { d: "M 50 10 L 70 25" }, 
    { d: "M 30 25 L 50 60" }, 
    { d: "M 70 25 L 50 60" },
    { d: "M 30 45 L 50 60" }, 
    { d: "M 70 45 L 50 60" }, 
    { d: "M 30 75 L 50 90" }, 
    { d: "M 70 75 L 50 90" },
    { d: "M 50 60 L 30 75" }, 
    { d: "M 50 60 L 70 75" }, 
    { d: "M 30 25 L 70 45" }, 
    { d: "M 70 25 L 30 45" },
    { d: "M 30 25 L 50 35", strokeDasharray: "2,2" }, 
    { d: "M 70 25 L 50 35", strokeDasharray: "2,2" },
    { d: "M 30 45 L 50 35", strokeDasharray: "2,2" }, 
    { d: "M 70 45 L 50 35", strokeDasharray: "2,2" },
  ];

  // Get SEFIROT_DATA from parent component or use the same data structure
  const SEFIROT_DATA = [
    {"id":"maljut","nombre":"Maljut — Reino / Manifestación","chakra":"Raíz","frecuenciaHz":174,"comando":"Yo anclo la luz en la materia, manifiesto abundancia y orden en mi vida terrenal. Hecho está.","tooltip":"Frecuencia de arraigo y presencia corporal.","orden":1},
    {"id":"yesod","nombre":"Yesod — Fundamento / Soporte","chakra":"Sacro","frecuenciaHz":285,"comando":"Yo activo el fundamento sagrado, alineo mis emociones y creo puentes de energía para manifestar lo invisible. Hecho está.","tooltip":"Integración etérica y emocional.","orden":2},
    {"id":"hod","nombre":"Hod — Esplendor / Mente brillante","chakra":"Plexo solar (aspecto mental)","frecuenciaHz":396,"comando":"Yo despierto la claridad del esplendor, comunico con verdad y libero mi creatividad en forma divina. Hecho está.","tooltip":"Liberación de peso mental, claridad expresiva.","orden":3},
    {"id":"netsaj","nombre":"Nétsaj — Victoria / Persistencia","chakra":"Plexo solar (voluntad)","frecuenciaHz":432,"comando":"Yo activo la energía de la victoria, avanzo con confianza y sostengo mis metas con perseverancia. Hecho está.","tooltip":"Coherencia, vitalidad y avance.","orden":4},
    {"id":"tiferet","nombre":"Tiféret — Belleza / Armonía","chakra":"Corazón","frecuenciaHz":528,"comando":"Yo equilibro mi corazón con la verdad, integro amor y fuerza en perfecta armonía. Hecho está.","tooltip":"Coherencia cardíaca, integración.","orden":5},
    {"id":"guevura","nombre":"Guevurá — Rigor / Fuerza","chakra":"Plexo (disciplina, límites)","frecuenciaHz":417,"comando":"Yo despierto el poder del límite sagrado, fortalezco mi voluntad y sostengo mi vida con disciplina. Hecho está.","tooltip":"Orden, corte de inercia, foco.","orden":6},
    {"id":"jesed","nombre":"Jésed — Misericordia / Amor expansivo","chakra":"Corazón (compasión)","frecuenciaHz":639,"comando":"Yo activo la misericordia infinita, irradio compasión y amor incondicional en cada célula de mi ser. Hecho está.","tooltip":"Apertura afectiva, conexión.","orden":7},
    {"id":"bina","nombre":"Biná — Entendimiento / Estructura","chakra":"Garganta / Tercer ojo (discernimiento)","frecuenciaHz":741,"comando":"Yo ordeno mis pensamientos con discernimiento, transformo la comprensión en acción justa y equilibrada. Hecho está.","tooltip":"Purificación mental, orden.","orden":8},
    {"id":"jojma","nombre":"Jojmá — Sabiduría / Visión","chakra":"Tercer ojo (intuición)","frecuenciaHz":852,"comando":"Yo despierto la chispa de la sabiduría interior, libero la claridad y el entendimiento profundo en mi mente. Hecho está.","tooltip":"Intuición, visión superior.","orden":9},
    {"id":"keter","nombre":"Kéter — Corona / Conexión divina","chakra":"Corona","frecuenciaHz":963,"comando":"Yo activo la luz pura de la creación, abro mi conciencia al Todo y recibo la sabiduría de la Fuente. Hecho está.","tooltip":"Unidad, estado contemplativo.","orden":10},
    {"id":"daat","nombre":"Da'at — Puente de conciencia (opcional)","chakra":"Entre ceja y corona (integración)","frecuenciaHz":936,"comando":"Yo integro sabiduría y entendimiento en presencia consciente. Que el conocimiento se asiente en verdad. Hecho está.","tooltip":"Integración de mente superior.","orden":0,"opcional":true}
  ];

  return (
    <svg viewBox="0 0 100 120" className="w-full max-w-sm mx-auto">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <g>
        {paths.map((p, i) => (
          <path 
            key={i} 
            d={p.d} 
            stroke="var(--primary-color)" 
            strokeOpacity="0.3" 
            strokeWidth="0.5" 
            fill="none" 
            strokeDasharray={p.strokeDasharray || "none"} 
          />
        ))}
      </g>
      
      <g>
        {SEFIROT_DATA.map(sefira => {
          const pos = positions[sefira.id];
          if (!pos) return null;
          return (
            <g key={sefira.id} onClick={() => onNodeClick(sefira)} className="cursor-pointer group">
              <circle 
                cx={pos.cx} 
                cy={pos.cy} 
                r="6" 
                fill="var(--card-bg)" 
                stroke="var(--secondary-color)" 
                strokeWidth="0.5" 
                className="group-hover:stroke-[var(--primary-color)] transition-all" 
              />
              <circle 
                cx={pos.cx} 
                cy={pos.cy} 
                r="6" 
                fill="var(--primary-color)" 
                className="opacity-0 group-hover:opacity-100 transition-opacity" 
                style={{ filter: 'url(#glow)' }}
              />
              <text 
                x={pos.cx} 
                y={pos.cy + 1.5} 
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