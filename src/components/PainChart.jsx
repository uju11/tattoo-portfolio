import React, { useState } from 'react'

const painData = {
  Head: { score: 7, desc: "Minimal fat and skin sits close to bone, making it quite painful.", tips: "Stay hydrated. Shorter sessions recommended." },
  Neck: { score: 7, desc: "Very sensitive — thin skin, many nerve endings.", tips: "Avoid tight collars during healing." },
  Chest: { score: 6, desc: "Moderately painful. Sternum is more intense.", tips: "Wear loose clothing." },
  Sternum: { score: 9, desc: "Almost no fat/muscle. You're tattooing over bare bone.", tips: "Take frequent breaks. Breathe deeply." },
  Ribs: { score: 9, desc: "Thin skin over bone, constant movement from breathing.", tips: "Short sessions. Stay calm." },
  Stomach: { score: 7, desc: "Soft and stretchy skin makes the process challenging.", tips: "Avoid waistbands that rub." },
  'Upper Arm': { score: 3, desc: "Good muscle coverage, low nerve density.", tips: "Great starter location." },
  'Inner Elbow': { score: 8, desc: "Extremely sensitive, packed with nerves.", tips: "Avoid bending arm repeatedly." },
  Forearm: { score: 4, desc: "Good muscle padding, manageable.", tips: "Sun protection is crucial." },
  Wrist: { score: 6, desc: "Thin skin near tendons and veins.", tips: "Fades faster. Plan for touch-ups." },
  Hand: { score: 8, desc: "Thin skin over tendons, dense nerves.", tips: "Requires frequent touch-ups." },
  'Lower Back': { score: 6, desc: "Moderately painful, especially near spine.", tips: "Avoid sitting too long during healing." },
  Hip: { score: 7, desc: "Painful near bone, tolerable on outer flesh.", tips: "Loose waistbands essential." },
  Thigh: { score: 4, desc: "Great muscle/fat coverage on outer thigh.", tips: "Excellent for first large pieces." },
  Knee: { score: 8, desc: "Thin skin over kneecap, surrounded by tendons.", tips: "Keep elevated. Avoid strenuous activity." },
  Shin: { score: 7, desc: "Minimal protection over the tibia bone.", tips: "Loose trousers essential." },
  Calf: { score: 4, desc: "Muscle provides excellent cushioning.", tips: "Great for first leg pieces." },
  Ankle: { score: 7, desc: "Thin skin over prominent ankle bones.", tips: "Avoid tight footwear." },
  Foot: { score: 8, desc: "Thin skin, prominent bones, high nerve density.", tips: "Minimal footwear during healing." }
}

function painColor(n) {
  if (n <= 3) return '#4ade80'
  if (n <= 5) return '#facc15'
  if (n <= 7) return '#fb923c'
  if (n <= 9) return '#ef4444'
  return '#7c3aed'
}

