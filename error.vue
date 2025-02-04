<script setup>
const error = useError();
const handleError = () => {
  clearError({
    redirect: '/'
  })
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div class="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow-lg p-6 text-center dark:bg-gray-800 dark:border-gray-700">
      <h1 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Error {{ error.statusCode }}</h1>
      <p class="mb-4 text-gray-700 dark:text-gray-400">
        {{ error.message }}
      </p>
      <button @click="handleError" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500">
        Go back to homepage
      </button>
    </div>
  </div>
</template>

