# Site LS DESIGN : guide d'utilisation

Ce dossier contient ton site portfolio complet. Il fonctionne sans installation : pas de Node.js, pas de base de données, pas de compte à créer pour l'essayer.

## Pourquoi un site « statique » plutôt que Next.js ?

Le brief proposait React/Next.js. Pour un portfolio, j'ai choisi du HTML, CSS et JavaScript simples parce que :

- tu peux modifier tes projets dans **un seul fichier texte**, sans rien compiler ;
- le site s'ouvre en double-cliquant sur `index.html` ;
- on le met en ligne gratuitement en glissant le dossier sur Netlify (voir plus bas) ;
- il est très rapide à charger, même en 3G/4G, et aucune bibliothèque externe n'est à maintenir.

## Contenu du dossier

```
ls-design-site/
├── index.html            → la page (structure et textes fixes)
├── css/style.css         → le design (couleurs, polices, animations)
├── js/donnees.js         → ⭐ TES DONNÉES : projets, contacts, réseaux
├── js/main.js            → le fonctionnement (filtres, fenêtre projet, formulaire)
├── images/
│   ├── projets/          → images en grand (1600 px)
│   ├── miniatures/       → images réduites pour la grille (720 px)
│   ├── logo-ls-design.png, logo-symbole.png
│   ├── favicon.png, apple-touch-icon.png
│   └── apercu-partage.jpg → image affichée quand on partage le lien
├── robots.txt, sitemap.xml
└── GUIDE.md              → ce guide
```

## 1. Voir le site sur ton ordinateur

Double-clique sur `index.html`. Il s'ouvre dans ton navigateur. Les polices Montserrat et Inter se chargent depuis Google Fonts : il faut une connexion internet pour les voir.

## 2. Ajouter une nouvelle réalisation

1. **Prépare l'image** depuis Photoshop : *Fichier › Exportation › Exporter sous…*, format JPG, qualité 80 %.
   - une version de **1600 px** de large → dans `images/projets/`
   - une version de **720 px** → dans `images/miniatures/` (même nom de fichier)
   - nom de fichier sans espace ni accent, par exemple `boutique-awa-logo.jpg`
