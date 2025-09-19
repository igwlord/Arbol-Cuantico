import React, { useState } from 'react'

export default function NavbarDock({ currentPage, onNavigate, navItems, onConfigClick }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const currentItem = navItems.find(item => item.id === currentPage)
  
  return (
    <>
      {/* Fondo dinámico eliminado */}

      {/* Navbar colapsable para móvil / completo para desktop */}
  <nav aria-label="Navegación principal" className="fixed bottom-1 md:bottom-4 left-1/2 transform -translate-x-1/2 z-40 bg-[var(--primary-color)] bg-opacity-15 backdrop-blur-xl rounded-full shadow-2xl border border-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
        
        {/* Versión móvil colapsable */}
        <div className="md:hidden">
          {!isExpanded ? (
            // Modo compacto - solo botón activo + hamburguesa
            <div className="flex items-center space-x-1 p-1">
              {/* Botón de página actual */}
              {currentItem && (
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-[var(--primary-color)] to-purple-600 text-white shadow-lg shadow-[var(--primary-color)]/50 relative overflow-hidden ring-2 ring-white/70 ring-offset-1 ring-offset-transparent"
                  title={currentItem.title}
                  aria-label={currentItem.title}
                  aria-current="page"
                >
                  <span className="text-sm relative z-10 drop-shadow-sm">
                    {currentItem.icon}
                  </span>
                  <div className="absolute inset-0 bg-[var(--primary-color)] rounded-full animate-pulse opacity-30"></div>
                </button>
              )}
              
              {/* Botón hamburguesa */}
              <button
                onClick={() => setIsExpanded(true)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-color)] hover:bg-gradient-to-br hover:from-[var(--primary-color)]/20 hover:to-purple-600/20 transition-all duration-300"
                title="Menú"
                aria-label="Abrir menú"
              >
                <span className="text-sm">☰</span>
              </button>
            </div>
          ) : (
            // Modo expandido - todos los botones
            <div className="flex items-center space-x-1 p-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id)
                      setIsExpanded(false)
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-out relative overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-br from-[var(--primary-color)] to-purple-600 text-white shadow-lg shadow-[var(--primary-color)]/50 ring-2 ring-white/70 ring-offset-1 ring-offset-transparent'
                        : 'text-[var(--text-color)] hover:bg-gradient-to-br hover:from-[var(--primary-color)]/20 hover:to-purple-600/20'
                    }`}
                    title={item.title}
                    aria-label={item.title}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="text-sm relative z-10 drop-shadow-sm">
                      {item.icon}
                    </span>
                    {isActive && (
                      <div className="absolute inset-0 bg-[var(--primary-color)] rounded-full animate-pulse opacity-30"></div>
                    )}
                  </button>
                )
              })}
              
              {/* Botón de configuración */}
              <button
                onClick={() => {
                  onConfigClick()
                  setIsExpanded(false)
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-color)] hover:bg-gradient-to-br hover:from-[var(--primary-color)]/20 hover:to-purple-600/20 transition-all duration-300"
                title="Configuración"
                aria-label="Abrir configuración"
              >
                <span className="text-sm">⚙️</span>
              </button>
              
              {/* Botón cerrar */}
              <button
                onClick={() => setIsExpanded(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-color)] hover:bg-gradient-to-br hover:from-[var(--primary-color)]/20 hover:to-purple-600/20 transition-all duration-300"
                title="Cerrar"
                aria-label="Cerrar menú"
              >
                <span className="text-sm">✕</span>
              </button>
            </div>
          )}
        </div>

        {/* Versión desktop - siempre expandida */}
        <div className="hidden md:flex space-x-2 p-3">
          {navItems.map((item) => {
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ease-out relative overflow-hidden group ${
                  isActive
                    ? 'bg-gradient-to-br from-[var(--primary-color)] to-purple-600 text-white scale-110 shadow-lg shadow-[var(--primary-color)]/50 ring-2 ring-white/70 ring-offset-1 ring-offset-transparent'
                    : 'text-[var(--text-color)] hover:bg-gradient-to-br hover:from-[var(--primary-color)]/20 hover:to-purple-600/20 hover:scale-105 hover:shadow-lg hover:shadow-[var(--primary-color)]/30'
                }`}
                title={item.title}
                aria-label={item.title}
                aria-current={isActive ? 'page' : undefined}
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
          
          {/* Botón de configuración desktop */}
          <button
            onClick={onConfigClick}
            className="w-12 h-12 rounded-full flex items-center justify-center text-[var(--text-color)] hover:bg-gradient-to-br hover:from-[var(--primary-color)]/20 hover:to-purple-600/20 hover:scale-105 hover:shadow-lg hover:shadow-[var(--primary-color)]/30 transition-all duration-300 ease-out relative overflow-hidden group"
            title="Configuración"
            aria-label="Abrir configuración"
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