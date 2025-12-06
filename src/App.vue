<template>
  <div id="app">

    <section class="example">
      <div class="example__container">
        <!-- размести ниже блок с переменной message -->
        <h2>{{ message }}</h2>
        <h2 class="example__title">Пример использования SCSS</h2>
        <p class="example__text">Этот текст стилизован с использованием SCSS</p>
        <div class="example__nested">
          <p class="example__nested-text">Это вложенный элемент с наследованием стилей</p>
          <p>Счетчик: {{ count }}</p>
          <div class="inner-container">
            <Button label="Увеличить счетчик" @click="increment" class="p-button-primary" />
            <Button label="Сбросить счетчик" @click="reset" class="p-button-secondary" />
            <Button label="Изменить сообщение" @click="toggleMessage" class="p-button-help" />
            <Button label="Предупреждение" @click="showWarning" class="p-button-warning" />
            <Button label="Ошибка" @click="showError" class="p-button-danger" />
          </div>
          <div class="prime-buttons-demo">
            <h3>Кнопки PrimeVue</h3>
            <div class="button-group">
              <Button label="Основная" class="p-button-primary" />
              <Button label="Вторичная" class="p-button-secondary" />
              <Button label="Успех" class="p-button-success" />
              <Button label="Информация" class="p-button-info" />
              <Button label="Предупреждение" class="p-button-warning" />
              <Button label="Опасность" class="p-button-danger" />
              <Button label="Помощь" class="p-button-help" />
            </div>
            <div class="button-group">
              <Button label="Контурная" class="p-button-outlined" />
              <Button label="Текстовая" class="p-button-text" />
              <Button label="С иконкой" icon="pi pi-check" />
              <Button label="Отключенная" :disabled="true" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="prime-form-demo">
      <div class="example__container">
        <h2 class="example__title">Форма с PrimeVue компонентами</h2>
        <div class="form-container">
          <div class="p-fluid">
            <div class="p-field">
              <label for="name">Имя</label>
              <InputText id="name" v-model="form.name" placeholder="Введите ваше имя" />
            </div>
            <div class="p-field">
              <label for="email">Email</label>
              <InputText id="email" v-model="form.email" placeholder="email@example.com" />
            </div>
            <div class="p-field">
              <label for="country">Страна</label>
              <Dropdown id="country" v-model="form.country" :options="countries" optionLabel="name" placeholder="Выберите страну" />
            </div>
            <div class="p-field-checkbox">
              <Checkbox id="terms" v-model="form.terms" :binary="true" />
              <label for="terms">Согласен с условиями</label>
            </div>
            <div class="p-field">
              <label for="message">Сообщение</label>
              <Textarea id="message" v-model="form.message" :autoResize="true" rows="3" placeholder="Введите ваше сообщение..." />
            </div>
            <div class="button-group">
              <Button label="Отправить" @click="submitForm" class="p-button-success" />
              <Button label="Сбросить" @click="resetForm" class="p-button-secondary" />
            </div>
          </div>
        </div>
        <div v-if="submitted" class="submission-result">
          <h3>Данные формы:</h3>
          <pre>{{ formDataDisplay }}</pre>
        </div>
      </div>
    </section>

    <section class="prime-table-demo">
      <div class="example__container">
        <h2 class="example__title">Таблица данных PrimeVue</h2>
        <div class="table-container">
          <DataTable :value="products" responsiveLayout="scroll" class="p-datatable-sm">
            <Column field="code" header="Код"></Column>
            <Column field="name" header="Название"></Column>
            <Column field="category" header="Категория"></Column>
            <Column field="quantity" header="Количество"></Column>
            <Column field="price" header="Цена">
              <template #body="slotProps">
                {{ formatCurrency(slotProps.data.price) }}
              </template>
            </Column>
            <Column header="Действия">
              <template #body="slotProps">
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-text" @click="editProduct(slotProps.data)" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger" @click="deleteProduct(slotProps.data)" />
              </template>
            </Column>
          </DataTable>
          <div class="table-actions">
            <Button label="Добавить продукт" @click="addProduct" class="p-button-success" />
            <Button label="Обновить данные" @click="refreshProducts" class="p-button-secondary" />
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Documentation from './components/Documentation.vue'
import DatabaseExample from './components/DatabaseExample.vue'
import HelloWorld from './components/HelloWorld.vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import Textarea from 'primevue/textarea';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

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
const showWarning = () => {
  alert('Предупреждение от PrimeVue кнопки!');
};
const showError = () => {
  alert('Ошибка от PrimeVue кнопки!');
};

