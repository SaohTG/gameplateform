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
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      // Exclure @tauri-apps/api du bundle
      external: (id) => {
        if (id.startsWith('@tauri-apps/')) {
          return true;
        }
        return false;
      },
    },
  },
  optimizeDeps: {
    exclude: ["@tauri-apps/api"],
  },
  resolve: {
    alias: {
      // Stub pour @tauri-apps/api en version web
      '@tauri-apps/api/tauri': new URL('./src/utils/tauri-stub.ts', import.meta.url).href,
    },
  },
});
