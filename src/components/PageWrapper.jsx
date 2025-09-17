import React from 'react'
import Starfield from './Starfield'

export default function PageWrapper({ children, title }) {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] relative overflow-x-hidden">
      <Starfield />
      <div className="relative z-10">
        {title && (
          <header className="text-center py-8">
            <h1 className="text-4xl md:text-5xl font-serif text-[var(--heading-color)] font-bold animate-fade-in">
              {title}
            </h1>
          </header>
        )}
        <main className="container mx-auto px-4 pb-20">
          {children}
        </main>
      </div>
    </div>
  )
}