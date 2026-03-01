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

    // Reduce particles on mobile for performance
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 30 : 60

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * (isMobile ? 1.5 : 2) + 0.5,
        dx: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
        dy: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
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

      // Draw subtle connections (fewer on mobile)
      const connectionDistance = isMobile ? 80 : 120
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(212, 184, 150, ${0.06 * (1 - dist / connectionDistance)})`
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

  const scrollToContact = (e) => {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
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
              style={{ transitionDelay: `${0.4 + i * 0.04}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <div className={`hero__subtitle ${subtitleVisible ? 'hero__subtitle--visible' : ''}`}>
          <p className="hero__tagline">
            <span className="hero__tagline-accent">Data Science Researcher</span>
            <span className="hero__tagline-sep">&mdash;</span>
            <span className="hero__tagline-secondary">AI Engineer & Published IEEE Author</span>
          </p>
          <p className="hero__description">
            Dual degrees from <strong>Nirma University</strong> & <strong>IIT Madras</strong>.
            Building intelligent systems at the intersection of AI, cybersecurity, and embedded hardware.
          </p>
        </div>

        <div className={`hero__cta ${ctaVisible ? 'hero__cta--visible' : ''}`}>
          <a href="#projects" className="hero__btn hero__btn--primary" onClick={scrollToProjects}>
            <span>View Projects</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#contact" className="hero__btn hero__btn--ghost" onClick={scrollToContact}>
            <span>Get in Touch</span>
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
        /* ══════════════════════════════════════════════════════════════
           BASE STYLES
        ══════════════════════════════════════════════════════════════ */
        .hero {
          position: relative;
          min-height: 100vh;
          min-height: 100dvh; /* Dynamic viewport height for mobile browsers */
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero__bg-image {
          position: absolute;
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
          z-index: var(--z-content, 10);
          padding-top: 120px;
          padding-bottom: 80px;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding-left: clamp(20px, 5vw, 80px);
          padding-right: clamp(20px, 5vw, 80px);
        }

        /* ══════════════════════════════════════════════════════════════
           LABEL
        ══════════════════════════════════════════════════════════════ */
        .hero__label {
          margin-bottom: clamp(16px, 4vw, 24px);
        }

        .hero__label-line {
          font-family: var(--font-mono, 'SF Mono', 'Fira Code', monospace);
          font-size: clamp(0.65rem, 2vw, 0.72rem);
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--peach, #FEE0C6);
          display: inline-flex;
          align-items: center;
          gap: clamp(8px, 2vw, 12px);
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.8s var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1));
        }

        .hero__label-line--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero__label-dash {
          width: clamp(24px, 6vw, 40px);
          height: 1px;
          background: var(--peach, #FEE0C6);
          display: block;
        }

        /* ══════════════════════════════════════════════════════════════
           NAME - FLUID TYPOGRAPHY
        ══════════════════════════════════════════════════════════════ */
        .hero__name {
          font-family: var(--font-display, 'Playfair Display', Georgia, serif);
          font-size: clamp(2.5rem, 12vw, 7rem);
          font-weight: 300;
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin-top: -30px;
          margin-bottom: clamp(20px, 5vw, 28px);
          color: var(--text-primary, #FEF6ED);
          word-break: break-word;
          hyphens: auto;
        }

        .hero__char {
          display: inline-block;
          opacity: 0;
          transform: translateY(40px) rotateX(30deg);
          transition: opacity 0.5s var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1)), 
                      transform 0.7s var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1));
        }

        .hero__char--visible {
          opacity: 1;
          transform: translateY(0) rotateX(0);
        }

        /* ══════════════════════════════════════════════════════════════
           SUBTITLE
        ══════════════════════════════════════════════════════════════ */
        .hero__subtitle {
        margin-top:50px;
          max-width: 600px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.9s var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1));
        }

        .hero__subtitle--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero__tagline {
          font-family: var(--font-body, 'Inter', system-ui, sans-serif);
          font-size: clamp(0.9rem, 3vw, 1.05rem);
          font-weight: 400;
          color: var(--text-secondary, #D4B896);
          margin-bottom: clamp(12px, 3vw, 14px);
          display: flex;
          align-items: center;
          gap: clamp(6px, 2vw, 10px);
          flex-wrap: wrap;
          line-height: 1.5;
        }

        .hero__tagline-accent {
          color: var(--peach, #FEE0C6);
          font-weight: 500;
        }

        .hero__tagline-sep {
          color: var(--taupe, #D4B896);
          opacity: 0.5;
        }

        .hero__tagline-secondary {
          color: var(--text-secondary, #A69A8D);
        }

        .hero__description {
          font-size: clamp(0.85rem, 2.5vw, 0.92rem);
          line-height: 1.75;
          color: var(--text-tertiary, #8A7E71);
          margin-bottom: clamp(28px, 6vw, 36px);
        }

        .hero__description strong {
          color: var(--taupe-light, #C4B5A3);
          font-weight: 500;
        }

        /* ══════════════════════════════════════════════════════════════
           CTA BUTTONS
        ══════════════════════════════════════════════════════════════ */
        .hero__cta {
          display: flex;
          gap: clamp(12px, 3vw, 16px);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.9s var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1));
          flex-wrap: wrap;
        }

        .hero__cta--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero__btn {
          font-family: var(--font-mono, 'SF Mono', 'Fira Code', monospace);
          font-size: clamp(0.7rem, 2vw, 0.75rem);
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: clamp(12px, 3vw, 14px) clamp(20px, 5vw, 28px);
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 2vw, 10px);
          cursor: pointer;
          transition: all 0.4s var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1));
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          user-select: none;
          min-height: 48px; /* Touch-friendly minimum */
        }

        .hero__btn--primary {
          background: var(--brown-deep, #5C4A38);
          color: var(--peach-light, #FEF0E1);
          border: 1px solid rgba(92, 74, 56, 0.6);
        }

        .hero__btn--primary:hover {
          background: var(--brown-light, #6B5A48);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(92, 74, 56, 0.3);
          color: var(--peach-light, #FEF0E1);
        }

        .hero__btn--primary:active {
          transform: translateY(0);
          box-shadow: 0 4px 15px rgba(92, 74, 56, 0.2);
        }

        .hero__btn--ghost {
          background: transparent;
          color: var(--text-secondary, #A69A8D);
          border: 1px solid var(--border-subtle, rgba(212, 184, 150, 0.2));
        }

        .hero__btn--ghost:hover {
          border-color: var(--taupe, #D4B896);
          color: var(--taupe-light, #C4B5A3);
          transform: translateY(-2px);
        }

        .hero__btn--ghost:active {
          transform: translateY(0);
        }

        /* ══════════════════════════════════════════════════════════════
           SCROLL INDICATOR
        ══════════════════════════════════════════════════════════════ */
        .hero__scroll-indicator {
          position: absolute;
          bottom: clamp(24px, 5vh, 40px);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          transition: opacity 1s var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1)) 0.5s;
        }

        .hero__scroll-indicator--visible {
          opacity: 0.5;
        }

        .hero__scroll-indicator span {
          font-family: var(--font-mono, 'SF Mono', 'Fira Code', monospace);
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-tertiary, #8A7E71);
        }

        .hero__scroll-mouse {
          width: 20px;
          height: 32px;
          border: 1.5px solid var(--text-tertiary, #8A7E71);
          border-radius: 10px;
          position: relative;
        }

        .hero__scroll-wheel {
          width: 2px;
          height: 6px;
          background: var(--taupe, #D4B896);
          border-radius: 1px;
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          animation: scrollWheel 2s var(--ease-in-out, ease-in-out) infinite;
        }

        @keyframes scrollWheel {
          0%, 100% { opacity: 1; transform: translateX(-50%) translateY(0); }
          50% { opacity: 0.3; transform: translateX(-50%) translateY(8px); }
        }

        /* ══════════════════════════════════════════════════════════════
           RESPONSIVE - TABLET (768px - 1024px)
        ══════════════════════════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .hero__bg-image {
            width: 50%;
            height: 60%;
          }

          .hero__content {
            padding-top: 100px;
            padding-bottom: 60px;
          }
        }

        /* ══════════════════════════════════════════════════════════════
           RESPONSIVE - MOBILE LANDSCAPE & SMALL TABLETS (481px - 767px)
        ══════════════════════════════════════════════════════════════ */
        @media (max-width: 767px) {
          .hero {
            align-items: flex-start;
            padding-top: env(safe-area-inset-top, 0);
          }

          .hero__bg-image {
            width: 100%;
            height: 45%;
            opacity: 0.7;
          }

          .hero__gradient-overlay {
            background:
              linear-gradient(180deg, 
                transparent 0%, 
                rgba(47, 40, 30, 0.3) 20%, 
                rgba(47, 40, 30, 0.8) 40%, 
                var(--bg-primary, #2F281E) 60%),
              radial-gradient(ellipse at 50% 30%, rgba(92, 74, 56, 0.15) 0%, transparent 60%);
          }

          .hero__content {
            padding-top: max(45vh, 280px);
            padding-bottom: calc(80px + env(safe-area-inset-bottom, 0));
          }

          .hero__name {
            font-size: clamp(2.8rem, 14vw, 4.5rem);
            letter-spacing: -0.02em;
            margin-bottom: 20px;
          }

          .hero__tagline {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }

          .hero__tagline-sep {
            display: none;
          }

          .hero__tagline-accent {
            font-size: clamp(1rem, 4vw, 1.1rem);
          }

          .hero__tagline-secondary {
            font-size: clamp(0.85rem, 3.5vw, 0.95rem);
          }

          .hero__description {
            font-size: clamp(0.875rem, 3.5vw, 0.95rem);
            line-height: 1.7;
            margin-bottom: 32px;
          }

          .hero__cta {
            flex-direction: row;
            gap: 12px;
          }

          .hero__btn {
            flex: 1;
            min-width: 140px;
            padding: 14px 20px;
          }

          .hero__scroll-indicator {
            display: none;
          }
        }

        /* ══════════════════════════════════════════════════════════════
           RESPONSIVE - MOBILE PORTRAIT (320px - 480px)
        ══════════════════════════════════════════════════════════════ */
        @media (max-width: 480px) {
          .hero__bg-image {
            height: 40%;
          }

          .hero__content {
            padding-top: max(42vh, 240px);
            padding-left: 20px;
            padding-right: 20px;
          }

          .hero__label {
            margin-top: 44px;
          }

          .hero__label-dash {
            width: 20px;
          }

          .hero__name {
            font-size: clamp(2.2rem, 13vw, 3.2rem);
            margin-bottom: 18px;
          }

          .hero__char {
            transform: translateY(30px) rotateX(20deg);
          }

          .hero__subtitle {
            max-width: 100%;
          }

          .hero__tagline {
            margin-bottom: 10px;
          }

          .hero__tagline-accent {
            font-size: 0.95rem;
          }

          .hero__tagline-secondary {
            font-size: 0.82rem;
            opacity: 0.9;
          }

          .hero__description {
            font-size: 0.85rem;
            line-height: 1.65;
            margin-bottom: 28px;
          }

          .hero__cta {
            flex-direction: column;
            gap: 12px;
            width: 100%;
          }

          .hero__btn {
            width: 100%;
            min-width: unset;
            padding: 16px 24px;
            font-size: 0.72rem;
          }

          .hero__btn svg {
            width: 14px;
            height: 14px;
          }
        }

        /* ══════════════════════════════════════════════════════════════
           RESPONSIVE - VERY SMALL DEVICES (< 320px)
        ══════════════════════════════════════════════════════════════ */
        @media (max-width: 320px) {
          .hero__content {
            padding-left: 16px;
            padding-right: 16px;
          }

          .hero__name {
            font-size: 2rem;
          }

          .hero__tagline-accent {
            font-size: 0.9rem;
          }

          .hero__description {
            font-size: 0.82rem;
          }
        }

        /* ══════════════════════════════════════════════════════════════
           MOBILE LANDSCAPE SPECIFIC
        ══════════════════════════════════════════════════════════════ */
        @media (max-height: 500px) and (orientation: landscape) {
          .hero {
            min-height: auto;
            padding: 20px 0;
          }

          .hero__bg-image {
            width: 40%;
            height: 100%;
            left: auto;
            right: 0;
          }

          .hero__gradient-overlay {
            background:
              linear-gradient(90deg, 
                var(--bg-primary, #2F281E) 0%, 
                var(--bg-primary, #2F281E) 40%,
                rgba(47, 40, 30, 0.9) 60%, 
                rgba(47, 40, 30, 0.7) 80%,
                transparent 100%),
              radial-gradient(ellipse at 20% 50%, rgba(92, 74, 56, 0.15) 0%, transparent 60%);
          }

          .hero__content {
            padding-top: 60px;
            padding-bottom: 40px;
            max-width: 60%;
          }

          .hero__name {
            font-size: clamp(1.8rem, 6vw, 2.5rem);
            margin-bottom: 12px;
          }

          .hero__tagline {
            flex-direction: row;
            flex-wrap: wrap;
          }

          .hero__tagline-sep {
            display: inline;
          }

          .hero__description {
            font-size: 0.8rem;
            margin-bottom: 20px;
            line-height: 1.6;
          }

          .hero__cta {
            flex-direction: row;
          }

          .hero__btn {
            padding: 10px 18px;
            min-height: 40px;
          }

          .hero__scroll-indicator {
            display: none;
          }
        }

        /* ══════════════════════════════════════════════════════════════
           REDUCED MOTION ACCESSIBILITY
        ══════════════════════════════════════════════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          .hero__char {
            transition: opacity 0.3s ease;
            transform: none;
          }

          .hero__char--visible {
            transform: none;
          }

          .hero__label-line,
          .hero__subtitle,
          .hero__cta {
            transition: opacity 0.3s ease;
          }

          .hero__scroll-wheel {
            animation: none;
            opacity: 0.6;
          }

          .hero__btn {
            transition: background 0.2s ease, border-color 0.2s ease;
          }

          .hero__btn:hover {
            transform: none;
          }
        }

        /* ══════════════════════════════════════════════════════════════
           HIGH CONTRAST MODE
        ══════════════════════════════════════════════════════════════ */
        @media (prefers-contrast: high) {
          .hero__btn--primary {
            border-width: 2px;
          }

          .hero__btn--ghost {
            border-width: 2px;
          }

          .hero__description {
            color: var(--text-secondary, #A69A8D);
          }
        }

        /* ══════════════════════════════════════════════════════════════
           DARK MODE HANDLING (if needed)
        ══════════════════════════════════════════════════════════════ */
        @media (prefers-color-scheme: dark) {
          .hero__bg-image img {
            opacity: 0.5;
          }
        }

        /* ══════════════════════════════════════════════════════════════
           NOTCH/SAFE AREA SUPPORT FOR iOS
        ══════════════════════════════════════════════════════════════ */
        @supports (padding: max(0px)) {
          .hero__content {
            padding-left: max(20px, env(safe-area-inset-left));
            padding-right: max(20px, env(safe-area-inset-right));
          }

          @media (max-width: 480px) {
            .hero__content {
              padding-bottom: calc(60px + env(safe-area-inset-bottom, 20px));
            }
          }
        }
      `}</style>
    </section>
  )
}