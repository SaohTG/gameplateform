#!/bin/bash

echo "🚀 Configuration Git et push vers GitHub..."

# Vérifier si Git est installé
if ! command -v git &> /dev/null; then
    echo "❌ Git n'est pas installé."
    echo "Veuillez installer Git depuis https://git-scm.com/download/"
    echo ""
    echo "Ou exécutez manuellement ces commandes:"
    echo "  git init"
    echo "  git remote add origin https://github.com/SaohTG/gameplateform.git"
    echo "  git add ."
    echo "  git commit -m 'Initial commit: Jeux Ami'"
    echo "  git branch -M main"
    echo "  git push -u origin main"
    exit 1
fi

# Initialiser Git si nécessaire
if [ ! -d .git ]; then
    echo "📦 Initialisation du dépôt Git..."
    git init
fi

# Vérifier si le remote existe
if ! git remote get-url origin &> /dev/null; then
    echo "🔗 Ajout du remote GitHub..."
    git remote add origin https://github.com/SaohTG/gameplateform.git
else
    echo "✅ Remote déjà configuré"
    read -p "Voulez-vous le mettre à jour? (o/N) " update
    if [ "$update" = "o" ] || [ "$update" = "O" ]; then
        git remote set-url origin https://github.com/SaohTG/gameplateform.git
        echo "✅ Remote mis à jour"
    fi
fi

# Ajouter tous les fichiers
echo "📝 Ajout des fichiers..."
git add .

# Vérifier s'il y a des changements
if [ -z "$(git status --porcelain)" ]; then
    echo "ℹ️  Aucun changement à commiter"
else
    echo "💾 Création du commit..."
    git commit -m "Initial commit: Jeux Ami - Plateforme de collection de jeux avec Docker et ports dynamiques"
fi

# Définir la branche principale
echo "🌿 Configuration de la branche main..."
git branch -M main

# Pousser vers GitHub
echo "⬆️  Push vers GitHub..."
echo "⚠️  Vous devrez peut-être vous authentifier"
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Code poussé vers GitHub avec succès!"
    echo "🔗 Dépôt: https://github.com/SaohTG/gameplateform"
else
    echo ""
    echo "❌ Erreur lors du push"
    echo "Vérifiez vos credentials Git ou exécutez:"
    echo "  git push -u origin main"
fi

