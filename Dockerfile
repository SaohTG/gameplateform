# Build stage
FROM node:20 AS builder

WORKDIR /app

# Copier les fichiers de configuration
COPY package.json ./
COPY tsconfig.json tsconfig.node.json ./
COPY vite.config.ts ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Installer toutes les dépendances SAUF @tauri-apps/api pour éviter les problèmes de build
RUN npm install --no-audit --no-fund --ignore-scripts && \
    npm uninstall @tauri-apps/api @tauri-apps/cli 2>/dev/null || true

# Afficher les packages installés
RUN echo "=== Installed packages ===" && npm list --depth=0

# Copier le code source
COPY src ./src
COPY index.html ./
COPY public ./public

# Vérifier que les fichiers sont présents
RUN echo "=== Checking source files ===" && \
    ls -la src/ && \
    ls -la src/components/ && \
    cat package.json | grep -A 5 "scripts"

# Build l'application avec sortie complète
RUN set -x && npm run build:web

# Vérifier que dist existe
RUN if [ ! -d "dist" ]; then \
      echo "ERROR: dist directory not found!" && \
      echo "=== Current directory ===" && \
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
