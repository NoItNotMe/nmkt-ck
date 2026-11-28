import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: '/nmkt-ck/',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
      {
        name: 'fix-gh-pages-asset-paths',
        apply: 'build',
        transform(code, id) {
          if (/\.(tsx|ts|jsx|js|css|html)$/.test(id) && !id.includes('node_modules')) {
            return code
              .replace(/(["'`(])\/(?!nmkt-ck\/)assets\//g, '$1/nmkt-ck/assets/')
              .replace(/(["'`(])\/(?!nmkt-ck\/)src\/assets\//g, '$1/nmkt-ck/src/assets/');
          }
        },
        generateBundle(_, bundle) {
          for (const file of Object.values(bundle)) {
            if (file.type === 'chunk' && typeof file.code === 'string') {
              file.code = file.code.replace(/\/(?!nmkt-ck\/)assets\//g, '/nmkt-ck/assets/');
            } else if (file.type === 'asset' && typeof file.source === 'string') {
              file.source = file.source.replace(/\/(?!nmkt-ck\/)assets\//g, '/nmkt-ck/assets/');
            }
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
