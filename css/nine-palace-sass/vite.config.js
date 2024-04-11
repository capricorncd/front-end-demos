/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/04/11 20:39:01 (GMT+0900)
 */
import { resolve } from '@fd-libs/path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir:
      resolve(
        '../../../capricorncd.github.io/demos/css/nine-palace-sass'
      ),
  }
})
