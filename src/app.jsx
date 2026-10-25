/* Al Maktaba — application (React, routes par #). Compilé dans assets/app.js par build.sh. */
const { useState, useEffect, useMemo } = React;

/* ---------- Navigation ---------- */
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
  if (qi >= 0) new URLSearchParams(route.slice(qi + 1)).forEach((v, k) => { out[k] = v; });
  return out;
}
const link = (to) => ({ href: "#" + to, onClick: (e) => { e.preventDefault(); go(to); } });

/* ---------- Types ---------- */
const TINT = {
  Livre: "green", Article: "sand", Documentaire: "slate", Film: "slate", "Vidéo": "slate",
  Podcast: "sand", "Personnalité": "rose", Association: "green", Initiative: "green", "Événement": "rose",
};
const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const fmtDate = (iso) => { const d = new Date(iso); return d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear(); };

/* ---------- Icônes ---------- */
const Ic = {
  arrow: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  arrowL: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  ext: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 5h5v5M19 5l-8 8M17 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" /><path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>,
  burger: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>,
  close: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>,
  check: () => <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5 10 17.5 19 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  x: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>,
  ig: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" /></svg>,
};

/* ---------- Marque : l'édifice à coupole ---------- */
let markId = 0;
function Mark({ size = 30, className = "" }) {
  const id = useMemo(() => "amDome" + (++markId), []);
  return (
    <svg className={"mark " + className} width={size} height={size * 1.25} viewBox="0 0 240 300" aria-hidden="true">
      <defs><clipPath id={id}><path d="M78,98 L78,70 C78,38 96,24 120,24 C144,24 162,38 162,70 L162,98 Z" /></clipPath></defs>
      <circle className="mk-fill" cx="120" cy="9" r="5.5" />
      <rect className="mk-fill" x="116" y="11" width="8" height="14" />
      <g clipPath={"url(#" + id + ")"}>
        <rect className="mk-fill" x="70" y="20" width="100" height="82" />
        {[90, 104, 118.7, 133, 147].map((x) => <rect key={x} className="mk-cut" x={x} y="22" width="2.6" height="80" />)}
      </g>
      <rect className="mk-fill" x="48" y="104" width="42" height="46" />
      <rect className="mk-fill" x="96" y="98" width="48" height="52" />
      <rect className="mk-fill" x="150" y="104" width="42" height="46" />
      <rect className="mk-cut" x="66" y="116" width="6" height="18" rx="3" />
      <rect className="mk-cut" x="104" y="112" width="6" height="22" rx="3" />
      <rect className="mk-cut" x="117" y="112" width="6" height="22" rx="3" />
      <rect className="mk-cut" x="130" y="112" width="6" height="22" rx="3" />
      <rect className="mk-cut" x="168" y="116" width="6" height="18" rx="3" />
      <rect className="mk-fill" x="96" y="150" width="48" height="120" />
      <rect className="mk-cut" x="108" y="162" width="6" height="16" rx="3" />
      <rect className="mk-cut" x="126" y="162" width="6" height="16" rx="3" />
      <path className="mk-cut" d="M108,232 L108,204 C108,191 132,191 132,204 L132,232 Z" />
      <rect className="mk-cut" x="96" y="246" width="48" height="4" />
      <rect className="mk-fill" x="90" y="270" width="60" height="6" />
    </svg>
  );
}
function Brand({ onDark = false }) {
  return (
    <a className={"brand" + (onDark ? " on-dark" : "")} {...link("/")}>
      <Mark size={26} className={onDark ? "on-dark" : ""} />
      <span className="brand-name">Al Maktaba</span>
      <span className="brand-ar" lang="ar">المكتبة</span>
    </a>
  );
}

