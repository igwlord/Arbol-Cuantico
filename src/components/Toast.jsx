import React from 'react'

export default function Toast({ message, onDismiss }) {
  if (!message) return null

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in-right">
      <div className="flex items-center space-x-2">
        <span>{message}</span>
        <button
          onClick={onDismiss}
          className="ml-2 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>
  )
}