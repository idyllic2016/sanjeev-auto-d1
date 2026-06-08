/* ═══════════════════════════════════════════════════
   SANJEEV AUTO — main.js
   ═══════════════════════════════════════════════════ */

'use strict';

// ─── Utilities ────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ─── Popup Contact Form ───────────────────────────
const overlay   = $('#popupOverlay');
const modal     = $('#popupModal');
const closeBtn  = $('#popupClose');
const popupForm = $('#popupForm');

function openPopup() {
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  // Focus first input after animation
  setTimeout(() => {
    const first = modal.querySelector('input');
    if (first) first.focus();
  }, 400);
}

function closePopup() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// All "Get In Touch" triggers — covers all ids starting with "openPopup"
$$('[id^="openPopup"]').forEach(btn => btn.addEventListener('click', openPopup));
closeBtn?.addEventListener('click', closePopup);

// Close on overlay click (not modal click)
overlay?.addEventListener('click', (e) => {
  if (e.target === overlay) closePopup();
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('active')) closePopup();
});

// Form submission
popupForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = popupForm.querySelector('.btn-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Simulate submission
  setTimeout(() => {
    const right = $('.popup-right');
    right.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:400px;text-align:center;padding:40px;">
        <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,var(--teal),var(--green));display:flex;align-items:center;justify-content:center;margin-bottom:20px;font-size:1.5rem;">✓</div>
        <h3 style="font-family:Manrope,sans-serif;font-size:1.4rem;font-weight:900;color:var(--text);margin-bottom:10px;">Inquiry Received!</h3>
        <p style="font-size:0.875rem;color:var(--text-3);line-height:1.7;max-width:320px;">Our engineering team will review your requirement and respond within 24 hours at the email address provided.</p>
        <button onclick="closePopup()" style="margin-top:24px;padding:11px 28px;background:var(--navy);color:#fff;border-radius:8px;font-family:Manrope,sans-serif;font-weight:700;font-size:0.875rem;cursor:pointer;border:none;transition:all 0.3s;">Close</button>
      </div>
    `;
  }, 1200);
});

// Expose closePopup for inline onclick
window.closePopup = closePopup;

// ─── Navbar ───────────────────────────────────────
const navbar  = $('#navbar');
const hamburger = $('#hamburger');
const navLinks = $('#navLinks');
let lastY = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('is-hidden', y > lastY && y > 300);
  lastY = y;
}, { passive: true });

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('nav-open');
  hamburger.classList.toggle('is-open');
  // Animate spans to X
  const spans = hamburger.querySelectorAll('span');
  if (hamburger.classList.contains('is-open')) {
    spans[0].style.cssText = 'transform:translateY(7px) rotate(45deg)';
    spans[1].style.cssText = 'opacity:0;transform:scaleX(0)';
    spans[2].style.cssText = 'transform:translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => s.style.cssText = '');
  }
});


// ─── Counter Animation ────────────────────────────
function animCount(el, target, duration = 1800) {
  const isFloat   = String(target).includes('.');
  const start     = performance.now();
  const initial   = parseFloat(el.textContent) || 0;

  function step(now) {
    const p   = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 4);
    const val  = initial + (target - initial) * ease;
    el.textContent = isFloat ? val.toFixed(1) : Math.round(val);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = isFloat ? target.toFixed(1) : target;
  }
  requestAnimationFrame(step);
}

// Hero counters — start on load
window.addEventListener('load', () => {
  $$('.hm-num[data-target]').forEach(el => {
    animCount(el, parseInt(el.dataset.target));
  });
});

// Section counters — start on IntersectionObserver
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animCount(el, parseFloat(el.dataset.target));
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });

$$('.counter[data-target]').forEach(el => counterObs.observe(el));

// ─── Scroll Reveal ────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

function initReveal() {
  $$('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));
}

document.addEventListener('DOMContentLoaded', initReveal);

// ─── Capabilities Drag Scroll ─────────────────────
const capWrap  = $('.cap-scroll-wrap');
const capScroll = $('#capScroll');
const capPrev  = $('#capPrev');
const capNext  = $('#capNext');

const CARD_W = 316; // card width + gap

capNext?.addEventListener('click', () => capWrap.scrollBy({ left: CARD_W, behavior: 'smooth' }));
capPrev?.addEventListener('click', () => capWrap.scrollBy({ left: -CARD_W, behavior: 'smooth' }));

if (capWrap) {
  let isDrag = false, startX = 0, scrollL = 0;

  capWrap.addEventListener('mousedown', e => {
    isDrag = true; startX = e.pageX - capWrap.offsetLeft; scrollL = capWrap.scrollLeft;
    capWrap.classList.add('grabbing');
  });
  document.addEventListener('mouseup', () => { isDrag = false; capWrap.classList.remove('grabbing'); });
  document.addEventListener('mousemove', e => {
    if (!isDrag) return;
    e.preventDefault();
    capWrap.scrollLeft = scrollL - (e.pageX - capWrap.offsetLeft - startX) * 1.4;
  });

  // Touch support
  let touchX = 0;
  capWrap.addEventListener('touchstart', e => { touchX = e.touches[0].pageX; }, { passive: true });
  capWrap.addEventListener('touchmove', e => {
    const dx = touchX - e.touches[0].pageX;
    capWrap.scrollLeft += dx;
    touchX = e.touches[0].pageX;
  }, { passive: true });
}

// ─── Smooth Card Tilt (desktop only) ─────────────
if (window.innerWidth > 900) {
  $$('.prod-card, .bento-card, .pitch-card, .fac-sm').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r   = card.getBoundingClientRect();
      const x   = ((e.clientX - r.left) / r.width  - 0.5) * 5;
      const y   = ((e.clientY - r.top)  / r.height - 0.5) * 5;
      card.style.transform = `translateY(-6px) perspective(600px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s var(--ease)';
      setTimeout(() => card.style.transition = '', 500);
    });
  });
}

