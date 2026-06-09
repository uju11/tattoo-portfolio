import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import PainChart from './components/PainChart'
import CostEstimator from './components/CostEstimator'
import SkinGuide from './components/SkinGuide'
import { Nav, ThemeSwitcher, StylesSection, PortfolioSection, BookingAndFooter } from './components/Sections'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  // Setup GSAP animations on mount
  useEffect(() => {
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

    gsap.fromTo('.p-card', { opacity:0, y:60, scale:0.96 }, {
      opacity:1, y:0, scale:1, duration:0.8, stagger:0.12, ease:'power3.out',
      scrollTrigger: { trigger:'.portfolio-grid', start:'top 80%', once:true }
    })

    // Custom cursor logic
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    if (dot && ring) {
      const moveCursor = (e) => {
        gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0 })
        gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.14, ease:'power2.out' })
      }
      window.addEventListener('mousemove', moveCursor)
      return () => window.removeEventListener('mousemove', moveCursor)
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
            src="/background.mp4" 
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
          <a href="#booking" className="btn-primary magnetic" id="hero-cta"><span className="btn-icon">✦</span> Book a Consultation</a>
        </div>
      </section>

      {/* About Section - Classic Italian Aesthetic */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
            {/* Elegant static frame replacing the 3D element */}
            <div className="about-frame reveal">
               <div className="about-frame-inner">
                 <h3>Bespoke</h3>
                 <p>"The body is a canvas,<br/>we provide the masterpiece."</p>
               </div>
            </div>
            
            <div className="about-text">
              <span className="eyebrow reveal">Our Story</span>
              <h2 className="reveal">Masters of the<br/>Permanent Art</h2>
              <p className="reveal">At Ink Majesty Studio, we believe every tattoo is a collaboration between artist and canvas. Our artists bring decades of combined experience across multiple classic disciplines.</p>
              <p className="reveal">Step into an atmosphere of refined elegance. We treat tattooing with the same reverence as a master tailor approaches a bespoke suit.</p>
              <div className="about-stats reveal">
                <div className="stat"><span className="stat-num">2000+</span><span className="stat-lbl">Tattoos</span></div>
                <div className="stat"><span className="stat-num">12</span><span className="stat-lbl">Years Exp</span></div>
                <div className="stat"><span className="stat-num">47</span><span className="stat-lbl">Awards</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the Site Components */}
      <StylesSection />
      <PortfolioSection />
      <PainChart />
      <CostEstimator />
      <SkinGuide />
      <BookingAndFooter />

    </div>
  )
}
