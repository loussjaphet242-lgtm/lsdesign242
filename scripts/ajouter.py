"""Ajoute automatiquement au portfolio les images déposées dans ajouter/<id-du-projet>/.

Pour chaque image :
  - crée les versions 1600 px (images/projets), 720 px (images/miniatures)
    et 340 px (images/bande) en JPG ;
  - l'ajoute en tête de la galerie du projet dans js/donnees.js ;
  - supprime l'original du dossier ajouter/.
Crée aussi un dossier ajouter/<id>/ pour chaque projet existant.

Chartes graphiques : chaque PDF déposé dans ajouter/chartes/ est découpé en
pages (images/chartes/<nom>/page-01.jpg… et mini/ en 720 px) et la charte est
ajoutée à la section « Chartes graphiques » (ou mise à jour si elle existe).
"""
import re
import sys
import unicodedata
from pathlib import Path

from PIL import Image, ImageOps

RACINE = Path(__file__).resolve().parent.parent
DONNEES = RACINE / "js" / "donnees.js"
DEPOT = RACINE / "ajouter"
TAILLES = {"projets": 1600, "miniatures": 720, "bande": 340}
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


def slug(texte):
    texte = unicodedata.normalize("NFKD", texte).encode("ascii", "ignore").decode()
    texte = re.sub(r"[^a-zA-Z0-9]+", "-", texte).strip("-").lower()
    return texte or "image"


def zone_projets(js):
    debut = js.index("const PROJETS = [")
    return debut


def ids_projets(js):
    return re.findall(r'^\s*id:\s*"([^"]+)"', js[zone_projets(js):], flags=re.M)


def ajouter_a_galerie(js, pid, noms):
    debut_zone = zone_projets(js)
    m = re.compile(r'^\s*id:\s*"' + re.escape(pid) + r'"', re.M).search(js, debut_zone)
    suivant = re.compile(r'^\s*id:\s*"', re.M).search(js, m.end())
    fin = suivant.start() if suivant else len(js)
    g = re.compile(r"images:\s*\[").search(js, m.end(), fin)
    entrees = ", ".join(f'P + "{n}"' for n in noms)
    if g is None:
        # Pas de galerie : on en crée une juste après la ligne id
        fin_ligne = js.index("\n", m.end())
        return js[:fin_ligne + 1] + f"    images: [{entrees}],\n" + js[fin_ligne + 1:]
    pos = g.end()
    vide = js[pos:].lstrip().startswith("]")
    return js[:pos] + entrees + ("" if vide else ", ") + js[pos:]


def nom_libre(base):
    nom, i = f"{base}.jpg", 2
    while (RACINE / "images" / "projets" / nom).exists():
        nom, i = f"{base}-{i}.jpg", i + 1
    return nom


def convertir(source, nom):
    with Image.open(source) as img:
        img = ImageOps.exif_transpose(img)
        if img.mode in ("RGBA", "LA", "P"):
            img = img.convert("RGBA")
            fond = Image.new("RGB", img.size, (255, 255, 255))
            fond.paste(img, mask=img.split()[-1])
            img = fond
        else:
            img = img.convert("RGB")
        for dossier, largeur in TAILLES.items():
            cible = RACINE / "images" / dossier
            cible.mkdir(parents=True, exist_ok=True)
            copie = img.copy()
            if copie.width > largeur:
                copie = copie.resize((largeur, round(copie.height * largeur / copie.width)), Image.LANCZOS)
            copie.save(cible / nom, "JPEG", quality=85, optimize=True, progressive=True)


def titre_depuis(nom_fichier):
    t = re.sub(r"[_\-]+", " ", Path(nom_fichier).stem)
    t = re.sub(r"(?i)\b(charte|graphique|graphic|identit[eé] visuelle|final|v\d+|\d{4})\b", " ", t)
    t = re.sub(r"^\s*\d+\s+", "", t)  # numéro en tête : « 02 CHARTE… »
    t = re.sub(r"\s+", " ", t).strip(" .")
    return t.title() if t.isupper() or t.islower() else (t or Path(nom_fichier).stem)


