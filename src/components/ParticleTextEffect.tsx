import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  color: string
  velocity: { x: number; y: number }
}

interface ParticleTextEffectProps {
  texts?: string[]
  fontSize?: number
  particleSize?: number
  mouseRadius?: number
  className?: string
}

export function ParticleTextEffect({
  texts = ['权盾', 'RIGHTS SHIELD', '消费维权', '法律助手'],
  fontSize = 100,
  particleSize = 1.8,
  mouseRadius = 60,
  className = '',
}: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const switchTimerRef = useRef(0)

  const getCharacterPixels = useCallback((text: string, canvas: HTMLCanvasElement): { x: number; y: number }[] => {
    const tempCanvas = document.createElement('canvas')
    const tempCtx = tempCanvas.getContext('2d')!
    tempCanvas.width = canvas.width
    tempCanvas.height = canvas.height

    const scaledFontSize = Math.min(
      fontSize * (canvas.width / 1200),
      fontSize * (canvas.height / 300),
      fontSize * 2.5
    )

    tempCtx.fillStyle = 'white'
    tempCtx.font = `bold ${scaledFontSize}px Inter, sans-serif`
    tempCtx.textAlign = 'center'
    tempCtx.textBaseline = 'middle'

    const words = text.split(' ')
    if (words.length <= 2) {
      tempCtx.fillText(text, canvas.width / 2, canvas.height / 2)
    } else {
      const lineHeight = scaledFontSize * 1.2
      const startY = canvas.height / 2 - (words.length - 1) * lineHeight / 2
      words.forEach((word, i) => {
        tempCtx.fillText(word, canvas.width / 2, startY + i * lineHeight)
      })
    }

    const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels: { x: number; y: number }[] = []
    const gap = 4

    for (let y = 0; y < canvas.height; y += gap) {
      for (let x = 0; x < canvas.width; x += gap) {
        const alpha = imageData.data[(y * canvas.width + x) * 4 + 3]
        if (alpha > 128) {
          pixels.push({ x, y })
        }
      }
    }
    return pixels
  }, [fontSize])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      initParticles()
    }

    const initParticles = () => {
      const currentText = texts[switchTimerRef.current % texts.length]
      const pixels = getCharacterPixels(currentText, canvas)
      const dpr = window.devicePixelRatio || 1
      const existing = particlesRef.current
      const newParticles: Particle[] = []
      const colors = ['#e5e5e5', '#a3a3a3', '#d4d4d4', '#737373', '#ffffff']

      if (existing.length === 0) {
        pixels.forEach((pixel) => {
          newParticles.push({
            x: Math.random() * (canvas.width / dpr),
            y: Math.random() * (canvas.height / dpr),
            baseX: pixel.x / dpr,
            baseY: pixel.y / dpr,
            size: particleSize,
            color: colors[Math.floor(Math.random() * colors.length)],
            velocity: { x: 0, y: 0 },
          })
        })
      } else {
        pixels.forEach((pixel, i) => {
          const p = existing[i] || {
            x: Math.random() * (canvas.width / dpr),
            y: Math.random() * (canvas.height / dpr),
            size: particleSize,
            color: colors[Math.floor(Math.random() * colors.length)],
          }
          newParticles.push({
            ...p,
            baseX: pixel.x / dpr,
            baseY: pixel.y / dpr,
            velocity: { x: 0, y: 0 },
          })
        })
      }
      particlesRef.current = newParticles
    }

    const mouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const mouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    canvas.addEventListener('mousemove', mouseMove)
    canvas.addEventListener('mouseleave', mouseLeave)

    const animate = () => {
      const dpr = window.devicePixelRatio || 1
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)

      particlesRef.current.forEach((p) => {
        const mx = mouseRef.current.x
        const my = mouseRef.current.y
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = mouseRadius

        let targetX = p.baseX
        let targetY = p.baseY

        if (dist < maxDist && dist > 0) {
          const force = (maxDist - dist) / maxDist
          targetX = p.x - (dx / dist) * force * 80
          targetY = p.y - (dy / dist) * force * 80
        }

        const spring = 0.05
        const damping = 0.9
        p.velocity.x = (p.velocity.x + (targetX - p.x) * spring) * damping
        p.velocity.y = (p.velocity.y + (targetY - p.y) * spring) * damping
        p.x += p.velocity.x
        p.y += p.velocity.y

        const moveDist = Math.sqrt(
          (p.x - p.baseX) ** 2 + (p.y - p.baseY) ** 2
        )
        if (moveDist < 3) p.color = '#ffffff'
        else if (moveDist < 10) p.color = '#d4d4d4'
        else if (moveDist < 20) p.color = '#a3a3a3'
        else p.color = '#737373'

        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    const switchInterval = setInterval(() => {
      switchTimerRef.current += 1
      initParticles()
    }, 5000)

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', mouseMove)
      canvas.removeEventListener('mouseleave', mouseLeave)
      cancelAnimationFrame(animId)
      clearInterval(switchInterval)
    }
  }, [texts, particleSize, mouseRadius, getCharacterPixels])

  return (
    <div className={`w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  )
}
