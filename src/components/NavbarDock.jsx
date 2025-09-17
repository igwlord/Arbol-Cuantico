import React from 'react'

export default function NavbarDock({ currentPage, onNavigate, navItems, onConfigClick }) {
  return (
    <>
      {/* Partículas de fondo sutiles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-1 h-1 bg-[var(--primary-color)] rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-[var(--secondary-color)] rounded-full animate-pulse opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-[var(--primary-color)] rounded-full animate-pulse opacity-50" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-60 right-1/3 w-0.5 h-0.5 bg-[var(--secondary-color)] rounded-full animate-pulse opacity-70" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Navbar mejorado */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 bg-[var(--primary-color)] bg-opacity-15 backdrop-blur-xl rounded-full p-3 shadow-2xl border border-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
        <div className="flex space-x-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ease-out relative overflow-hidden group ${
                  isActive
                    ? 'bg-gradient-to-br from-[var(--primary-color)] to-purple-600 text-white scale-110 shadow-lg shadow-[var(--primary-color)]/50'
                    : 'text-[var(--text-color)] hover:bg-gradient-to-br hover:from-[var(--primary-color)]/20 hover:to-purple-600/20 hover:scale-105 hover:shadow-lg hover:shadow-[var(--primary-color)]/30'
                }`}
                title={item.title}
              >
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                {/* Glow effect para el activo */}
                {isActive && (
                  <div className="absolute inset-0 bg-[var(--primary-color)] rounded-full animate-pulse opacity-30 scale-150"></div>
                )}
                
                <span className="text-xl relative z-10 drop-shadow-sm transform group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
              </button>
            )
          })}
          
          {/* Botón de configuración mejorado */}
          <button
            onClick={onConfigClick}
            className="w-12 h-12 rounded-full flex items-center justify-center text-[var(--text-color)] hover:bg-gradient-to-br hover:from-[var(--primary-color)]/20 hover:to-purple-600/20 hover:scale-105 hover:shadow-lg hover:shadow-[var(--primary-color)]/30 transition-all duration-300 ease-out relative overflow-hidden group"
            title="Configuración"
          >
            {/* Efecto de brillo en hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            <span className="text-xl relative z-10 drop-shadow-sm transform group-hover:scale-110 group-hover:rotate-90 transition-all duration-300">
              ⚙️
            </span>
          </button>
        </div>
      </nav>
    </>
  )
}