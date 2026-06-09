import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

import PainChart from './components/PainChart'
import CostEstimator from './components/CostEstimator'
import SkinGuide from './components/SkinGuide'
import { Nav, ThemeSwitcher, StylesSection, PortfolioSection, ContactSection } from './components/Sections'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

export default function App() {
  const storyRef = useRef(null)
  const pathRef = useRef(null)
  const machineRef = useRef(null)
  const lineWrapRef = useRef(null)

  // Setup GSAP animations on mount
  useEffect(() => {
    // 1. Standard reveals
    gsap.utils.toArray('.reveal').forEach((el, i) => {
      gsap.fromTo(el, { opacity:0, y:50 }, {
        opacity:1, y:0, duration:1, ease:'power2.out',
        scrollTrigger: { trigger:el, start:'top 86%', once:true },
        delay: (i % 4) * 0.08
      })
    })

    gsap.fromTo('.style-card', { opacity:0, y:40 }, {
      opacity:1, y:0, duration:0.6, stagger:0.09, ease:'power3.out',
      scrollTrigger: { trigger:'.styles-grid', start:'top 80%', once:true }
    })

    // Custom cursor logic
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    let moveCursor = null;

    if (dot && ring) {
      moveCursor = (e) => {
        gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0 })
        gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.14, ease:'power2.out' })
      }
      window.addEventListener('mousemove', moveCursor)
    }

    // 2. Machine Drawing Scroll Animation
    const buildPath = () => {
      const h = storyRef.current.offsetHeight
      const w = window.innerWidth
      // Winding path straight down the middle in real pixels
      const cx = w / 2
      const offset = Math.min(w * 0.3, 200) // curve intensity
      return `M ${cx},0 Q ${cx - offset},${h * 0.1} ${cx},${h * 0.2} T ${cx},${h * 0.4} T ${cx},${h * 0.6} T ${cx},${h * 0.8} T ${cx},${h}`
    }

    const path = pathRef.current
    if (path && storyRef.current) {
      path.setAttribute('d', buildPath())
      const length = path.getTotalLength()
      
      // Setup the stroke for drawing
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

      // Sync both animations in a single timeline so they never break apart
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top 50%',
          end: 'bottom 90%',
          scrub: 1,
          invalidateOnRefresh: true,
        }
      })

      // Animate the stroke being drawn (fromTo ensures it reliably erases on reverse)
      tl.fromTo(path, 
        { strokeDashoffset: length },
        { strokeDashoffset: 0, ease: 'none' },
      0)

      // Use MotionPathPlugin to make the machine perfectly follow the SVG path!
      tl.to(machineRef.current, {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5], // Center the image on the line
          offsetX: 60, // Shift image RIGHT so left-side needle touches line
          offsetY: -60, // Shift image UP so bottom needle touches line
        },
        ease: 'none',
      }, 0)
    }

    const handleResize = () => {
      if (path && storyRef.current) {
        path.setAttribute('d', buildPath())
        const newLen = path.getTotalLength()
        gsap.set(path, { strokeDasharray: newLen })
        ScrollTrigger.refresh()
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      if (moveCursor) {
        window.removeEventListener('mousemove', moveCursor)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <div id="cursor-dot"></div>
      <div id="cursor-ring"></div>

      <ThemeSwitcher />
      <Nav />

      {/* Hero Section with Video Background */}
      <section id="hero">
        <div className="hero-video-container">
          <video 
            className="hero-video" 
            src={`${import.meta.env.BASE_URL}background.mp4`} 
            autoPlay 
            loop 
            muted 
            playsInline
          />
          <div className="hero-video-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-eyebrow">Award-Winning Custom Artistry</div>
          <h1 className="hero-title">Where Skin<br/>Becomes <span className="accent">Canvas</span></h1>
          <p className="hero-subtitle">Bespoke tailoring for the body. Crafted with obsessive precision.</p>
        </div>
      </section>

      {/* Story Container where the machine draws */}
      <div ref={storyRef} className="story-container">
        
        {/* The SVG Canvas overlay covering the entire story section */}
        <div className="story-canvas" ref={lineWrapRef}>
          <svg className="story-svg">
            <path 
              ref={pathRef}
              d="" 
              fill="none" 
              stroke="#cc0000" 
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: 'drop-shadow(0 0 8px rgba(204,0,0,0.6))' }}
            />
          </svg>
          
          <div ref={machineRef} className="story-machine">
            <img 
              src={`${import.meta.env.BASE_URL}machine.png`} 
              alt="Tattoo Machine" 
              onLoad={() => ScrollTrigger.refresh()}
            />
          </div>
        </div>

        {/* Content goes over the canvas */}
        <div className="story-content">
          <section id="about">
            <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
                <div className="about-text">
                  <span className="eyebrow reveal" style={{ margin: '0 auto' }}>Our Story</span>
                  <h2 className="reveal">Masters of the<br/>Permanent Art</h2>
                  <p className="reveal" style={{ margin: '0 auto 1rem', maxWidth: '600px' }}>At Ink Majesty Studio, we believe every tattoo is a collaboration between artist and canvas. Our artists bring decades of combined experience across multiple classic disciplines.</p>
                  <p className="reveal" style={{ margin: '0 auto 1rem', maxWidth: '600px' }}>Step into an atmosphere of refined elegance. We treat tattooing with the same reverence as a master tailor approaches a bespoke suit.</p>
                  <div className="about-stats reveal" style={{ justifyContent: 'center', marginTop: '4rem' }}>
                    <div className="stat"><span className="stat-num">2000+</span><span className="stat-lbl">Tattoos</span></div>
                    <div className="stat"><span className="stat-num">12</span><span className="stat-lbl">Years Exp</span></div>
                    <div className="stat"><span className="stat-num">47</span><span className="stat-lbl">Awards</span></div>
                  </div>
                </div>
            </div>
          </section>

          <StylesSection />
          <PortfolioSection />
          <PainChart />
          <CostEstimator />
          <SkinGuide />
        </div>
      </div>

      <ContactSection />

    </div>
  )
}
