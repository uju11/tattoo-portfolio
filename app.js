/* ============================================================
   app.js — Ink Majesty Studio
============================================================ */
gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("ink", "M0,0 C0.19,1 0.22,1 1,1");

/* ============================================================
   INK BLEED INTRO
============================================================ */
const introTL = gsap.timeline({
  onComplete: () => {
    document.getElementById('ink-bleed').style.display = 'none';
    initScrollAnimations();
    animateHeroIn();
  }
});

introTL
  .to('#bleed-logo',  { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 })
  .to('#bleed-tag',   { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
  .to('#ic1', { opacity: 0.65, scale: 1.6, duration: 0.6, ease: 'power2.out' }, '-=0.2')
  .to('#ic2', { opacity: 0.4,  scale: 2.2, duration: 0.8, ease: 'power2.out' }, '-=0.5')
  .to('#ic3', { opacity: 0.18, scale: 2.0, duration: 1,   ease: 'power2.out' }, '-=0.6')
  .to('#ink-bleed', {
    clipPath: 'circle(0% at 50% 50%)',
    duration: 1.2,
    ease: 'power4.inOut',
    delay: 0.5
  });

function animateHeroIn() {
  gsap.fromTo('.hero-eyebrow', { opacity:0, y:20 }, { opacity:1, y:0, duration:.8, ease:'ink' });
  gsap.fromTo('.hero-title',   { opacity:0, y:30 }, { opacity:1, y:0, duration:1,  ease:'ink', delay:.15 });
  gsap.fromTo('.hero-subtitle',{ opacity:0, y:20 }, { opacity:1, y:0, duration:.8, ease:'ink', delay:.3 });
  gsap.fromTo('#hero-cta',     { opacity:0, y:20 }, { opacity:1, y:0, duration:.8, ease:'ink', delay:.45 });
  gsap.fromTo('#scroll-hint',  { opacity:0 },       { opacity:1, duration:.8, delay:.7 });
}

/* ============================================================
   CUSTOM CURSOR + INK TRAIL
============================================================ */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
const TRAIL = 20;
const trail = [];

for (let i = 0; i < TRAIL; i++) {
  const el = document.createElement('div');
  el.className = 'ink-trail';
  el.style.cssText = `width:${Math.max(1, 7-i*.3)}px;height:${Math.max(1,7-i*.3)}px;opacity:0`;
  document.body.appendChild(el);
  trail.push({ el, x: 0, y: 0 });
}

let mx = 0, my = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  gsap.set(dot,  { x: mx, y: my });
  gsap.to(ring,  { x: mx, y: my, duration: .14, ease:'power2.out' });
});

(function animTrail() {
  for (let i = TRAIL - 1; i > 0; i--) {
    trail[i].x = trail[i-1].x;
    trail[i].y = trail[i-1].y;
  }
  trail[0].x = mx; trail[0].y = my;
  trail.forEach((t, i) => {
    const p  = (TRAIL - i) / TRAIL;
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    t.el.style.transform = `translate(${t.x}px,${t.y}px) translate(-50%,-50%)`;
    t.el.style.opacity = p * 0.45;
    t.el.style.background = accentColor;
    t.el.style.boxShadow = `0 0 ${4-i*.15}px ${accentColor}55`;
  });
  requestAnimationFrame(animTrail);
})();

// Cursor grow on interactive elements
document.querySelectorAll('a, button, .br, .chip, .skin-btn, .style-card, .p-card, .tbtn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(ring, { width: 58, height: 58, opacity: 1,  duration: .3 });
    gsap.to(dot,  { scale: 1.5, duration: .3 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(ring, { width: 36, height: 36, opacity: .6, duration: .3 });
    gsap.to(dot,  { scale: 1,  duration: .3 });
  });
});

/* ============================================================
   MAGNETIC BUTTONS
============================================================ */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top  - r.height/2;
    gsap.to(btn, { x: x*.3, y: y*.3, duration:.3, ease:'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration:.5, ease:'elastic.out(1,.5)' });
  });
});

