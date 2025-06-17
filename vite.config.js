import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: process.env.NODE_ENV === 'production' ? '/trip-go-classic/' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    // Generate manifest for better caching
    manifest: true,
    // Ensure all assets are properly hashed
    rollupOptions: {
      output: {
        // Add hash to filenames for cache busting
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // Ensure ES modules work properly
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }
});