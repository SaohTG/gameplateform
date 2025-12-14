# Guide Portainer - Jeux Ami

## Déploiement avec Portainer

### Option 1 : Stack Portainer (Recommandé)

1. **Connectez-vous à Portainer**
2. Allez dans **Stacks** > **Add stack**
3. Nommez la stack : `jeux-ami`
4. **Important** : Sélectionnez **Web editor** (pas Upload)
5. Collez le contenu de `portainer-stack.yml`
6. Cliquez sur **Deploy the stack**

### Option 2 : Build puis déploiement

Si vous préférez construire les images d'abord :

```bash
# Dans le répertoire du projet
docker-compose build

# Les images seront maintenant disponibles localement
# Vous pouvez ensuite utiliser portainer-stack.yml avec image: au lieu de build:
```

## Configuration des ports

Les ports sont configurés pour être **dynamiques**. Portainer utilisera les variables d'environnement :

- `FRONTEND_PORT` : Port pour le frontend (0 = port aléatoire)
- `BACKEND_PORT` : Port pour le backend (0 = port aléatoire)

### Définir des ports spécifiques dans Portainer

1. Dans l'éditeur de stack, ajoutez dans la section `environment` ou créez un fichier `.env`
2. Modifiez les valeurs :
   ```yaml
   environment:
     - FRONTEND_PORT=8080
     - BACKEND_PORT=3002
   ```

## Résolution des problèmes

### Erreur : "pull access denied"

**Cause** : Les fichiers utilisent `image:` au lieu de `build:`

**Solution** : Utilisez les fichiers mis à jour (`portainer-stack.yml` ou `docker-compose.portainer.yml`) qui utilisent `build:` pour construire les images localement.

### Erreur : "context not found"

**Cause** : Le contexte de build n'est pas correct

**Solution** : Assurez-vous que :
1. Vous avez cloné le dépôt complet
2. Le fichier `portainer-stack.yml` est à la racine du projet
3. Les dossiers `backend/` et les fichiers `Dockerfile` existent

### Les conteneurs ne démarrent pas

1. Vérifiez les **Logs** dans Portainer
2. Vérifiez que les ports ne sont pas déjà utilisés
3. Vérifiez les ressources disponibles (RAM, CPU)

## Structure attendue

```
jeux-ami/
├── portainer-stack.yml    ← Fichier à utiliser dans Portainer
├── Dockerfile             ← Frontend
├── backend/
│   ├── Dockerfile         ← Backend
│   └── src/
│       └── server.js
└── ...
```

## Vérification après déploiement

1. Allez dans **Containers**
2. Vérifiez que `jeux-ami-backend` et `jeux-ami-frontend` sont en cours d'exécution
3. Cliquez sur un conteneur > **Logs** pour voir les logs
4. Cliquez sur un conteneur > **Inspect** > **Network** pour voir les ports assignés

## Mise à jour de la stack

1. Allez dans **Stacks** > **jeux-ami**
2. Cliquez sur **Editor**
3. Modifiez la configuration si nécessaire
4. Cliquez sur **Update the stack**

Les images seront reconstruites automatiquement si vous utilisez `build:`.

