(() => {
  const t = window.demoTranslate;
  const seed = () => ({clients: ['Café Aurora', 'Estúdio Horizonte', 'Jardim & Casa'], projects: [
    {name: 'Site institucional', client: 'Café Aurora', value: 2400, done: false},
    {name: 'Painel de clientes', client: 'Estúdio Horizonte', value: 3800, done: false},
    {name: 'Landing page', client: 'Jardim & Casa', value: 1600, done: true}
  ]});
  let data = seed();
  const money = value => value.toLocaleString(window.demoLocale, {style: 'currency', currency: 'BRL'});
  const el = (tag, text, className) => { const node = document.createElement(tag); node.textContent = text; if (className) node.className = className; return node; };
  const feedback = text => { document.getElementById('feedback').textContent = t(text); };
  function render() {
    document.getElementById('revenue').textContent = money(data.projects.reduce((sum, project) => sum + project.value, 0));
    document.getElementById('active').textContent = data.projects.filter(project => !project.done).length;
    document.getElementById('client-count').textContent = data.clients.length;
    const list = document.getElementById('project-list'); list.replaceChildren();
    const query = document.getElementById('search').value.toLocaleLowerCase('pt-BR');
    const filter = document.getElementById('filter').value;
    data.projects.forEach(project => {
      const status = project.done ? 'Concluído' : 'Em andamento';
      if (!(t(project.name) + ' ' + project.client).toLocaleLowerCase(window.demoLocale).includes(query) || (filter !== 'all' && filter !== status)) return;
      const row = el('article', '', 'project-row'); const info = el('div', '');
      info.append(el('h2', t(project.name)), el('p', project.client + ' · ' + money(project.value)));
      const actions = el('div', '', 'row-actions'); const button = el('button', t(project.done ? 'Reabrir' : 'Concluir'));
      button.type = 'button'; button.setAttribute('aria-label', button.textContent + ': ' + project.name);
      button.addEventListener('click', () => { project.done = !project.done; render(); feedback(t('Status atualizado: ') + t(project.name)); document.getElementById('filter').focus(); });
      actions.append(el('span', t(status), 'badge'), button); row.append(info, actions); list.append(row);
    });
    if (!list.children.length) list.append(el('p', t('Nenhum projeto encontrado. Experimente outro filtro.')));
    const clients = document.getElementById('client-list'); clients.replaceChildren();
    const options = document.getElementById('client-options'); const selected = options.value; options.replaceChildren();
    data.clients.forEach(client => {
      const row = el('article', '', 'project-row'); row.append(el('h2', client), el('span', data.projects.filter(project => project.client === client).length + t(' projeto(s)'), 'badge')); clients.append(row);
      const option = el('option', client); option.value = client; options.append(option);
    });
    if (data.clients.includes(selected)) options.value = selected;
  }
  function route() {
    const id = ['overview','projects','clients'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'overview';
    document.querySelectorAll('main section').forEach(section => { section.hidden = section.id !== id; });
    document.querySelectorAll('nav a').forEach(link => { if (link.hash === '#' + id) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); });
    feedback('');
  }
  document.getElementById('search').addEventListener('input', render);
  document.getElementById('filter').addEventListener('change', render);
  document.getElementById('project-form').addEventListener('submit', event => {
    event.preventDefault(); const fields = new FormData(event.target); const name = fields.get('name').trim();
    if (!name) return;
    data.projects.push({name, client: fields.get('client'), value: Number(fields.get('value')), done: false});
    event.target.reset(); document.getElementById('search').value = ''; document.getElementById('filter').value = 'all'; render(); feedback('Projeto de exemplo adicionado.');
  });
  document.getElementById('client-form').addEventListener('submit', event => {
    event.preventDefault(); const name = new FormData(event.target).get('name').trim(); if (!name) return;
    if (data.clients.some(client => client.toLocaleLowerCase() === name.toLocaleLowerCase())) { feedback('Esse cliente já existe na demo.'); return; }
    data.clients.push(name); event.target.reset(); render(); feedback('Cliente de exemplo adicionado.');
  });
  document.getElementById('reset').addEventListener('click', () => { data = seed(); document.querySelectorAll('form').forEach(form => form.reset()); document.getElementById('search').value = ''; document.getElementById('filter').value = 'all'; render(); feedback('Dados fictícios restaurados.'); });
  window.addEventListener('hashchange', route); render(); route();
})();
