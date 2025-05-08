// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      // you can add sass/less options here if needed
    },
    postcss: {
      plugins: [] // disable lightningcss
    }
  }
})