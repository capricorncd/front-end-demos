import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  server: {
    open: true,
  },
  build: {
    outDir: resolve(`../../../capricorncd.github.io/demos/vue/modal-group-controller`)
  }
})

function resolve(_path: string) {
  return fileURLToPath(new URL(_path, import.meta.url))
}
