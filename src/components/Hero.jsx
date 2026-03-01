import { useEffect, useRef, useState } from 'react'

function FloatingParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = [
      'rgba(254, 224, 198, 0.25)',
      'rgba(212, 184, 150, 0.2)',
      'rgba(92, 74, 56, 0.3)',
      'rgba(254, 224, 198, 0.12)',
    ]

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.dx
        p.y += p.dy
        p.pulse += 0.01

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const scale = 0.7 + Math.sin(p.pulse) * 0.3
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * scale, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })

      // Draw subtle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(212, 184, 150, ${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero__particles" />
}

export default function Hero() {
  const [nameRevealed, setNameRevealed] = useState(false)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setNameRevealed(true), 400)
    const t2 = setTimeout(() => setSubtitleVisible(true), 1200)
    const t3 = setTimeout(() => setCtaVisible(true), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const scrollToProjects = (e) => {
    e.preventDefault()
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero">
      <div className="hero__bg-image">
        <img src="Untitled design (9).png" alt="" />
      </div>
      <div className="hero__gradient-overlay" />
      <FloatingParticles />

      <div className="hero__content container">
        <div className="hero__label">
          <span className={`hero__label-line ${nameRevealed ? 'hero__label-line--visible' : ''}`}>
            <span className="hero__label-dash" />
            Portfolio
          </span>
        </div>

        <h1 className="hero__name">
          {'Riya Upadhyay'.split('').map((char, i) => (
            <span
              key={i}
              className={`hero__char ${nameRevealed ? 'hero__char--visible' : ''}`}
              style={{ transitionDelay: `${0.4 + i * 0.05}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <div className={`hero__subtitle ${subtitleVisible ? 'hero__subtitle--visible' : ''}`}>
          <p className="hero__tagline">
            <span className="hero__tagline-accent">Data Science Researcher</span>
            <span className="hero__tagline-sep">&mdash;</span>
            AI Engineer & Published IEEE Author
          </p>
          <p className="hero__description">
            Dual degrees from <strong>Nirma University</strong> & <strong>IIT Madras</strong>.
            Building intelligent systems at the intersection of AI, cybersecurity, and embedded hardware.
          </p>
        </div>

        <div className={`hero__cta ${ctaVisible ? 'hero__cta--visible' : ''}`}>
          <a href="#projects" className="hero__btn hero__btn--primary" onClick={scrollToProjects}>
            View Projects
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#contact" className="hero__btn hero__btn--ghost" onClick={(e) => {
            e.preventDefault()
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            Get in Touch
          </a>
        </div>

        <div className={`hero__scroll-indicator ${ctaVisible ? 'hero__scroll-indicator--visible' : ''}`}>
          <div className="hero__scroll-mouse">
            <div className="hero__scroll-wheel" />
          </div>
          <span>Scroll</span>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero__bg-image {
          
          top: 0;
          left: 0;
          width: 45%;
          height: 70%;
          overflow: hidden;
          z-index: 0;
        }
        .hero__bg-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          opacity: 0.65;
          filter: saturate(0.7) contrast(1.05) sepia(0.15);
        }
        .hero__gradient-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(180deg, transparent 0%, rgba(47, 40, 30, 0.2) 25%, rgba(47, 40, 30, 0.7) 50%, var(--bg-primary) 72%),
            radial-gradient(ellipse at 30% 20%, rgba(92, 74, 56, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 40%, rgba(254, 224, 198, 0.06) 0%, transparent 40%);
        }
        .hero__particles {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }
        .hero__content {
          position: relative;
          z-index: var(--z-content);
          padding-top: 120px;
          padding-bottom: 80px;
        }

        /* ── Label ── */
        .hero__label {
          margin-bottom: 24px;
        }
        .hero__label-line {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--peach);
          display: inline-flex;
          align-items: center;
          gap: 12px;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.8s var(--ease-out-expo);
        }
        .hero__label-line--visible {
          opacity: 1;
          transform: translateY(0);
        }
        .hero__label-dash {
          width: 40px;
          height: 1px;
          background: var(--peach);
          display: block;
        }

        /* ── Name ── */
        .hero__name {
          font-family: var(--font-display);
          font-size: clamp(3rem, 10vw, 7rem);
          font-weight: 300;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 28px;
          color: var(--text-primary);
        }
        .hero__char {
          display: inline-block;
          opacity: 0;
          transform: translateY(60px) rotateX(40deg);
          transition: opacity 0.6s var(--ease-out-expo), transform 0.8s var(--ease-out-expo);
        }
        .hero__char--visible {
          opacity: 1;
          transform: translateY(0) rotateX(0);
        }

        /* ── Subtitle ── */
        .hero__subtitle {
          max-width: 600px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.9s var(--ease-out-expo);
        }
        .hero__subtitle--visible {
          opacity: 1;
          transform: translateY(0);
        }
        .hero__tagline {
          font-family: var(--font-body);
          font-size: 1.05rem;
          font-weight: 400;
          color: var(--text-secondary);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .hero__tagline-accent {
          color: var(--peach);
          font-weight: 500;
        }
        .hero__tagline-sep {
          color: var(--taupe);
          opacity: 0.5;
        }
        .hero__description {
          font-size: 0.92rem;
          line-height: 1.7;
          color: var(--text-tertiary);
          margin-bottom: 36px;
        }
        .hero__description strong {
          color: var(--taupe-light);
          font-weight: 500;
        }

        /* ── CTA ── */
        .hero__cta {
          display: flex;
          gap: 16px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.9s var(--ease-out-expo);
          flex-wrap: wrap;
        }
        .hero__cta--visible {
          opacity: 1;
          transform: translateY(0);
        }
        .hero__btn {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 14px 28px;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.4s var(--ease-out-expo);
          text-decoration: none;
        }
        .hero__btn--primary {
          background: var(--brown-deep);
          color: var(--peach-light);
          border: 1px solid rgba(92, 74, 56, 0.6);
        }
        .hero__btn--primary:hover {
          background: var(--brown-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(92, 74, 56, 0.3);
          color: var(--peach-light);
        }
        .hero__btn--ghost {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border-subtle);
        }
        .hero__btn--ghost:hover {
          border-color: var(--taupe);
          color: var(--taupe-light);
          transform: translateY(-2px);
        }

        /* ── Scroll Indicator ── */
        .hero__scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          transition: opacity 1s var(--ease-out-expo) 0.5s;
        }
        .hero__scroll-indicator--visible {
          opacity: 0.5;
        }
        .hero__scroll-indicator span {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }
        .hero__scroll-mouse {
          width: 20px;
          height: 32px;
          border: 1.5px solid var(--text-tertiary);
          border-radius: 10px;
          position: relative;
        }
        .hero__scroll-wheel {
          width: 2px;
          height: 6px;
          background: var(--taupe);
          border-radius: 1px;
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          animation: scrollWheel 2s var(--ease-in-out) infinite;
        }
        @keyframes scrollWheel {
          0%, 100% { opacity: 1; transform: translateX(-50%) translateY(0); }
          50% { opacity: 0.3; transform: translateX(-50%) translateY(8px); }
        }

        @media (max-width: 768px) {
          .hero__content { padding-top: 100px; }
          .hero__tagline { flex-direction: column; align-items: flex-start; gap: 4px; }
          .hero__tagline-sep { display: none; }
          .hero__scroll-indicator { display: none; }
          .hero__bg-image {
    display: none;
  }
        }
      `}</style>
    </section>
  )
}
