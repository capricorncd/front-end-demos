/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/15 20:58:02 (GMT+0900)
 */
import { fileURLToPath, URL } from "node:url";
import { resolve } from '@fd-libs/path'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir:
      resolve(
        '../../../capricorncd.github.io/demos/vue/resize-observer'
      ),
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
