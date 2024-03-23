/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/23 15:02:30 (GMT+0900)
 */
import { defineConfig } from 'vite'
import { resolve } from '@fd-libs/path'
import { docInfo } from './package.json'

export default defineConfig({
  base: './',
  build: {
    outDir:
      resolve(
        `../../../capricorncd.github.io/demos/${docInfo.name}`
      ),
  },
})
