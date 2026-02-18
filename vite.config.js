import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
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
