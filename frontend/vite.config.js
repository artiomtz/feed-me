import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  define: {
    SERVER_URL: isProduction
      ? `"${process.env.BACKEND_SERVER}"`
      : `"${process.env.BACKEND_DEV_SERVER}"`,
    SERVER_TEST_URL: isProduction
      ? `"${process.env.BACKEND_SERVER_TEST}"`
      : `"${process.env.BACKEND_DEV_SERVER_TEST}"`,
    CDN_INGREDIENTS: `"${process.env.CDN_INGREDIENTS}"`,
    MAX_INGREDIENTS: `"${process.env.MAX_INGREDIENTS}"`,
    MIN_INGREDIENTS: `"${process.env.MIN_INGREDIENTS}"`,
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
