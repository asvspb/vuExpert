<template>
  <div class="text-center m-5">
    <h1 class="font-bold">{{ msg }}</h1>
    <p class="opacity-85">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  msg: String,
  description: String,
})
</script>
