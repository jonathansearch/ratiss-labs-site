# RATISS Labs — the website

**Canonical site: <https://ratiss-labs.vercel.app>** 
All the old URLs (GitHub Pages, `#/…` links) redirect to it.

Independent, single-author laboratory — Jonathan Evina, Yaoundé (Cameroon).
*We don't believe. We replay.*

---

## What this repository contains

| Path | Role |
|---|---|
| `index.html` | **Redirection page** (0 s meta-refresh + translation of the old `#/…` links to the new URLs). This is what GitHub Pages serves. |
| `legacy/` | The old single-file site (SPA) kept as an editable source. It runs in production on `ratiss-labs.vercel.app/` (home page). |
| `build.py` | Static generator of the multi-page site (stdlib + PyYAML). Deterministic: same manifests → same pages. |
| `content/*.yaml` | The **research manifests**: one per research object. Single source of truth of the pages AND the reports. |
| `rapports/*.tex` | Scientific reports **in English**, compiled to PDF (Tectonic). |
| `rapports/figures.py` | Matplotlib figures — archived values only; diagrams without data carry the "SCHEMATIC" label. |
| `rapports/*.pdf` | The 5 compiled reports, served on `/research/<slug>/report.pdf`. |
| `verif/` | Verification files (Google Search Console). |

## Rebuild the site

```bash
pip install pyyaml
python3 build.py                                  # preview (relative URLs)
SITE_URL=https://ratiss-labs.vercel.app python3 build.py   # production
python3 -m http.server 8000 --directory _site     # look at it locally
```

Output: `_site/` (compatible with Vercel **and** GitHub Pages).
The aesthetics (CSS, Canvas scene, header, footer) are extracted from `legacy/index.html`:
no visual divergence between the home page and the Research pages.

## Compile the PDF reports

```bash
# Tectonic (single binary): https://github.com/tectonic-typesetting/tectonic
cd rapports && tectonic photon.tex   # same for the 5
```

## Publishing architecture

```
GitHub (code, data, protocols)
   → YAML manifests
   → canonical pages + English PDF   (Vercel)
   → Zenodo: record + DOI            (preservation)
   → Google: sitemap + Search Console (discovery)
```

- **One canonical URL per research**: `/research/<slug>/`
- `sitemap.xml`, `robots.txt`, canonical, Open Graph, JSON-LD `ScholarlyArticle`
- **No published figure without an original source**; negative results are
  published with the same weight as positive ones.

## Published DOIs (Zenodo, 03/10/2026)

| Object | DOI |
|---|---|
| Photon | `10.5281/zenodo.23117607` |
| GHZ ions QPU | `10.5281/zenodo.23117609` |
| Navier–Stokes | `10.5281/zenodo.23117605` |
| Étalons | `10.5281/zenodo.23117603` |
| IBM job IDs audit | `10.5281/zenodo.23117599` |

## Rules

- No key, token or secret in this repository: only `.env.example`-like is permitted elsewhere; here, nothing.
- Nothing is pushed without an order from the boss.
- License: MIT (Copyright (c) 2026 Jonathan Evina · RATISS Labs).
