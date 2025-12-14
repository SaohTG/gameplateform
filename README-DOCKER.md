# Jeux Ami - Déploiement Docker avec Portainer

Guide complet pour déployer Jeux Ami avec Docker et Portainer.

## Architecture

L'application est composée de deux services :

- **Backend** : API Node.js/Express (port 3001)
- **Frontend** : Application React servie par Nginx (port 80)

## Prérequis

- Docker et Docker Compose installés
- Portainer installé (optionnel mais recommandé)

## Déploiement rapide avec Docker Compose

### 1. Cloner et préparer le projet

```bash
git clone <votre-repo>
cd jeux-ami
```

### 2. Construire les images

```bash
docker-compose build
```

### 3. Démarrer les services

```bash
docker-compose up -d
```

### 4. Accéder à l'application

- Frontend : http://localhost
- Backend API : http://localhost:3001
- Health check : http://localhost:3001/health

## Déploiement avec Portainer

### Option 1 : Stack Portainer (Recommandé)

1. **Connectez-vous à Portainer**
2. Allez dans **Stacks** > **Add stack**
3. Nommez la stack : `jeux-ami`
4. Collez le contenu de `portainer-stack.yml`
5. Cliquez sur **Deploy the stack**

### Option 2 : Docker Compose dans Portainer

1. **Connectez-vous à Portainer**
2. Allez dans **Stacks** > **Add stack**
3. Nommez la stack : `jeux-ami`
4. Sélectionnez **Upload** ou **Web editor**
5. Collez le contenu de `docker-compose.portainer.yml`
6. Cliquez sur **Deploy the stack**

### Option 3 : Build et déploiement manuel

```bash
# Build des images
docker build -t jeux-ami-frontend:latest .
docker build -t jeux-ami-backend:latest ./backend

# Démarrer avec docker-compose
docker-compose -f docker-compose.portainer.yml up -d
```

## Configuration des variables d'environnement

Créez un fichier `.env` à la racine :

```env
# Backend
PORT=3001
NODE_ENV=production

# Frontend (optionnel, utilise /api par défaut)
VITE_API_URL=http://localhost:3001/api
```

## Volumes et persistance

Les données sont stockées en mémoire par défaut. Pour la persistance :

1. Créez un volume Docker :
```bash
docker volume create jeux-ami-data
```

2. Modifiez `docker-compose.yml` pour monter le volume dans le backend.

## Mise à jour de l'application

### Avec Docker Compose

```bash
docker-compose pull
docker-compose up -d --build
```

### Avec Portainer

1. Allez dans **Stacks** > **jeux-ami**
2. Cliquez sur **Editor**
3. Modifiez la version des images si nécessaire
4. Cliquez sur **Update the stack**

## Logs

### Docker Compose

```bash
# Tous les services
docker-compose logs -f

# Backend uniquement
docker-compose logs -f backend

# Frontend uniquement
docker-compose logs -f frontend
```

### Portainer

1. Allez dans **Containers**
2. Sélectionnez le conteneur
3. Cliquez sur **Logs**

## Health Checks

Les deux services incluent des health checks :

- **Backend** : `http://localhost:3001/health`
- **Frontend** : `http://localhost/`

## Dépannage

### Les conteneurs ne démarrent pas

```bash
# Vérifier les logs
docker-compose logs

# Vérifier l'état des conteneurs
docker-compose ps
```

### Le frontend ne peut pas joindre le backend

1. Vérifiez que les deux services sont sur le même réseau Docker
2. Vérifiez les variables d'environnement
3. Vérifiez que le backend répond sur `/health`

### Port déjà utilisé

Les ports sont maintenant **dynamiques**. Vous pouvez :

1. **Générer des ports aléatoires** :
   ```bash
   ./generate-random-ports.sh  # Linux/Mac
   .\generate-random-ports.ps1  # Windows
   ```

2. **Définir des ports spécifiques** dans `.env` :
   ```env
   FRONTEND_PORT=8080
   BACKEND_PORT=3002
   ```

3. **Laisser Docker assigner automatiquement** (défaut avec `0`)

## Production

Pour la production, considérez :

1. **Reverse Proxy** : Utilisez Traefik ou Nginx comme reverse proxy
2. **HTTPS** : Configurez SSL/TLS avec Let's Encrypt
3. **Base de données** : Remplacez le stockage en mémoire par PostgreSQL ou MongoDB
4. **Authentification** : Ajoutez un système d'authentification utilisateur
5. **Monitoring** : Configurez Prometheus/Grafana pour le monitoring

## Structure des fichiers Docker

```
.
├── Dockerfile                 # Frontend (React + Nginx)
├── docker-compose.yml         # Compose standard
├── docker-compose.portainer.yml # Compose pour Portainer
├── portainer-stack.yml        # Stack Portainer
├── nginx.conf                 # Configuration Nginx
├── backend/
│   ├── Dockerfile            # Backend (Node.js)
│   └── src/
│       └── server.js         # Serveur Express
└── .dockerignore             # Fichiers ignorés par Docker
```

## Support

Pour toute question ou problème, consultez les logs ou créez une issue sur le dépôt GitHub.

