import React, { useEffect } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import NavBar from './components/NavBar';
import Features from './components/Features';
import Story from './components/Story';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Lenis from 'lenis';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.5,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // Make Lenis available globally for NavBar
    if (typeof window !== 'undefined') {
      window.lenis = lenis;
    }

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      if (typeof window !== 'undefined') {
        delete window.lenis;
      }
    }
  }, [])

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  )
}
