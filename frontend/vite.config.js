import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import resolve from "@rollup/plugin-node-resolve";

dotenv.config();
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  define: {
    DEBUG: isProduction ? false : true,
    SERVER_URL: isProduction
      ? `"${process.env.BACKEND_SERVER}"`
      : `"${process.env.BACKEND_DEV_SERVER}"`,
    SERVER_TEST_URL: isProduction
      ? `"${process.env.BACKEND_SERVER_TEST}"`
      : `"${process.env.BACKEND_DEV_SERVER_TEST}"`,
    CDN_IMAGES: `"${process.env.CDN_IMAGES}"`,
    CDN_INGREDIENTS: `"${process.env.CDN_INGREDIENTS}"`,
    CDN_BASE_INGREDIENTS: `"${process.env.CDN_BASE_INGREDIENTS}"`,
    MAX_INGREDIENTS: `"${process.env.MAX_INGREDIENTS}"`,
    MIN_INGREDIENTS: `"${process.env.MIN_INGREDIENTS}"`,
    UI_SPEED: `"${process.env.UI_SPEED}"`,
    NUM_MSGS: `"${process.env.NUM_MSGS}"`,
    SIMILARITY_THRESHOLD_DEFAULT: `"${process.env.SIMILARITY_THRESHOLD_DEFAULT}"`,
    SIMILARITY_THRESHOLD_MIN: `"${process.env.SIMILARITY_THRESHOLD_MIN}"`,
    SIMILARITY_THRESHOLD_MAX: `"${process.env.SIMILARITY_THRESHOLD_MAX}"`,
  },
  plugins: [react(), resolve()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: ["/graphql"],
    },
  },
});
