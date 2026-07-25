import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Split heavy vendor libraries so the initial payload stays small and
        // long-lived dependencies stay cached independently of app code.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (/[\\/]node_modules[\\/](recharts|d3-|victory-|internmap|decimal\.js)/.test(id)) {
            return 'charts';
          }
          if (/[\\/]node_modules[\\/]@google[\\/]genai/.test(id)) return 'gemini';
          if (/[\\/]node_modules[\\/](lucide-react|canvas-confetti)/.test(id)) return 'ui';
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react';
          return 'vendor';
        }
      }
    }
  }
});
