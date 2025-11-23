<template>
  <div id="app">
    <h1>Добро пожаловать в учебный проект Vue, SQLite, Redis и SCSS</h1>
    <p>Этот проект создан для изучения следующих технологий:</p>
    <ul>
      <li><strong>Vue.js</strong> - прогрессивный фреймворк для создания пользовательских интерфейсов</li>
      <li><strong>SQLite</strong> - встраиваемая реляционная система управления базами данных</li>
      <li><strong>Redis</strong> - хранилище данных в оперативной памяти (in-memory data store)</li>
      <li><strong>SCSS</strong> - метаязык на основе CSS, добавляющий улучшения к стандартному CSS</li>
    </ul>
    <p>Все компоненты проекта будут созданы с нуля, чтобы вы могли понять каждую часть системы.</p>
    
    <div class="example-container">
      <h2>Пример использования SCSS</h2>
      <p class="scss-example">Этот текст стилизован с использованием SCSS</p>
      <div class="nested-example">
        <p>Это вложенный элемент с наследованием стилей</p>
        <button class="custom-button">Нажми меня</button>
      </div>
    </div>
    
    <DatabaseExample />
    
    <Documentation />
  </div>
</template>

<script>
  import DatabaseExample from './components/DatabaseExample.vue'
  import Documentation from './components/Documentation.vue'

  export default {
  name: 'App',
  components: {
    DatabaseExample,
    Documentation
  }
  }
</script>

<style lang="scss">
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

  .example-container {
    @include container(800px);
    @include shadow(2);
    margin: 20px auto;
    padding: $padding-medium;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    background-color: $background-color;
  }

  .scss-example {
    font-size: $font-size-large;
    color: $accent-color;
    margin: 15px 0;
    @include responsive-font($font-size-medium, $font-size-large);
  }

  .nested-example {
    padding: $padding-medium;
    background-color: $secondary-background;
    border-radius: $border-radius;
    margin-top: $padding-medium;

  p {
    margin: 10px 0;
    font-weight: bold;
  }

  .custom-button {
    @include button-style($button-bg-color);
    padding: 10px 20px;
    font-size: $font-size-medium;
  }
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