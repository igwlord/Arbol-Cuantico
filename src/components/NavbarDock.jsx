import React from 'react'

export default function NavbarDock({ currentPage, onNavigate, navItems, onConfigClick }) {
  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 bg-[var(--primary-color)] bg-opacity-10 backdrop-blur-md rounded-full p-3 shadow-lg">
      <div className="flex space-x-2">
        {navItems.map((item) => {
          const isActive = currentPage === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                isActive
                  ? 'bg-[var(--primary-color)] text-white scale-110'
                  : 'text-[var(--text-color)] hover:bg-[var(--primary-color)] hover:bg-opacity-20 hover:scale-105'
              }`}
              title={item.title}
            >
              <span className="text-xl">{item.icon}</span>
            </button>
          )
        })}
        <button
          onClick={onConfigClick}
          className="w-12 h-12 rounded-full flex items-center justify-center text-[var(--text-color)] hover:bg-[var(--primary-color)] hover:bg-opacity-20 hover:scale-105 transition-all duration-200"
          title="Configuración"
        >
          <span className="text-xl">⚙️</span>
        </button>
      </div>
    </nav>
  )
}