#!/bin/bash

echo "🚀 Démarrage de Jeux Ami avec Docker..."

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Générer des ports aléatoires si .env n'existe pas
if [ ! -f .env ]; then
    echo "📝 Génération de ports aléatoires..."
    ./generate-random-ports.sh
fi

# Charger les variables d'environnement
source .env 2>/dev/null || true

# Construire les images
echo "📦 Construction des images Docker..."
docker-compose build

# Démarrer les services
echo "▶️  Démarrage des services..."
docker-compose up -d

# Attendre que les services soient prêts
echo "⏳ Attente du démarrage des services..."
sleep 5

# Récupérer les ports assignés
FRONTEND_PORT=$(docker port jeux-ami-frontend 80/tcp 2>/dev/null | cut -d: -f2 || echo "80")
BACKEND_PORT=$(docker port jeux-ami-backend 3001/tcp 2>/dev/null | cut -d: -f2 || echo "3001")

# Vérifier l'état des services
echo "📊 État des services:"
docker-compose ps

echo ""
echo "✅ Application démarrée!"
echo "🌐 Frontend: http://localhost:${FRONTEND_PORT}"
echo "🔌 Backend API: http://localhost:${BACKEND_PORT}"
echo "❤️  Health check: http://localhost:${BACKEND_PORT}/health"
echo ""
echo "Pour voir les logs: docker-compose logs -f"
echo "Pour arrêter: docker-compose down"

