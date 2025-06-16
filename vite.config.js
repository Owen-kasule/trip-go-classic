import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/trip-go-classic/', // Replace with your actual repo name
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});