"""Ajoute automatiquement au portfolio les images déposées dans ajouter/<id-du-projet>/.

Pour chaque image :
  - crée les versions 1600 px (images/projets), 720 px (images/miniatures)
    et 340 px (images/bande) en JPG ;
  - l'ajoute en tête de la galerie du projet dans js/donnees.js ;
  - supprime l'original du dossier ajouter/.
Crée aussi un dossier ajouter/<id>/ pour chaque projet existant.
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


def main():
    js = DONNEES.read_text(encoding="utf-8")
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
    for dossier in sorted(p for p in DEPOT.iterdir() if p.is_dir()):
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
    print(f"\n{ajoutes} image(s) ajoutée(s) au portfolio.")
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
