<template>
  <div class="about p-8 max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold mb-6 text-gray-800">Об этом стартовом шаблоне</h1>
    <p class="text-lg text-gray-600 mb-6">
      Это готовый к production стартовый шаблон (boilerplate), объединяющий Vue 3, FastAPI, PostgreSQL и Redis.
    </p>
    <div class="bg-white shadow rounded-lg p-6 border border-gray-100">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Технологический стек</h2>
      <ul class="list-disc pl-5 space-y-2 text-gray-600">
        <li><strong>Frontend:</strong> Vue 3, Vite, Tailwind CSS v4</li>
        <li><strong>Backend:</strong> FastAPI, SQLAlchemy 2.0 (Async), Pydantic</li>
        <li><strong>Database:</strong> PostgreSQL, Redis</li>
        <li><strong>Infrastructure:</strong> Docker, Docker Compose, GitHub Actions</li>
        <li><strong>Testing:</strong> Vitest, Playwright, Pytest</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
</script>
