<script setup>
import HomepageButton from "~/components/HomepageButton.vue";

const user = useSupabaseUser();

const fetchCarts = async () => {
  try {
    const response = await $fetch('/api/get-cart', {
      params: { userId: user.value.id }
    });
    carts.value = response;
  } catch (error) {
    console.error('Failed to fetch carts:', error);
  }
};

const fetchUserProducts = async () => {
  try {
    const response = await $fetch('/api/products/user-products', {
      params: { userId: user.value.id }
    });
    userProducts.value = response;
  } catch (error) {
    console.error('Failed to fetch user products:', error);
  }
};

const { data: carts } = await useFetch('/api/get-cart', {
  params: { userId: user.value.id }
});

const { data: userProducts } = await useFetch('/api/products/user-products', {
  params: { userId: user.value.id }
});
</script>

<template>
  <div class="p-6">
    <HomepageButton/>
    <div class="container mx-auto p-4">
      <div v-if="carts.length">
        <h1 v-if="user.user_metadata.full_name" class="text-2xl font-bold mb-4">{{ user.user_metadata.full_name }}
          account</h1>
        <h1 v-else  class="text-2xl font-bold mb-4">Your account</h1>
        <h2 class="text-xl font-semibold mb-2">Your purchase history</h2>
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Date</th>
              <th scope="col" class="px-6 py-3">Items</th>
              <th scope="col" class="px-6 py-3">Total</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="cart in carts" :key="cart.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">{{ new Date(cart.createdAt).toLocaleDateString() }}</td>
              <td class="px-6 py-4">
                <ul>
                  <li v-for="item in cart.items" :key="item.id">{{ item.title }} (x{{ item.amount }})</li>
                </ul>
              </td>
              <td class="px-6 py-4">${{ cart.items.reduce((total, item) => total + item.price * item.amount,
                  0).toFixed(2) }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else>
        <h2 class="text-xl font-semibold mb-2">Your purchase history</h2>
        <p>No saved carts found.</p>
      </div>

      <div class="mt-6" v-if="userProducts.length">
        <h2 class="text-xl font-semibold mb-2">Your products</h2>
        <div class="relative overflow-x-auto sm:rounded-lg">
          <table class="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3">Product name</th>
              <th scope="col" class="px-4 py-3">Price</th>
              <th scope="col" class="px-4 py-3">Stock</th>
              <th scope="col" class="px-4 py-3">Category</th>
              <th scope="col" class="px-4 py-3">Thumbnail</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="product in userProducts" :key="product.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ product.title }}</td>
              <td class="px-4 py-3">${{ product.price }}</td>
              <td class="px-4 py-3">{{ product.stock }}</td>
              <td class="px-4 py-3">{{ product.category }}</td>
              <td class="px-4 py-3"><img width="50" :src="product.thumbnail" alt="product image" /></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="mt-6" v-else>
        <h2 class="text-xl font-semibold mb-2">Your products</h2>
        <p>No added products found.</p>
      </div>
    </div>
  </div>

</template>
