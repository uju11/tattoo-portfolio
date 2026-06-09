import React, { useState } from 'react'

export default function CostEstimator() {
  const [size, setSize] = useState({ base: 150, time: 1, label: 'Small (1–3")' })
  const [style, setStyle] = useState({ mult: 1.0, label: 'Blackwork' })
  const [placement, setPlacement] = useState({ mult: 1.0, label: 'Standard' })
  const [color, setColor] = useState({ mult: 1.0, label: 'Black & Grey' })
  const [touch, setTouch] = useState({ add: 0, label: 'Not needed' })

  const total = Math.round(size.base * style.mult * placement.mult * color.mult) + touch.add
  const timeStr = size.time < 1 ? 'Under 1 hour' : size.time === 1 ? 'Approx. 1 hour' : `Approx. ${size.time} hours`

  return (
    <section id="cost-estimator">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow reveal">Transparent Pricing</span>
          <h2 className="section-title reveal">Cost Estimator</h2>
          <div className="divider reveal"></div>
          <p className="section-sub reveal">Get an instant ballpark estimate. Final pricing confirmed during consultation.</p>
        </div>
        <div className="estimator-grid">
          <div className="estimator-form">
            <div className="form-group">
              <label>Tattoo Size</label>
              <div className="chips">
                <button className={`chip ${size.base === 150 ? 'sel' : ''}`} onClick={() => setSize({base:150, time:1, label:'Small (1–3")'})}>Small (1–3")</button>
                <button className={`chip ${size.base === 350 ? 'sel' : ''}`} onClick={() => setSize({base:350, time:2.5, label:'Medium (3–6")'})}>Medium (3–6")</button>
                <button className={`chip ${size.base === 700 ? 'sel' : ''}`} onClick={() => setSize({base:700, time:5, label:'Large (6–10")'})}>Large (6–10")</button>
                <button className={`chip ${size.base === 2000 ? 'sel' : ''}`} onClick={() => setSize({base:2000, time:15, label:'Full Sleeve'})}>Full Sleeve</button>
              </div>
            </div>
            
            <div className="form-group">
              <label>Style</label>
              <div className="chips">
                <button className={`chip ${style.label === 'Blackwork' ? 'sel' : ''}`} onClick={() => setStyle({mult:1.0, label:'Blackwork'})}>Blackwork</button>
                <button className={`chip ${style.label === 'Fine Line' ? 'sel' : ''}`} onClick={() => setStyle({mult:1.15, label:'Fine Line'})}>Fine Line</button>
                <button className={`chip ${style.label === 'Japanese' ? 'sel' : ''}`} onClick={() => setStyle({mult:1.2, label:'Japanese'})}>Japanese</button>
                <button className={`chip ${style.label === 'Realism' ? 'sel' : ''}`} onClick={() => setStyle({mult:1.5, label:'Realism'})}>Realism</button>
              </div>
            </div>

            <div className="form-group">
              <label>Placement</label>
              <div className="chips">
                <button className={`chip ${placement.label === 'Standard' ? 'sel' : ''}`} onClick={() => setPlacement({mult:1.0, label:'Standard'})}>Standard</button>
                <button className={`chip ${placement.label === 'Complex' ? 'sel' : ''}`} onClick={() => setPlacement({mult:1.25, label:'Complex'})}>Complex (Ribs, Neck)</button>
                <button className={`chip ${placement.label === 'Extreme' ? 'sel' : ''}`} onClick={() => setPlacement({mult:1.4, label:'Extreme'})}>Extreme (Face, Hands)</button>
              </div>
            </div>

            <div className="form-group">
              <label>Color Option</label>
              <div className="chips">
                <button className={`chip ${color.label === 'Black & Grey' ? 'sel' : ''}`} onClick={() => setColor({mult:1.0, label:'Black & Grey'})}>Black & Grey</button>
                <button className={`chip ${color.label === 'Full Color' ? 'sel' : ''}`} onClick={() => setColor({mult:1.3, label:'Full Color'})}>Full Color</button>
              </div>
            </div>

            <div className="form-group">
              <label>Touch-up Session</label>
              <div className="chips">
                <button className={`chip ${touch.add === 0 ? 'sel' : ''}`} onClick={() => setTouch({add:0, label:'Not needed'})}>Not needed</button>
                <button className={`chip ${touch.add === 100 ? 'sel' : ''}`} onClick={() => setTouch({add:100, label:'+$100'})}>Include 1 touch-up (+$100)</button>
              </div>
            </div>
          </div>
          
          <div className="estimator-result reveal">
            <p className="res-label">Estimated Investment</p>
            <div className="res-price">${total.toLocaleString()}</div>
            <p className="res-time">{timeStr}</p>
            <div className="breakdown">
              <div className="bd-row"><span>Base price</span><span>${size.base.toLocaleString()}</span></div>
              <div className="bd-row"><span>Style</span><span>×{style.mult.toFixed(2)} {style.label}</span></div>
              <div className="bd-row"><span>Placement</span><span>{placement.label}</span></div>
              <div className="bd-row"><span>Color</span><span>{color.label}</span></div>
              <div className="bd-row"><span>Touch-up</span><span>{touch.add > 0 ? `+$${touch.add}` : '—'}</span></div>
              <div className="bd-row total"><span>Total Estimate</span><span>${total.toLocaleString()}</span></div>
            </div>
            <p className="disclaimer">* Rough estimate only. Final pricing depends on complexity.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