/* ---------- Couverture ---------- */
function Badge({ kind }) {
  if (kind === "coup-de-coeur") return <span className="ribbon coup">Coup de cœur</span>;
  if (kind === "a-decouvrir") return <span className="ribbon dec">À découvrir</span>;
  return null;
}
function Cover({ r, big = false }) {
  const isEvent = r.type === "Événement" && r.eventDate;
  const d = isEvent ? new Date(r.eventDate) : null;
  return (
    <div className={"cover" + (big ? " big" : "")} data-tint={TINT[r.type] || "sand"}>
      <div className="cover-frame">
        <div className="cover-type">{r.type}{r.year && !isEvent ? " · " + r.year : ""}</div>
        {isEvent ? (
          <div className="cover-date"><span className="d">{d.getDate()}</span><span className="m">{MONTHS[d.getMonth()]} {d.getFullYear()}</span></div>
        ) : null}
        <div className="cover-title">{r.title}</div>
        {r.author ? <div className="cover-author">{r.author}</div> : null}
        <Mark size={14} className="cover-mark" />
      </div>
      {big && <Badge kind={r.editorial} />}
    </div>
  );
}
function Card({ r }) {
  return (
    <a className="card" {...link("/ressource/" + r.id)} aria-label={r.title + (r.author ? ", " + r.author : "")}>
      <Cover r={r} />
    </a>
  );
}

/* ---------- En-tête et pied ---------- */
function Header({ route }) {
  const [open, setOpen] = useState(false);
  const base = route.split("?")[0];
  const on = (p) => (p === "/bibliotheque" ? base.startsWith("/bibliotheque") || base.startsWith("/categorie") || base.startsWith("/ressource") : base.startsWith(p));
  const NAV = [["/bibliotheque", "Bibliothèque"], ["/a-propos", "À propos"]];
  return (
    <header className="site-head">
      <div className="wrap head-inner">
        <Brand />
        <nav className="head-nav" aria-label="Navigation">
          {NAV.map(([to, l]) => <a key={to} className={"navlink" + (on(to) ? " active" : "")} {...link(to)}>{l}</a>)}
          <a className="btn btn-primary" {...link("/soumettre")}>Proposer</a>
        </nav>
        <button className="burger" aria-label="Menu" onClick={() => setOpen(true)}><Ic.burger /></button>
      </div>
      {open && (
        <div className="drawer" onClick={() => setOpen(false)}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <button className="burger" aria-label="Fermer" onClick={() => setOpen(false)}><Ic.close /></button>
            {[["/", "Accueil"], ...NAV, ["/soumettre", "Proposer une ressource"]].map(([to, l]) =>
              <a key={to} className="drawer-link" href={"#" + to} onClick={(e) => { e.preventDefault(); setOpen(false); go(to); }}>{l}</a>)}
          </div>
        </div>
      )}
    </header>
  );
}
function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap foot-inner">
        <div className="foot-brand">
          <Brand onDark />
          <p className="foot-devise">Pour une élévation <em>spirituelle, culturelle, intellectuelle.</em></p>
        </div>
        <nav className="foot-links" aria-label="Liens">
          <a {...link("/bibliotheque")}>La bibliothèque</a>
          <a {...link("/soumettre")}>Proposer une ressource</a>
          <a {...link("/a-propos")}>À propos</a>
        </nav>
        <div className="social">
          <a href="https://x.com/al_maydan__" target="_blank" rel="noopener" aria-label="Al Maydan sur X"><Ic.x /></a>
          <a href="https://instagram.com/al_maydan_" target="_blank" rel="noopener" aria-label="Al Maydan sur Instagram"><Ic.ig /></a>
        </div>
      </div>
      <div className="wrap foot-bottom"><span>Une initiative d'Al Maydan</span><span lang="ar">المكتبة · الميدان</span></div>
    </footer>
  );
}

