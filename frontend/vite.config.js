import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({

  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://bookyourmeal-backend.onrender.com",
      "/uploads/": "https://bookyourmeal-backend.onrender.com"
    }
  },
  build: {
    outDir: 'dist', // Specify the output directory for the build
  }
})
