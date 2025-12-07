<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h4 font-weight-bold mb-4">
            Vuetify Компоненты Демонстрация
          </v-card-title>

          <v-card-subtitle class="mb-6">
            Различные компоненты Vuetify для демонстрации возможностей
          </v-card-subtitle>

          <!-- Buttons Section -->
          <v-card class="mb-6">
            <v-card-title>Кнопки</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="3">
                  <v-btn color="primary" class="mb-2" block>
                    <v-icon left>mdi-thumb-up</v-icon>
                    Primary
                  </v-btn>
                </v-col>
                <v-col cols="12" md="3">
                  <v-btn color="secondary" class="mb-2" block>
                    <v-icon left>mdi-star</v-icon>
                    Secondary
                  </v-btn>
                </v-col>
                <v-col cols="12" md="3">
                  <v-btn color="success" class="mb-2" block>
                    <v-icon left>mdi-check</v-icon>
                    Success
                  </v-btn>
                </v-col>
                <v-col cols="12" md="3">
                  <v-btn color="error" class="mb-2" block>
                    <v-icon left>mdi-alert</v-icon>
                    Error
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Form Components Section -->
          <v-card class="mb-6">
            <v-card-title>Формы и Inputs</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Текстовое поле"
                    placeholder="Введите текст"
                    prepend-icon="mdi-text"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Email"
                    type="email"
                    placeholder="email@example.com"
                    prepend-icon="mdi-email"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    label="Выберите опцию"
                    :items="['Опция 1', 'Опция 2', 'Опция 3']"
                    prepend-icon="mdi-chevron-down"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-slider
                    v-model="sliderValue"
                    label="Слайдер"
                    thumb-label
                    min="0"
                    max="100"
                    step="10"
                  ></v-slider>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-checkbox
                    v-model="checkboxValue"
                    label="Чекбокс"
                    color="primary"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" md="6">
                  <v-switch
                    v-model="switchValue"
                    label="Переключатель"
                    color="success"
                  ></v-switch>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-radio-group v-model="radioValue" row>
                    <v-radio label="Опция A" value="a"></v-radio>
                    <v-radio label="Опция B" value="b"></v-radio>
                    <v-radio label="Опция C" value="c"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Alerts and Notifications -->
          <v-card class="mb-6">
            <v-card-title>Уведомления</v-card-title>
            <v-card-text>
              <v-alert type="info" class="mb-3" variant="outlined">
                <template v-slot:title>
                  Информация
                </template>
                Это информационное сообщение
              </v-alert>

              <v-alert type="success" class="mb-3" variant="outlined">
                <template v-slot:title>
                  Успех
                </template>
                Операция выполнена успешно
              </v-alert>

              <v-alert type="warning" class="mb-3" variant="outlined">
                <template v-slot:title>
                  Предупреждение
                </template>
                Внимание! Важная информация
              </v-alert>

              <v-alert type="error" class="mb-3" variant="outlined">
                <template v-slot:title>
                  Ошибка
                </template>
                Произошла ошибка
              </v-alert>
            </v-card-text>
          </v-card>

          <!-- Dialogs and Modals -->
          <v-card class="mb-6">
            <v-card-title>Диалоги и Модальные окна</v-card-title>
            <v-card-text>
              <v-btn color="primary" @click="dialog = true">
                Открыть диалог
              </v-btn>

              <v-dialog v-model="dialog" max-width="500">
                <v-card>
                  <v-card-title class="text-h5">
                    Пример диалога
                  </v-card-title>
                  <v-card-text>
                    Это пример модального диалогового окна Vuetify.
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                      Закрыть
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-text>
          </v-card>

          <!-- Data Tables -->
          <v-card class="mb-6">
            <v-card-title>Таблицы данных</v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="desserts"
                :items-per-page="5"
                class="elevation-1"
              ></v-data-table>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Dessert {
  name: string
  calories: number
  fat: number
  carbs: number
  protein: number
  iron: string
}

interface TableHeader {
  title: string
  key: string
}

const sliderValue = ref(50)
const checkboxValue = ref(true)
const switchValue = ref(false)
const radioValue = ref('a')
const dialog = ref(false)

const headers: TableHeader[] = [
  { title: 'Десерт (100г)', key: 'name' },
  { title: 'Калории', key: 'calories' },
  { title: 'Жиры (г)', key: 'fat' },
  { title: 'Углеводы (г)', key: 'carbs' },
  { title: 'Белки (г)', key: 'protein' },
  { title: 'Железо (%)', key: 'iron' },
]

const desserts: Dessert[] = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1%',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1%',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7%',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8%',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16%',
  },
]
</script>

<style scoped>
/* Custom styles can be added here if needed */
</style>