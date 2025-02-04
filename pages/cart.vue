<script setup>
import HomepageButton from "~/components/HomepageButton.vue";

const cart = useCart();
const totalCartAmount = useTotalCartAmount();
let totalPayment = useTotalPayment()

cart.value.forEach(product => {
  if (!product.amount) product.amount = 1;
  if (!product.initialStock) product.initialStock = product.stock;
  product.stock = product.initialStock - product.amount;
});

const increaseAmount = (product) => {
  if (product.amount < product.initialStock) {
    product.amount++;
    product.stock--;
    updateTotalAmount();
  }
};

const decreaseAmount = (product) => {
  if (product.amount > 1) {
    product.amount--;
    product.stock++;
    updateTotalAmount();
  }
};

const calcProductTotal = (product) => {
  return (product.price * product.amount).toFixed(2);
};

const calcTotalCart = computed(() => {
  const totalCart = cart.value.reduce((total, product) => total + product.price * product.amount, 0).toFixed(2);
  totalPayment.value = totalCart;
  return totalCart;
});

const removeFromCart = (product) => {
  const productIndex = cart.value.findIndex(item => item.id === product.id);
  if (productIndex !== -1) {
    product.stock += product.amount;
    cart.value.splice(productIndex, 1);
    updateTotalAmount();
  }
};

let totalAmount = computed(() => totalCartAmount.value);
const updateTotalAmount = () => {
  totalAmount = cart.value.reduce((total, product) => total + product.amount, 0);
  totalCartAmount.value = totalAmount;
};

const navigateToCheckout = async () => {
  if (!cart.value.length) {
    alert('Cart is empty');
    return;
  }
  await navigateTo('/checkout');
};

updateTotalAmount();

</script>


<template>
  <div class="container mx-auto p-4">
    <HomepageButton/>
    <h1 class="text-2xl font-bold mb-4">Your Cart</h1>
    <div class="relative overflow-x-auto sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Product name</th>
          <th scope="col" class="px-6 py-3">Price</th>
          <th scope="col" class="px-6 py-3">Left in stock</th>
          <th scope="col" class="px-6 py-3">Amount in cart</th>
          <th scope="col" class="px-6 py-3">Total price</th>
          <th scope="col" class="px-6 py-3">Image</th>
          <th scope="col" class="px-6 py-3">Remove</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in cart" :key="product.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ product.title }}</td>
          <td class="px-6 py-4">${{ Number(product.price).toFixed(2) }}</td>
          <td class="px-6 py-4">{{ product.stock }}</td>
          <td class="whitespace-nowrap px-6 py-4">
            <button @click="decreaseAmount(product)" class="px-2 py-1 bg-gray-200 rounded-lg text-gray-900 dark:bg-gray-700 dark:text-white">-</button>
            <span class="mx-2">{{ product.amount }}</span>
            <button @click="increaseAmount(product)" class="px-2 py-1 bg-gray-200 rounded-lg text-gray-900 dark:bg-gray-700 dark:text-white">+</button>
          </td>
          <td class="px-6 py-4">${{ calcProductTotal(product) }}</td>
          <td class="px-6 py-4"><img width="50" :src="product.thumbnail" alt="product image"/></td>
          <td class="px-6 py-4">
            <button @click="removeFromCart(product)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800">
              Remove
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <div
          class="max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-4">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">${{ calcTotalCart }}</p>
      </div>
    </div>
    <div class="mt-4">
      <h3 class="text-xl text-white">Total Products: {{ totalAmount }}</h3>
    </div>
    <button @click="navigateToCheckout"
            class="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Go to checkout
      <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
      </svg>
    </button>
  </div>
</template>


