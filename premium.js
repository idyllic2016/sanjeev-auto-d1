/* ═══════════════════════════════════════════════════
   SANJEEV AUTO — premium.js
   Enterprise Homepage Animations
   ═══════════════════════════════════════════════════ */

'use strict';

// ── GSAP setup ────────────────────────────────────
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  initGSAP();
}

function initGSAP() {

  // ── Hero entrance ──────────────────────────────
  const heroTl = gsap.timeline({ delay: .2 });

  // Badge
  heroTl.fromTo('.p-hero-badge',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: .8, ease: 'power3.out' }
  );

  // Headline lines (manual split)
  document.querySelectorAll('.p-hero-h1 .line span').forEach((span, i) => {
    heroTl.fromTo(span,
      { y: '110%' },
      { y: '0%', duration: 1, ease: 'power4.out' },
      i === 0 ? '-=.5' : '-=.7'
    );
  });

  heroTl.fromTo('.p-hero-sub',
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: .8, ease: 'power3.out' },
    '-=.5'
  );

  heroTl.fromTo('.p-hero-actions',
    { opacity: 0, y: 14 },
    { opacity: 1, y: 0, duration: .7, ease: 'power3.out' },
    '-=.5'
  );

  heroTl.fromTo('.p-hstat',
    { opacity: 0, y: 24, scale: .95 },
    { opacity: 1, y: 0, scale: 1, duration: .7, stagger: .1, ease: 'power3.out' },
    '-=.5'
  );

  heroTl.fromTo('.p-hero-certs',
    { opacity: 0 },
    { opacity: 1, duration: .6 },
    '-=.3'
  );

  heroTl.fromTo('.p-scroll-cue',
    { opacity: 0 },
    { opacity: 1, duration: .6 },
    '-=.3'
  );

  // ── Section reveals ────────────────────────────
  // Ecosystem
  gsap.fromTo('.p-eco-content > *', {
    opacity: 0, y: 40
  }, {
    opacity: 1, y: 0,
    duration: .9, stagger: .12, ease: 'power3.out',
    scrollTrigger: {
      trigger: '.p-eco',
      start: 'top 70%'
    }
  });

  gsap.fromTo('.p-eco-canvas-wrap', {
    opacity: 0, scale: .9
  }, {
    opacity: 1, scale: 1,
    duration: 1.2, ease: 'power3.out',
    scrollTrigger: {
      trigger: '.p-eco',
      start: 'top 60%'
    }
  });

  // Built for Motion
  gsap.fromTo('.p-motion-header > *', {
    opacity: 0, y: 30
  }, {
    opacity: 1, y: 0,
    duration: .9, stagger: .15, ease: 'power3.out',
    scrollTrigger: { trigger: '.p-motion', start: 'top 70%' }
  });

  gsap.fromTo('.p-motion-card', {
    opacity: 0, y: 50, scale: .96
  }, {
    opacity: 1, y: 0, scale: 1,
    duration: .8, stagger: .12, ease: 'power3.out',
    scrollTrigger: { trigger: '.p-motion-track', start: 'top 80%' }
  });

  // Intelligence
  gsap.fromTo('.p-intel-header > *', {
    opacity: 0, y: 30
  }, {
    opacity: 1, y: 0,
    duration: .9, stagger: .15, ease: 'power3.out',
    scrollTrigger: { trigger: '.p-intel', start: 'top 70%' }
  });

  gsap.fromTo('.p-intel-tile', {
    opacity: 0, y: 40
  }, {
    opacity: 1, y: 0,
    duration: .7, stagger: .08, ease: 'power3.out',
    scrollTrigger: { trigger: '.p-intel-grid', start: 'top 75%' }
  });

  // Global Footprint
  gsap.fromTo('.p-globe-left > *', {
    opacity: 0, x: -30
  }, {
    opacity: 1, x: 0,
    duration: .9, stagger: .12, ease: 'power3.out',
    scrollTrigger: { trigger: '.p-globe', start: 'top 70%' }
  });

  gsap.fromTo('.p-globe-canvas-wrap', {
    opacity: 0, x: 30
  }, {
    opacity: 1, x: 0,
    duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.p-globe', start: 'top 65%' }
  });

  // Plants
  gsap.fromTo('.p-plants-header > *', {
    opacity: 0, y: 30
  }, {
    opacity: 1, y: 0,
    duration: .9, stagger: .12, ease: 'power3.out',
    scrollTrigger: { trigger: '.p-plants', start: 'top 75%' }
  });

  // Capabilities
  const capCards = document.querySelectorAll('.p-cap-card');
  const capObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const i = [...capCards].indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        capObs.unobserve(entry.target);
      }
    });
  }, { threshold: .1 });
  capCards.forEach(c => capObs.observe(c));

  // Numbers
  gsap.fromTo('.p-num-item', {
    opacity: 0, y: 30
  }, {
    opacity: 1, y: 0,
    duration: .8, stagger: .1, ease: 'power3.out',
    scrollTrigger: { trigger: '.p-numbers-grid', start: 'top 75%' }
  });

  // Insights
  gsap.fromTo('.p-insight-card', {
    opacity: 0, y: 40
  }, {
    opacity: 1, y: 0,
    duration: .8, stagger: .12, ease: 'power3.out',
    scrollTrigger: { trigger: '.p-insights-bento', start: 'top 75%' }
  });

  // Careers
  gsap.fromTo('.p-careers-content > *', {
    opacity: 0, y: 40
  }, {
    opacity: 1, y: 0,
    duration: .9, stagger: .15, ease: 'power3.out',
    scrollTrigger: { trigger: '.p-careers', start: 'top 70%' }
  });

  // Hero parallax
  gsap.to('.p-hero-bg', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.p-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}

