import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  define: {
    ENV: `"${process.env.ENV}"`,
    DEV_SERVER: `"${process.env.DEV_SERVER}"`,
    BACKEND_SERVER: `"${process.env.BACKEND_SERVER}"`,
    CDN_INGREDIENTS: `"${process.env.CDN_INGREDIENTS}"`,
    MAX_INGREDIENTS: `"${process.env.MAX_INGREDIENTS}"`,
    MIN_INGREDIENTS: `"${process.env.MIN_INGREDIENTS}"`,
  },
  plugins: [react()],
});
