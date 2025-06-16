import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',  // Serve from project root (where index.html is)
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