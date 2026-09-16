(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const mouse = matchMedia('(hover: hover) and (pointer: fine)');
  const canvas = document.createElement('canvas');
  canvas.className = 'cursor-trail';
  canvas.setAttribute('aria-hidden', 'true');
  const context = canvas.getContext('2d');
  if (!context) return;
  document.body.append(canvas);
  const cards = document.querySelectorAll('.project-card, .featured-project, .service-card, .feedback-card, .process-card');
  cards.forEach(card => card.classList.add('cosmic-card'));
  const hero = document.querySelector('.hero');
  const orbit = document.querySelector('.orbit-art');
  let particles = [], frame = 0, previousTime = 0, lastPoint = null, litCard = null;
  let width = 0, height = 0;
  const enabled = () => !motion.matches && mouse.matches && !document.hidden && !document.body.classList.contains('browser-open');
  function resize() {
    width = innerWidth; height = innerHeight;
    const scale = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * scale); canvas.height = Math.round(height * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);
  }
  function clear() {
    cancelAnimationFrame(frame); frame = 0; previousTime = 0;
    particles = []; lastPoint = null;
    context.clearRect(0, 0, width, height);
    litCard?.classList.remove('is-lit'); litCard = null;
    orbit?.style.removeProperty('--orbit-x'); orbit?.style.removeProperty('--orbit-y');
  }
  function draw(time) {
    frame = 0;
    if (!enabled()) { clear(); return; }
    const step = previousTime ? Math.min((time - previousTime) / 16.667, 3) : 1;
    previousTime = time;
    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = 'lighter';
    particles = particles.filter(p => p.life > 0);
    for (const p of particles) {
      p.life -= step; p.x += p.vx * step; p.y += p.vy * step;
      const alpha = Math.max(0, p.life / p.duration);
      context.globalAlpha = alpha * .6;
      context.fillStyle = p.color;
      context.shadowColor = p.color; context.shadowBlur = 8;
      context.beginPath(); context.arc(p.x, p.y, Math.max(.2, p.size * alpha), 0, Math.PI * 2); context.fill();
    }
    context.shadowBlur = 0; context.globalAlpha = 1;
    if (particles.length) frame = requestAnimationFrame(draw);
    else previousTime = 0;
  }
  document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || !enabled()) { clear(); return; }
    const point = {x: event.clientX, y: event.clientY};
    const distance = lastPoint ? Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y) : 0;
    if (!lastPoint || distance >= 3) {
      const count = Math.min(6, Math.max(1, Math.ceil(distance / 8)));
      for (let i = 0; i < count; i++) {
        const fraction = (i + 1) / count;
        const duration = 22 + Math.random() * 18;
        particles.push({x: lastPoint ? lastPoint.x + (point.x - lastPoint.x) * fraction : point.x,
          y: lastPoint ? lastPoint.y + (point.y - lastPoint.y) * fraction : point.y,
          vx: (Math.random() - .5) * .65, vy: (Math.random() - .5) * .65,
          size: .7 + Math.random() * 1.6, life: duration, duration,
          color: ['#adc8ff', '#c7b1ff', '#8edbff'][Math.floor(Math.random() * 3)]});
      }
      if (particles.length > 100) particles.splice(0, particles.length - 100);
      lastPoint = point;
      if (!frame) frame = requestAnimationFrame(draw);
    }
    const card = event.target.closest?.('.cosmic-card');
    if (litCard !== card) { litCard?.classList.remove('is-lit'); litCard = card; }
    if (card) {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--light-x', `${point.x - bounds.left}px`);
      card.style.setProperty('--light-y', `${point.y - bounds.top}px`);
      card.classList.add('is-lit');
    }
    if (hero && orbit) {
      const bounds = hero.getBoundingClientRect();
      const inside = point.x >= bounds.left && point.x <= bounds.right && point.y >= bounds.top && point.y <= bounds.bottom;
      orbit.style.setProperty('--orbit-x', inside ? `${((point.x - bounds.left) / bounds.width - .5) * 14}px` : '0px');
      orbit.style.setProperty('--orbit-y', inside ? `${((point.y - bounds.top) / bounds.height - .5) * 10}px` : '0px');
    }
  }, {passive: true});
  window.addEventListener('resize', resize, {passive: true});
  window.addEventListener('blur', clear);
  window.addEventListener('scroll', clear, {passive: true});
  document.documentElement.addEventListener('pointerleave', clear);
  document.addEventListener('visibilitychange', clear);
  motion.addEventListener('change', clear); mouse.addEventListener('change', clear);
  resize();
})();
