<template>
  <div id="app" class="font-sans antialiased text-gray-800 bg-gray-50 min-h-screen pb-10">
    <header class="bg-white shadow-sm p-4 mb-8 sticky top-0 z-10 border-b border-gray-200">
      <div class="max-w-3xl mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-black text-blue-600 tracking-tight">vuExpert</h1>
        <nav class="flex gap-6">
          <RouterLink to="/" class="text-gray-600 hover:text-blue-600 transition font-medium" active-class="text-blue-600 border-b-2 border-blue-600 pb-1">Главная</RouterLink>
          <RouterLink to="/about" class="text-gray-600 hover:text-blue-600 transition font-medium" active-class="text-blue-600 border-b-2 border-blue-600 pb-1">О проекте</RouterLink>
        </nav>
      </div>
    </header>

    <div class="px-5">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
