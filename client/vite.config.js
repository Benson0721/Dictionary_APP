import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  root: "client", // 告訴 Vite 根目錄是 client
  server: {
    port: 5173,
    open: true, // 自動打開瀏覽器
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Express 伺服器的地址
        changeOrigin: true, //讓請求看起來統一由前端端口發出，避免CORS限制
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
