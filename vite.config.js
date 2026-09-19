import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function localeDevFallback() {
  return {
    name: 'locale-dev-fallback',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (!req.url) return next();
        const [path, query] = req.url.split('?');
        const q = query ? `?${query}` : '';
        const vanilla = path.match(/^\/(en|nl)\/(thanks|workflows|rabbithole)\/?$/);
        if (vanilla) {
          req.url = `/${vanilla[2]}.html${q}`;
          return next();
        }
        const reactPage = path.match(/^\/(en|nl)\/(cv|underhood)\/?$/);
        if (reactPage) {
          req.url = `/${reactPage[2]}.html${q}`;
          return next();
        }
        if (/^\/(en|nl)\/?$/.test(path)) {
          req.url = `/index.html${q}`;
          return next();
        }
        next();
      });
    },
  };
}

export default defineConfig({
  root: '.',
  publicDir: 'public',
  plugins: [localeDevFallback(), react(), tailwindcss()],
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
        notFound: resolve(import.meta.dirname, '404.html'),
      },
    },
  },
});
