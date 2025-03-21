import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), nodePolyfills()],
  build: {
    outDir: "./dist", // 將構建輸出到 DICTIONARY APP/dist/
    emptyOutDir: true, // 清空目標目錄
  },
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
