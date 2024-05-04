import { resolve } from '@fd-libs/path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir:
      resolve(
        '../../../capricorncd.github.io/demos/js/highly-automatic-transition'
      ),
  }
})
