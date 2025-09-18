import React from 'react'
import { SEFIROT_DATA } from '../data/index.jsx'

const SefirotMeasurementGrid = ({ 
  readings, 
  onReadingChange 
}) => {
  return (
    <div className="space-y-8">
      {SEFIROT_DATA.map((sefira, index) => (
        <div 
          key={sefira.id} 
          className="bg-gradient-to-r from-[var(--card-bg)]/50 to-[var(--card-bg)]/30 rounded-lg p-6 border border-white/10 backdrop-blur-sm"
        >
          {/* Header de la Sefirá */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-bold text-[var(--heading-color)] mb-1">
                {sefira.nombre.split("—")[0]}
              </h4>
              <p className="text-sm text-[var(--text-color)]/70">
                {sefira.nombre.split("—")[1]?.trim()} • {sefira.frecuenciaHz} Hz
              </p>
            </div>
            <div className="text-xs text-[var(--text-color)]/50 font-mono">
              #{index + 1}
            </div>
          </div>

          {/* Grid de Medición */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Medición ANTES */}
            <div className="space-y-3 p-3 rounded-lg border border-white/10 hover:border-blue-400/50 hover:bg-blue-400/5 transition-all duration-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--text-color)]">Antes</span>
                <span className="text-lg font-bold text-blue-400 min-w-[2rem] text-center">
                  {readings[sefira.id].antes}
                </span>
              </div>
              
              {/* Visual Scale Grid */}
              <div className="space-y-2 pb-4">
                {/* Scale Numbers */}
                <div className="flex justify-between text-xs text-[var(--text-color)]/50 px-1">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <span key={num} className="text-center">{num}</span>
                  ))}
                </div>
                
                {/* Interactive Slider */}
                <div className="relative">
                  {/* Background with grid */}
                  <div className="h-8 bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-green-500/20 rounded-lg border border-white/10">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex">
                      {[...Array(11)].map((_, i) => (
                        <div 
                          key={i} 
                          className="flex-1 border-r border-white/10 last:border-r-0"
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Range Input - positioned exactly over the visual bar */}
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={readings[sefira.id].antes}
                    onChange={e => onReadingChange(sefira.id, 'antes', e.target.value)}
                    className="absolute top-0 left-0 w-full h-8 opacity-0 cursor-pointer range-slider"
                  />
                  
                  {/* Custom Dot */}
                  <div 
                    className="absolute top-1/2 w-5 h-5 bg-blue-500 border-2 border-white shadow-xl rounded-full transform -translate-y-1/2 pointer-events-none transition-all duration-200"
                    style={{ 
                      left: `calc(${(readings[sefira.id].antes / 10) * 100}% - 0.625rem)`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Medición DESPUÉS */}
            <div className="space-y-3 p-3 rounded-lg border border-white/10 hover:border-green-400/50 hover:bg-green-400/5 transition-all duration-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--text-color)]">Después</span>
                <span className="text-lg font-bold text-green-400 min-w-[2rem] text-center">
                  {readings[sefira.id].despues}
                </span>
              </div>
              
              {/* Visual Scale Grid */}
              <div className="space-y-2 pb-4">
                {/* Scale Numbers */}
                <div className="flex justify-between text-xs text-[var(--text-color)]/50 px-1">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <span key={num} className="text-center">{num}</span>
                  ))}
                </div>
                
                {/* Interactive Slider */}
                <div className="relative">
                  {/* Background with grid */}
                  <div className="h-8 bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-green-500/20 rounded-lg border border-white/10">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex">
                      {[...Array(11)].map((_, i) => (
                        <div 
                          key={i} 
                          className="flex-1 border-r border-white/10 last:border-r-0"
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Range Input - positioned exactly over the visual bar */}
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={readings[sefira.id].despues}
                    onChange={e => onReadingChange(sefira.id, 'despues', e.target.value)}
                    className="absolute top-0 left-0 w-full h-8 opacity-0 cursor-pointer range-slider"
                  />
                  
                  {/* Custom Dot */}
                  <div 
                    className="absolute top-1/2 w-5 h-5 bg-green-500 border-2 border-white shadow-xl rounded-full transform -translate-y-1/2 pointer-events-none transition-all duration-200"
                    style={{ 
                      left: `calc(${(readings[sefira.id].despues / 10) * 100}% - 0.625rem)`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--text-color)]/60">Cambio energético:</span>
              <span className={`font-bold ${
                readings[sefira.id].despues > readings[sefira.id].antes 
                  ? 'text-green-400' 
                  : readings[sefira.id].despues < readings[sefira.id].antes 
                    ? 'text-red-400' 
                    : 'text-gray-400'
              }`}>
                {readings[sefira.id].despues > readings[sefira.id].antes && '+'}
                {readings[sefira.id].despues - readings[sefira.id].antes}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SefirotMeasurementGrid