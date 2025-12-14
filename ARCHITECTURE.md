# Architecture - Jeux Ami

## Vue d'ensemble

Jeux Ami est une application de collection de jeux vidéo avec deux modes de déploiement :

1. **Application Desktop** (Tauri) - Pour Windows
2. **Application Web** (Docker) - Pour déploiement serveur avec Portainer

## Architecture Docker

```
┌─────────────────────────────────────────────────┐
│                   Portainer                      │
│              (Orchestration)                    │
└─────────────────────────────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        │                           │
┌───────▼────────┐        ┌────────▼────────┐
│   Frontend     │        │    Backend      │
│                │        │                 │
│  React + Vite  │◄──────►│  Node.js/Express│
│  Nginx         │  HTTP  │  Port 3001      │
│  Port 80       │        │                 │
└────────────────┘        └─────────────────┘
```

## Composants

### Frontend (React + TypeScript)

- **Framework** : React 18 avec TypeScript
- **Styling** : Tailwind CSS avec design moderne
- **State Management** : Zustand
- **Build** : Vite
- **Serveur** : Nginx (production)

**Fonctionnalités** :
- Collection de jeux
- Gestion des plateformes
- Système d'amis
- Détection des jeux en commun

### Backend (Node.js + Express)

- **Runtime** : Node.js 20
- **Framework** : Express
- **Port** : 3001

**Endpoints** :
- `/api/platforms` - Gestion des plateformes
- `/api/games` - Gestion des jeux
- `/api/friends` - Gestion des amis
- `/health` - Health check

### Stockage des données

Actuellement en mémoire (pour la démo). Pour la production :
- **Recommandé** : PostgreSQL ou MongoDB
- **Alternative** : SQLite pour petits déploiements

## Flux de données

### Connexion à une plateforme

```
1. User → Frontend → POST /api/platforms/:id/connect
2. Backend → Simule l'API de la plateforme
3. Backend → Retourne les jeux
4. Frontend → Met à jour le store Zustand
5. Frontend → Affiche les jeux
```

### Ajout d'un ami

```
1. User → Frontend → POST /api/friends
2. Backend → Stocke l'ami
3. Frontend → Met à jour la liste
```

### Jeux en commun

```
1. User → Frontend → GET /api/friends/:id/common-games
2. Backend → Compare les jeux utilisateur et ami
3. Backend → Retourne les jeux en commun
4. Frontend → Affiche dans une modal
```

## Réseau Docker

Les services communiquent via le réseau Docker `jeux-ami-network` :

- Frontend → Backend : `http://backend:3001`
- Externe → Frontend : `http://localhost:80`
- Externe → Backend : `http://localhost:3001`

## Sécurité

### Actuellement implémenté

- Headers de sécurité (X-Frame-Options, etc.)
- CORS configuré
- Validation des entrées

### À implémenter pour la production

- Authentification (JWT, OAuth)
- HTTPS/TLS
- Rate limiting
- Validation stricte des données
- Base de données sécurisée

## Scalabilité

### Actuelle

- 1 instance frontend
- 1 instance backend
- Stockage en mémoire

### Pour la production

- Load balancer (Nginx, Traefik)
- Plusieurs instances backend
- Base de données avec réplication
- Cache (Redis)
- CDN pour les assets statiques

## Monitoring

### Health Checks

- Frontend : `GET /health`
- Backend : `GET /health`

### Logs

- Docker logs : `docker-compose logs -f`
- Portainer : Interface web

### Métriques (à implémenter)

- Prometheus pour les métriques
- Grafana pour la visualisation
- Alerting sur les erreurs

## Déploiement

### Développement

```bash
npm run dev  # Frontend
cd backend && npm run dev  # Backend
```

### Production (Docker)

```bash
docker-compose up -d
```

### Production (Portainer)

1. Importer `portainer-stack.yml`
2. Déployer la stack

## Intégrations futures

### Plateformes de jeux

- **Steam** : API Steam Web
- **Epic Games** : Epic Games Store API
- **GOG** : GOG API
- **Xbox** : Xbox Live API
- **Ubisoft** : Ubisoft Connect API
- **EA** : EA API

### Authentification

- OAuth 2.0 pour chaque plateforme
- Stockage sécurisé des tokens
- Refresh automatique des tokens

## Performance

### Optimisations actuelles

- Compression Gzip (Nginx)
- Cache des assets statiques
- Lazy loading des composants React

### Optimisations futures

- Service Worker pour le cache
- Code splitting avancé
- Images optimisées (WebP)
- CDN pour les assets

