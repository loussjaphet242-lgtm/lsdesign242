/* =====================================================================
   LS DESIGN — FICHIER DE DONNÉES DU SITE
   ---------------------------------------------------------------------
   C'est LE SEUL fichier à modifier pour mettre à jour le site :
     1. SITE       → coordonnées et pages Facebook / Instagram / TikTok
     2. CATEGORIES → les univers du portfolio (filtres + bandes défilantes)
     3. PROJETS    → tes réalisations (ajouter / modifier / masquer)

   Règles simples :
   - Chaque texte s'écrit entre guillemets "…".
   - Chaque élément d'une liste se termine par une virgule.
   - Après modification, enregistre le fichier et recharge la page.
   ===================================================================== */


/* ---------------------------------------------------------------------
   1. INFORMATIONS GÉNÉRALES
   --------------------------------------------------------------------- */
const SITE = {
  nom: "LS DESIGN",
  slogan: "Nous donnons vie à vos idées.",
  signature: "Votre vision. Notre signature.",
  ville: "Dakar, Sénégal",

  // Numéro affiché + numéro WhatsApp (format international SANS + ni espaces)
  telephoneAffiche: "+221 70 914 4136",
  whatsapp: "221709144136",
  messageWhatsapp: "Bonjour LS DESIGN, j'aimerais parler d'un projet.",

  siteWeb: "",   // À REMPLACER : adresse du site une fois en ligne
  email: "",     // optionnel : ton adresse e-mail pro

  // PAGES LS DESIGN SUR LES RÉSEAUX
  // Colle ici l'adresse exacte de chaque page (copie-la depuis la barre
  // d'adresse de ton navigateur ou via « Partager le profil »).
  // Tant qu'une adresse est vide "", le bouton ouvre une recherche « LS DESIGN »
  // sur le réseau : remplace-la par l'adresse exacte de ta page.
  reseaux: {
    facebook: "",   // À REMPLACER : ex. "https://www.facebook.com/lsdesign"
    instagram: "",  // À REMPLACER : ex. "https://www.instagram.com/lsdesign"
    tiktok: "https://www.tiktok.com/@loussiangoyiscott"
  },

  // FORMULAIRE : laisse "" pour envoyer les demandes via WhatsApp,
  // ou colle l'adresse d'un formulaire https://formspree.io pour les recevoir par e-mail.
  formspree: ""
};


/* ---------------------------------------------------------------------
   2. UNIVERS DU PORTFOLIO
   "id" sert dans les projets ; "nom" est le texte affiché ; "court" sert dans
   les petits espaces ; "texte" est la phrase affichée dans la grande vitrine.
   L'ordre ici = l'ordre des filtres et des bandes défilantes de l'accueil.
   Un univers sans projet publié n'apparaît pas.
   --------------------------------------------------------------------- */
const CATEGORIES = [
  { id: "perez-dakar",  nom: "Église · Perez Chapel Dakar",  court: "Perez Chapel Dakar",
    texte: "Une affiche chaque semaine, jamais la même. Cultes de célébration, enseignements, fêtes, citations et miniatures YouTube pour l'église Perez Chapel Dakar." },
  { id: "perez-france", nom: "Église · Perez Chapel France", court: "Perez Chapel France",
    texte: "Cultes, Nuit de la Traversée, retraites et 21 jours de jeûne pour Perez Chapel France, avec des gabarits pensés pour publier chaque jour." },
  { id: "abel",         nom: "Abel Food",                     court: "Abel Food",
    texte: "Sachets, boîtes, étiquettes, stand de foire et campagnes réseaux sociaux pour une marque agroalimentaire sénégalaise." },
  { id: "identite",     nom: "Logos & chartes graphiques",    court: "Logos & chartes",
    texte: "Logos, monogrammes et identités déclinés sur façades, enseignes, sacs, étiquettes et t-shirts." },
  { id: "pub",          nom: "Affiches publicitaires",        court: "Affiches pub",
    texte: "Croisades, masterclass, formations et concerts : des affiches qui attirent l'œil et donnent l'essentiel en un regard." },
  { id: "packaging",    nom: "Packaging & étiquettes",        court: "Packaging",
    texte: "Boîtes d'infusions, pots d'épices et étiquettes de bouteilles pour des marques locales." },
  { id: "motion",       nom: "Vidéo · Motion design",         court: "Motion design",
    texte: "Spots publicitaires, catalogues animés et annonces d'événements en vidéo verticale, prêts pour TikTok, Instagram et WhatsApp." }
];


/* ---------------------------------------------------------------------
   3. PROJETS
   ---------------------------------------------------------------------
   COMMENT AJOUTER UNE RÉALISATION :
     a) Mets ton image (JPG, 1600 px de large conseillé) dans images/projets/
        et une version réduite (720 px) dans images/miniatures/ (même nom).
        Une version de 340 px dans images/bande/ est facultative : elle sert
        aux bandes défilantes (sinon la miniature est utilisée).
     b) Copie le MODÈLE ci-dessous, colle-le dans la liste PROJETS et remplis-le.

   MODÈLE :
   {
     id: "nom-unique-sans-espace",
     titre: "Titre du projet",
     categorie: "perez-dakar",        // un "id" de CATEGORIES
     client: "Nom du client",         // "" si tu ne peux pas le citer
     annee: "2026",
     description: "Une ou deux phrases sur le projet.",
     objectifs: "",                   // facultatif
     solution: "",                    // facultatif
     couverture: P + "mon-image.jpg",
     miniature: M + "mon-image.jpg",
     images: [P + "mon-image-2.jpg"], // galerie, facultatif
     video: "videos/ma-video.mp4",     // facultatif : vidéo MP4 (720 x 1280), affichée en premier
     publie: true,                    // false = projet masqué
     vedette: false                   // true = mis en avant dans le grand défilé
   },

   L'ordre de la liste = l'ordre d'affichage dans « Tous les projets ».
   --------------------------------------------------------------------- */
const P = "images/projets/";
const M = "images/miniatures/";
const V = "videos/";