export default function PainChart() {
  const [selectedRegion, setSelectedRegion] = useState(null)

  const handleSelect = (region) => {
    setSelectedRegion(region)
  }

  const p = selectedRegion ? painData[selectedRegion] : null
  const col = p ? painColor(p.score) : '#fff'

  return (
    <section id="pain-chart">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow reveal">Know Before You Go</span>
          <h2 className="section-title reveal">Pain Chart</h2>
          <div className="divider reveal"></div>
          <p className="section-sub reveal">Click any body region to see the estimated pain level, description, and tips.</p>
        </div>
        
        <div className="pain-layout">
          <div className="pain-legend reveal">
            <h4>Pain Scale</h4>
            <div className="pl-item"><div className="pl-dot" style={{background:'#4ade80'}}></div><span>1–3 · Barely noticeable</span></div>
            <div className="pl-item"><div className="pl-dot" style={{background:'#facc15'}}></div><span>4–5 · Mild discomfort</span></div>
            <div className="pl-item"><div className="pl-dot" style={{background:'#fb923c'}}></div><span>6–7 · Moderate pain</span></div>
            <div className="pl-item"><div className="pl-dot" style={{background:'#ef4444'}}></div><span>8–9 · Intense pain</span></div>
            <div className="pl-item"><div className="pl-dot" style={{background:'#7c3aed'}}></div><span>10 · Extreme pain</span></div>
          </div>
          
          <div className="body-container reveal">
            <svg viewBox="0 0 200 500" id="body-svg" xmlns="http://www.w3.org/2000/svg">
              {/* Head */}
              <ellipse className={`br ${selectedRegion === 'Head' ? 'sel' : ''}`} cx="100" cy="45" rx="32" ry="38" onClick={() => handleSelect('Head')} />
              {/* Neck */}
              <rect className={`br ${selectedRegion === 'Neck' ? 'sel' : ''}`} x="88" y="83" width="24" height="20" rx="5" onClick={() => handleSelect('Neck')} />
              {/* Chest */}
              <ellipse className={`br ${selectedRegion === 'Chest' ? 'sel' : ''}`} cx="100" cy="135" rx="45" ry="25" onClick={() => handleSelect('Chest')} />
              {/* Sternum */}
              <rect className={`br ${selectedRegion === 'Sternum' ? 'sel' : ''}`} x="92" y="110" width="16" height="40" rx="3" onClick={() => handleSelect('Sternum')} />
              {/* Ribs L */}
              <path className={`br ${selectedRegion === 'Ribs' ? 'sel' : ''}`} d="M55 125 Q42 148 44 175 Q50 185 68 180 Q72 155 72 130 Z" onClick={() => handleSelect('Ribs')} />
              {/* Ribs R */}
              <path className={`br ${selectedRegion === 'Ribs' ? 'sel' : ''}`} d="M145 125 Q158 148 156 175 Q150 185 132 180 Q128 155 128 130 Z" onClick={() => handleSelect('Ribs')} />
              {/* Stomach */}
              <ellipse className={`br ${selectedRegion === 'Stomach' ? 'sel' : ''}`} cx="100" cy="190" rx="38" ry="22" onClick={() => handleSelect('Stomach')} />
              
              {/* Upper Arm L & R */}
              <rect className={`br ${selectedRegion === 'Upper Arm' ? 'sel' : ''}`} x="28" y="110" width="25" height="60" rx="10" onClick={() => handleSelect('Upper Arm')} />
              <rect className={`br ${selectedRegion === 'Upper Arm' ? 'sel' : ''}`} x="147" y="110" width="25" height="60" rx="10" onClick={() => handleSelect('Upper Arm')} />
              
              {/* Forearm L & R */}
              <rect className={`br ${selectedRegion === 'Forearm' ? 'sel' : ''}`} x="30" y="202" width="22" height="65" rx="8" onClick={() => handleSelect('Forearm')} />
              <rect className={`br ${selectedRegion === 'Forearm' ? 'sel' : ''}`} x="148" y="202" width="22" height="65" rx="8" onClick={() => handleSelect('Forearm')} />
              
              {/* Hand L & R */}
              <ellipse className={`br ${selectedRegion === 'Hand' ? 'sel' : ''}`} cx="41" cy="302" rx="16" ry="20" onClick={() => handleSelect('Hand')} />
              <ellipse className={`br ${selectedRegion === 'Hand' ? 'sel' : ''}`} cx="159" cy="302" rx="16" ry="20" onClick={() => handleSelect('Hand')} />

              {/* Lower Back / Hip */}
              <path className={`br ${selectedRegion === 'Lower Back' ? 'sel' : ''}`} d="M62 210 Q62 230 100 235 Q138 230 138 210 Q120 200 100 198 Q80 200 62 210Z" onClick={() => handleSelect('Lower Back')} />
              
              {/* Thigh L & R */}
              <rect className={`br ${selectedRegion === 'Thigh' ? 'sel' : ''}`} x="62" y="267" width="36" height="80" rx="12" onClick={() => handleSelect('Thigh')} />
              <rect className={`br ${selectedRegion === 'Thigh' ? 'sel' : ''}`} x="102" y="267" width="36" height="80" rx="12" onClick={() => handleSelect('Thigh')} />
              
              {/* Calf L & R */}
              <ellipse className={`br ${selectedRegion === 'Calf' ? 'sel' : ''}`} cx="80" cy="422" rx="20" ry="28" onClick={() => handleSelect('Calf')} />
              <ellipse className={`br ${selectedRegion === 'Calf' ? 'sel' : ''}`} cx="120" cy="422" rx="20" ry="28" onClick={() => handleSelect('Calf')} />
              
              <line x1="100" y1="83" x2="100" y2="212" stroke="var(--text)" strokeWidth="0.3" opacity="0.12" strokeDasharray="3,4" style={{pointerEvents:'none'}} />
            </svg>
          </div>
          
          <div className="pain-panel reveal" style={{borderColor: p ? col : 'var(--border)'}}>
            {!p ? (
              <div className="pain-empty">← Click a body region<br/>to see pain details</div>
            ) : (
              <div id="pain-content">
                <div className="pain-region">{selectedRegion}</div>
                <div className="pain-meter">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className={`pain-meter-pip ${i < p.score ? 'on' : ''}`} style={{background: i < p.score ? col : 'var(--border)'}}></div>
                  ))}
                </div>
                <div className="pain-score" style={{color: col}}>{p.score}/10</div>
                <div className="pain-desc">{p.desc}</div>
                <div className="pain-tips-box"><strong>💡 Pro Tips:</strong><br/><span>{p.tips}</span></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
