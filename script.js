/* ============================================================
   Portfolio — interactions
   ============================================================ */

// ---------- business hours status & local clock (sidebar) ----------
function isBusinessHours() {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    }).formatToParts(new Date());

    const map = {};
    for (const p of parts) {
      map[p.type] = p.value;
    }

    const isWeekday = ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(map.weekday);
    const hour = parseInt(map.hour, 10);
    const minute = parseInt(map.minute, 10);
    const totalMinutes = hour * 60 + minute;

    // Segunda a sexta, das 08:00 até as 18:00 (08:00 até 17:59)
    return isWeekday && totalMinutes >= 8 * 60 && totalMinutes < 18 * 60;
  } catch (err) {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    return day >= 1 && day <= 5 && hour >= 8 && hour < 18;
  }
}

function updateStatus() {
  const statusText = document.getElementById("status-text");
  const statusDot = document.getElementById("status-dot");
  const available = isBusinessHours();
  const isEn = document.documentElement.lang && document.documentElement.lang.startsWith("en");

  const text = available
    ? (isEn ? "Available" : "Disponível")
    : (isEn ? "Unavailable" : "Indisponível");

  if (statusText) {
    statusText.textContent = text;
    statusText.classList.toggle("status-offline", !available);
  }

  if (statusDot) {
    statusDot.classList.toggle("offline", !available);
    statusDot.setAttribute("title", text);
  }
}

(function clock() {
  const el = document.getElementById("clock");

  const fmt = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  });

  const tick = () => {
    if (el) el.textContent = fmt.format(new Date());
    updateStatus();
  };

  tick();
  setInterval(tick, 30_000);
})();

// ---------- reveal on scroll ----------
(function reveal() {
  const items = document.querySelectorAll(
    ".section, .video-card, .award-card, .xp-item, .service-card, .project-card, .process-card, .footer"
  );

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
})();

