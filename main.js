/* =============================================
   SANJEEV AUTO — Main JavaScript
   ============================================= */

'use strict';

// ── Navbar scroll behavior ──────────────────
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  if (current > lastScroll && current > 200) {
    navbar.classList.add('hidden');
  } else {
    navbar.classList.remove('hidden');
  }
  lastScroll = current;
}, { passive: true });

// ── Mobile nav toggle ───────────────────────
const hamburger = document.getElementById('navHamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ── Dark/Light mode ─────────────────────────
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('.theme-icon');

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    if (themeIcon) themeIcon.textContent = next === 'dark' ? '○' : '◐';
  });
}

// ── Hero counter animation ───────────────────
function animateCounter(el, target, suffix = '') {
  const duration = 2000;
  const start = performance.now();
  const isDecimal = String(target).includes('.');
  const decimals = isDecimal ? 1 : 0;

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;
    el.textContent = isDecimal ? value.toFixed(decimals) : Math.floor(value);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = isDecimal ? target.toFixed(decimals) : target;
  }
  requestAnimationFrame(update);
}

// Hero stats counters
const heroStats = document.querySelectorAll('.hero .stat-num[data-target]');
let heroCounterDone = false;

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !heroCounterDone) {
      heroCounterDone = true;
      heroStats.forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
    }
  });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) heroObserver.observe(heroSection);

// ── Scroll reveal ────────────────────────────
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ── Counter animations (section) ────────────
const counters = document.querySelectorAll('.counter[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target, parseFloat(entry.target.dataset.target));
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

// ── Trust bar auto-scroll ────────────────────
function setupTrustScroll() {
  const container = document.querySelector('.trust-logos');
  if (!container) return;

  // Duplicate logos for infinite scroll
  const logos = container.innerHTML;
  const inner = document.createElement('div');
  inner.className = 'trust-logos-inner';
  inner.innerHTML = logos + logos;
  container.innerHTML = '';
  container.appendChild(inner);
}
setupTrustScroll();

// ── Capabilities horizontal scroll ──────────
const capContainer = document.querySelector('.cap-scroll-container');
const capTrack = document.getElementById('capTrack');
const capPrev = document.getElementById('capPrev');
const capNext = document.getElementById('capNext');

const CARD_WIDTH = 340;

if (capContainer && capPrev && capNext) {
  capNext.addEventListener('click', () => {
    capContainer.scrollBy({ left: CARD_WIDTH, behavior: 'smooth' });
  });
  capPrev.addEventListener('click', () => {
    capContainer.scrollBy({ left: -CARD_WIDTH, behavior: 'smooth' });
  });

  // Drag to scroll
  let isDragging = false, startX = 0, scrollLeft = 0;

  capContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - capContainer.offsetLeft;
    scrollLeft = capContainer.scrollLeft;
    capContainer.classList.add('grabbing');
  });
  capContainer.addEventListener('mouseleave', () => { isDragging = false; capContainer.classList.remove('grabbing'); });
  capContainer.addEventListener('mouseup', () => { isDragging = false; capContainer.classList.remove('grabbing'); });
  capContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - capContainer.offsetLeft;
    capContainer.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
}

// ── Particles ────────────────────────────────
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      --duration: ${6 + Math.random() * 10}s;
      --delay: ${Math.random() * 8}s;
      --drift: ${(Math.random() - 0.5) * 100}px;
      width: ${1 + Math.random() * 2}px;
      height: ${1 + Math.random() * 2}px;
    `;
    container.appendChild(p);
  }
}
createParticles();

// ── Add reveal classes to sections ──────────
document.addEventListener('DOMContentLoaded', () => {
  const sectionHeaders = document.querySelectorAll('.section-header, .about-content, .about-visual');
  sectionHeaders.forEach(el => el.classList.add('reveal'));

  const industryCards = document.querySelectorAll('.industry-card');
  industryCards.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 80}ms`;
  });

  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 60}ms`;
  });

  const certCards = document.querySelectorAll('.cert-card');
  certCards.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 100}ms`;
  });

  const facCards = document.querySelectorAll('.facility-card');
  facCards.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 100}ms`;
  });

  const blogCards = document.querySelectorAll('.blog-card');
  blogCards.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 80}ms`;
  });

  // Re-observe dynamically added reveal elements
  const newReveals = document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)');
  newReveals.forEach(el => revealObserver.observe(el));
});

// ── Smooth hover tilt on product cards ───────
document.querySelectorAll('.product-card, .industry-card, .cert-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});

// ── Active nav link highlight ─────────────────
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
