#!/usr/bin/env python3
"""Déploiement Vercel du site RATISS — API directe, sans CLI.

Version CI (GitHub Actions). Le token vient de la variable d'environnement
VERCEL_TOKEN (secret GitHub chiffré) — AUCUNE clé n'est écrite dans ce fichier.
Utilisation : VERCEL_TOKEN=… python3 deploy_ci.py
"""
from __future__ import annotations

import base64
import json
import sys
from pathlib import Path

import requests

ICI = Path(__file__).resolve().parent
SITE = ICI / "_site"
import os
TOKEN = os.environ.get("VERCEL_TOKEN", "").strip()
if not TOKEN:
    print("❌ VERCEL_TOKEN absent de l'environnement"); sys.exit(2)
API = "https://api.vercel.com"
NOM_PROJET = "ratiss-labs"


def main() -> int:
    fichiers = []
    total = 0
    for p in sorted(SITE.rglob("*")):
        if p.is_file():
            rel = p.relative_to(SITE).as_posix()
            data = base64.b64encode(p.read_bytes()).decode()
            fichiers.append({"file": rel, "data": data, "encoding": "base64"})
            total += p.stat().st_size
    print(f"📦 {len(fichiers)} fichiers · {total/1e6:.2f} Mo (brut)")

    entetes = {"Authorization": f"Bearer {TOKEN}"}
    rep = requests.post(
        f"{API}/v13/deployments",
        headers=entetes,
        json={
            "name": NOM_PROJET,
            "files": fichiers,
            "target": "production",
            "projectSettings": {"framework": None, "buildCommand": None, "outputDirectory": None},
        },
        timeout=600,
    )
    d = rep.json()
    if rep.status_code not in (200, 201, 202):
        print("❌ échec déploiement :", rep.status_code)
        print(json.dumps(d, ensure_ascii=False)[:900])
        return 1

    dep_id = d.get("id")
    url = d.get("url")
    aliases = d.get("alias") or []
    print(f"✅ déploiement créé : {dep_id}")
    print(f"   url immédiate : https://{url}")
    if aliases:
        print("   alias        :", ["https://" + a for a in aliases])

    # attendre l'état READY
    for _ in range(60):
        r = requests.get(f"{API}/v13/deployments/{dep_id}", headers=entetes, timeout=60).json()
        etat = r.get("readyState")
        if etat in ("READY", "ERROR"):
            print(f"   état final   : {etat}")
            for a in r.get("alias") or []:
                print("   ALIAS PUBLIC : https://" + a)
            break
        import time

        time.sleep(5)
    else:
        print("   ⚠️ état non confirmé en 5 min — vérifie le dashboard Vercel")
    return 0


if __name__ == "__main__":
    sys.exit(main())
