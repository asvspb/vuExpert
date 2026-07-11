<template>
  <div id="app">
    <Example />
  </div>
</template>

<script setup>
import Example from './components/Example.vue'
</script>

<style scoped lang="scss">
  @use './styles/variables.scss' as *;
  @use './styles/mixins.scss' as *;

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $primary-text-color;
    margin-top: 60px;
    padding: 0 20px;
  }

  h1 {
    @include responsive-font($font-size-large, $font-size-xlarge);
    @include gradient(#f8f9fa, #e9ecef);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
    padding: 10px;
  }
</style>
