<template>
  <div class="max-w-3xl mx-auto p-4 my-5 bg-white border border-gray-200 rounded shadow-md text-center">
    <h1 class="text-3xl font-bold mb-4">О проекте vuExpert</h1>
    <p class="text-lg text-gray-700 mb-4">
      Это тестовая страница, демонстрирующая работу Vue Router и Pinia.
    </p>
    <div class="p-6 bg-gray-50 rounded mt-4 border border-gray-100">
      <h2 class="text-xl font-bold mb-4">Тестирование Pinia Store</h2>
      <p class="font-semibold mb-2">Глобальный счетчик: <span class="text-blue-600 text-2xl">{{ counter.count }}</span></p>
      <p class="text-sm text-gray-500 mb-4">Двойное значение: {{ counter.doubleCount }}</p>
      <button 
        @click="counter.increment"
        class="bg-blue-600 text-white px-5 py-2.5 rounded hover:bg-blue-700 transition shadow-sm font-medium"
      >
        Увеличить глобальный счетчик
      </button>
      <p class="text-xs text-gray-400 mt-4">Попробуйте увеличить счетчик, перейти на Главную и вернуться сюда. Значение сохранится!</p>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter'

const counter = useCounterStore()
</script>