/* ---------- Accueil ---------- */
function HomePage() {
  const { resources, TYPES, TYPE_PLURAL } = window.AM;
  const featured = resources.find((r) => r.featured) || resources[0];
  const coups = resources.filter((r) => r.editorial === "coup-de-coeur" && r.id !== featured.id).slice(0, 4);
  const counts = {}; resources.forEach((r) => { counts[r.type] = (counts[r.type] || 0) + 1; });
  return (
    <main>
      <section className="wrap hero">
        <div className="hero-text">
          <p className="kicker"><span lang="ar">المكتبة</span> · la bibliothèque d'Al Maydan</p>
          <h1 className="hero-h">Le savoir,<br />en <em>partage</em>.</h1>
          <p className="lede">Des livres, des films, des voix et des initiatives, choisis et partagés pour nourrir l'esprit et le cœur.</p>
          <div className="actions">
            <a className="btn btn-primary btn-lg" {...link("/bibliotheque")}>Explorer <Ic.arrow /></a>
            <a className="btn btn-quiet btn-lg" {...link("/soumettre")}>Proposer une ressource</a>
          </div>
        </div>
        <a className="hero-feature" {...link("/ressource/" + featured.id)}>
          <span className="kicker">À la une</span>
          <Cover r={featured} big />
        </a>
      </section>

      <nav className="wrap shelf" aria-label="Parcourir par type">
        {TYPES.filter((t) => counts[t]).map((t) => (
          <a key={t} className="shelf-item" {...link("/bibliotheque?type=" + encodeURIComponent(t))}>
            <span className="dot" data-tint={TINT[t]} />{TYPE_PLURAL[t]}<sup>{counts[t]}</sup>
          </a>
        ))}
      </nav>

      {coups.length > 0 && (
        <section className="wrap section">
          <div className="section-head">
            <h2>Coups de cœur</h2>
            <a className="more" {...link("/bibliotheque")}>Toute la bibliothèque <Ic.arrow /></a>
          </div>
          <div className="grid">{coups.map((r) => <Card key={r.id} r={r} />)}</div>
        </section>
      )}

      <section className="devise">
        <div className="wrap">
          <Mark size={40} className="on-dark" />
          <p>Pour une élévation <em>spirituelle, culturelle, intellectuelle.</em></p>
        </div>
      </section>

      <section className="wrap section contribute">
        <h2>La bibliothèque grandit avec vous.</h2>
        <p className="lede">Un livre, un film, une association qui élève ? Proposez-le : chaque suggestion est relue avant d'entrer dans le fonds.</p>
        <a className="btn btn-primary btn-lg" {...link("/soumettre")}>Proposer une ressource <Ic.arrow /></a>
      </section>
    </main>
  );
}

/* ---------- Bibliothèque ---------- */
function LibraryPage({ route }) {
  const { resources, TYPES, TYPE_PLURAL, THEMES } = window.AM;
  const qp = parseQuery(route);
  const fromPath = route.startsWith("/categorie/") ? decodeURIComponent(route.split("/")[2].split("?")[0]) : null;
  const [q, setQ] = useState(qp.q || "");
  const [type, setType] = useState(fromPath || qp.type || "");
  const [theme, setTheme] = useState(qp.theme || "");
  useEffect(() => { setType(fromPath || qp.type || ""); setTheme(qp.theme || ""); }, [route]);

  const list = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return resources.filter((r) =>
      (!type || r.type === type) && (!theme || r.themes.includes(theme)) &&
      (!ql || (r.title + " " + r.author + " " + r.description + " " + r.themes.join(" ")).toLowerCase().includes(ql))
    ).sort((a, b) => (a.dateAdded < b.dateAdded ? 1 : -1));
  }, [resources, q, type, theme]);
  const present = TYPES.filter((t) => resources.some((r) => r.type === t));

  return (
    <main className="wrap page">
      <div className="page-head">
        <h1>La bibliothèque</h1>
        <p className="lede">{resources.length} ressources choisies par la communauté et relues par l'équipe d'Al Maydan.</p>
      </div>
      <div className="lib-bar">
        <label className="search">
          <Ic.search />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Un titre, un auteur, une idée…" aria-label="Rechercher" />
        </label>
        <select className="select" value={theme} onChange={(e) => setTheme(e.target.value)} aria-label="Thème">
          <option value="">Tous les thèmes</option>
          {THEMES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div className="pills" role="group" aria-label="Type">
        <button className={"pill" + (!type ? " on" : "")} onClick={() => setType("")}>Tout</button>
        {present.map((t) => <button key={t} className={"pill" + (type === t ? " on" : "")} onClick={() => setType(type === t ? "" : t)}>{TYPE_PLURAL[t]}</button>)}
      </div>
      {list.length ? (
        <div className="grid lib-grid">{list.map((r) => <Card key={r.id} r={r} />)}</div>
      ) : (
        <div className="empty">
          <p className="empty-h">Rien ne correspond pour l'instant.</p>
          <button className="btn btn-quiet" onClick={() => { setQ(""); setType(""); setTheme(""); }}>Tout afficher</button>
        </div>
      )}
    </main>
  );
}

