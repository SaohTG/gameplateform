#!/bin/bash

# Génère des ports aléatoires et crée un fichier .env

FRONTEND_PORT=$((RANDOM % 10000 + 8000))
BACKEND_PORT=$((RANDOM % 10000 + 8000))

# S'assurer que les ports sont différents
while [ $FRONTEND_PORT -eq $BACKEND_PORT ]; do
  BACKEND_PORT=$((RANDOM % 10000 + 8000))
done

cat > .env << EOF
# Ports générés aléatoirement
FRONTEND_PORT=${FRONTEND_PORT}
BACKEND_PORT=${BACKEND_PORT}

# Configuration API
VITE_API_URL=/api

# Backend
NODE_ENV=production
EOF

echo "✅ Fichier .env créé avec des ports aléatoires:"
echo "   Frontend: ${FRONTEND_PORT}"
echo "   Backend: ${BACKEND_PORT}"

