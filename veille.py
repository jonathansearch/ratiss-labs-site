#!/usr/bin/env python3
"""RATISS VEILLE — collecteur d'actualité tech / IA / quantique.

Tourne SANS clé API. Sources :
  · arXiv API        (préprints récents : quant-ph, cs.AI, cs.CL, cs.CR)
  · Hacker News API  (Algolia, actualité tech commentée)

Sortie :
  site/data/veille.json      — données brutes horodatées (rejouable)
  site/data/veille.js        — même contenu, chargeable par le site sans serveur

Usage :
  python3 veille.py                 # collecte, 14 jours par défaut
  python3 veille.py --jours 2        # collecte large
  python3 veille.py --rapport        # affiche le résumé sans écrire

Règle du labo : rien n'est présenté comme vérifié par RATISS. Chaque entrée garde
sa source, sa date et son lien — le lecteur peut rejouer.
"""
from __future__ import annotations

import argparse, datetime, json, pathlib, re, sys, urllib.parse, urllib.request
import xml.etree.ElementTree as ET

RACINE = pathlib.Path(__file__).resolve().parent
DOSSIER = RACINE / "site" / "data"
UA = {"User-Agent": "RATISS-Labs-Veille/1.0 (contact: jonathan.ratisslabs@zohomail.com)"}

# Thèmes suivis par le labo (notre niche : fiabilité IA + quantique + intégrité)
REQUETES_ARXIV = {
    "Fiabilité & hallucinations IA": 'abs:"hallucination" AND (cat:cs.CL OR cat:cs.AI)',
    "Vérification & provenance":     '(abs:"provenance" OR abs:"watermark" OR abs:"attestation") AND cat:cs.CR',
    "Quantique — matériel":          'cat:quant-ph AND (abs:"qubit" OR abs:"photonic")',
    "Quantique — algorithmes":       'cat:quant-ph AND (abs:"algorithm" OR abs:"simulation")',
    "Audit & intégrité logicielle":  'abs:"supply chain" AND cat:cs.SE',
}
QUERIES_HN = {
    "Actualité tech":         "https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=40&query=",
}


def _get(url: str, timeout: int = 30) -> bytes:
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout).read()


def arxiv(requete: str, jours: int) -> list[dict]:
    """Préprints arXiv des N derniers jours pour une requête."""
    limite = (datetime.datetime.now(datetime.timezone.utc)
              - datetime.timedelta(days=jours)).strftime("%Y%m%d%H%M")
    url = ("http://export.arxiv.org/api/query?"
           + urllib.parse.urlencode({
               "search_query": requete,
               "start": 0, "max_results": 25,
               "sortBy": "submittedDate", "sortOrder": "descending"}))
    ns = {"a": "http://www.w3.org/2005/Atom"}
    racine = ET.fromstring(_get(url))
    sorties = []
    for e in racine.findall("a:entry", ns):
        publie = e.findtext("a:published", "", ns)
        if publie[:12].replace("-", "").replace("T", "") < limite:
            continue
        sorties.append({
            "titre": " ".join((e.findtext("a:title", "", ns) or "").split()),
            "resume": " ".join((e.findtext("a:summary", "", ns) or "").split())[:320],
            "date": publie[:10],
            "lien": e.findtext("a:id", "", ns),
            "auteurs": [a.findtext("a:name", "", ns) for a in e.findall("a:author", ns)][:4],
            "source": "arXiv",
        })
    return sorties


def hackernews(requete: str, jours: int) -> list[dict]:
    """Histoires Hacker News des N derniers jours (points = intérêt communauté)."""
    depuis = int((datetime.datetime.now(datetime.timezone.utc)
                  - datetime.timedelta(days=jours)).timestamp())
    url = (f"https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=40"
           f"&numericFilters=created_at_i>{depuis}&query={urllib.parse.quote(requete)}")
    donnees = json.loads(_get(url))
    sorties = []
    for h in donnees.get("hits", []):
        if not h.get("title"):
            continue
        sorties.append({
            "titre": h["title"],
            "lien": h.get("url") or f"https://news.ycombinator.com/item?id={h['objectID']}",
            "discussion": f"https://news.ycombinator.com/item?id={h['objectID']}",
            "points": h.get("points") or 0,
            "commentaires": h.get("num_comments") or 0,
            "date": (h.get("created_at") or "")[:10],
            "source": "Hacker News",
        })
    return sorted(sorties, key=lambda x: -(x["points"] or 0))


def collecter(jours: int) -> dict:
    themes, erreurs = {}, []
    for nom, req in REQUETES_ARXIV.items():
        try:
            themes[nom] = {"source": "arXiv", "requete": req, "entrees": arxiv(req, jours)}
        except Exception as exc:                                    # échec publié
            erreurs.append(f"arXiv « {nom} » : {type(exc).__name__} — {exc}")
            themes[nom] = {"source": "arXiv", "requete": req, "entrees": [],
                           "erreur": f"{type(exc).__name__} — {exc}"}
    tech = []
    for terme in ("AI", "quantum", "LLM"):
        try:
            tech += hackernews(terme, jours)
        except Exception as exc:
            erreurs.append(f"Hacker News « {terme} » : {type(exc).__name__} — {exc}")
    # dédoublonner par titre
    vus, uniques = set(), []
    for h in tech:
        cle = h["titre"].lower()[:80]
        if cle not in vus:
            vus.add(cle); uniques.append(h)
    themes["Actualité tech"] = {"source": "Hacker News", "entrees": uniques[:40]}

    return {
        "genere_le": datetime.datetime.now().isoformat(timespec="seconds"),
        "fenetre_jours": jours,
        "sources": ["arXiv API (export.arxiv.org)", "Hacker News API (hn.algolia.com)"],
        "note_labo": ("Collecte automatique. Aucune de ces entrées n'est vérifiée par RATISS : "
                      "le titre, la date et le lien sont repris tels quels. "
                      "Les liens mènent à la source — le lecteur peut rejouer."),
        "themes": themes,
        "erreurs": erreurs,
        "compte": {k: len(v.get("entrees", [])) for k, v in themes.items()},
    }


def ecrire(donnees: dict) -> None:
    DOSSIER.mkdir(parents=True, exist_ok=True)
    (DOSSIER / "veille.json").write_text(
        json.dumps(donnees, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (DOSSIER / "veille.js").write_text(
        "// Généré par veille.py — ne pas éditer à la main.\n"
        "window.RATISS_VEILLE = "
        + json.dumps(donnees, ensure_ascii=False) + ";\n", encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--jours", type=int, default=14, help="fenêtre de collecte")
    ap.add_argument("--rapport", action="store_true", help="afficher sans écrire")
    a = ap.parse_args()
    d = collecter(a.jours)
    print(f"🔭 Veille RATISS — {d['genere_le']} — fenêtre {a.jours} j")
    for theme, v in d["themes"].items():
        print(f"   {theme:32} {len(v.get('entrees', [])):3d} entrées")
    if d["erreurs"]:
        print("   ⚠ échecs publiés :")
        for e in d["erreurs"]:
            print("     -", e)
    if not a.rapport:
        ecrire(d); print(f"   ✅ écrit → {DOSSIER/'veille.json'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