/* ============================================================
   NAV SCROLL
============================================================ */
window.addEventListener('scroll', () => {
  document.getElementById('main-nav').classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior:'smooth' }); }
  });
});

/* ============================================================
   THEME SWITCHER
============================================================ */
document.querySelectorAll('.tbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', btn.dataset.t);
    document.querySelectorAll('.tbtn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Ink splash ripple
    const splash = document.createElement('div');
    Object.assign(splash.style, {
      position:'fixed', top:'50%', left:'50%',
      width:'10px', height:'10px',
      background: getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(),
      borderRadius:'50%', zIndex:'9000',
      pointerEvents:'none', transform:'translate(-50%,-50%)'
    });
    document.body.appendChild(splash);
    gsap.to(splash, { scale:280, opacity:0, duration:.9, ease:'power2.out', onComplete:()=>splash.remove() });
  });
});

/* ============================================================
   SCROLL ANIMATIONS
============================================================ */
function initScrollAnimations() {
  // Generic reveals
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.fromTo(el, { opacity:0, y:50 }, {
      opacity:1, y:0, duration:1, ease:'ink',
      scrollTrigger: { trigger:el, start:'top 86%', once:true },
      delay: (i % 4) * 0.08
    });
  });

  // Portfolio stagger
  gsap.fromTo('.p-card', { opacity:0, y:60, scale:.96 }, {
    opacity:1, y:0, scale:1, duration:.8, stagger:.12, ease:'power3.out',
    scrollTrigger: { trigger:'.portfolio-grid', start:'top 80%', once:true }
  });

  // Style cards stagger
  gsap.fromTo('.style-card', { opacity:0, y:40 }, {
    opacity:1, y:0, duration:.6, stagger:.09, ease:'power3.out',
    scrollTrigger: { trigger:'.styles-grid', start:'top 80%', once:true }
  });

  // SVG path draw
  gsap.utils.toArray('.svg-border-top path').forEach(path => {
    const len = path.getTotalLength ? path.getTotalLength() : 1000;
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(path, {
      strokeDashoffset: 0, duration: 2, ease:'power2.out',
      scrollTrigger: { trigger: path.closest('section'), start:'top 90%', once:true }
    });
  });

  // Counters
  gsap.utils.toArray('[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    ScrollTrigger.create({
      trigger: el, start:'top 85%', once:true,
      onEnter() {
        gsap.to({ val:0 }, {
          val: target, duration:2.5, ease:'power2.out',
          onUpdate() { el.textContent = Math.round(this.targets()[0].val).toLocaleString() + (target >= 1000 ? '+' : ''); }
        });
      }
    });
  });

  // Hero parallax
  gsap.to('.hero-texture', {
    y: -100, ease:'none',
    scrollTrigger: { trigger:'#hero', start:'top top', end:'bottom top', scrub:true }
  });

  // Ink grid stagger on scroll
  ScrollTrigger.create({
    trigger:'#ink-grid', start:'top 85%', once:true,
    onEnter: () => animateInkCards()
  });
}

/* ============================================================
   HERO CANVAS — PARTICLES
============================================================ */
const canvas = document.getElementById('hero-canvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(true); }
  reset(init = false) {
    this.x = Math.random() * canvas.width;
    this.y = init ? Math.random() * canvas.height : canvas.height + 10;
    this.r = Math.random() * 1.8 + 0.4;
    this.vx = (Math.random() - .5) * 0.25;
    this.vy = -Math.random() * 0.35 - 0.1;
    this.a  = Math.random() * 0.6 + 0.1;
    this.da = Math.random() * 0.003 + 0.001;
  }
  update() { this.x += this.vx; this.y += this.vy; this.a -= this.da; if (this.a <= 0 || this.y < -10) this.reset(); }
  draw() {
    const c = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
    ctx.fillStyle = c.startsWith('#')
      ? c + Math.round(this.a*255).toString(16).padStart(2,'0')
      : `rgba(196,30,58,${this.a})`;
    ctx.fill();
  }
}

