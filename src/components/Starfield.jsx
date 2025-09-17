import React from 'react'

export default React.memo(function Starfield({ starCount = 1500 }) {
  const canvasRef = React.useRef(null)
  const mousePos = React.useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 })

  React.useEffect(() => {
    const handleMouseMove = (e) => { mousePos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', handleMouseMove)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    window.addEventListener('resize', resize)
    resize()

    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
      radius: Math.random() * 0.8 + 0.2,
    }))

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const focalX = centerX - (mousePos.current.x - centerX) * 0.1
      const focalY = centerY - (mousePos.current.y - centerY) * 0.1

      stars.forEach(star => {
        star.z -= 0.2
        if (star.z <= 0) star.z = canvas.width
        const k = 128 / star.z
        const px = (star.x - focalX) * k + focalX
        const py = (star.y - focalY) * k + focalY
        if (px >= 0 && px < canvas.width && py >= 0 && py < canvas.height) {
          const size = (1 - star.z / canvas.width) * 2
          const alpha = (1 - star.z / canvas.width) * 0.8
          ctx.beginPath()
          ctx.arc(px, py, size * star.radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.fill()
        }
      })
      animationFrameId = requestAnimationFrame(render)
    }

    render()
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', handleMouseMove) }
  }, [starCount])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" aria-hidden="true" />
})