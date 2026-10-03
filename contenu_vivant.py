#!/usr/bin/env python3
"""RATISS — contenu vivant : actualité, 50 problèmes, recherche fondamentale.

Importé par build.py. Rien ici n'est inventé : chiffres tiers = cités avec lien,
chiffres du labo = calculés et traçables. Chaque page garde ses sources en clair.
"""
from __future__ import annotations

import html, json, pathlib

ICI = pathlib.Path(__file__).resolve().parent

def e(t) -> str:
    return html.escape(str(t), quote=False)

# ---------------------------------------------------------------- crédits images
def credits_images() -> dict:
    f = ICI / "img" / "CREDITS.json"
    return json.loads(f.read_text(encoding="utf-8")) if f.exists() else {}

CR = credits_images()
def credit(slug: str) -> str:
    c = CR.get(slug, {})
    if not c:
        return ""
    auteur = (c.get("auteur") or "").replace("http", " http").strip()
    return (f'<span class="img-cred">{e(c.get("licence","?"))} · {e(auteur[:70])} · '
            f'<a href="{e(c.get("page","#"))}" rel="noopener nofollow" target="_blank">Wikimedia Commons</a></span>')

CSS_VIVANT = """
<style>
.vx{--or:#facc15;--tl:#2dd4bf}
.hero2{padding:26px 0 6px}
.live-w{display:flex;align-items:center;gap:10px;font-family:"IBM Plex Mono",monospace;font-size:.72rem;color:#7fa8a3;margin:2px 0 16px}
.dot{width:8px;height:8px;border-radius:50%;background:#2dd4bf;box-shadow:0 0 0 0 rgba(45,212,191,.7);animation:pl 2.2s infinite}
@keyframes pl{0%{box-shadow:0 0 0 0 rgba(45,212,191,.6)}70%{box-shadow:0 0 0 10px rgba(45,212,191,0)}100%{box-shadow:0 0 0 0 rgba(45,212,191,0)}}
.flow{display:grid;gap:10px}
.fitem{display:grid;grid-template-columns:64px 1fr;gap:12px;padding:11px 13px;border:1px solid rgba(45,212,191,.16);border-radius:12px;background:rgba(6,26,25,.5);transition:border-color .2s,transform .2s}
.fitem:hover{border-color:rgba(45,212,191,.45);transform:translateX(3px)}
.fdate{font-family:"IBM Plex Mono",monospace;font-size:.68rem;color:#7fa8a3;padding-top:3px}
.ftitre{font-weight:600;color:#eefcf9;text-decoration:none;line-height:1.35;font-size:.95rem}
.ftitre:hover{color:#5eead4}
.fmeta{font-family:"IBM Plex Mono",monospace;font-size:.66rem;color:#7fa8a3;margin-top:4px}
.fmeta a{color:#5eead4}
.chips{display:flex;flex-wrap:wrap;gap:7px;margin:14px 0 18px}
.chip{font:600 .74rem "IBM Plex Mono",monospace;padding:6px 12px;border-radius:99px;border:1px solid rgba(45,212,191,.28);color:#9fd8d2;background:rgba(6,34,32,.5);cursor:pointer;user-select:none}
.chip:hover{border-color:#2dd4bf;color:#eefcf9}
.chip.on{background:#2dd4bf;color:#03100f;border-color:#2dd4bf}
.pcards{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px;margin:16px 0}
.pcard{border:1px solid rgba(45,212,191,.18);border-radius:14px;overflow:hidden;background:rgba(6,26,25,.55)}
.pcard img{width:100%;height:190px;object-fit:cover;object-position:top center;display:block;filter:saturate(.94)}
.pcard .pc-b{padding:11px 13px 13px}
.pcard h4{margin:0 0 3px;font-family:Syne,sans-serif;font-size:1rem;color:#eefcf9}
.pcard .pc-r{font-family:"IBM Plex Mono",monospace;font-size:.64rem;color:#7fa8a3;margin-bottom:7px}
.pcard p{margin:0;font-size:.82rem;color:#c9e8e4;line-height:1.5}
.pcard a.pc-l{display:inline-block;margin-top:8px;font:.7rem "IBM Plex Mono",monospace;color:#facc15;text-decoration:none}
.img-cred{display:block;font-family:"IBM Plex Mono",monospace;font-size:.58rem;color:#5f7f7b;margin-top:7px;line-height:1.4}
.img-cred a{color:#7fa8a3}
.plist{display:grid;gap:11px;margin-top:8px}
.pbl{border:1px solid rgba(45,212,191,.16);border-radius:13px;padding:12px 14px;background:rgba(6,26,25,.46)}
.pbl .pb-h{display:flex;gap:10px;align-items:baseline}
.pbl .pb-n{font-family:"IBM Plex Mono",monospace;font-size:.7rem;color:#2dd4bf;min-width:26px}
.pbl h4{margin:0;font-size:.95rem;color:#eefcf9;font-family:Inter,sans-serif;font-weight:600;line-height:1.35}
.pbl p{margin:6px 0 0 36px;font-size:.83rem;color:#c3e2de;line-height:1.55}
.pbl .src{display:block;margin:6px 0 0 36px;font:.65rem "IBM Plex Mono",monospace;color:#7fa8a3}
.pbl .src a{color:#5eead4}
.vote{display:flex;gap:7px;margin:10px 0 0 36px;flex-wrap:wrap;align-items:center}
.vb{font:600 .7rem "IBM Plex Mono",monospace;padding:5px 11px;border-radius:8px;border:1px solid rgba(45,212,191,.25);background:rgba(6,34,32,.4);color:#9fd8d2;cursor:pointer}
.vb:hover{border-color:#2dd4bf;color:#eefcf9}
.vb.sel{background:#facc15;color:#03100f;border-color:#facc15}
.vb.sel.crit{background:#f87171;border-color:#f87171;color:#1a0505}
.pnote{font:.62rem "IBM Plex Mono",monospace;color:#7fa8a3;margin-left:2px}
.barre{display:flex;gap:9px;align-items:center;flex-wrap:wrap;margin:20px 0 6px;padding:13px 15px;border:1px dashed rgba(250,204,21,.35);border-radius:13px;background:rgba(250,204,21,.05)}
.barre b{color:#facc15}
.barre button{font:600 .74rem "IBM Plex Mono",monospace;padding:7px 13px;border-radius:9px;border:1px solid rgba(45,212,191,.3);background:rgba(6,34,32,.55);color:#9fd8d2;cursor:pointer}
.barre button:hover{border-color:#2dd4bf;color:#eefcf9}
.barre button.or{background:#facc15;color:#03100f;border-color:#facc15}
.phot.row{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:11px;margin:16px 0}
.phot figure{margin:0;border-radius:12px;overflow:hidden;border:1px solid rgba(45,212,191,.16);background:rgba(6,26,25,.5)}
.phot img{width:100%;height:132px;object-fit:cover;display:block}
.phot figcaption{padding:8px 10px;font-family:"IBM Plex Mono",monospace;font-size:.62rem;color:#9fd8d2;line-height:1.45}
.fond{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:15px;margin:16px 0}
.fond .fc{border-left:2px solid #2dd4bf;padding:2px 0 2px 14px}
.fond .fc h4{margin:0 0 4px;font-family:Syne,sans-serif;font-size:1rem;color:#eefcf9}
.fond .fc p{margin:0;font-size:.84rem;color:#c3e2de;line-height:1.55}
.stat{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:11px;margin:14px 0}
.stat div{border:1px solid rgba(45,212,191,.18);border-radius:11px;padding:11px 12px;background:rgba(6,26,25,.5);text-align:center}
.stat b{display:block;font-family:Syne,sans-serif;font-size:1.3rem;color:#5eead4}
.stat span{font-family:"IBM Plex Mono",monospace;font-size:.63rem;color:#7fa8a3}
.tl{border-left:2px solid rgba(45,212,191,.25);margin:16px 0 6px;padding-left:16px;display:grid;gap:14px}
.tl .t{position:relative}
.tl .t:before{content:"";position:absolute;left:-22px;top:6px;width:9px;height:9px;border-radius:50%;background:#2dd4bf;box-shadow:0 0 10px #2dd4bf}
.tl .t .d{font-family:"IBM Plex Mono",monospace;font-size:.66rem;color:#facc15}
.tl .t h4{margin:3px 0 3px;font-size:.96rem;color:#eefcf9;font-family:Inter,sans-serif}
.tl .t p{margin:0;font-size:.83rem;color:#c3e2de;line-height:1.5}
.tl .t a{color:#5eead4;font-size:.79rem}
.jauge{height:7px;border-radius:99px;background:rgba(127,168,163,.2);overflow:hidden;margin-top:7px}
.jauge i{display:block;height:100%;background:linear-gradient(90deg,#2dd4bf,#facc15)}
@media(max-width:640px){.fitem{grid-template-columns:52px 1fr}.pcard img{height:160px}.vote{margin-left:0}}
</style>
"""

