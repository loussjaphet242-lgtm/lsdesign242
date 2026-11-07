/* =====================================================================
   LS DESIGN — fonctionnement du site
   Tu n'as normalement pas besoin de modifier ce fichier :
   les contenus se changent dans js/donnees.js
   ===================================================================== */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pointeurFin = window.matchMedia("(pointer: fine)").matches;
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  var site = typeof SITE !== "undefined" ? SITE : {};
  var projets = (typeof PROJETS !== "undefined" ? PROJETS : []).filter(function (p) { return p.publie !== false; });
  var categories = (typeof CATEGORIES !== "undefined" ? CATEGORIES : []).filter(function (c) {
    return projets.some(function (p) { return p.categorie === c.id; });
  });
  var cat = {};
  categories.forEach(function (c) { cat[c.id] = c; });

  function echap(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }
  function visuels(p) { return [p.couverture].concat(p.images || []).filter(Boolean); }
  function nomFichier(src) { return String(src).split("/").pop(); }
  function versBande(src) { return /^images\//.test(src) ? "images/bande/" + nomFichier(src) : src; }
  function versMini(src) { return /^images\//.test(src) ? "images/miniatures/" + nomFichier(src) : src; }
  var lienWhatsapp = function (msg) {
    return "https://wa.me/" + (site.whatsapp || "221709144136") + (msg ? "?text=" + encodeURIComponent(msg) : "");
  };
  // Si une petite image manque, on retombe sur la miniature puis sur l'image d'origine
  window.lsSecours = function (img) {
    var etape = +(img.getAttribute("data-e") || 0);
    var o = img.getAttribute("data-o");
    if (!o || etape > 1) return;
    img.setAttribute("data-e", etape + 1);
    img.src = etape === 0 ? versMini(o) : o;
  };
  // Version d'aperçu en ligne : seules les miniatures sont publiées
  if (window.LS_APERCU) versBande = versMini;
  function imgHTML(src, alt, taille, extra) {
    var s = taille === "bande" ? versBande(src) : taille === "mini" ? versMini(src) : src;
    if (window.LS_APERCU) s = versMini(src);
    if (window.LS_PACK && /^images\//.test(src) && window.LS_PACK[nomFichier(src)]) s = window.LS_PACK[nomFichier(src)];
    return '<img src="' + echap(s) + '" data-o="' + echap(src) + '" alt="' + echap(alt) + '" onerror="lsSecours(this)" decoding="async"' + (extra || "") + ">";
  }

  /* ---------------------------------------------------------------
     Réseaux sociaux
     --------------------------------------------------------------- */
  var icones = {
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.8A4.3 4.3 0 0113.2 2h-3v13.4a2.6 2.6 0 11-2.6-2.6c.3 0 .5 0 .8.1V9.8a5.7 5.7 0 105 5.6V8.6a7.3 7.3 0 004.4 1.4V7a4.3 4.3 0 01-1.2-1.2z"/></svg>'
  };
  var nomsReseaux = { facebook: "Facebook", instagram: "Instagram", tiktok: "TikTok" };
  var secoursReseaux = {
    facebook: "https://www.facebook.com/search/top?q=" + encodeURIComponent("LS DESIGN Dakar"),
    instagram: "https://www.instagram.com/explore/search/keyword/?q=" + encodeURIComponent("LS DESIGN"),
    tiktok: "https://www.tiktok.com/search?q=" + encodeURIComponent("LS DESIGN")
  };
  var reseaux = site.reseaux || {};
  var listeReseaux = ["facebook", "instagram", "tiktok"].map(function (k) {
    return { id: k, nom: nomsReseaux[k], url: reseaux[k] || secoursReseaux[k] };
  });
  $$(".reseaux-js").forEach(function (box) {
    box.innerHTML = listeReseaux.map(function (r) {
      return '<a class="reseau" href="' + echap(r.url) + '" target="_blank" rel="noopener" aria-label="LS DESIGN sur ' + r.nom + '" title="LS DESIGN sur ' + r.nom + '">' + icones[r.id] + "</a>";
    }).join("");
  });
  var grands = $("#reseaux-grands");
  if (grands) grands.innerHTML = listeReseaux.map(function (r) {
    return '<a class="reseau-grand" href="' + echap(r.url) + '" target="_blank" rel="noopener"><span class="ico">' + icones[r.id] + "</span><span><small>" + r.nom + "</small><strong>LS DESIGN</strong></span>" +
      '<svg class="fl" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17L17 7M9 7h8v8"/></svg></a>';
  }).join("");

  /* ---------------------------------------------------------------
     Coordonnées
     --------------------------------------------------------------- */
  if (site.telephoneAffiche) $("#tel-affiche").textContent = site.telephoneAffiche;
  $("#btn-whatsapp").href = lienWhatsapp(site.messageWhatsapp);
  if (site.email) { $("#email-affiche").textContent = site.email; $("#coord-email").hidden = false; }
  $$("[data-copier]").forEach(function (b) {
    b.addEventListener("click", function () {
      var cible = document.getElementById(b.getAttribute("data-copier"));
      var ok = function () { b.textContent = "Copié"; setTimeout(function () { b.textContent = "Copier"; }, 1600); };
      var repli = function () {
        var r = document.createRange(); r.selectNodeContents(cible);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        b.textContent = "Sélectionné"; setTimeout(function () { b.textContent = "Copier"; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(cible.textContent.trim()).then(ok, repli);
      else repli();
    });
  });

  /* ---------------------------------------------------------------
     Intro
     --------------------------------------------------------------- */
  var intro = $("#intro");
  if (intro) {
    if (reduit) intro.remove();
    else {
      setTimeout(function () { intro.classList.add("fin"); }, 1050);
      setTimeout(function () { intro.remove(); }, 2000);
    }
  }
  $$(".accueil .entree").forEach(function (el, i) { el.style.setProperty("--i", i); });

  /* ---------------------------------------------------------------
     Mots tournants de l'accueil
     --------------------------------------------------------------- */
  var mots = $$(".hero-rotatif span");
  if (mots.length && !reduit) {
    var iMot = 0; mots[0].classList.add("actif");
    setInterval(function () {
      mots[iMot].classList.remove("actif");
      iMot = (iMot + 1) % mots.length;
      mots[iMot].classList.add("actif");
    }, 2200);
  }

  /* ---------------------------------------------------------------
     Compteurs
     --------------------------------------------------------------- */
  var nbVisuels = projets.reduce(function (n, p) { return n + visuels(p).length; }, 0);
  var clients = {};
  projets.forEach(function (p) {
    (p.client || "").split(/·|&|,/).forEach(function (c) { c = c.trim().replace(/ (Dakar|France)$/, ""); if (c) clients[c] = 1; });
  });
  $("#compteurs").innerHTML = [
    [nbVisuels, "visuels présentés"], [projets.length, "projets"], [Object.keys(clients).length, "marques & organisations"], [categories.length, "univers"]
  ].map(function (c) { return '<div><strong data-cible="' + c[0] + '">' + c[0] + "</strong><span>" + c[1] + "</span></div>"; }).join("");

  function animerCompteur(el) {
    var cible = +el.getAttribute("data-cible"), t0 = null;
    if (reduit) return;
    function pas(t) {
      if (!t0) t0 = t;
      var k = clamp((t - t0) / 1400, 0, 1), e = 1 - Math.pow(1 - k, 4);
      el.textContent = Math.round(cible * e);
      if (k < 1) requestAnimationFrame(pas);
    }
    requestAnimationFrame(pas);
  }

  /* ---------------------------------------------------------------
     Bandes défilantes : une par univers
     --------------------------------------------------------------- */
  function imagesUnivers(id, max) {
    var lots = projets.filter(function (p) { return p.categorie === id; }).map(function (p) {
      return visuels(p).map(function (src) { return { src: src, p: p }; });
    });
    var out = [], i = 0, reste = true;
    while (reste && out.length < max) { // on alterne les projets pour varier
      reste = false;
      lots.forEach(function (l) { if (l[i] && out.length < max) { out.push(l[i]); reste = true; } });
      i++;
    }
    return out;
  }
  var bandes = $("#bandes");
  bandes.innerHTML = categories.map(function (c, n) {
    var items = imagesUnivers(c.id, 18);
    var total = projets.filter(function (p) { return p.categorie === c.id; }).reduce(function (k, p) { return k + visuels(p).length; }, 0);
    var html = items.map(function (it) {
      return '<button type="button" class="bande-item" data-projet="' + echap(it.p.id) + '" aria-label="' + echap(it.p.titre) + '">' + imgHTML(it.src, it.p.titre, "bande", ' loading="lazy"') + "</button>";
    }).join("");
    return '<div class="bande" style="--duree:' + Math.max(36, items.length * 5) + 's">' +
      '<button type="button" class="bande-label" data-filtre-vers="' + c.id + '"><small>' + String(n + 1).padStart(2, "0") + " · " + total + " visuels</small><strong>" + echap(c.nom) + "</strong><em>Voir les projets →</em></button>" +
      '<div class="bande-fenetre"><div class="bande-piste">' + html + '<span aria-hidden="true" style="display:contents">' + html.replace(/<button /g, '<button tabindex="-1" ') + "</span></div></div></div>";
  }).join("");
  // ratio réel de chaque visuel
  $$(".bande-item img").forEach(function (img) {
    var poser = function () { if (img.naturalWidth) img.parentNode.style.setProperty("--ar", (img.naturalWidth / img.naturalHeight).toFixed(3)); };
    if (img.complete) poser(); else img.addEventListener("load", poser);
  });
  // ticker des univers
  var tick = document.createElement("div");
  tick.className = "ticker"; tick.setAttribute("aria-hidden", "true");
  var li = categories.map(function (c) { return "<li>" + echap(c.court || c.nom) + "</li>"; }).join("");
  tick.innerHTML = '<div class="ticker-piste"><ul>' + li + li + "</ul><ul>" + li + li + "</ul></div>";
  bandes.parentNode.appendChild(tick);

  /* ---------------------------------------------------------------
     Vitrine épinglée : un chapitre par univers
     --------------------------------------------------------------- */
  var teintes = ["rgba(255,90,31,.28)", "rgba(70,110,255,.26)", "rgba(60,190,90,.22)", "rgba(255,170,60,.24)", "rgba(220,60,120,.24)", "rgba(255,140,66,.24)"];
  var vitrine = $("#vitrine"), calquesBox = $("#vitrine-calques"), rail = $("#vitrine-rail");
  vitrine.style.setProperty("--n", categories.length);
  calquesBox.innerHTML = categories.map(function (c, i) {
    var ps = projets.filter(function (p) { return p.categorie === c.id; })
      .sort(function (a, b) { return (b.vedette ? 1 : 0) - (a.vedette ? 1 : 0); });
    var srcs = [];
    ps.forEach(function (p) { visuels(p).slice(0, 2).forEach(function (s) { srcs.push({ s: s, p: p }); }); });
    var pris = [srcs[0], srcs.find(function (x, k) { return k > 0 && x.p !== srcs[0].p; }) || srcs[1], srcs[srcs.length > 4 ? 4 : srcs.length - 1]].filter(Boolean);
    var nb = ps.reduce(function (k, p) { return k + visuels(p).length; }, 0);
    return '<div class="calque" style="--teinte:' + teintes[i % teintes.length] + '"><div class="calque-texte">' +
      '<p class="calque-num">' + String(i + 1).padStart(2, "0") + " / " + String(categories.length).padStart(2, "0") + " — " + ps.length + " projets · " + nb + " visuels</p>" +
      "<h2>" + echap(c.court || c.nom) + "</h2>" +
      "<p>" + echap(c.texte || "") + "</p>" +
      '<button type="button" class="btn btn-plein" data-filtre-vers="' + c.id + '">Voir cet univers <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div>' +
      '<div class="calque-visuels">' + pris.map(function (x, k) {
        return '<figure class="v' + (k + 1) + '">' + imgHTML(x.s, x.p.titre, "mini", ' loading="lazy"') + "</figure>";
      }).join("") + "</div></div>";
  }).join("");
  rail.innerHTML = categories.map(function () { return "<li><i></i></li>"; }).join("");
  var calques = $$(".calque", calquesBox), barres = $$("i", rail), actifV = -1;

  function majVitrine() {
    var r = vitrine.getBoundingClientRect(), vh = window.innerHeight;
    var p = clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
    var n = calques.length, x = p * n, idx = Math.min(n - 1, Math.floor(x)), t = x - idx;
    if (r.top > vh || r.bottom < 0) idx = r.top > 0 ? 0 : n - 1;
    if (idx !== actifV) {
      calques.forEach(function (c, k) {
        c.classList.toggle("actif", k === idx);
        c.classList.toggle("sorti", k < idx);
      });
      actifV = idx;
    }
    if (calques[idx]) calques[idx].style.setProperty("--t", t.toFixed(3));
    barres.forEach(function (b, k) { b.style.setProperty("--p", k < idx ? 1 : k === idx ? t.toFixed(3) : 0); });
  }
  if (reduit) calques.forEach(function (c) { c.classList.add("actif"); });

  /* ---------------------------------------------------------------
     Portfolio : filtres + grille
     --------------------------------------------------------------- */
  var grille = $("#grille"), filtres = $("#filtres"), filtreActif = "tous";
  try { var memo = localStorage.getItem("ls-univers"); if (memo && (memo === "tous" || cat[memo])) filtreActif = memo; } catch (e) {}

  function liste() { return projets.filter(function (p) { return filtreActif === "tous" || p.categorie === filtreActif; }); }
  function nbProjets(id) { return projets.filter(function (p) { return id === "tous" || p.categorie === id; }).length; }

  filtres.innerHTML = '<span class="filtre-pastille" aria-hidden="true"></span>' +
    [{ id: "tous", court: "Tous les projets" }].concat(categories).map(function (c) {
      return '<button type="button" class="filtre" data-filtre="' + c.id + '" aria-pressed="' + (c.id === filtreActif) + '">' + echap(c.court || c.nom) + " <small>" + nbProjets(c.id) + "</small></button>";
    }).join("");
  var pastille = $(".filtre-pastille", filtres);
  function placerPastille() {
    var b = $('[aria-pressed="true"]', filtres); if (!b) return;
    pastille.style.width = b.offsetWidth + "px";
    pastille.style.transform = "translateX(" + b.offsetLeft + "px)";
    var g = b.offsetLeft - filtres.clientWidth / 2 + b.offsetWidth / 2;
    filtres.scrollTo({ left: g, behavior: reduit ? "auto" : "smooth" });
  }

  var fleche = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17L17 7M9 7h8v8"/></svg>';
  var motif = ["grande", "", "", "", "moyenne", "moyenne", "", "", "", "grande", "", ""];

  function dessinerGrille() {
    var l = liste();
    if (!l.length) { grille.innerHTML = '<p class="vide">Aucun projet dans cet univers pour le moment.</p>'; return; }
    grille.innerHTML = l.map(function (p, i) {
      var taille = l.length <= 2 ? "moyenne" : (motif[i % motif.length] || "");
      var n = visuels(p).length;
      return '<article class="carte ' + taille + '" style="--d:' + (i % 6) + '"><button type="button" data-projet="' + echap(p.id) + '" aria-label="Voir le projet ' + echap(p.titre) + '">' +
        '<div class="vignette">' + imgHTML(p.couverture, p.titre, taille === "grande" ? "" : "mini", ' loading="lazy"') +
        (p.video ? '<span class="nb nb-video">▶ Vidéo</span>' : n > 1 ? '<span class="nb">' + n + " visuels</span>" : "") + '<span class="voir">' + fleche + "</span></div>" +
        '<div class="infos"><div><h3>' + echap(p.titre) + '</h3><p class="meta">' + echap([p.client, p.annee].filter(Boolean).join(" · ") || "LS DESIGN") + "</p></div>" +
        '<span class="cat">' + echap(cat[p.categorie] ? cat[p.categorie].court : "") + "</span></div></button></article>";
    }).join("");
    observer($$(".carte", grille));
    if (pointeurFin && !reduit) $$(".carte > button", grille).forEach(incliner);
  }
  function choisirFiltre(id, defiler) {
    if (!cat[id] && id !== "tous") return;
    var change = id !== filtreActif;
    filtreActif = id;
    try { localStorage.setItem("ls-univers", id); } catch (e) {}
    $$(".filtre", filtres).forEach(function (x) { x.setAttribute("aria-pressed", String(x.getAttribute("data-filtre") === id)); });
    placerPastille();
    if (defiler) document.getElementById("projets").scrollIntoView({ behavior: reduit ? "auto" : "smooth" });
    if (!change) return;
    if (reduit) { dessinerGrille(); return; }
    grille.classList.add("sortie");
    setTimeout(function () { dessinerGrille(); grille.classList.remove("sortie"); }, 320);
  }
  filtres.addEventListener("click", function (e) { var b = e.target.closest("[data-filtre]"); if (b) choisirFiltre(b.getAttribute("data-filtre")); });
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-filtre-vers]"); if (b) choisirFiltre(b.getAttribute("data-filtre-vers"), true);
  });
  dessinerGrille();
  requestAnimationFrame(placerPastille);
  window.addEventListener("resize", placerPastille);

  // inclinaison 3D + reflet suivant la souris
  function incliner(btn) {
    btn.addEventListener("pointermove", function (e) {
      var r = btn.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      btn.style.setProperty("--ry", ((x - .5) * 8).toFixed(2) + "deg");
      btn.style.setProperty("--rx", ((.5 - y) * 8).toFixed(2) + "deg");
      btn.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
      btn.style.setProperty("--my", (y * 100).toFixed(1) + "%");
    });
    btn.addEventListener("pointerleave", function () { btn.style.setProperty("--rx", "0deg"); btn.style.setProperty("--ry", "0deg"); });
  }

  /* ---------------------------------------------------------------
     Apparitions au défilement
     --------------------------------------------------------------- */
  var io = "IntersectionObserver" in window && !reduit ? new IntersectionObserver(function (entrees) {
    entrees.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add("vu");
      if (en.target.hasAttribute("data-cible")) animerCompteur(en.target);
      io.unobserve(en.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }) : null;
  function observer(els) { els.forEach(function (el) { if (io) io.observe(el); else el.classList.add("vu"); }); }
  observer($$("[data-reveal]"));
  observer($$("[data-cible]"));

  /* ---------------------------------------------------------------
     Manifeste : les mots s'allument au fil du défilement
     --------------------------------------------------------------- */
  var manifeste = $("#manifeste"), texteM = $("#manifeste-texte");
  var cles = /^(affiche|packaging|logo|LS|DESIGN,?|idées|visuels|remarquent,|retiennent\.)$/i;
  texteM.innerHTML = texteM.textContent.trim().split(/\s+/).map(function (m) {
    return '<span class="mot' + (cles.test(m) ? " cle" : "") + '">' + echap(m) + "</span>";
  }).join(" ");
  var motsM = $$(".mot", texteM);
  function majManifeste() {
    var r = manifeste.getBoundingClientRect(), vh = window.innerHeight;
    var p = clamp((vh * .55 - r.top) / Math.max(1, r.height - vh * .6), 0, 1);
    var n = Math.round(p * motsM.length);
    motsM.forEach(function (m, k) { m.classList.toggle("on", k < n); });
  }
  if (reduit) motsM.forEach(function (m) { m.classList.add("on"); });

  /* ---------------------------------------------------------------
     Boucle de défilement unique
     --------------------------------------------------------------- */
  var entete = $("#entete"), barre = $("#progression"), hautPage = $("#haut-page"), titreHero = $(".titre-hero"), accueil = $("#accueil");
  var dernierY = window.scrollY, vit = 0, enCours = false, menuOuvert = false;
  function cadre() {
    enCours = false;
    var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    barre.style.transform = "scaleX(" + (h > 0 ? y / h : 0).toFixed(4) + ")";
    entete.classList.toggle("defile", y > 30);
    entete.classList.toggle("cache", !menuOuvert && y > 400 && y > dernierY + 4 && !document.documentElement.classList.contains("modale-ouverte"));
    if (y < dernierY - 4 || y < 400) entete.classList.remove("cache");
    hautPage.classList.toggle("visible", y > 900);
    if (!reduit) {
      titreHero.style.setProperty("--h", clamp(y / (accueil.offsetHeight * .9), 0, 1).toFixed(3));
      vit += (clamp((y - dernierY) * .06, -2.5, 2.5) - vit) * .2;
      bandes.style.setProperty("--vit", vit.toFixed(3));
      majVitrine(); majManifeste();
      if (Math.abs(vit) > .02) demander();
    }
    dernierY = y;
  }
  function demander() { if (!enCours) { enCours = true; requestAnimationFrame(cadre); } }
  window.addEventListener("scroll", demander, { passive: true });
  window.addEventListener("resize", demander);
  cadre();

  /* ---------------------------------------------------------------
     Menu mobile + lien actif + retour en haut
     --------------------------------------------------------------- */
  var burger = $("#burger"), nav = $("#nav");
  function basculerMenu(ouvert) {
    menuOuvert = ouvert;
    burger.setAttribute("aria-expanded", String(ouvert));
    burger.setAttribute("aria-label", ouvert ? "Fermer le menu" : "Ouvrir le menu");
    nav.classList.toggle("ouverte", ouvert);
    document.documentElement.style.overflow = ouvert ? "hidden" : "";
  }
  burger.addEventListener("click", function () { basculerMenu(burger.getAttribute("aria-expanded") !== "true"); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) basculerMenu(false); });
  hautPage.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduit ? "auto" : "smooth" }); });
  if ("IntersectionObserver" in window) {
    var liens = $$(".nav > a[href^='#']:not(.btn)");
    var obsNav = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (en) {
        if (en.isIntersecting) liens.forEach(function (l) { l.setAttribute("aria-current", String(l.getAttribute("href") === "#" + en.target.id)); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["univers", "projets", "services", "apropos", "contact"].forEach(function (id) { var s = document.getElementById(id); if (s) obsNav.observe(s); });
  }

  /* ---------------------------------------------------------------
     Fenêtre projet
     --------------------------------------------------------------- */
  var modale = $("#modale"), fiche = $("#fiche"), panneau = $("#panneau"), dernierFocus = null, listeModale = [];
  var ioGal = null;

  function ouvrir(id, ev) {
    var p = projets.find(function (x) { return x.id === id; }); if (!p) return;
    listeModale = projets.filter(function (x) { return x.categorie === p.categorie; });
    var idx = listeModale.indexOf(p);
    var lignes = [["Client", p.client], ["Univers", cat[p.categorie] && cat[p.categorie].nom], ["Année", p.annee], p.video ? ["Format", "Vidéo verticale · 9:16"] : ["Visuels", String(visuels(p).length)]].filter(function (l) { return l[1]; });
    var blocs = [["Objectifs", p.objectifs], ["Solution créative", p.solution], ["Résultats", p.resultats]].filter(function (b) { return b[1]; });
    var prec = listeModale[(idx - 1 + listeModale.length) % listeModale.length], suiv = listeModale[(idx + 1) % listeModale.length];
    fiche.innerHTML = '<article class="fiche">' +
      '<div class="fiche-tete"><div><p class="surtitre">' + echap(cat[p.categorie] ? cat[p.categorie].nom : "Projet") + "</p>" +
      '<h2 id="fiche-titre">' + echap(p.titre) + '</h2><p class="desc">' + echap(p.description) + "</p></div>" +
      "<dl>" + lignes.map(function (l) { return "<dt>" + l[0] + "</dt><dd>" + echap(l[1]) + "</dd>"; }).join("") + "</dl></div>" +
      (blocs.length ? '<div class="blocs">' + blocs.map(function (b) { return '<div class="bloc"><h3>' + b[0] + "</h3><p>" + echap(b[1]) + "</p></div>"; }).join("") + "</div>" : "") +
      (p.video ? '<figure class="fiche-video"><video controls playsinline preload="metadata" poster="' + echap(p.couverture) + '" src="' + echap(p.video) + '"></video></figure>' : "") +
      '<div class="galerie">' + (p.video ? (p.images || []) : visuels(p)).map(function (src, i) {
        return "<figure>" + imgHTML(src, p.titre + " · visuel " + (i + 1), "", i < 4 ? "" : ' loading="lazy"') + "</figure>";
      }).join("") + "</div>" +
      '<div class="fiche-nav">' +
      (p.lien ? '<a class="btn btn-contour" href="' + echap(p.lien) + '" target="_blank" rel="noopener">Voir en ligne</a>' : "") +
      (listeModale.length > 1 ? '<button class="btn btn-contour" type="button" data-aller="' + echap(prec.id) + '">← ' + echap(prec.titre) + "</button>" +
        '<button class="btn btn-plein" type="button" data-aller="' + echap(suiv.id) + '">' + echap(suiv.titre) + " →</button>" : "") +
      '<a class="btn btn-contour" href="#contact" data-fermer>Un projet similaire ? Contactez-nous</a></div></article>';

    if (!modale.classList.contains("ouverte")) {
      dernierFocus = document.activeElement;
      if (ev && ev.clientX) { modale.style.setProperty("--ox", ev.clientX + "px"); modale.style.setProperty("--oy", ev.clientY + "px"); }
      modale.classList.add("ouverte");
      document.documentElement.classList.add("modale-ouverte");
      document.documentElement.style.overflow = "hidden";
    } else {
      var f = $(".fiche", fiche); f.style.animation = "none"; void f.offsetWidth; f.style.animation = "";
    }
    panneau.scrollTop = 0;
    if (ioGal) ioGal.disconnect();
    var figs = $$(".galerie figure", fiche);
    if ("IntersectionObserver" in window && !reduit) {
      ioGal = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("vu"); ioGal.unobserve(x.target); } }); }, { root: panneau, threshold: 0.05 });
      figs.forEach(function (f) { ioGal.observe(f); });
    } else figs.forEach(function (f) { f.classList.add("vu"); });
    $(".fermer", modale).focus({ preventScroll: true });
  }
  function fermer() {
    $$("video", fiche).forEach(function (v) { try { v.pause(); } catch (e) {} });
    modale.classList.remove("ouverte");
    document.documentElement.classList.remove("modale-ouverte");
    document.documentElement.style.overflow = "";
    if (dernierFocus) dernierFocus.focus({ preventScroll: true });
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-projet]");
    if (b && !modale.contains(b)) ouvrir(b.getAttribute("data-projet"), e);
  });
  modale.addEventListener("click", function (e) {
    var a = e.target.closest("[data-aller]"); if (a) { ouvrir(a.getAttribute("data-aller")); return; }
    if (e.target.closest("[data-fermer]")) fermer();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("ouverte")) { basculerMenu(false); burger.focus(); return; }
    if (!modale.classList.contains("ouverte")) return;
    if (e.key === "Escape") fermer();
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") { var b = $$("[data-aller]", modale)[e.key === "ArrowRight" ? 1 : 0]; if (b) b.click(); }
    if (e.key === "Tab") {
      var f = $$("button, a[href]", modale); if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ---------------------------------------------------------------
     Formulaire
     --------------------------------------------------------------- */
  var form = $("#formulaire"), retour = $("#retour-form");
  if (site.formspree) $("#note-form").textContent = "Votre demande nous est envoyée directement. Réponse sous 24 à 48 h.";
  function valider() {
    var ok = true;
    [["f-nom", function (v) { return v.length >= 2 || "Indiquez votre nom."; }],
     ["f-email", function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || "Indiquez une adresse e-mail valide (ex. nom@domaine.com)."; }],
     ["f-service", function (v) { return !!v || "Choisissez le service qui vous intéresse."; }],
     ["f-message", function (v) { return v.length >= 10 || "Décrivez votre projet en quelques mots (10 caractères minimum)."; }]
    ].forEach(function (r) {
      var el = document.getElementById(r[0]), champ = el.closest(".champ"), res = r[1](el.value.trim());
      champ.classList.toggle("invalide", res !== true);
      el.setAttribute("aria-invalid", String(res !== true));
      $(".erreur", champ).textContent = res === true ? "" : res;
      if (res !== true && ok) { el.focus(); ok = false; }
    });
    return ok;
  }
  $$("input, select, textarea", form).forEach(function (el) {
    el.addEventListener("input", function () { if (el.closest(".champ").classList.contains("invalide")) valider(); });
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    retour.hidden = true;
    if (!valider()) return;
    var d = {};
    $$("input, select, textarea", form).forEach(function (el) { d[el.name] = el.value.trim(); });
    var message = "Bonjour LS DESIGN,\n\nNom : " + d.nom + "\nE-mail : " + d.email + "\nService : " + d.service + (d.budget ? "\nBudget : " + d.budget : "") + "\n\nProjet :\n" + d.message;
    function proposerWhatsapp(classe, texte) {
      retour.className = "retour-form " + classe;
      retour.innerHTML = "<p>" + texte + '</p><a class="btn btn-whatsapp" target="_blank" rel="noopener" href="' + lienWhatsapp(message) + '">Envoyer ma demande sur WhatsApp</a>';
      retour.hidden = false;
    }
    if (!site.formspree) { proposerWhatsapp("info", "Votre demande est prête. Appuyez sur le bouton pour l'envoyer depuis WhatsApp."); return; }
    var bouton = $("button[type=submit]", form);
    bouton.disabled = true;
    fetch(site.formspree, { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(d) })
      .then(function (r) {
        if (!r.ok) throw new Error("http");
        retour.className = "retour-form ok";
        retour.innerHTML = "<p><strong>Merci " + echap(d.nom) + ", votre demande a bien été envoyée.</strong> Nous vous répondons rapidement.</p>";
        retour.hidden = false; form.reset();
      })
      .catch(function () { proposerWhatsapp("ko", "L'envoi n'a pas abouti. Vous pouvez envoyer la même demande par WhatsApp :"); })
      .then(function () { bouton.disabled = false; });
  });

  /* ---------------------------------------------------------------
     Curseur lumineux (ordinateur uniquement)
     --------------------------------------------------------------- */
  var curseur = $("#curseur");
  if (!reduit && pointeurFin) {
    var cx = 0, cy = 0, x = 0, y = 0, anim = false;
    var boucle = function () {
      cx += (x - cx) * .22; cy += (y - cy) * .22;
      curseur.style.transform = "translate(" + cx + "px," + cy + "px)";
      if (Math.abs(x - cx) > .2 || Math.abs(y - cy) > .2) requestAnimationFrame(boucle); else anim = false;
    };
    document.addEventListener("mousemove", function (e) {
      x = e.clientX; y = e.clientY; curseur.classList.add("actif");
      curseur.classList.toggle("survol", !!e.target.closest("a, button, select"));
      if (!anim) { anim = true; requestAnimationFrame(boucle); }
    });
    document.addEventListener("mouseleave", function () { curseur.classList.remove("actif"); });
  }

  $("#annee").textContent = new Date().getFullYear();
})();