2. **Ouvre `js/donnees.js`** avec le Bloc-notes (ou mieux, [VS Code](https://code.visualstudio.com), gratuit).
3. Descends jusqu'à `const PROJETS = [`, copie le **MODÈLE** situé juste au-dessus, colle-le juste après `[`, puis remplis :

```js
  {
    id: "boutique-awa-logo",
    titre: "Logo Boutique Awa",
    categorie: "identite",
    client: "Boutique Awa",
    annee: "2026",
    description: "Logo et cartes de visite pour une boutique de prêt-à-porter.",
    objectifs: "",
    solution: "",
    couverture: P + "boutique-awa-logo.jpg",
    miniature: M + "boutique-awa-logo.jpg",
    images: [P + "boutique-awa-cartes.jpg"],
    publie: true,
    vedette: false
  },
```

4. Enregistre et recharge la page.

**Astuces**
- `P +` signifie « dans images/projets/ », `M +` signifie « dans images/miniatures/ ».
- Tu peux aussi mettre une adresse d'image en ligne : `couverture: "https://…/image.jpg"`.
- Les univers possibles : `perez-dakar`, `perez-france`, `abel`, `identite` (logos & chartes), `pub` (affiches publicitaires), `packaging`.
- Chaque univers a sa bande défilante en haut de page et son chapitre dans la grande vitrine animée : ajouter un projet les met à jour automatiquement.
- Optionnel : une version de 340 px de l'image dans `images/bande/` (même nom) allège les bandes défilantes.
- `publie: false` masque un projet sans le supprimer.
- `vedette: true` : les 3 premiers projets « vedette » apparaissent dans la composition de l'accueil.
- L'ordre de la liste = l'ordre d'affichage. Mets tes meilleurs projets en premier.
- `resultats` : remplis-le seulement si tu as des chiffres réels (ex. « +30 % d'abonnés en 2 mois »).
- Une catégorie sans projet n'apparaît pas dans les filtres.
- Si la page devient vide après une modification, il manque probablement une virgule ou un guillemet : compare avec un projet existant.

## 2 bis. Ajouter une vidéo (univers « Motion design »)

1. Exporte la vidéo en **MP4 vertical 720 × 1280** (H.264), idéalement moins de 8 Mo, et place-la dans `videos/` (nom sans espace ni accent).
2. Exporte une image de couverture (une image fixe de la vidéo) en JPG dans `images/projets/` (1080 px de large), `images/miniatures/` (720 px) et `images/bande/` (340 px), avec le même nom.
3. Dans `js/donnees.js`, copie un projet `motion-…` existant et change `id`, `titre`, `client`, `description`, `couverture`, `miniature` et `video: V + "ma-video.mp4"`.

La vidéo s'affiche en premier dans la fenêtre du projet, avec le lecteur intégré, et la carte porte le badge « ▶ Vidéo ».

## 3. Modifier tes coordonnées et réseaux

Tout est en haut de `js/donnees.js`, dans `SITE` : téléphone, numéro WhatsApp, e-mail, adresse du site et pages Facebook, Instagram et TikTok de LS DESIGN. Tant qu'une adresse est vide, le bouton ouvre une recherche « LS DESIGN » sur le réseau : colle l'adresse exacte de ta page pour qu'il y mène directement.

## 4. Le formulaire de contact

- **Par défaut** : quand un visiteur remplit le formulaire, sa demande est mise en forme et un bouton lui permet de l'envoyer sur ton WhatsApp. Rien n'est envoyé sans son action.
- **Pour recevoir les demandes par e-mail** :
  1. crée un compte gratuit sur [formspree.io](https://formspree.io) ;
  2. crée un formulaire, copie son adresse (du type `https://formspree.io/f/abcdwxyz`) ;
  3. colle-la dans `formspree: ""` dans `js/donnees.js`.
  Le message « Votre demande a bien été envoyée » ne s'affiche que si l'envoi a réellement réussi.

## 5. Mettre le site en ligne (gratuit)

**Option la plus simple : Netlify Drop**
1. Va sur [app.netlify.com/drop](https://app.netlify.com/drop) et crée un compte.
2. Glisse le dossier `ls-design-site` entier sur la page.
3. Ton site est en ligne en quelques secondes, avec une adresse du type `ls-design.netlify.app` (modifiable dans *Site configuration › Change site name*).
4. Pour mettre à jour : *Deploys* › glisse à nouveau le dossier.

**Autres options** : GitHub Pages, Vercel ou Cloudflare Pages fonctionnent aussi.

**Nom de domaine** (ex. `lsdesign.sn` ou `lsdesign.com`) : achète-le chez un registraire, puis dans Netlify, *Domain management › Add a domain* et suis les instructions.

## 6. À remplacer avant la publication

| Où | Quoi |
|---|---|
| `js/donnees.js` → `reseaux` | Adresses exactes des pages Facebook et Instagram LS DESIGN (TikTok est rempli) |
| `js/donnees.js` → `email`, `siteWeb` | Ton e-mail pro et l'adresse finale du site |
| `js/donnees.js` → `formspree` | Facultatif, pour recevoir les demandes par e-mail |
| `js/donnees.js` → projet `exemple-video` | Remplace l'exemple par une vraie vidéo (image de couverture + lien TikTok/YouTube) et supprime `exemple: true` |
| `js/donnees.js` → textes des projets | Relis les descriptions, objectifs et solutions : je les ai rédigés d'après les visuels, ajuste-les à la réalité de chaque mission |
| `js/donnees.js` → `client` | Vérifie que chaque client accepte d'être cité ; sinon mets `client: ""` |
| Catégorie « Chartes graphiques » | Ajoute tes chartes (par ex. les pages de `CHARTE.pdf` exportées en JPG) avec `categorie: "charte"` |
| `index.html` → balises `og:url` et `og:image` | Mets l'adresse complète du site, ex. `https://lsdesign.sn/images/apercu-partage.jpg` |
| `robots.txt`, `sitemap.xml` | Remplace `VOTRE-DOMAINE` par ton domaine |
| `index.html` → `<title>` et `description` | Ajuste si tu veux d'autres mots-clés pour Google |

## 7. Bon à savoir

- Le site respecte le réglage « réduire les animations » des téléphones et ordinateurs.
- Le curseur personnalisé n'apparaît que sur ordinateur.
- Navigation au clavier : Tab pour avancer, Échap pour fermer un projet, flèches gauche/droite pour passer d'un projet à l'autre.
- Le site n'est pas indexé par Google tant qu'il n'est pas en ligne. Une fois publié, tu peux l'ajouter à la [Google Search Console](https://search.google.com/search-console) pour accélérer son référencement.
