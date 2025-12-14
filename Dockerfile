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

# Build l'application avec sortie complète
RUN echo "=== Starting build ===" && \
    npm run build:web 2>&1 | tee /tmp/build.log; \
    EXIT_CODE=${PIPESTATUS[0]}; \
    echo "=== Build exit code: $EXIT_CODE ==="; \
    echo "=== Full build output ==="; \
    cat /tmp/build.log; \
    if [ $EXIT_CODE -ne 0 ]; then \
      echo "=== BUILD FAILED ==="; \
      echo "=== Checking files ==="; \
      ls -la; \
      echo "=== Checking src ==="; \
      ls -la src/ || true; \
      exit 1; \
    fi

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
