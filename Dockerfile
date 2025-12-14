# Build stage
FROM node:20 AS builder

WORKDIR /app

# Copier les fichiers de configuration
COPY package.json ./
COPY tsconfig.json tsconfig.node.json ./
COPY vite.config.ts ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Installer toutes les dépendances
RUN npm install --no-audit --no-fund

# Copier le code source
COPY src ./src
COPY index.html ./
COPY public ./public

# Build l'application - afficher toutes les erreurs
RUN npm run build:web || ( \
      echo "=== BUILD FAILED ===" && \
      echo "=== npm version ===" && \
      npm --version && \
      echo "=== node version ===" && \
      node --version && \
      echo "=== package.json ===" && \
      cat package.json && \
      echo "=== vite.config.ts ===" && \
      cat vite.config.ts && \
      echo "=== Checking if dist exists ===" && \
      ls -la dist/ 2>&1 || echo "dist directory does not exist" && \
      exit 1 \
    )

# Vérifier que dist existe
RUN if [ ! -d "dist" ]; then \
      echo "ERROR: dist directory was not created!" && \
      ls -la && \
      exit 1; \
    fi && \
    echo "=== Build successful ===" && \
    ls -la dist/

# Production stage
FROM nginx:alpine

# Copier les fichiers buildés
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier la configuration nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
