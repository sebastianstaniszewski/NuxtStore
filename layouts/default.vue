<script setup>

import Footer from "~/components/Footer.vue";
</script>

<template>
    <div>
      <Header/>
      <main class="mt-28 sm:mt-16 min-h-screen overflow-hidden">
        <slot/>
      </main>
      <Footer/>
    </div>
</template>
