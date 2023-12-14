import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 8080
  },
  preview: {
    host: '0.0.0.0',
    port: 8080
  },
  define: {
    process: { env: {} }
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'build'
  },
  esbuild: {
    loader: 'jsx',
    include: ['src/**/*.jsx', 'src/**/*.js'],
    exclude: ['node_modules', 'build']
  },
  plugins: [react(), basicSsl()]
})
