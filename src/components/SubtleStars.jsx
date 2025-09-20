import React from 'react'

// Fondo de estrellas sutiles, 1px aprox, con brillo suave y dependiente del tema.
// - En fondos oscuros: blancas sutiles.
// - En fondos claros: doradas/marrones muy tenues tipo partículas.
// - Pocas estrellas, twinkle leve y reordenamiento lento.
// - Respeta prefers-reduced-motion.
export default function SubtleStars({ density = 0.00008 }) {
  const canvasRef = React.useRef(null)
  const rafRef = React.useRef(0)
  const starsRef = React.useRef([])
  const ctxRef = React.useRef(null)
  const dprRef = React.useRef(1)
  const lastTRef = React.useRef(0)
  const reducedMotion = React.useMemo(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])

  const parseColor = (str) => {
    // Admite rgb(...) o #hex; devuelve [r,g,b]
    if (!str) return [20, 20, 20]
    const s = str.trim()
    if (s.startsWith('rgb')) {
      const m = s.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i)
      if (m) return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])]
    }
    if (s.startsWith('#')) {
      let hex = s.slice(1)
      if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
      const num = parseInt(hex, 16)
      return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
    }
    return [20, 20, 20]
  }

  const srgbToLin = (c) => {
    const v = c / 255
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  }

  const getBgLuminance = () => {
    try {
      const cs = getComputedStyle(document.documentElement)
      const bg = cs.getPropertyValue('--bg-color') || cs.getPropertyValue('background-color')
      const [r, g, b] = parseColor(bg)
      const R = srgbToLin(r), G = srgbToLin(g), B = srgbToLin(b)
      return 0.2126 * R + 0.7152 * G + 0.0722 * B
    } catch (_) {
      return 0.1
    }
  }

  const paletteRef = React.useRef({ type: 'dark', colors: [[255, 255, 255]] })

  const pickPalette = React.useCallback(() => {
    const L = getBgLuminance()
    if (L < 0.35) {
      paletteRef.current = { type: 'dark', colors: [[255, 255, 255]] } // blancas
    } else {
      // doradas/marrones suaves
      paletteRef.current = { type: 'light', colors: [[246, 226, 122], [197, 157, 93], [179, 129, 63]] }
    }
  }, [])

  const resize = React.useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    dprRef.current = dpr
    canvas.width = Math.max(1, Math.floor(rect.width * dpr))
    canvas.height = Math.max(1, Math.floor(rect.height * dpr))
    canvas.style.width = rect.width + 'px'
    canvas.style.height = rect.height + 'px'
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      ctxRef.current = null
      return
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)
    ctxRef.current = ctx

    // recalcular estrellas según área en CSS px
    const area = rect.width * rect.height
    const count = Math.max(40, Math.min(200, Math.floor(area * density)))
    const newStars = Array.from({ length: count }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      size: Math.random() < 0.9 ? 1 : 1.5, // aún más estrellas de 1px
      baseAlpha: 0.40 + Math.random() * 0.25, // +0.05 luminosidad base
      twinkle: 0.55 + Math.random() * 0.85, // +0.05 twinkle baseline
      phase: Math.random() * Math.PI * 2,
      off: Math.random() < 0.06, // menos apagadas al inicio
      color: paletteRef.current.colors[Math.floor(Math.random() * paletteRef.current.colors.length)],
      driftX: (Math.random() - 0.5) * 0.02, // ligero drift
      driftY: (Math.random() - 0.5) * 0.02,
      reseedAt: performance.now() + 8000 + Math.random() * 12000,
    }))
    starsRef.current = newStars
  }, [density])

  React.useEffect(() => {
    pickPalette()
    const canvas = canvasRef.current
    if (!canvas) return
    resize()
    let mounted = true

    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    // observar cambios de tema (si cambia --bg-color)
    const ro = new MutationObserver(() => {
      pickPalette(); resize()
    })
    ro.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] })

    if (!reducedMotion) {
      const loop = (t) => {
        if (!mounted) return
        const ctx = ctxRef.current
        if (!ctx) { rafRef.current = requestAnimationFrame(loop); return }
        const canvas = canvasRef.current
        if (!canvas) { rafRef.current = requestAnimationFrame(loop); return }
        const width = ctx.canvas?.clientWidth || canvas.clientWidth || 0
        const height = ctx.canvas?.clientHeight || canvas.clientHeight || 0
        if (width === 0 || height === 0) { rafRef.current = requestAnimationFrame(loop); return }
        ctx.clearRect(0, 0, width, height)
        const dt = (t - lastTRef.current) / 1000
        lastTRef.current = t

        starsRef.current.forEach((s, i) => {
          // twinkle + flicker suave
          const tw = 0.7 + 0.3 * Math.sin(t * 0.001 * s.twinkle + s.phase)
          let alpha = s.off ? 0 : s.baseAlpha * tw
          // pequeños apagones aleatorios
          if (Math.random() < 0.0025) s.off = !s.off // un poco más de encendidos

          // drift sutil y resiembra ocasional para cambiar el orden
          s.x += s.driftX; s.y += s.driftY
          if (s.x < 0) s.x = width; if (s.x > width) s.x = 0
          if (s.y < 0) s.y = height; if (s.y > height) s.y = 0
          if (t > s.reseedAt) {
            s.x = Math.random() * width
            s.y = Math.random() * height
            s.reseedAt = t + 8000 + Math.random() * 12000
          }

          const [r, g, b] = s.color
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`
          ctx.fillRect(s.x, s.y, s.size, s.size)
        })
        rafRef.current = requestAnimationFrame(loop)
      }
      rafRef.current = requestAnimationFrame(loop)
    } else {
      // Sin animación: pintar una vez, partículas estáticas
      const ctx = ctxRef.current
      const canvas = canvasRef.current
      const width = ctx?.canvas?.clientWidth || canvas?.clientWidth || 0
      const height = ctx?.canvas?.clientHeight || canvas?.clientHeight || 0
      if (ctx && canvas && width > 0 && height > 0) {
        ctx.clearRect(0, 0, width, height)
        starsRef.current.forEach((s) => {
          const [r, g, b] = s.color
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${s.baseAlpha})`
          ctx.fillRect(s.x, s.y, s.size, s.size)
        })
      }
    }

    return () => {
      mounted = false
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
      // limpiar refs para evitar accesos a elementos inexistentes
      ctxRef.current = null
    }
  }, [pickPalette, resize, reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none"
      aria-hidden="true"
    />
  )
}
