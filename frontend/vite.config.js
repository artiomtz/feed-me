import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  define: {
    BACKEND_SERVER: `"${process.env.BACKEND_SERVER}"`,
  },
  plugins: [react()],
});
