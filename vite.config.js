import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { "/api": "http://localhost:5000" },
  },
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: { react: ["react", "react-dom"] },
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
    include: ["src/**/*.test.{js,jsx}", "server/**/*.test.js", "shared/**/*.test.js"],
  },
});
