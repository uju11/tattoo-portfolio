import React, { useState } from 'react'

const skinInfo = {
  I:   'Type I (Very Fair): All ink colors show excellently. Maximum contrast and vibrancy. Every color works beautifully.',
  II:  'Type II (Fair): Excellent canvas for all inks. Vibrant colors pop brilliantly.',
  III: 'Type III (Medium): Great for bold and dark inks. Bright colors remain vibrant but lighter shades may need touch-ups.',
  IV:  'Type IV (Olive/Medium Dark): Dark inks show beautifully. Bold colors still pop well. Pastels will appear more muted.',
  V:   'Type V (Dark Brown): Black ink and dark saturated colors work best. Deep red and royal blue are good choices.',
  VI:  'Type VI (Very Dark): Blackwork looks incredible — stunning contrast. Light colors are generally not recommended.'
}

const inkColors = [
  { name:'Black',       hex:'#1a1a1a', compat:[5,5,5,5,5,4] },
  { name:'Deep Red',    hex:'#8b1a1a', compat:[5,5,4,3,2,1] },
  { name:'Royal Blue',  hex:'#1a3a8b', compat:[5,5,4,3,2,1] },
  { name:'Forest Green',hex:'#1a5c1e', compat:[5,5,4,3,2,1] },
  { name:'Sunshine',    hex:'#f5c842', compat:[5,4,3,2,1,1] },
  { name:'White',       hex:'#e8e8e0', compat:[4,3,2,1,1,1] },
  { name:'Purple',      hex:'#6b1a8b', compat:[5,5,4,3,2,1] },
  { name:'Orange',      hex:'#d4621a', compat:[5,4,4,3,2,1] },
  { name:'Pink',        hex:'#d45c8b', compat:[5,4,3,2,1,1] },
  { name:'Teal',        hex:'#1a8b7a', compat:[5,5,4,3,2,1] },
  { name:'Gold',        hex:'#c8a850', compat:[5,4,4,3,2,1] },
  { name:'Grey Wash',   hex:'#7a7a7a', compat:[5,5,5,4,3,2] },
]

const skinIdx = ['I','II','III','IV','V','VI']

function compatColor(n) {
  if (n >= 4) return '#4ade80'
  if (n >= 3) return '#facc15'
  if (n >= 2) return '#fb923c'
  return '#ef4444'
}

function compatLabel(n) {
  return n >= 4 ? 'Excellent' : n >= 3 ? 'Good' : n >= 2 ? 'Limited' : 'Not Recommended'
}

export default function SkinGuide() {
  const [activeSkin, setActiveSkin] = useState('I')
  const si = skinIdx.indexOf(activeSkin)

  return (
    <section id="skin-tone">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow reveal">Informed Decisions</span>
          <h2 className="section-title reveal">Skin Tone<br/>Compatibility Guide</h2>
          <div className="divider reveal"></div>
        </div>
        <p className="skin-intro reveal">Select your Fitzpatrick skin type to see how various ink colors will look on your skin.</p>
        
        <div className="skin-selector reveal">
          <button className={`skin-btn ${activeSkin === 'I' ? 'active' : ''}`} onClick={() => setActiveSkin('I')}>
            <div className="skin-circle" style={{background:'#fdf3e7', border:'1px solid #d4b896'}}></div><span>Type I</span>
          </button>
          <button className={`skin-btn ${activeSkin === 'II' ? 'active' : ''}`} onClick={() => setActiveSkin('II')}>
            <div className="skin-circle" style={{background:'#f5d5b0'}}></div><span>Type II</span>
          </button>
          <button className={`skin-btn ${activeSkin === 'III' ? 'active' : ''}`} onClick={() => setActiveSkin('III')}>
            <div className="skin-circle" style={{background:'#d4a574'}}></div><span>Type III</span>
          </button>
          <button className={`skin-btn ${activeSkin === 'IV' ? 'active' : ''}`} onClick={() => setActiveSkin('IV')}>
            <div className="skin-circle" style={{background:'#b07d4a'}}></div><span>Type IV</span>
          </button>
          <button className={`skin-btn ${activeSkin === 'V' ? 'active' : ''}`} onClick={() => setActiveSkin('V')}>
            <div className="skin-circle" style={{background:'#7d4e25'}}></div><span>Type V</span>
          </button>
          <button className={`skin-btn ${activeSkin === 'VI' ? 'active' : ''}`} onClick={() => setActiveSkin('VI')}>
            <div className="skin-circle" style={{background:'#3d1a08'}}></div><span>Type VI</span>
          </button>
        </div>

        <div className="skin-result reveal">
          <strong>{skinInfo[activeSkin]}</strong>
        </div>

        <div className="ink-grid reveal">
          {inkColors.map(c => {
            const score = c.compat[si]
            const cc = compatColor(score)
            return (
              <div className="ink-card" key={c.name}>
                <div className="ink-swatch" style={{background: c.hex}}></div>
                <div className="ink-name">{c.name}</div>
                <div className="ink-compat">
                  {[1,2,3,4,5].map(p => (
                    <div key={p} className="compat-pip" style={{background: p <= score ? cc : 'var(--border)'}}></div>
                  ))}
                </div>
                <div className="ink-compat-label" style={{color: cc}}>{compatLabel(score)}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
