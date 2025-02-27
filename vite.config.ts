/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    exclude: ["node_modules"],
    setupFiles: "./vitest.setup.ts",
  },
  preview: {
    allowedHosts: ["bf2a-184-56-158-112.ngrok-free.app"],
  },
});
