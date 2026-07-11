<template>
  <section class="py-5">
    <div class="max-w-3xl mx-auto p-4 my-5 bg-white border border-gray-200 rounded shadow-md">
      <h2 class="text-2xl font-bold mb-2">{{ message }}</h2>
      <h2 class="mb-2">Пример использования Tailwind CSS</h2>
      <p class="text-lg md:text-xl text-green-500 my-4">Этот текст стилизован с использованием утилит Tailwind</p>
      
      <div class="p-4 bg-gray-50 rounded mt-4">
        <p class="my-2 font-bold">Это вложенный элемент с наследованием стилей (переведено на Tailwind)</p>
        <button 
          class="bg-blue-500 text-white px-5 py-2.5 rounded text-base transition-all duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          :class="{ 'invert': isColorInverted }" 
          @click="toggleColor"
        >
          Нажми меня!
        </button>
        <p class="my-3 font-semibold">Счетчик: {{ count }}</p>
        
        <div class="flex justify-center items-center gap-2.5 mt-4 flex-wrap">
          <button class="bg-blue-900 text-white px-5 py-2.5 rounded text-base transition-colors duration-300 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500" @click="increment">Увеличить счетчик</button>
          <button class="bg-blue-900 text-white px-5 py-2.5 rounded text-base transition-colors duration-300 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500" @click="reset">Сбросить счетчик</button>
          <button class="bg-blue-900 text-white px-5 py-2.5 rounded text-base transition-colors duration-300 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500" @click="toggleMessage">Изменить сообщение</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Привет, Vue 3 + Tailwind!');
const count = ref(0);
const increment = () => {
  count.value++;
};
const reset = () => {
  count.value = 0;
};
const toggleMessage = () => {
  message.value = message.value === 'Привет, Vue 3 + Tailwind!' ? 'Сообщение изменено!' : 'Привет, Vue 3 + Tailwind!';
};

const isColorInverted = ref(false);
const toggleColor = () => {
  isColorInverted.value = !isColorInverted.value;
};
</script>
