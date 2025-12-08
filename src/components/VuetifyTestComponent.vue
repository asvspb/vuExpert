<template>
  <v-container class="vuetify-test-component">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Тестовый компонент Vuetify</v-card-title>
          <v-card-text>
            <p>Это тестовый компонент, демонстрирующий использование Vuetify в проекте.</p>
            <v-text-field
              v-model="textFieldValue"
              label="Текстовое поле Vuetify"
              outlined
            ></v-text-field>
            <v-select
              v-model="selectedOption"
              :items="options"
              label="Выбор Vuetify"
              outlined
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="showAlert">Показать оповещение</v-btn>
            <v-btn color="secondary" @click="resetForm">Сбросить форму</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const textFieldValue = ref('')
const selectedOption = ref('')

const options = [
  { text: 'Опция 1', value: 'option1' },
  { text: 'Опция 2', value: 'option2' },
  { text: 'Опция 3', value: 'option3' }
]

const showAlert = () => {
  alert(`Текстовое поле: ${textFieldValue.value}, Выбранная опция: ${selectedOption.value}`)
}

const resetForm = () => {
  textFieldValue.value = ''
  selectedOption.value = ''
}
</script>

<style lang="scss" scoped>
.vuetify-test-component {
  margin: 20px 0;
}
</style>