(() => {
  'use strict';

  // ========== Loader ==========
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader')?.classList.add('is-done');
    }, 600);
  });

  // ========== Nav scroll state ==========
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 30) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ========== Mobile nav ==========
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  navToggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // ========== Smooth anchor scroll (with offset) ==========
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // ========== Scroll reveal ==========
  const reveals = document.querySelectorAll(
    '.section-head, .category, .video-card, .lottie-card, .service, .about-text, .about-card, .contact-left, .contact-form, .mini-stat'
  );
  reveals.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
  });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-in'));
  }

  // ========== Video modal ==========
  const modal = document.getElementById('modal');
  const modalVideo = document.getElementById('modal-video');

  // Extract video ID from any youtube URL format
  const getVideoId = (url) => {
    if (!url) return null;
    const m = url.match(/(?:embed\/|v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    return m ? m[1] : null;
  };

  const openVideo = (embedUrl, title) => {
    const videoId = getVideoId(embedUrl);
    if (!videoId || !modalVideo) return;
    const safeTitle = (title || 'Video').replace(/"/g, '&quot;');
    modalVideo.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="${safeTitle}"></iframe>`;
    modal?.classList.add('is-open');
    modal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    modal?.classList.remove('is-open');
    modal?.setAttribute('aria-hidden', 'true');
    if (modalVideo) modalVideo.innerHTML = '';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-embed]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openVideo(el.dataset.embed, el.dataset.title);
    });
  });

  modal?.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeVideo);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVideo();
  });

  // ========== Contact form ==========
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();
    if (!name || !email || !message) {
      status.textContent = 'Please fill in all required fields.';
      status.classList.add('is-error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = 'Please enter a valid email.';
      status.classList.add('is-error');
      return;
    }
    status.classList.remove('is-error');
    status.textContent = "Thanks! I'll be in touch within 24 hours.";
    form.reset();
    setTimeout(() => { status.textContent = ''; }, 5000);
  });

  // ========== Image fallback for YouTube thumbs ==========
  document.querySelectorAll('.video-thumb img').forEach(img => {
    img.addEventListener('error', () => {
      const idMatch = img.src.match(/vi\/(.+?)\//);
      if (!idMatch) return;
      // Fallback to mqdefault then hide
      const fallback = img.src.replace('hqdefault', 'mqdefault');
      if (img.src !== fallback) {
        img.src = fallback;
      } else {
        img.style.display = 'none';
        img.parentElement.classList.add('no-thumb');
      }
    });
  });
})();

// ========== Custom Cursor Logic ==========
(function() {
  const cursor = document.getElementById('custom-cursor');
  const cursorDot = document.getElementById('custom-cursor-dot');
  
  if (!cursor || !cursorDot) return;

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update dot immediately
    cursorDot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
  });

  // Smooth follow for the outer ring
  function animateCursor() {
    // Easing factor (0 to 1, higher is faster)
    const easing = 0.25;
    
    cursorX += (mouseX - cursorX) * easing;
    cursorY += (mouseY - cursorY) * easing;
    
    cursor.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`;
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Add hover effect to interactive elements
  const interactives = document.querySelectorAll('a, button, input, textarea, select, .video-card, .lottie-card');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
  });
})();
