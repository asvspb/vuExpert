import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

import { configDefaults } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: 'src/styles/variables.scss'
    })
  ],
  resolve: {
    alias: {
      'src': fileURLToPath(new URL('./src', import.meta.url))
    }
 },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/styles/variables.scss" as *;`,
        silenceDeprecations: ['legacy-js-api']
      }
    }
  },
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/*'],
    root: fileURLToPath(new URL('./', import.meta.url)),
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules', 'src/main.js', 'src/components/README.md', 'src/styles/*', 'docs/*']
    }
 }
})