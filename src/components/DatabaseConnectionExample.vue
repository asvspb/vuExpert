<template>
  <div class="connection-examples">
    <h2>Примеры подключения к базам данных</h2>
    
    <div class="connection-section">
      <h3>Подключение к MySQL</h3>
      <p>Для подключения к MySQL из Node.js приложения используется библиотека mysql2:</p>
      
      <div class="code-block">
        <pre><code>
// Установка зависимости
npm install mysql2

// Подключение в приложении
const mysql = require('mysql2');

// Создание пула подключений (рекомендуемый способ)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'my_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Использование пула для выполнения запросов
const executeQuery = async (query, params) => {
  const promise = pool.promise();
  const [rows] = await promise.execute(query, params);
  return rows;
};

// Пример использования
try {
  const users = await executeQuery('SELECT * FROM users WHERE active = ?', [1]);
  console.log(users);
} catch (error) {
  console.error('Ошибка при выполнении запроса:', error);
}
        </code></pre>
      </div>
    </div>
    
    <div class="connection-section">
      <h3>Подключение к Redis</h3>
      <p>Для подключения к Redis из Node.js приложения используется библиотека redis:</p>
      
      <div class="code-block">
        <pre><code>
// Установка зависимости
npm install redis

// Подключение в приложении
const redis = require('redis');

// Создание клиента
const client = redis.createClient({
  host: 'localhost',
  port: 6379,
  // Дополнительные опции
  retry_strategy: (options) => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      console.error('Сервер Redis отклонил подключение');
      return new Error('Сервер Redis отклонил подключение');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      console.error('Истекло время ожидания подключения к Redis');
      return new Error('Истекло время ожидания подключения к Redis');
    }
    if (options.attempt > 10) {
      console.error('Превышено количество попыток подключения к Redis');
      return undefined;
    }
    return Math.min(options.attempt * 100, 3000);
  }
});

// Подключение к Redis
client.connect().then(() => {
  console.log('Подключено к Redis');
}).catch((err) => {
  console.error('Ошибка подключения к Redis:', err);
});

// Примеры операций с Redis
const redisOperations = async () => {
  try {
    // Установка значения
    await client.set('user:100', JSON.stringify({ id: 100, name: 'John Doe', email: 'john@example.com' }));
    
    // Получение значения
    const user = await client.get('user:100');
    console.log('Пользователь:', JSON.parse(user));
    
    // Установка значения с TTL (временем жизни)
    await client.setEx('session:abc123', 3600, 'session_data_here');
    
    // Работа со списками
    await client.lPush('tasks', 'task1', 'task2', 'task3');
    const tasks = await client.lRange('tasks', 0, -1);
    console.log('Задачи:', tasks);
    
    // Увеличение числового значения
    await client.set('counter', 0);
    const newCounter = await client.incr('counter');
    console.log('Счетчик:', newCounter);
  } catch (error) {
    console.error('Ошибка операции Redis:', error);
  }
};

// Закрытие подключения
const closeRedisConnection = async () => {
  await client.quit();
};
        </code></pre>
      </div>
    </div>
    
    <div class="connection-section">
      <h3>Практическое применение</h3>
      <p>В реальных приложениях MySQL и Redis часто используются вместе:</p>
      <ul>
        <li>MySQL: хранение основных данных с сохранением целостности</li>
        <li>Redis: кэширование частых запросов, сессии пользователей, очередь задач</li>
        <li>Пример архитектуры: приложение получает данные из MySQL, кэширует их в Redis на определенное время</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatabaseConnectionExample'
}
</script>

<style lang="scss">
@use '../styles/variables.scss' as *;
@use '../styles/mixins.scss' as *;

.connection-examples {
  @include container(1000px);
  margin: 20px auto;
 padding: $padding-large;
  
  h2 {
    color: $primary-text-color;
    text-align: center;
    margin-bottom: $padding-large;
    @include responsive-font($font-size-large, $font-size-xlarge);
  }
  
  .connection-section {
    margin-bottom: $padding-large;
    padding: $padding-medium;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    background-color: $secondary-background;
    
    h3 {
      color: $accent-color;
      margin-bottom: $padding-small;
    }
    
    p {
      color: $secondary-text-color;
      margin-bottom: $padding-medium;
      line-height: 1.6;
    }
    
    ul {
      margin-left: $padding-large;
      margin-bottom: $padding-medium;
      
      li {
        margin-bottom: $padding-small;
        line-height: 1.5;
      }
    }
  }
  
  .code-block {
    background-color: #2d2d2d;
    color: #f8f8f2;
    border-radius: $border-radius;
    padding: $padding-medium;
    margin: $padding-medium 0;
    overflow-x: auto;
    
    pre {
      margin: 0;
      font-size: $font-size-small;
    }
    
    code {
      font-family: 'Fira Code', 'Courier New', monospace;
    }
  }
}
</style>