<template>
  <div class="database-section">
    <h2>Примеры работы с базами данных</h2>
    
    <div class="db-section">
      <h3>MySQL</h3>
      <p>MySQL - это популярная реляционная система управления базами данных (RDBMS), использующая язык запросов SQL.</p>
      <div class="example-code">
        <pre><code>
// Пример подключения к MySQL (на стороне сервера)
const mysql = require('mysql2');

const connection = mysql.createConnection({
 host: 'localhost',
 user: 'your_username',
 password: 'your_password',
 database: 'your_database'
});

connection.connect((err) => {
 if (err) {
   console.error('Ошибка подключения: ' + err.stack);
   return;
 }
console.log('Успешное подключение к базе данных как id ' + connection.threadId);
});
        </code></pre>
      </div>
    </div>
    
    <div class="db-section">
      <h3>Redis</h3>
      <p>Redis - это распределенное хранилище данных в оперативной памяти, часто используемое в качестве кэша, базы данных и брокера сообщений.</p>
      <div class="example-code">
        <pre><code>
// Пример подключения к Redis (на стороне сервера)
const redis = require('redis');

const client = redis.createClient({
host: 'localhost',
port: 6379
});

client.on('connect', () => {
console.log('Подключено к Redis');
});

client.on('error', (err) => {
console.error('Ошибка Redis:', err);
});
        </code></pre>
      </div>
    </div>
    
    <DatabaseConnectionExample />
  </div>
</template>

<script>
import DatabaseConnectionExample from './DatabaseConnectionExample.vue'

export default {
  name: 'DatabaseExample',
  components: {
    DatabaseConnectionExample
  }
}
</script>

<style lang="scss">
@use '../styles/variables.scss' as *;

.database-section {
  margin: 20px auto;
  padding: 20px;
  width: 80%;
  
  h2 {
    color: $primary-text-color;
    border-bottom: 2px solid $accent-color;
    padding-bottom: 10px;
  }
  
  .db-section {
    margin: 30px 0;
    
    h3 {
      color: $accent-color;
      margin-bottom: 15px;
    }
    
    p {
      color: $secondary-text-color;
      line-height: 1.6;
    }
  }
  
  .example-code {
    background-color: $secondary-background;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    padding: $padding-medium;
    margin-top: 15px;
    overflow-x: auto;
    
    pre {
      margin: 0;
      font-size: $font-size-small;
      
      code {
        color: #333;
      }
    }
  }
}
</style>