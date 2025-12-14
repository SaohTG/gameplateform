# 🚀 Démarrage Rapide - Docker & Portainer

## Option 1 : Docker Compose (Ligne de commande)

### Windows (PowerShell)
```powershell
.\start-docker.ps1
```

### Linux/Mac
```bash
chmod +x start-docker.sh
./start-docker.sh
```

### Manuellement
```bash
# Construire les images
docker-compose build

# Démarrer les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down
```

## Option 2 : Portainer (Interface Web)

### Étape 1 : Accéder à Portainer
1. Ouvrez votre navigateur
2. Allez sur `http://votre-serveur:9000` (ou l'URL de votre Portainer)

### Étape 2 : Créer une Stack
1. Dans le menu de gauche, cliquez sur **Stacks**
2. Cliquez sur **Add stack**
3. Donnez un nom : `jeux-ami`

### Étape 3 : Déployer
**Option A - Web Editor (Recommandé)**
1. Cliquez sur **Web editor**
2. Ouvrez le fichier `portainer-stack.yml` de ce projet
3. Copiez-collez son contenu dans l'éditeur
4. Cliquez sur **Deploy the stack**

**Option B - Upload**
1. Cliquez sur **Upload**
2. Sélectionnez le fichier `portainer-stack.yml`
3. Cliquez sur **Deploy the stack**

### Étape 4 : Vérifier
1. Allez dans **Containers**
2. Vous devriez voir :
   - `jeux-ami-backend`
   - `jeux-ami-frontend`

## Accès à l'application

Une fois déployé :

- **Frontend** : http://localhost (ou l'IP de votre serveur)
- **Backend API** : http://localhost:3001
- **Health Check** : http://localhost:3001/health

## Commandes utiles

### Voir les logs dans Portainer
1. **Containers** > Sélectionnez le conteneur > **Logs**

### Redémarrer un service
1. **Containers** > Sélectionnez le conteneur > **Restart**

### Mettre à jour la stack
1. **Stacks** > `jeux-ami` > **Editor**
2. Modifiez la configuration
3. Cliquez sur **Update the stack**

## Dépannage

### Les conteneurs ne démarrent pas
1. Vérifiez les **Logs** dans Portainer
2. Vérifiez que les ports 80 et 3001 sont libres
3. Vérifiez les ressources disponibles (RAM, CPU)

### Le frontend ne charge pas
1. Vérifiez que le backend répond : http://localhost:3001/health
2. Vérifiez les logs du frontend
3. Vérifiez la configuration nginx

### Erreur de connexion au backend
1. Vérifiez que les deux conteneurs sont sur le même réseau
2. Vérifiez les variables d'environnement
3. Vérifiez les health checks

## Structure des ports

Les ports sont maintenant **dynamiques** ! Docker assignera automatiquement des ports disponibles.

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

### Vérifier les ports assignés

Après le démarrage :
```bash
docker-compose ps
```

Les ports seront affichés dans la colonne "PORTS".

## Prochaines étapes

1. ✅ Application déployée
2. 🔐 Configurer l'authentification (optionnel)
3. 💾 Ajouter une base de données (optionnel)
4. 🔒 Configurer HTTPS avec un reverse proxy (production)
5. 📊 Ajouter du monitoring (optionnel)

## Support

Pour plus de détails, consultez `README-DOCKER.md`.

