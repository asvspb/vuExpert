<template>
  <div class="examples-view">
    <q-page class="q-pa-md">
      <q-card class="q-mb-lg">
        <q-card-section>
          <h1 class="text-h5 q-mb-md">Примеры использования Quasar</h1>
          <p>Страница с примерами использования различных компонентов Quasar.</p>
        </q-card-section>
      </q-card>

      <q-card class="q-mb-lg">
        <q-card-section>
          <div class="text-h6 q-mb-md">Кнопки</div>
          <q-btn color="primary" label="Primary" class="q-mr-sm" />
          <q-btn color="secondary" label="Secondary" class="q-mr-sm" />
          <q-btn color="accent" label="Accent" class="q-mr-sm" />
          <q-btn color="negative" label="Negative" />
        </q-card-section>
      </q-card>

      <q-card class="q-mb-lg">
        <q-card-section>
          <div class="text-h6 q-mb-md">Поле ввода</div>
          <q-input v-model="inputValue" label="Введите текст" outlined class="q-mb-md" />
          <q-input v-model="inputValue" label="Поле с иконкой" outlined>
            <template #prepend>
              <q-icon name="event" />
            </template>
          </q-input>
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-section>
          <div class="text-h6 q-mb-md">Список</div>
          <q-list bordered separator>
            <q-item v-for="n in 3" :key="n">
              <q-item-section>
                <q-item-label>Элемент {{ n }}</q-item-label>
                <q-item-label caption>Описание элемента {{ n }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ExamplesView',
  setup() {
    const inputValue = ref('')

    return {
      inputValue
    }
 }
}
</script>

<style scoped>
.examples-view {
  padding: 20px;
}
</style>