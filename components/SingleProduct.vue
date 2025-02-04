<script setup>

defineProps({
  product: Object
});

const user = useSupabaseUser();
const cart = useCart();
const totalCartAmount = useTotalCartAmount();

const addToCart = (product) => {
  if (user.value) {
    const productInCart = cart.value.find(item => item.id === product.id);

    if (productInCart) {
      productInCart.amount = 1;
    } else {
      cart.value.push({...product, amount: 1});
      totalCartAmount.value += 1;
    }
  } else {
    alert('You must login to add product to cart');
  }
}

const IsInCart = (cartState, productToCheck) => {
  return cartState.some((productInCart) => productInCart.id === productToCheck.id);
}
</script>

<template>
  <div>
    <div class="flex justify-center">
      <div
          class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <NuxtLink :to="`/product-${product.id}`" class="block mb-4">
          <img :src="product.thumbnail" alt="Product image" class="rounded-t-lg w-auto h-[200px] object-cover m-0 mx-auto"/>
        </NuxtLink>
        <div class="text-center">
          <NuxtLink :to="`/product-${product.id}`">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ product.title }}</h5>
          </NuxtLink>
          <NuxtLink :to="`/product-${product.id}`">
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ product.description }}</p>
            <p class="mb-3 text-lg font-medium text-gray-900 dark:text-white">${{
                Number(product.price).toFixed(2)
              }}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ product.stock }} items in stock</p>
          </NuxtLink>
          <button @click="addToCart(product)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <span v-if="IsInCart(cart, product) && user">Added to cart</span>
            <span v-else>Add to cart</span>
          </button>
          <div class="mt-4">
            <span class="badge bg-gray-200 text-gray-800 capitalize">{{ product.category }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



