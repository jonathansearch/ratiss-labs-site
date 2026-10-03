#!/usr/bin/env python3
"""Générateur du site multi-pages RATISS Labs.

Statique, stdlib + PyYAML uniquement. Déterministe : mêmes manifests → mêmes pages.
L'esthétique (CSS, scène Canvas, header, footer, menu) est EXTRAITE du site
mono-fichier existant (index.html) : aucune divergence visuelle.

Sortie : _site/  (compatible Vercel ET GitHub Pages)

Usage : python3 build.py            (preview, URLs relatives)
        SITE_URL=https://ratiss-labs.org python3 build.py   (production)
"""
from __future__ import annotations

import html
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

import yaml
import contenu_vivant as CV

ICI = Path(__file__).resolve().parent
SRC = ICI / "legacy" / "index.html"
CONTENU = ICI / "content"
SITE_URL = os.environ.get("SITE_URL", "").rstrip("/")
OUT = ICI / "_site"

NAV = [
    ("Accueil", "/"),
    ("Research", "/research/"),
    ("Audits", "/audits/"),
    ("Protocoles", "/protocols/"),
    ("RATISS Pro", "/pro/"),
    ("Actualité", "/actualite/"),
    ("50 problèmes", "/problemes/"),
    ("À propos", "/about/"),
]

RBAR = '''<style>
#rbar{position:fixed;top:var(--nav-h,66px);left:0;right:0;z-index:68;display:flex;gap:8px;justify-content:center;padding:7px 12px;overflow-x:auto;scrollbar-width:none;background:rgba(2,10,9,.85);backdrop-filter:blur(10px);border-bottom:1px solid rgba(45,212,191,.18)}
#rbar::-webkit-scrollbar{display:none}
#rbar a{flex:0 0 auto;font:600 .78rem "IBM Plex Mono",ui-monospace,monospace;color:#9fd8d2;text-decoration:none;padding:6px 12px;border:1px solid rgba(45,212,191,.22);border-radius:99px;background:rgba(6,34,32,.55)}
#rbar a:hover{color:#eefcf9;border-color:#2dd4bf}
#rbar a.hot{color:#03100f;background:linear-gradient(100deg,#facc15,#fde68a);border-color:#facc15;box-shadow:0 0 18px rgba(250,204,21,.35)}
main{padding-top:calc(var(--nav-h) + 48px)!important}
.hero{min-height:calc(100svh - var(--nav-h) - 48px)!important}
</style>
<nav id="rbar" aria-label="Accès rapide aux sections principales">
<a href="/actualite/">📡 Actualité</a><a href="/research/">📚 Research</a><a class="hot" href="/pro/">💼 RATISS Pro</a><a href="/problemes/">🧩 50 problèmes</a><a href="/audits/">🧾 Audits</a><a href="/protocols/">🧭 Protocoles</a><a href="/about/">ℹ️ À propos</a>
</nav>
'''

CSS_ART = """
/* ===== couche multi-pages (mêmes jetons que le site d'origine) ===== */
.art{padding:calc(var(--nav-h) + 74px) 0 90px;position:relative;z-index:5}
.art .wx{max-width:960px}
.art h1{font-family:var(--disp);font-weight:800;font-size:clamp(30px,4.6vw,50px);
  line-height:1.1;letter-spacing:-.015em;margin:14px 0 18px}
.rkick{font-family:var(--mono);font-size:10.5px;letter-spacing:.22em;
  text-transform:uppercase;color:var(--t2);display:flex;align-items:center;gap:9px}
.rkick i{width:22px;height:1px;background:var(--t1);display:inline-block}
.lede2{color:#cfe8e4;font-size:17px;max-width:70ch}
.meta{display:flex;flex-wrap:wrap;gap:8px;margin:22px 0 6px}
.meta span{font-family:var(--mono);font-size:10.5px;letter-spacing:.06em;
  border:1px solid var(--line2);border-radius:999px;padding:5px 11px;color:var(--mute)}
.meta span b{color:var(--t2);font-weight:500}
.sec{margin:46px 0 0}
.sec>h2{font-family:var(--mono);font-weight:600;font-size:12px;letter-spacing:.2em;
  text-transform:uppercase;color:var(--t2);margin-bottom:14px}
.sec>h2::before{content:'// ';color:var(--t3)}
.sec p{color:#cfe8e4;font-size:15.5px;margin:10px 0;max-width:75ch}
.sec ul{margin:6px 0}
.sec ul li{position:relative;padding-left:20px;margin:9px 0;color:#cfe8e4;font-size:15px}
.sec ul li::before{content:'▸';position:absolute;left:2px;color:var(--t1)}
.sec.neg ul li::before{content:'✗';color:#fb7185}
.sec pre{background:rgba(6,34,32,.72);border:1px solid var(--line);border-radius:10px;
  padding:14px 16px;overflow-x:auto;font:12.5px/1.7 var(--mono);color:var(--t2);margin:12px 0}
.grille{display:grid;gap:12px;grid-template-columns:1fr;margin:14px 0}
@media(min-width:820px){.grille{grid-template-columns:1fr 1fr}}
.carte{border:1px solid var(--line);background:rgba(6,34,32,.5);border-radius:14px;
  padding:16px 18px;transition:border-color .3s,transform .3s}
.carte:hover{border-color:var(--line2);transform:translateY(-2px)}
.carte h3{font-family:var(--mono);font-size:10.5px;letter-spacing:.18em;
  text-transform:uppercase;color:var(--mute);margin-bottom:8px}
.carte p,.carte li{font-size:14px;color:#cfe8e4}
.liens{display:flex;flex-wrap:wrap;gap:10px;margin:26px 0 0}
.liens a{font-family:var(--mono);font-size:11px;letter-spacing:.08em;border:1px solid var(--line2);
  border-radius:9px;padding:9px 14px;color:var(--t2);transition:background .3s,color .3s}
.liens a:hover{background:var(--t1);color:var(--ink)}
.src{font-family:var(--mono);font-size:10.5px;color:var(--mute2);margin-top:6px}
.rcard{display:block;border:1px solid var(--line);background:rgba(6,34,32,.5);
  border-radius:16px;padding:22px 24px;margin:14px 0;transition:border-color .3s,transform .3s}
.rcard:hover{border-color:var(--line2);transform:translateY(-3px)}
.rcard h3{font-family:var(--disp);font-weight:700;font-size:19px;line-height:1.3;margin:8px 0 10px}
.rcard p{color:#cfe8e4;font-size:14.5px}
.pastille{font-family:var(--mono);font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;
  color:var(--t1)}
"""


