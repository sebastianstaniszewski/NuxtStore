<script setup>
definePageMeta({
  middleware: [
    async (to, from) => {
      if(from.name !== 'registration') {
        return await navigateTo('/');
      }
    }
  ]
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div class="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow-lg p-6 text-center dark:bg-gray-800 dark:border-gray-700">
      <h1 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Confirm Your Email</h1>
      <p class="mb-4 text-gray-700 dark:text-gray-400">
        Please confirm your email address to complete your registration. Check your email for the confirmation link.
      </p>
      <svg class="w-16 h-16 mx-auto mb-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89-3.26a4 4 0 014.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-1-1.73l-7-4.44a4 4 0 00-4.42 0l-7 4.44A2 2 0 003 8v9a2 2 0 002 2z"></path>
      </svg>
    </div>
  </div>
</template>