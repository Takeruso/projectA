import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
<<<<<<< HEAD

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()]
=======
import path from 'path'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [vue(), compression({ algorithm: 'gzip' })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    minify: 'terser'
  }
>>>>>>> b59ca2c298dc4c3c5d9f73087f7dc9c7b73db2aa
})
