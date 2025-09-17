import React from 'react'

export default function AnimatedSymbol() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" className="mb-8">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle cx="50" cy="50" r="10" fill="var(--primary-color)" filter="url(#glow)" className="animate-seed-center" />
      {[0, 60, 120, 180, 240, 300].map(angle => (
        <circle key={angle} cx="50" cy="50" r="20" stroke="var(--secondary-color)" strokeWidth="2" fill="none" transform={`rotate(${angle} 50 50)`} className="animate-seed-petal" style={{ animationDelay: `${angle / 300}s`}} />
      ))}
    </svg>
  )
}