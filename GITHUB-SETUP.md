# Configuration GitHub

## Initialisation du dépôt

```bash
# Initialiser Git
git init

# Ajouter le remote
git remote add origin https://github.com/SaohTG/gameplateform.git

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit: Jeux Ami - Plateforme de collection de jeux"

# Pousser vers GitHub
git branch -M main
git push -u origin main
```

## Configuration des ports aléatoires

Les ports sont maintenant configurés pour être dynamiques. Par défaut, Docker assignera des ports aléatoires.

### Option 1 : Ports aléatoires automatiques (recommandé)

Laissez les ports à `0` dans le fichier `.env` ou utilisez les scripts de génération :

**Windows:**
```powershell
.\generate-random-ports.ps1
```

**Linux/Mac:**
```bash
chmod +x generate-random-ports.sh
./generate-random-ports.sh
```

### Option 2 : Ports spécifiques

Créez un fichier `.env` avec vos ports préférés :

```env
FRONTEND_PORT=8080
BACKEND_PORT=3002
```

### Option 3 : Ports complètement aléatoires (Docker)

Si vous ne créez pas de fichier `.env`, Docker assignera automatiquement des ports aléatoires disponibles.

## Vérifier les ports assignés

Après le démarrage, vérifiez les ports avec :

```bash
docker-compose ps
```

Ou :

```bash
docker port jeux-ami-frontend
docker port jeux-ami-backend
```

## Structure du dépôt

```
gameplateform/
├── src/                    # Code source React/TypeScript
├── backend/               # Backend API Node.js
├── docker-compose.yml     # Configuration Docker Compose
├── portainer-stack.yml    # Stack Portainer
├── Dockerfile             # Frontend Dockerfile
├── nginx.conf             # Configuration Nginx
└── README.md              # Documentation principale
```

## Commandes utiles

```bash
# Démarrer avec ports aléatoires
docker-compose up -d

# Voir les ports assignés
docker-compose ps

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down
```

