import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
      '@auth': resolve(__dirname, 'auth'),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
})