/* ---------- Ressource ---------- */
function DetailPage({ route }) {
  const { resources } = window.AM;
  const r = resources.find((x) => x.id === route.split("/")[2]);
  if (!r) return (
    <main className="wrap page empty">
      <p className="empty-h">Ressource introuvable.</p>
      <a className="btn btn-quiet" {...link("/bibliotheque")}>Retour à la bibliothèque</a>
    </main>
  );
  const related = resources.filter((x) => x.id !== r.id && x.themes.some((t) => r.themes.includes(t))).slice(0, 4);
  const facts = [
    ["Année", r.year], r.eventDate ? ["Date", fmtDate(r.eventDate)] : null, ["Durée", r.duration],
    ["Langue", r.lang], ["Éditeur", r.publisher], r.place ? ["Lieu", r.place] : null,
  ].filter((x) => x && x[1]).slice(0, 4);
  const extLabel = { Livre: "Se procurer le livre", "Vidéo": "Regarder", Film: "Voir la fiche du film", Documentaire: "Voir le documentaire", Podcast: "Écouter", "Personnalité": "En savoir plus", Article: "Lire l'article" }[r.type] || "Accéder à la ressource";
  return (
    <main className="wrap page">
      <a className="back" {...link("/bibliotheque")}><Ic.arrowL /> La bibliothèque</a>
      <article className="detail">
        <div className="detail-cover"><Cover r={r} big /></div>
        <div className="detail-text">
          <p className="kicker">{r.type}</p>
          <h1>{r.title}</h1>
          {r.author && <p className="detail-author">{r.author}</p>}
          <p className="detail-desc">{r.description}</p>
          {facts.length > 0 && (
            <dl className="facts">{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          )}
          <div className="tags">{r.themes.map((t) => <a key={t} className="tag" {...link("/bibliotheque?theme=" + encodeURIComponent(t))}>{t}</a>)}</div>
          {r.url && r.url !== "#" && <a className="btn btn-primary btn-lg" href={r.url} target="_blank" rel="noopener">{extLabel} <Ic.ext /></a>}
          {r.url === "#" && <p className="note">Exemple d'illustration : cette ressource n'existe pas encore.</p>}
        </div>
      </article>
      {related.length > 0 && (
        <section className="section related">
          <div className="section-head"><h2>Dans le même esprit</h2></div>
          <div className="grid">{related.map((x) => <Card key={x.id} r={x} />)}</div>
        </section>
      )}
    </main>
  );
}

/* ---------- Proposer ---------- */
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
    if (!Object.keys(er).length) { setDone(true); window.scrollTo({ top: 0 }); }
  };
  if (done) return (
    <main className="wrap page form done">
      <span className="seal"><Ic.check /></span>
      <h1>Merci.</h1>
      <p className="lede">« {f.title} » a été transmis à l'équipe d'Al Maydan. Après relecture, la ressource pourra rejoindre la bibliothèque.</p>
      <div className="actions">
        <button className="btn btn-primary" onClick={() => { setF(empty); setDone(false); }}>Proposer autre chose</button>
        <a className="btn btn-quiet" {...link("/bibliotheque")}>La bibliothèque</a>
      </div>
    </main>
  );
  const Field = ({ k, label, children, hint }) => (
    <div className={"field" + (errs[k] ? " err" : "")}>
      <label htmlFor={"f-" + k}>{label}</label>
      {children}
      {hint && <p className="hint">{hint}</p>}
      {errs[k] && <p className="errmsg">{errs[k]}</p>}
    </div>
  );
  return (
    <main className="wrap page form">
      <div className="page-head">
        <h1>Proposer une ressource</h1>
        <p className="lede">Chaque proposition est relue avant d'entrer dans la bibliothèque.</p>
      </div>
      <form onSubmit={submit} noValidate>
        {Field({ k: "title", label: "Titre", children: <input id="f-title" className="control" value={f.title} onChange={set("title")} placeholder="Ex. L'Orientalisme" /> })}
        {Field({ k: "type", label: "Type", children: (
          <div className="pills" role="group" aria-label="Type">{TYPES.map((t) => <button type="button" key={t} className={"pill" + (f.type === t ? " on" : "")} onClick={() => setF((s) => ({ ...s, type: t }))}>{t}</button>)}</div>
        ) })}
        <div className="two">
          {Field({ k: "author", label: "Auteur ou créateur", children: <input id="f-author" className="control" value={f.author} onChange={set("author")} /> })}
          {Field({ k: "lang", label: "Langue", children: <select id="f-lang" className="control" value={f.lang} onChange={set("lang")}>{LANGS.map((l) => <option key={l}>{l}</option>)}</select> })}
        </div>
        {Field({ k: "url", label: "Lien", hint: "La page de l'éditeur, de la vidéo, de l'association…", children: <input id="f-url" className="control" value={f.url} onChange={set("url")} placeholder="https://" /> })}
        {Field({ k: "description", label: "Pourquoi cette ressource ?", children: <textarea id="f-description" className="control" value={f.description} onChange={set("description")} placeholder="De quoi s'agit-il, et qu'apporte-t-elle ?" /> })}
        {Field({ k: "proposer", label: "Proposé par", children: <input id="f-proposer" className="control" value={f.proposer} onChange={set("proposer")} placeholder="Votre nom ou un pseudonyme" /> })}
        <button type="submit" className="btn btn-primary btn-lg">Envoyer <Ic.arrow /></button>
      </form>
    </main>
  );
}

