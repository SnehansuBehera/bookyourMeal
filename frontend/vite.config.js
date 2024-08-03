import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({

  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://bookmymeals.netlify.app",
      "/uploads/": "https://bookmymeals.netlify.app"
    }
  },
  build: {
    outDir: 'dist', // Specify the output directory for the build
  }
})
