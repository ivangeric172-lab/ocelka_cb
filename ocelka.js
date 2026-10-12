// Спільне для всіх сторінок: дані каталогу, шапка, меню, пошук, вибір мови, футер.
// Підключати першим рядком у <body>: шапка вставляється одразу, без «стрибка» сторінки.
// Коли буде сервер на Java, CATS та ITEMS прийдуть як JSON, а шапку й футер віддаватиме шаблон.
const Ocelka = (() => {
  const PHONE = "+421 900 000 000", PHONE_TEL = "+421900000000", MAIL = "dielna@ocelka.sk";

  const CATS = [
    { id:"stoly", name:"Stoly", sub:"Pracovné, gastro, na mieru", icon:'<rect x="6" y="10" width="40" height="4"/><rect x="9" y="14" width="3" height="20"/><rect x="40" y="14" width="3" height="20"/><path d="M12 27h28"/>' },
    { id:"nohy", name:"Nohy na stôl", sub:"Výška 400 až 1050 mm, hranaté aj okrúhle", page:"nohy-na-stol.html", icon:'<rect x="14" y="4" width="6" height="30"/><rect x="32" y="4" width="6" height="30"/><path d="M11 34h12M29 34h12M14 8h24"/>' },
    { id:"drezy", name:"Drezy a umývadlá", sub:"Jednodielne, dvojdielne, s pedálom", icon:'<path d="M4 12h44"/><path d="M10 12v12h32V12"/><path d="M26 4v6M22 4h8"/>' },
    { id:"odkvapy", name:"Odkvapy a klampiarske prvky", sub:"Žľaby, zvody, oplechovanie", icon:'<path d="M4 10h44"/><path d="M8 10c0 8 6 12 12 12h12c6 0 12-4 12-12"/><rect x="34" y="22" width="6" height="14"/>' },
    { id:"diely", name:"Diely z nerezu", sub:"Konzoly, kryty, diely podľa výkresu", icon:'<path d="M8 32V10h12v10h24v12z"/><circle cx="14" cy="16" r="2"/><circle cx="38" cy="26" r="2"/>' },
    { id:"hadice", name:"Hadice a armatúry", sub:"Kovové hadice, príruby, ventily", icon:'<path d="M6 22c10-14 30-14 40 0" stroke-dasharray="2 2"/><rect x="2" y="18" width="6" height="10"/><rect x="44" y="18" width="6" height="10"/>' },
  ];

  // Ukážkové údaje. Polia pri nohách slúžia len na zobrazenie, nie sú to návrh dátového modelu.
  const ITEMS = [
    { id:"s-1200", name:"Stôl S-1200", dim:"1200 × 600 × 900 mm", cat:"stoly" },
    { id:"s-1600", name:"Stôl S-1600 s policou", dim:"1600 × 700 × 900 mm", cat:"stoly" },
    { id:"s-gastro", name:"Gastro stôl s lemom", dim:"na mieru", cat:"stoly" },
    { id:"ns-400-h", name:"Noha NS-400 konferenčná", dim:"40 × 40 × 400 mm", cat:"nohy", shape:"h", prof:"40 × 40 × 2", h:400, foot:"pevná pätka", price:18, av:"ok" },
    { id:"ns-720-h", name:"Noha NS-720 hranatá", dim:"60 × 60 × 720 mm", cat:"nohy", shape:"h", prof:"60 × 60 × 2", h:720, foot:"nastaviteľná M10, +15 mm", price:24, av:"ok" },
    { id:"ns-720-o", name:"Noha NS-720 okrúhla", dim:"Ø 60 × 720 mm", cat:"nohy", shape:"o", prof:"Ø 60 × 2", h:720, foot:"nastaviteľná M10, +15 mm", price:26, av:"ok" },
    { id:"ns-870-h", name:"Noha NS-870 pracovná", dim:"60 × 60 × 870 mm", cat:"nohy", shape:"h", prof:"60 × 60 × 2", h:870, foot:"nastaviteľná M10, +15 mm", price:28, av:"ord" },
    { id:"ns-1050-h", name:"Noha NS-1050 barová", dim:"60 × 60 × 1050 mm", cat:"nohy", shape:"h", prof:"60 × 60 × 2", h:1050, foot:"nastaviteľná M10, +15 mm", price:32, av:"ord" },
    { id:"ns-1050-o", name:"Noha NS-1050 barová okrúhla", dim:"Ø 76 × 1050 mm", cat:"nohy", shape:"o", prof:"Ø 76 × 2", h:1050, foot:"kruhová päta Ø 400 mm", price:89, av:"no" },
    { id:"r-1400", name:"Rám stola R-1400", dim:"1400 × 700 × 720 mm", cat:"nohy", shape:"h", prof:"40 × 40 × 2", h:720, foot:"4 nohy, nastaviteľné", price:145, av:"ord", frame:true },
    { id:"d-1", name:"Drez jednodielny", dim:"500 × 400 × 250 mm", cat:"drezy" },
    { id:"d-2", name:"Drez dvojdielny", dim:"1000 × 500 mm", cat:"drezy" },
    { id:"u-ped", name:"Umývadlo na ruky s pedálom", dim:"400 × 300 mm", cat:"drezy" },
    { id:"o-zlab", name:"Odkvapový žľab", dim:"125 mm", cat:"odkvapy" },
    { id:"o-zvod", name:"Zvodová rúra", dim:"Ø 100 mm", cat:"odkvapy" },
    { id:"o-atika", name:"Oplechovanie atiky", dim:"rš 330 mm", cat:"odkvapy" },
    { id:"k-40", name:"Konzola K-40", dim:"40 × 40 × 3 mm", cat:"diely" },
    { id:"kryt", name:"Kryt podľa výkresu", dim:"na mieru", cat:"diely" },
    { id:"h-dn25", name:"Kovová hadica DN25", dim:"DN25 · PN16", cat:"hadice" },
    { id:"p-dn50", name:"Príruba DN50", dim:"DN50 · PN16", cat:"hadice" },
    { id:"v-1", name:"Guľový ventil 1\"", dim:"DN25", cat:"hadice" },
  ];
  const AV = { ok:"Na sklade", ord:"Na objednávku", no:"Momentálne nevyrábame" };

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
  const cat = id => CATS.find(c => c.id === id);
  const item = id => ITEMS.find(i => i.id === id);
  // Na serveri "./" otvorí index.html; pri otvorení súboru z disku treba názov súboru.
  const HOME = location.protocol === "file:" ? "index.html" : "./";
  const page = document.body.dataset.page || "";
  const home = hash => (page === "home" ? "" : HOME) + hash;
  // Kam vedie výrobok: nohy majú stránku kategórie, ostatné zatiaľ len dopyt.
  const itemHref = it => cat(it.cat).page ? `${cat(it.cat).page}#${it.id}` : `dopyt.html#p-${it.id}`;
  const euro = n => n.toLocaleString("sk-SK", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }) + " €";

  const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <symbol id="i-phone" viewBox="0 0 20 20"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M5 2.5h3l1.5 4-2 1.2a10 10 0 0 0 4.8 4.8l1.2-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A15 15 0 0 1 3.5 4.1 1.5 1.5 0 0 1 5 2.5z"/></symbol>
    <symbol id="i-globe" viewBox="0 0 20 20"><g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="10" r="7.5"/><path d="M2.5 10h15M10 2.5c2.5 2.6 2.5 12.4 0 15M10 2.5c-2.5 2.6-2.5 12.4 0 15"/></g></symbol>
    <symbol id="i-search" viewBox="0 0 20 20"><g fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M12.5 12.5l5 5"/></g></symbol>
    <symbol id="i-menu" viewBox="0 0 20 20"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M3 5.5h14M3 10h14M3 14.5h14"/></symbol>
    <symbol id="i-close" viewBox="0 0 20 20"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M4.5 4.5l11 11M15.5 4.5l-11 11"/></symbol>
    <symbol id="i-arr" viewBox="0 0 20 20"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M3 10h13M11 5l5 5-5 5"/></symbol>
    <symbol id="i-file" viewBox="0 0 20 20"><path fill="none" stroke="currentColor" stroke-width="1.5" d="M5 2.5h7l3 3v12H5zM12 2.5v3h3"/></symbol>
    <symbol id="i-wa" viewBox="0 0 20 20"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M3.2 16.8l1-3.4A7.3 7.3 0 1 1 6.6 15.9z"/><path d="M7.4 6.6c.3 2.8 2.8 5.5 5.9 6l.9-1.6-1.8-.9-.8.8a4.6 4.6 0 0 1-2.4-2.4l.8-.8-.9-1.8z"/></g></symbol>
    <symbol id="mark" viewBox="0 0 30 30"><g fill="none" stroke="currentColor"><rect x="2" y="2" width="26" height="26" stroke-width="2.4"/><rect x="8" y="8" width="14" height="14" stroke-width="1.4"/><path d="M2 2l6 6M28 2l-6 6M2 28l6-6M28 28l-6-6" stroke-width="1"/></g></symbol>
  </defs></svg>`;
  const ICON = id => `<svg class="icon" aria-hidden="true"><use href="#${id}"/></svg>`;
  const BRAND = `<svg aria-hidden="true"><use href="#mark"/></svg>Ocelka`;
  const OV_TOP = `<div class="ov-top"><div class="wrap"><span class="brand">${BRAND}</span><button class="close" type="button" data-close>${ICON("i-close")}Zavrieť</button></div></div>`;
  const LANGS = [["sk","Slovenčina"],["cz","Čeština"],["de","Deutsch"],["en","English"]];

  // ---- Шапка, меню, пошук: вставляються одразу після <script> ----
  document.currentScript.insertAdjacentHTML("afterend", `${SPRITE}
<div class="demo">Ukážka dizajnu · fiktívna firma Ocelka</div>
<header class="top"><div class="wrap">
  <a class="brand" href="${home("#top")}" aria-label="Ocelka, domov">${BRAND}</a>
  <a class="tb call-top" href="tel:${PHONE_TEL}">${ICON("i-phone")}<span class="lbl">${PHONE}</span></a>
  <div class="lang">
    <button class="tb" id="lang-btn" type="button" aria-expanded="false" aria-controls="lang-pop" aria-label="Jazyk: slovenčina">${ICON("i-globe")}<span class="lbl">SK</span></button>
    <div class="lang-pop" id="lang-pop" hidden>
      <ul class="lang-list">${LANGS.map(([k, n]) => `<li><button type="button" data-lang="${k}"${k === "sk" ? ' aria-current="true"' : ""}>${n} <small>${k.toUpperCase()}</small></button></li>`).join("")}</ul>
      <p class="lang-msg" id="lang-msg" role="status" hidden></p>
    </div>
  </div>
  <button class="tb" id="search-btn" type="button" aria-label="Hľadať">${ICON("i-search")}</button>
  <button class="tb menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="menu">${ICON("i-menu")}<span class="lbl">Menu</span></button>
</div></header>
<div class="overlay" id="menu" hidden role="dialog" aria-modal="true" aria-label="Menu">${OV_TOP}<div class="wrap"><ul class="acc" id="acc"></ul></div></div>
<div class="overlay" id="search" hidden role="dialog" aria-modal="true" aria-label="Hľadať">${OV_TOP}<div class="wrap">
  <div class="search-box"><label for="q">Čo hľadáte?</label><input id="q" type="search" placeholder="napr. noha 720, drez, DN25" autocomplete="off"></div>
  <ul class="results" id="results" aria-live="polite"></ul>
</div></div>`);

  // Меню: категорія без сторінки — не посилання, а рядок «pripravujeme»
  const catLink = c => c.page
    ? `<li><a href="${c.page}" data-close>${esc(c.name)}<span>›</span></a></li>`
    : `<li><span class="soon">${esc(c.name)}<small>pripravujeme</small></span></li>`;
  const MENU = [
    { t:"Výrobky", sub: CATS.map(catLink).join("") },
    { t:"Pre firmy", sub: [["Sériová výroba", home("#firmy")], ["Poslať výkres", "dopyt.html#firma"]].map(s => `<li><a href="${s[1]}" data-close>${s[0]}<span>›</span></a></li>`).join("") },
    { t:"Jeden kus na zákazku", sub: [["Ako to funguje", home("#zakazka")], ["Poslať fotku", "dopyt.html#sukromne"]].map(s => `<li><a href="${s[1]}" data-close>${s[0]}<span>›</span></a></li>`).join("") },
    { t:"Realizácie", href: home("#realizacie") },
    { t:"O nás", href: home("#onas") },
    { t:"Kontakt", href: "#kontakt" },
  ];
  const openFirst = page !== "dopyt";
  const acc = document.getElementById("acc");
  acc.innerHTML = MENU.map((m, i) => {
    const open = openFirst && i === 0;
    return m.sub
      ? `<li style="--i:${i}"><button class="acc-btn" type="button" aria-expanded="${open}" aria-controls="acc-${i}">${m.t}<span class="pm" aria-hidden="true"></span></button>
         <div class="acc-panel${open ? " open" : ""}" id="acc-${i}"${open ? "" : " inert"}><div><ul class="acc-sub">${m.sub}</ul></div></div></li>`
      : `<li style="--i:${i}"><a class="acc-link" href="${m.href}" data-close>${m.t}<span class="pm" aria-hidden="true">›</span></a></li>`;
  }).join("");
  acc.addEventListener("click", e => {
    const b = e.target.closest(".acc-btn");
    if (!b) return;
    const open = b.getAttribute("aria-expanded") === "true";
    const panel = document.getElementById(b.getAttribute("aria-controls"));
    b.setAttribute("aria-expanded", String(!open));
    panel.classList.toggle("open", !open);
    panel.inert = open; // закритий пункт не ловить Tab і не читається екранним читачем
  });

  // Оверлеї: анімація відкриття/закриття + пастка фокусу
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';
  let lastFocus = null, current = null, hideTimer = 0;
  const menuBtn = document.getElementById("menu-btn");
  function openOv(id) {
    clearTimeout(hideTimer);
    lastFocus = document.activeElement;
    current = document.getElementById(id);
    current.hidden = false;
    current.getBoundingClientRect(); // спершу намалювати закритий стан, тоді анімувати
    current.classList.add("open");
    // Усе, що під оверлеєм, стає недосяжним для Tab і екранного читача
    for (const el of document.body.children) if (el !== current && !el.inert && el.tagName !== "SCRIPT") { el.inert = true; el.dataset.trap = ""; }
    document.body.style.overflow = "hidden";
    if (id === "menu") menuBtn.setAttribute("aria-expanded", "true");
    if (id === "search") { render(q.value); q.focus(); } else current.querySelector(".close").focus();
  }
  function closeOv() {
    if (!current) return;
    const ov = current;
    current = null;
    ov.classList.remove("open");
    hideTimer = setTimeout(() => { ov.hidden = true; }, reduced() ? 0 : 180);
    document.querySelectorAll("[data-trap]").forEach(el => { el.inert = false; delete el.dataset.trap; });
    document.body.style.overflow = "";
    menuBtn.setAttribute("aria-expanded", "false");
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  menuBtn.addEventListener("click", () => openOv("menu"));
  document.getElementById("search-btn").addEventListener("click", () => openOv("search"));
  document.querySelectorAll(".overlay").forEach(o => o.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeOv(); }));
  // Tab з останнього елемента → на перший, Shift+Tab з першого → на останній
  document.addEventListener("keydown", e => {
    if (e.key !== "Tab" || !current) return;
    const items = [...current.querySelectorAll(FOCUSABLE)].filter(el => !el.closest("[inert]") && el.getClientRects().length);
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || !current.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // Мова: поки є лише SK — кажемо про це, а не мовчимо
  const langBtn = document.getElementById("lang-btn"), langPop = document.getElementById("lang-pop"), langMsg = document.getElementById("lang-msg");
  const closeLang = () => { langPop.hidden = true; langMsg.hidden = true; langBtn.setAttribute("aria-expanded", "false"); };
  langBtn.addEventListener("click", () => {
    if (!langPop.hidden) return closeLang();
    langPop.hidden = false;
    langBtn.setAttribute("aria-expanded", "true");
  });
  langPop.addEventListener("click", e => {
    const b = e.target.closest("[data-lang]");
    if (!b) return;
    if (b.dataset.lang === "sk") return closeLang();
    langMsg.textContent = `${b.firstChild.textContent.trim()}: pripravujeme. Táto verzia je zatiaľ len po slovensky.`;
    langMsg.hidden = false;
  });
  document.addEventListener("click", e => { if (!e.target.closest(".lang")) closeLang(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeOv(); closeLang(); } });

  // Пошук без діакритики: «zlab» знаходить «žľab»
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const q = document.getElementById("q"), results = document.getElementById("results");
  function render(text) {
    const words = norm(text).split(/\s+/).filter(Boolean);
    const list = ITEMS.filter(it => { const hay = norm(`${it.name} ${it.dim} ${cat(it.cat).name}`); return words.every(w => hay.includes(w)); });
    results.innerHTML = list.length
      ? list.map(it => `<li><a href="${itemHref(it)}" data-close><span class="cat">${esc(cat(it.cat).name)}</span><span>${esc(it.name)}</span><span class="dim">${esc(it.dim)}</span></a></li>`).join("")
      : `<li class="empty">Pre „${esc(text.trim())}“ sme nič nenašli. Vyrábame aj na mieru: <a href="dopyt.html" data-close>popíšte, čo potrebujete</a>.</li>`;
  }
  q.addEventListener("input", () => render(q.value));

  // Посилання на головну в статичному HTML (data-home)
  const fixHome = () => document.querySelectorAll("a[data-home]").forEach(a => a.href = home(a.getAttribute("href").replace(/^index\.html/, "")));

  // ---- Футер і нижня панель ----
  document.addEventListener("DOMContentLoaded", () => {
    fixHome();
    document.body.insertAdjacentHTML("beforeend", `
<footer class="foot" id="kontakt"><div class="wrap">
  <span class="brand">${BRAND}</span>
  <div class="fcols">
    <div><h3>Výrobky</h3><ul>${CATS.map(c => c.page ? `<li><a href="${c.page}">${esc(c.name)}</a></li>` : `<li class="soon">${esc(c.name)}</li>`).join("")}</ul></div>
    <div><h3>Spolupráca</h3><ul><li><a href="${home("#firmy")}">Pre firmy</a></li><li><a href="${home("#zakazka")}">Jeden kus na zákazku</a></li><li><a href="${home("#realizacie")}">Realizácie</a></li><li><a href="${home("#onas")}">O nás</a></li></ul></div>
    <div><h3>Kontakt</h3><address><span>Priemyselná 12, 040 01 Košice</span><a href="tel:${PHONE_TEL}">${PHONE}</a><a href="mailto:${MAIL}">${MAIL}</a><span>Po – Pi 7:00 – 15:30</span></address></div>
    <div><h3>Dopyt</h3><ul><li><a href="dopyt.html#firma">Poslať výkres</a></li><li><a href="dopyt.html#sukromne">Poslať fotku</a></li></ul></div>
  </div>
  <p class="legal">Ocelka s.r.o. · IČO 00 000 000 · Zapísaná v Obchodnom registri Mestského súdu Košice, oddiel Sro, vložka č. 00000/V · Ukážkové údaje</p>
</div></footer>
<nav class="dock" aria-label="Rýchly kontakt">
  <a class="d1" href="tel:${PHONE_TEL}">${ICON("i-phone")}Zavolať</a>
  <a href="https://wa.me/${PHONE_TEL.slice(1)}" target="_blank" rel="noopener">${ICON("i-wa")}WhatsApp</a>
</nav>`);
  });

  return { CATS, ITEMS, AV, PHONE, PHONE_TEL, esc, cat, item, itemHref, euro, home, ICON };
})();