// ---------- language toggle ----------
(function languageToggle() {
  const button = document.querySelector(".language-toggle");
  if (!button) return;

  const ptToEn = {
    "IDEIAS GANHAM ESPAÇO": "SPACE FOR YOUR IDEAS",
    "Feedbacks ilustrativos": "Illustrative feedback",
    "Exemplos fictícios para demonstrar o layout. Não são depoimentos de clientes reais.": "Fictional examples to demonstrate the layout. These are not real customer testimonials.",
    "EXEMPLO FICTÍCIO": "FICTIONAL EXAMPLE",
    "“A apresentação ficou clara e encontrar os serviços ficou muito mais fácil.”": "“The presentation was clear, and finding the services became much easier.”",
    "“Ter clientes e projetos organizados em um painel deixou a rotina mais simples.”": "“Having clients and projects organized in one dashboard made everyday work simpler.”",
    "“Gostei de acompanhar as etapas e entender o que estava sendo desenvolvido.”": "“I enjoyed following each stage and understanding what was being built.”",
    "Persona fictícia · Comércio local": "Fictional persona · Local business",
    "Persona fictícia · Gestão de negócios": "Fictional persona · Business management",
    "Persona fictícia · Serviços": "Fictional persona · Services",
    "Defino escopo, prazo e investimento desde o início, sem surpresas.": "I define the scope, timeline, and budget from the start, with no surprises.",
    "Desenvolvo com seu feedback": "I build with your feedback",
    "Publico seu projeto e sigo disponível depois da entrega.": "I launch your project and remain available after delivery.",
    "Tecnologias": "Technologies",
    "Empresa": "Business",
    "São Paulo, BR": "São Paulo, Brazil",
    "02.2026 - 12.2030 · 4 anos": "02.2026 - 12.2030 · 4 years",
    "Dashboard de gestão do PQueiroz Studio": "PQueiroz Studio management dashboard",
    "Atelier 31 — Seu estilo. Nossa precisão.": "Atelier 31 — Your style. Our precision.",
    "Bravus Barbearia — Seu estilo. Sua marca. Nosso ofício.": "Bravus Barbearia — Your style. Your mark. Our craft.",
    "Projeto": "Project",
    "Projeto interativo": "Interactive project",
    "Explorar projeto": "Explore project",
    "Explorar demo fictícia": "Explore fictional demo",
    "Demo independente com dados fictícios, inspirada no painel de gestão. Não acessa o sistema privado.": "Standalone demo with fictional data, inspired by the management dashboard. It does not access the private system.",
    "Conheça o site da Atelier 31 e explore suas páginas dentro do portfólio.": "Visit the Atelier 31 website and explore its pages within this portfolio.",
    "Conheça o site da Bravus Barbearia e navegue pela apresentação dos serviços.": "Visit the Bravus Barbearia website and explore its services.",
    "Fechar": "Close",
    "Reiniciar": "Restart",
    "Celular": "Mobile",
    "Abrir em nova aba": "Open in new tab",
    "Navegue pelo projeto abaixo. Se ele não aparecer, use “Abrir em nova aba”.": "Explore the project below. If it does not appear, use “Open in new tab”.",
    "Pedro Queiroz, desenvolvedor front-end. Sites, sistemas e automações para facilitar o dia a dia de empresas. Conheça meus projetos.": "Pedro Queiroz, front-end developer. Websites, systems, and automations to simplify everyday business tasks. Explore my projects.",
    "Estudante de Ciência da Computação no Senac, em São Paulo. Minha experiência reúne projetos próprios e desenvolvimento para empresas.": "Computer Science student at Senac in São Paulo. My experience includes personal projects and development for businesses.",
    "Sites e sistemas": "Websites and systems",
    "para o seu negócio.": "for your business.",
    "Sou Pedro, desenvolvedor front-end. Crio sites, interfaces e automações para apresentar sua empresa e facilitar o trabalho do dia a dia.": "I'm Pedro, a front-end developer. I build websites, interfaces, and automations to showcase your business and simplify everyday work.",
    "Conversar sobre meu projeto": "Discuss my project",
    "Ver currículo": "View resume",
    "Projeto em destaque": "Featured project",
    "Um sistema para organizar orçamentos, clientes e serviços.": "A system to organize quotes, customers, and services.",
    "Sistema de orçamentos da Aquecedores Fortes": "Aquecedores Fortes quote management system",
    "Interface do sistema de orçamentos · Aquecedores Fortes": "Quote management interface · Aquecedores Fortes",
    "O desafio": "The challenge",
    "Facilitar o dia a dia da empresa na elaboração de orçamentos e na organização de clientes e serviços.": "Make the company's daily work easier when preparing quotes and organizing customers and services.",
    "Minha contribuição": "My contribution",
    "Desenvolvimento front-end do sistema interno, com HTML, CSS e JavaScript, e trabalho na interface e experiência de uso.": "Front-end development of the internal system using HTML, CSS, and JavaScript, with work on the interface and user experience.",
    "A solução": "The solution",
    "Um sistema web que reúne orçamentos, catálogo de aquecedores por marca, incluindo Lorenzetti e Rinnai, e gestão de clientes e serviços.": "A web system combining quotes, a heater catalog organized by brand, including Lorenzetti and Rinnai, and customer and service management.",
    "Ampliar interface": "Enlarge screenshot",
    "Quero um projeto assim": "I want a project like this",
    "Desenvolvedor Full Stack. Conheça meus projetos, experiências e conteúdo sobre desenvolvimento e tecnologia.": "Full Stack Developer. Explore my projects, experience, and content about development and technology.",
    "Dev Front-end · Automações": "Front-end Developer · Automations",
    "Base": "Based in",
    "Hora local": "Local time",
    "Disponível": "Available",
    "Indisponível": "Unavailable",
    "Online": "Online",
    "Offline": "Offline",
    "Seções": "Sections",
    "Ações rápidas": "Quick actions",
    "Falar comigo pelo WhatsApp": "Talk to me on WhatsApp",
    "Sou desenvolvedor front-end e estudante de Ciência da Computação no Senac. Também desenvolvo e vendo sites para empresas, ajudando negócios a terem presença digital profissional.": "I am a front-end developer and Computer Science student at Senac. I also build and sell websites for businesses, helping them establish a professional digital presence.",
    "Construo coisas": "I build things",
    "que funcionam.": "that work.",
    "Dev front-end, apaixonado por transformar ideias em interfaces bonitas e funcionais. Estudo Ciência da Computação no Senac e desenvolvo sites para empresas que querem presença digital profissional. Aqui você encontra meus projetos, um pouco do que aprendo pelo caminho e como podemos trabalhar juntos.": "Front-end developer passionate about turning ideas into beautiful, functional interfaces. I study Computer Science at Senac and build websites for businesses looking for a professional digital presence. Here you can explore my projects, what I am learning, and how we can work together.",
    "Projetos": "Projects",
    "Experiência": "Experience",
    "Formação": "Education",
    "Serviços": "Services",
    "Ver meus projetos": "View my projects",
    "Entrar em contato": "Get in touch",
    "Software desktop": "Desktop software",
    "Otimizador Windows": "Windows Optimizer",
    "PQueiroz Optimizer PRO - Otimizador e Gerenciador do Windows": "PQueiroz Optimizer PRO - Windows Optimizer and Manager",
    "Software completo de otimização e gerenciamento do Windows com perfis gamer e diário, debloat, limpeza de temporários, diagnósticos de hardware e ferramentas de manutenção do sistema (SFC, DISM, CHKDSK).": "Complete Windows optimizer and management software featuring gamer and daily performance profiles, debloat, temporary file cleanup, hardware diagnostics, and system maintenance (SFC, DISM, CHKDSK).",
    "Otimização": "Optimization",
    "Performance": "Performance",
    "Automação": "Automation",
    "Desktop": "Desktop",
    "Windows": "Windows",
    "Site e cadastro de clientes para Barbearia": "Website and customer registration for Barber Shop",
    "Landing page para Barbearia": "Landing page for Barber Shop",
    "Sistema web": "Web system",
    "Sistema interno de orçamentos com catálogo de aquecedores por marca (Lorenzetti, Rinnai), gestão de clientes e serviços. Desenvolvido para agilizar o dia a dia da empresa.": "Internal quote system with a heater catalog by brand (Lorenzetti, Rinnai), customer and service management. Built to streamline the company's daily operations.",
    "Gestão": "Management",
    "Painel de gestão com visão de receita, clientes, projetos, domínios e hospedagens — o dashboard que uso para administrar meus projetos e clientes.": "Management dashboard with an overview of revenue, customers, projects, domains, and hosting — the dashboard I use to manage my projects and clients.",
    "Site e cadastro de clientes": "Website and customer registration",
    "Site institucional com demonstração dos serviços e cadastro de clientes.": "Business website showcasing services and enabling customer registration.",
    "Demonstração": "Showcase",
    "Landing page com o intuito de mostrar o serviço da loja.": "Landing page designed to showcase the store's services.",
    "Serviços": "Services",
    "Do briefing ao lançamento": "From briefing to launch",
    "Como funciona meu trabalho": "How I work",
    "Transformo sua ideia em um site rápido, moderno e focado nos objetivos do seu negócio.": "I turn your idea into a fast, modern website focused on your business goals.",
    "Solicitar orçamento grátis": "Request a free quote",
    "Etapa 1": "Step 1",
    "Conte sua ideia": "Tell me your idea",
    "Você me explica o que precisa, sem termos técnicos complicados.": "Tell me what you need, without complicated technical terms.",
    "Etapa 2": "Step 2",
    "Receba uma proposta clara": "Receive a clear proposal",
    "Definimos escopo, prazo e investimento desde o início, sem surpresas.": "We define the scope, timeline, and investment from the start, with no surprises.",
    "Etapa 3": "Step 3",
    "Desenvolvemos com seu feedback": "We build with your feedback",
    "Você acompanha tudo de perto e participa das decisões importantes.": "You follow the process closely and take part in important decisions.",
    "Etapa 4": "Step 4",
    "Lançamento e suporte contínuo": "Launch and ongoing support",
    "Publicamos seu projeto e seguimos disponíveis depois da entrega.": "We launch your project and remain available after delivery.",
    "Remoto": "Remote",
    "São Paulo, BR (Remoto)": "São Paulo, BR (Remote)",
    "Desenvolvedor Front-end Júnior": "Junior Front-end Developer",
    "Integral": "Full-time",
    "atual": "present",
    "09.2026 - atual · 1 mês": "09.2026 - present · 1 mo.",
    "Desenvolvedor Freelancer": "Freelance Developer",
    "Meio período": "Part-time",
    "Automações": "Automations",
    "Sites institucionais": "Business websites",
    "Back-end": "Back-end",
    "Ciência da Computação": "Computer Science",
    "Graduação": "Bachelor's degree",
    "Banco de dados": "Databases",
    "Programação Web": "Web Programming",
    "Desenvolvimento de sites e automações": "Website and automation development",
    "Criação de landing pages | Bots | Automações | Sites institucionais": "Landing pages | Bots | Automations | Business websites",
    "Suporte": "Support",
    "Manutenção · Suporte · Automação": "Maintenance · Support · Automation",
    "Forneço suporte completo ao site e cuido das automações para facilitar o dia a dia da empresa.": "I provide complete website support and manage automations to make the company's daily work easier.",
    "Vamos conversar?": "Let's talk?",
    "Aberto a conversas sobre projeto e freelance": "Open to project and freelance conversations",
    "Feito por Pedro Queiroz": "Made by Pedro Queiroz",
    "© 2026 · Feito por Pedro Queiroz": "© 2026 · Made by Pedro Queiroz"
  };

  const enToPt = Object.fromEntries(
    Object.entries(ptToEn).map(([portuguese, english]) => [english, portuguese])
  );
  let language = "pt";

  const normalize = (value) => value.replace(/\s+/g, " ").trim();
  const translateTextNodes = (dictionary) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      if (node.parentElement.closest("script, style")) return;
      const current = normalize(node.nodeValue);
      const translated = dictionary[current];
      if (!translated) return;
      const leading = node.nodeValue.match(/^\s*/)[0];
      const trailing = node.nodeValue.match(/\s*$/)[0];
      node.nodeValue = `${leading}${translated}${trailing}`;
    });
  };

  const translateAttributes = (dictionary) => {
    document.querySelectorAll("[alt], [aria-label], [title]").forEach((element) => {
      ["alt", "aria-label", "title"].forEach((attribute) => {
        const value = element.getAttribute(attribute);
        if (value && dictionary[normalize(value)]) {
          element.setAttribute(attribute, dictionary[normalize(value)]);
        }
      });
    });
  };

  button.addEventListener("click", () => {
    const dictionary = language === "pt" ? ptToEn : enToPt;
    translateTextNodes(dictionary);
    translateAttributes(dictionary);
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      const descriptionKey = normalize(description.content);
      if (dictionary[descriptionKey]) description.content = dictionary[descriptionKey];
    }
    language = language === "pt" ? "en" : "pt";
    try { localStorage.setItem("portfolio-language", language); } catch {}
    button.textContent = language === "pt" ? "EN" : "PT";
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    updateStatus();
  });

  let savedLang;
  try { savedLang = localStorage.getItem("portfolio-language"); } catch {}
  if (savedLang === "en") {
    button.click();
  }
})();

// ---------- smooth anchor offset (sticky sidebar doesn't offset, kept simple) ----------
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (id.length <= 1) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? "auto" : "smooth", block: "start" });
  });
});