def traiter_chartes(js):
    """Transforme les PDF de ajouter/chartes/ en chartes feuilletables."""
    dossier = DEPOT / "chartes"
    dossier.mkdir(exist_ok=True)
    (dossier / ".gitkeep").touch()
    for egare in DEPOT.glob("*.pdf"):  # PDF posé directement dans ajouter/
        egare.rename(dossier / egare.name)
    pdfs = sorted(f for f in dossier.iterdir() if f.is_file() and f.suffix.lower() == ".pdf")
    if not pdfs:
        return js, 0
    import pymupdf as fitz
    for pdf in pdfs:
        nom = titre_depuis(pdf.name)
        cid = slug(nom)
        cible = RACINE / "images" / "chartes" / cid
        for vieux in list(cible.glob("page-*.jpg")) + list(cible.glob("mini/page-*.jpg")):
            vieux.unlink()
        (cible / "mini").mkdir(parents=True, exist_ok=True)
        doc = fitz.open(pdf)
        pages = []
        for i, page in enumerate(doc, 1):
            echelle = 1600 / max(page.rect.width, 1)
            pix = page.get_pixmap(matrix=fitz.Matrix(echelle, echelle), alpha=False)
            img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
            if img.height > 2400:  # pages très hautes : on limite la hauteur
                img = img.resize((round(img.width * 2400 / img.height), 2400), Image.LANCZOS)
            n = f"page-{i:02d}.jpg"
            img.save(cible / n, "JPEG", quality=84, optimize=True, progressive=True)
            mini = img.copy(); mini.thumbnail((720, 1100), Image.LANCZOS)
            mini.save(cible / "mini" / n, "JPEG", quality=78, optimize=True, progressive=True)
            pages.append(f'"images/chartes/{cid}/{n}"')
        doc.close()
        liste_pages = "[" + ", ".join(pages) + "]"
        debut = js.index("const CHARTES = [")
        fin = js.index("const PROJETS = [")
        m = re.compile(r'^\s*id:\s*"' + re.escape(cid) + r'"', re.M).search(js, debut, fin)
        if m:
            g = re.compile(r"pages:\s*\[[^\]]*\]").search(js, m.end(), fin)
            js = js[:g.start()] + "pages: " + liste_pages + js[g.end():]
            print(f"~ charte {cid} : {len(pages)} page(s) mises à jour")
        else:
            bloc = ("  {\n"
                    f'    id: "{cid}",\n'
                    f'    nom: "{nom}",\n'
                    f'    client: "{nom}",\n'
                    '    secteur: "",\n'
                    '    annee: "",\n'
                    '    description: "",\n'
                    '    couleurs: [],\n'
                    f"    pages: {liste_pages},\n"
                    "    publie: true\n"
                    "  },\n")
            pos = js.index("\n", js.index("const CHARTES = [")) + 1
            js = js[:pos] + bloc + js[pos:]
            print(f"+ charte {cid} : {len(pages)} page(s)")
        pdf.unlink()
    return js, len(pdfs)


def main():
    js = DONNEES.read_text(encoding="utf-8")
    js, nb_chartes = traiter_chartes(js)
    ids = ids_projets(js)
    DEPOT.mkdir(exist_ok=True)
    for pid in ids:
        (DEPOT / pid).mkdir(exist_ok=True)
        (DEPOT / pid / ".gitkeep").touch()

    # Images déposées directement dans ajouter/ : on devine le projet par le nom du fichier
    non_classes = []
    for f in sorted(f for f in DEPOT.iterdir() if f.is_file() and f.name != ".gitkeep"):
        s = slug(f.stem)
        candidats = [pid for pid in ids if s.startswith(pid)]
        if not candidats:
            candidats = [pid for pid in ids if pid.split("-")[0] == s.split("-")[0]]
        if len(candidats) == 1:
            f.rename(DEPOT / candidats[0] / f.name)
            print(f"{f.name} -> rangé dans {candidats[0]}")
        else:
            non_classes.append(f.name)

    inconnus, ajoutes, ignores = [], 0, []
    for dossier in sorted(p for p in DEPOT.iterdir() if p.is_dir() and p.name != "chartes"):
        fichiers = sorted(f for f in dossier.rglob("*") if f.is_file() and f.name != ".gitkeep")
        if not fichiers:
            continue
        if dossier.name not in ids:
            inconnus.append(dossier.name)
            continue
        noms = []
        for f in fichiers:
            if f.suffix.lower() not in EXTENSIONS:
                ignores.append(str(f.relative_to(RACINE)))
                continue
            base = slug(f.stem)
            if not base.startswith(dossier.name.split("-")[0]):
                base = f"{dossier.name}-{base}"
            nom = nom_libre(base)
            convertir(f, nom)
            f.unlink()
            noms.append(nom)
            print(f"+ {dossier.name} : {nom}")
        if noms:
            js = ajouter_a_galerie(js, dossier.name, noms)
            ajoutes += len(noms)

    DONNEES.write_text(js, encoding="utf-8")
    print(f"\n{ajoutes} image(s) ajoutée(s) au portfolio, {nb_chartes} charte(s) traitée(s).")
    if ignores:
        print("Fichiers ignorés (seules les images JPG, PNG, WEBP sont prises) :", *ignores, sep="\n  ")
    if non_classes:
        print("Images posées directement dans ajouter/ sans projet reconnu "
              "(mettez-les dans le dossier du projet) :", *non_classes, sep="\n  ")
    if inconnus:
        print("Dossiers qui ne correspondent à aucun projet :", *inconnus, sep="\n  ")
    if inconnus or non_classes:
        print("Projets existants :", ", ".join(ids))
        sys.exit(1)


if __name__ == "__main__":
    main()
