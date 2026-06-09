import React from 'react'

export function Nav() {
  return (
    <nav id="main-nav">
      <a href="#hero" className="nav-logo">
        <svg className="nav-logo-mark" viewBox="0 0 36 36" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" fill="none"/>
          <line x1="18" y1="4" x2="18" y2="32" stroke="#c6a664" strokeWidth="1.5"/>
          <line x1="6" y1="32" x2="30" y2="32" stroke="#c6a664" strokeWidth="1.5"/>
          <line x1="6" y1="4" x2="30" y2="4" stroke="#c6a664" strokeWidth="1.5"/>
          <circle cx="18" cy="14" r="4" stroke="#c6a664" strokeWidth="1" fill="none"/>
        </svg>
        <span className="logo-text">INK <em>MAJESTY</em></span>
      </a>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#styles">Styles</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#pain-chart">Pain Chart</a></li>
        <li><a href="#cost-estimator">Pricing</a></li>
        <li><a href="#skin-tone">Skin Guide</a></li>
      </ul>
      <button className="nav-hamburger" id="nav-hamburger" aria-label="Open menu">☰</button>
    </nav>
  )
}

export function ThemeSwitcher() {
  const switchTheme = (t) => {
    document.documentElement.setAttribute('data-theme', t)
    document.querySelectorAll('.tbtn').forEach(b => b.classList.remove('active'))
    document.querySelector(`.tbtn[data-t="${t}"]`).classList.add('active')
  }

  return (
    <div id="theme-switcher" role="navigation" aria-label="Theme selector">
      <button className="tbtn active" data-t="dark-ink" onClick={() => switchTheme('dark-ink')}><span className="ttip">Dark Ink</span></button>
      <button className="tbtn" data-t="japanese" onClick={() => switchTheme('japanese')}><span className="ttip">Japanese</span></button>
      <button className="tbtn" data-t="fine-line" onClick={() => switchTheme('fine-line')}><span className="ttip">Fine Line</span></button>
      <button className="tbtn" data-t="neo-trad" onClick={() => switchTheme('neo-trad')}><span className="ttip">Neo-Traditional</span></button>
    </div>
  )
}

export function StylesSection() {
  return (
    <section id="styles">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow reveal">Our Expertise</span>
          <h2 className="section-title reveal">Every Style, Mastered</h2>
          <div className="divider reveal"></div>
        </div>
        <div className="styles-grid">
          <div className="style-card reveal" data-icon="⬛"><h3>Blackwork</h3><p>Bold, striking designs using exclusively black ink. From geometric patterns to dark illustrative work — powerful and timeless.</p></div>
          <div className="style-card reveal" data-icon="🐉"><h3>Japanese Traditional</h3><p>Irezumi — the ancient art of Japanese tattooing. Koi, dragons, and waves rendered with centuries of cultural mastery.</p></div>
          <div className="style-card reveal" data-icon="✦"><h3>Fine Line</h3><p>Hair-thin precision linework for delicate, intricate designs. Botanical motifs, portraits, and abstract compositions.</p></div>
          <div className="style-card reveal" data-icon="🌿"><h3>Neo-Traditional</h3><p>Traditional boldness meets contemporary illustration. Rich colors, dynamic compositions, modern subject matter.</p></div>
          <div className="style-card reveal" data-icon="⬡"><h3>Geometric</h3><p>Sacred geometry, mandalas, and architectural precision. Mathematical beauty rendered in ink with flawless symmetry.</p></div>
          <div className="style-card reveal" data-icon="👁"><h3>Realism</h3><p>Hyper-realistic portraits and photographic imagery. An elite discipline requiring mastery of light, shadow, and texture.</p></div>
          <div className="style-card reveal" data-icon="💧"><h3>Watercolor</h3><p>Dreamlike washes of color that appear to flow across the skin. Painterly, ethereal, and uniquely expressive.</p></div>
          <div className="style-card reveal" data-icon="⚡"><h3>Trash Polka</h3><p>Collage-style chaos of red and black. Photography meets graphic art meets abstract expressionism on skin.</p></div>
        </div>
      </div>
    </section>
  )
}

const BASE = import.meta.env.BASE_URL

