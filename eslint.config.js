// ESLint flat config for Vue 3 + Accessibility
// See: https://eslint.org/docs/latest/use/configure/configuration-files-new
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import a11y from 'eslint-plugin-vuejs-accessibility'
import vueParser from 'vue-eslint-parser'

export default [
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'node_modules/**',
      'playwright-report/**',
      'docs/**',
      'e2e/**'
    ]
  },
  {
    files: ['**/*.{js,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: null,
        ecmaVersion: 2023,
        sourceType: 'module'
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        process: 'readonly',
        URL: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        navigator: 'readonly',
        AbortController: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        __APP_VERSION__: 'readonly',
        __BUILD_TIME__: 'readonly'
      }
    },
    plugins: {
      vue,
      'vuejs-accessibility': a11y
    },
    rules: {
      ...js.configs.recommended.rules,
      ...vue.configs['vue3-recommended'].rules,
      ...a11y.configs.recommended.rules,
      // Project-specific tweaks
      'vue/multi-word-component-names': 'off',
      'vue/no-mutating-props': 'warn',
      'vue/no-v-html': 'warn',

      // Accessibility examples (can be tightened later)
      'vuejs-accessibility/alt-text': 'error',
      'vuejs-accessibility/aria-role': 'error',
      'vuejs-accessibility/label-has-for': 'warn',
      'vuejs-accessibility/form-control-has-label': 'warn'
    }
  }
]
