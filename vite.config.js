import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    // Helps Cursor / browser clients that hit the forwarded hostname
    allowedHosts: true,
  },
});
