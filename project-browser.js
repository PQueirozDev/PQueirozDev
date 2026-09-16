(() => {
  const dialog = document.querySelector('.project-browser');
  const frame = document.getElementById('project-frame');
  const mobile = document.getElementById('browser-mobile');
  let opener;
  let initialUrl;
  document.querySelectorAll('.explore-project').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      initialUrl = link.href;
      if (new URL(initialUrl).pathname.endsWith('/demo.html')) {
        const demoUrl = new URL(initialUrl);
        demoUrl.searchParams.set('lang', document.documentElement.lang.startsWith('en') ? 'en' : 'pt');
        initialUrl = demoUrl.href;
      }
      document.getElementById('browser-title').textContent = link.dataset.project;
      document.getElementById('browser-address').textContent = new URL(initialUrl).host + new URL(initialUrl).pathname;
      document.getElementById('browser-external').href = initialUrl;
      frame.title = link.dataset.project;
      frame.src = initialUrl;
      dialog.showModal();
      document.body.classList.add('browser-open');
    });
  });
  document.getElementById('browser-close').addEventListener('click', () => dialog.close());
  document.getElementById('browser-reload').addEventListener('click', () => { frame.src = initialUrl; });
  mobile.addEventListener('click', () => {
    const active = mobile.getAttribute('aria-pressed') !== 'true';
    mobile.setAttribute('aria-pressed', String(active));
    dialog.classList.toggle('mobile-preview', active);
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    frame.src = 'about:blank';
    dialog.classList.remove('mobile-preview');
    mobile.setAttribute('aria-pressed', 'false');
    document.body.classList.remove('browser-open');
    opener?.focus();
  });
})();