# ================================================================ ACTUALITÉ
ACTUS_SECTEUR = [
    {
        "date": "2 octobre 2026", "tag": "Marché",
        "titre": "Le régulateur américain ouvre une enquête sur les risques produits des grandes IA",
        "texte": ("La FTC a lancé une investigation sur OpenAI, Anthropic et d'autres acteurs au sujet "
                  "des risques liés à leurs produits. Ce qui est en jeu n'est pas la performance des modèles, "
                  "mais **ce qu'une organisation peut prouver** quand un système se trompe."),
        "lien": "https://www.cnbc.com/2026/09/30/ftc-ai-probe-openai-anthropic.html",
        "source": "CNBC, 30/09/2026",
    },
    {
        "date": "23 septembre 2026", "tag": "Quantique",
        "titre": "Premier décodeur d'erreurs quantiques en temps réel sur un seul CPU",
        "texte": ("IonQ annonce avoir démontré un décodeur d'erreurs de bout en bout, en temps réel, tournant sur "
                  "un unique processeur standard — testé sur des circuits simulés jusqu'à 408 qubits logiques et "
                  "31,5 millions d'opérations, avec 0,02 % de surcoût. La correction d'erreurs cesse d'être un goulot."),
        "lien": "https://www.cnbc.com/2026/09/23/ionq-shares-rally-after-company-says-it-made-a-major-quantum-computing-breakthrough.html",
        "source": "CNBC, 23/09/2026",
    },
    {
        "date": "23 septembre 2026", "tag": "Fiabilité IA",
        "titre": "Un résumé IA faux peut réécrire la mémoire de celui qui le lit",
        "texte": ("Étude Georgetown + University of Washington : les résumés vidéo générés par IA omettaient en moyenne "
                  "**51,6 % des événements centraux**, et 95 % ne mentionnaient pas l'incident principal. "
                  "Les lecteurs d'un résumé exact rappelaient correctement un détail clé dans **83,6 %** des cas — "
                  "contre **44,8 %** avec un résumé fautif. Prévenir que « c'est de l'IA » ne protège pas."),
        "lien": "https://neurosciencenews.com/ai-false-memory-llm-31261/",
        "source": "Neuroscience News, 27/09/2026 (étude présentée à AIES)",
    },
    {
        "date": "2 août 2026", "tag": "Régulation",
        "titre": "AI Act : le marquage des contenus synthétiques est applicable",
        "texte": ("Les obligations de transparence de l'article 50 s'appliquent depuis le 2 août 2026. Pour les systèmes "
                  "déjà sur le marché, un sursis court **jusqu'au 2 décembre 2026** pour se conformer au marquage "
                  "lisible par machine **et** à la détectabilité. Le Code of Practice admet le filigrane statistique "
                  "ou la provenance cryptographique (C2PA)."),
        "lien": "https://www.dataprotectionreport.com/2026/07/the-eu-ai-act-when-does-it-become-enforceable-now/",
        "source": "Data Protection Report (Norton Rose Fulbright), 26/07/2026",
    },
    {
        "date": "28 septembre 2026", "tag": "Quantique",
        "titre": "Ascella de retour en ligne",
        "texte": ("Après une période d'indisponibilité, le QPU photonique Ascella de Quandela est redevenu accessible. "
                  "Nous l'avons utilisé le jour même — circuit Hong-Ou-Mandel, 100 tirs, exécuté en 22 secondes. "
                  "C'est notre premier job sur un QPU photonique réel."),
        "lien": "https://cloud.quandela.com",
        "source": "Annonce plateforme, 28/09/2026",
    },
]

