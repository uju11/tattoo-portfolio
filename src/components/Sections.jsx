import React from 'react'

export function Nav() {
  return (
    <nav id="main-nav">
      <a href="#hero" className="nav-logo">INK <span>MAJESTY</span> STUDIO</a>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#styles">Styles</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#pain-chart">Pain Chart</a></li>
        <li><a href="#cost-estimator">Pricing</a></li>
        <li><a href="#skin-tone">Skin Guide</a></li>
        <li><a href="#booking">Book</a></li>
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

export function PortfolioSection() {
  return (
    <section id="portfolio">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow reveal">Selected Works</span>
          <h2 className="section-title reveal">The Portfolio</h2>
          <div className="divider reveal"></div>
        </div>
        <div className="portfolio-grid">
          <div className="p-card reveal tall" style={{'--card-bg2': 'linear-gradient(135deg,#1a0a0a,#2d1515)'}}>
            <div className="p-card-img">
              <svg viewBox="0 0 200 200" width="65%" opacity="0.55">
                <circle cx="100" cy="100" r="80" stroke="var(--accent)" strokeWidth="0.5" fill="none"/>
                <circle cx="100" cy="100" r="55" stroke="var(--accent)" strokeWidth="0.5" fill="none" opacity="0.7"/>
                <circle cx="100" cy="100" r="30" stroke="var(--accent)" strokeWidth="0.5" fill="none" opacity="0.5"/>
                <line x1="20" y1="100" x2="180" y2="100" stroke="var(--accent)" strokeWidth="0.4" opacity="0.4"/>
                <line x1="100" y1="20" x2="100" y2="180" stroke="var(--accent)" strokeWidth="0.4" opacity="0.4"/>
                <path d="M100 22 L113 75 L168 75 L124 110 L140 163 L100 130 L60 163 L76 110 L32 75 L87 75Z" stroke="var(--accent)" strokeWidth="0.8" fill="none"/>
              </svg>
            </div>
            <div className="p-overlay"><div className="p-info"><h3>Sacred Geometry</h3><p>Geometric · Blackwork</p></div></div>
          </div>
          <div className="p-card reveal" style={{'--card-bg2': 'linear-gradient(135deg,#0a0f1a,#151f2d)'}}>
            <div className="p-card-img">
              <svg viewBox="0 0 200 200" width="60%" opacity="0.55">
                <path d="M100 30 Q130 55 125 90 Q148 68 165 92 Q152 125 122 133 Q145 155 132 182 Q100 162 68 182 Q55 155 78 133 Q48 125 35 92 Q52 68 75 90 Q70 55 100 30Z" stroke="var(--accent)" strokeWidth="1" fill="none"/>
              </svg>
            </div>
            <div className="p-overlay"><div className="p-info"><h3>Botanical Fine Line</h3><p>Fine Line</p></div></div>
          </div>
          <div className="p-card reveal" style={{'--card-bg2': 'linear-gradient(135deg,#1a0800,#2d1500)'}}>
            <div className="p-card-img">
              <svg viewBox="0 0 200 200" width="60%" opacity="0.55">
                <path d="M80 165 Q60 120 72 78 Q84 38 100 28 Q116 38 128 78 Q140 120 120 165" stroke="var(--accent)" strokeWidth="1.5" fill="none"/>
                <ellipse cx="100" cy="28" rx="18" ry="14" stroke="var(--accent)" strokeWidth="1" fill="none"/>
              </svg>
            </div>
            <div className="p-overlay"><div className="p-info"><h3>Serpent Rising</h3><p>Japanese Traditional</p></div></div>
          </div>
          <div className="p-card reveal" style={{'--card-bg2': 'linear-gradient(135deg,#0d1a0d,#1a2d1a)'}}>
            <div className="p-card-img">
              <svg viewBox="0 0 200 200" width="60%" opacity="0.55">
                <rect x="28" y="28" width="144" height="144" stroke="var(--accent)" strokeWidth="0.5" fill="none" transform="rotate(45 100 100)"/>
                <circle cx="100" cy="100" r="32" stroke="var(--accent)" strokeWidth="0.8" fill="none"/>
              </svg>
            </div>
            <div className="p-overlay"><div className="p-info"><h3>Mandala</h3><p>Geometric</p></div></div>
          </div>
          <div className="p-card reveal" style={{'--card-bg2': 'linear-gradient(135deg,#1a1500,#2d2200)'}}>
            <div className="p-card-img">
              <svg viewBox="0 0 200 200" width="60%" opacity="0.55">
                <path d="M50 155 Q80 80 100 50 Q120 80 150 155" stroke="var(--accent)" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <div className="p-overlay"><div className="p-info"><h3>Neo-Trad Floral</h3><p>Neo-Traditional</p></div></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function BookingAndFooter() {
  return (
    <>
      <section id="booking">
        <div className="container" style={{textAlign:'center'}}>
          <div className="section-header">
            <span className="eyebrow reveal">Begin Your Journey</span>
            <h2 className="section-title reveal">Book a Session</h2>
            <div className="divider reveal"></div>
          </div>
          <p className="booking-intro reveal">Every great tattoo begins with a conversation. Book a free 30-minute consultation.</p>
          <div className="booking-cards reveal">
            <div className="book-card"><div className="book-icon">✦</div><h3>Consultation</h3><p>Free 30-min session to discuss your vision.</p></div>
            <div className="book-card"><div className="book-icon">◈</div><h3>Custom Design</h3><p>Original artwork created exclusively for you.</p></div>
            <div className="book-card"><div className="book-icon">◉</div><h3>Tattoo Session</h3><p>The main event. 2-hour sessions up to full-day.</p></div>
          </div>
          <div className="calendly-box reveal">
            <p>📅 Schedule your consultation</p>
            <a href="#" className="btn-primary magnetic" id="book-btn"><span className="btn-icon">📅</span> Book via Calendly</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <span className="f-logo">INK <span>MAJESTY</span></span>
              <p>Where skin becomes canvas. Premium custom tattoo artistry.</p>
            </div>
            <div className="footer-col"><h4>Navigate</h4><ul><li><a href="#about">About</a></li><li><a href="#styles">Styles</a></li></ul></div>
            <div className="footer-col"><h4>Tools</h4><ul><li><a href="#pain-chart">Pain Chart</a></li><li><a href="#cost-estimator">Cost Estimator</a></li></ul></div>
            <div className="footer-col"><h4>Policies</h4><ul><li><a href="#">Aftercare Guide</a></li><li><a href="#">Deposit Policy</a></li></ul></div>
          </div>
          <div className="footer-bottom"><p>© 2026 Ink Majesty Studio. All rights reserved.</p><p>Crafted with obsessive detail ✦</p></div>
        </div>
      </footer>
    </>
  )
}
