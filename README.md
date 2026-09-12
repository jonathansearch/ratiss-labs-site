# RATISS Labs

Site vitrine de RATISS Labs, laboratoire indépendant basé à Yaoundé, consacré à l’audit scientifique exécutable. Le site publie la méthode, le protocole, le registre public et le plan ouvert du laboratoire sans ajouter d’affirmation non documentée.

## Développement local

Pré-requis : Node.js 20+ et npm.

```bash
npm install
npm run dev
```

Le serveur Vite démarre sur `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
```

La commande de build compile le client, génère un bundle serveur temporaire et injecte le rendu HTML de React dans `dist/index.html`. Le navigateur hydrate ensuite ce HTML au chargement. Le contenu du hero est donc disponible avant l’exécution de JavaScript.

Le scan éditorial d’acceptation vérifie l’absence des anciennes formulations et identifiants non soutenus :

```bash
grep -riE "ancienne-formulation|ancien-identifiant" src/ index.html
```

Ce scan doit retourner zéro résultat. Le build doit également laisser le texte du hero dans `dist/index.html`.

## Déploiement

Le projet est un site statique Vite déployé par GitHub Pages via `.github/workflows/pages.yml`. Le build produit le répertoire `dist`. La branche de travail de la purge est `purge-2026-09-12`; elle doit être relue avant toute fusion dans `master`.

## Animations

Le fond conserve une présence visuelle très légère avec un canvas de faible densité. Il n’utilise plus de morphing automatique, de HUD, de contrôle flottant ou de suivi du pointeur. Le canvas s’arrête lorsque l’onglet est démonté et est désactivé avec `prefers-reduced-motion: reduce`.

## Coordonnées publiques

GitHub : <https://github.com/jonathansearch>. Le registre public est disponible sur <https://github.com/jonathansearch/ratiss-audit-public>. Le profil LinkedIn est <https://www.linkedin.com/in/jonathan-evina-quantum> et le registre ORCID est <https://orcid.org/0009-0000-4092-5313>.