def extraire_sources() -> dict:
    texte = SRC.read_text(encoding="utf-8")
    lignes = texte.splitlines()

    css = texte.split("<style>", 1)[1].split("</style>", 1)[0]

    deb = next(i for i, l in enumerate(lignes) if l.strip() == "(function(){")
    idx_routeur = next(i for i, l in enumerate(lignes) if "ROUTEUR" in l)
    js = "\n".join(lignes[deb : idx_routeur - 1])

    return {"css": css, "js": js}


def entete(page_courante: str) -> str:
    liens = []
    for label, href in NAV:
        on = ' class="on"' if href == page_courante else ""
        liens.append(f'      <a href="{href}"{on}>{label}</a>')
    return f"""<header id="hd">
  <div class="wx hd">
    <a href="/" class="brand">
      <svg viewBox="0 0 64 64" id="brandSvg" aria-hidden="true"></svg>
      <span class="brand-t"><b>RATISS Labs</b><span>Yaoundé · indépendant</span></span>
    </a>

    <nav class="nav" id="nav">
{chr(10).join(liens)}
    </nav>

    <div class="hd-r">
      <a class="btn-s" href="https://github.com/jonathansearch" target="_blank" rel="noreferrer noopener">
        <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-1-2.6c3.1-.3 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 19.9 1S18.7.6 16 2.5a13.4 13.4 0 0 0-7 0C6.3.6 5.1 1 5.1 1A5 5 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.7c0 5.4 3.3 6.7 6.4 7A3.4 3.4 0 0 0 9 18.1V22"/></svg>
        GitHub
      </a>
      <button class="burger" id="burger" aria-label="Menu" aria-expanded="false">
        <svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>
    </div>
  </div>
</header>

<div class="menu" id="menu">
{chr(10).join(f'  <a href="{h}">{l}</a>' for l, h in NAV)}
  <hr>
  <a href="/about/#licence">Licence</a>
  <a href="/about/#confidentialite">Confidentialité</a>
</div>"""


