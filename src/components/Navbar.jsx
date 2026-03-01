import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Publications', href: '#publications' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)

      const sections = navLinks.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#" className="navbar__logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <span className="navbar__logo-letter">R</span>
          <span className="navbar__logo-dot">.</span>
        </a>

        <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link ${activeSection === link.href.slice(1) ? 'navbar__link--active' : ''}`}
              onClick={(e) => handleClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/RiyaUpadhyay_Resume-6.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__resume-btn"
          >
            Resume
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v7.5M2.5 6L6 9.5 9.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 11h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
        </div>

        <button
          className={`navbar__burger ${mobileOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span /><span /><span />
        </button>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: var(--z-nav);
          padding: 20px 0;
          transition: all 0.5s var(--ease-out-expo);
        }
        .navbar--scrolled {
          padding: 12px 0;
          background: rgba(47, 40, 30, 0.75);
          backdrop-filter: blur(24px) saturate(1.4);
          -webkit-backdrop-filter: blur(24px) saturate(1.4);
          border-bottom: 1px solid var(--border-subtle);
        }
        .navbar__inner {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-padding);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar__logo {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
          display: flex;
          align-items: baseline;
          transition: transform 0.3s var(--ease-out-expo);
        }
        .navbar__logo:hover {
          transform: scale(1.05);
          color: var(--text-primary);
        }
        .navbar__logo-dot {
          color: var(--peach);
          font-size: 2.2rem;
          line-height: 0;
        }
        .navbar__links {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .navbar__link {
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 400;
          letter-spacing: 0.04em;
          color: var(--text-secondary);
          text-decoration: none;
          position: relative;
          padding: 4px 0;
          transition: color 0.3s var(--ease-out-quart);
        }
        .navbar__link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--peach);
          transition: width 0.4s var(--ease-out-expo);
        }
        .navbar__link:hover,
        .navbar__link--active {
          color: var(--text-primary);
        }
        .navbar__link--active::after,
        .navbar__link:hover::after {
          width: 100%;
        }
        .navbar__resume-btn {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--peach);
          border: 1px solid rgba(254, 224, 198, 0.3);
          padding: 8px 18px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.35s var(--ease-out-expo);
          text-decoration: none;
        }
        .navbar__resume-btn:hover {
          background: rgba(254, 224, 198, 0.08);
          border-color: var(--peach);
          color: var(--peach);
          transform: translateY(-1px);
        }

        /* ── Burger ── */
        .navbar__burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          z-index: 10;
        }
        .navbar__burger span {
          display: block;
          width: 24px;
          height: 1.5px;
          background: var(--text-primary);
          transition: all 0.3s var(--ease-out-expo);
          transform-origin: center;
        }
        .navbar__burger--open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .navbar__burger--open span:nth-child(2) {
          opacity: 0;
        }
        .navbar__burger--open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        @media (max-width: 768px) {
          .navbar__burger { display: flex; }
          .navbar__links {
            position: fixed;
            top: 0;
            right: 0;
            width: 280px;
            height: 100vh;
            background: rgba(47, 40, 30, 0.95);
            backdrop-filter: blur(40px);
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            padding: 40px;
            gap: 24px;
            transform: translateX(100%);
            transition: transform 0.5s var(--ease-out-expo);
            border-left: 1px solid var(--border-subtle);
          }
          .navbar__links--open {
            transform: translateX(0);
          }
          .navbar__link { font-size: 1rem; }
        }
      `}</style>
    </nav>
  )
}
