# Bienvenue

Ce projet _sandbox_, à but non lucratif, recrée l'ambiance des salons de discussion de l'époque AOL/AIM ; il est accessible à l'adresse : https://pdraim.org.

## Technologies utilisées

- SvelteKit (version 5)
- Node.js
- TypeScript
- Convex (base de données temps réel)
- XP.css
- Tailwind CSS

## Prérequis

- Node.js (>=22.13.0)
- npm ou pnpm pour la gestion des packages

## Installation

Clonez le dépôt et installez les dépendances :

```bash
npm install
# ou
pnpm install
```

## Lancement du projet

Lancez le projet en mode développement :

```bash
npm run dev
# ou
pnpm dev
```

Le site sera accessible via http://localhost:5173 par défaut.

## Contribution

Toute contribution visant à améliorer le réalisme et la qualité du projet est la bienvenue !
Pour contribuer :

- Forkez ce dépôt
- Créez une branche pour vos modifications
- Envoyez une pull request en décrivant clairement vos changements

## Base de données

Le projet utilise [Convex](https://convex.dev/) comme base de données temps réel. Convex gère automatiquement les mises à jour en temps réel des messages et de la liste des utilisateurs.

### Configuration locale

1. Créez un compte sur [Convex](https://convex.dev/) et un nouveau projet
2. Copiez `.env.example` vers `.env.local` et remplissez les variables :
   - `PUBLIC_CONVEX_URL` : URL de votre déploiement Convex
   - `CONVEX_API_SECRET` : Clé secrète pour les appels serveur

### Lancer Convex en développement

Dans un terminal séparé, lancez le serveur Convex :

```bash
npx convex dev
```

Cela synchronise automatiquement vos fonctions backend avec Convex et affiche les logs en temps réel.

### Dashboard Convex

Vous pouvez visualiser et gérer vos données via le dashboard Convex :

```bash
npx convex dashboard
```

## Déploiement

Le site tourne dans une image conteneur Node ([`adapter-node`](https://svelte.dev/docs/kit/adapter-node)), écoutant sur le port `3000`.

```bash
docker build -t pdraim .
docker run --rm -p 3000:3000 --env-file .env.local -e ORIGIN=http://localhost:3000 pdraim
```

Toutes les variables sont lues au runtime (`$env/dynamic/*`) : la même image sert en local et en production.

| Variable                                            | Rôle                                    |
| --------------------------------------------------- | --------------------------------------- |
| `PUBLIC_CONVEX_URL`, `CONVEX_API_SECRET`            | Accès à Convex                          |
| `PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile                    |
| `ORIGIN`                                            | URL publique (ex. `https://pdraim.org`) |
| `ADDRESS_HEADER`, `XFF_DEPTH`                       | IP client derrière les reverse proxies  |
| `COOKIE_DOMAIN` (optionnel)                         | Cookie partagé entre sous-domaines      |

## Documentation et Ressources

Si vous n'avez jamais utilisé Svelte/Kit ou Convex, référez-vous aux documentations officielles :

- [Documentation de Svelte](https://svelte.dev/docs/)
- [Documentation de SvelteKit](https://svelte.dev/docs/kit/@sveltejs-kit)
- [Documentation de Convex](https://docs.convex.dev/)
- [Convex + Svelte](https://docs.convex.dev/client/svelte)
