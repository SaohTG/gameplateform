import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

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
      '@tauri-apps/api/tauri': path.resolve(__dirname, 'src/utils/tauri-stub.ts'),
    },
  },
});
