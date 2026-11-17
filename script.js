/* ══════════════════════════════════════════════════════
   WAYANAD TRAVEL — JAVASCRIPT
   ══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. NAVBAR SCROLL BEHAVIOUR ── */
  const navbar = document.getElementById('navbar');

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back-to-top visibility
    const backToTop = document.getElementById('back-to-top');
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ── 2. HAMBURGER / MOBILE MENU ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── 3. HERO SLIDER ── */
  const heroImgs = document.querySelectorAll('.hero-img');
  const heroDots = document.querySelectorAll('.hero-dot');
  let current = 0;
  let sliderInterval;

  function goToSlide(index) {
    heroImgs[current].classList.remove('active');
    heroDots[current].classList.remove('active');
    current = (index + heroImgs.length) % heroImgs.length;
    heroImgs[current].classList.add('active');
    heroDots[current].classList.add('active');
  }

  function nextSlide() { goToSlide(current + 1); }

  sliderInterval = setInterval(nextSlide, 5500);

  heroDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(sliderInterval);
      goToSlide(i);
      sliderInterval = setInterval(nextSlide, 5500);
    });
  });

  /* ── 4. SCROLL REVEAL ── */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  /* ── 5. PARALLAX ON SCROLL ── */
  const parallaxBgs = document.querySelectorAll('.parallax-bg');

  function updateParallax() {
    parallaxBgs.forEach(bg => {
      const parent = bg.parentElement;
      const rect = parent.getBoundingClientRect();
      const offset = rect.top * 0.3;
      bg.style.transform = `translateY(${offset}px)`;
    });
  }

  window.addEventListener('scroll', updateParallax, { passive: true });

  /* ── 6. BACK TO TOP ── */
  const backToTopBtn = document.getElementById('back-to-top');
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── 7. SMOOTH ANCHOR SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── 8. GALLERY LIGHTBOX (simple overlay) ── */
  const gItems = document.querySelectorAll('.g-item');

  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Image lightbox');
  lightbox.innerHTML = `
    <button id="lb-close" aria-label="Close lightbox">&times;</button>
    <button id="lb-prev" aria-label="Previous image">&#8592;</button>
    <button id="lb-next" aria-label="Next image">&#8594;</button>
    <div id="lb-img-wrap"><img id="lb-img" src="" alt="" /><p id="lb-caption"></p></div>
  `;
  document.body.appendChild(lightbox);

  // Lightbox CSS injected via JS
  const lbStyle = document.createElement('style');
  lbStyle.textContent = `
    #lightbox {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(5,15,5,0.97);
      align-items: center;
      justify-content: center;
      animation: lbFadeIn 0.3s ease;
    }
    #lightbox.open { display: flex; }
    @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }
    #lb-img-wrap {
      max-width: 90vw;
      max-height: 85vh;
      text-align: center;
    }
    #lb-img {
      max-width: 90vw;
      max-height: 78vh;
      width: auto;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 32px 80px rgba(0,0,0,0.7);
      object-fit: contain;
    }
    #lb-caption {
      margin-top: 1rem;
      font-size: 0.82rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.5);
    }
    #lb-close {
      position: fixed;
      top: 1.5rem;
      right: 1.5rem;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.15);
      color: white;
      font-size: 1.5rem;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    #lb-close:hover { background: rgba(255,255,255,0.2); }
    #lb-prev, #lb-next {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15);
      color: white;
      font-size: 1.2rem;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    #lb-prev { left: 1.5rem; }
    #lb-next { right: 1.5rem; }
    #lb-prev:hover, #lb-next:hover { background: rgba(255,255,255,0.18); }
  `;
  document.head.appendChild(lbStyle);

  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  let lbIndex = 0;
  const lbImages = [];

  gItems.forEach((item, i) => {
    const img = item.querySelector('img');
    const cap = item.querySelector('.g-caption');
    lbImages.push({ src: img.src, alt: img.alt, caption: cap ? cap.textContent : '' });
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => openLightbox(i));
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'Open image: ' + (cap ? cap.textContent : img.alt));
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(i); });
  });

  function openLightbox(i) {
    lbIndex = i;
    setLbImage(lbIndex);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.getElementById('lb-close').focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function setLbImage(i) {
    lbImg.src = lbImages[i].src;
    lbImg.alt = lbImages[i].alt;
    lbCaption.textContent = lbImages[i].caption;
  }

  document.getElementById('lb-close').addEventListener('click', closeLightbox);
  document.getElementById('lb-prev').addEventListener('click', () => {
    lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
    setLbImage(lbIndex);
  });
  document.getElementById('lb-next').addEventListener('click', () => {
    lbIndex = (lbIndex + 1) % lbImages.length;
    setLbImage(lbIndex);
  });

  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; setLbImage(lbIndex); }
    if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % lbImages.length; setLbImage(lbIndex); }
  });

  /* ── 9. FLOATING PARTICLES IN HERO ── */
  const heroSection = document.getElementById('home');
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0.45;';
  heroSection.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  function resizeCanvas() {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      r: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      drift: (Math.random() - 0.5) * 0.4,
    };
  }

  function animParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (particles.length < 40 && Math.random() < 0.15) {
      particles.push(createParticle());
    }

    particles = particles.filter(p => p.y > -10);

    particles.forEach(p => {
      p.y -= p.speed;
      p.x += p.drift;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(149, 213, 178, ${p.opacity})`;
      ctx.fill();
    });

    animFrame = requestAnimationFrame(animParticles);
  }

  resizeCanvas();
  animParticles();
  window.addEventListener('resize', resizeCanvas);

  /* ── 10. ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach(a => {
            a.style.color = a.getAttribute('href') === `#${id}`
              ? 'rgba(255,255,255,1)'
              : '';
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => sectionObserver.observe(s));

  /* ── 11. EXPERIENCE CARD TILT EFFECT ── */
  const expCards = document.querySelectorAll('.exp-card');

  expCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── 12. NUMBER COUNTER ANIMATION ── */
  function animateCount(el, target, duration) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start).toLocaleString();
      }
    }, 16);
  }

  const badgeNum = document.querySelector('.badge-num');
  if (badgeNum) {
    const badgeObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCount(badgeNum, 2131, 1800);
        badgeObserver.disconnect();
      }
    }, { threshold: 0.5 });
    badgeObserver.observe(badgeNum);
  }

})();