const PROJETS = [
  {
    id: "perez-cultes",
    titre: "Cultes de célébration",
    categorie: "perez-dakar",
    client: "Perez Chapel Dakar",
    annee: "2023 – 2026",
    description: "Une affiche différente chaque dimanche pour le culte de célébration : orateur du jour, date, heure, adresse et diffusion en direct, avec une nouvelle mise en page à chaque fois.",
    objectifs: "Donner envie de venir chaque semaine sans lasser l'audience, tout en gardant les informations pratiques toujours au même niveau de lisibilité.",
    solution: "Une base fixe (logo, adresse, réseaux) et une composition renouvelée à chaque édition : typographies, couleurs et mises en scène de l'orateur.",
    couverture: P + "perez-cdc-grace-joel-ciel.jpg",
    miniature: M + "perez-cdc-grace-joel-ciel.jpg",
    images: [P + "perez-cdc-kiki-15-juin-2025.jpg", P + "perez-cdc-kiki-22-juin-2025.jpg", P + "perez-cdc-kiki-27-juil-2025.jpg", P + "perez-cdc-23-mars-2025.jpg", P + "perez-cdc-kiki-16-mars-noir.jpg", P + "perez-cdc-bright-11-oct-2026.jpg", P + "perez-cdc-kiki-01-juin.jpg", P + "perez-cdc-09-mars-2025.jpg", P + "perez-cdc-kiki-13-juil-2025-rouge.jpg", P + "perez-cdc-kiki-13-juil-2025-costume.jpg", P + "perez-cdc-ngoua-amour-du-senegal.jpg", P + "perez-culte-relax-11-mai-2025.jpg", P + "perez-cdc-grace-joel-21-juin-2026-bis.jpg", P + "perez-cdc-16-juin-2024.jpg", P + "perez-cdc-grace-joel-20-sept-2026.jpg", P + "perez-cdc-ngoua-31-dec-2023.jpg", P + "perez-cdc-ngoma-16-fev-2025.jpg", P + "perez-cdc-grace-joel-10-mai-2026.jpg", P + "perez-cdc-grace-joel-03-mai-2026.jpg", P + "perez-cdc-kiki-13-juil-2025.jpg", P + "perez-cdc-muamba-05-oct-2025.jpg", P + "perez-cdc-grace-joel-12-juil-2026.jpg", P + "perez-cdc-grace-joel-19-juil-2026.jpg", P + "perez-cdc-grace-joel-26-avril-2026.jpg", P + "perez-cdc-muamba-22-mars-2026.jpg", P + "perez-cdc-grace-joel-25-janvier-2026.jpg", P + "perez-cdc-18-janvier-2026.jpg", P + "perez-cdc-joel-kiki-17-aout-rouge.jpg", P + "perez-cdc-joel-kiki-17-aout-bleu.jpg", P + "perez-cdc-27-avril-2025.jpg", P + "perez-cdc-bright.jpg", P + "perez-cdc-bright-2.jpg", P + "perez-cdc-grace-joel-cercle.jpg", P + "perez-cdc-grace-joel-avril.jpg", P + "perez-cdc-grace-joel-ruban.jpg", P + "perez-cdc-grace-joel-sept.jpg", P + "perez-cdc-grace-joel-06-sept.jpg", P + "perez-cdc-grace-joel-juillet.jpg", P + "perez-cdc-grace-joel-mai.jpg", P + "perez-cdc-octobre.jpg", P + "perez-cdc-muamba.jpg", P + "perez-cdc-muamba-fevrier.jpg", P + "perez-cdc-ngoua-janvier.jpg", P + "perez-cdc-ngoua-decembre.jpg", P + "perez-cdc-kiki.jpg", P + "perez-cdc-zagnidjys.jpg", P + "perez-cdc-ngoua-aout-rouge.jpg", P + "perez-cdc-ngoua-aout-blanc.jpg", P + "perez-cdc-grace-joel-aout.jpg", P + "perez-cdc-grace-joel-jan.jpg", P + "perez-cdc-muamba-aout.jpg", P + "perez-cdc-kiki-vert.jpg", P + "perez-cdc-kiki-avril.jpg", P + "perez-cdc-kiki-sept.jpg", P + "perez-cdc-kiki-dec.jpg", P + "perez-cdc-ngoua-jan-2025.jpg", P + "perez-action-de-grace-2026.jpg", P + "perez-cdc-chaque-dimanche.jpg", P + "perez-cdc-grace-joel-16-aout.jpg", P + "perez-cdc-grace-joel-juin-2026.jpg", P + "perez-cdc-grace-joel-fev-2026.jpg", P + "perez-cdc-grace-joel-21-sept.jpg", P + "perez-cdc-kiki-jan-2026.jpg", P + "perez-cdc-kiki-31-aout.jpg", P + "perez-cdc-kiki-24-aout.jpg", P + "perez-cdc-muamba-mars.jpg", P + "perez-cdc-ngoma-16-fev.jpg", P + "perez-cdc-ngoma-23-fev.jpg", P + "perez-cdc-impacter-2023.jpg", P + "perez-action-de-grace-2023.jpg", P + "perez-cdc-kiki-16-mars-violet.jpg", P + "perez-cdc-kiki-16-mars-bleu.jpg", P + "perez-cdc-grace-joel-05-juil.jpg", P + "perez-cdc-grace-joel-21-juin.jpg", P + "perez-cdc-kiki-18-mai.jpg", P + "perez-cdc-12-oct-2025.jpg", P + "perez-cdc-kiki-12-oct.jpg"],
    publie: true,
    vedette: true
  },
  {
    id: "abel-food-packaging",
    titre: "Gamme de sachets Abel Food",
    categorie: "abel",
    client: "Abel Food",
    annee: "2025 – 2026",
    description: "Packaging d'une gamme de produits locaux transformés : boîtes Abel Protéine, Céréales Croissance et Fonio précuit, poudres de bissap et de bouye, farine Diongoma, petit cola.",
    objectifs: "Donner à chaque produit une identité gourmande et reconnaissable en rayon, tout en gardant une ligne commune à la marque.",
    solution: "Un code couleur par produit, des visuels d'ingrédients mis en scène, et des mises en situation photoréalistes pour la communication.",
    couverture: P + "abel-sachet-bissap.jpg",
    miniature: M + "abel-sachet-bissap.jpg",
    images: [P + "abel-proteine-flocons-story.jpg", P + "abel-moringa-jungle.jpg", P + "abel-mam-booy-lilas.jpg", P + "abel-diongoma-boite-foret.jpg", P + "abel-poudre-bouye-ambiance.jpg", P + "abel-proteine-disponible.jpg", P + "abel-proteine-sachet.jpg", P + "abel-diongoma-boite.jpg", P + "abel-cereales-croissance-sachet.jpg", P + "abel-mam-booy-sachet.jpg", P + "abel-mam-booy-boite.jpg", P + "abel-petit-cola-brun.jpg", P + "abel-farine-manioc.jpg", P + "abel-petit-cola-gingembre.jpg", P + "abel-mam-booy.jpg", P + "abel-poudre-moringa.jpg", P + "abel-ngourbane.jpg", P + "abel-farine-diongoma-studio.jpg", P + "abel-farine-diongoma-arche.jpg", P + "abel-farine-diongoma-plateau.jpg", P + "abel-proteine-boite.jpg", P + "abel-pack-cereales-croissance.jpg", P + "abel-pack-fonio.jpg", P + "abel-sachet-bouye.jpg", P + "abel-farine-diongoma.jpg", P + "abel-nouveau-look.jpg", P + "abel-petit-cola.jpg", P + "abel-petit-cola-serie.jpg"],
    publie: true,
    vedette: true
  },
  {
    id: "perez-france-cultes",
    titre: "Cultes & événements",
    categorie: "perez-france",
    client: "Perez Chapel France",
    annee: "2025 – 2026",
    description: "Culte des familles, cultes de célébration, actions de grâce, onction et Sainte Cène, Nuit du talk-show, tournoi de five, Pâques, jeûne et prières, prière d'intercession, session de baptême, Pentecôte en blanc, Nuit de la Traversée avec son compte à rebours, consécrations et communiqués de l'église à Pantin.",
    couverture: P + "perez-france-culte-familles.jpg",
    miniature: M + "perez-france-culte-familles.jpg",
    images: [P + "perez-france-retraite-priere-tricolore.jpg", P + "perez-france-retraite-priere-fev-2026.jpg", P + "perez-france-five-foot-blanc.jpg", P + "perez-france-paques-05-avril-2026.jpg", P + "perez-france-cdc-26-avril-2026.jpg", P + "perez-france-cdc-19-avril-2026.jpg", P + "perez-france-cdc-03-mai-2026.jpg", P + "perez-france-jeune-prieres-avril-2026.jpg", P + "perez-france-cdc-10-mai-2026.jpg", P + "perez-france-cdc-07-juin-2026.jpg", P + "perez-france-priere-intercession.jpg", P + "perez-france-cdc-14-juin-2026.jpg", P + "perez-france-cdc-16-aout-2026.jpg", P + "perez-france-bapteme-22-aout-2026.jpg", P + "perez-france-cdc-31-mai-2026.jpg", P + "perez-france-cdc-21-juin-2026.jpg", P + "perez-france-cdc-08-mars-2026.jpg", P + "perez-france-cdc-15-mars-2026.jpg", P + "perez-france-cdc-22-mars-2026.jpg", P + "perez-france-cdc-29-mars-2026.jpg", P + "perez-france-cdc-01-mars-2026.jpg", P + "perez-france-onction-cene-01-fev-2026.jpg", P + "perez-france-actions-grace-02-nov-2025.jpg", P + "perez-france-actions-grace-09-nov.jpg", P + "perez-france-talk-show-coeur-ouvert.jpg", P + "perez-france-five-foot.jpg", P + "perez-france-agape-noel-2025.jpg", P + "perez-france-cdc-22-fev-2026.jpg", P + "perez-france-pentecote-2026.jpg", P + "perez-nuit-traversee.jpg", P + "perez-france-j-3-traversee.jpg", P + "perez-france-j-1-traversee.jpg", P + "perez-france-celebrons.jpg", P + "perez-france-culte-adoration.jpg", P + "perez-france-consecration-aout.jpg", P + "perez-france-communique.jpg"],
    publie: true,
    vedette: true
  },
  {
    id: "motion-ls-design-spot",
    titre: "Spot LS DESIGN",
    categorie: "motion",
    client: "LS DESIGN",
    annee: "2026",
    description: "Spot vertical de 30 secondes qui présente le studio : logos et identités visuelles, packagings, montage vidéo et motion design, depuis Dakar.",
    couverture: P + "motion-ls-design-spot.jpg",
    miniature: M + "motion-ls-design-spot.jpg",
    images: [],
    video: V + "motion-ls-design-spot.mp4",
    publie: true,
    vedette: true
  },
  {
    id: "motion-thetop-premium",
    titre: "Thé Top Premium · Film de gamme",
    categorie: "motion",
    client: "Thé Top",
    annee: "2026",
    description: "Film vertical qui présente la gamme premium Thé Top : trois infusions, trois expériences, un seul plaisir.",
    couverture: P + "motion-thetop-premium.jpg",
    miniature: M + "motion-thetop-premium.jpg",
    images: [],
    video: V + "motion-thetop-premium.mp4",
    publie: true,
    vedette: false
  },
  {
    id: "motion-thetop-minute-detox",
    titre: "Minute Detox · Publicité 60 s",
    categorie: "motion",
    client: "Thé Top",
    annee: "2026",
    description: "Publicité de 60 secondes pour l'infusion Minute Detox de Thé Top : les ingrédients un à un (cannelle, bissap…), la préparation, puis le produit.",
    couverture: P + "motion-thetop-minute-detox.jpg",
    miniature: M + "motion-thetop-minute-detox.jpg",
    images: [],
    video: V + "motion-thetop-minute-detox.mp4",
    publie: true,
    vedette: false
  },
  {
    id: "motion-abel-catalogue",
    titre: "Catalogue animé Abel Food",
    categorie: "motion",
    client: "Abel Food",
    annee: "2026",
    description: "Catalogue produits animé de 60 secondes avec voix off : les gammes d'épices, Sutura, les infusions Teatop et les céréales Mam Booy, puis un appel à commander.",
    couverture: P + "motion-abel-catalogue.jpg",
    miniature: M + "motion-abel-catalogue.jpg",
    images: [],
    video: V + "motion-abel-catalogue.mp4",
    publie: true,
    vedette: false
  },
  {
    id: "motion-abel-cereales-croissance",
    titre: "Céréales Croissance · Spot",
    categorie: "motion",
    client: "Abel Food",
    annee: "2026",
    description: "Spot vertical pour les céréales Croissance d'Abel Food, enrichies au moringa : « Bien grandir commence par une bonne alimentation ».",
    couverture: P + "motion-abel-cereales-croissance.jpg",
    miniature: M + "motion-abel-cereales-croissance.jpg",
    images: [],
    video: V + "motion-abel-cereales-croissance.mp4",
    publie: true,
    vedette: false
  },
  {
    id: "motion-abel-mam-booy",
    titre: "Céréales Mam Booy · Spot",
    categorie: "motion",
    client: "Abel Food",
    annee: "2026",
    description: "Spot pour les céréales Mam Booy : céréales complètes enrichies au moringa, riches en antioxydants, fer, fibres et magnésium, sans additif.",
    couverture: P + "motion-abel-mam-booy.jpg",
    miniature: M + "motion-abel-mam-booy.jpg",
    images: [],
    video: V + "motion-abel-mam-booy.mp4",
    publie: true,
    vedette: false
  },
  {
    id: "motion-abel-proteine",
    titre: "Abel Protéine · Spot",
    categorie: "motion",
    client: "Abel Food",
    annee: "2026",
    description: "Spot pour Abel Protéine, à base de flocons d'avoine : protéines, fibres et minéraux, une préparation instantanée en trois étapes.",
    couverture: P + "motion-abel-proteine.jpg",
    miniature: M + "motion-abel-proteine.jpg",
    images: [],
    video: V + "motion-abel-proteine.mp4",
    publie: true,
    vedette: false
  },
  {
    id: "motion-perez-3-jours",
    titre: "3 jours de jeûne et prières · Motion",
    categorie: "motion",
    client: "Perez Chapel Dakar",
    annee: "2026",
    description: "Annonce animée des trois jours de jeûne et de prières du 28 au 30 octobre 2026, avec le programme et le lien Zoom.",
    couverture: P + "motion-perez-3-jours.jpg",
    miniature: M + "motion-perez-3-jours.jpg",
    images: [],
    video: V + "motion-perez-3-jours.mp4",
    publie: true,
    vedette: false
  },
  {
    id: "motion-perez-culte-01-nov",
    titre: "Culte de célébration · Spot",
    categorie: "motion",
    client: "Perez Chapel Dakar",
    annee: "2026",
    description: "Spot d'invitation au culte de célébration du dimanche 1er novembre : louanges, lieu du rendez-vous et affiche finale.",
    couverture: P + "motion-perez-culte-01-nov.jpg",
    miniature: M + "motion-perez-culte-01-nov.jpg",
    images: [],
    video: V + "motion-perez-culte-01-nov.mp4",
    publie: true,
    vedette: false
  },
  {
    id: "motion-fae-la-minute",
    titre: "La minute FAE",
    categorie: "motion",
    client: "Fondation Africaine pour l'Éducation",
    annee: "2026",
    description: "Capsule vidéo « La minute FAE » : une minute, une compétence, un nouveau réflexe. Des conseils pratiques pour apprendre à communiquer et réussir.",
    couverture: P + "motion-fae-la-minute.jpg",
    miniature: M + "motion-fae-la-minute.jpg",
    images: [],
    video: V + "motion-fae-la-minute.mp4",
    publie: true,
    vedette: false
  },
  {
    id: "mayakids",
    titre: "Identité visuelle Ma'Ya Kids",
    categorie: "identite",
    client: "Ma'Ya Kids",
    annee: "2026",
    description: "Création du logo et de l'univers d'une marque pour enfants, présentés sur façade, abribus, affichage et décor intérieur.",
    objectifs: "Créer un signe simple, coloré et mémorable, qui fonctionne en grand format comme en petit.",
    solution: "Un monogramme « M » en dégradé rose-bleu, décliné en enseigne, store, panneaux et mises en situation.",
    couverture: P + "mayakids-facade.jpg",
    miniature: M + "mayakids-facade.jpg",
    images: [P + "mayakids-tote-bag.jpg", P + "mayakids-logo-principal.jpg", P + "mayakids-direction-artistique.jpg", P + "mayakids-typographies.jpg", P + "mayakids-positionnement.jpg", P + "mayakids-sweatshirts.jpg", P + "mayakids-store.jpg", P + "mayakids-affichage.jpg", P + "mayakids-abribus.jpg", P + "mayakids-accueil.jpg", P + "mayakids-lifestyle.jpg", P + "mayakids-mugs.jpg", P + "mayakids-drapeaux.jpg", P + "mayakids-goodies.jpg", P + "mayakids-panneau-famille.jpg", P + "mayakids-body-veste.jpg", P + "mayakids-vitrine.jpg", P + "mayakids-pochettes.jpg", P + "mayakids-boite.jpg", P + "mayakids-enseigne-immeuble.jpg", P + "mayakids-declinaisons-logo.jpg", P + "mayakids-sacs.jpg", P + "mayakids-casquette.jpg", P + "mayakids-plaque.jpg", P + "mayakids-etiquette.jpg", P + "mayakids-bureau.jpg", P + "mayakids-stand.jpg"],
    publie: true,
    vedette: true
  },
  {
    id: "synagogue-delivrance",
    titre: "Rencontres prophétiques",
    categorie: "pub",
    client: "Église Synagogue du Sénégal",
    annee: "2026",
    description: "Affiches de rencontres et croisades prophétiques à Dakar (« La délivrance des familles », « Renverser celui qui se cache derrière ma souffrance », « Opération retour à l'envoyeur ») la grande croisade de miracle et guérison à Ziguinchor « Prophète, mon cas est urgent », « Jésus guérit encore », « Détruire le règne de la sorcellerie familiale », « Allons-y chez le voyant » et la « Nuit du jugement », avec les orateurs mis en avant. Également « Énergie 2026 » et « Accédez à l'onction royale ».",
    couverture: P + "synagogue-onction-royale.jpg",
    miniature: M + "synagogue-onction-royale.jpg",
    images: [P + "perez-energie-2026-merci.jpg", P + "synagogue-delivrance-familles.jpg", P + "synagogue-renverser.jpg", P + "synagogue-retour-envoyeur.jpg", P + "synagogue-croisade-ziguinchor.jpg", P + "synagogue-delivrance-prophetique-duo.jpg", P + "synagogue-delivrance-prophetique-kairos.jpg", P + "synagogue-souffrance-duo.jpg", P + "synagogue-souffrance-kairos.jpg", P + "synagogue-cas-urgent-duo.jpg", P + "synagogue-cas-urgent-kairos.jpg", P + "synagogue-jesus-guerit-duo.jpg", P + "synagogue-jesus-guerit-kairos.jpg", P + "synagogue-sorcellerie-familiale.jpg", P + "synagogue-delivrance-actes-3.jpg", P + "synagogue-voyant.jpg", P + "synagogue-nuit-jugement.jpg", P + "perez-energie-2026.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "farc",
    titre: "Festival au Royaume des Cieux",
    categorie: "perez-dakar",
    client: "Perez Chapel Dakar",
    annee: "2026",
    description: "Campagne complète d'un festival : affiche principale, déclinaison, save the date, tickets d'entrée et t-shirt du département culturel.",
    objectifs: "Annoncer l'événement plusieurs semaines à l'avance et garder une identité cohérente sur tous les supports.",
    solution: "Un lettrage festif rose et jaune, un calendrier « save the date » et des tickets imprimables déclinés du même univers.",
    couverture: P + "farc-affiche.jpg",
    miniature: M + "farc-affiche.jpg",
    images: [P + "farc-ticket-1000-frcs.jpg", P + "farc-2025-4e-edition.jpg", P + "farc-2024-3e-edition.jpg", P + "farc-coming-soon.jpg", P + "farc-affiche-variante.jpg", P + "farc-save-the-date.jpg", P + "farc-tickets.jpg", P + "farc-tshirt-lions.jpg", P + "farc-tshirt-jaune.jpg", P + "farc-tshirt-festival-noir.jpg", P + "farc-tshirt-festival-jaune.jpg", P + "farc-tshirt-festival-blanc.jpg"],
    publie: true,
    vedette: true
  },
  {
    id: "abel-food-identite",
    titre: "Identité visuelle Abel Food",
    categorie: "abel",
    client: "Abel Food",
    annee: "",
    description: "Extraits de la charte graphique Abel Food : application du logo en tampon, t-shirts aux couleurs de la marque (blanc, vert, orange) et tabliers brodés.",
    couverture: P + "abel-identite-tshirts.jpg",
    miniature: M + "abel-identite-tshirts.jpg",
    images: [P + "abel-identite-tampon.jpg", P + "abel-identite-tabliers.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "abel-food-reseaux",
    titre: "Campagnes réseaux sociaux Abel Food",
    categorie: "abel",
    client: "Abel Food",
    annee: "2025",
    description: "Publications produit et promotions saisonnières : épices de Tabaski, promo Tamkharite, céréales, Abel Protéine, chapelure, pâte d'arachide.",
    objectifs: "Mettre en avant les produits au bon moment de l'année et donner envie d'acheter.",
    solution: "Des visuels chaleureux autour du repas, le produit toujours au premier plan et les contacts de commande visibles.",
    couverture: P + "abel-tabaski-poulet.jpg",
    miniature: M + "abel-tabaski-poulet.jpg",
    images: [P + "abel-epices-barbecue-togg.jpg", P + "abel-epices-poulet-togg.jpg", P + "abel-saf-na-ba-nopi-viande.jpg", P + "abel-bi-walla-be-poudres.jpg", P + "abel-bi-walla-be-diongoma.jpg", P + "abel-site-web-decouvrez.jpg", P + "abel-site-web-commandez.jpg", P + "abel-site-web-ne-perdez-plus.jpg", P + "abel-street-market.jpg", P + "abel-recrutement-commerciaux.jpg", P + "abel-farine-diongoma-affiche.jpg", P + "abel-kay-dieul-sa-farine.jpg", P + "abel-devenez-distributeur.jpg", P + "abel-tabaski-barbecue.jpg", P + "abel-epices-viande.jpg", P + "abel-promo-tamkharite.jpg", P + "abel-cereales-croissance.jpg", P + "abel-flocons-avoine.jpg", P + "abel-pate-arachide.jpg", P + "abel-chapelure.jpg", P + "abel-cuisson-chapelure.jpg", P + "abel-proteine-unboxing.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "perez-cultes-speciaux",
    titre: "Cultes spéciaux",
    categorie: "perez-dakar",
    client: "Perez Chapel Dakar",
    annee: "2023 – 2026",
    description: "Pâques, Noël, Sainte Cène, Pentecôte, cultes d'onction et de communion, culte des nations, cultes d'adoration, d'amitié et d'actions de grâce : un univers visuel propre à chaque fête.",
    couverture: P + "perez-paques-white-sunday.jpg",
    miniature: M + "perez-paques-white-sunday.jpg",
    images: [P + "perez-pentecote-merci-photo.jpg", P + "perez-pentecote-merci.jpg", P + "perez-actions-grace-30-juil-2023.jpg", P + "perez-onction-communion-02-mars-2025.jpg", P + "perez-onction-29-juin-2025.jpg", P + "perez-culte-nations-03-aout.jpg", P + "perez-communion-06-juil-2025.jpg", P + "perez-sainte-cene-aout-2023.jpg", P + "perez-noel-2025-cadeaux.jpg", P + "perez-paques-09-avril.jpg", P + "perez-onction-30-aout-2026.jpg", P + "perez-onction-communion-01-fev-2026.jpg", P + "perez-onction-communion-28-sept-2025.jpg", P + "perez-onction-communion-04-mai-2025.jpg", P + "perez-noel-ngoua.jpg", P + "perez-sainte-cene-2025.jpg", P + "perez-culte-nations.jpg", P + "perez-pentecote-2024.jpg", P + "perez-pentecote-2023.jpg", P + "perez-adoration-22-mars.jpg", P + "perez-adoration-29-mars.jpg", P + "perez-culte-amitie-2024.jpg", P + "perez-actions-de-grace.jpg", P + "perez-actions-de-grace-2023.jpg", P + "perez-juillet-onction.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "thetop-infusions",
    titre: "Infusions Thé Top",
    categorie: "packaging",
    client: "Thé Top",
    annee: "2025",
    description: "Boîtes d'infusions premium (Kel Bouye Bissap, corossol, Wass, Mr Grey) et visuel de promotion Tabaski.",
    objectifs: "Positionner une gamme de thés et infusions locales sur un segment premium.",
    solution: "Une boîte blanche épurée, un bandeau de couleur par saveur et une typographie lisible pour les mentions produit.",
    couverture: P + "thetop-kel-bouye-bissap.jpg",
    miniature: M + "thetop-kel-bouye-bissap.jpg",
    images: [P + "thetop-tea-amaigrissant.jpg", P + "thetop-gingembre.jpg", P + "thetop-wass-ambiance.jpg", P + "thetop-minute-detox.jpg", P + "thetop-corossol.jpg", P + "thetop-wass.jpg", P + "thetop-mr-grey.jpg", P + "thetop-promo-tabaski.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "perez-france-jeunes",
    titre: "Retraite & 21 jours de jeûne",
    categorie: "perez-france",
    client: "Perez Chapel France",
    annee: "2026",
    description: "Affiche de retraite spirituelle en deux couleurs et série « 21 jours de jeûne et prières » sur Zoom, un intervenant par soir avec un gabarit commun.",
    solution: "Un gabarit fixe (horloge, bandeau « Ce soir », horaires par pays) qui permet de publier chaque jour en changeant seulement l'orateur.",
    couverture: P + "perez-retraite-bleu.jpg",
    miniature: M + "perez-retraite-bleu.jpg",
    images: [P + "perez-france-partage-edification.jpg", P + "perez-retraite-rouge.jpg", P + "perez-21-jours-jeune.jpg", P + "perez-21-jours-keshia.jpg", P + "perez-21-jours-ngoua-france.jpg", P + "perez-21-jours-dziku.jpg", P + "perez-21-jours-ngoma.jpg", P + "perez-21-jours-sala.jpg", P + "perez-21-jours-ancien-grace-joel.jpg", P + "perez-21-jours-soukpo.jpg", P + "perez-21-jours-barros.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "salon-adoration",
    titre: "Salon d'adoration · Je te donne mon cœur",
    categorie: "identite",
    client: "Chorale Mélodie Céleste",
    annee: "2023 – 2026",
    description: "Affiche de l'événement, logo typographique du thème et t-shirts officiels en plusieurs coloris, avec le logo de la chorale devant et le nom de l'événement au dos.",
    solution: "Le thème transformé en logo-cœur typographique, repris sur les t-shirts vendus pendant l'événement.",
    couverture: P + "salon-adoration-affiche.jpg",
    miniature: M + "salon-adoration-affiche.jpg",
    images: [P + "salon-adoration-cadre-story.jpg", P + "salon-adoration-appel-sponsors.jpg", P + "salon-adoration-14-juin.jpg", P + "salon-adoration-merci.jpg", P + "salon-adoration-17-juin-rose.jpg", P + "salon-adoration-nous-y-serons.jpg", P + "salon-adoration-jy-serai.jpg", P + "salon-adoration-logo.jpg", P + "salon-adoration-tshirt.jpg", P + "salon-adoration-tshirt-rouge.jpg", P + "salon-adoration-tshirt-beige.jpg", P + "salon-adoration-tshirt-sable.jpg", P + "salon-adoration-tshirt-brun.jpg", P + "salon-adoration-tshirt-dos.jpg", P + "salon-adoration-tshirt-dos-sable.jpg", P + "salon-adoration-tshirt-dos-brun.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "abel-food-commande",
    titre: "Campagne « Commandez en ligne »",
    categorie: "abel",
    client: "Abel Food",
    annee: "2026",
    description: "Série de stories verticales pour pousser la commande sur abelfood.sn et par WhatsApp, déclinée en vert, en rose, et pour le compte TikTok de la marque.",
    objectifs: "Faire connaître les deux façons de commander (site et WhatsApp) et faire grandir la communauté TikTok.",
    solution: "Un format story 9:16, une personne qui commande depuis son téléphone, et les deux contacts mis en avant dans des boutons faciles à lire.",
    couverture: P + "abel-commande-vert.jpg",
    miniature: M + "abel-commande-vert.jpg",
    images: [P + "abel-commander-simple.jpg", P + "abel-commande-rose.jpg", P + "abel-tiktok.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "perez-enseignements",
    titre: "Cultes d'enseignement",
    categorie: "perez-dakar",
    client: "Perez Chapel Dakar",
    annee: "2023 – 2026",
    description: "Affiches hebdomadaires du culte d'enseignement et de prière du jeudi, avec un gabarit typographique fort décliné en plusieurs couleurs.",
    couverture: P + "perez-enseignement-juillet.jpg",
    miniature: M + "perez-enseignement-juillet.jpg",
    images: [P + "perez-culte-jeudi-05-nov-2026.jpg", P + "perez-enseignement-12-juin-2025.jpg", P + "perez-enseignement-11-juin-2026.jpg", P + "perez-enseignement-10-sept-2026.jpg", P + "perez-enseignement-14-aout-2025.jpg", P + "perez-enseignement-15-oct-2026.jpg", P + "perez-enseignement-16-juil-2026.jpg", P + "perez-enseignement-22-janv-2026.jpg", P + "perez-enseignement-20-nov-2025.jpg", P + "perez-enseignement-21-aout-2025.jpg", P + "perez-enseignement-25-mars-2026.jpg", P + "perez-enseignement-27-juin-2024.jpg", P + "perez-priere-25-juin-2026.jpg", P + "perez-enseignement-08-oct-2026.jpg", P + "perez-enseignement-01-oct-2026-zoom.jpg", P + "perez-enseignement-13-aout-2026.jpg", P + "perez-enseignement-06-aout-2026.jpg", P + "perez-enseignement-18-juin-2026.jpg", P + "perez-enseignement-02-avril-2026-stylo.jpg", P + "perez-enseignement-02-avril-2026-table.jpg", P + "perez-enseignement-10-avril-2025.jpg", P + "perez-enseignement-fev.jpg", P + "perez-enseignement-11-sept.jpg", P + "perez-enseignement-sept-2025.jpg", P + "perez-jeudi-enseignement-2023.jpg", P + "perez-enseignement-20-aout.jpg", P + "perez-enseignement-27-nov.jpg", P + "perez-enseignement-18-sept.jpg", P + "perez-enseignement-05-fev.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "jfb-studio",
    titre: "JFB Studio · formations maquillage",
    categorie: "pub",
    client: "JFB Studio",
    annee: "2025 – 2026",
    description: "Affiches de la Masterclass maquillage professionnel (4e édition, Dakar) et de la tournée de formation Gabon Makeup Tour à Libreville, Port-Gentil et Franceville.",
    couverture: P + "jfb-masterclass.jpg",
    miniature: M + "jfb-masterclass.jpg",
    images: [P + "jfb-gabon-makeup-tour.jpg", P + "grille-jfb-makeup.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "perez-evenements",
    titre: "Événements & nuits de prière",
    categorie: "perez-dakar",
    client: "Perez Chapel Dakar",
    annee: "2023 – 2026",
    description: "Talk-shows, soirées cinéma, nuits du 31, heures de prière, série « Bien finir », concerts et annonces « coming soon ».",
    objectifs: "Annoncer chaque événement avec un visuel fort, tout en gardant les informations pratiques lisibles.",
    couverture: P + "perez-talk-show.jpg",
    miniature: M + "perez-talk-show.jpg",
    images: [P + "perez-veillee-30-mai-2025.jpg", P + "perez-veillee-27-juin-2025.jpg", P + "perez-03-jours-jeune-juin-2025.jpg", P + "perez-03-jours-jeune-juil-2025.jpg", P + "perez-jeudi-priere-08-jan-2026.jpg", P + "perez-vendredi-priere-25-juil-2024.jpg", P + "perez-coming-soon-soiree-culturelle.jpg", P + "perez-picnic-church-ticket.jpg", P + "perez-veillee-28-avril-2023.jpg", P + "perez-veillee-21-jours-juil-2026.jpg", P + "perez-veillee-24-nov-2023.jpg", P + "perez-veillee-01-aout-2025.jpg", P + "perez-06-heures-priere-jan-2026.jpg", P + "perez-soiree-guerison-19-juil-2024.jpg", P + "perez-soiree-guerison-14-juil-2024.jpg", P + "perez-02-soirees-edification-dec-2025.jpg", P + "perez-soiree-edification-3e-edition.jpg", P + "perez-talk-show-30-juil-2026.jpg", P + "perez-rencontres-de-puissance-2026.jpg", P + "perez-retraite-spirituelle-aout-2025.jpg", P + "perez-retraite-ouvriers-aout-2025.jpg", P + "perez-programme-femmes-mars-2024.jpg", P + "perez-bienvenue-mai-saintete.jpg", P + "perez-merci-participation-bleu.jpg", P + "perez-programme-femmes-orange.jpg", P + "perez-programme-femmes-rose.jpg", P + "perez-picnic-church-acte-2.jpg", P + "perez-programme-jeune-janv-2025.jpg", P + "perez-ma-semaine-janv-2024.jpg", P + "perez-programmes-semaine-vert.jpg", P + "perez-programmes-semaine-bleu.jpg", P + "perez-programmes-semaine-vert-mardi.jpg", P + "perez-offrandes-dons-bleu.jpg", P + "perez-offrandes-dons-vert.jpg", P + "perez-ma-semaine-cloture-jeune.jpg", P + "perez-soiree-cinema.jpg", P + "perez-talk-show-cheminement.jpg", P + "perez-talk-show-texte.jpg", P + "perez-projection-ldc.jpg", P + "perez-soiree-cinema-2.jpg", P + "perez-nuit-prophetie.jpg", P + "perez-bien-finir-2025.jpg", P + "perez-06-heures-priere.jpg", P + "perez-06-heures-priere-2025.jpg", P + "perez-amour-attirance.jpg", P + "perez-amour-attirance-carre.jpg", P + "perez-31-prophetie-blanc.jpg", P + "perez-31-prophetie-violet.jpg", P + "perez-31-bus-gratuit.jpg", P + "perez-31-bus-disponibles.jpg", P + "perez-31-coming-soon.jpg", P + "perez-picnic-coming-soon.jpg", P + "perez-bien-finir-lombo.jpg", P + "perez-bien-finir-muamba.jpg", P + "perez-bien-finir-kiki.jpg", P + "perez-concert-chorale.jpg", P + "perez-culte-celebration-2023.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "abel-food-boissons",
    titre: "Étiquettes boissons & huiles",
    categorie: "abel",
    client: "Abel Food",
    annee: "2025",
    description: "Étiquettes de bouteilles (citron, wass bouye, huile de palme) et bandeaux de saveurs pour la gamme coco.",
    couverture: P + "abel-bouteille-citron.jpg",
    miniature: M + "abel-bouteille-citron.jpg",
    images: [P + "abel-coco-nutella.jpg", P + "abel-wass-bouteille.jpg", P + "abel-coco-lait.jpg", P + "abel-bouteille-wass-bouye.jpg", P + "abel-bouteille-huile-palme.jpg", P + "abel-bouteille-wass.jpg", P + "abel-coco-fraise.jpg", P + "abel-coco-gingembre.jpg", P + "abel-coco-menthe.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "niel",
    titre: "Ni-El · sacs & étiquettes",
    categorie: "identite",
    client: "Ni-El",
    annee: "",
    description: "Monogramme de marque appliqué aux sacs shopping et aux étiquettes suspendues, en noir et blanc.",
    couverture: P + "niel-sacs.jpg",
    miniature: M + "niel-sacs.jpg",
    images: [P + "niel-etiquettes.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "perez-jeunes-dakar",
    titre: "Jeûnes & prières",
    categorie: "perez-dakar",
    client: "Perez Chapel Dakar",
    annee: "2023 – 2026",
    description: "21 jours de jeûne et prière, clôtures en présentiel et 3 jours « Saison d'enfantement ».",
    couverture: P + "perez-21-jours-trio.jpg",
    miniature: M + "perez-21-jours-trio.jpg",
    images: [P + "perez-21-jours-dakar.jpg", P + "perez-21-jours-muamba.jpg", P + "perez-21-jours-grace-joel.jpg", P + "perez-21-jours-cloture-15.jpg", P + "perez-21-jours-cloture-22.jpg", P + "perez-3-jours-jeune.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "masterclass",
    titre: "Masterclass & conférences",
    categorie: "pub",
    client: "",
    annee: "2024 – 2026",
    description: "Affiches de masterclass, de soutenance de thèse et de formation, pour des organisateurs de conférences et des universités.",
    couverture: P + "masterclass-excellence.jpg",
    miniature: M + "masterclass-excellence.jpg",
    images: [P + "masterclass-merci-partenaires.jpg", P + "masterclass-amesco.jpg", P + "soutenance-euromed.jpg", P + "formation-design.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "abel-food-fidak",
    titre: "Abel Food · FIDAK & objets de marque",
    categorie: "abel",
    client: "Abel Food",
    annee: "2025",
    description: "Supports de la participation à la 33e Foire internationale de Dakar (annonce, kakemono roll-up, stand) et mug aux couleurs de la marque.",
    couverture: P + "abel-fidak.jpg",
    miniature: M + "abel-fidak.jpg",
    images: [P + "abel-rollup.jpg", P + "abel-stand.jpg", P + "abel-mug.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "perez-consecration-evangelisation",
    titre: "Consécrations & évangélisation",
    categorie: "perez-dakar",
    client: "Perez Chapel Dakar",
    annee: "2023 – 2026",
    description: "Visuels de consécration du mois et campagnes d'évangélisation de masse, dont « #SénégalPourChrist » aux couleurs du drapeau.",
    couverture: P + "perez-senegal-pour-christ.jpg",
    miniature: M + "perez-senegal-pour-christ.jpg",
    images: [P + "perez-evangelisation-masse-2023.jpg", P + "perez-evangelisation-2023.jpg", P + "perez-consacrons-aout.jpg", P + "perez-consecration-octobre-2026.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "diarra-epices",
    titre: "Diarra · pots d'épices",
    categorie: "packaging",
    client: "Diarra",
    annee: "",
    description: "Étiquettes de pots d'épices 50 g (7 Épices, curcuma, cannelle, barbecue, piment, nététou, poisson, poulet, viande, romarin) : bandeau de couleur, ingrédient en visuel et logo de la marque mis en avant.",
    couverture: P + "diarra-7-epices.jpg",
    miniature: M + "diarra-7-epices.jpg",
    images: [P + "diarra-epice-viande.jpg", P + "diarra-romarin.jpg", P + "diarra-epice-poisson.jpg", P + "diarra-epice-poulet.jpg", P + "diarra-netetou.jpg", P + "diarra-barbecue.jpg", P + "diarra-piment.jpg", P + "diarra-curcuma.jpg", P + "diarra-cannelle.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "perez-citations",
    titre: "Citations de prédications",
    categorie: "perez-dakar",
    client: "Perez Chapel Dakar",
    annee: "2024 – 2026",
    description: "Série de visuels qui reprennent une phrase forte de chaque prédication, avec la photo de l'orateur, pour Facebook, Instagram et TikTok.",
    solution: "Plusieurs gabarits récurrents (dégradé bleu, cadre rouge, encadré citation) pour que l'église publie vite tout en restant reconnaissable.",
    couverture: P + "perez-citation-bright-priere.jpg",
    miniature: M + "perez-citation-bright-priere.jpg",
    images: [P + "perez-citation-ngoua-portes.jpg", P + "perez-citation-ngoua-foi.jpg", P + "perez-citation-muamba-porteur-arme.jpg", P + "perez-reveillez-les-heros.jpg", P + "perez-citation-ngoua-epreuves.jpg", P + "perez-citation-bright-danger.jpg", P + "perez-citation-grace-joel.jpg", P + "perez-citation-grace-joel-2.jpg", P + "perez-citation-bright-intimite.jpg", P + "perez-citation-bright-communication.jpg", P + "perez-citation-grace-joel-3.jpg", P + "perez-citation-grace-joel-4.jpg", P + "perez-citation-ngoua.jpg", P + "perez-citation-ngoua-2.jpg", P + "perez-citation-ngoua-3.jpg", P + "perez-citation-ngoua-4.jpg", P + "perez-citation-grace-joel-5.jpg", P + "perez-citation-grace-joel-6.jpg", P + "perez-citation-bright-progressive.jpg", P + "perez-citation-bright-desir.jpg", P + "perez-citation-bright-competition.jpg", P + "perez-citation-grace-joel-7.jpg", P + "perez-citation-grace-joel-8.jpg", P + "perez-citation-grace-joel-9.jpg", P + "perez-citation-grace-joel-10.jpg", P + "perez-jeudi-enseignement.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "taara-wass",
    titre: "Taara · Wass thé express",
    categorie: "packaging",
    client: "Taara",
    annee: "",
    description: "Étiquette d'une bouteille de tisane 1,2 L : ingrédients mis en scène (gingembre, citron, miel, clou de girofle), mode de préparation et code-barres.",
    couverture: P + "taara-wass.jpg",
    miniature: M + "taara-wass.jpg",
    images: [],
    publie: true,
    vedette: false
  },
  {
    id: "impact-digicom",
    titre: "Logo Impact Digicom",
    categorie: "identite",
    client: "Impact Digicom",
    annee: "",
    description: "Logotype en relief, bleu et blanc, pour une agence de communication digitale.",
    couverture: P + "impact-digicom-logo.jpg",
    miniature: M + "impact-digicom-logo.jpg",
    images: [],
    publie: true,
    vedette: false
  },
  {
    id: "perez-youtube",
    titre: "Miniatures YouTube & podcast",
    categorie: "perez-dakar",
    client: "Perez Chapel Dakar",
    annee: "2025 – 2026",
    description: "Miniatures 16:9 pour les directs YouTube : heures de prière, séries « Bien finir 2025 » et « 28 jours de jeûne et prière » jour par jour, écran d'accueil du culte dominical, visuels « Consacrons notre mois », horaires des programmes, couverture et promotion du podcast Apple Podcasts.",
    couverture: P + "perez-yt-heure-priere.jpg",
    miniature: M + "perez-yt-heure-priere.jpg",
    images: [P + "perez-06-heures-priere-banniere.jpg", P + "perez-spotify-podcast.jpg", P + "perez-ngoua-collage.jpg", P + "perez-podcast-emmanuel-ngoua.jpg", P + "perez-podcast-moise-muamba.jpg", P + "perez-podcast-brel-isaac-ngoma.jpg", P + "perez-yt-heure-priere-lundi-rouge.jpg", P + "perez-yt-est-ce-moi-ou-mon-ame.jpg", P + "perez-28-jours-jour-22.jpg", P + "perez-28-jours-jour-28.jpg", P + "perez-yt-heure-priere-grace-joel-rouge.jpg", P + "perez-yt-heure-priere-grace-joel.jpg", P + "perez-bien-finir-jour-01.jpg", P + "perez-bien-finir-jour-02.jpg", P + "perez-bien-finir-jour-03.jpg", P + "perez-bien-finir-jour-04.jpg", P + "perez-bien-finir-jour-05.jpg", P + "perez-28-jours-jour-08.jpg", P + "perez-28-jours-jour-09.jpg", P + "perez-bien-finir-muamba-yt.jpg", P + "perez-bien-finir-kiki-yt.jpg", P + "perez-culte-dominical.jpg", P + "perez-podcast-grace-joel.jpg", P + "perez-apple-podcast.jpg", P + "perez-consacrons-octobre.jpg", P + "perez-consacrons-septembre.jpg", P + "perez-horaires-programmes.jpg", P + "perez-merci-participe.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "abel-food-temps-forts",
    titre: "Temps forts de l'année",
    categorie: "abel",
    client: "Abel Food",
    annee: "2025",
    description: "Visuels pour les journées marquantes : 8 mars, rentrée scolaire, moments de partage en famille.",
    couverture: P + "abel-rentree-scolaire.jpg",
    miniature: M + "abel-rentree-scolaire.jpg",
    images: [P + "abel-tabaski-famille.jpg", P + "abel-tabaski-epices-poulet.jpg", P + "abel-tabaski-epices-viande.jpg", P + "abel-ramadan-mubarak.jpg", P + "abel-8-mars.jpg", P + "abel-bonne-appetit.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "perez-fetes",
    titre: "Fêtes & célébrations",
    categorie: "perez-dakar",
    client: "Perez Chapel Dakar",
    annee: "2024 – 2026",
    description: "Publications pour Noël, Pâques, la fête des pères, les anniversaires et les félicitations aux responsables.",
    couverture: P + "perez-paques.jpg",
    miniature: M + "perez-paques.jpg",
    images: [P + "perez-anniversaire-isaac-ngoma-2025.jpg", P + "hbd-brandonne.jpg", P + "perez-31-nuit-prophetie-story.jpg", P + "perez-31-apporte-ton-sifflet.jpg", P + "perez-soiree-couple-joel-syntiche.jpg", P + "perez-merci-a-tous-ngoma.jpg", P + "perez-anniversaire-ngoua-story.jpg", P + "perez-happy-birthday-61.jpg", P + "perez-noel.jpg", P + "perez-fete-des-peres.jpg", P + "perez-fete-des-peres-2.jpg", P + "perez-anniversaire.jpg", P + "perez-anniversaire-isaac.jpg", P + "perez-hbd-ngoua-2026.jpg", P + "perez-hbd-ngoua-2026-blanc.jpg", P + "perez-fathers-day.jpg", P + "perez-felicitations-ngoua.jpg", P + "hbd-vanesse-dordy.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "concert-moise-mbiye",
    titre: "Concert Moïse Mbiye · Radah Bettie",
    categorie: "pub",
    client: "",
    annee: "2024",
    description: "Visuel de présentation d'un extrait du concert de Moïse Mbiye au stade des Martyrs de Kinshasa.",
    couverture: P + "concert-moise-mbiye.jpg",
    miniature: M + "concert-moise-mbiye.jpg",
    images: [],
    publie: true,
    vedette: false
  },
  {
    id: "supports-imprimes",
    titre: "Menus & supports imprimés",
    categorie: "pub",
    client: "Marinelle Food · Perez Chapel",
    annee: "",
    description: "Menu hebdomadaire de restaurant et cachet officiel.",
    couverture: P + "menu-marinelle-food.jpg",
    miniature: M + "menu-marinelle-food.jpg",
    images: [P + "menu-bread-winner.jpg", P + "perez-cachet.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "sport-endrick",
    titre: "Affiches sport · Endrick, Pedri",
    categorie: "pub",
    client: "",
    annee: "",
    description: "Affiches sportives autour de joueurs de football (Endrick, Pedri) : détourages superposés, typographie géante, couleurs des clubs et effets lumineux.",
    couverture: P + "sport-endrick.jpg",
    miniature: M + "sport-endrick.jpg",
    images: [P + "sport-pedri.jpg", ],
    publie: true,
    vedette: false
  },
  {
    id: "ls-design-prestations",
    titre: "Affiche de prestations LS DESIGN",
    categorie: "pub",
    client: "LS DESIGN",
    annee: "",
    description: "Affiche d'autopromotion du studio : mise en scène de réalisations sur smartphone et en cartes, liste des prestations (affiches, flyers, identité visuelle, logos, bâches, magazines) et logiciels utilisés.",
    couverture: P + "ls-design-prestations.jpg",
    miniature: M + "ls-design-prestations.jpg",
    images: [],
    publie: true,
    vedette: false
  },
  {
    id: "soiree-edification-kinshasa",
    titre: "Soirée d'édification · Kinshasa",
    categorie: "pub",
    client: "Sanctuaire des Rachetés",
    annee: "2026",
    description: "Affiche de la Soirée d'édification « Le Dieu du parcours » à Kinshasa, avec quatre orateurs, déclinée en trois ambiances de couleur (orange, bleu, violet) autour du drapeau de la RDC.",
    couverture: P + "kinshasa-edification-orange.jpg",
    miniature: M + "kinshasa-edification-orange.jpg",
    images: [P + "kinshasa-edification-bleu.jpg", P + "kinshasa-edification-violet.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "versus-sale-sucre",
    titre: "Logo Versus · Salé Sucré",
    categorie: "identite",
    client: "Versus",
    annee: "",
    description: "Logo illustré pour une enseigne de crêpes salées et sucrées : deux mascottes-crêpes face à face, sauces croisées et typographie ronde et gourmande.",
    couverture: P + "logo-versus-sale-sucre.jpg",
    miniature: M + "logo-versus-sale-sucre.jpg",
    images: [],
    publie: true,
    vedette: false
  },
  {
    id: "mister-jimmy",
    titre: "Mister Jimmy · In My Think",
    categorie: "pub",
    client: "Mister Jimmy",
    annee: "",
    description: "Visuel de sortie du single « In My Think » de l'artiste Mister Jimmy, présenté en étiquette de disque vinyle.",
    couverture: P + "mister-jimmy-vinyle.jpg",
    miniature: M + "mister-jimmy-vinyle.jpg",
    images: [],
    publie: true,
    vedette: false
  },
  {
    id: "as-perez",
    titre: "Logos AS Perez",
    categorie: "identite",
    client: "Perez Chapel Dakar",
    annee: "",
    description: "Écussons de l'équipe de football AS Perez Chapel : bouclier avec ballon et bandeau doré, et version ronde avec silhouette de joueur dorée sur fond bleu nuit, couronne et croix reprises du logo de l'église.",
    couverture: P + "logo-as-perez.jpg",
    miniature: M + "logo-as-perez.jpg",
    images: [P + "logo-as-perez-chapel-ecusson.jpg"],
    publie: true,
    vedette: false
  },
  {
    id: "love-relationships",
    titre: "Love & Relationships",
    categorie: "pub",
    client: "",
    annee: "2024",
    description: "Affiche d'une conférence de la Saint-Valentin sur le thème des célibataires.",
    couverture: P + "love-relationships.jpg",
    miniature: M + "love-relationships.jpg",
    images: [],
    /* À VÉRIFIER : passe à true seulement si ce visuel est bien ta création. */
    publie: false,
    vedette: false
  }
];
