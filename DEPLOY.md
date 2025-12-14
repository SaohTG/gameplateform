# 🚀 Déploiement - Jeux Ami

## Push vers GitHub

### Option 1 : Script automatique (Recommandé)

**Windows:**
```powershell
.\push-to-github.ps1
```

**Linux/Mac:**
```bash
chmod +x push-to-github.sh
./push-to-github.sh
```

### Option 2 : Commandes manuelles

```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter le remote GitHub
git remote add origin https://github.com/SaohTG/gameplateform.git

# Ajouter tous les fichiers
git add .

# Créer le commit
git commit -m "Initial commit: Jeux Ami - Plateforme de collection de jeux"

# Définir la branche principale
git branch -M main

# Pousser vers GitHub
git push -u origin main
```

## Configuration des ports dynamiques

Les ports sont maintenant configurés pour être **dynamiques** et éviter les conflits.

### Comment ça fonctionne

1. **Ports aléatoires automatiques** : Docker assigne des ports disponibles
2. **Génération de ports** : Utilisez les scripts pour générer des ports aléatoires
3. **Ports spécifiques** : Définissez vos ports dans `.env`

### Générer des ports aléatoires

**Windows:**
```powershell
.\generate-random-ports.ps1
```

**Linux/Mac:**
```bash
chmod +x generate-random-ports.sh
./generate-random-ports.sh
```

Cela créera un fichier `.env` avec des ports aléatoires entre 8000 et 18000.

### Utiliser des ports spécifiques

Créez un fichier `.env` :

```env
FRONTEND_PORT=8080
BACKEND_PORT=3002
```

### Laisser Docker assigner (défaut)

Si vous ne créez pas de `.env` ou laissez les ports à `0`, Docker assignera automatiquement des ports disponibles.

## Vérifier les ports assignés

Après le démarrage :

```bash
# Voir tous les conteneurs et leurs ports
docker-compose ps

# Voir le port du frontend
docker port jeux-ami-frontend

# Voir le port du backend
docker port jeux-ami-backend
```

## Déploiement avec Docker

```bash
# Construire et démarrer
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down
```

## Déploiement avec Portainer

1. Ouvrez Portainer
2. **Stacks** > **Add stack**
3. Nom : `jeux-ami`
4. Collez le contenu de `portainer-stack.yml`
5. **Deploy the stack**

Les ports seront assignés automatiquement par Docker.

## Accès à l'application

Après le démarrage, vérifiez les ports avec `docker-compose ps`, puis accédez à :

- **Frontend** : `http://localhost:<PORT_FRONTEND>`
- **Backend API** : `http://localhost:<PORT_BACKEND>`
- **Health Check** : `http://localhost:<PORT_BACKEND>/health`

## Dépannage

### Les ports ne sont pas visibles

```bash
# Vérifier que les conteneurs tournent
docker-compose ps

# Vérifier les ports assignés
docker port jeux-ami-frontend
docker port jeux-ami-backend
```

### Conflit de ports

Si vous avez un conflit, générez de nouveaux ports :

```bash
.\generate-random-ports.ps1  # Windows
./generate-random-ports.sh   # Linux/Mac
```

Puis redémarrez :

```bash
docker-compose down
docker-compose up -d
```

## Prochaines étapes

1. ✅ Code poussé vers GitHub
2. ✅ Ports configurés dynamiquement
3. 🐳 Application déployée avec Docker
4. 🔐 Configurer l'authentification (optionnel)
5. 💾 Ajouter une base de données (optionnel)

