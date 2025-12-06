<template>
  <div id="app">
    <q-layout view="lHh Lpr lFf">
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title>
            Quasar App
          </q-toolbar-title>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
      >
        <q-list>
          <q-item-label header>
            Essential Links
          </q-item-label>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="school" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Docs</q-item-label>
              <q-item-label caption>quasar.dev</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <q-page-container>
        <q-page class="q-pa-md">
          <div class="row justify-center">
            <div class="col-12 col-md-8">
              <section class="example">
                <div class="example__container q-pa-md">
                  <!-- размести ниже блок с переменной message -->
                  <h2 class="text-h6">{{ message }}</h2>
                  <h2 class="example__title text-h5 q-mb-md">Пример использования SCSS</h2>
                  <p class="example__text text-body1 q-mb-lg">Этот текст стилизован с использованием SCSS</p>
                  <div class="example__nested q-pa-md bg-grey-2">
                    <p class="example__nested-text text-weight-bold q-mb-md">Это вложенный элемент с наследованием стилей</p>
                    <q-btn class="example__button" color="primary" label="Нажми меня!" @click="increment" />
                    <p class="q-mt-md">Счетчик: {{ count }}</p>
                    <div class="inner-container q-gutter-md q-mt-md">
                      <q-btn color="primary" label="Увеличить счетчик" @click="increment" />
                      <q-btn color="secondary" label="Сбросить счетчик" @click="reset" />
                      <q-btn color="accent" label="Измениeть сообщение" @click="toggleMessage" />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import Documentation from './components/Documentation.vue'
import DatabaseExample from './components/DatabaseExample.vue'
import HelloWorld from './components/HelloWorld.vue';

const $q = useQuasar()

const message = ref('Привет, Vue 3!');
const count = ref(0);
const leftDrawerOpen = ref(false)

const increment = () => {
  count.value++;
};
const reset = () => {
  count.value = 0;
};
const toggleMessage = () => {
  message.value = message.value === 'Привет, Vue 3!' ? 'Сообщение изменено!' : 'Привет, Vue 3!';
};

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
};
</script>

<style lang="scss">
  @use 'src/styles/variables.scss' as *;
  @use 'src/styles/mixins.scss' as *;

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $primary-text-color;
    margin-top: 60px;
    padding: 0 20px;
  }
  .inner-container {
    @include flex-center;
    gap: 10px;
  }
  .example {
    &__container {
      @include container(800px);
      @include shadow(2);
      margin: 20px auto;
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
    }

    &__button--secondary {
      @include button-style($button-secondary-bg);
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
