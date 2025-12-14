# Guide d'installation - Jeux Ami

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

1. **Node.js** (version 18 ou supérieure)
   - Téléchargez depuis : https://nodejs.org/
   - Vérifiez l'installation : `node --version`

2. **Rust** (pour compiler Tauri)
   - Téléchargez depuis : https://www.rust-lang.org/tools/install
   - Ou utilisez : `winget install Rustlang.Rustup`
   - Vérifiez l'installation : `rustc --version`

3. **Visual Studio Build Tools** (pour Windows)
   - Téléchargez depuis : https://visualstudio.microsoft.com/downloads/
   - Installez "Desktop development with C++" workload

## Installation

1. **Installez les dépendances Node.js**
   ```bash
   npm install
   ```

2. **Installez les dépendances Rust** (automatique lors du premier build)
   ```bash
   cd src-tauri
   cargo build
   cd ..
   ```

## Développement

Pour lancer l'application en mode développement :

```bash
npm run dev
```

Cela ouvrira une fenêtre Tauri avec l'application en mode développement avec hot-reload.

## Build pour production

Pour créer un fichier d'installation Windows (.msi) :

```bash
npm run tauri build
```

Le fichier d'installation sera généré dans :
`src-tauri/target/release/bundle/msi/jeux-ami_1.0.0_x64_en-US.msi`

## Création des icônes

Tauri nécessite des icônes dans différents formats. Vous pouvez :

1. Créer vos propres icônes et les placer dans `src-tauri/icons/`
2. Utiliser un outil comme [Tauri Icon Generator](https://github.com/tauri-apps/tauri-icon) :
   ```bash
   npx @tauri-apps/cli icon path/to/your/icon.png
   ```

Les formats requis sont :
- 32x32.png
- 128x128.png
- 128x128@2x.png
- icon.icns (macOS)
- icon.ico (Windows)

## Dépannage

### Erreur "rustc not found"
- Assurez-vous que Rust est installé et dans votre PATH
- Redémarrez votre terminal après l'installation de Rust

### Erreur de compilation Windows
- Installez Visual Studio Build Tools avec le workload "Desktop development with C++"
- Assurez-vous que Windows SDK est installé

### Erreur de permissions
- Exécutez PowerShell en tant qu'administrateur si nécessaire
- Vérifiez que vous avez les permissions d'écriture dans le dossier du projet