// Form data
const form = ref({
  name: '',
  email: '',
  country: null,
  terms: false,
  message: ''
});

const countries = ref([
  { name: 'Россия', code: 'RU' },
  { name: 'США', code: 'US' },
  { name: 'Германия', code: 'DE' },
  { name: 'Франция', code: 'FR' },
  { name: 'Япония', code: 'JP' }
]);

const submitted = ref(false);

const submitForm = () => {
  submitted.value = true;
  alert(`Форма отправлена!\nИмя: ${form.value.name}\nEmail: ${form.value.email}\nСтрана: ${form.value.country?.name || 'Не выбрана'}\nСогласие: ${form.value.terms ? 'Да' : 'Нет'}\nСообщение: ${form.value.message}`);
};

const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    country: null,
    terms: false,
    message: ''
  };
  submitted.value = false;
};

const formDataDisplay = computed(() => {
  return JSON.stringify(form.value, null, 2);
});

// Table data
const products = ref([
  { code: 'P001', name: 'Ноутбук', category: 'Электроника', quantity: 10, price: 1500 },
  { code: 'P002', name: 'Смартфон', category: 'Электроника', quantity: 25, price: 800 },
  { code: 'P003', name: 'Наушники', category: 'Аксессуары', quantity: 50, price: 150 },
  { code: 'P004', name: 'Клавиатура', category: 'Периферия', quantity: 30, price: 75 },
  { code: 'P005', name: 'Монитор', category: 'Электроника', quantity: 15, price: 300 },
]);

const formatCurrency = (value) => {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(value);
};

const editProduct = (product) => {
  alert(`Редактирование продукта: ${product.name}`);
};

const deleteProduct = (product) => {
  if (confirm(`Удалить продукт ${product.name}?`)) {
    products.value = products.value.filter(p => p.code !== product.code);
  }
};

const addProduct = () => {
  const newProduct = {
    code: `P${String(products.value.length + 1).padStart(3, '0')}`,
    name: `Новый продукт ${products.value.length + 1}`,
    category: 'Разное',
    quantity: Math.floor(Math.random() * 100),
    price: Math.floor(Math.random() * 1000) + 50
  };
  products.value.push(newProduct);
};

const refreshProducts = () => {
  // Имитация обновления данных
  products.value = [...products.value];
  alert('Данные таблицы обновлены!');
};
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

  // PrimeVue specific styles
  .prime-buttons-demo {
    margin-top: 2rem;
    padding: 1rem;
    background-color: $secondary-background;
    border-radius: $border-radius;

    h3 {
      margin-bottom: 1rem;
      color: $primary-text-color;
    }

    .button-group {
      @include flex-center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1rem;
    }
  }

  .prime-form-demo,
  .prime-table-demo {
    margin-top: 3rem;

    .form-container {
      max-width: 600px;
      margin: 0 auto;
      text-align: left;
    }

    .p-field {
      margin-bottom: 1.5rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: bold;
        color: $primary-text-color;
      }
    }

    .p-field-checkbox {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .submission-result {
      margin-top: 2rem;
      padding: 1rem;
      background-color: $secondary-background;
      border-radius: $border-radius;
      text-align: left;

      pre {
        background-color: #f5f5f5;
        padding: 1rem;
        border-radius: 4px;
        overflow-x: auto;
      }
    }
  }

  .table-container {
    margin-top: 1rem;
    overflow-x: auto;
  }

  .table-actions {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  // PrimeVue component overrides for better integration
  .p-button {
    margin: 0.25rem;
  }

  .p-inputtext,
  .p-dropdown,
  .p-textarea {
    width: 100%;
  }

  .p-datatable {
    margin-top: 1rem;
  }
</style>
