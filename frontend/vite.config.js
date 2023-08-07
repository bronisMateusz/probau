import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '../',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/scss/variables.scss" as *;`,
      },
    },
  },
  optimizeDeps: {
    exclude: ['emailjs-com'],
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@fonts': fileURLToPath(new URL('./public/fonts', import.meta.url)),
    },
  },
  server: {
    https: false,
    host: true,
    hmr: {
      protocol: 'wss',
      host: '172.18.0.4',
      clientPort: process.env.VITE_PORT || 5173,
    },
  },
});