PIED = """<footer>
  <div class="wx">
    <div class="ft-g">
      <div class="ft-b">
        <a href="/" class="brand">
          <svg viewBox="0 0 64 64" aria-hidden="true" id="footSvg"></svg>
          <span class="brand-t"><b>RATISS Labs</b><span>Yaoundé · indépendant</span></span>
        </a>
        <p>
          Laboratoire indépendant, mono-auteur, Yaoundé (Cameroun).
          Audit scientifique exécutable — critères scellés avant les runs,
          échecs publiés, tout rejouable en une commande.
        </p>
      </div>

      <div class="ft-c">
        <h4>Le laboratoire</h4>
        <ul>
          <li><a href="/research/">Research</a></li>
          <li><a href="/audits/">Audits</a></li>
          <li><a href="/protocols/">Protocoles</a></li>
          <li><a href="/about/">À propos</a></li>
        </ul>
      </div>

      <div class="ft-c">
        <h4>Ressources</h4>
        <ul>
          <li><a href="https://github.com/jonathansearch" rel="noreferrer noopener">GitHub</a></li>
          <li><a href="/research/qpu-ghz-ions/">Registre QPU</a></li>
          <li><a href="/research/etalons/">Étalons</a></li>
          <li><a href="/sitemap.xml">Sitemap</a></li>
        </ul>
      </div>

      <div class="ft-c">
        <h4>Vérification</h4>
        <ul>
          <li><a href="/protocols/">Lois du labo</a></li>
          <li><a href="/audits/">Audits</a></li>
          <li><a href="/pro/">RATISS Pro (intégrité IA)</a></li>
          <li><a href="/research/audit-jobids-ibm/">Datation job IDs</a></li>
        </ul>
      </div>
    </div>

    <div class="ft-bot">
      <p>© 2026 RATISS Labs · Yaoundé, Cameroun · MIT</p>
      <div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap">
        <a href="https://orcid.org/0009-0000-4092-5313" target="_blank" rel="noreferrer noopener"
           style="font-family:var(--mono);font-size:10px;color:var(--mute2)">ORCID ↗</a>
        <a href="https://github.com/jonathansearch" target="_blank" rel="noreferrer noopener"
           style="font-family:var(--mono);font-size:10px;color:var(--mute2)">GitHub ↗</a>
        <span class="seal"><i></i>empreintes vérifiées</span>
      </div>
    </div>
  </div>
</footer>"""

SHIM = """
(function(){
  var bg=document.getElementById('burger'), mn=document.getElementById('menu'), hd=document.getElementById('hd');
  function ferme(){ if(mn){mn.classList.remove('open');} if(bg){bg.setAttribute('aria-expanded','false');} }
  if(bg&&mn){ bg.addEventListener('click',function(){ var o=mn.classList.toggle('open'); bg.setAttribute('aria-expanded',o?'true':'false'); });
    mn.querySelectorAll('a').forEach(function(a){a.addEventListener('click',ferme);}); }
  function sol(){ if(hd) hd.classList.toggle('solid', scrollY>10); }
  addEventListener('scroll',sol,{passive:true}); sol();
  document.querySelectorAll('.rv').forEach(function(e){e.classList.add('in');});
})();
"""


def page(titre: str, desc: str, chemin: str, corps: str, temp: str = "teal",
         jsonld: dict | None = None, doc_mode: bool = True) -> str:
    src = extraire_sources()
    canon = f'<link rel="canonical" href="{SITE_URL}{chemin}" />' if SITE_URL else ""
    ld = ""
    if jsonld:
        ld = '<script type="application/ld+json">' + json.dumps(jsonld, ensure_ascii=False) + "</script>"
    return f"""<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{html.escape(titre)}</title>
<meta name="description" content="{html.escape(desc)}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="{html.escape(titre)}" />
<meta property="og:description" content="{html.escape(desc)}" />
<meta property="og:site_name" content="RATISS Labs" />
{canon}
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
<link rel="sitemap" type="application/xml" href="/sitemap.xml" />
<style>{src['css']}
{CSS_ART}
{CV.CSS_VIVANT}</style>
{ld}
</head>
<body{' class="doc-mode"' if doc_mode else ''}>
<canvas id="scene" aria-hidden="true"></canvas>
<div class="veil" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>
{entete(chemin)}
<main>
{corps}
</main>
{PIED}
<script>
{src['js']}
want={{...TEMPS.{temp}}};cur={{...TEMPS.{temp}}};
}})();
{SHIM}
</script>
</body>
</html>
"""


def e(t: str) -> str:
    return html.escape(str(t), quote=False)


def liste(items: list) -> str:
    return "<ul>" + "".join(f"<li>{e(i)}</li>" for i in items) + "</ul>"


