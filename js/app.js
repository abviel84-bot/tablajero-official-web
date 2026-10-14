/**
 * app.js — El Tablajero
 * Pinta el header, footer y el contenido de cada página a partir de
 * data.js (misma lógica que el sitio de EPW: una sola fuente de datos,
 * render por página, menú móvil, transiciones y parallax).
 */
(function () {
  const db = DEFAULT_DB;
  const page = document.body.dataset.page;
  const $ = (id) => document.getElementById(id);

  const ICON = {
    knife: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21 15 9l3 3c1.5-1.5 3-5 1-8-3-2-6.5-.5-8 1l3 3"/><path d="M3 21h4l4-4"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-6 6-9 16-9 0 10-3 16-9 16z"/><path d="M4 20c4-4 7-6 11-8"/></svg>',
    card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 13H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z"/></svg>',
  };

  const NAV = [
    ["index.html", "home", "Inicio"],
    ["ofertas.html", "ofertas", "Ofertas"],
    ["departamentos.html", "departamentos", "Departamentos"],
    ["nosotros.html", "nosotros", "Nosotros"],
    ["contacto.html", "contacto", "Contacto"],
  ];

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function fmtDate(iso) {
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("es-PR", { weekday: "long", day: "numeric", month: "long" });
  }

  function priceTagHTML(price, unit, extra) {
    const [whole, cents] = Number(price).toFixed(2).split(".");
    return `<div class="price-tag ${extra || ""}"><span class="label">Precio</span><span class="amount"><sup>$</sup>${whole}<sup>.${cents}</sup></span><span class="unit">${unit === "lb" ? "por libra" : esc(unit)}</span></div>`;
  }

  /* ---------------- Header y footer (todas las páginas) ---------------- */
  function renderChrome() {
    const links = NAV.map(([href, key, label]) => `<a href="${href}" class="${key === page ? "active" : ""}">${label}</a>`).join("");
    $("siteHeader").innerHTML = `
      <div class="header-inner">
        <a class="brand" href="index.html" aria-label="${esc(db.site.brand)} — Inicio"><img src="assets/logo.jpg" alt="" /><span>${esc(db.site.brand)}</span></a>
        <nav class="main-nav" aria-label="Navegación principal">${links}</nav>
        <div class="header-actions">
          <a class="btn btn-orange header-call" href="contacto.html">${ICON.bag} Encargar</a>
          <button class="hamburger" id="hamburgerBtn" type="button" aria-label="Abrir menú" aria-expanded="false"><span></span><span></span><span></span></button>
        </div>
      </div>
      <nav class="mobile-nav" id="mobileNav" aria-label="Navegación móvil">${links}</nav>`;

    $("siteFooter").innerHTML = `
      <div class="container footer-inner">
        <a class="brand" href="index.html" aria-label="Inicio"><img src="assets/logo.jpg" alt="${esc(db.site.brand)}" /></a>
        <nav class="footer-links" aria-label="Pie de página">${NAV.map(([h, , l]) => `<a href="${h}">${l}</a>`).join("")}</nav>
        <div class="socials">
          <a href="${db.site.instagramUrl}" aria-label="Instagram" target="_blank" rel="noopener">${ICON.ig}</a>
          <a href="${db.site.facebookUrl}" aria-label="Facebook" target="_blank" rel="noopener">${ICON.fb}</a>
        </div>
        <p class="footer-legal">
          <span>© ${new Date().getFullYear()} ${esc(db.site.legalName)}. Todos los derechos reservados.</span>
          <a class="powered-by" href="${db.credit.url}" target="_blank" rel="noopener"><span>Powered by</span><img src="assets/tryhard-logo.png" alt="" /><strong>${esc(db.credit.name)}</strong></a>
        </p>
      </div>`;

    const btn = $("hamburgerBtn"), nav = $("mobileNav");
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
  }

  /* ---------------- Inicio ---------------- */
  function renderHome() {
    const s = db.site, f = db.featured;
    $("heroEyebrow").textContent = s.heroEyebrow;
    $("heroTitle").textContent = s.heroTitle;
    $("heroSubtitle").textContent = s.heroSubtitle;

    const words = ["Corte al momento", "Pernil", "Chuleta", "Bistec", "Pollo fresco", "Viandas del país", "Encargos", "ATH Móvil"];
    const run = words.map((w) => `<span>${w}</span>`).join("");
    $("ticker").innerHTML = `<div class="ticker-track">${run}${run}</div>`;

    $("featuredBlock").innerHTML = `
      <div>
        <span class="eyebrow">${esc(f.eyebrow)}</span>
        <h2>${esc(f.name)}</h2>
        <p>${esc(f.detail)}</p>
        <p class="valid">Válido hasta el ${fmtDate(f.validUntil)}</p>
      </div>
      ${priceTagHTML(f.price, f.unit, "lg")}`;

    $("deptPreview").innerHTML = db.departments.slice(0, 3).map(deptCardHTML).join("");

    const o = db.orders;
    $("ordersEyebrow").textContent = o.eyebrow;
    $("ordersTitle").textContent = o.title;
    $("ordersBody").textContent = o.body;
    $("ordersSteps").innerHTML = o.steps.map(([t, d]) => `<li><div><strong>${esc(t)}</strong><span>${esc(d)}</span></div></li>`).join("");
  }

  /* ---------------- Departamentos ---------------- */
  function deptCardHTML(d) {
    return `<button class="dept-card reveal" type="button" data-dept="${d.id}">
      <div class="dept-media speckle"><b>${esc(d.name.split(" ")[0])}</b><small>Espacio para foto del departamento</small></div>
      <div class="dept-body"><h3>${esc(d.name)}</h3><p>${esc(d.short)}</p></div>
    </button>`;
  }
  function renderDepartments() {
    $("deptGrid").innerHTML = db.departments.map(deptCardHTML).join("");
  }
  function openDept(id) {
    const d = db.departments.find((x) => x.id === id);
    if (!d) return;
    $("modalBody").innerHTML = `<h3 id="modalTitle">${esc(d.name)}</h3><p>${esc(d.body)}</p><ul>${d.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
    $("deptModal").classList.add("open");
    $("modalClose").focus();
  }

  /* ---------------- Ofertas ---------------- */
  function renderOffers() {
    $("offerGrid").innerHTML = db.offers.map((o) => `
      <article class="offer reveal ${o.hot ? "hot" : ""}">
        ${o.hot ? '<span class="hot-badge">Especial</span>' : ""}
        <div>
          <span class="dept">${esc(o.dept)}</span>
          <h3>${esc(o.name)}</h3>
          <p>${esc(o.detail)}</p>
          <p class="valid">Hasta el ${fmtDate(o.validUntil)}</p>
        </div>
        ${priceTagHTML(o.price, o.unit)}
      </article>`).join("");
  }

  /* ---------------- Nosotros ---------------- */
  function renderAbout() {
    const s = db.site;
    $("aboutEyebrow").textContent = s.aboutEyebrow;
    $("aboutTitle").textContent = s.aboutTitle;
    $("aboutBody").innerHTML = s.aboutBody.map((p) => `<p>${esc(p)}</p>`).join("");
    $("aboutStats").innerHTML = s.aboutStats.map(([a, b]) => `<div><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`).join("");
  }

  /* ---------------- Contacto ---------------- */
  function renderContact() {
    const s = db.site;
    $("contactEyebrow").textContent = s.contactEyebrow;
    $("contactTitle").textContent = s.contactTitle;
    $("contactSubtitle").textContent = s.contactSubtitle;
    $("contactTags").innerHTML = s.contactTags.map((t) => `<li>${esc(t)}</li>`).join("");
    $("cf_interest").insertAdjacentHTML("beforeend", s.contactFormOptions.map((o) => `<option>${esc(o)}</option>`).join(""));
    $("infoList").innerHTML = `
      <li>${ICON.pin}<div><strong>Dirección</strong><span>${esc(s.address)}<br>${esc(s.location)}</span></div></li>
      <li>${ICON.phone}<div><strong>Teléfono</strong><span>${esc(s.phone)}</span></div></li>
      <li>${ICON.mail}<div><strong>Email</strong><span>${esc(s.email)}</span></div></li>
      <li>${ICON.clock}<div><strong>Horario</strong>${s.hours.map(([d, h]) => `<span class="hours-row"><span>${esc(d)}</span><span>${esc(h)}</span></span>`).join("")}</div></li>
      <li>${ICON.card}<div><strong>Formas de pago</strong><span>${esc(s.payments)}</span></div></li>`;
    $("ctaEyebrow").textContent = s.ctaEyebrow;
    $("ctaTitle").textContent = s.ctaTitle;
    $("ctaSubtitle").textContent = s.ctaSubtitle;
    $("ctaButton").textContent = s.ctaButtonLabel;

    $("contactForm").addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      e.target.querySelectorAll("[required]").forEach((el) => {
        const bad = !el.value.trim() || (el.type === "email" && !/^\S+@\S+\.\S+$/.test(el.value));
        el.closest(".form-field").classList.toggle("invalid", bad);
        if (bad) ok = false;
      });
      if (!ok) return showToast("Completa los campos marcados para enviar.");
      e.target.reset();
      showToast("Mensaje listo. En la versión final llegará al email del negocio.");
    });
  }

  /* ---------------- Utilidades ---------------- */
  function showToast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => t.classList.remove("show"), 3200);
  }

  function wireModal() {
    const m = $("deptModal");
    if (!m) return;
    document.addEventListener("click", (e) => {
      const card = e.target.closest("[data-dept]");
      if (card) openDept(card.dataset.dept);
      if (e.target === m || e.target.closest("#modalClose")) m.classList.remove("open");
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") m.classList.remove("open"); });
  }

  /* Precarga la página al pasar el dedo o el mouse por un enlace,
     así cuando haces clic ya está lista. */
  function wireTransitions() {
    const done = new Set([location.pathname.split("/").pop() || "index.html"]);
    const prefetch = (e) => {
      const a = e.target.closest && e.target.closest("a[href$='.html']");
      if (!a) return;
      const href = a.getAttribute("href");
      if (done.has(href)) return;
      done.add(href);
      const l = document.createElement("link");
      l.rel = "prefetch"; l.href = href;
      document.head.appendChild(l);
    };
    document.addEventListener("pointerover", prefetch, { passive: true });
    document.addEventListener("touchstart", prefetch, { passive: true });
  }

  function wireParallax() {
    const els = document.querySelectorAll("[data-parallax]");
    if (!els.length || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    const update = () => {
      els.forEach((el) => (el.style.transform = `translateY(${window.scrollY * parseFloat(el.dataset.parallax)}px)`));
      ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  }

  function wireReveal() {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.remove("pre"); io.unobserve(en.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add("pre"); io.observe(el); }
    });
  }

  /* ---------------- Arranque ---------------- */
  renderChrome();
  ({ home: renderHome, ofertas: renderOffers, departamentos: renderDepartments, nosotros: renderAbout, contacto: renderContact }[page] || (() => {}))();
  wireModal();
  wireTransitions();
  wireParallax();
  wireReveal();
  const loader = $("pageLoader");
  if (loader) requestAnimationFrame(() => loader.classList.add("hidden"));
})();
