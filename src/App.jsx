import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Publications from './components/Publications'
import Skills from './components/Skills'
import Contact from './components/Contact'

export default function App() {
  useEffect(() => {
    // Intersection Observer for scroll-reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Re-observe after lazy-loaded content renders
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      )
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el))
      return () => observer.disconnect()
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Publications />
      <Skills />
      <Contact />
    </>
  )
}