const particles = Array.from({ length: 55 }, () => new Particle());
(function animP() { ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p=>{p.update();p.draw()}); requestAnimationFrame(animP); })();

/* ============================================================
   PAIN CHART
============================================================ */
const painPanel   = document.getElementById('pain-panel');
const painEmpty   = document.getElementById('pain-empty');
const painContent = document.getElementById('pain-content');
let selectedBR    = null;

function painColor(n) {
  if (n <= 3) return '#4ade80';
  if (n <= 5) return '#facc15';
  if (n <= 7) return '#fb923c';
  if (n <= 9) return '#ef4444';
  return '#7c3aed';
}
function painLabel(n) {
  if (n <= 3) return `${n}/10 — Low Pain`;
  if (n <= 5) return `${n}/10 — Moderate`;
  if (n <= 7) return `${n}/10 — Elevated`;
  if (n <= 9) return `${n}/10 — Very Intense`;
  return `${n}/10 — Extreme`;
}

document.querySelectorAll('.br').forEach(r => {
  r.addEventListener('click', () => {
    if (selectedBR) selectedBR.classList.remove('sel');
    r.classList.add('sel');
    selectedBR = r;

    const pain = parseInt(r.dataset.pain);
    const col  = painColor(pain);

    painEmpty.style.display = 'none';
    painContent.style.display = 'block';

    document.getElementById('pain-region').textContent = r.dataset.region;
    document.getElementById('pain-score').textContent  = painLabel(pain);
    document.getElementById('pain-score').style.color  = col;
    document.getElementById('pain-desc').textContent   = r.dataset.desc;
    document.getElementById('pain-tips').textContent   = r.dataset.tips;

    // Meter
    const meter = document.getElementById('pain-meter');
    meter.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
      const pip = document.createElement('div');
      pip.className = 'pain-meter-pip' + (i <= pain ? ' on' : '');
      if (i <= pain) pip.style.background = col;
      meter.appendChild(pip);
      gsap.fromTo(pip, { scaleX:0 }, { scaleX:1, duration:.25, delay:i*.04, ease:'power2.out', transformOrigin:'left' });
    }

    gsap.fromTo(painContent, { opacity:0, x:15 }, { opacity:1, x:0, duration:.4, ease:'power2.out' });
    gsap.to(r, { attr:{'fill-opacity':.65}, duration:.2, yoyo:true, repeat:1 });
  });

  r.addEventListener('mouseenter', () => { if (r !== selectedBR) gsap.to(r, { attr:{'fill-opacity':.22}, duration:.2 }); });
  r.addEventListener('mouseleave', () => { if (r !== selectedBR) gsap.to(r, { attr:{'fill-opacity':.08}, duration:.2 }); });
});

/* ============================================================
   COST ESTIMATOR
============================================================ */
const est = { base:150, time:1, style:1, placement:1, color:1, touch:0, styleL:'Blackwork', placementL:'Standard', colorL:'Black & Grey' };

function calcEstimate() {
  const total = Math.round(est.base * est.style * est.placement * est.color) + est.touch;
  gsap.to({ n: parseFloat(document.getElementById('res-price').textContent.replace(/\D/g,'')) || 150 }, {
    n: total, duration:.5, ease:'power2.out',
    onUpdate() { document.getElementById('res-price').textContent = '$' + Math.round(this.targets()[0].n).toLocaleString(); }
  });
  const h = est.time;
  document.getElementById('res-time').textContent = h < 1 ? 'Under 1 hour' : h === 1 ? 'Approx. 1 hour' : `Approx. ${h} hours`;
  document.getElementById('bd-base').textContent      = '$' + est.base.toLocaleString();
  document.getElementById('bd-style').textContent     = `×${est.style.toFixed(2)} ${est.styleL}`;
  document.getElementById('bd-placement').textContent = est.placementL;
  document.getElementById('bd-color').textContent     = est.colorL;
  document.getElementById('bd-touch').textContent     = est.touch > 0 ? `+$${est.touch}` : '—';
  document.getElementById('bd-total').textContent     = '$' + total.toLocaleString();
}

