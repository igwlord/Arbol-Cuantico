import React from 'react'

const GlobalMeasurementGrid = ({ 
  label, 
  value, 
  onChange, 
  description,
  color = "purple" 
}) => {
  const colorClasses = {
    purple: "bg-purple-500 border-purple-300",
    blue: "bg-blue-500 border-blue-300", 
    green: "bg-green-500 border-green-300",
    gold: "bg-yellow-500 border-yellow-300"
  }

  return (
    <div className="bg-gradient-to-r from-[var(--card-bg)]/50 to-[var(--card-bg)]/30 rounded-lg p-6 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-lg font-bold text-[var(--heading-color)] mb-1">
            {label}
          </h4>
          {description && (
            <p className="text-sm text-[var(--text-color)]/70">
              {description}
            </p>
          )}
        </div>
        <div className="text-2xl font-bold text-[var(--primary-color)] min-w-[3rem] text-center">
          {value}
        </div>
      </div>

      {/* Grid de Medición */}
      <div className="space-y-3 pb-6 pt-2">
        {/* Scale Numbers */}
        <div className="flex justify-between text-xs text-[var(--text-color)]/50 px-1">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
            <span key={num} className="text-center">{num}</span>
          ))}
        </div>
        
        {/* Interactive Slider Container */}
        <div className="relative">
          {/* Background Grid Lines */}
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
            value={value}
            onChange={e => onChange(e.target.value)}
            className="absolute top-0 left-0 w-full h-8 opacity-0 cursor-pointer"
          />
          
          {/* Custom Dot */}
          <div 
            className={`absolute top-1/2 w-5 h-5 ${colorClasses[color]} border-2 border-white shadow-xl rounded-full transform -translate-y-1/2 pointer-events-none transition-all duration-200`}
            style={{ 
              left: `calc(${(value / 10) * 100}% - 0.625rem)`
            }}
          />
        </div>
      </div>

      {/* Level Description */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-xs text-[var(--text-color)]/60 text-center">
          <span className="font-medium">
            {value <= 3 && "Energía Baja"}
            {value >= 4 && value <= 6 && "Energía Equilibrada"} 
            {value >= 7 && value <= 8 && "Energía Alta"}
            {value >= 9 && "Energía Elevada"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default GlobalMeasurementGrid