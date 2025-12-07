<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Vuetify Demo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        color="secondary"
        class="mr-2"
        @click="goToDemo"
      >
        <v-icon left>mdi-view-dashboard</v-icon>
        Демо компоненты
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card class="mt-4">
              <v-card-title class="text-h4 font-weight-bold">
                {{ message }}
              </v-card-title>
              <v-card-subtitle class="mt-2">
                Пример интеграции Vuetify
              </v-card-subtitle>
              <v-card-text>
                <p class="text-h6 mb-4">Счетчик: {{ count }}</p>

                <v-row class="mb-4">
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="message"
                      label="Изменить сообщение"
                      outlined
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="4">
                    <v-btn
                      color="primary"
                      @click="increment"
                      block
                      class="mb-2"
                    >
                      <v-icon left>mdi-plus</v-icon>
                      Увеличить
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-btn
                      color="secondary"
                      @click="reset"
                      block
                      class="mb-2"
                    >
                      <v-icon left>mdi-restart</v-icon>
                      Сбросить
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-btn
                      color="success"
                      @click="toggleMessage"
                      block
                      class="mb-2"
                    >
                      <v-icon left>mdi-message</v-icon>
                      Изменить
                    </v-btn>
                  </v-col>
                </v-row>

                <v-divider class="my-4"></v-divider>

                <v-alert
                  type="info"
                  variant="outlined"
                  class="mt-4"
                >
                  <template v-slot:title>
                    Информация
                  </template>
                  Это пример интеграции Vuetify с существующим Vue 3 проектом.
                </v-alert>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }} Vuetify Integration</div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCounter } from './composables/useCounter'

const router = useRouter()
const { count, increment, reset } = useCounter()
const message = ref('Привет, Vue 3 с Vuetify!');

const toggleMessage = () => {
  message.value = message.value === 'Привет, Vue 3 с Vuetify!' ? 'Сообщение изменено!' : 'Привет, Vue 3 с Vuetify!';
};

const goToDemo = () => {
  router.push('/vuetify-demo')
};
</script>

<style lang="scss">
/* Vuetify provides its own styling, so we can keep minimal custom styles */
#app {
  font-family: 'Roboto', sans-serif;
}
</style>