const { useState, useEffect, useMemo } = React;
function go(path) {
  window.location.hash = path.replace(/^#/, "");
  window.scrollTo({ top: 0 });
}
function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash || "#/");
  useEffect(() => {
    const on = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return hash.replace(/^#/, "") || "/";
}
function parseQuery(route) {
  const out = {}, qi = route.indexOf("?");
  if (qi >= 0) new URLSearchParams(route.slice(qi + 1)).forEach((v, k) => {
    out[k] = v;
  });
  return out;
}
const link = (to) => ({ href: "#" + to, onClick: (e) => {
  e.preventDefault();
  go(to);
} });
const TINT = {
  Livre: "green",
  Article: "sand",
  Documentaire: "slate",
  Film: "slate",
  "Vidéo": "slate",
  Podcast: "sand",
  "Personnalité": "rose",
  Association: "green",
  Initiative: "green",
  "Événement": "rose"
};
const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const fmtDate = (iso) => {
  const d = new Date(iso);
  return d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear();
};
const Ic = {
  arrow: () => /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14M13 6l6 6-6 6", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" })),
  arrowL: () => /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M19 12H5M11 6l-6 6 6 6", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" })),
  ext: () => /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M14 5h5v5M19 5l-8 8M17 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h5", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" })),
  search: () => /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "7", stroke: "currentColor", strokeWidth: "1.6" }), /* @__PURE__ */ React.createElement("path", { d: "M16.5 16.5 21 21", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" })),
  burger: () => /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M4 8h16M4 16h16", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" })),
  close: () => /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M6 6l12 12M18 6 6 18", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" })),
  check: () => /* @__PURE__ */ React.createElement("svg", { width: "34", height: "34", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12.5 10 17.5 19 6.5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })),
  x: () => /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" })),
  ig: () => /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "5", stroke: "currentColor", strokeWidth: "1.6" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "4", stroke: "currentColor", strokeWidth: "1.6" }), /* @__PURE__ */ React.createElement("circle", { cx: "17.5", cy: "6.5", r: "1.1", fill: "currentColor" }))
};
let markId = 0;
function Mark({ size = 30, className = "" }) {
  const id = useMemo(() => "amDome" + ++markId, []);
  return /* @__PURE__ */ React.createElement("svg", { className: "mark " + className, width: size, height: size * 1.25, viewBox: "0 0 240 300", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", { id }, /* @__PURE__ */ React.createElement("path", { d: "M78,98 L78,70 C78,38 96,24 120,24 C144,24 162,38 162,70 L162,98 Z" }))), /* @__PURE__ */ React.createElement("circle", { className: "mk-fill", cx: "120", cy: "9", r: "5.5" }), /* @__PURE__ */ React.createElement("rect", { className: "mk-fill", x: "116", y: "11", width: "8", height: "14" }), /* @__PURE__ */ React.createElement("g", { clipPath: "url(#" + id + ")" }, /* @__PURE__ */ React.createElement("rect", { className: "mk-fill", x: "70", y: "20", width: "100", height: "82" }), [90, 104, 118.7, 133, 147].map((x) => /* @__PURE__ */ React.createElement("rect", { key: x, className: "mk-cut", x, y: "22", width: "2.6", height: "80" }))), /* @__PURE__ */ React.createElement("rect", { className: "mk-fill", x: "48", y: "104", width: "42", height: "46" }), /* @__PURE__ */ React.createElement("rect", { className: "mk-fill", x: "96", y: "98", width: "48", height: "52" }), /* @__PURE__ */ React.createElement("rect", { className: "mk-fill", x: "150", y: "104", width: "42", height: "46" }), /* @__PURE__ */ React.createElement("rect", { className: "mk-cut", x: "66", y: "116", width: "6", height: "18", rx: "3" }), /* @__PURE__ */ React.createElement("rect", { className: "mk-cut", x: "104", y: "112", width: "6", height: "22", rx: "3" }), /* @__PURE__ */ React.createElement("rect", { className: "mk-cut", x: "117", y: "112", width: "6", height: "22", rx: "3" }), /* @__PURE__ */ React.createElement("rect", { className: "mk-cut", x: "130", y: "112", width: "6", height: "22", rx: "3" }), /* @__PURE__ */ React.createElement("rect", { className: "mk-cut", x: "168", y: "116", width: "6", height: "18", rx: "3" }), /* @__PURE__ */ React.createElement("rect", { className: "mk-fill", x: "96", y: "150", width: "48", height: "120" }), /* @__PURE__ */ React.createElement("rect", { className: "mk-cut", x: "108", y: "162", width: "6", height: "16", rx: "3" }), /* @__PURE__ */ React.createElement("rect", { className: "mk-cut", x: "126", y: "162", width: "6", height: "16", rx: "3" }), /* @__PURE__ */ React.createElement("path", { className: "mk-cut", d: "M108,232 L108,204 C108,191 132,191 132,204 L132,232 Z" }), /* @__PURE__ */ React.createElement("rect", { className: "mk-cut", x: "96", y: "246", width: "48", height: "4" }), /* @__PURE__ */ React.createElement("rect", { className: "mk-fill", x: "90", y: "270", width: "60", height: "6" }));
}
function Brand({ onDark = false }) {
  return /* @__PURE__ */ React.createElement("a", { className: "brand" + (onDark ? " on-dark" : ""), ...link("/") }, /* @__PURE__ */ React.createElement(Mark, { size: 26, className: onDark ? "on-dark" : "" }), /* @__PURE__ */ React.createElement("span", { className: "brand-name" }, "Al Maktaba"), /* @__PURE__ */ React.createElement("span", { className: "brand-ar", lang: "ar" }, "المكتبة"));
}
function Badge({ kind }) {
  if (kind === "coup-de-coeur") return /* @__PURE__ */ React.createElement("span", { className: "ribbon coup" }, "Coup de cœur");
  if (kind === "a-decouvrir") return /* @__PURE__ */ React.createElement("span", { className: "ribbon dec" }, "À découvrir");
  return null;
}
function Cover({ r, big = false }) {
  const isEvent = r.type === "Événement" && r.eventDate;
  const d = isEvent ? new Date(r.eventDate) : null;
  return /* @__PURE__ */ React.createElement("div", { className: "cover" + (big ? " big" : ""), "data-tint": TINT[r.type] || "sand" }, /* @__PURE__ */ React.createElement("div", { className: "cover-frame" }, /* @__PURE__ */ React.createElement("div", { className: "cover-type" }, r.type, r.year && !isEvent ? " · " + r.year : ""), isEvent ? /* @__PURE__ */ React.createElement("div", { className: "cover-date" }, /* @__PURE__ */ React.createElement("span", { className: "d" }, d.getDate()), /* @__PURE__ */ React.createElement("span", { className: "m" }, MONTHS[d.getMonth()], " ", d.getFullYear())) : null, /* @__PURE__ */ React.createElement("div", { className: "cover-title" }, r.title), r.author ? /* @__PURE__ */ React.createElement("div", { className: "cover-author" }, r.author) : null, /* @__PURE__ */ React.createElement(Mark, { size: 14, className: "cover-mark" })), big && /* @__PURE__ */ React.createElement(Badge, { kind: r.editorial }));
}
function Card({ r }) {
  return /* @__PURE__ */ React.createElement("a", { className: "card", ...link("/ressource/" + r.id), "aria-label": r.title + (r.author ? ", " + r.author : "") }, /* @__PURE__ */ React.createElement(Cover, { r }));
}
function Header({ route }) {
  const [open, setOpen] = useState(false);
  const base = route.split("?")[0];
  const on = (p) => p === "/bibliotheque" ? base.startsWith("/bibliotheque") || base.startsWith("/categorie") || base.startsWith("/ressource") : base.startsWith(p);
  const NAV = [["/bibliotheque", "Bibliothèque"], ["/a-propos", "À propos"]];
  return /* @__PURE__ */ React.createElement("header", { className: "site-head" }, /* @__PURE__ */ React.createElement("div", { className: "wrap head-inner" }, /* @__PURE__ */ React.createElement(Brand, null), /* @__PURE__ */ React.createElement("nav", { className: "head-nav", "aria-label": "Navigation" }, NAV.map(([to, l]) => /* @__PURE__ */ React.createElement("a", { key: to, className: "navlink" + (on(to) ? " active" : ""), ...link(to) }, l)), /* @__PURE__ */ React.createElement("a", { className: "btn btn-primary", ...link("/soumettre") }, "Proposer")), /* @__PURE__ */ React.createElement("button", { className: "burger", "aria-label": "Menu", onClick: () => setOpen(true) }, /* @__PURE__ */ React.createElement(Ic.burger, null))), open && /* @__PURE__ */ React.createElement("div", { className: "drawer", onClick: () => setOpen(false) }, /* @__PURE__ */ React.createElement("div", { className: "drawer-panel", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("button", { className: "burger", "aria-label": "Fermer", onClick: () => setOpen(false) }, /* @__PURE__ */ React.createElement(Ic.close, null)), [["/", "Accueil"], ...NAV, ["/soumettre", "Proposer une ressource"]].map(([to, l]) => /* @__PURE__ */ React.createElement("a", { key: to, className: "drawer-link", href: "#" + to, onClick: (e) => {
    e.preventDefault();
    setOpen(false);
    go(to);
  } }, l)))));
}
function Footer() {
  return /* @__PURE__ */ React.createElement("footer", { className: "site-foot" }, /* @__PURE__ */ React.createElement("div", { className: "wrap foot-inner" }, /* @__PURE__ */ React.createElement("div", { className: "foot-brand" }, /* @__PURE__ */ React.createElement(Brand, { onDark: true }), /* @__PURE__ */ React.createElement("p", { className: "foot-devise" }, "Pour une élévation ", /* @__PURE__ */ React.createElement("em", null, "spirituelle, culturelle, intellectuelle."))), /* @__PURE__ */ React.createElement("nav", { className: "foot-links", "aria-label": "Liens" }, /* @__PURE__ */ React.createElement("a", { ...link("/bibliotheque") }, "La bibliothèque"), /* @__PURE__ */ React.createElement("a", { ...link("/soumettre") }, "Proposer une ressource"), /* @__PURE__ */ React.createElement("a", { ...link("/a-propos") }, "À propos")), /* @__PURE__ */ React.createElement("div", { className: "social" }, /* @__PURE__ */ React.createElement("a", { href: "https://x.com/al_maydan__", target: "_blank", rel: "noopener", "aria-label": "Al Maydan sur X" }, /* @__PURE__ */ React.createElement(Ic.x, null)), /* @__PURE__ */ React.createElement("a", { href: "https://instagram.com/al_maydan_", target: "_blank", rel: "noopener", "aria-label": "Al Maydan sur Instagram" }, /* @__PURE__ */ React.createElement(Ic.ig, null)))), /* @__PURE__ */ React.createElement("div", { className: "wrap foot-bottom" }, /* @__PURE__ */ React.createElement("span", null, "Une initiative d'Al Maydan"), /* @__PURE__ */ React.createElement("span", { lang: "ar" }, "المكتبة · الميدان")));
}
function HomePage() {
  const { resources, TYPES, TYPE_PLURAL } = window.AM;
  const featured = resources.find((r) => r.featured) || resources[0];
  const coups = resources.filter((r) => r.editorial === "coup-de-coeur" && r.id !== featured.id).slice(0, 4);
  const counts = {};
  resources.forEach((r) => {
    counts[r.type] = (counts[r.type] || 0) + 1;
  });
  return /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("section", { className: "wrap hero" }, /* @__PURE__ */ React.createElement("div", { className: "hero-text" }, /* @__PURE__ */ React.createElement("p", { className: "kicker" }, /* @__PURE__ */ React.createElement("span", { lang: "ar" }, "المكتبة"), " · la bibliothèque d'Al Maydan"), /* @__PURE__ */ React.createElement("h1", { className: "hero-h" }, "Le savoir,", /* @__PURE__ */ React.createElement("br", null), "en ", /* @__PURE__ */ React.createElement("em", null, "partage"), "."), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "Des livres, des films, des voix et des initiatives, choisis et partagés pour nourrir l'esprit et le cœur."), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("a", { className: "btn btn-primary btn-lg", ...link("/bibliotheque") }, "Explorer ", /* @__PURE__ */ React.createElement(Ic.arrow, null)), /* @__PURE__ */ React.createElement("a", { className: "btn btn-quiet btn-lg", ...link("/soumettre") }, "Proposer une ressource"))), /* @__PURE__ */ React.createElement("a", { className: "hero-feature", ...link("/ressource/" + featured.id) }, /* @__PURE__ */ React.createElement("span", { className: "kicker" }, "À la une"), /* @__PURE__ */ React.createElement(Cover, { r: featured, big: true }))), /* @__PURE__ */ React.createElement("nav", { className: "wrap shelf", "aria-label": "Parcourir par type" }, TYPES.filter((t) => counts[t]).map((t) => /* @__PURE__ */ React.createElement("a", { key: t, className: "shelf-item", ...link("/bibliotheque?type=" + encodeURIComponent(t)) }, /* @__PURE__ */ React.createElement("span", { className: "dot", "data-tint": TINT[t] }), TYPE_PLURAL[t], /* @__PURE__ */ React.createElement("sup", null, counts[t])))), coups.length > 0 && /* @__PURE__ */ React.createElement("section", { className: "wrap section" }, /* @__PURE__ */ React.createElement("div", { className: "section-head" }, /* @__PURE__ */ React.createElement("h2", null, "Coups de cœur"), /* @__PURE__ */ React.createElement("a", { className: "more", ...link("/bibliotheque") }, "Toute la bibliothèque ", /* @__PURE__ */ React.createElement(Ic.arrow, null))), /* @__PURE__ */ React.createElement("div", { className: "grid" }, coups.map((r) => /* @__PURE__ */ React.createElement(Card, { key: r.id, r })))), /* @__PURE__ */ React.createElement("section", { className: "devise" }, /* @__PURE__ */ React.createElement("div", { className: "wrap" }, /* @__PURE__ */ React.createElement(Mark, { size: 40, className: "on-dark" }), /* @__PURE__ */ React.createElement("p", null, "Pour une élévation ", /* @__PURE__ */ React.createElement("em", null, "spirituelle, culturelle, intellectuelle.")))), /* @__PURE__ */ React.createElement("section", { className: "wrap section contribute" }, /* @__PURE__ */ React.createElement("h2", null, "La bibliothèque grandit avec vous."), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "Un livre, un film, une association qui élève ? Proposez-le : chaque suggestion est relue avant d'entrer dans le fonds."), /* @__PURE__ */ React.createElement("a", { className: "btn btn-primary btn-lg", ...link("/soumettre") }, "Proposer une ressource ", /* @__PURE__ */ React.createElement(Ic.arrow, null))));
}
function LibraryPage({ route }) {
  const { resources, TYPES, TYPE_PLURAL, THEMES } = window.AM;
  const qp = parseQuery(route);
  const fromPath = route.startsWith("/categorie/") ? decodeURIComponent(route.split("/")[2].split("?")[0]) : null;
  const [q, setQ] = useState(qp.q || "");
  const [type, setType] = useState(fromPath || qp.type || "");
  const [theme, setTheme] = useState(qp.theme || "");
  useEffect(() => {
    setType(fromPath || qp.type || "");
    setTheme(qp.theme || "");
  }, [route]);
  const list = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return resources.filter(
      (r) => (!type || r.type === type) && (!theme || r.themes.includes(theme)) && (!ql || (r.title + " " + r.author + " " + r.description + " " + r.themes.join(" ")).toLowerCase().includes(ql))
    ).sort((a, b) => a.dateAdded < b.dateAdded ? 1 : -1);
  }, [resources, q, type, theme]);
  const present = TYPES.filter((t) => resources.some((r) => r.type === t));
  return /* @__PURE__ */ React.createElement("main", { className: "wrap page" }, /* @__PURE__ */ React.createElement("div", { className: "page-head" }, /* @__PURE__ */ React.createElement("h1", null, "La bibliothèque"), /* @__PURE__ */ React.createElement("p", { className: "lede" }, resources.length, " ressources choisies par la communauté et relues par l'équipe d'Al Maydan.")), /* @__PURE__ */ React.createElement("div", { className: "lib-bar" }, /* @__PURE__ */ React.createElement("label", { className: "search" }, /* @__PURE__ */ React.createElement(Ic.search, null), /* @__PURE__ */ React.createElement("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Un titre, un auteur, une idée…", "aria-label": "Rechercher" })), /* @__PURE__ */ React.createElement("select", { className: "select", value: theme, onChange: (e) => setTheme(e.target.value), "aria-label": "Thème" }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Tous les thèmes"), THEMES.map((t) => /* @__PURE__ */ React.createElement("option", { key: t, value: t }, t)))), /* @__PURE__ */ React.createElement("div", { className: "pills", role: "group", "aria-label": "Type" }, /* @__PURE__ */ React.createElement("button", { className: "pill" + (!type ? " on" : ""), onClick: () => setType("") }, "Tout"), present.map((t) => /* @__PURE__ */ React.createElement("button", { key: t, className: "pill" + (type === t ? " on" : ""), onClick: () => setType(type === t ? "" : t) }, TYPE_PLURAL[t]))), list.length ? /* @__PURE__ */ React.createElement("div", { className: "grid lib-grid" }, list.map((r) => /* @__PURE__ */ React.createElement(Card, { key: r.id, r }))) : /* @__PURE__ */ React.createElement("div", { className: "empty" }, /* @__PURE__ */ React.createElement("p", { className: "empty-h" }, "Rien ne correspond pour l'instant."), /* @__PURE__ */ React.createElement("button", { className: "btn btn-quiet", onClick: () => {
    setQ("");
    setType("");
    setTheme("");
  } }, "Tout afficher")));
}
function DetailPage({ route }) {
  const { resources } = window.AM;
  const r = resources.find((x) => x.id === route.split("/")[2]);
  if (!r) return /* @__PURE__ */ React.createElement("main", { className: "wrap page empty" }, /* @__PURE__ */ React.createElement("p", { className: "empty-h" }, "Ressource introuvable."), /* @__PURE__ */ React.createElement("a", { className: "btn btn-quiet", ...link("/bibliotheque") }, "Retour à la bibliothèque"));
  const related = resources.filter((x) => x.id !== r.id && x.themes.some((t) => r.themes.includes(t))).slice(0, 4);
  const facts = [
    ["Année", r.year],
    r.eventDate ? ["Date", fmtDate(r.eventDate)] : null,
    ["Durée", r.duration],
    ["Langue", r.lang],
    ["Éditeur", r.publisher],
    r.place ? ["Lieu", r.place] : null
  ].filter((x) => x && x[1]).slice(0, 4);
  const extLabel = { Livre: "Se procurer le livre", "Vidéo": "Regarder", Film: "Voir la fiche du film", Documentaire: "Voir le documentaire", Podcast: "Écouter", "Personnalité": "En savoir plus", Article: "Lire l'article" }[r.type] || "Accéder à la ressource";
  return /* @__PURE__ */ React.createElement("main", { className: "wrap page" }, /* @__PURE__ */ React.createElement("a", { className: "back", ...link("/bibliotheque") }, /* @__PURE__ */ React.createElement(Ic.arrowL, null), " La bibliothèque"), /* @__PURE__ */ React.createElement("article", { className: "detail" }, /* @__PURE__ */ React.createElement("div", { className: "detail-cover" }, /* @__PURE__ */ React.createElement(Cover, { r, big: true })), /* @__PURE__ */ React.createElement("div", { className: "detail-text" }, /* @__PURE__ */ React.createElement("p", { className: "kicker" }, r.type), /* @__PURE__ */ React.createElement("h1", null, r.title), r.author && /* @__PURE__ */ React.createElement("p", { className: "detail-author" }, r.author), /* @__PURE__ */ React.createElement("p", { className: "detail-desc" }, r.description), facts.length > 0 && /* @__PURE__ */ React.createElement("dl", { className: "facts" }, facts.map(([k, v]) => /* @__PURE__ */ React.createElement("div", { key: k }, /* @__PURE__ */ React.createElement("dt", null, k), /* @__PURE__ */ React.createElement("dd", null, v)))), /* @__PURE__ */ React.createElement("div", { className: "tags" }, r.themes.map((t) => /* @__PURE__ */ React.createElement("a", { key: t, className: "tag", ...link("/bibliotheque?theme=" + encodeURIComponent(t)) }, t))), r.url && r.url !== "#" && /* @__PURE__ */ React.createElement("a", { className: "btn btn-primary btn-lg", href: r.url, target: "_blank", rel: "noopener" }, extLabel, " ", /* @__PURE__ */ React.createElement(Ic.ext, null)), r.url === "#" && /* @__PURE__ */ React.createElement("p", { className: "note" }, "Exemple d'illustration : cette ressource n'existe pas encore."))), related.length > 0 && /* @__PURE__ */ React.createElement("section", { className: "section related" }, /* @__PURE__ */ React.createElement("div", { className: "section-head" }, /* @__PURE__ */ React.createElement("h2", null, "Dans le même esprit")), /* @__PURE__ */ React.createElement("div", { className: "grid" }, related.map((x) => /* @__PURE__ */ React.createElement(Card, { key: x.id, r: x })))));
}
function SubmitPage() {
  const { TYPES, LANGS } = window.AM;
  const empty = { title: "", type: "", author: "", url: "", description: "", lang: "Français", proposer: "" };
  const [f, setF] = useState(empty);
  const [errs, setErrs] = useState({});
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.title.trim()) er.title = "Indiquez un titre.";
    if (!f.type) er.type = "Choisissez un type.";
    if (!f.url.trim()) er.url = "Ajoutez un lien vers la ressource.";
    if (!f.description.trim()) er.description = "Dites en quelques mots pourquoi elle a sa place ici.";
    if (!f.proposer.trim()) er.proposer = "Indiquez votre nom ou un pseudonyme.";
    setErrs(er);
    if (!Object.keys(er).length) {
      setDone(true);
      window.scrollTo({ top: 0 });
    }
  };
  if (done) return /* @__PURE__ */ React.createElement("main", { className: "wrap page form done" }, /* @__PURE__ */ React.createElement("span", { className: "seal" }, /* @__PURE__ */ React.createElement(Ic.check, null)), /* @__PURE__ */ React.createElement("h1", null, "Merci."), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "« ", f.title, " » a été transmis à l'équipe d'Al Maydan. Après relecture, la ressource pourra rejoindre la bibliothèque."), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-primary", onClick: () => {
    setF(empty);
    setDone(false);
  } }, "Proposer autre chose"), /* @__PURE__ */ React.createElement("a", { className: "btn btn-quiet", ...link("/bibliotheque") }, "La bibliothèque")));
  const Field = ({ k, label, children, hint }) => /* @__PURE__ */ React.createElement("div", { className: "field" + (errs[k] ? " err" : "") }, /* @__PURE__ */ React.createElement("label", { htmlFor: "f-" + k }, label), children, hint && /* @__PURE__ */ React.createElement("p", { className: "hint" }, hint), errs[k] && /* @__PURE__ */ React.createElement("p", { className: "errmsg" }, errs[k]));
  return /* @__PURE__ */ React.createElement("main", { className: "wrap page form" }, /* @__PURE__ */ React.createElement("div", { className: "page-head" }, /* @__PURE__ */ React.createElement("h1", null, "Proposer une ressource"), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "Chaque proposition est relue avant d'entrer dans la bibliothèque.")), /* @__PURE__ */ React.createElement("form", { onSubmit: submit, noValidate: true }, Field({ k: "title", label: "Titre", children: /* @__PURE__ */ React.createElement("input", { id: "f-title", className: "control", value: f.title, onChange: set("title"), placeholder: "Ex. L'Orientalisme" }) }), Field({ k: "type", label: "Type", children: /* @__PURE__ */ React.createElement("div", { className: "pills", role: "group", "aria-label": "Type" }, TYPES.map((t) => /* @__PURE__ */ React.createElement("button", { type: "button", key: t, className: "pill" + (f.type === t ? " on" : ""), onClick: () => setF((s) => ({ ...s, type: t })) }, t))) }), /* @__PURE__ */ React.createElement("div", { className: "two" }, Field({ k: "author", label: "Auteur ou créateur", children: /* @__PURE__ */ React.createElement("input", { id: "f-author", className: "control", value: f.author, onChange: set("author") }) }), Field({ k: "lang", label: "Langue", children: /* @__PURE__ */ React.createElement("select", { id: "f-lang", className: "control", value: f.lang, onChange: set("lang") }, LANGS.map((l) => /* @__PURE__ */ React.createElement("option", { key: l }, l))) })), Field({ k: "url", label: "Lien", hint: "La page de l'éditeur, de la vidéo, de l'association…", children: /* @__PURE__ */ React.createElement("input", { id: "f-url", className: "control", value: f.url, onChange: set("url"), placeholder: "https://" }) }), Field({ k: "description", label: "Pourquoi cette ressource ?", children: /* @__PURE__ */ React.createElement("textarea", { id: "f-description", className: "control", value: f.description, onChange: set("description"), placeholder: "De quoi s'agit-il, et qu'apporte-t-elle ?" }) }), Field({ k: "proposer", label: "Proposé par", children: /* @__PURE__ */ React.createElement("input", { id: "f-proposer", className: "control", value: f.proposer, onChange: set("proposer"), placeholder: "Votre nom ou un pseudonyme" }) }), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn btn-primary btn-lg" }, "Envoyer ", /* @__PURE__ */ React.createElement(Ic.arrow, null))));
}
function AboutPage() {
  const axes = [
    ["Spirituelle", "Faire place à la quête de sens et à ce qui élève l'âme, au-delà du bruit du quotidien."],
    ["Culturelle", "Transmettre un héritage vivant : lettres, arts, histoire et mémoire."],
    ["Intellectuelle", "Cultiver la pensée, le doute fécond et la rigueur pour mieux comprendre le monde."]
  ];
  return /* @__PURE__ */ React.createElement("main", { className: "wrap page about" }, /* @__PURE__ */ React.createElement("div", { className: "page-head" }, /* @__PURE__ */ React.createElement("p", { className: "kicker" }, "À propos"), /* @__PURE__ */ React.createElement("h1", null, "Une bibliothèque ", /* @__PURE__ */ React.createElement("em", null, "commune"), "."), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "Al Maktaba, « la bibliothèque », est une initiative d'Al Maydan, « la place » : rassembler et partager les ressources qui nous élèvent.")), /* @__PURE__ */ React.createElement("div", { className: "axes" }, axes.map(([t, d]) => /* @__PURE__ */ React.createElement("div", { className: "axis", key: t }, /* @__PURE__ */ React.createElement("h2", null, t), /* @__PURE__ */ React.createElement("p", null, d)))), /* @__PURE__ */ React.createElement("div", { className: "how" }, /* @__PURE__ */ React.createElement("h2", null, "Comment ça marche"), /* @__PURE__ */ React.createElement("ol", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Proposer."), " Chacun peut suggérer un livre, un film, une association ou un événement."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Relire."), " L'équipe d'Al Maydan vérifie la pertinence et la fidélité à l'esprit du projet."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Partager."), " La ressource rejoint la bibliothèque, accessible à tous, gratuitement.")), /* @__PURE__ */ React.createElement("a", { className: "btn btn-primary btn-lg", ...link("/soumettre") }, "Proposer une ressource ", /* @__PURE__ */ React.createElement(Ic.arrow, null))));
}
function App() {
  const route = useHashRoute();
  const base = route.split("?")[0];
  let page;
  if (base.startsWith("/bibliotheque") || base.startsWith("/categorie/")) page = /* @__PURE__ */ React.createElement(LibraryPage, { key: route, route });
  else if (base.startsWith("/ressource/")) page = /* @__PURE__ */ React.createElement(DetailPage, { key: route, route });
  else if (base.startsWith("/soumettre")) page = /* @__PURE__ */ React.createElement(SubmitPage, null);
  else if (base.startsWith("/a-propos")) page = /* @__PURE__ */ React.createElement(AboutPage, null);
  else page = /* @__PURE__ */ React.createElement(HomePage, null);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Header, { route }), page, /* @__PURE__ */ React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
