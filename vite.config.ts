import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  },
  optimizeDeps: {
    exclude: ["@tauri-apps/api"],
  },
  resolve: {
    alias: {
      // Stub pour @tauri-apps/api en version web
      '@tauri-apps/api/tauri': resolve(__dirname, './src/utils/tauri-stub.ts'),
    },
  },
});