// ── Animated counters ─────────────────────────────
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1600;
  const startTime = performance.now();
  const isFloat = String(target).includes('.');

  function update(now) {
    const p = Math.min((now - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 4);
    const val = start + (target - start) * ease;
    el.textContent = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
    if (p < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(update);
}

// Observe eco stats and numbers
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const raw = el.dataset.target || '';
    const suffix = el.dataset.suffix || '';
    const target = parseFloat(raw.replace(/[^\d.]/g, ''));
    if (!isNaN(target)) animateCounter(el, target, suffix);
    counterObs.unobserve(el);
  });
}, { threshold: .4 });

document.querySelectorAll('[data-counter]').forEach(el => counterObs.observe(el));

// ── Ecosystem Network Canvas ──────────────────────
function initEcoCanvas() {
  const canvas = document.getElementById('ecoCanvas');
  if (!canvas) return;

  let W = canvas.offsetWidth;
  let H = canvas.offsetHeight;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const CX = W / 2, CY = H / 2;
  const R  = Math.min(W, H) * .36;

  const nodes = [
    { label: '5 Plants',       sub: 'IATF Certified',  angle: -90 },
    { label: '1,000+',          sub: 'Components',       angle: -34 },
    { label: '20+ OEMs',        sub: 'Global Partners',  angle:  22 },
    { label: '15+ Countries',   sub: 'Global Exports',   angle:  78 },
    { label: '3,500+',          sub: 'Employees',        angle: 134 },
    { label: '45+ Years',       sub: 'Since 1978',       angle: 190 },
    { label: 'IATF / ISO',      sub: 'Certifications',   angle: 246 },
    { label: 'Industry 4.0',    sub: 'Smart Factory',    angle: 302 },
  ];

  function rad(deg) { return deg * Math.PI / 180; }

  let t = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    nodes.forEach((node, i) => {
      const nx = CX + R * Math.cos(rad(node.angle));
      const ny = CY + R * Math.sin(rad(node.angle));

      // Animated dashed line
      const dashOffset = -(t * 0.5 + i * 20) % 30;
      const grad = ctx.createLinearGradient(CX, CY, nx, ny);
      grad.addColorStop(0, 'rgba(10,245,245,0.5)');
      grad.addColorStop(1, 'rgba(10,245,245,0.05)');

      ctx.setLineDash([6, 6]);
      ctx.lineDashOffset = dashOffset;
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(CX, CY);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      // Node pulse
      const pulse = .5 + .5 * Math.sin(t * 0.03 + i * 0.8);

      // Outer ring
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(nx, ny, 26 + pulse * 6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(10,245,245,${0.03 * pulse})`;
      ctx.fill();

      // Inner circle
      ctx.beginPath();
      ctx.arc(nx, ny, 24, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(8,12,24,0.9)';
      ctx.fill();
      ctx.strokeStyle = `rgba(10,245,245,${0.3 + 0.3 * pulse})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Label
      ctx.font = '700 11px Inter, sans-serif';
      ctx.fillStyle = `rgba(240,244,255,${0.7 + 0.3 * pulse})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, nx, ny - 3);

      ctx.font = '500 9px Inter, sans-serif';
      ctx.fillStyle = 'rgba(240,244,255,0.35)';
      ctx.fillText(node.sub, nx, ny + 9);
    });

    // Center node
    const cp = .5 + .5 * Math.sin(t * 0.02);
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(CX, CY, 44 + cp * 8, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(10,245,245,${0.04 * cp})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(CX, CY, 38, 0, Math.PI * 2);
    const cg = ctx.createRadialGradient(CX, CY, 0, CX, CY, 38);
    cg.addColorStop(0, 'rgba(10,245,245,0.18)');
    cg.addColorStop(1, 'rgba(13,27,62,0.85)');
    ctx.fillStyle = cg;
    ctx.fill();
    ctx.strokeStyle = 'rgba(10,245,245,0.6)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    t++;
    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener('resize', () => {
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;
  });
}

// ── Global Footprint Canvas ───────────────────────
function initGlobeCanvas() {
  const canvas = document.getElementById('globeCanvas');
  if (!canvas) return;

  let W = canvas.offsetWidth;
  let H = canvas.offsetHeight;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // lon/lat to canvas x/y
  function project(lon, lat) {
    return {
      x: ((lon + 180) / 360) * W,
      y: ((90 - lat) / 180) * H
    };
  }

  // Key locations: [lon, lat, name]
  const origin  = [75.5, 19.9]; // Aurangabad
  const exports = [
    [-95, 38, 'USA'],
    [10, 51, 'Germany'],
    [138, 36, 'Japan'],
    [-0.1, 51.5, 'UK'],
    [103, 1.3, 'Singapore'],
    [-51, -10, 'Brazil'],
    [144, -38, 'Australia'],
    [104, 35, 'China'],
    [2.35, 48.8, 'France'],
    [28, -26, 'S.Africa'],
  ];

  const O = project(origin[0], origin[1]);

  let t = 0;

  // Draw a subtle dot grid world map
  function drawDotGrid() {
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    for (let lon = -180; lon <= 180; lon += 8) {
      for (let lat = -90; lat <= 90; lat += 8) {
        const p = project(lon, lat);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function drawCurvedLine(from, to, progress) {
    const mx = (from.x + to.x) / 2;
    const my = (from.y + to.y) / 2 - Math.abs(to.x - from.x) * .2;

    // Full path (clipped)
    ctx.save();
    ctx.beginPath();
    const cp = Math.min(progress, 1);

    // Quadratic bezier with clipping trick
    // We approximate the progress by drawing the full path but using clip
    const totalLen = ctx.canvas.width; // approx
    ctx.setLineDash([totalLen * cp, totalLen * (1 - cp)]);
    ctx.lineDashOffset = 0;

    const grad = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
    grad.addColorStop(0, 'rgba(10,245,245,0.8)');
    grad.addColorStop(1, 'rgba(126,232,74,0.8)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.quadraticCurveTo(mx, my, to.x, to.y);
    ctx.stroke();
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    drawDotGrid();

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = .5;
    ctx.setLineDash([]);
    for (let lon = -180; lon <= 180; lon += 30) {
      const p1 = project(lon, -90);
      const p2 = project(lon, 90);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
    for (let lat = -90; lat <= 90; lat += 30) {
      const p1 = project(-180, lat);
      const p2 = project(180, lat);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }

    // Animated export lines
    exports.forEach((loc, i) => {
      const dest = project(loc[0], loc[1]);
      const lineProgress = Math.min((t - i * 30) / 120, 1);
      if (lineProgress > 0) {
        drawCurvedLine(O, dest, lineProgress);
      }
    });

    // Destination dots
    exports.forEach((loc, i) => {
      const dest = project(loc[0], loc[1]);
      const dotAge = t - i * 30;
      if (dotAge < 0) return;

      const pulse = .5 + .5 * Math.sin(t * 0.05 + i);

      // Pulse ring
      ctx.beginPath();
      ctx.arc(dest.x, dest.y, 6 + pulse * 8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(10,245,245,${0.06 * pulse})`;
      ctx.fill();

      // Dot
      ctx.beginPath();
      ctx.arc(dest.x, dest.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#0af5f5';
      ctx.fill();

      // Label
      ctx.font = '600 9px Inter, sans-serif';
      ctx.fillStyle = 'rgba(240,244,255,0.7)';
      ctx.textAlign = 'center';
      ctx.fillText(loc[2], dest.x, dest.y - 10);
    });

    // Origin dot (India)
    const op = .5 + .5 * Math.sin(t * .04);
    ctx.beginPath();
    ctx.arc(O.x, O.y, 8 + op * 10, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(126,232,74,${.12 * op})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(O.x, O.y, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#7ee84a';
    ctx.fill();

    ctx.font = '700 9px Inter, sans-serif';
    ctx.fillStyle = 'rgba(240,244,255,0.9)';
    ctx.textAlign = 'center';
    ctx.fillText('INDIA', O.x, O.y - 13);

    t++;
    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener('resize', () => {
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;
  });
}

// ── Industry cards drag scroll (Built for Motion) ─
function initMotionScroll() {
  const viewport = document.querySelector('.p-motion-viewport');
  const track    = document.getElementById('motionTrack');
  if (!viewport || !track) return;

  let isDrag = false, startX = 0, scrollL = 0;

  viewport.addEventListener('mousedown', e => {
    isDrag = true;
    startX = e.pageX - viewport.offsetLeft;
    scrollL = viewport.scrollLeft;
    viewport.classList.add('dragging');
  });
  document.addEventListener('mouseup', () => {
    isDrag = false;
    viewport.classList.remove('dragging');
  });
  document.addEventListener('mousemove', e => {
    if (!isDrag) return;
    e.preventDefault();
    const dx = e.pageX - viewport.offsetLeft - startX;
    viewport.scrollLeft = scrollL - dx;
  });

  let tX = 0;
  viewport.addEventListener('touchstart', e => { tX = e.touches[0].pageX; }, { passive: true });
  viewport.addEventListener('touchmove', e => {
    const dx = tX - e.touches[0].pageX;
    viewport.scrollLeft += dx;
    tX = e.touches[0].pageX;
  }, { passive: true });
}

// ── Plants slider ──────────────────────────────────
function initPlantsSlider() {
  const viewport = document.querySelector('.p-plants-viewport');
  const track    = document.querySelector('.p-plants-track');
  const prev     = document.getElementById('pPlantPrev');
  const next     = document.getElementById('pPlantNext');
  if (!track) return;

  const CARD_W = track.querySelector('.p-plant-card')?.offsetWidth + 20 || 480;
  let idx = 0;
  let offset = 0;
  const cards = [...track.querySelectorAll('.p-plant-card')];
  const total = cards.length;

  function go(i) {
    idx = Math.max(0, Math.min(i, total - 1));
    offset = idx * CARD_W;
    track.style.transform = `translateX(-${offset}px)`;
    cards.forEach((c, j) => c.classList.toggle('active', j === idx));
  }

  prev?.addEventListener('click', () => go(idx - 1));
  next?.addEventListener('click', () => go(idx + 1));

  // Drag
  let drag = false, dX = 0, dOff = 0;
  if (viewport) {
    viewport.addEventListener('mousedown', e => {
      drag = true; dX = e.pageX; dOff = offset;
      track.style.transition = 'none';
      viewport.classList.add('grabbing');
    });
    document.addEventListener('mouseup', () => {
      if (!drag) return;
      drag = false;
      viewport.classList.remove('grabbing');
      track.style.transition = '';
      go(Math.round(offset / CARD_W));
    });
    document.addEventListener('mousemove', e => {
      if (!drag) return;
      e.preventDefault();
      offset = Math.max(0, Math.min(dOff + (dX - e.pageX), (total - 1) * CARD_W));
      track.style.transform = `translateX(-${offset}px)`;
    });

    let tx = 0, tOff2 = 0;
    viewport.addEventListener('touchstart', e => {
      tx = e.touches[0].pageX; tOff2 = offset;
      track.style.transition = 'none';
    }, { passive: true });
    viewport.addEventListener('touchmove', e => {
      offset = Math.max(0, Math.min(tOff2 + (tx - e.touches[0].pageX), (total - 1) * CARD_W));
      track.style.transform = `translateX(-${offset}px)`;
    }, { passive: true });
    viewport.addEventListener('touchend', () => {
      track.style.transition = '';
      go(Math.round(offset / CARD_W));
    });
  }

  go(0);
}

// ── Init all ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initEcoCanvas();
  initGlobeCanvas();
  initMotionScroll();
  initPlantsSlider();
});
