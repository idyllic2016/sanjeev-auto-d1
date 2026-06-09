/* ═══════════════════════════════════════════════════
   SANJEEV AUTO — premium.js
   Homepage animations: hero entrance, reveals,
   plants slider, navbar scroll, counters
   ═══════════════════════════════════════════════════ */

'use strict';

// ─── Helpers ─────────────────────────────────────
const q  = (s, c = document) => c.querySelector(s);
const qq = (s, c = document) => [...c.querySelectorAll(s)];

// ─── Navbar: transparent → solid on scroll ───────
(function initNavScroll() {
  const nav = q('#navbar');
  if (!nav) return;

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('nav-scrolled', window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ─── Hero entrance animation ─────────────────────
(function initHeroEntrance() {
  const lines = qq('.sa-hero-h1 .line .inner');
  const eyebrow = q('.sa-hero .sa-eyebrow');
  const sub    = q('.sa-hero-sub');
  const actions = q('.sa-hero-actions');
  const stats   = qq('.sa-hstat');
  const bottom  = q('.sa-hero-bottom');

  // Animate without GSAP (CSS-based, runs even if GSAP fails to load)
  function runEntrance() {
    const ease = 'cubic-bezier(.22,1,.36,1)';
    const base = 'opacity 0.7s ' + ease + ', transform 0.7s ' + ease;

    if (eyebrow) {
      eyebrow.style.opacity = '0';
      eyebrow.style.transform = 'translateY(16px)';
      eyebrow.style.transition = base;
      setTimeout(() => { eyebrow.style.opacity = '1'; eyebrow.style.transform = 'none'; }, 100);
    }

    lines.forEach((el, i) => {
      el.style.transition = base;
      setTimeout(() => { el.style.transform = 'translateY(0)'; el.style.opacity = '1'; }, 200 + i * 120);
    });

    [sub, actions].forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = base;
      setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none'; }, 640 + i * 120);
    });

    stats.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(24px)';
      el.style.transition = base;
      setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none'; }, 500 + i * 100);
    });

    if (bottom) {
      bottom.style.opacity = '0';
      bottom.style.transition = 'opacity 1s ' + ease;
      setTimeout(() => { bottom.style.opacity = '1'; }, 1100);
    }
  }

  // Run after page renders
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runEntrance);
  } else {
    setTimeout(runEntrance, 50);
  }
})();

// ─── Scroll Reveal (sa-reveal elements) ──────────
(function initReveal() {
  const els = qq('.sa-reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.style.getPropertyValue('--sd') || '0s';
        setTimeout(() => el.classList.add('in'), parseFloat(delay) * 1000);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  els.forEach(el => obs.observe(el));
})();

// ─── Counter animation (sa-num-val) ──────────────
(function initCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      if (isNaN(target)) return;
      obs.unobserve(el);

      const duration = target >= 100 ? 2200 : 1600;
      const start = performance.now();

      (function step(now) {
        const p    = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(target * ease);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target;
      })(start);
    });
  }, { threshold: 0.4 });

  qq('.sa-num-val[data-target]').forEach(el => obs.observe(el));
})();

// ─── Plants horizontal drag-slider ───────────────
(function initPlantsSlider() {
  const viewport = q('#saPlantsViewport');
  const track    = q('#saPlantsTrack');
  const prevBtn  = q('#saPlantPrev');
  const nextBtn  = q('#saPlantNext');
  if (!viewport || !track) return;

  const cards = qq('.sa-plant-card', track);
  const total = cards.length;
  let idx = 0;

  // Compute card width dynamically (card + gap)
  function cardW() {
    const card = cards[0];
    if (!card) return 500;
    const gap = parseFloat(getComputedStyle(track).gap) || 20;
    return card.getBoundingClientRect().width + gap;
  }

  function goTo(i) {
    idx = Math.max(0, Math.min(i, total - 1));
    track.style.transform = `translateX(-${idx * cardW()}px)`;
    cards.forEach((c, j) => {
      c.style.opacity = j === idx ? '1' : '0.65';
      c.style.transform = j === idx ? 'scale(1.02)' : 'scale(1)';
    });
  }

  track.style.transition = 'transform .65s cubic-bezier(.22,1,.36,1)';
  cards.forEach(c => { c.style.transition = 'opacity .4s ease, transform .4s ease'; });
  goTo(0);

  prevBtn?.addEventListener('click', () => goTo(idx - 1));
  nextBtn?.addEventListener('click', () => goTo(idx + 1));

  // Drag support
  let dragging = false, startX = 0, startOffset = 0, currentOffset = 0;

  function dragStart(x) {
    dragging = true;
    startX = x;
    startOffset = idx * cardW();
    currentOffset = startOffset;
    track.style.transition = 'none';
    viewport.classList.add('grabbing');
  }
  function dragMove(x) {
    if (!dragging) return;
    const diff = startX - x;
    currentOffset = Math.max(0, Math.min(startOffset + diff, (total - 1) * cardW()));
    track.style.transform = `translateX(-${currentOffset}px)`;
  }
  function dragEnd() {
    if (!dragging) return;
    dragging = false;
    viewport.classList.remove('grabbing');
    track.style.transition = 'transform .65s cubic-bezier(.22,1,.36,1)';
    const snapped = Math.round(currentOffset / cardW());
    goTo(snapped);
  }

  viewport.addEventListener('mousedown',  e => dragStart(e.pageX));
  document.addEventListener('mousemove',  e => dragMove(e.pageX));
  document.addEventListener('mouseup',    dragEnd);
  viewport.addEventListener('touchstart', e => dragStart(e.touches[0].pageX), { passive: true });
  viewport.addEventListener('touchmove',  e => dragMove(e.touches[0].pageX),  { passive: true });
  viewport.addEventListener('touchend',   dragEnd);

  // Auto-advance
  let autoTimer = setInterval(() => goTo((idx + 1) % total), 4500);
  viewport.addEventListener('mouseenter', () => clearInterval(autoTimer));
  viewport.addEventListener('mouseleave', () => {
    autoTimer = setInterval(() => goTo((idx + 1) % total), 4500);
  });
})();

// ─── GSAP-powered section entrances (enhancement) ─
(function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Numbers section: stagger the value counters with a green glow pulse
  gsap.from('.sa-num-val', {
    scrollTrigger: { trigger: '.sa-numbers', start: 'top 70%' },
    scale: 0.7,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'back.out(1.4)'
  });

  // Hero photo parallax
  const heroBg = q('.sa-hero-photo');
  if (heroBg) {
    gsap.to(heroBg, {
      scrollTrigger: {
        trigger: '.sa-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: '20%',
      ease: 'none'
    });
  }

  // CTA section: slide-up
  gsap.from('.sa-cta-h2', {
    scrollTrigger: { trigger: '.sa-cta', start: 'top 65%' },
    y: 48,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  // Sector cards stagger entrance
  gsap.from('.sa-sector-card', {
    scrollTrigger: { trigger: '.sa-sectors-bento', start: 'top 70%' },
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power2.out'
  });
})();

// ─── Marquee: duplicate items if needed ──────────
(function initMarquee() {
  const track = q('#saMarqueeTrack');
  if (!track) return;

  // Ensure seamless loop by measuring track width
  const items = qq('.sa-marq-item', track);
  if (!items.length) return;

  // Speed: adjust animation duration based on content width
  const totalWidth = items.reduce((acc, el) => acc + el.offsetWidth, 0);
  const duration = Math.max(20, totalWidth / 80); // px per second = 80
  track.style.animationDuration = duration + 's';
})();
