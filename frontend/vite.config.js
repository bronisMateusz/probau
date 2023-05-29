import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '../',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/scss/variables.scss" as *;`
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@fonts': fileURLToPath(new URL('./public/fonts', import.meta.url))
    }
  },
  server: {
    host: true,
    hmr: {
      protocol: 'ws',
      clientPort: process.env.VITE_PORT || 5173
    }
  }
})
