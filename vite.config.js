import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  base: '/',
  // vite.config.js (dev)
    server: {
        proxy: {
          "/api":  { target: "http://localhost:4000", changeOrigin: true, secure: false },
          "/auth": { target: "http://localhost:4000", changeOrigin: true, secure: false },
        },
      },

})