def page_recherche(m: dict) -> str:
    s = m["sections"]
    meta = [
        f"<span><b>Date</b> {e(m['date'])}</span>",
        f"<span><b>Version</b> {e(m['version'])}</span>",
        f"<span><b>Statut</b> {e(m['status'])}</span>",
        f"<span><b>Auteur</b> {e(', '.join(m['authors']))}</span>",
    ]
    for d in m["domain"]:
        meta.append(f"<span>{e(d.replace('_', ' '))}</span>")
    artefacts = []
    if (ICI / "rapports" / f"{m['slug']}.pdf").exists():
        artefacts.append(f'<a href="/research/{m["slug"]}/report.pdf">Research Report (PDF, English)</a>')
    if m.get("repository"):
        artefacts.append(f'<a href="{e(m["repository"])}" rel="noreferrer noopener">Code · GitHub</a>')
    if m.get("site"):
        artefacts.append(f'<a href="{e(m["site"])}" rel="noreferrer noopener">Page d’origine</a>')
    if m.get("doi"):
        artefacts.append(f'<a href="https://doi.org/{e(m["doi"])}" rel="noreferrer noopener">DOI</a>')
    elif m.get("zenodo"):
        artefacts.append(f'<a href="{e(m["zenodo"])}" rel="noreferrer noopener">Zenodo</a>')
    else:
        artefacts.append('<a href="/protocols/#zenodo">DOI · à déposer (Zenodo)</a>')
    corps = f"""<div class="art"><div class="wx">
  <p class="rkick"><i></i>Research object · {e(m['id'])}</p>
  <h1>{e(m['title'])}</h1>
  <p class="lede2">{e(m['abstract'])}</p>
  <div class="meta">{''.join(meta)}</div>

  <div class="sec"><h2>Question</h2><p>{e(s['question'])}</p></div>
  <div class="sec"><h2>Travail de référence</h2><p>{e(s['reference_work'])}</p></div>
  <div class="sec"><h2>Méthode</h2><p>{e(s['method'])}</p></div>
  <div class="sec"><h2>Résultats</h2>{liste(s['results'])}</div>
  <div class="sec neg"><h2>Résultats négatifs &amp; échecs assumés</h2>{liste(s['negative'])}</div>
  <div class="sec"><h2>Contrôles</h2><p>{e(s['controls'])}</p></div>
  <div class="sec"><h2>Reproductibilité</h2><pre>{e(m['reproduction'])}</pre></div>
  <div class="sec"><h2>Limites</h2><p>{e(s['limitations'])}</p></div>
  <div class="sec"><h2>Artefacts</h2><div class="liens">{''.join(artefacts)}</div></div>
  <div class="sec"><h2>Sources des chiffres</h2>{liste(m['sources'])}
    <p class="src">Chaque valeur de cette page provient des sources ci-dessus. Aucun chiffre n'est inventé.</p></div>
</div></div>"""
    ld = {
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        "headline": m["title"],
        "abstract": m["abstract"],
        "datePublished": str(m["date"]),
        "version": str(m["version"]),
        "author": [{"@type": "Person", "name": a} for a in m["authors"]],
        "keywords": ", ".join(m["keywords"]),
        "isPartOf": {"@type": "Collection", "name": "RATISS Labs Research"},
        "mainEntityOfPage": f"{SITE_URL}/research/{m['slug']}/" if SITE_URL else f"/research/{m['slug']}/",
        "sameAs": [u for u in (m.get("repository"), m.get("site")) if u],
    }
    return page(m["title"] + " — RATISS Labs", m["abstract"][:300],
                f"/research/{m['slug']}/", corps, m.get("temp", "teal"), ld)


def index_recherche(manifs: list) -> str:
    cartes = []
    for m in manifs:
        cartes.append(
            f'<a class="rcard" href="/research/{m["slug"]}/">'
            f'<span class="pastille">{e(" · ".join(m["type"]))}</span>'
            f"<h3>{e(m['title'])}</h3><p>{e(m['abstract'][:260])}…</p>"
            f'<p class="src">{e(m["id"])} · {e(m["date"])}</p></a>'
        )
    corps = f"""<div class="art"><div class="wx">
  <p class="rkick"><i></i>Catalogue canonique</p>
  <h1>Research</h1>
  <p class="lede2">Une URL canonique par objet de recherche. Chaque page est un objet
  documentaire autonome : question, méthode, résultats, échecs, contrôles,
  reproductibilité, artefacts et sources. Aucun chiffre sans source d'origine.</p>
  {''.join(cartes)}
</div></div>"""
    return page("Research — RATISS Labs",
                "Catalogue des objets de recherche RATISS Labs : reproductions, mesures QPU, simulations, étalons et audits.",
                "/research/", corps, "teal")


def page_simple(titre: str, desc: str, chemin: str, sections_html: str, temp: str) -> str:
    corps = f'<div class="art"><div class="wx">{sections_html}</div></div>'
    return page(titre + " — RATISS Labs", desc, chemin, corps, temp)


