/* ============================================================
   Portfolio — interactions
   ============================================================ */

// ---------- local time clock (sidebar) ----------
(function clock() {
  const el = document.getElementById("clock");
  if (!el) return;

  const fmt = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo", // change to your timezone
  });

  const tick = () => {
    el.textContent = fmt.format(new Date());
  };

  tick();
  setInterval(tick, 30_000);
})();

// ---------- reveal on scroll ----------
(function reveal() {
  const items = document.querySelectorAll(
    ".section, .video-card, .award-card, .xp-item, .service-card, .project-card, .footer"
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

// ---------- smooth anchor offset (sticky sidebar doesn't offset, kept simple) ----------
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (id.length <= 1) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
