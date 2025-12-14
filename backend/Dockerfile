FROM node:20-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json ./

# Installer les dépendances de production
RUN npm install --only=production --no-audit --no-fund

# Copier le code source
COPY src/ ./src/

# Exposer le port
EXPOSE 3001

# Démarrer l'application
CMD ["npm", "start"]

