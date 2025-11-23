<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  msg: String,
  description: String,
})
</script>

<style scoped>
.hello {
  text-align: center;
  margin: 20px;
}
</style>
