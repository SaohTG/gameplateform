# Backend API - Jeux Ami

API REST pour la gestion des plateformes de jeux, des collections et des amis.

## Endpoints

### Plateformes

- `GET /api/platforms` - Liste toutes les plateformes disponibles
- `POST /api/platforms/:platformId/connect` - Connecte une plateforme
- `POST /api/platforms/:platformId/disconnect` - Déconnecte une plateforme
- `GET /api/platforms/:platformId/games` - Récupère les jeux d'une plateforme

### Jeux

- `GET /api/games` - Liste tous les jeux de l'utilisateur
- `GET /api/platforms/:platformId/games` - Liste les jeux d'une plateforme spécifique

### Amis

- `GET /api/friends` - Liste tous les amis
- `POST /api/friends` - Ajoute un ami
- `GET /api/friends/:friendId/common-games` - Récupère les jeux en commun avec un ami

### Health Check

- `GET /health` - Vérifie l'état de l'API

## Headers requis

Toutes les requêtes doivent inclure :
- `X-User-Id`: Identifiant unique de l'utilisateur (généré automatiquement par le frontend)

## Exemple de requête

```bash
curl -H "X-User-Id: user-123" http://localhost:3001/api/platforms
```

## Développement local

```bash
cd backend
npm install
npm run dev
```

## Variables d'environnement

- `PORT`: Port d'écoute du serveur (défaut: 3001)
- `NODE_ENV`: Environnement (development/production)

