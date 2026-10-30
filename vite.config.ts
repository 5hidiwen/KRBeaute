import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

/**
 * Generates physical HTML route folders for GitHub Pages
 * so all clean URLs like /fiche-cliente, /soins, /contact, /faq load with HTTP 200 without '#'
 */
function spaRoutesPlugin(): Plugin {
  return {
    name: 'spa-routes-generator',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexPath)) return;

      const indexContent = fs.readFileSync(indexPath, 'utf-8');
      const routes = [
        'fiche-cliente',
        'fiche',
        'fiche-client',
        'faq',
        'soins',
        'tarifs',
        'marques',
        'technologies',
        'a-propos',
        'secteur',
        'contact'
      ];

      for (const route of routes) {
        const routeDir = path.join(distDir, route);
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true });
        }
        fs.writeFileSync(path.join(routeDir, 'index.html'), indexContent);
      }

      // Also create a 404.html identical to index.html as a universal SPA fallback
      fs.writeFileSync(path.join(distDir, '404.html'), indexContent);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), spaRoutesPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
