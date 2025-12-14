# Build stage
FROM node:20 AS builder

WORKDIR /app

# Copier les fichiers de configuration
COPY package.json ./
COPY tsconfig.json tsconfig.node.json ./
COPY vite.config.ts ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Installer toutes les dépendances SAUF @tauri-apps/api
RUN npm install --no-audit --no-fund --ignore-scripts && \
    npm uninstall @tauri-apps/api @tauri-apps/cli 2>/dev/null || true

# Copier le code source
COPY src ./src
COPY index.html ./
COPY public ./public

# Build l'application - ne pas continuer si le build échoue
RUN npm run build:web || { \
      echo "========================================="; \
      echo "BUILD FAILED - Error details:"; \
      echo "========================================="; \
      echo "Node version: $(node --version)"; \
      echo "NPM version: $(npm --version)"; \
      echo "========================================="; \
      echo "Checking if dist exists:"; \
      ls -la dist/ 2>&1 || echo "dist directory does not exist"; \
      echo "========================================="; \
      echo "Current directory contents:"; \
      ls -la; \
      echo "========================================="; \
      exit 1; \
    }

# Vérifier que dist existe (ne devrait jamais arriver ici si le build a échoué)
RUN if [ ! -d "dist" ]; then \
      echo "ERROR: dist directory was not created after build!" && \
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