PERSONNES = [
    {"slug": "sam-altman", "nom": "Sam Altman", "role": "OpenAI",
     "texte": "Son entreprise fait partie de celles visées par l'enquête de la FTC sur les risques produits (30/09/2026)."},
    {"slug": "dario-amodei", "nom": "Dario Amodei", "role": "Anthropic",
     "texte": "Anthropic est également citée dans l'enquête FTC. Anthropic publie par ailleurs ses « model cards » — un début d'auditabilité."},
    {"slug": "demis-hassabis", "nom": "Demis Hassabis", "role": "Google DeepMind",
     "texte": "Google Research a publié en août 2026 l'étude montrant que l'échec du rappel, plus que l'encodage, est la cause principale des erreurs factuelles."},
    {"slug": "jensen-huang", "nom": "Jensen Huang", "role": "NVIDIA",
     "texte": "NVIDIA installe des machines quantiques dans son centre de recherche (accord annoncé le 23/09/2026 : Superion 256 d'IonQ, déploiement prévu 2027)."},
]


def page_actualite() -> str:
    veille = {}
    f = ICI / "data" / "veille.json"
    if f.exists():
        try:
            veille = json.loads(f.read_text(encoding="utf-8"))
        except Exception:
            veille = {}

    cartes = []
    for a in ACTUS_SECTEUR:
        cartes.append(f"""
        <article class="pbl" style="margin-bottom:11px">
          <div class="pb-h"><span class="pb-n">◈</span><h4>{e(a['titre'])}</h4></div>
          <p>{a['texte'].replace('**','')}</p>
          <span class="src">{e(a['date'])} · {e(a['tag'])} · <a href="{e(a['lien'])}" target="_blank" rel="noopener">{e(a['source'])}</a></span>
        </article>""")

    fiches = []
    for p in PERSONNES:
        fiches.append(f"""
        <div class="pcard">
          <img src="/img/personnes/{p['slug']}.jpg" alt="{e(p['nom'])}" loading="lazy" />
          <div class="pc-b">
            <h4>{e(p['nom'])}</h4>
            <div class="pc-r">{e(p['role'])}</div>
            <p>{e(p['texte'])}</p>
          </div>
          {credit(p['slug'])}
        </div>""")

    # --- flux veille (rendu serveur + filtre client)
    flux_html = []
    tags_flux = []
    for theme, v in (veille.get("themes") or {}).items():
        slug = "t" + str(abs(hash(theme)) % 10**8)
        tags_flux.append((slug, theme, len(v.get("entrees", []))))
        for ent in v.get("entrees", [])[:12]:
            if theme == "Actualité tech":
                meta = (f'{ent.get("date","")} · Hacker News · {ent.get("points",0)} pts · '
                        f'<a href="{e(ent.get("discussion","#"))}" target="_blank" rel="noopener">discussion</a>')
            else:
                aut = ", ".join(ent.get("auteurs", [])[:2])
                meta = f'{ent.get("date","")} · arXiv · {e(aut)}'
            flux_html.append(f"""
            <div class="fitem" data-t="{slug}">
              <div class="fdate">{e(ent.get('date',''))}</div>
              <div>
                <a class="ftitre" href="{e(ent.get('lien','#'))}" target="_blank" rel="noopener">{e(ent.get('titre',''))}</a>
                <div class="fmeta">{meta}</div>
              </div>
            </div>""")

    chips = "".join(
        f'<span class="chip on" data-f="{s}">{e(n)} <b style="opacity:.6">{c}</b></span>'
        for s, n, c in [("tous", "Tout", sum(t[2] for t in tags_flux))] + tags_flux)

    genere = e(veille.get("genere_le", "—"))
    fenetre = veille.get("fenetre_jours", "—")

    corps = f"""
<div class="art">
<div class="wx">
<section class="hero2">
  <p class="kick"><i></i>Actualité</p>
  <h1>Ce qui se passe, ce qu'on en fait</h1>
  <p class="lede2">Le secteur bouge vite : régulation, fiabilité des modèles, machines quantiques.
  Cette page suit ce mouvement et dit, à chaque fois, ce que ça change pour notre travail.
  <b>Rien n'est présenté sans sa source</b> — vous pouvez vérifier chaque ligne.</p>

  <div class="live-w"><span class="dot"></span>
    Collecte automatique du <b style="color:#9fd8d2">{genere}</b> ·
    fenêtre {fenetre} jours ·
    <span id="vcount">{sum(t[2] for t in tags_flux)}</span> entrées collectées
  </div>
</section>

<section class="sec">
  <h2>Les faits marquants du moment</h2>
  {''.join(cartes)}
</section>

<section class="sec">
  <h2>Les visages de cette actualité</h2>
  <p class="lede2">Ces personnes dirigent les organisations qui construisent les systèmes que nous auditons —
  ou dont les travaux éclairent notre méthode. Photos sous licence libre, créditées.</p>
  <div class="pcards">{''.join(fiches)}</div>
</section>

<section class="sec">
  <h2>Le flux vivant : recherche & tech</h2>
  <p class="lede2">Préprints arXiv et discussions techniques, collectés automatiquement par notre script de veille
  (<code>veille.py</code>, sources publiques, sans clé). <b>Filtrez par thème :</b>
  c'est notre niche en direct — fiabilité IA, provenance, quantique, intégrité logicielle.</p>
  <div class="chips" id="chips">{chips}</div>
  <div class="flow" id="flux">{''.join(flux_html) or '<p class="lede2">Aucune donnée de veille : lancer <code>python3 veille.py</code>.</p>'}</div>
  <p style="font-family:'IBM Plex Mono',monospace;font-size:.65rem;color:#7fa8a3;margin-top:14px">
    Collecte automatique : aucune de ces entrées n'est vérifiée par RATISS. Titre, date et lien sont repris tels quels,
    et pointent vers la source. Nos propres vérifications sont marquées ✓ dans la page <a href="/pro/">RATISS Pro</a>.
  </p>
</section>

<section class="sec">
  <h2>Ce que ça change pour nous</h2>
  <div class="fond">
    <div class="fc"><h4>Le régulateur cherche des preuves</h4>
      <p>Quand une autorité enquête, la question n'est plus « votre modèle est-il bon ? » mais
      « que pouvez-vous exhiber ? ». C'est exactement le trou que notre chaînage d'artefacts comble.</p></div>
    <div class="fc"><h4>L'article 50 réclame du marquage</h4>
      <p>Le sursis du 2 décembre 2026 arrive vite. Notre approche par empreintes et rejeu est
      complémentaire du C2PA : le registre dit qui a produit quoi, nous disons si c'est rejouable.</p></div>
    <div class="fc"><h4>La correction d'erreurs progresse</h4>
      <p>Quand les décodeurs temps réel tiennent la charge, les résultats quantiques deviennent
      plus fiables — donc plus engageants. Un résultat engageant doit être archivable : id, code, date, empreinte.</p></div>
  </div>
  <p style="margin-top:14px"><a class="btn" href="/pro/">Voir notre offre d'audit →</a>
  <a class="btn" href="/problemes/" style="margin-left:8px">Les 50 problèmes ouverts →</a></p>
</section>
</div>
</div>
<script>
(()=>{{
  const chips=[...document.querySelectorAll('#chips .chip')];
  const items=[...document.querySelectorAll('#flux .fitem')];
  const cnt=document.getElementById('vcount');
  chips.forEach(c=>c.addEventListener('click',()=>{{
    chips.forEach(x=>x.classList.remove('on')); c.classList.add('on');
    const f=c.dataset.f; let n=0;
    items.forEach(it=>{{ const ok=(f==='tous'||it.dataset.t===f); it.style.display=ok?'':'none'; if(ok)n++; }});
    if(cnt) cnt.textContent=n;
  }}));
}})();
</script>
"""

    return corps


