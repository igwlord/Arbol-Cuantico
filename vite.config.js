import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Optimizaciones para producción
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor chunks para mejor caching
          vendor: ['react', 'react-dom']
        }
      }
    },
    // Configuración para archivos grandes (audio/video)
    chunkSizeWarningLimit: 1000
  },
  // Configuración para desarrollo
  server: {
    port: 5173,
    open: true
  },
  // Configuración para preview
  preview: {
    port: 4173,
    open: true
  }
})