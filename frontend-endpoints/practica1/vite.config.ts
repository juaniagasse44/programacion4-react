import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Tiene que coincidir con allow_origins en el main.py del backend
    port: 5174,
    strictPort: true,
  },
});
