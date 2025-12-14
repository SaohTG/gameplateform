# Jeux Ami - Plateforme de Collection de Jeux

Une application moderne et élégante pour gérer votre collection de jeux vidéo sur toutes vos plateformes.

## 🚀 Fonctionnalités

- 🎮 **Collection centralisée** : Rassemblez tous vos jeux de différentes plateformes en un seul endroit
- 🚀 **Lancement de jeux** : Lancez vos jeux directement depuis l'application (version desktop)
- 👥 **Système d'amis** : Découvrez quels jeux vous partagez avec vos amis
- 🎨 **Interface moderne** : Design épuré et esthétique avec des technologies modernes
- 💻 **Multi-plateforme** : Application desktop (Tauri) et web (Docker)

## 🛠️ Technologies

- **Frontend** : React 18 + TypeScript + Tailwind CSS
- **Backend** : Node.js + Express
- **Desktop** : Tauri (Rust)
- **Docker** : Multi-stage builds avec Nginx
- **State Management** : Zustand
- **Icônes** : Lucide React

## 📦 Installation

### Prérequis

- Node.js (v18 ou supérieur)
- Docker et Docker Compose (pour la version web)
- Rust (pour la version desktop Tauri)

### Version Web (Docker)

```bash
# Cloner le dépôt
git clone https://github.com/SaohTG/gameplateform.git
cd gameplateform

# Démarrer avec Docker Compose
docker-compose up -d

# Ou utiliser le script de démarrage
.\start-docker.ps1  # Windows
./start-docker.sh   # Linux/Mac
```

Les ports seront assignés automatiquement. Vérifiez-les avec :
```bash
docker-compose ps
```

### Version Desktop (Tauri)

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run tauri build
```

## 🌐 Plateformes supportées

- Steam
- Epic Games
- GOG
- Xbox
- Ubisoft Connect
- EA App

## 📖 Documentation

- [README-DOCKER.md](README-DOCKER.md) - Guide complet Docker
- [QUICK-START-DOCKER.md](QUICK-START-DOCKER.md) - Démarrage rapide
- [ARCHITECTURE.md](ARCHITECTURE.md) - Architecture détaillée
- [GITHUB-SETUP.md](GITHUB-SETUP.md) - Configuration GitHub
- [INSTALLATION.md](INSTALLATION.md) - Installation détaillée

## 🔧 Configuration

### Ports dynamiques

Les ports sont configurés pour être dynamiques. Vous pouvez :

1. **Laisser Docker assigner des ports aléatoires** (défaut)
2. **Générer des ports aléatoires** avec les scripts fournis
3. **Définir des ports spécifiques** dans un fichier `.env`

Voir [GITHUB-SETUP.md](GITHUB-SETUP.md) pour plus de détails.

## 🐳 Déploiement avec Portainer

1. Ouvrez Portainer
2. Allez dans **Stacks** > **Add stack**
3. Nommez : `jeux-ami`
4. Collez le contenu de `portainer-stack.yml`
5. Cliquez sur **Deploy**

## 📝 Notes

Cette version utilise des données de démonstration. Pour une intégration complète avec les API des plateformes, vous devrez :

1. Obtenir les clés API de chaque plateforme
2. Implémenter l'authentification OAuth
3. Configurer les endpoints API pour récupérer les vrais jeux

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

MIT

## 🔗 Liens

- **GitHub** : https://github.com/SaohTG/gameplateform
- **Documentation Docker** : [README-DOCKER.md](README-DOCKER.md)