// ─── Lazy load images with fade-in ───────────────
document.addEventListener('DOMContentLoaded', () => {
  const imgs = $$('img[loading="lazy"]');
  const imgObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';
        img.addEventListener('load', () => { img.style.opacity = '1'; }, { once: true });
        // If already loaded
        if (img.complete) img.style.opacity = '1';
        imgObs.unobserve(img);
      }
    });
  }, { threshold: 0.05 });
  imgs.forEach(img => imgObs.observe(img));
});

// ─── Active nav highlight on scroll ──────────────
const sections = $$('section[id]');
const navLinkEls = $$('.nav-link[href^="#"]');

const activeObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => activeObs.observe(s));

// ─── Video fallback ───────────────────────────────
const bgVideo = $('#heroBgVideo');
if (bgVideo) {
  const hideVideo = () => { bgVideo.style.display = 'none'; };
  bgVideo.addEventListener('error', hideVideo);

  // Disable video on mobile — static bg image shows instead
  if (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bgVideo.removeAttribute('autoplay');
    bgVideo.removeAttribute('src');
    bgVideo.querySelectorAll('source').forEach(s => s.removeAttribute('src'));
    bgVideo.load();
    hideVideo();
  }
}

// ─── Stagger section children ────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Add stagger delays to grid children
  $$('.bento-grid .bento-card, .products-showcase .prod-card, .pitch-grid .pitch-card').forEach((el, i) => {
    el.style.setProperty('--delay', `${i * 0.07}s`);
    el.classList.add('reveal');
  });

  // About stats stagger
  $$('.ast-card').forEach((el, i) => {
    el.style.setProperty('--delay', `${0.3 + i * 0.08}s`);
    el.classList.add('reveal');
  });

  // Inner page card stagger
  $$('.cert-grid .cert-card, .equip-grid .equip-card, .jobs-grid .job-card-new, .why-join-grid .wj-card, .benefits-list-grid .benefit-list-item').forEach((el, i) => {
    el.style.setProperty('--delay', `${i * 0.06}s`);
    el.classList.add('reveal');
  });

  // Facility cards stagger
  $$('.fac-full-grid .fac-full-card, .fac-sm').forEach((el, i) => {
    el.style.setProperty('--delay', `${i * 0.08}s`);
    el.classList.add('reveal');
  });

  // Re-observe all newly added reveal elements
  $$('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)').forEach(el => revealObs.observe(el));
});

// ─── Scroll To Top ───────────────────────────────
const scrollTopBtn = $('#scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── Active nav highlight by page ────────────────
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  $$('.nav-link').forEach(link => {
    const href = (link.getAttribute('href') || '').split('#')[0].split('/').pop();
    if (href === path) {
      link.classList.add('nav-link-active');
    } else {
      link.classList.remove('nav-link-active');
    }
  });
})();

// ─── Hero parallax on scroll ─────────────────────
const heroBody = $('.hero-body');
if (heroBody) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroBody.style.transform = `translateY(${y * 0.18}px)`;
    }
  }, { passive: true });
}
