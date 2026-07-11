import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  plugins: [vue(), tailwindcss()],
})