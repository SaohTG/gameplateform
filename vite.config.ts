import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    exclude: ["@tauri-apps/api"],
  },
  resolve: {
    alias: {
      // Stub pour @tauri-apps/api en version web
      // Utiliser un chemin relatif simple qui fonctionne avec Vite
      '@tauri-apps/api/tauri': '/src/utils/tauri-stub.ts',
    },
  },
});
