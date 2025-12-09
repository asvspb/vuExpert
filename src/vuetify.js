import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Импорты компонентов для tree-shaking
import { VApp, VMain, VContainer, VRow, VCol, VCard, VCardTitle, VCardText, VCardActions, VBtn, VTextField, VSelect, VIcon } from 'vuetify/components'

// Импорты директив
import { ClickOutside } from 'vuetify/directives'

export default createVuetify({
  components: {
    VApp,
    VMain,
    VContainer,
    VRow,
    VCol,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VBtn,
    VTextField,
    VSelect,
    VIcon,
  },
  directives: {
    ClickOutside,
  },
 icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#4242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        }
      }
    }
  }
})