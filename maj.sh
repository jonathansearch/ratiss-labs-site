#!/usr/bin/env bash
# RATISS — mise à jour complète en une commande.
#   bash maj.sh          → veille + build + déploiement production
#   bash maj.sh local    → veille + build seulement (pas de déploiement)
set -e
cd "$(dirname "$0")"
echo "🔭 1/3 Collecte de la veille (arXiv + Hacker News, sans clé)…"
python3 veille.py --jours 4
echo "🏗️  2/3 Construction du site…"
SITE_URL=https://ratiss-labs.vercel.app python3 build.py | tail -4
if [ "$1" != "local" ]; then
  echo "🚀 3/3 Déploiement en production…"
  timeout 700 python3 deploy_vercel.py | tail -3
else
  echo "🛑 Mode local : déploiement sauté."
fi
echo "✅ Terminé."
