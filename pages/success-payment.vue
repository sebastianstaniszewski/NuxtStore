<script setup>

</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div class="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow-lg p-6 text-center dark:bg-gray-800 dark:border-gray-700">
        <h1 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Payment Successful</h1>
        <p class="mb-4 text-gray-700 dark:text-gray-400">
          Your payment was processed successfully. Thank you for your purchase!
        </p>
        <svg class="w-16 h-16 mx-auto mb-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <NuxtLink to="/" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Go to Homepage
          <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </NuxtLink>
      </div>
    </div>

</template>

