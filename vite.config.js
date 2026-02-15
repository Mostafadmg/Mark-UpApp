import { defineConfig } from "vite";

export default defineConfig({
  server: {
    open: true, // Browser opens automatically
  },
  css: {
    devSourcemap: true,
  },
  build: {
    sourcemap: true,
  },
});
