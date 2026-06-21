import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const port = process.env.PORT || '8080';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    // Allow any Host header (e.g. the workspace's *.ts.net hostname) so the
    // Go server can proxy cross-origin requests through to Vite in dev.
    allowedHosts: true,
    hmr: {
      clientPort: Number(port),
    },
  },
  build: {
    outDir: 'dist',
  },
});
