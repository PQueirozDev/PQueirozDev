(() => {
  const progress = document.getElementById('reading-progress-bar');
  const trigger = document.getElementById('command-trigger');
  const palette = document.getElementById('command-palette');
  const current = document.getElementById('command-current');
  const buttons = [...document.querySelectorAll('.command-list button')];
  const sections = [
    ['top', 'Início'], ['projetos', 'Projetos'], ['como-funciona', 'Processo'],
    ['xp', 'Experiência'], ['form', 'Formação'], ['servicos', 'Serviços'], ['contato', 'Contato']
  ];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let selected = 0;

  const goTo = id => {
    const element = id === 'top' ? document.body : document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
    palette.close();
  };

  const setSelected = index => {
    selected = (index + buttons.length) % buttons.length;
    buttons.forEach((button, position) => button.classList.toggle('is-selected', position === selected));
    buttons[selected].focus();
  };

  const openPalette = () => {
    if (!palette.open) palette.showModal();
    requestAnimationFrame(() => setSelected(0));
  };

  trigger.addEventListener('click', openPalette);
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => goTo(button.dataset.target));
    button.addEventListener('pointermove', () => selected = index);
  });

  window.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openPalette();
    }
    if (!palette.open) return;
    if (event.key === 'ArrowDown') { event.preventDefault(); setSelected(selected + 1); }
    if (event.key === 'ArrowUp') { event.preventDefault(); setSelected(selected - 1); }
    if (event.key === 'Enter' && document.activeElement?.closest('.command-list')) {
      event.preventDefault(); goTo(buttons[selected].dataset.target);
    }
  });

  const updateScrollUI = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    const point = scrollY + innerHeight * .38;
    let active = sections[0];
    sections.forEach(([id, label]) => {
      const el = id === 'top' ? document.body : document.getElementById(id);
      if (el && el.offsetTop <= point) active = [id, label];
    });
    current.textContent = active[1];
  };
  addEventListener('scroll', updateScrollUI, { passive: true });
  addEventListener('resize', updateScrollUI, { passive: true });
  updateScrollUI();
})();
