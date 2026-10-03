# RATISS Labs — le site

**Site canonique : <https://ratiss-labs.vercel.app>** 
Toutes les anciennes URLs (GitHub Pages, liens `#/…`) redirigent vers lui.

Laboratoire indépendant, mono-auteur — Jonathan Evina, Yaoundé (Cameroun).
*On ne croit pas. On rejoue.*

---

## Ce que contient ce dépôt

| Chemin | Rôle |
|---|---|
| `index.html` | **Page de redirection** (meta-refresh 0 s + traduction des anciens liens `#/…` vers les nouvelles URLs). C'est elle que sert GitHub Pages. |
| `legacy/` | L'ancien site mono-fichier (SPA) conservé comme source éditable. Il vit en production sur `ratiss-labs.vercel.app/` (page d'accueil). |
| `build.py` | Générateur statique du site multi-pages (stdlib + PyYAML). Déterministe : mêmes manifests → mêmes pages. |
| `content/*.yaml` | Les **research manifests** : un par objet de recherche. Source unique de vérité des pages ET des rapports. |
| `rapports/*.tex` | Rapports scientifiques **en anglais**, compilés en PDF (Tectonic). |
| `rapports/figures.py` | Figures matplotlib — valeurs archivées uniquement ; les schémas sans données portent la mention « SCHEMATIC ». |
| `rapports/*.pdf` | Les 5 rapports compilés, servis sur `/research/<slug>/report.pdf`. |
| `verif/` | Fichiers de vérification (Google Search Console). |

## Reconstruire le site

```bash
pip install pyyaml
python3 build.py                                  # preview (URLs relatives)
SITE_URL=https://ratiss-labs.vercel.app python3 build.py   # production
python3 -m http.server 8000 --directory _site     # regarder en local
```

Sortie : `_site/` (compatible Vercel **et** GitHub Pages).
L'esthétique (CSS, scène Canvas, header, footer) est extraite de `legacy/index.html` :
aucune divergence visuelle entre l'accueil et les pages Research.

## Compiler les rapports PDF

```bash
# Tectonic (binaire unique) : https://github.com/tectonic-typesetting/tectonic
cd rapports && tectonic photon.tex   # idem pour les 5
```

## Architecture de publication

```
GitHub (code, données, protocoles)
   → manifests YAML
   → pages canoniques + PDF anglais   (Vercel)
   → Zenodo : record + DOI            (préservation)
   → Google : sitemap + Search Console (découverte)
```

- **Une URL canonique par recherche** : `/research/<slug>/`
- `sitemap.xml`, `robots.txt`, canonical, Open Graph, JSON-LD `ScholarlyArticle`
- **Aucun chiffre publié sans source d'origine** ; les résultats négatifs sont
  publiés avec le même poids que les positifs.

## DOI publiés (Zenodo, 03/10/2026)

| Objet | DOI |
|---|---|
| Photon | `10.5281/zenodo.23117607` |
| GHZ ions QPU | `10.5281/zenodo.23117609` |
| Navier–Stokes | `10.5281/zenodo.23117605` |
| Étalons | `10.5281/zenodo.23117603` |
| Audit job IDs IBM | `10.5281/zenodo.23117599` |

## Règles

- Aucune clé, token ou secret dans ce dépôt : seul `.env.example`-like est permis ailleurs ; ici, rien.
- Rien n'est poussé sans ordre du chef.
- Licence : MIT (Copyright (c) 2026 Jonathan Evina · RATISS Labs).
