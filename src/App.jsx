import { useEffect } from 'react'
import Lenis from 'lenis'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Experience } from './components/Experience'
import { Education } from './components/Education'
import { Projects } from './components/Projects'
import { Publications } from './components/Publications'
import { Footer } from './components/Footer'
import { ThemeProvider } from './ThemeContext'

function AppInner() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const handle = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(handle)
      lenis.destroy()
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Experience />
      <Education />
      <Projects />
      <Publications />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}
