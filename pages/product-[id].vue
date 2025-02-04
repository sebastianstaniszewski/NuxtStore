<script setup>
import HomepageButton from "~/components/HomepageButton.vue";

const route = useRoute();
const id = route.params.id;

const {data: product, pending} = await useFetch(() => {
  return `/api/products/find-product/${id}`;
});
</script>

<template>
    <div class="px-6 py-6">
      <LoadingSpinner v-if="pending"/>
      <div v-else>
        <HomepageButton/>
        <SingleProduct :product="product"/>
      </div>
    </div>
</template>
