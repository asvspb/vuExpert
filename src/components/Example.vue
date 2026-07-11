<template>
  <section class="example">
    <div class="example__container">
      <h2>{{ message }}</h2>
      <h2 class="example__title">Пример использования SCSS</h2>
      <p class="example__text">Этот текст стилизован с использованием SCSS</p>
      <div class="example__nested">
        <p class="example__nested-text">Это вложенный элемент с наследованием стилей</p>
        <button class="example__button" :class="{ 'example__button--inverted': isColorInverted }" @click="toggleColor">Нажми меня!</button>
        <p>Счетчик: {{ count }}</p>
        <div class="inner-container">
          <button class="example__button--secondary" @click="increment">Увеличить счетчик</button>
          <button class="example__button--secondary" @click="reset">Сбросить счетчик</button>
          <button class="example__button--secondary" @click="toggleMessage">Измениeть сообщение</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Привет, Vue 3!');
const count = ref(0);
const increment = () => {
  count.value++;
};
const reset = () => {
  count.value = 0;
};
const toggleMessage = () => {
  message.value = message.value === 'Привет, Vue 3!' ? 'Сообщение изменено!' : 'Привет, Vue 3!';
};

const isColorInverted = ref(false);
const toggleColor = () => {
  isColorInverted.value = !isColorInverted.value;
};
</script>

<style lang="scss">
  @use '../styles/variables.scss' as *;
  @use '../styles/mixins.scss' as *;

  .inner-container {
    @include flex-center;
    gap: 10px;
  }
  .example {
    &__container {
      @include container(800px);
      @include shadow(2);
      margin: 20px auto;
      padding: $padding-medium;
      border: 1px solid $border-color;
      border-radius: $border-radius;
      background-color: $background-color;
    }

    &__title {
      margin-bottom: 10px;
    }

    &__text {
      font-size: $font-size-large;
      color: $accent-color;
      margin: 15px 0;
      @include responsive-font($font-size-medium, $font-size-large);
    }

    &__nested {
      padding: $padding-medium;
      background-color: $secondary-background;
      border-radius: $border-radius;
      margin-top: $padding-medium;

      &-text {
        margin: 10px 0;
        font-weight: bold;
      }
    }

    &__button {
      @include button-style($button-primary-bg);
      padding: 10px 20px;
      font-size: $font-size-medium;
      transition: filter 0.3s ease, background-color 0.3s ease;

      &--inverted {
        filter: invert(100%);
      }
    }

    &__button--secondary {
      @include button-style($button-secondary-bg);
    }
  }
</style>