/* ---------- À propos ---------- */
function AboutPage() {
  const axes = [
    ["Spirituelle", "Faire place à la quête de sens et à ce qui élève l'âme, au-delà du bruit du quotidien."],
    ["Culturelle", "Transmettre un héritage vivant : lettres, arts, histoire et mémoire."],
    ["Intellectuelle", "Cultiver la pensée, le doute fécond et la rigueur pour mieux comprendre le monde."],
  ];
  return (
    <main className="wrap page about">
      <div className="page-head">
        <p className="kicker">À propos</p>
        <h1>Une bibliothèque <em>commune</em>.</h1>
        <p className="lede">Al Maktaba, « la bibliothèque », est une initiative d'Al Maydan, « la place » : rassembler et partager les ressources qui nous élèvent.</p>
      </div>
      <div className="axes">
        {axes.map(([t, d]) => <div className="axis" key={t}><h2>{t}</h2><p>{d}</p></div>)}
      </div>
      <div className="how">
        <h2>Comment ça marche</h2>
        <ol>
          <li><b>Proposer.</b> Chacun peut suggérer un livre, un film, une association ou un événement.</li>
          <li><b>Relire.</b> L'équipe d'Al Maydan vérifie la pertinence et la fidélité à l'esprit du projet.</li>
          <li><b>Partager.</b> La ressource rejoint la bibliothèque, accessible à tous, gratuitement.</li>
        </ol>
        <a className="btn btn-primary btn-lg" {...link("/soumettre")}>Proposer une ressource <Ic.arrow /></a>
      </div>
    </main>
  );
}

/* ---------- Application ---------- */
function App() {
  const route = useHashRoute();
  const base = route.split("?")[0];
  let page;
  if (base.startsWith("/bibliotheque") || base.startsWith("/categorie/")) page = <LibraryPage key={route} route={route} />;
  else if (base.startsWith("/ressource/")) page = <DetailPage key={route} route={route} />;
  else if (base.startsWith("/soumettre")) page = <SubmitPage />;
  else if (base.startsWith("/a-propos")) page = <AboutPage />;
  else page = <HomePage />;
  return <React.Fragment><Header route={route} />{page}<Footer /></React.Fragment>;
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