# ================================================================ 50 PROBLÈMES
def _pbl(n, cat, titre, texte, source=None, lien=None):
    s = (f'<span class="src">Source : <a href="{e(lien)}" target="_blank" rel="noopener">{e(source)}</a></span>'
         if source else '<span class="src">Constats de terrain du labo — non vérifiés par un tiers</span>')
    return f"""
<div class="pbl" data-p="{n}">
  <div class="pb-h"><span class="pb-n">{n:02d}</span><h4>{e(titre)}</h4></div>
  <p>{e(texte)}</p>
  {s}
  <div class="vote" data-p="{n}">
    <button class="vb crit" data-v="critique">Critique</button>
    <button class="vb" data-v="important">Important</button>
    <button class="vb" data-v="plus-tard">Plus tard</button>
    <button class="vb" data-v="deja-vu">Je l'ai vécu</button>
    <span class="pnote"></span>
  </div>
</div>"""


PROBLEMES = [
 ("Vérité & fiabilité des IA", [
  ("Les IA inventent des chiffres précis sans avertir",
   "Un modèle produit un DOI, une date ou un numéro de version plausible qui n'existe pas. Le lecteur n'a aucun signal d'alerte.",
   "HALoGEN, ACL 2025", "https://aclanthology.org/2025.acl-long.71/"),
  ("Les résumés automatiques suppriment le fait principal",
   "Sur des vidéos d'incident, les résumés IA ont omis en moyenne 51,6 % des événements centraux ; 95 % ont manqué l'incident lui-même.",
   "Georgetown + Univ. Washington, 09/2026", "https://neurosciencenews.com/ai-false-memory-llm-31261/"),
  ("Un résumé fautif modifie la mémoire du lecteur — même prévenu",
   "Rappel correct : 83,6 % avec un résumé exact contre 44,8 % avec un résumé fautif. Prévenir que c'est de l'IA ne protège pas.",
   "Étude AIES, 09/2026", "https://earth.com/science/one-wrong-detail-in-an-ai-summary-can-alter-a-persons-memory"),
  ("L'échec du rappel, pas l'encodage, explique la plupart des erreurs",
   "Encodage des faits saturé à 95–98 %, mais le rappel direct échoue sur 26–34 % des cas et plus de 70 % des erreurs viennent du rappel.",
   "Google Research, 08/2026", "https://research.google/blog/empty-shelves-or-lost-keys-recall-is-the-bottleneck-for-parametric-factuality/"),
  ("Le raisonnement en chaîne ne sauve pas la vérité factuelle",
   "Le « chain-of-thought » ne réduit le taux d'erreur que marginalement (11–12 % d'échec subsistant sur du rappel simple).",
   "Google Research, 08/2026", "https://research.google/blog/empty-shelves-or-lost-keys-recall-is-the-bottleneck-for-parametric-factuality/"),
  ("Aucune réponse n'est rattachée à la version exacte du modèle",
   "Deux réponses du même modèle à trois mois d'intervalle peuvent différer : rien n'indique quelle version a produit quel texte."),
  ("Le lecteur ne peut pas vérifier une affirmation sans ses données",
   "Une conclusion chiffrée est publiée sans le corpus, le script ni la graine — donc elle n'est pas rejouable, seulement croyable."),
  ("L'évaluation des modèles est faite par ceux qui les vendent",
   "Les rapports de performance proviennent des éditeurs eux-mêmes ; l'audit externe reste l'exception."),
  ("Les rapports d'évaluation ne sont pas rejouables",
   "Les scores de benchmark sont publiés sans harnais complet, sans version de jeu de données, sans graine."),
  ("Les agents agissent sans piste d'audit exécutable",
   "Un agent qui appelle des outils peut modifier des données ; la trace existe parfois, mais elle n'est ni scellée ni rejouable."),
  ("Les benchmarks binaires récompensent la confiance fausse",
   "Notation binaire sur 9 des 10 principaux benchmarks : répondre « je ne sais pas » est pénalisé, inventer avec assurance est récompensé.",
   "Analyse citée par Computerworld, 2025", "https://www.computerworld.com/article/4059383/"),
  ("Le RAG réduit les fabrications sans les supprimer",
   "Ajouter un corpus externe améliore la traçabilité mais ne garantit pas que l'affirmation produite soit fidèle à la source."),
 ]),
 ("Intégrité & provenance", [
  ("Le C2PA est un registre, pas une preuve de vérité",
   "Une signature de provenance dit qui déclare avoir produit un fichier. Elle ne dit rien sur l'exactitude de son contenu."),
  ("Les filigranes statistiques se cassent à la retouche",
   "Redimensionner, recadrer ou recompresser dégrade le signal. La marque disparaît avant l'usage malveillant."),
  ("Les artefacts scientifiques ne sont pas scellés",
   "Figures, tableaux et jeux de données circulent sans empreinte : rien ne distingue la version publiée d'une version modifiée."),
  ("Un PDF publié peut être modifié sans laisser de trace",
   "Sans empreinte publiée séparément, un chiffre modifié dans un article ne se voit pas."),
  ("Les chaînes d'outils cassent la provenance",
   "Entre l'entrée, le traitement et la sortie, les identifiants se perdent ; personne ne peut remonter du résultat au fichier source."),
  ("Les manifestes de reproductibilité sont rares",
   "Peu de publications fournissent un manifeste listant fichiers, versions, empreintes et commandes d'exécution."),
  ("Un DOI ne garantit pas la rejouabilité",
   "Le DOI identifie une ressource durablement. Il ne dit pas qu'un tiers peut recalculer le résultat."),
  ("Les versions d'archive ne sont pas comparées",
   "Une nouvelle version d'un dépôt peut modifier un fichier sans que l'écart soit publié ni vérifié."),
  ("Les journaux d'entraînement des modèles restent opaques",
   "Corpus, dates de coupure, filtres : rarement documentés de façon vérifiable."),
  ("Les jeux de données sont publiés sans empreinte",
   "Un jeu de données peut être silencieusement corrigé ; les résultats qui en dépendent deviennent incomparables."),
  ("Les citations se perdent dans les chaînes de traitement",
   "Un pipeline qui agrège plusieurs sources ne conserve pas toujours quel chiffre vient de quelle source."),
  ("Peu d'artefacts sont datés de façon indépendante",
   "L'horodatage est celui de la plateforme d'hébergement ; personne ne contre-vérifie."),
 ]),
 ("Audit & conformité", [
  ("L'article 50 impose de marquer, pas de vérifier le vrai",
   "Marquer un contenu comme synthétique est une obligation de forme : cela ne dit rien sur l'exactitude du contenu."),
  ("Le sursis du 2 décembre 2026 arrive sans outil prêt",
   "Les systèmes déjà sur le marché doivent être conformes au marquage lisible par machine et à la détectabilité — en quelques semaines."),
  ("« Conforme » n'est pas « vrai »",
   "Un système peut satisfaire toutes les obligations de forme et produire des chiffres faux."),
  ("Les petites structures n'ont pas de budget d'audit",
   "Un audit classique coûte des dizaines de milliers d'euros : hors de portée d'une PME ou d'un chercheur indépendant."),
  ("L'auditeur n'accède pas aux artefacts",
   "L'audit s'arrête souvent à la documentation fournie, sans accès aux données ni aux sorties brutes."),
  ("Les rapports d'audit ne sont pas exécutables",
   "Un rapport décrit des constats, mais ne fournit pas la commande qui les reproduit."),
  ("Les régulateurs enquêtent sans standard commun",
   "L'ouverture d'enquêtes sur les risques produits ne s'appuie pas sur un protocole de preuve partagé."),
  ("Le coût réel d'une erreur IA n'est pas mesuré",
   "Personne ne comptabilise sérieusement le temps perdu à corriger une sortie inexacte."),
  ("Les assureurs ne savent pas quoi couvrir",
   "Sans mesure d'exposition vérifiable, la couverture reste floue ou inaccessible."),
  ("Les marchés publics exigent des preuves qui n'existent pas",
   "Les appels d'offres demandent des garanties de fiabilité sans définir le format de preuve attendu."),
 ]),
 ("Quantique vérifiable", [
  ("Les résultats de QPU ne sont pas archivés avec leur contexte",
   "Sans identifiant de job, code source, date et empreinte, un résultat de machine quantique n'est pas vérifiable."),
  ("La calibration des machines change sans être notée",
   "Un même circuit peut donner des résultats différents selon l'état de la machine au moment du tir."),
  ("Les devis (quotes) de jobs ne sont pas publiés",
   "Le coût annoncé avant soumission n'est conservé nulle part — donc impossible à comparer dans le temps."),
  ("Les erreurs de compilation ne sont pas documentées",
   "Un circuit refusé par un compilateur n'apprend rien à la communauté : l'erreur est perdue."),
  ("Les feuilles de route ne sont pas rejouables",
   "Les annonces de performance ne s'accompagnent pas des données brutes permettant de les recalculer."),
  ("Le coût réel par job est invisible avant soumission",
   "L'utilisateur découvre le débitage après coup, ce qui empêche toute planification budgétaire sérieuse."),
  ("Les simulateurs cloud facturent sans être des QPU",
   "Un simulateur hébergé consomme des crédits : la frontière entre calcul simulé et calcul physique se brouille."),
  ("Les détecteurs à seuil limitent ce qu'on peut mesurer",
   "Sans résolution du nombre de photons, certaines signatures physiques deviennent inobservables."),
  ("Les résultats quantiques ne sont pas comparés à une référence locale",
   "Peu de publications joignent la simulation classique équivalente, gratuite, qui sert de contrôle."),
  ("Aucun standard de rejeu d'un job quantique",
   "Il n'existe pas de format commun pour rejouer un job des années plus tard sur une autre machine."),
 ]),
 ("Science ouverte & accès", [
  ("Faire de la recherche sérieuse depuis l'Afrique coûte plus cher",
   "Bande passante, électricité, matériel, frais de publication : le coût d'entrée est structurellement plus élevé."),
  ("Les crédits cloud quantiques sont inégalement répartis",
   "Les allocations de calcul sont concentrées dans quelques pays et institutions."),
  ("Les préprints se perdent sans identifiant durable",
   "Un travail hébergé sur un site personnel peut disparaître sans laisser d'identifiant citable."),
  ("Les figures scientifiques sont impossibles à reproduire sans les données",
   "Beaucoup de figures publiées ne sont pas régénérables à partir des données fournies."),
  ("L'attribution passe par les institutions, pas par les individus",
   "Un chercheur isolé sans affiliation reconnue voit son travail moins cité, même à qualité égale."),
  ("Les jeunes chercheurs hors institution n'ont pas accès aux revues",
   "Le mur payant reste un obstacle direct à la vérification par les pairs en dehors des universités riches."),
 ]),
]


