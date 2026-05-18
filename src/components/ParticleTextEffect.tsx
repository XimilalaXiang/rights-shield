import { useEffect, useRef } from 'react'

interface Vector2D {
  x: number
  y: number
}

class Particle {
  pos: Vector2D = { x: 0, y: 0 }
  vel: Vector2D = { x: 0, y: 0 }
  acc: Vector2D = { x: 0, y: 0 }
  target: Vector2D = { x: 0, y: 0 }

  closeEnoughTarget = 100
  maxSpeed = 1.0
  maxForce = 0.1
  particleSize = 10
  isKilled = false

  startColor = { r: 0, g: 0, b: 0 }
  targetColor = { r: 0, g: 0, b: 0 }
  colorWeight = 0
  colorBlendRate = 0.01

  move() {
    let proximityMult = 1
    const distance = Math.sqrt(
      Math.pow(this.pos.x - this.target.x, 2) +
      Math.pow(this.pos.y - this.target.y, 2)
    )

    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget
    }

    const towardsTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    }

    const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y)
    if (magnitude > 0) {
      towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult
      towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult
    }

    const steer = {
      x: towardsTarget.x - this.vel.x,
      y: towardsTarget.y - this.vel.y,
    }

    const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y)
    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce
      steer.y = (steer.y / steerMagnitude) * this.maxForce
    }

    this.acc.x += steer.x
    this.acc.y += steer.y

    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.acc.x = 0
    this.acc.y = 0
  }

  draw(ctx: CanvasRenderingContext2D, _dpr: number) {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
    }

    const currentColor = {
      r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
      g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
      b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
    }

    const size = this.particleSize
    ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`
    ctx.fillRect(this.pos.x, this.pos.y, size, size)
  }

  kill(width: number, height: number) {
    if (!this.isKilled) {
      const angle = Math.random() * Math.PI * 2
      const mag = Math.max(width, height)
      const centerX = width / 2
      const centerY = height * 0.35

      this.target.x = centerX + Math.cos(angle) * mag
      this.target.y = centerY + Math.sin(angle) * mag

      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
      }
      this.targetColor = { r: 0, g: 0, b: 0 }
      this.colorWeight = 0
      this.isKilled = true
    }
  }
}

interface ParticleTextEffectProps {
  words?: string[]
}

const DEFAULT_WORDS = ['权盾', 'RIGHTS SHIELD', '消费维权', '法律助手']

export function ParticleTextEffect({ words = DEFAULT_WORDS }: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const particlesRef = useRef<Particle[]>([])
  const frameCountRef = useRef(0)
  const wordIndexRef = useRef(0)
  const pointerRef = useRef({ x: -1000, y: -1000, active: false })
  const dprRef = useRef(1)

  const getPixelSteps = (width: number, height: number, _dpr: number) => {
    const area = width * height
    if (area < 400000) return 2    // 手机
    if (area < 800000) return 3    // 平板
    return 4                       // 桌面端
  }

  const generateRandomPos = (
    x: number,
    y: number,
    mag: number,
  ): Vector2D => {
    const angle = Math.random() * Math.PI * 2
    return {
      x: x + Math.cos(angle) * mag,
      y: y + Math.sin(angle) * mag,
    }
  }

  const nextWord = (word: string, canvas: HTMLCanvasElement) => {
    const dpr = dprRef.current
    const offscreenCanvas = document.createElement('canvas')
    offscreenCanvas.width = canvas.width
    offscreenCanvas.height = canvas.height
    const offscreenCtx = offscreenCanvas.getContext('2d')!

    // DPI 缩放
    offscreenCtx.scale(dpr, dpr)

    const displayWidth = canvas.width / dpr
    const displayHeight = canvas.height / dpr

    const scaledFontSize = Math.max(
      72,
      Math.min(
        140 * (displayWidth / 1200),
        140 * (displayHeight / 400),
        220
      )
    )

    offscreenCtx.fillStyle = 'white'
    offscreenCtx.font = `900 ${scaledFontSize}px Inter, Arial, sans-serif`
    offscreenCtx.textAlign = 'center'
    offscreenCtx.textBaseline = 'middle'

    const textY = displayHeight * 0.25
    const wordsArr = word.split(' ')

    const textWidth = offscreenCtx.measureText(word).width
    const shouldWrap = wordsArr.length > 1 && textWidth > displayWidth * 0.85

    if (!shouldWrap) {
      offscreenCtx.fillText(word, displayWidth / 2, textY)
    } else {
      const lineHeight = scaledFontSize * 1.2
      const startY = textY - (wordsArr.length - 1) * lineHeight / 2
      wordsArr.forEach((w, i) => {
        offscreenCtx.fillText(w, displayWidth / 2, startY + i * lineHeight)
      })
    }

    const imageData = offscreenCtx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data

    const newColor = { r: 255, g: 255, b: 255 }
    const particles = particlesRef.current
    let particleIndex = 0

    const pixelSteps = getPixelSteps(displayWidth, displayHeight, dpr)
    const stepInPixels = pixelSteps * dpr
    const canvasW = canvas.width

    const coordsIndexes: number[] = []
    for (let row = 0; row < canvas.height; row += stepInPixels) {
      for (let col = 0; col < canvasW; col += stepInPixels) {
        const i = (row * canvasW + col) * 4
        if (i < pixels.length) coordsIndexes.push(i)
      }
    }

    // Shuffle for fluid motion
    for (let i = coordsIndexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]]
    }

    // Use viewport diagonal for spawn radius
    const viewportW = window.innerWidth
    const viewportH = window.innerHeight
    const spawnRadius = Math.sqrt(viewportW * viewportW + viewportH * viewportH) / 2

    const baseSize = displayWidth < 500 ? 1.2 : 1.5

    for (const coordIndex of coordsIndexes) {
      const pixelIndex = coordIndex
      const alpha = pixels[pixelIndex + 3]

      if (alpha > 0) {
        const x = ((pixelIndex / 4) % canvasW) / dpr
        const y = Math.floor(pixelIndex / 4 / canvasW) / dpr

        let particle: Particle

        if (particleIndex < particles.length) {
          particle = particles[particleIndex]
          particle.isKilled = false
          particleIndex++
        } else {
          particle = new Particle()

          const randomPos = generateRandomPos(
            displayWidth / 2,
            displayHeight * 0.35,
            spawnRadius,
          )
          particle.pos.x = randomPos.x
          particle.pos.y = randomPos.y

          particle.maxSpeed = Math.random() * 6 + 4
          particle.maxForce = particle.maxSpeed * 0.05
          particle.particleSize = Math.random() * 0.8 + baseSize
          particle.colorBlendRate = Math.random() * 0.0275 + 0.0025

          particles.push(particle)
        }

        particle.startColor = {
          r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
          g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
          b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
        }
        particle.targetColor = newColor
        particle.colorWeight = 0

        particle.target.x = x
        particle.target.y = y
      }
    }

    for (let i = particleIndex; i < particles.length; i++) {
      particles[i].kill(displayWidth, displayHeight)
    }
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    const dpr = dprRef.current
    const particles = particlesRef.current

    const displayWidth = canvas.width / dpr
    const displayHeight = canvas.height / dpr

    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, displayWidth, displayHeight)

    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i]
      particle.move()
      particle.draw(ctx, dpr)

      if (particle.isKilled) {
        if (
          particle.pos.x < -50 ||
          particle.pos.x > displayWidth + 50 ||
          particle.pos.y < -50 ||
          particle.pos.y > displayHeight + 50
        ) {
          particles.splice(i, 1)
        }
      }
    }

    // Pointer ripple interaction (hover effect)
    const px = pointerRef.current.x
    const py = pointerRef.current.y
    const rippleRadius = 80
    if (px > 0 && py > 0) {
      for (const particle of particles) {
        if (particle.isKilled) continue
        const dx = particle.pos.x - px
        const dy = particle.pos.y - py
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < rippleRadius && dist > 0) {
          const force = (1 - dist / rippleRadius) * 3
          particle.vel.x += (dx / dist) * force
          particle.vel.y += (dy / dist) * force
        }
      }
    }

    // Click to kill particles
    if (pointerRef.current.active) {
      for (const particle of particles) {
        const dx = particle.pos.x - px
        const dy = particle.pos.y - py
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 40) {
          particle.kill(displayWidth, displayHeight)
        }
      }
    }

    frameCountRef.current++
    if (frameCountRef.current % 480 === 0) {
      wordIndexRef.current = (wordIndexRef.current + 1) % words.length
      nextWord(words[wordIndexRef.current], canvas)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        const dpr = window.devicePixelRatio || 1
        dprRef.current = dpr
        const w = container.clientWidth
        const h = container.clientHeight
        canvas.width = w * dpr
        canvas.height = h * dpr
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`
        const ctx = canvas.getContext('2d')!
        ctx.scale(dpr, dpr)
      }
    }

    resizeCanvas()
    nextWord(words[0], canvas)
    animate()

    const getPointerPos = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      // 返回显示坐标（不是像素坐标），与粒子坐标系一致
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      pointerRef.current.active = true
      const pos = getPointerPos(e.clientX, e.clientY)
      pointerRef.current.x = pos.x
      pointerRef.current.y = pos.y
    }
    const handleMouseUp = () => {
      pointerRef.current.active = false
    }
    const handleMouseMove = (e: MouseEvent) => {
      const pos = getPointerPos(e.clientX, e.clientY)
      pointerRef.current.x = pos.x
      pointerRef.current.y = pos.y
    }

    const handleTouchStart = (e: TouchEvent) => {
      // 不阻止默认行为，允许页面滚动
      pointerRef.current.active = true
      const touch = e.touches[0]
      const pos = getPointerPos(touch.clientX, touch.clientY)
      pointerRef.current.x = pos.x
      pointerRef.current.y = pos.y
    }
    const handleTouchEnd = () => {
      pointerRef.current.active = false
    }
    const handleTouchMove = (e: TouchEvent) => {
      // 不阻止默认行为，允许页面滚动
      const touch = e.touches[0]
      const pos = getPointerPos(touch.clientX, touch.clientY)
      pointerRef.current.x = pos.x
      pointerRef.current.y = pos.y
    }

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    const handleResize = () => {
      resizeCanvas()
      nextWord(words[wordIndexRef.current], canvas)
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true })
    canvas.addEventListener('touchend', handleTouchEnd)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    canvas.addEventListener('contextmenu', handleContextMenu)
    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchend', handleTouchEnd)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('resize', handleResize)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'black', touchAction: 'auto' }}
      />
    </div>
  )
}
