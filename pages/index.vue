<script setup>
const { data: products } = await useFetch('/api/products');

let searchField = useSearchField();
let searchResult = useSearchResult();
let selectedCategory = ref(null);

const categories = computed(() => {
  if (!products.value) return [];
  const categoriesList = [];
  products.value.forEach((product) => {
    if (!categoriesList.includes(product.category)) {
      categoriesList.push(product.category);
    }
  });
  return categoriesList;
});

const filteredProducts = computed(() => {
  if (!products.value) return [];

  const activeProducts = searchField.value
      ? searchResult.value || []
      : products.value;

  return activeProducts.filter((product) => {
    const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value;
    return matchesCategory;
  });
});

const selectCategory = (category) => {
  selectedCategory.value = category;
};
</script>

<template>
  <div class="container mx-auto p-6 mb-4">
    <div class="mb-10 flex justify-center flex-wrap gap-2">
      <span
          @click="selectCategory(null)"
          :class="[
          'inline-block cursor-pointer p-2 rounded transition-colors duration-200 capitalize',
          selectedCategory === null ? 'bg-gray-700 text-white hover:bg-gray-800' : 'bg-gray-500 text-white hover:bg-gray-600'
        ]"
      >
        All products
      </span>
      <span
          v-for="category in categories"
          :key="category"
          @click="selectCategory(category)"
          :class="[
          'inline-block cursor-pointer p-2 rounded transition-colors duration-200 capitalize',
          selectedCategory === category ? 'bg-indigo-700 text-white hover:bg-indigo-800' : 'bg-indigo-500 text-white hover:bg-indigo-600'
        ]"
      >
        {{ category }}
      </span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <template v-if="filteredProducts.length > 0">
        <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto"
        >
          <SingleProduct :product="product" />
        </div>
      </template>

      <template v-else>
        <p class="col-span-4 text-center text-gray-500">
          No results for the specified phrase{{ selectedCategory ? ' in this category' : '' }}.
        </p>
      </template>
    </div>
  </div>
</template>
