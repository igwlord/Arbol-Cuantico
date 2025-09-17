import React from 'react'

export default function TreeOfLifeDiagram({ sefirotData, onSefirahClick, playingFrequency }) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <svg
        viewBox="0 0 400 600"
        className="w-full h-auto"
        style={{ maxHeight: '70vh' }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Tree connections */}
        <g stroke="var(--primary-color)" strokeWidth="1" opacity="0.3">
          {/* Keter to Chokmah and Binah */}
          <line x1="200" y1="60" x2="120" y2="140" />
          <line x1="200" y1="60" x2="280" y2="140" />
          
          {/* Chokmah to Binah (hidden path) */}
          <line x1="120" y1="140" x2="280" y2="140" strokeDasharray="5,5" />
          
          {/* From Chokmah and Binah to Chesed and Geburah */}
          <line x1="120" y1="140" x2="120" y2="260" />
          <line x1="280" y1="140" x2="280" y2="260" />
          
          {/* To Tiferet */}
          <line x1="120" y1="140" x2="200" y2="200" />
          <line x1="280" y1="140" x2="200" y2="200" />
          <line x1="120" y1="260" x2="200" y2="200" />
          <line x1="280" y1="260" x2="200" y2="200" />
          
          {/* From Chesed and Geburah to Netzach and Hod */}
          <line x1="120" y1="260" x2="120" y2="380" />
          <line x1="280" y1="260" x2="280" y2="380" />
          
          {/* To Yesod */}
          <line x1="200" y1="200" x2="200" y2="320" />
          <line x1="120" y1="380" x2="200" y2="320" />
          <line x1="280" y1="380" x2="200" y2="320" />
          
          {/* Yesod to Malkut */}
          <line x1="200" y1="320" x2="200" y2="440" />
          
          {/* Da'at connections (hidden) */}
          <line x1="200" y1="100" x2="120" y2="140" strokeDasharray="2,2" opacity="0.2" />
          <line x1="200" y1="100" x2="280" y2="140" strokeDasharray="2,2" opacity="0.2" />
        </g>

        {/* Sefirot circles */}
        {sefirotData.map((sefirah) => {
          const isPlaying = playingFrequency === sefirah.frequency
          return (
            <g key={sefirah.name}>
              <circle
                cx={sefirah.x}
                cy={sefirah.y}
                r="30"
                fill={sefirah.color}
                stroke="var(--primary-color)"
                strokeWidth="2"
                className={`cursor-pointer transition-all duration-300 ${
                  isPlaying ? 'animate-pulse' : 'hover:scale-110'
                }`}
                filter={isPlaying ? "url(#glow)" : "none"}
                onClick={() => onSefirahClick(sefirah)}
              />
              <text
                x={sefirah.x}
                y={sefirah.y - 40}
                textAnchor="middle"
                className="fill-current text-[var(--text-color)] text-sm font-bold pointer-events-none"
              >
                {sefirah.name}
              </text>
              <text
                x={sefirah.x}
                y={sefirah.y + 50}
                textAnchor="middle"
                className="fill-current text-[var(--text-color)] text-xs pointer-events-none"
              >
                {sefirah.hebrew}
              </text>
              <text
                x={sefirah.x}
                y={sefirah.y + 65}
                textAnchor="middle"
                className="fill-current text-[var(--text-color)] text-xs pointer-events-none"
              >
                {sefirah.frequency}Hz
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}