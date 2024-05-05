/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/05/05 09:48:06 (GMT+0900)
 */
import { resolve } from '@fd-libs/path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir:
      resolve(
        '../../../capricorncd.github.io/demos/svg/path-animation-cars'
      ),
  }
})
