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

# Build l'application - capturer toutes les sorties
RUN set -e; \
    echo "=== Starting build ==="; \
    npm run build || { \
      echo "=== BUILD FAILED ==="; \
      echo "=== npm version ==="; \
      npm --version; \
      echo "=== node version ==="; \
      node --version; \
      echo "=== package.json ==="; \
      cat package.json; \
      echo "=== vite.config.ts ==="; \
      cat vite.config.ts || true; \
      echo "=== Checking src files ==="; \
      find src -type f -name "*.ts" -o -name "*.tsx" | head -20; \
      exit 1; \
    }

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
