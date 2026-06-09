/* Sanjeev Auto — Tata Design Shared JS */
(function() {
  // Navbar — always visible, no hide on scroll
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('at-top', y < 60);
    nav.classList.toggle('scrolled', y >= 60);
  }, { passive: true });

  // Hamburger
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileNav');
  if (ham && mob) ham.addEventListener('click', () => { ham.classList.toggle('open'); mob.classList.toggle('open'); });

  // Popup
  const overlay = document.getElementById('popupOverlay');
  function openPopup() { if (overlay) overlay.classList.add('open'); }
  function closePopup() { if (overlay) overlay.classList.remove('open'); }
  document.querySelectorAll('[data-popup]').forEach(b => b.addEventListener('click', openPopup));
  const pc = document.getElementById('popupClose');
  if (pc) pc.addEventListener('click', closePopup);
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closePopup(); });

  // Scroll reveal
  document.querySelectorAll('.reveal,.reveal--left,.reveal--right,.reveal--scale').forEach(el => {
    new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('revealed'); }, { threshold: 0.1 }).observe(el);
  });

  // Counter
  document.querySelectorAll('.counter').forEach(el => {
    new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || el.dataset.done) return;
      el.dataset.done = '1';
      const t = +el.dataset.target, d = 2000, s = t / (d / 16);
      let v = 0;
      const tick = () => { v = Math.min(v + s, t); el.textContent = Math.floor(v).toLocaleString(); if (v < t) requestAnimationFrame(tick); };
      tick();
    }, { threshold: 0.5 }).observe(el);
  });

  // Scroll top
  const stb = document.getElementById('scrollTop');
  if (stb) {
    window.addEventListener('scroll', () => stb.classList.toggle('show', window.scrollY > 500), { passive: true });
    stb.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Hero slideshow + video
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length) {
    let cur = 0;
    function activateSlide(idx) {
      heroSlides[cur].classList.remove('active');
      cur = idx;
      const img = heroSlides[cur].querySelector('img');
      if (img) { img.style.animation = 'none'; void img.offsetWidth; img.style.animation = ''; }
      heroSlides[cur].classList.add('active');
    }
    setInterval(() => activateSlide((cur + 1) % heroSlides.length), 5000);
  }
  const heroVideo = document.querySelector('.hero-bg-video');
  if (heroVideo) {
    heroVideo.addEventListener('playing', () => heroVideo.classList.add('is-playing'));
    heroVideo.addEventListener('pause',   () => heroVideo.classList.remove('is-playing'));
  }

  // File drop
  const fda = document.getElementById('fileDropArea');
  const ri = document.getElementById('resumeFile');
  if (fda && ri) { fda.addEventListener('click', () => ri.click()); ri.addEventListener('change', () => { if (ri.files.length) fda.querySelector('p').innerHTML = 'Selected: <strong>' + ri.files[0].name + '</strong>'; }); }
})();