def page_problemes() -> str:
    blocs, n = [], 0
    for cat, items in PROBLEMES:
        cartes = []
        for item in items:
            n += 1
            src = item[2] if len(item) > 2 else None
            lien = item[3] if len(item) > 3 else None
            cartes.append(_pbl(n, cat, item[0], item[1], src, lien))
        blocs.append(f'<section class="sec"><h2>{e(cat)}</h2><div class="plist">{"".join(cartes)}</div></section>')

    corps = f"""
<div class="art">
<div class="wx">
<section class="hero2">
  <p class="kick"><i></i>50 problèmes ouverts</p>
  <h1>Les 50 problèmes qu'on essaie de résoudre</h1>
  <p class="lede2">Ce ne sont pas des exercices théoriques : ce sont les blocages que nous rencontrons en auditant
  des artefacts et des résultats de machines. <b>Votre avis compte vraiment</b> — il oriente l'ordre dans lequel
  nous attaquons ces problèmes et ce que nous mettons dans nos prochains audits.
  Marquez ce qui vous parle : <b>critique</b>, <b>important</b>, <b>plus tard</b>, ou <b>« je l'ai vécu »</b>.</p>
  <div class="live-w"><span class="dot"></span>
    {n} problèmes · 5 familles · réponses conservées sur votre appareil puis exportables
  </div>
</section>

<section class="sec">
  <h2>Comment vos réponses nous servent</h2>
  <div class="fond">
    <div class="fc"><h4>Elles hiérarchisent nos audits</h4>
      <p>Un problème marqué « critique » par plusieurs personnes passe devant dans notre feuille de route de vérification.</p></div>
    <div class="fc"><h4>Elles nourrissent la recherche fondamentale</h4>
      <p>« Je l'ai vécu » est un signal de terrain : ces cas alimentent nos protocoles de rejeu et nos futurs préprints.</p></div>
    <div class="fc"><h4>Rien ne part sans vous</h4>
      <p>Vos réponses restent dans votre navigateur. Aucun serveur, aucun traqueur. Vous décidez de nous les envoyer.</p></div>
  </div>
</section>

{''.join(blocs)}

<section class="sec">
  <h2>Envoyez-nous vos réponses</h2>
  <div class="barre">
    <span id="statut"><b>0</b> problème(s) marqué(s)</span>
    <button id="exp">📥 Exporter mes réponses (.json)</button>
    <button class="or" id="mail">✉️ Envoyer par courriel</button>
    <button id="raz">Effacer</button>
  </div>
  <p class="lede2" style="margin-top:10px">L'export produit un fichier <code>ratiss-reponses-problemes.json</code>
  horodaté. Le bouton courriel ouvre votre logiciel de messagerie avec le résumé déjà rédigé —
  vous restez maître de l'envoi. <b>Aucune donnée ne quitte votre appareil sans votre action.</b></p>
</section>
</div>
</div>
<script>
(()=>{{
  const CLE='ratiss-problemes-v1';
  const etat=JSON.parse(localStorage.getItem(CLE)||'{{}}');
  const tous=[...document.querySelectorAll('.vote[data-p]')];
  const statut=document.getElementById('statut');
  function maj(){{ statut.innerHTML='<b>'+Object.keys(etat).length+'</b> problème(s) marqué(s) sur {n}'; }}
  tous.forEach(v=>{{
    const p=v.dataset.p, note=v.querySelector('.pnote');
    if(etat[p]){{ v.querySelectorAll('.vb').forEach(b=>b.classList.toggle('sel',b.dataset.v===etat[p])); note.textContent='✓ enregistré'; }}
    v.querySelectorAll('.vb').forEach(b=>b.addEventListener('click',()=>{{
      const val=b.dataset.v;
      if(etat[p]===val){{ delete etat[p]; }} else {{ etat[p]=val; }}
      v.querySelectorAll('.vb').forEach(x=>x.classList.toggle('sel',x.dataset.v===etat[p]));
      note.textContent=etat[p]?'✓ enregistré':''; localStorage.setItem(CLE,JSON.stringify(etat)); maj();
    }}));
  }});
  maj();
  function resume(){{
    const lignes=[];
    document.querySelectorAll('.pbl[data-p]').forEach(bl=>{{
      const p=bl.dataset.p; if(!etat[p])return;
      lignes.push('- #'+p+' ['+etat[p].toUpperCase()+'] '+bl.querySelector('h4').textContent);
    }});
    return lignes.length?lignes.join('\\n'):'(aucun problème marqué)';
  }}
  document.getElementById('exp').addEventListener('click',()=>{{
    const data={{date:new Date().toISOString(), source:'ratiss-labs.vercel.app/problemes', reponses:etat, resume:resume()}};
    const blob=new Blob([JSON.stringify(data,null,2)],{{type:'application/json'}});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob);
    a.download='ratiss-reponses-problemes.json'; a.click(); URL.revokeObjectURL(a.href);
  }});
  document.getElementById('mail').addEventListener('click',()=>{{
    const corps=encodeURIComponent('Mes réponses aux 50 problèmes RATISS\\n\\n'+resume()+'\\n\\n(json complet en pièce jointe après export)');
    location.href='mailto:jonathan.ratisslabs@zohomail.com?subject='+encodeURIComponent('Réponses — 50 problèmes RATISS')+'&body='+corps;
  }});
  document.getElementById('raz').addEventListener('click',()=>{{
    if(confirm('Effacer toutes vos réponses ?')){{ localStorage.removeItem(CLE); location.reload(); }}
  }});
}})();
</script>
"""

    return corps