def page_audit() -> str:
    sec = (
        '<p class="rkick"><i></i>Offre aux équipes techniques</p>'
        '<h1>Audit d’intégrité exécutable</h1>'
        '<p class="lede2">Un contrôle d’intégrité, pas un label de vérité : les artefacts '
        'annoncés sont scellés, rejouables et tracés, et chaque divergence est documentée. '
        'C’est modeste — et c’est exactement ce qui peut être prouvé.</p>'
        '<div class="sec"><h2>Le problème</h2><p>Vos résultats, livrables et artefacts '
        'changent entre le moment où ils sont mesurés et celui où ils sont publiés ou '
        'déployés. Vérifier à la main coûte du temps d’ingénieur et ne laisse aucune '
        'trace rejouable.</p></div>'
        '<div class="sec"><h2>La preuve, déjà publique</h2><p>Le même protocole est '
        'appliqué en continu aux 68 dépôts publics du laboratoire (au 03/10/2026), avec des contrôles '
        'négatifs (une divergence volontaire est effectivement détectée : les trois cas '
        'du vérificateur de manifeste — conforme, empreintes divergentes, JSON '
        'illisible — sont testés). Tout se rejoue :</p>'
        '<pre>python3 outils/verifier_corpus.py      # registre reconstruit depuis un clone\n'
        'python3 outils/verifier_manifeste.py   # empreintes SHA-256, sortie texte ou JSON</pre></div>'
        '<div class="sec"><h2>Ce que vous recevez, concrètement</h2>'
        '<div class="grille">'
        '<div class="carte"><h4 style="margin:0 0 8px">1 · Rapport scellé (PDF)</h4><p>Paramètres '
        'scellés avant exécution, empreintes SHA-256 de chaque artefact vérifié, verdicts '
        'structurés, visa de relecture. Aucun chiffre sans source.</p></div>'
        '<div class="carte"><h4 style="margin:0 0 8px">2 · Verdict rejouable (JSON)</h4><p>Sortie '
        'machine du vérificateur + commande de rejeu fournie : votre équipe peut '
        'reproduire le verdict sans nous croire sur parole.</p></div>'
        '<div class="carte"><h4 style="margin:0 0 8px">3 · Journal de déviations chaîné</h4><p>Chaque '
        'écart entre mesure et publication : date, empreintes avant/après, décision '
        'prise. Chaîné, donc falsifiable.</p></div>'
        '<div class="carte"><h4 style="margin:0 0 8px">4 · Intégration CI</h4><p>Les mêmes contrôles '
        'branchés sur vos pushes (GitHub Actions) : le suivi continu remplace le '
        'contrôle ponctuel.</p></div>'
        '<div class="carte"><h4 style="margin:0 0 8px">5 · Sceau factuel README</h4><p>Une ligne '
        'datée + empreinte + commande de rejeu dans votre README. Un fait vérifiable, '
        'pas un badge « certifié ».</p></div>'
        '<div class="carte"><h4 style="margin:0 0 8px">6 · Restitution</h4><p>Une séance de '
        'restitution où chaque rouge est expliqué, y compris ceux qui tombent sur '
        'notre propre protocole.</p></div></div></div>'
        '<div class="sec neg"><h2>Ce que l’audit ne fait pas</h2><ul>'
        '<li>Il ne certifie pas qu’un résultat est scientifiquement vrai.</li>'
        '<li>Il ne garantit aucune conformité réglementaire, et ne vend pas de '
        '« tranquillité d’esprit » : le framework du labo dit lui-même que '
        'CONFORME ne veut pas dire VRAI.</li>'
        '<li>Il ne remplace pas une revue par les pairs.</li></ul></div>'
        '<div class="sec"><h2>Statut &amp; cadre</h2><p>Aucune entreprise enregistrée, '
        'aucune équipe, aucun financement : un seul auteur, Jonathan Evina, '
        'laboratoire indépendant à Yaoundé. Intervention en prestataire indépendant ; '
        'framework et outils sous licence MIT ; échecs publiés comme les succès. '
        'Une entreprise qui lit cette page et les mentions légales y lira la même '
        'chose.</p></div>'
        '<div class="sec"><h2>Confidentialité</h2><p>Aucun formulaire, aucun cookie, '
        'aucun outil tiers sur ce site : le premier contact est un simple lien '
        'courriel. Vos artefacts audités ne quittent pas votre infrastructure : '
        'l’audit produit des empreintes, pas des copies.</p></div>'
        '<div class="sec"><h2>L’offre</h2><p>Un audit ponctuel d’un dépôt ou d’un '
        'pipeline, puis un suivi continu en CI si vous le souhaitez. Tarifs à définir '
        'ensemble après un premier échange gratuit.</p>'
        '<div class="liens"><a href="mailto:jonathan.ratisslabs@zohomail.com">'
        'jonathan.ratisslabs@zohomail.com — premier échange gratuit</a></div></div>'
    )
    ld = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Audit d'intégrité exécutable RATISS Labs",
        "serviceType": "Executable integrity audit of code, data and artefacts",
        "provider": {"@type": "Person", "name": "Jonathan Evina",
                     "address": "Yaoundé, Cameroon"},
        "description": "Contrôle d'intégrité exécutable : artefacts scellés, rejouables, "
                       "tracés, divergences documentées. Ne certifie pas la vérité "
                       "scientifique d'un résultat.",
        "url": f"{SITE_URL}/pro/" if SITE_URL else "/pro/",
    }
    return page("Audit d'intégrité exécutable — RATISS Labs",
                "Contrôle d'intégrité exécutable pour équipes techniques : artefacts scellés, "
                "rejouables, tracés, divergences documentées. Ni label de vérité, ni certification.",
                "/pro/", f'<div class="art"><div class="wx">{sec}</div></div>', "or", ld)


