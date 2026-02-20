import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/Mark-UpApp/" : "/",
  plugins: [tailwindcss()],
  server: {
    open: true,
  },
  css: {
    devSourcemap: true,
  },
  build: {
    sourcemap: true,
  },
}));
