import { useEffect, useRef, useCallback } from 'react'

/* ═══════════════════════════════════════════════════════
   PROJECT SIMULATIONS — Interactive Canvas Demos
   Each project gets a relevant 2D simulation
   ═══════════════════════════════════════════════════════ */

// ─── 1. FRAUD DETECTION ─────────────────────────────────
export function FraudDetectionSim() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let transactions = []
    let stats = { total: 0, legit: 0, fraud: 0 }
    let time = 0

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth
      canvas.height = canvas.parentElement.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const spawnTransaction = () => {
      const isFraud = Math.random() < 0.18
      transactions.push({
        x: -20,
        y: 60 + Math.random() * (canvas.height - 160),
        speed: 1.5 + Math.random() * 1.5,
        isFraud,
        detected: false,
        detectedAt: 0,
        opacity: 1,
        size: 6 + Math.random() * 4,
        trail: [],
      })
    }

    const animate = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const scanX = canvas.width * 0.55

      // Background grid
      ctx.strokeStyle = 'rgba(254, 224, 198, 0.04)'
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }

      // Scanner line
      ctx.save()
      ctx.strokeStyle = 'rgba(254, 224, 198, 0.3)'
      ctx.lineWidth = 2
      ctx.setLineDash([6, 4])
      ctx.beginPath()
      ctx.moveTo(scanX, 30)
      ctx.lineTo(scanX, canvas.height - 30)
      ctx.stroke()
      ctx.restore()

      // Scanner label
      ctx.font = '600 11px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(254, 224, 198, 0.6)'
      ctx.textAlign = 'center'
      ctx.fillText('AI SCAN LINE', scanX, 22)

      // Scanner glow pulse
      const pulse = Math.sin(time * 0.05) * 0.15 + 0.2
      ctx.fillStyle = `rgba(254, 224, 198, ${pulse * 0.08})`
      ctx.fillRect(scanX - 30, 30, 60, canvas.height - 60)

      // Spawn
      if (time % 18 === 0) spawnTransaction()

      // Update and draw transactions
      transactions.forEach((t) => {
        t.x += t.speed

        // Trail
        t.trail.push({ x: t.x, y: t.y })
        if (t.trail.length > 15) t.trail.shift()

        // Draw trail
        t.trail.forEach((p, i) => {
          const a = (i / t.trail.length) * 0.15
          ctx.beginPath()
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
          ctx.fillStyle = t.detected
            ? (t.isFraud ? `rgba(255, 90, 90, ${a})` : `rgba(100, 220, 130, ${a})`)
            : `rgba(254, 224, 198, ${a})`
          ctx.fill()
        })

        // Detection at scan line
        if (!t.detected && t.x >= scanX) {
          t.detected = true
          t.detectedAt = time
          stats.total++
          if (t.isFraud) stats.fraud++
          else stats.legit++
        }

        // Draw node
        const color = t.detected
          ? (t.isFraud ? '#FF5A5A' : '#64DC82')
          : '#FEE0C6'

        // Glow on detection
        if (t.detected && time - t.detectedAt < 20) {
          const glow = 1 - (time - t.detectedAt) / 20
          ctx.beginPath()
          ctx.arc(t.x, t.y, t.size + 12 * glow, 0, Math.PI * 2)
          ctx.fillStyle = t.isFraud ? `rgba(255, 90, 90, ${glow * 0.3})` : `rgba(100, 220, 130, ${glow * 0.3})`
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()

        // Label after detection
        if (t.detected) {
          ctx.font = '600 8px "JetBrains Mono", monospace'
          ctx.fillStyle = color
          ctx.textAlign = 'center'
          ctx.fillText(t.isFraud ? 'FRAUD' : 'LEGIT', t.x, t.y - t.size - 6)
        }
      })

      // Remove off-screen
      transactions = transactions.filter(t => t.x < canvas.width + 30)

      // Stats panel
      const panelW = Math.min(200, canvas.width - 40)
      const panelX = canvas.width - panelW - 20
      ctx.fillStyle = 'rgba(47, 40, 30, 0.85)'
      ctx.strokeStyle = 'rgba(254, 224, 198, 0.15)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.roundRect(panelX, canvas.height - 120, panelW, 100, 8)
      ctx.fill()
      ctx.stroke()

      ctx.font = '600 10px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(254, 224, 198, 0.5)'
      ctx.textAlign = 'left'
      ctx.fillText('DETECTION STATS', panelX + 14, canvas.height - 98)

      ctx.font = '400 22px "Cormorant Garamond", serif'
      ctx.fillStyle = '#FEE0C6'
      ctx.fillText(stats.total.toString(), panelX + 14, canvas.height - 68)
      ctx.font = '400 10px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(254, 224, 198, 0.4)'
      ctx.fillText('total', panelX + 50, canvas.height - 72)

      ctx.font = '400 16px "Cormorant Garamond", serif'
      ctx.fillStyle = '#64DC82'
      ctx.fillText(stats.legit.toString(), panelX + 14, canvas.height - 42)
      ctx.fillStyle = 'rgba(254, 224, 198, 0.35)'
      ctx.font = '400 9px "JetBrains Mono", monospace'
      ctx.fillText('legit', panelX + 44, canvas.height - 45)

      ctx.font = '400 16px "Cormorant Garamond", serif'
      ctx.fillStyle = '#FF5A5A'
      ctx.fillText(stats.fraud.toString(), panelX + 100, canvas.height - 42)
      ctx.fillStyle = 'rgba(254, 224, 198, 0.35)'
      ctx.font = '400 9px "JetBrains Mono", monospace'
      ctx.fillText('fraud', panelX + 130, canvas.height - 45)

      // Accuracy bar
      if (stats.total > 0) {
        const acc = ((stats.legit + stats.fraud) / stats.total * 94).toFixed(1)
        ctx.font = '400 9px "JetBrains Mono", monospace'
        ctx.fillStyle = 'rgba(254, 224, 198, 0.4)'
        ctx.fillText(`accuracy: ${acc}%`, panelX + 14, canvas.height - 26)
      }

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

// ─── 2. CLOUD DEVOPS PIPELINE ───────────────────────────
export function CloudDevOpsSim() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId, time = 0
    let packets = []

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth
      canvas.height = canvas.parentElement.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stages = ['GIT', 'BUILD', 'TEST', 'DEPLOY', 'K8S', 'MONITOR']
    const stageIcons = ['<>', '{}', '✓', '▲', '⎈', '◎']

    const animate = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cW = canvas.width
      const cH = canvas.height
      const padding = cW < 500 ? 30 : 60
      const pipeW = cW - padding * 2
      const stageW = pipeW / stages.length
      const pipeY = cH * 0.4

      // Pipeline backbone
      ctx.strokeStyle = 'rgba(254, 224, 198, 0.12)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(padding, pipeY)
      ctx.lineTo(cW - padding, pipeY)
      ctx.stroke()

      // Draw stages
      stages.forEach((stage, i) => {
        const x = padding + stageW * i + stageW / 2
        const active = Math.floor((time / 60) % stages.length)
        const isActive = i === active
        const isPast = i < active

        // Connection line glow
        if (isPast || isActive) {
          ctx.strokeStyle = `rgba(254, 224, 198, ${isActive ? 0.5 + Math.sin(time * 0.1) * 0.2 : 0.3})`
          ctx.lineWidth = 2
          if (i > 0) {
            const prevX = padding + stageW * (i - 1) + stageW / 2
            ctx.beginPath()
            ctx.moveTo(prevX + 22, pipeY)
            ctx.lineTo(x - 22, pipeY)
            ctx.stroke()
          }
        }

        // Node circle
        const radius = isActive ? 22 + Math.sin(time * 0.08) * 3 : 20
        ctx.beginPath()
        ctx.arc(x, pipeY, radius, 0, Math.PI * 2)
        ctx.fillStyle = isActive ? 'rgba(254, 224, 198, 0.15)' : (isPast ? 'rgba(100, 220, 130, 0.08)' : 'rgba(92, 74, 56, 0.1)')
        ctx.fill()
        ctx.strokeStyle = isActive ? '#FEE0C6' : (isPast ? 'rgba(100, 220, 130, 0.5)' : 'rgba(254, 224, 198, 0.15)')
        ctx.lineWidth = isActive ? 2 : 1
        ctx.stroke()

        // Active pulse ring
        if (isActive) {
          const pulseR = 22 + ((time * 0.5) % 30)
          const pulseA = Math.max(0, 1 - ((time * 0.5) % 30) / 30) * 0.3
          ctx.beginPath()
          ctx.arc(x, pipeY, pulseR, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(254, 224, 198, ${pulseA})`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        // Icon
        ctx.font = `${cW < 500 ? 14 : 16}px "JetBrains Mono", monospace`
        ctx.fillStyle = isActive ? '#FEE0C6' : (isPast ? '#64DC82' : 'rgba(254, 224, 198, 0.3)')
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(stageIcons[i], x, pipeY)

        // Label
        ctx.font = `600 ${cW < 500 ? 8 : 9}px "JetBrains Mono", monospace`
        ctx.fillStyle = isActive ? '#FEE0C6' : (isPast ? 'rgba(100, 220, 130, 0.6)' : 'rgba(254, 224, 198, 0.25)')
        ctx.textBaseline = 'top'
        ctx.fillText(stage, x, pipeY + 30)

        // Check mark for past
        if (isPast) {
          ctx.font = '10px sans-serif'
          ctx.fillStyle = '#64DC82'
          ctx.fillText('✓', x + 18, pipeY - 18)
        }
      })

      // Animated metrics below
      const metricY = pipeY + 80
      const metrics = [
        { label: 'CPU', value: 34 + Math.sin(time * 0.03) * 18 },
        { label: 'MEM', value: 52 + Math.sin(time * 0.025 + 1) * 15 },
        { label: 'NET', value: 28 + Math.sin(time * 0.04 + 2) * 22 },
        { label: 'PODS', value: Math.floor(6 + Math.sin(time * 0.01) * 2) },
      ]

      const metricW = Math.min(120, (cW - padding * 2 - 30) / metrics.length)
      metrics.forEach((m, i) => {
        const mx = padding + i * (metricW + 10)

        ctx.fillStyle = 'rgba(47, 40, 30, 0.6)'
        ctx.strokeStyle = 'rgba(254, 224, 198, 0.08)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(mx, metricY, metricW, 60, 6)
        ctx.fill()
        ctx.stroke()

        ctx.font = '600 8px "JetBrains Mono", monospace'
        ctx.fillStyle = 'rgba(254, 224, 198, 0.4)'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        ctx.fillText(m.label, mx + 10, metricY + 8)

        ctx.font = '300 20px "Cormorant Garamond", serif'
        ctx.fillStyle = '#FEE0C6'
        ctx.fillText(typeof m.value === 'number' && m.label !== 'PODS' ? `${m.value.toFixed(0)}%` : m.value.toString(), mx + 10, metricY + 24)
      })

      // Floating data packets
      if (time % 25 === 0) {
        const active = Math.floor((time / 60) % stages.length)
        if (active < stages.length - 1) {
          const fromX = padding + stageW * active + stageW / 2
          const toX = padding + stageW * (active + 1) + stageW / 2
          packets.push({ x: fromX, toX, y: pipeY, progress: 0 })
        }
      }

      packets.forEach(p => {
        p.progress += 0.025
        p.x = p.x + (p.toX - p.x) * p.progress
        const a = p.progress < 0.5 ? p.progress * 2 : 2 - p.progress * 2
        ctx.beginPath()
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(254, 224, 198, ${a * 0.8})`
        ctx.fill()
      })
      packets = packets.filter(p => p.progress < 1)

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

// ─── 3. FPGA IMAGE PROCESSING ───────────────────────────
export function FPGAImageSim() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId, time = 0

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth
      canvas.height = canvas.parentElement.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Generate a fake image grid (color pixels)
    const gridSize = 16
    const pixels = []
    for (let r = 0; r < gridSize; r++) {
      pixels[r] = []
      for (let c = 0; c < gridSize; c++) {
        const dist = Math.sqrt((r - 8) ** 2 + (c - 8) ** 2)
        pixels[r][c] = {
          red: Math.floor(180 + Math.sin(r * 0.5) * 60),
          green: Math.floor(120 + Math.cos(c * 0.4) * 50),
          blue: Math.floor(100 + Math.sin(dist * 0.3) * 80),
        }
      }
    }

    const animate = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cW = canvas.width
      const cH = canvas.height
      const isSmall = cW < 500

      // Conversion progress sweeps across grid
      const progress = ((time * 0.4) % (gridSize + 4)) // repeating sweep

      const cellSize = Math.min(
        isSmall ? (cW - 40) / gridSize / 2.2 : (cW - 120) / gridSize / 2.4,
        (cH - 120) / gridSize
      )
      const gridW = cellSize * gridSize

      const leftX = isSmall ? (cW / 2 - gridW - 5) : (cW / 2 - gridW - 30)
      const rightX = isSmall ? (cW / 2 + 5) : (cW / 2 + 30)
      const topY = isSmall ? 50 : 60

      // Labels
      ctx.font = '600 10px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(254, 224, 198, 0.5)'
      ctx.textAlign = 'center'
      ctx.fillText('RGB INPUT', leftX + gridW / 2, topY - 14)
      ctx.fillText('GRAYSCALE OUTPUT', rightX + gridW / 2, topY - 14)

      // Arrow between grids
      ctx.strokeStyle = 'rgba(254, 224, 198, 0.25)'
      ctx.lineWidth = 1.5
      const arrowY = topY + gridW / 2
      const arrowXStart = leftX + gridW + (isSmall ? 2 : 8)
      const arrowXEnd = rightX - (isSmall ? 2 : 8)
      ctx.beginPath()
      ctx.moveTo(arrowXStart, arrowY)
      ctx.lineTo(arrowXEnd, arrowY)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(arrowXEnd - 6, arrowY - 4)
      ctx.lineTo(arrowXEnd, arrowY)
      ctx.lineTo(arrowXEnd - 6, arrowY + 4)
      ctx.stroke()

      ctx.font = '600 8px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(254, 224, 198, 0.35)'
      ctx.textAlign = 'center'
      ctx.fillText('FPGA', (arrowXStart + arrowXEnd) / 2, arrowY - 8)

      // Draw pixel grids
      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          const p = pixels[r][c]

          // RGB side
          ctx.fillStyle = `rgb(${p.red}, ${p.green}, ${p.blue})`
          ctx.fillRect(leftX + c * cellSize, topY + r * cellSize, cellSize - 1, cellSize - 1)

          // Grayscale side
          const gray = Math.floor(0.299 * p.red + 0.587 * p.green + 0.114 * p.blue)
          const isConverted = r * gridSize + c < progress * gridSize

          if (isConverted) {
            ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`
            // Processing flash
            const flashRow = Math.floor((progress * gridSize) / gridSize)
            const flashCol = Math.floor((progress * gridSize) % gridSize)
            if (r === flashRow && c === flashCol) {
              ctx.fillStyle = '#FEE0C6'
            }
          } else {
            ctx.fillStyle = 'rgba(47, 40, 30, 0.5)'
          }
          ctx.fillRect(rightX + c * cellSize, topY + r * cellSize, cellSize - 1, cellSize - 1)
        }
      }

      // Grid borders
      ctx.strokeStyle = 'rgba(254, 224, 198, 0.1)'
      ctx.lineWidth = 1
      ctx.strokeRect(leftX, topY, gridW, gridW)
      ctx.strokeRect(rightX, topY, gridW, gridW)

      // Signal timing diagram below
      const sigY = topY + gridW + 30
      const sigH = Math.min(60, cH - sigY - 20)
      if (sigH > 20) {
        const signals = ['CLK', 'EN', 'DATA', 'DONE']
        const sigLabelW = 40

        signals.forEach((sig, i) => {
          const y = sigY + i * (sigH / signals.length)
          const h = sigH / signals.length - 3

          ctx.font = '600 7px "JetBrains Mono", monospace'
          ctx.fillStyle = 'rgba(254, 224, 198, 0.3)'
          ctx.textAlign = 'right'
          ctx.textBaseline = 'middle'
          ctx.fillText(sig, leftX + sigLabelW - 6, y + h / 2)

          // Draw waveform
          ctx.beginPath()
          ctx.strokeStyle = i === 0 ? 'rgba(254, 224, 198, 0.4)' : (i === 3 ? 'rgba(100, 220, 130, 0.4)' : 'rgba(212, 184, 150, 0.3)')
          ctx.lineWidth = 1.5
          const waveW = cW - leftX - sigLabelW - 40

          for (let x = 0; x < waveW; x += 2) {
            const t = (x + time * 2) / (i === 0 ? 16 : i === 1 ? 60 : i === 2 ? 24 : 80)
            const val = i === 0
              ? (Math.sin(t * Math.PI) > 0 ? 0 : 1)
              : (i === 3 ? (progress > gridSize ? 1 : 0) : (Math.sin(t) > 0.3 ? 1 : 0))
            const px = leftX + sigLabelW + x
            const py = y + (val ? 2 : h - 2)
            if (x === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
          }
          ctx.stroke()
        })
      }

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

// ─── 4. EMOTION RECOGNITION ─────────────────────────────
export function EmotionRecognitionSim() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId, time = 0

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth
      canvas.height = canvas.parentElement.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const emotions = [
      { name: 'Happy', mouth: 'smile', brows: 'up', confidence: 0.92 },
      { name: 'Sad', mouth: 'frown', brows: 'down', confidence: 0.87 },
      { name: 'Surprised', mouth: 'open', brows: 'raised', confidence: 0.78 },
      { name: 'Angry', mouth: 'tight', brows: 'angry', confidence: 0.91 },
      { name: 'Neutral', mouth: 'flat', brows: 'flat', confidence: 0.95 },
    ]

    const animate = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cW = canvas.width
      const cH = canvas.height
      const isSmall = cW < 500
      const emotionIdx = Math.floor((time / 180) % emotions.length)
      const emotion = emotions[emotionIdx]
      const transition = Math.min(1, ((time % 180) / 30))

      const faceX = isSmall ? cW / 2 : cW * 0.35
      const faceY = cH * 0.42
      const faceR = Math.min(isSmall ? 70 : 90, cW * 0.18)

      // Scan grid overlay
      ctx.strokeStyle = 'rgba(254, 224, 198, 0.03)'
      ctx.lineWidth = 1
      for (let x = faceX - faceR - 30; x < faceX + faceR + 30; x += 12) {
        ctx.beginPath(); ctx.moveTo(x, faceY - faceR - 30); ctx.lineTo(x, faceY + faceR + 30); ctx.stroke()
      }
      for (let y = faceY - faceR - 30; y < faceY + faceR + 30; y += 12) {
        ctx.beginPath(); ctx.moveTo(faceX - faceR - 30, y); ctx.lineTo(faceX + faceR + 30, y); ctx.stroke()
      }

      // Face detection box
      ctx.strokeStyle = `rgba(254, 224, 198, ${0.3 + Math.sin(time * 0.05) * 0.1})`
      ctx.lineWidth = 1.5
      const boxP = 20
      // Corner brackets
      const corners = [
        [faceX - faceR - boxP, faceY - faceR - boxP],
        [faceX + faceR + boxP, faceY - faceR - boxP],
        [faceX - faceR - boxP, faceY + faceR + boxP],
        [faceX + faceR + boxP, faceY + faceR + boxP],
      ]
      const cLen = 18
      corners.forEach(([cx, cy], i) => {
        const dx = i % 2 === 0 ? 1 : -1
        const dy = i < 2 ? 1 : -1
        ctx.beginPath()
        ctx.moveTo(cx + dx * cLen, cy)
        ctx.lineTo(cx, cy)
        ctx.lineTo(cx, cy + dy * cLen)
        ctx.stroke()
      })

      // Face label
      ctx.font = '600 9px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(254, 224, 198, 0.5)'
      ctx.textAlign = 'left'
      ctx.fillText('FACE_DETECTED', faceX - faceR - boxP, faceY - faceR - boxP - 8)

      // Face outline
      ctx.beginPath()
      ctx.ellipse(faceX, faceY, faceR * 0.75, faceR, 0, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(254, 224, 198, 0.25)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Eyes
      const eyeY = faceY - faceR * 0.2
      const eyeSpread = faceR * 0.35
      ;[-1, 1].forEach(side => {
        const ex = faceX + side * eyeSpread
        ctx.beginPath()
        ctx.ellipse(ex, eyeY, faceR * 0.12, faceR * 0.08, 0, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(254, 224, 198, 0.4)'
        ctx.lineWidth = 1.5
        ctx.stroke()
        // Pupil
        ctx.beginPath()
        ctx.arc(ex + Math.sin(time * 0.02) * 3, eyeY, faceR * 0.04, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(254, 224, 198, 0.5)'
        ctx.fill()
      })

      // Eyebrows
      const browY = eyeY - faceR * 0.2
      ;[-1, 1].forEach(side => {
        const bx = faceX + side * eyeSpread
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(254, 224, 198, 0.35)'
        ctx.lineWidth = 2
        const browOffset = emotion.brows === 'up' ? -6 : (emotion.brows === 'raised' ? -10 : (emotion.brows === 'angry' ? (side === -1 ? 4 : -4) : (emotion.brows === 'down' ? 4 : 0)))
        ctx.moveTo(bx - side * faceR * 0.15, browY + browOffset * transition * (side === -1 ? -1 : 1) * (emotion.brows === 'angry' ? 1 : 1))
        ctx.quadraticCurveTo(bx, browY + browOffset * transition, bx + side * faceR * 0.15, browY)
        ctx.stroke()
      })

      // Mouth
      const mouthY = faceY + faceR * 0.35
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(254, 224, 198, 0.4)'
      ctx.lineWidth = 2
      if (emotion.mouth === 'smile') {
        ctx.arc(faceX, mouthY - faceR * 0.1 * transition, faceR * 0.25, 0.2 * Math.PI, 0.8 * Math.PI)
      } else if (emotion.mouth === 'frown') {
        ctx.arc(faceX, mouthY + faceR * 0.2 * transition, faceR * 0.2, 1.2 * Math.PI, 1.8 * Math.PI)
      } else if (emotion.mouth === 'open') {
        ctx.ellipse(faceX, mouthY, faceR * 0.15, faceR * 0.12 * transition, 0, 0, Math.PI * 2)
      } else if (emotion.mouth === 'tight') {
        ctx.moveTo(faceX - faceR * 0.2, mouthY)
        ctx.lineTo(faceX + faceR * 0.2, mouthY)
      } else {
        ctx.moveTo(faceX - faceR * 0.18, mouthY)
        ctx.lineTo(faceX + faceR * 0.18, mouthY)
      }
      ctx.stroke()

      // Nose hint
      ctx.beginPath()
      ctx.moveTo(faceX, faceY)
      ctx.lineTo(faceX - 4, faceY + faceR * 0.15)
      ctx.strokeStyle = 'rgba(254, 224, 198, 0.15)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Landmark dots
      const landmarks = [
        [faceX - eyeSpread - faceR * 0.12, eyeY],
        [faceX - eyeSpread + faceR * 0.12, eyeY],
        [faceX + eyeSpread - faceR * 0.12, eyeY],
        [faceX + eyeSpread + faceR * 0.12, eyeY],
        [faceX, faceY + faceR * 0.15],
        [faceX - faceR * 0.2, mouthY],
        [faceX + faceR * 0.2, mouthY],
        [faceX, mouthY + 5],
      ]
      landmarks.forEach(([lx, ly]) => {
        ctx.beginPath()
        ctx.arc(lx, ly, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(254, 224, 198, 0.2)'
        ctx.fill()
      })

      // CNN confidence bars (right side or below on mobile)
      const barX = isSmall ? 20 : cW * 0.6
      const barY = isSmall ? cH * 0.72 : cH * 0.15
      const barW = isSmall ? cW - 40 : cW * 0.32
      const barH = 28

      ctx.font = '600 10px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(254, 224, 198, 0.5)'
      ctx.textAlign = 'left'
      ctx.fillText('CNN OUTPUT LAYER', barX, barY - 8)

      emotions.forEach((em, i) => {
        const y = barY + 10 + i * (barH + 8)
        const isDetected = i === emotionIdx
        const conf = isDetected ? em.confidence * transition : (0.02 + Math.random() * 0.08)

        // Label
        ctx.font = '400 9px "JetBrains Mono", monospace'
        ctx.fillStyle = isDetected ? '#FEE0C6' : 'rgba(254, 224, 198, 0.3)'
        ctx.textAlign = 'left'
        ctx.fillText(em.name.toUpperCase(), barX, y + barH / 2 + 3)

        // Bar background
        const barStartX = barX + 75
        const maxBarW = barW - 110
        ctx.fillStyle = 'rgba(254, 224, 198, 0.05)'
        ctx.beginPath()
        ctx.roundRect(barStartX, y + 4, maxBarW, barH - 8, 3)
        ctx.fill()

        // Bar fill
        ctx.fillStyle = isDetected ? 'rgba(254, 224, 198, 0.5)' : 'rgba(254, 224, 198, 0.08)'
        ctx.beginPath()
        ctx.roundRect(barStartX, y + 4, maxBarW * conf, barH - 8, 3)
        ctx.fill()

        // Percentage
        ctx.font = '500 9px "JetBrains Mono", monospace'
        ctx.fillStyle = isDetected ? '#FEE0C6' : 'rgba(254, 224, 198, 0.2)'
        ctx.textAlign = 'right'
        ctx.fillText(`${(conf * 100).toFixed(1)}%`, barX + barW, y + barH / 2 + 3)
      })

      // Current emotion label
      ctx.font = `300 ${isSmall ? 20 : 24}px "Cormorant Garamond", serif`
      ctx.fillStyle = '#FEE0C6'
      ctx.textAlign = 'center'
      ctx.fillText(`Detected: ${emotion.name}`, faceX, faceY + faceR + boxP + 30)

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

// ─── 5. RAG HARDWARE DEBUGGER ───────────────────────────
export function RAGDebuggerSim() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId, time = 0

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth
      canvas.height = canvas.parentElement.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const signalNames = ['clk', 'rst_n', 'data_in[7:0]', 'valid', 'data_out[7:0]', 'error']
    const debugLines = [
      '> Analyzing VCD waveform trace...',
      '> Module: top.dut.fsm_controller',
      '> Detected: Signal "error" asserts at t=1240ns',
      '> Root cause: State machine stuck in S_WAIT',
      '> Missing reset synchronization on data_in',
      '> Suggested fix: Add 2-stage synchronizer',
      '> Confidence: 94.2%',
      '> Generating patch for fsm_controller.v...',
    ]

    const animate = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cW = canvas.width
      const cH = canvas.height
      const isSmall = cW < 500
      const pad = isSmall ? 12 : 20

      // Waveform section (top ~55%)
      const waveH = cH * 0.52
      const sigLabelW = isSmall ? 65 : 100
      const sigH = (waveH - 30) / signalNames.length

      // Title
      ctx.font = '600 10px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(254, 224, 198, 0.5)'
      ctx.textAlign = 'left'
      ctx.fillText('VCD WAVEFORM VIEWER', pad, 18)

      // Time ruler
      ctx.font = '400 7px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(254, 224, 198, 0.25)'
      const waveStart = pad + sigLabelW
      const waveW = cW - waveStart - pad
      for (let t = 0; t < 8; t++) {
        const x = waveStart + (waveW / 8) * t
        ctx.fillText(`${t * 200}ns`, x, 28)
        ctx.strokeStyle = 'rgba(254, 224, 198, 0.04)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x, 32)
        ctx.lineTo(x, waveH)
        ctx.stroke()
      }

      // Error marker
      const errorX = waveStart + waveW * 0.77
      const errorPulse = Math.sin(time * 0.08) * 0.2 + 0.5
      ctx.strokeStyle = `rgba(255, 90, 90, ${errorPulse})`
      ctx.lineWidth = 1
      ctx.setLineDash([4, 3])
      ctx.beginPath()
      ctx.moveTo(errorX, 32)
      ctx.lineTo(errorX, waveH)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.font = '600 7px "JetBrains Mono", monospace'
      ctx.fillStyle = `rgba(255, 90, 90, ${errorPulse})`
      ctx.textAlign = 'center'
      ctx.fillText('BUG', errorX, waveH + 12)

      // Signals
      signalNames.forEach((name, i) => {
        const y = 36 + i * sigH
        const midY = y + sigH / 2

        // Label
        ctx.font = `400 ${isSmall ? 7 : 9}px "JetBrains Mono", monospace`
        ctx.fillStyle = i === 5 ? 'rgba(255, 90, 90, 0.6)' : 'rgba(254, 224, 198, 0.35)'
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        ctx.fillText(name, waveStart - 8, midY)

        // Separator line
        ctx.strokeStyle = 'rgba(254, 224, 198, 0.05)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(waveStart, y + sigH)
        ctx.lineTo(cW - pad, y + sigH)
        ctx.stroke()

        // Waveform
        ctx.beginPath()
        ctx.strokeStyle = i === 5 ? 'rgba(255, 90, 90, 0.5)' : (i === 0 ? 'rgba(254, 224, 198, 0.45)' : 'rgba(212, 184, 150, 0.35)')
        ctx.lineWidth = 1.5
        const high = y + 5
        const low = y + sigH - 5

        for (let x = 0; x < waveW; x += 2) {
          const px = waveStart + x
          const t = (x + time * (i === 0 ? 3 : 1.5)) / (i === 0 ? 20 : (i === 2 || i === 4 ? 30 : (i === 5 ? 80 : 40)))
          let val
          if (i === 0) val = Math.sin(t * Math.PI) > 0 ? 1 : 0
          else if (i === 1) val = x > 30 ? 1 : 0
          else if (i === 5) val = x > waveW * 0.77 ? 1 : 0
          else if (i === 2 || i === 4) {
            val = Math.sin(t) > 0 ? 1 : (Math.sin(t + 1) > 0.3 ? 0.5 : 0)
          } else val = Math.sin(t * 1.3) > 0.2 ? 1 : 0

          const py = val > 0.7 ? high : (val > 0.3 ? (high + low) / 2 : low)
          if (x === 0) ctx.moveTo(px, py)
          else {
            const prevPy = val > 0.7 ? high : (val > 0.3 ? (high + low) / 2 : low)
            ctx.lineTo(px, py)
          }
        }
        ctx.stroke()
      })

      // LLM Debug output (bottom ~45%)
      const debugY = waveH + 24
      ctx.fillStyle = 'rgba(30, 25, 18, 0.7)'
      ctx.strokeStyle = 'rgba(254, 224, 198, 0.1)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.roundRect(pad, debugY, cW - pad * 2, cH - debugY - pad, 8)
      ctx.fill()
      ctx.stroke()

      ctx.font = '600 9px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(254, 224, 198, 0.45)'
      ctx.textAlign = 'left'
      ctx.fillText('LLM DEBUG ANALYSIS', pad + 14, debugY + 18)

      const visibleLines = Math.min(debugLines.length, Math.floor(time / 40))
      const lineH = isSmall ? 16 : 18

      debugLines.slice(0, visibleLines).forEach((line, i) => {
        ctx.font = `400 ${isSmall ? 8 : 10}px "JetBrains Mono", monospace`
        const isError = line.includes('error') || line.includes('stuck') || line.includes('Missing')
        const isFix = line.includes('fix') || line.includes('Confidence') || line.includes('patch')
        ctx.fillStyle = isError ? 'rgba(255, 90, 90, 0.7)' : (isFix ? 'rgba(100, 220, 130, 0.7)' : 'rgba(254, 224, 198, 0.45)')
        ctx.fillText(line, pad + 14, debugY + 36 + i * lineH)
      })

      // Blinking cursor
      if (visibleLines < debugLines.length && Math.floor(time / 30) % 2 === 0) {
        const cursorY = debugY + 36 + visibleLines * lineH
        ctx.fillStyle = 'rgba(254, 224, 198, 0.6)'
        ctx.fillRect(pad + 14, cursorY - 8, 6, 12)
      }

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

// ─── 6. GLAUCOMA DETECTION ──────────────────────────────
export function GlaucomaDetectionSim() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId, time = 0

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth
      canvas.height = canvas.parentElement.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cW = canvas.width
      const cH = canvas.height
      const isSmall = cW < 500

      const eyeX = isSmall ? cW / 2 : cW * 0.38
      const eyeY = cH * 0.45
      const eyeR = Math.min(isSmall ? 80 : 110, cW * 0.2)

      // Title
      ctx.font = '600 10px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(254, 224, 198, 0.5)'
      ctx.textAlign = 'left'
      ctx.fillText('FUNDUS IMAGE ANALYSIS', 20, 22)

      // Fundus background (dark reddish-brown circle)
      const fundusGrad = ctx.createRadialGradient(eyeX, eyeY, 0, eyeX, eyeY, eyeR)
      fundusGrad.addColorStop(0, '#8B3A2A')
      fundusGrad.addColorStop(0.5, '#6B2A1A')
      fundusGrad.addColorStop(0.8, '#4B1A0A')
      fundusGrad.addColorStop(1, '#2B0A00')
      ctx.beginPath()
      ctx.arc(eyeX, eyeY, eyeR, 0, Math.PI * 2)
      ctx.fillStyle = fundusGrad
      ctx.fill()

      // Blood vessels
      ctx.strokeStyle = 'rgba(180, 60, 40, 0.5)'
      ctx.lineWidth = 2
      for (let v = 0; v < 8; v++) {
        const angle = (v / 8) * Math.PI * 2
        ctx.beginPath()
        let vx = eyeX, vy = eyeY
        ctx.moveTo(vx, vy)
        for (let s = 0; s < 12; s++) {
          vx += Math.cos(angle + Math.sin(s * 0.5) * 0.3) * (eyeR / 12)
          vy += Math.sin(angle + Math.cos(s * 0.7) * 0.2) * (eyeR / 12)
          ctx.lineTo(vx, vy)
        }
        ctx.stroke()

        // Branch vessels
        if (v % 2 === 0) {
          ctx.lineWidth = 1
          const branchStart = 4
          const bx = eyeX + Math.cos(angle) * eyeR * 0.35
          const by = eyeY + Math.sin(angle) * eyeR * 0.35
          ctx.beginPath()
          ctx.moveTo(bx, by)
          ctx.quadraticCurveTo(
            bx + Math.cos(angle + 0.5) * eyeR * 0.3,
            by + Math.sin(angle + 0.5) * eyeR * 0.3,
            bx + Math.cos(angle + 0.8) * eyeR * 0.5,
            by + Math.sin(angle + 0.8) * eyeR * 0.5
          )
          ctx.stroke()
          ctx.lineWidth = 2
        }
      }

      // Optic disc (larger, yellowish circle)
      const discR = eyeR * 0.38
      const discGrad = ctx.createRadialGradient(eyeX, eyeY, 0, eyeX, eyeY, discR)
      discGrad.addColorStop(0, 'rgba(255, 220, 160, 0.8)')
      discGrad.addColorStop(0.7, 'rgba(240, 190, 120, 0.6)')
      discGrad.addColorStop(1, 'rgba(200, 140, 80, 0.3)')
      ctx.beginPath()
      ctx.arc(eyeX, eyeY, discR, 0, Math.PI * 2)
      ctx.fillStyle = discGrad
      ctx.fill()

      // Scanning animation
      const scanAngle = (time * 0.02) % (Math.PI * 2)
      const scanProgress = (time * 0.003) % 1

      // Optic disc segmentation outline (animated)
      if (scanProgress > 0.2) {
        ctx.beginPath()
        ctx.arc(eyeX, eyeY, discR, 0, Math.min(Math.PI * 2, (scanProgress - 0.2) * 2.5 * Math.PI * 2))
        ctx.strokeStyle = 'rgba(100, 220, 130, 0.7)'
        ctx.lineWidth = 2
        ctx.stroke()

        // Disc label
        ctx.font = '600 8px "JetBrains Mono", monospace'
        ctx.fillStyle = 'rgba(100, 220, 130, 0.7)'
        ctx.textAlign = 'left'
        ctx.fillText('OPTIC DISC', eyeX + discR + 8, eyeY - 8)
      }

      // Optic cup (smaller, lighter center)
      const cupR = discR * 0.55
      const cupGrad = ctx.createRadialGradient(eyeX, eyeY, 0, eyeX, eyeY, cupR)
      cupGrad.addColorStop(0, 'rgba(255, 240, 200, 0.7)')
      cupGrad.addColorStop(1, 'rgba(255, 220, 170, 0.3)')
      ctx.beginPath()
      ctx.arc(eyeX, eyeY, cupR, 0, Math.PI * 2)
      ctx.fillStyle = cupGrad
      ctx.fill()

      // Optic cup segmentation (animated)
      if (scanProgress > 0.5) {
        ctx.beginPath()
        ctx.arc(eyeX, eyeY, cupR, 0, Math.min(Math.PI * 2, (scanProgress - 0.5) * 4 * Math.PI * 2))
        ctx.strokeStyle = 'rgba(254, 224, 198, 0.8)'
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.font = '600 8px "JetBrains Mono", monospace'
        ctx.fillStyle = 'rgba(254, 224, 198, 0.7)'
        ctx.textAlign = 'left'
        ctx.fillText('OPTIC CUP', eyeX + cupR + 8, eyeY + 8)
      }

      // Scan line rotating
      ctx.save()
      ctx.translate(eyeX, eyeY)
      ctx.rotate(scanAngle)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(eyeR, 0)
      ctx.strokeStyle = `rgba(254, 224, 198, ${0.15 + Math.sin(time * 0.1) * 0.05})`
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.restore()

      // Measurement lines
      if (scanProgress > 0.7) {
        // Disc diameter line
        ctx.setLineDash([3, 3])
        ctx.strokeStyle = 'rgba(100, 220, 130, 0.4)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(eyeX - discR, eyeY + discR + 15)
        ctx.lineTo(eyeX + discR, eyeY + discR + 15)
        ctx.stroke()
        // Cup diameter line
        ctx.strokeStyle = 'rgba(254, 224, 198, 0.4)'
        ctx.beginPath()
        ctx.moveTo(eyeX - cupR, eyeY + discR + 28)
        ctx.lineTo(eyeX + cupR, eyeY + discR + 28)
        ctx.stroke()
        ctx.setLineDash([])
      }

      // Diagnostic panel (right side or below on mobile)
      const panelX = isSmall ? 16 : cW * 0.62
      const panelY = isSmall ? eyeY + eyeR + 50 : 50
      const panelW = isSmall ? cW - 32 : cW * 0.32

      ctx.fillStyle = 'rgba(47, 40, 30, 0.7)'
      ctx.strokeStyle = 'rgba(254, 224, 198, 0.1)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.roundRect(panelX, panelY, panelW, isSmall ? 140 : 260, 8)
      ctx.fill()
      ctx.stroke()

      ctx.font = '600 10px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(254, 224, 198, 0.5)'
      ctx.textAlign = 'left'
      ctx.fillText('DIAGNOSTIC RESULTS', panelX + 14, panelY + 22)

      const cdr = (cupR / discR).toFixed(3)
      const items = [
        { label: 'Disc Radius', value: `${discR.toFixed(0)}px`, color: 'rgba(100, 220, 130, 0.7)' },
        { label: 'Cup Radius', value: `${cupR.toFixed(0)}px`, color: 'rgba(254, 224, 198, 0.7)' },
        { label: 'CDR Ratio', value: cdr, color: '#FEE0C6' },
        { label: 'Threshold', value: '> 0.65', color: 'rgba(254, 224, 198, 0.35)' },
        { label: 'Risk Level', value: parseFloat(cdr) > 0.5 ? 'MODERATE' : 'LOW', color: parseFloat(cdr) > 0.5 ? '#FFB347' : '#64DC82' },
      ]

      items.forEach((item, i) => {
        const showItem = scanProgress > 0.3 + i * 0.12
        if (!showItem) return

        const iy = panelY + 42 + i * (isSmall ? 20 : 36)
        ctx.font = '400 8px "JetBrains Mono", monospace'
        ctx.fillStyle = 'rgba(254, 224, 198, 0.35)'
        ctx.textAlign = 'left'
        ctx.fillText(item.label, panelX + 14, iy)

        ctx.font = i === 2 ? '300 22px "Cormorant Garamond", serif' : '400 13px "Cormorant Garamond", serif'
        ctx.fillStyle = item.color
        ctx.fillText(item.value, panelX + 14, iy + (i === 2 ? 24 : 16))
      })

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}


/* ═══════════════════════════════════════════════════════
   SIMULATION MODAL — Full-screen overlay
   ═══════════════════════════════════════════════════════ */

const simComponents = [
  FraudDetectionSim,
  CloudDevOpsSim,
  FPGAImageSim,
  EmotionRecognitionSim,
  RAGDebuggerSim,
  GlaucomaDetectionSim,
]

export default function SimulationModal({ projectIndex, title, onClose }) {
  const SimComponent = simComponents[projectIndex]
  const modalRef = useRef(null)

  // Close on escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // Close on backdrop click
  const handleBackdropClick = useCallback((e) => {
    if (e.target === modalRef.current) onClose()
  }, [onClose])

  if (projectIndex == null || !SimComponent) return null

  return (
    <div className="sim-modal" ref={modalRef} onClick={handleBackdropClick}>
      <div className="sim-modal__container">
        <div className="sim-modal__header">
          <div className="sim-modal__title-group">
            <span className="sim-modal__badge">Interactive Simulation</span>
            <h3 className="sim-modal__title">{title}</h3>
          </div>
          <button className="sim-modal__close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="sim-modal__canvas-wrapper">
          <SimComponent />
        </div>
      </div>

      <style>{`
        .sim-modal {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(20, 16, 10, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 16px;
          animation: simFadeIn 0.3s ease-out;
        }
        @keyframes simFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .sim-modal__container {
          width: 100%;
          max-width: 900px;
          height: 90vh;
          max-height: 600px;
          background: rgba(47, 40, 30, 0.9);
          border: 1px solid rgba(254, 224, 198, 0.12);
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: simSlideUp 0.4s var(--ease-out-expo);
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
        }
        @keyframes simSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .sim-modal__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(254, 224, 198, 0.08);
          flex-shrink: 0;
          gap: 12px;
        }
        .sim-modal__title-group {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
          flex-wrap: wrap;
        }
        .sim-modal__badge {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--peach);
          background: rgba(254, 224, 198, 0.08);
          border: 1px solid rgba(254, 224, 198, 0.12);
          padding: 3px 10px;
          border-radius: 20px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .sim-modal__title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 400;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sim-modal__close {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(254, 224, 198, 0.06);
          border: 1px solid rgba(254, 224, 198, 0.1);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
        .sim-modal__close:hover {
          background: rgba(254, 224, 198, 0.12);
          color: var(--text-primary);
        }
        .sim-modal__canvas-wrapper {
          flex: 1;
          min-height: 0;
          padding: 12px;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .sim-modal {
            padding: 8px;
          }
          .sim-modal__container {
            height: 95vh;
            max-height: none;
            border-radius: 12px;
          }
          .sim-modal__header {
            padding: 12px 14px;
          }
          .sim-modal__title {
            font-size: 0.9rem;
          }
          .sim-modal__canvas-wrapper {
            padding: 6px;
          }
        }
        @media (max-width: 480px) {
          .sim-modal__badge {
            display: none;
          }
          .sim-modal__title {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  )
}