def construire() -> int:
    if OUT.exists():
        shutil.rmtree(OUT)
    (OUT / "assets").mkdir(parents=True)
    (OUT / "research").mkdir()
    (OUT / "audits").mkdir()
    (OUT / "protocols").mkdir()
    (OUT / "about").mkdir()
    (OUT / "actualite").mkdir()
    (OUT / "problemes").mkdir()
    (OUT / "img").mkdir()

    # logo restauré depuis l'historique (corrige le 404)
    logo = subprocess.run(
        ["git", "show", "b9f79e6:public/ratiss_labs_logo.webp"],
        capture_output=True, cwd=ICI, check=True).stdout
    (OUT / "assets" / "ratiss_labs_logo.webp").write_bytes(logo)

    manifs = []
    for f in sorted(CONTENU.glob("*.yaml")):
        manifs.append(yaml.safe_load(f.read_text(encoding="utf-8")))

    # --- copie des images (licences libres, créditées) et des données de veille
    for src_img in (ICI / "img").rglob("*"):
        if src_img.is_file():
            cible = OUT / "img" / src_img.relative_to(ICI / "img")
            cible.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(src_img, cible)
    if (ICI / "data").exists():
        (OUT / "data").mkdir(exist_ok=True)
        for f in (ICI / "data").iterdir():
            if f.is_file():
                shutil.copyfile(f, OUT / "data" / f.name)

    pages = {"/": None}
    for m in manifs:
        chemin = f"/research/{m['slug']}/"
        (OUT / "research" / m["slug"]).mkdir()
        pdf_src = ICI / "rapports" / f"{m['slug']}.pdf"
        if pdf_src.exists():
            shutil.copyfile(pdf_src, OUT / "research" / m["slug"] / "report.pdf")
        (OUT / "research" / m["slug"] / "index.html").write_text(page_recherche(m), encoding="utf-8")
        pages[chemin] = m["title"]
    (OUT / "research" / "index.html").write_text(index_recherche(manifs), encoding="utf-8")
    pages["/research/"] = "Research"

    # --- audits ---
    audits = [m for m in manifs if "audit" in m["type"] or "verification" in m["type"]]
    sec = ('<p class="rkick"><i></i>Vérification</p><h1>Audits</h1>'
           '<p class="lede2">Les audits sont des enregistrements de vérification : '
           'ils attestent qu’un résultat externe ou interne a été rejoué, recoupé ou '
           'réfuté. Ils ne sont pas des objets de recherche autonomes.</p>'
           + "".join(
               f'<div class="sec"><h2>{e(a["title"])}</h2><p>{e(a["abstract"][:400])}…</p>'
               f'<div class="liens"><a href="/research/{a["slug"]}/">Lire l’audit</a></div></div>'
               for a in audits)
           + '<div class="sec"><h2>Autres contrôles archivés</h2>'
             '<ul><li>Audit 30/09 : fidélité de population (borne sup.), pentes corrigées '
             '(Garnet −3,2 et non −5), décodeur unique versionné, horodatages serveur '
             'rejouables (64/66, 269 ms).</li>'
             '<li>Analyse externe ESSEC (27/09) : corrigé testé par script, 20/20 — '
             'bilan financier manquant et IS 30 % non appliqué dans la copie examinée.</li></ul></div>')
    (OUT / "audits" / "index.html").write_text(
        page_simple("Audits", "Enregistrements de vérification RATISS Labs : audits rejouables et recoupements.",
                    "/audits/", sec, "amber"), encoding="utf-8")
    pages["/audits/"] = "Audits"

    # --- RATISS Pro (offre entreprises) sur /pro/ ; /audit/ redirige ---
    (OUT / "pro").mkdir()
    vente = ICI / "audit-entreprise.html"
    if vente.exists():
        shutil.copyfile(vente, OUT / "pro" / "index.html")
    else:
        (OUT / "pro" / "index.html").write_text(page_audit(), encoding="utf-8")
    (OUT / "audit").mkdir()
    (OUT / "audit" / "index.html").write_text(
        '<!doctype html><html lang="fr"><head><meta charset="utf-8">'
        '<meta name="robots" content="noindex">'
        '<meta http-equiv="refresh" content="0; url=/pro/">'
        '<link rel="canonical" href="https://ratiss-labs.vercel.app/pro/">'
        '<title>RATISS Pro — redirection</title></head>'
        '<body style="background:#03100f;color:#eefcf9;font-family:Inter,sans-serif">'
        '<p style="text-align:center;padding:20vh 20px">Redirection vers '
        '<a style="color:#facc15" href="/pro/">RATISS Pro</a>…</p></body></html>',
        encoding="utf-8")
    pages["/pro/"] = "RATISS Pro — audit d'intégrité IA"

    # --- actualité (veille vivante + visages réels + faits sourcés) ---
    (OUT / "actualite" / "index.html").write_text(
        page("Actualité — ce qui se passe en IA, régulation et quantique | RATISS Labs",
             "Actualité tech, IA et quantique suivie par RATISS Labs : faits sourcés, "
             "photos sous licence libre, flux de recherche collecté automatiquement.",
             "/actualite/", CV.page_actualite(), "teal"), encoding="utf-8")
    pages["/actualite/"] = "Actualité"

    # --- 50 problèmes ouverts (interactif, réponses locales) ---
    (OUT / "problemes" / "index.html").write_text(
        page("50 problèmes ouverts — IA, audit, quantique | RATISS Labs",
             "50 problèmes réels rencontrés en auditant des artefacts et des résultats de machines. "
             "Donnez votre avis : il oriente notre feuille de route.",
             "/problemes/", CV.page_problemes(), "amber"), encoding="utf-8")
    pages["/problemes/"] = "50 problèmes ouverts"

    # --- recherche fondamentale (ce qui ne se vend pas) ---
    (OUT / "fondamentale").mkdir()
    (OUT / "fondamentale" / "index.html").write_text(
        page("Recherche fondamentale — PHOTON, NAVIER, ÉTALONS, GHZ-4 | RATISS Labs",
             "Les chantiers de recherche fondamentale du laboratoire : résultats rejouables, "
             "DOI, identifiants de jobs, échecs publiés. Mono-auteur, Yaoundé.",
             "/fondamentale/", CV.page_fondamentale(), "teal"), encoding="utf-8")
    pages["/fondamentale/"] = "Recherche fondamentale"

    # --- protocoles (les lois du labo, documentées) ---
    sec = ('<p class="rkick"><i></i>Méthode</p><h1>Protocoles &amp; lois du labo</h1>'
           '<p class="lede2">Les règles ci-dessous ont été payées en crédits, en temps ou en '
           'erreurs reconnues. Elles ne sont pas décoratives.</p>'
           '<div class="sec"><h2>Avant tout run</h2><ul>'
           '<li>Critères scellés AVANT exécution (PROTOCOLE.md / PARAMETRES-FIGES.md).</li>'
           '<li>Devis lu AVANT approbation (« Auto-selected plan: N credits »).</li>'
           '<li>Tir 1 par 1, ordre Garnet → Cepheus → IBEX ; jamais annuler un job sans ordre.</li>'
           '</ul></div>'
           '<div class="sec"><h2>Pendant &amp; après</h2><ul>'
           '<li>Zéro chiffre non calculé ; échecs publiés comme les succès.</li>'
           '<li>Étiquettes 🧮 calcul / 🛰️ QPU / 📚 revue : jamais mélangées.</li>'
           '<li>LOI RATISS du shot épisodique : co-hébergé → all-to-all ONLY (45 % vs 94 %).</li>'
           '<li>Provenance : empreintes SHA-256 ; manifeste rescellé à chaque campagne.</li>'
           '<li>Visualisations : matplotlib / Plotly embarqué, jamais de 3D fait-main.</li>'
           '<li>Attribution Open Quantum obligatoire (www.openquantum.com/citation).</li>'
           '</ul></div>'
           '<div class="sec" id="zenodo"><h2>Publication &amp; DOI</h2><ul>'
           '<li>Une page canonique par recherche ; sitemap + robots.txt + métadonnées.</li>'
           '<li>Zenodo : dépôt, métadonnées complètes, DOI par version (v1, v2… reliées).</li>'
           '<li>PDF scientifique : titre en haut de page 1, auteurs sous le titre, bibliographie en fin.</li>'
           '</ul></div>')
    (OUT / "protocols" / "index.html").write_text(
        page_simple("Protocoles", "Méthode et lois du labo RATISS : critères scellés, devis avant approbation, provenance SHA-256.",
                    "/protocols/", sec, "menthe"), encoding="utf-8")
    pages["/protocols/"] = "Protocoles"

    # --- à propos ---
    sec = ('<p class="rkick"><i></i>Identité</p><h1>À propos</h1>'
           '<p class="lede2">RATISS Labs est un laboratoire indépendant, mono-auteur, basé à '
           'Yaoundé (Cameroun). Ce n’est pas un laboratoire institutionnel et il ne prétend '
           'à aucune validation par les pairs. <b>Aucune entreprise enregistrée, aucune '
           'équipe, aucun financement</b> — la même phrase figure sur la page '
           '<a href="/audit/" style="color:var(--t2)">Audit d’intégrité</a>.</p>'
           '<div class="grille"><div class="carte"><h3>Chef de labo</h3>'
           '<p>Jonathan Evina, 18 ans. ORCID 0009-0000-4092-5313. '
           'Contact : jonathan.ratisslabs@zohomail.com</p></div>'
           '<div class="carte"><h3>Principe fondateur</h3>'
           '<p>« On ne croit pas. On rejoue. » Tout résultat publié est accompagné de sa '
           'commande de rejeu et de ses sources.</p></div>'
           '<div class="carte"><h3>Périmètre</h3><p>Physique quantique (calcul 🧮 et QPU 🛰️), '
           'photonique, dynamique des fluides, étalons de physique statistique, audits de '
           'reproductibilité.</p></div>'
           '<div class="carte"><h3>Transparence</h3><p>Les échecs et résultats négatifs sont '
           'publiés au même titre que les succès ; les divergences sont documentées.</p></div></div>'
           '<div class="sec" id="licence"><h2>Licence</h2><p>Travaux et framework publiés sous '
           'licence MIT (Copyright (c) 2026 Jonathan Evina · RATISS Labs), sauf mention contraire '
           'dans chaque dépôt.</p></div>'
           '<div class="sec" id="confidentialite"><h2>Confidentialité</h2><p>Site statique : '
           'aucun cookie, aucun traceur, aucun compte, aucun formulaire. Les seules requêtes '
           'externes sont les polices Google Fonts et les liens sortants cliqués '
           'volontairement. Hébergement : Vercel (ratiss-labs.vercel.app) ; sources et '
           'historique : GitHub ; archives scientifiques : Zenodo. L’ancienne adresse '
           'GitHub Pages redirige vers ce site.</p></div>')
    (OUT / "about" / "index.html").write_text(
        page_simple("À propos", "RATISS Labs : laboratoire indépendant mono-auteur, Yaoundé. Principe : on ne croit pas, on rejoue.",
                    "/about/", sec, "indigo"), encoding="utf-8")
    pages["/about/"] = "À propos"

    # --- accueil : le site d'origine, logo corrigé + liens vers les pages statiques ---
    accueil = SRC.read_text(encoding="utf-8")
    accueil = accueil.replace(
        'src="https://raw.githubusercontent.com/jonathansearch/ratiss-labs-site/master/public/ratiss_labs_logo.webp"',
        'src="/assets/ratiss_labs_logo.webp"')
    accueil = accueil.replace(
        '<a href="#/recherche" data-r="/recherche">Recherche</a>',
        '<a href="#/recherche" data-r="/recherche">Recherche</a>\n      <a href="/research/">Research</a>\n      <a href="/pro/" style="color:#facc15;font-weight:700">💼 RATISS Pro</a>',
        1)
    accueil = accueil.replace(
        '  <hr>\n  <a href="#/confidentialite"',
        '  <a href="/research/">— Pages Research (indexables)</a>\n  <a href="/pro/">— RATISS Pro (intégrité IA, entreprises)</a>\n  <hr>\n  <a href="#/confidentialite"')
    accueil = accueil.replace(
        '<li><a href="#/recherche">Recherche</a></li>',
        '<li><a href="#/recherche">Recherche</a></li>\n          <li><a href="/research/">Research (pages indexables)</a></li>\n          <li><a href="/pro/" style="color:#facc15">💼 RATISS Pro (intégrité IA)</a></li>')
    accueil = accueil.replace('<body>', '<body>\n' + RBAR, 1)
    accueil = accueil.replace(
        "<title>", '<link rel="sitemap" type="application/xml" href="/sitemap.xml" />\n<title>', 1)
    (OUT / "index.html").write_text(accueil, encoding="utf-8")

    # --- 404 ---
    (OUT / "404.html").write_text(page_simple(
        "404", "Page introuvable.", "/404.html",
        '<p class="rkick"><i></i>Erreur</p><h1>404 — page introuvable</h1>'
        '<p class="lede2">Cette URL n’existe pas. Le catalogue complet est sur '
        '<a href="/research/" style="color:var(--t2)">/research/</a>.</p>', "rose"), encoding="utf-8")

    # --- fichiers de vérification (Search Console, etc.) ---
    VERIF = ICI / "verif"
    if VERIF.exists():
        for f in VERIF.iterdir():
            if f.is_file():
                shutil.copyfile(f, OUT / f.name)

    # --- robots + sitemap ---
    base = SITE_URL or "https://ratiss-labs.org"
    (OUT / "robots.txt").write_text(
        f"User-Agent: *\nAllow: /\n\nSitemap: {base}/sitemap.xml\n", encoding="utf-8")
    urls = ["/", "/research/", "/audits/", "/protocols/", "/about/", "/pro/",
            "/actualite/", "/problemes/", "/fondamentale/"] + [
        f"/research/{m['slug']}/" for m in manifs]
    xml = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u in urls:
        xml.append(f"  <url><loc>{base}{u}</loc></url>")
    xml.append("</urlset>")
    (OUT / "sitemap.xml").write_text("\n".join(xml) + "\n", encoding="utf-8")

    print("✅ build terminé →", OUT)
    print(f"   pages : {len(urls)} · manifests : {len(manifs)} · SITE_URL : {base}")
    for u in urls:
        print(f"     {u}")
    return 0


if __name__ == "__main__":
    sys.exit(construire())
