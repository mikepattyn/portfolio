import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        rabbithole: resolve(import.meta.dirname, 'rabbithole.html'),
        underhood: resolve(import.meta.dirname, 'underhood.html'),
        workflows: resolve(import.meta.dirname, 'workflows.html'),
        thanks: resolve(import.meta.dirname, 'thanks.html'),
        cv: resolve(import.meta.dirname, 'cv.html'),
      },
    },
  },
});
