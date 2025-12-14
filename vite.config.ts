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
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignorer les avertissements sur les imports externes
        if (warning.code === 'EXTERNAL') return;
        warn(warning);
      },
    },
  },
  optimizeDeps: {
    exclude: ["@tauri-apps/api"],
  },
  ssr: {
    noExternal: ["@tauri-apps/api"],
  },
});
