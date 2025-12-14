# Génération des icônes pour Tauri

Pour générer les icônes nécessaires à Tauri, vous avez plusieurs options :

## Option 1 : Utiliser Tauri CLI (Recommandé)

1. Créez une image source (1024x1024 pixels recommandé) nommée `icon.png`
2. Placez-la à la racine du projet
3. Exécutez :
   ```bash
   npx @tauri-apps/cli icon icon.png
   ```

Cela générera automatiquement tous les formats nécessaires dans `src-tauri/icons/`

## Option 2 : Création manuelle

Créez les fichiers suivants dans `src-tauri/icons/` :

- `32x32.png` - 32x32 pixels
- `128x128.png` - 128x128 pixels  
- `128x128@2x.png` - 256x256 pixels
- `icon.icns` - Pour macOS (format ICNS)
- `icon.ico` - Pour Windows (format ICO avec plusieurs tailles)

## Option 3 : Utiliser un outil en ligne

- [CloudConvert](https://cloudconvert.com/) - Convertit PNG vers ICO/ICNS
- [IconGenerator](https://www.icoconverter.com/) - Générateur d'icônes en ligne

## Note

Si les icônes ne sont pas présentes, Tauri utilisera des icônes par défaut lors du développement, mais elles seront nécessaires pour le build de production.

