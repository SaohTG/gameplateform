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

# Build l'application avec capture d'erreur complète
RUN npm run build:web > build.log 2>&1; \
    BUILD_EXIT=$?; \
    echo "=== BUILD EXIT CODE: $BUILD_EXIT ==="; \
    echo "=== BUILD LOG START ==="; \
    cat build.log; \
    echo "=== BUILD LOG END ==="; \
    if [ $BUILD_EXIT -ne 0 ]; then \
      echo "=== BUILD FAILED ==="; \
      echo "=== Checking files ==="; \
      ls -la; \
      echo "=== Checking src ==="; \
      ls -la src/ || true; \
      exit 1; \
    fi; \
    echo "=== Checking dist directory ==="; \
    if [ ! -d "dist" ]; then \
      echo "=== DIST DIRECTORY NOT FOUND ==="; \
      echo "=== Current directory contents ==="; \
      ls -la; \
      exit 1; \
    fi; \
    ls -la dist/; \
    echo "=== Build successful ==="

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
