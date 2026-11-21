/* LS DESIGN — section Chartes graphiques + liseuse plein écran
   Les données viennent de CHARTES dans js/donnees.js. */
(function () {
  "use strict";
  var liste = (typeof CHARTES !== "undefined" ? CHARTES : []).filter(function (c) { return c.publie !== false && c.pages && c.pages.length; });
  var section = document.getElementById("chartes");
  if (!section || !liste.length) return;
  section.hidden = false;

  var reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function echap(t) { return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function nom(src) { return String(src).split("/").pop(); }
  function source(src, petit) {
    if (window.LS_PACK && /^images\//.test(src) && window.LS_PACK[nom(src)]) return window.LS_PACK[nom(src)];
    if (petit || window.LS_APERCU) {
      if (/^images\/projets\//.test(src)) return "images/miniatures/" + nom(src);
      if (/^images\/chartes\/[^/]+\/[^/]+$/.test(src)) return src.replace(/\/([^/]+)$/, "/mini/$1");
    }
    return src;
  }
  function img(src, alt, petit, lazy) {
    return '<img src="' + echap(source(src, petit)) + '" data-o="' + echap(src) + '" alt="' + echap(alt) + '" decoding="async"' + (lazy ? ' loading="lazy"' : "") + ' onerror="window.lsSecours&&lsSecours(this)">';
  }
  function n2(i) { return (i < 9 ? "0" : "") + (i + 1); }

  /* ---------- Rendu des chartes ---------- */
  var cible = document.getElementById("chartes-liste");
  cible.innerHTML = liste.map(function (c, ci) {
    var meta = [["Client", c.client], ["Secteur", c.secteur], ["Année", c.annee], ["Pages", String(c.pages.length)]].filter(function (m) { return m[1]; });
    var couleurs = (c.couleurs || []).filter(function (x) { return /^#[0-9a-f]{3,8}$/i.test(x); });
    return '<article class="charte" data-reveal>' +
      '<div class="charte-info">' +
        '<span class="charte-num">' + n2(ci) + " / " + n2(liste.length - 1) + "</span>" +
        "<h3>" + echap(c.nom) + "</h3>" +
        (c.description ? "<p>" + echap(c.description) + "</p>" : "") +
        "<dl>" + meta.map(function (m) { return "<div><dt>" + m[0] + "</dt><dd>" + echap(m[1]) + "</dd></div>"; }).join("") + "</dl>" +
        (couleurs.length ? '<ul class="charte-couleurs" aria-label="Couleurs de la charte">' + couleurs.map(function (x) { return '<li style="--c:' + x + '"><span>' + x.toUpperCase() + "</span></li>"; }).join("") + "</ul>" : "") +
        '<button class="btn btn-plein" type="button" data-charte="' + ci + '" data-page="0">Feuilleter la charte</button>' +
      "</div>" +
      '<div class="charte-pages" tabindex="0" aria-label="Pages de la charte ' + echap(c.nom) + '">' +
        c.pages.map(function (p, pi) {
          return '<button class="charte-page" type="button" data-charte="' + ci + '" data-page="' + pi + '" style="--i:' + pi + '">' +
            img(p, c.nom + " · page " + (pi + 1), true, pi > 2) + '<span class="charte-page-num">' + n2(pi) + "</span></button>";
        }).join("") +
      "</div></article>";
  }).join("");

  var chartesEls = cible.querySelectorAll(".charte");
  if ("IntersectionObserver" in window && !reduit) {
    var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("vu"); io.unobserve(x.target); } }); }, { threshold: 0.12 });
    chartesEls.forEach(function (el) { io.observe(el); });
  } else chartesEls.forEach(function (el) { el.classList.add("vu"); });

  /* Défilement des pages à la molette verticale sur ordinateur */
  cible.querySelectorAll(".charte-pages").forEach(function (rang) {
    rang.addEventListener("wheel", function (e) {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      var max = rang.scrollWidth - rang.clientWidth;
      if ((e.deltaY > 0 && rang.scrollLeft < max - 2) || (e.deltaY < 0 && rang.scrollLeft > 2)) { e.preventDefault(); rang.scrollLeft += e.deltaY; }
    }, { passive: false });
  });

  /* ---------- Liseuse ---------- */
  var lis = document.getElementById("liseuse"), scene = document.getElementById("liseuse-scene"),
      vign = document.getElementById("liseuse-vignettes"), titre = document.getElementById("liseuse-titre"),
      compte = document.getElementById("liseuse-compte"), courante = null, page = 0, retourFocus = null;

  function afficher(sens) {
    var c = courante;
    scene.innerHTML = '<figure class="liseuse-page' + (sens ? (sens > 0 ? " de-droite" : " de-gauche") : "") + '">' + img(c.pages[page], c.nom + " · page " + (page + 1), false, false) + "</figure>";
    compte.textContent = n2(page) + " / " + n2(c.pages.length - 1);
    vign.querySelectorAll("button").forEach(function (b, i) { b.classList.toggle("actif", i === page); if (i === page) b.scrollIntoView({ block: "nearest", inline: "center", behavior: reduit ? "auto" : "smooth" }); });
    var suivante = c.pages[page + 1]; if (suivante) { var pre = new Image(); pre.src = source(suivante, false); }
  }
  function ouvrir(ci, pi) {
    courante = liste[ci]; page = pi; retourFocus = document.activeElement;
    titre.textContent = "Charte graphique · " + courante.nom;
    vign.innerHTML = courante.pages.map(function (p, i) { return '<button type="button" data-lpage="' + i + '" aria-label="Page ' + (i + 1) + '">' + img(p, "", true, true) + "</button>"; }).join("");
    lis.hidden = false; void lis.offsetWidth; lis.classList.add("ouverte");
    document.documentElement.style.overflow = "hidden";
    afficher(0);
    lis.querySelector("[data-lfermer]").focus({ preventScroll: true });
  }
  function fermer() {
    lis.classList.remove("ouverte"); document.documentElement.style.overflow = "";
    setTimeout(function () { lis.hidden = true; scene.innerHTML = ""; }, reduit ? 0 : 300);
    if (retourFocus) retourFocus.focus({ preventScroll: true });
  }
  function aller(pas) {
    var n = page + pas; if (n < 0 || n >= courante.pages.length) return;
    page = n; afficher(pas);
  }
  cible.addEventListener("click", function (e) {
    var b = e.target.closest("[data-charte]"); if (b) ouvrir(+b.getAttribute("data-charte"), +b.getAttribute("data-page"));
  });
  lis.addEventListener("click", function (e) {
    if (e.target.closest("[data-lfermer]") || e.target === scene) { fermer(); return; }
    var p = e.target.closest("[data-lpas]"); if (p) { aller(+p.getAttribute("data-lpas")); return; }
    var v = e.target.closest("[data-lpage]"); if (v) { var n = +v.getAttribute("data-lpage"); var s = n - page; page = n; afficher(s); }
  });
  document.addEventListener("keydown", function (e) {
    if (lis.hidden) return;
    if (e.key === "Escape") fermer();
    else if (e.key === "ArrowRight") aller(1);
    else if (e.key === "ArrowLeft") aller(-1);
    else if (e.key === "Tab") {
      var f = lis.querySelectorAll("button"); if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  var x0 = null;
  scene.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  scene.addEventListener("touchend", function (e) {
    if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 45) aller(dx < 0 ? 1 : -1);
  });
})();
