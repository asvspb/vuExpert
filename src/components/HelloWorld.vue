<template>
  <div class="hello-world">
    <h1 class="hello-world__title">{{ msg }}</h1>
    <p class="hello-world__description">{{ description }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  msg: String,
  description: String,
})
</script>

<style scoped>
.hello-world {
  text-align: center;
  margin: 20px;
}

.hello-world__title {
  font-weight: 700;
}

.hello-world__description {
  opacity: .85;
}
</style>
