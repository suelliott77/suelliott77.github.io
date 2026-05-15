const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== HERO PARTICLES =====
(function initParticles() {
  if (prefersReducedMotion) return;
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const COUNT = 55;
  let particles = [];
  let animId;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function spawnParticles() {
    particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.1 + 0.4,
        alpha: Math.random() * 0.35 + 0.15,
      });
    }
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(74,139,223,${(1 - d / 110) * 0.2})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(191,219,254,${p.alpha})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;
    });

    animId = requestAnimationFrame(tick);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      tick();
    }
  });

  window.addEventListener('resize', resize);
  resize();
  spawnParticles();
  tick();
})();

// ===== TYPING EFFECT =====
(function initTyping() {
  if (prefersReducedMotion) return;
  const el = document.querySelector('.hero-role');
  if (!el) return;

  const text = el.textContent.trim();
  el.textContent = '';
  el.classList.add('typing-cursor');

  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(type, 52);
    } else {
      setTimeout(() => el.classList.remove('typing-cursor'), 2200);
    }
  }

  setTimeout(type, 750);
})();

// ===== SCROLL REVEAL + PROJECT LIST ANIMATION =====
(function initReveal() {
  // Auto-tag .project blocks so they inherit the data-reveal CSS
  document.querySelectorAll('.project').forEach(el => {
    if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
  });

  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  if (prefersReducedMotion) {
    els.forEach(el => {
      el.classList.add('revealed');
      el.querySelectorAll('li').forEach(li => li.classList.add('li-visible'));
    });
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');

          // Stagger list items inside project blocks
          if (entry.target.classList.contains('project')) {
            entry.target.querySelectorAll('li').forEach((li, i) => {
              li.style.transitionDelay = `${0.25 + i * 0.07}s`;
              li.classList.add('li-visible');
            });
          }

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  els.forEach(el => observer.observe(el));
})();

// ===== SCROLL PROGRESS BAR =====
(function initScrollProgress() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;
  const bar = document.createElement('div');
  bar.className = 'scroll-progress-bar';
  nav.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    bar.style.transform = `scaleX(${progress})`;
  }, { passive: true });
})();

// ===== MAGNETIC BUTTONS =====
(function initMagneticButtons() {
  if (prefersReducedMotion) return;
  const btns = document.querySelectorAll('.btn-hero-primary, .btn-hero-outline');

  btns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.12s ease';
    });

    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.28;
      const dy = (e.clientY - cy) * 0.28;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.45s cubic-bezier(0.22,1,0.36,1)';
      btn.style.transform = '';
      setTimeout(() => { btn.style.transition = ''; }, 450);
    });
  });
})();

// ===== WORD REVEAL =====
(function initWordReveal() {
  if (prefersReducedMotion) return;
  document.querySelectorAll('h2').forEach(h2 => {
    const words = h2.textContent.trim().split(/\s+/);
    h2.innerHTML = words.map((w, i) =>
      `<span class="word-wrap"><span class="word-inner" style="transition-delay:${i * 0.09}s">${w}</span></span>`
    ).join(' ');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.word-inner').forEach(s => s.classList.add('word-visible'));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    observer.observe(h2);
  });
})();

// ===== SKILL TAGS STAGGER =====
(function initSkillTags() {
  if (prefersReducedMotion) return;
  const groups = document.querySelector('.skill-groups');
  if (!groups) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const tags = entry.target.querySelectorAll('.skill-tag');
        tags.forEach((tag, i) => {
          tag.style.transitionDelay = `${i * 0.045}s`;
          tag.classList.add('tag-visible');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  observer.observe(groups);
})();

// ===== 3D CARD TILT + SPOTLIGHT =====
(function initCardTilt() {
  if (prefersReducedMotion) return;
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotY = ((x - cx) / cx) * 9;
      const rotX = -((y - cy) / cy) * 9;

      card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-5px)`;
      card.style.setProperty('--spotlight-x', `${x}px`);
      card.style.setProperty('--spotlight-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s ease';
      card.style.transform = '';
      setTimeout(() => { card.style.transition = ''; }, 450);
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'box-shadow 0.2s ease';
    });
  });
})();
