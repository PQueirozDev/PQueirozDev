# Portfólio — template baseado em kc1t.com

Portfólio pessoal estilo "terminal dark" com dados **fictícios** (placeholder).
Feito só com HTML + CSS + JS puro — sem build, sem dependências.

## Como visualizar

Abra `index.html` direto no navegador, ou rode um servidor local:

```bash
npx serve .
# ou
python -m http.server 8000
```

## Estrutura

| Arquivo      | O que tem                                                    |
| ------------ | ------------------------------------------------------------ |
| `index.html` | Todo o conteúdo (texto, seções, links)                       |
| `styles.css` | Tema visual (cores em `:root`, layout, responsividade)       |
| `script.js`  | Relógio local, animação de scroll, âncoras suaves            |

## Onde trocar as informações

- **Nome, handle, bio, cargo, cidade** → bloco `<aside class="sidebar">` no `index.html`
- **Fuso horário do relógio** → `script.js`, constante `timeZone`
- **Tecnologias (marquee)** → seção `<section class="skills">` (duplicar o conjunto 2x para o loop)
- **Vídeos / Dev Logs / Prêmios / Experiência / Formação / Serviços** → cada `<section>`
- **E-mail e redes sociais** → `<footer class="footer" id="contato">`
- **Cores do tema** → variáveis em `:root` no topo do `styles.css` (`--accent` é o verde principal)

## Próximo passo

Envie suas informações reais (nome, bio, experiências, links...) que eu vou
substituindo os placeholders uma a uma.