export function PortfolioSection() {
  const [lightbox, setLightbox] = React.useState(null)
  const sectionRef = React.useRef(null)
  const trackRef   = React.useRef(null)

  React.useEffect(() => {
    let ctx = null
    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const track = trackRef.current
        const section = sectionRef.current

        // Pin the section and scrub track horizontally
        const mainTween = gsap.to(track, {
          x: () => track ? -(track.scrollWidth - window.innerWidth) : 0,
          ease: 'none',
          scrollTrigger: {
            id: 'main-scroll', // CRITICAL: required for containerAnimation below
            trigger: section,
            pin: true,
            scrub: 1.4,
            start: 'top top',
            end: () => track ? `+=${track.scrollWidth - window.innerWidth}` : 0,
            invalidateOnRefresh: true,
          }
        })

        // Images will naturally scroll into view as the track moves left, 
        // avoiding complex containerAnimation triggers that might fail to set opacity: 1.
      }, sectionRef)
    }

    init()
    return () => ctx && ctx.revert()
  }, [])

  const works = [
    { img: 'portfolio_blackwork.png', title: 'Sacred Geometry',     tag: 'Blackwork',   year: '2024' },
    { img: 'portfolio_fineline.png',  title: 'Botanical Fine Line',  tag: 'Fine Line',   year: '2024' },
    { img: 'portfolio_japanese.png',  title: 'Irezumi Sleeve',       tag: 'Japanese',    year: '2023' },
    { img: 'portfolio_realism.png',   title: 'Portraiture',          tag: 'Realism',     year: '2024' },
    { img: 'portfolio_geometric.png', title: 'Mandala Dotwork',      tag: 'Geometric',   year: '2025' },
  ]

  // Organic scattered positions (like the Lando Norris scrapbook layout)
  const layout = [
    { left: '20%',  top: '7%',  w: 360, h: 500, rotate: '-2.5deg' },
    { left: '37%',  top: '52%', w: 295, h: 350, rotate:  '1.5deg' },
    { left: '52%',  top: '6%',  w: 400, h: 530, rotate:  '0deg'   },
    { left: '67%',  top: '44%', w: 330, h: 400, rotate: '-1.2deg' },
    { left: '80%',  top: '5%',  w: 450, h: 545, rotate:  '2deg'   },
  ]

  return (
    <>
      <section id="portfolio" ref={sectionRef} className="sg-section">
        <div ref={trackRef} className="sg-track">

          {/* Intro text pinned on the left */}
          <div className="sg-intro">
            <span className="eyebrow">Selected Works</span>
            <h2 className="sg-title">The<br/>Portfolio</h2>
            <div className="divider" style={{ margin: '1.5rem 0' }}></div>
            <p className="sg-hint">Scroll to explore →</p>
          </div>

          {/* Scattered images */}
          {works.map((w, i) => {
            const l = layout[i]
            return (
              <div
                key={i}
                className="sg-item"
                style={{
                  left: l.left,
                  top: l.top,
                  width: l.w,
                  transform: `rotate(${l.rotate})`,
                }}
                onClick={() => setLightbox(w)}
              >
                <div className="sg-label">{w.tag}, {w.year}</div>
                <div className="sg-img-wrap" style={{ height: l.h }}>
                  <img src={`${BASE}${w.img}`} alt={w.title} className="sg-img" />
                </div>
                <div className="sg-caption">
                  <h3>{w.title}</h3>
                </div>
              </div>
            )
          })}

          {/* End panel */}
          <div className="sg-end">
            <span className="sg-end-mark">✦</span>
            <p>Click any image<br/>to expand</p>
          </div>

        </div>
      </section>

      {lightbox && (
        <div className="lb-backdrop" onClick={() => setLightbox(null)}>
          <div className="lb-modal" onClick={e => e.stopPropagation()}>
            <button className="lb-close" onClick={() => setLightbox(null)}>✕</button>
            <img src={`${BASE}${lightbox.img}`} alt={lightbox.title} className="lb-img" />
            <div className="lb-caption">
              <span className="p-tag">{lightbox.tag}</span>
              <h3>{lightbox.title}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


export function ContactSection() {
  const containerRef = React.useRef(null)
  const revealRef = React.useRef(null)

  React.useEffect(() => {
    let ctx = null
    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Expand the circle automatically when scrolled into view (no pinning/fake scrolling)
        gsap.to(revealRef.current, {
          clipPath: 'circle(150% at 50% 100%)',
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 50%', // Trigger when the section reaches the middle of the viewport
            toggleActions: 'play none none reverse',
          }
        })
      }, containerRef)
    }
    init()
    return () => ctx && ctx.revert()
  }, [])

  return (
    <section id="contact-booking" ref={containerRef} className="contact-container">
      {/* Static background (what's behind the expanding circle) */}
      <div className="contact-bg">
        <h2 className="contact-bg-text">GET IN TOUCH</h2>
      </div>

      {/* The expanding circular foreground */}
      <div className="contact-reveal" ref={revealRef} style={{ clipPath: 'circle(0% at 50% 100%)' }}>
        <div className="contact-content">
          <div className="eyebrow">Contact / Booking</div>
          
          <div className="contact-emails">
            <a href="mailto:booking@inkmajesty.com" className="c-email">BOOKING@INKMAJESTY.COM <span className="arrow">↗</span></a>
            <a href="mailto:info@inkmajesty.com" className="c-email">INFO@INKMAJESTY.COM <span className="arrow">↗</span></a>
          </div>

          <div className="contact-hq">
            <div className="hq-coords">
              <span className="hq-label">INK MAJESTY HQ COORDINATES:</span>
              <br/>
              52° 13' 47.2" N<br/>
              21° 00' 42.5" E
            </div>
            <div className="hq-bg-text">WORLDWIDE — 2026</div>
          </div>

          <footer>
            <div className="footer-bottom">
              <div className="f-socials">
                <a href="#" aria-label="Instagram">IG</a>
                <a href="#" aria-label="YouTube">YT</a>
                <a href="#" aria-label="Spotify">SP</a>
              </div>
              <p>© 2026 INK MAJESTY. ALL RIGHTS RESERVED. DESIGNED FOR GREATNESS ✦</p>
            </div>
          </footer>
        </div>
      </div>
    </section>
  )
}
