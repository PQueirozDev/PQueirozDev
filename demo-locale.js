(() => {
  const english = new URLSearchParams(location.search).get('lang') === 'en';
  const strings = {
    'PQueiroz Studio · Demo fictícia': 'PQueiroz Studio · Fictional demo',
    'DEMO FICTÍCIA · Explore à vontade. Os dados são exemplos e as alterações duram apenas nesta visita.': 'FICTIONAL DEMO · Explore freely. All data is illustrative and changes last only for this visit.',
    'Studio / Gestão': 'Studio / Management', 'Restaurar demo': 'Reset demo', 'Áreas do painel': 'Dashboard sections',
    'Visão geral': 'Overview', 'Projetos': 'Projects', 'Clientes': 'Clients',
    'SEU NEGÓCIO EM UM SÓ LUGAR': 'YOUR BUSINESS IN ONE PLACE', 'Bom trabalho começa': 'Great work starts', 'com organização.': 'with organization.',
    'Uma demonstração interativa de gestão de projetos e clientes.': 'An interactive demo of project and client management.',
    'Receita prevista': 'Expected revenue', 'Valor dos projetos de exemplo': 'Value of the sample projects', 'Projetos em andamento': 'Active projects',
    'Da ideia à entrega': 'From idea to delivery', 'Relacionamentos em um só lugar': 'Relationships in one place',
    'Experimente o painel': 'Try the dashboard',
    'Crie um projeto, filtre a lista e marque uma entrega como concluída. Os indicadores acompanham suas alterações.': 'Create a project, filter the list, and mark a delivery as complete. The metrics update as you make changes.',
    'Gerenciar projetos →': 'Manage projects →', 'DO BRIEFING À ENTREGA': 'FROM BRIEF TO DELIVERY',
    'Buscar projeto': 'Search projects', 'Nome do projeto ou cliente': 'Project or client name', 'Todos': 'All',
    'Em andamento': 'In progress', 'Concluído': 'Completed', 'Novo projeto de exemplo': 'New sample project',
    'Nome do projeto': 'Project name', 'Ex.: Site do Café Aurora': 'E.g. Café Aurora website', 'Cliente': 'Client',
    'Valor previsto (R$)': 'Expected value (BRL)', 'Adicionar projeto': 'Add project', 'CONEXÕES QUE VIRAM PROJETOS': 'CONNECTIONS THAT BECOME PROJECTS',
    'Novo cliente de exemplo': 'New sample client', 'Nome da empresa': 'Business name', 'Use um nome fictício': 'Use a fictional name', 'Adicionar cliente': 'Add client',
    'Site institucional': 'Business website', 'Painel de clientes': 'Client dashboard', 'Reabrir': 'Reopen', 'Concluir': 'Complete',
    'Status atualizado: ': 'Status updated: ', 'Nenhum projeto encontrado. Experimente outro filtro.': 'No projects found. Try another filter.',
    ' projeto(s)': ' project(s)', 'Projeto de exemplo adicionado.': 'Sample project added.', 'Esse cliente já existe na demo.': 'This client already exists in the demo.',
    'Cliente de exemplo adicionado.': 'Sample client added.', 'Dados fictícios restaurados.': 'Fictional data restored.'
  };
  window.demoTranslate = text => english ? (strings[text] ?? text) : text;
  window.demoLocale = english ? 'en-US' : 'pt-BR';
  if (!english) return;
  document.documentElement.lang = 'en';
  document.title = window.demoTranslate(document.title);
  // Preserve option values before translating their labels.
  document.querySelectorAll('option').forEach(option => { option.value = option.value; });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    if (node.parentElement.closest('script,style')) return;
    const key = node.nodeValue.trim();
    if (strings[key]) node.nodeValue = node.nodeValue.replace(key, strings[key]);
  });
  document.querySelectorAll('[placeholder],[aria-label]').forEach(element => {
    ['placeholder', 'aria-label'].forEach(attribute => {
      const value = element.getAttribute(attribute);
      if (value) element.setAttribute(attribute, window.demoTranslate(value));
    });
  });
})();