# ================================================================ FONDAMENTALE
def page_fondamentale() -> str:
    corps = f"""
<div class="art">
<div class="wx">
<section class="hero2">
  <p class="kick"><i></i>Recherche fondamentale</p>
  <h1>On ne vend rien ici. On cherche.</h1>
  <p class="lede2">RATISS Labs est un laboratoire indépendant, mono-auteur, installé à Yaoundé.
  Une partie de notre travail ne se vend pas : elle consiste à mesurer, publier et laisser rejouer.
  Ces résultats sont déposés avec DOI, accompagnés de leur commande de rejeu, et leurs échecs sont écrits noir sur blanc.</p>
</section>

<section class="sec">
  <h2>Pourquoi c'est important que ce soit vérifiable</h2>
  <div class="fond">
    <div class="fc"><h4>Parce qu'un chiffre non rejouable n'est pas un résultat</h4>
      <p>Un pourcentage publié sans la graine, le corpus et le script reste une affirmation. Nous publions la commande.</p></div>
    <div class="fc"><h4>Parce que la physique ne négocie pas</h4>
      <p>Quand une machine donne 97,27 %, on peut refaire le calcul — ou vérifier le job par son identifiant.</p></div>
    <div class="fc"><h4>Parce que chercher depuis Yaoundé change le coût</h4>
      <p>Coupures, bande passante, crédits cloud comptés à l'unité : chaque run doit compter. Ça force la rigueur.</p></div>
  </div>
</section>

<section class="sec">
  <h2>Nos chantiers ouverts</h2>
  <div class="fond">
    <div class="fc"><h4>PHOTON — marche aléatoire quantique</h4>
      <p>8 396 800 chemins calculés (graine 20260927). Probabilités expérimentales : 95,92 / 95,96 / 96,77 % ;
      recoupement 96,06 ; corrélation 97,08–97,10 ; phase de l'écran 5,4°. Tout est rejouable à partir de la graine.</p></div>
    <div class="fc"><h4>NAVIER — équations de Navier-Stokes</h4>
      <p>Optimum Om_max = 5654,1668, écart mesuré 0,0000, scellé en révision 4 (commit 8557fc6).
      Une valeur nulle d'écart est un résultat, pas une absence de résultat : elle est documentée comme telle.</p></div>
    <div class="fc"><h4>ÉTALONS — grandeurs de référence</h4>
      <p>14 paramètres validés sur 16 visés. E04-P4 : 0,61403 contre 0,640 ± 0,020 ; ψ₆ : 0,827 / 0,935 ;
      p_c 0,0006 ; d_f 1,8934 ± 0,0192 ; ΔE/E à 1,21·10⁻¹⁵ ; longueur de Burrau λ 0,55402.</p></div>
    <div class="fc"><h4>GHZ-4 — intrication sur ions piégés</h4>
      <p>97,27 % de fidélité sur 1 024 tirs (job df23deac), récolté sur machine ionique réelle.
      Résultat archivé avec l'identifiant du job : n'importe qui peut le retrouver.</p></div>
    <div class="fc"><h4>AUDIT-JOBIDS — datation des identifiants</h4>
      <p>86 identifiants analysés, 66 horodatés, médiane de précision 278 ms. Relation établie :
      t = base32(id[:9]) / 8192. C'est ce qui permet de dater un résultat dont la plateforme ne dit rien.</p></div>
    <div class="fc"><h4>Le décodeur d'erreurs, vu d'ici</h4>
      <p>Quand un grand acteur annonce un décodeur temps réel (23/09/2026), ça ne rend pas nos petits runs inutiles :
      ça rend l'archivage des résultats <b>plus</b> nécessaire, pas moins.</p></div>
  </div>
</section>

<section class="sec">
  <h2>Les chiffres du labo, sans arrondi arrangeant</h2>
  <div class="stat">
    <div><b>5</b><span>préprints avec DOI</span></div>
    <div><b>68</b><span>dépôts publics</span></div>
    <div><b>24</b><span>sous licence MIT</span></div>
    <div><b>97,27 %</b><span>fidélité GHZ-4</span></div>
    <div><b>1</b><span>auteur, pas d'équipe</span></div>
    <div><b>0</b><span>financement externe</span></div>
  </div>
  <p class="lede2">Chaque résultat ci-dessus a sa commande de rejeu et son identifiant.
  Nos échecs sont publiés aussi : le PUT Zenodo refusé en 400, les portes <code>mz</code> et <code>measure</code>
  rejetées par le compilateur IonQ, la sortie du premier job photonique perdue par un bug de notre script.
  Un laboratoire qui ne publie que ses succès n'est pas un laboratoire.</p>
</section>

<section class="sec">
  <h2>Le quotidien, honnêtement</h2>
  <div class="phot row">
    <figure><img src="/img/labos/ordinateur-quantique.jpg" alt="Table optique d'un laboratoire de physique quantique" loading="lazy" />
      <figcaption>Une table optique : c'est le genre de montage que nos circuits finissent par piloter à distance.
      {credit('ordinateur-quantique')}</figcaption></figure>
    <figure><img src="/img/labos/puces-photoniques.jpg" alt="Tranche de semi-conducteurs photoniques InP" loading="lazy" />
      <figcaption>Wafer photonique InP — la famille de puces qui équipe les QPU que nous interrogeons.
      {credit('puces-photoniques')}</figcaption></figure>
    <figure><img src="/img/labos/yaounde.jpg" alt="Marché de Yaoundé, Cameroun" loading="lazy" />
      <figcaption>Yaoundé. Le laboratoire est ici : pas de salle blanche, un ordinateur, des crédits comptés
      et beaucoup de rigueur. {credit('yaounde')}</figcaption></figure>
  </div>
  <p class="lede2">Nous n'avons ni salle blanche, ni équipe, ni financement.
  Nous avons des machines accessibles à la location, des scripts déterministes et l'obligation de publier
  ce qui ne marche pas. C'est peu. C'est vérifiable — et c'est exactement ce que nous proposons ensuite
  aux organisations qui manipulent des artefacts qu'elles ne peuvent pas prouver.</p>
  <p style="margin-top:14px"><a class="btn" href="/research/">Voir les 5 préprints →</a>
  <a class="btn" href="/audits/" style="margin-left:8px">Voir les audits →</a></p>
</section>
</div>
</div>
"""

    return corps