document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const g = chip.dataset.g;
    document.querySelectorAll(`.chip[data-g="${g}"]`).forEach(c => c.classList.remove('sel'));
    chip.classList.add('sel');
    if (g === 'size')      { est.base = +chip.dataset.base; est.time = +chip.dataset.time; }
    if (g === 'style')     { est.style = +chip.dataset.mult; est.styleL = chip.dataset.label; }
    if (g === 'placement') { est.placement = +chip.dataset.mult; est.placementL = chip.dataset.label; }
    if (g === 'color')     { est.color = +chip.dataset.mult; est.colorL = chip.dataset.label; }
    if (g === 'touch')     { est.touch = +chip.dataset.add; }
    calcEstimate();
    gsap.from(chip, { scale:.9, duration:.3, ease:'back.out(2)' });
  });
});

/* ============================================================
   SKIN TONE GUIDE
============================================================ */
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
];

const skinInfo = {
  I:   '<strong>Type I (Very Fair):</strong> All ink colors show excellently. Maximum contrast and vibrancy. Every color works beautifully — black, colour, and white all achieve stunning results.',
  II:  '<strong>Type II (Fair):</strong> Excellent canvas for all inks. Vibrant colors pop brilliantly. Light colors like yellow and white work well and may need slightly thicker application.',
  III: '<strong>Type III (Medium):</strong> Great for bold and dark inks. Bright colors remain vibrant but lighter shades (white, light pink, yellow) may need careful touch-ups over time.',
  IV:  '<strong>Type IV (Olive/Medium Dark):</strong> Dark inks show beautifully. Bold colors like red, blue, and green still pop well. Pastels and light colors will appear more muted.',
  V:   '<strong>Type V (Dark Brown):</strong> Black ink and dark saturated colors work best. Deep red, royal blue, and forest green are good choices. Pastels and white are not recommended.',
  VI:  '<strong>Type VI (Very Dark):</strong> Blackwork looks incredible — stunning contrast. Dark saturated colors can work with skilled technique. Light colors are generally not recommended.',
};

const skinIdx = ['I','II','III','IV','V','VI'];

function compatColor(n) {
  if (n >= 4) return '#4ade80'; if (n >= 3) return '#facc15'; if (n >= 2) return '#fb923c'; return '#ef4444';
}
function compatLabel(n) {
  return n >= 4 ? 'Excellent' : n >= 3 ? 'Good' : n >= 2 ? 'Limited' : 'Not Recommended';
}

function renderInkGrid(skinType) {
  const si = skinIdx.indexOf(skinType);
  document.getElementById('ink-grid').innerHTML = inkColors.map(c => {
    const score = c.compat[si];
    const cc = compatColor(score);
    const pips = [1,2,3,4,5].map(p => `<div class="compat-pip" style="background:${p<=score?cc:'var(--border)'}"></div>`).join('');
    return `<div class="ink-card">
      <div class="ink-swatch" style="background:${c.hex}"></div>
      <div class="ink-name">${c.name}</div>
      <div class="ink-compat">${pips}</div>
      <div class="ink-compat-label" style="color:${cc}">${compatLabel(score)}</div>
    </div>`;
  }).join('');
}

function animateInkCards() {
  gsap.fromTo('.ink-card', { opacity:0, y:20 }, { opacity:1, y:0, stagger:.05, duration:.4, ease:'power2.out' });
}

renderInkGrid('I');

document.querySelectorAll('.skin-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.skin-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const t = btn.dataset.skin;
    document.getElementById('skin-result').innerHTML = skinInfo[t];
    renderInkGrid(t);
    animateInkCards();
    gsap.from('#skin-result', { opacity:0, y:10, duration:.4, ease:'power2.out' });
  });
});
