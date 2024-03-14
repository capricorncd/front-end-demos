/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/14 19:56:28 (GMT+0900)
 */
import { resolve } from '@fd-libs/path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir:
      resolve(
        '../../../capricorncd.github.io/demos/css/clip-gradient-shadow'
      ),
  }
})
