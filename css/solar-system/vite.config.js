import { resolve } from '@fed-libs/path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [],
  build: {
    outDir: resolve(
      '../../../capricorncd.github.io/demos/css/solar-system'
    ),
  },
  server: {
    open: true
  }
})
