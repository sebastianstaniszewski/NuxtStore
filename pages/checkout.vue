<script setup>
import {v4 as uuidv4} from 'uuid';

const user = useSupabaseUser();
const cart = useCart();
const totalProductAmount = useTotalCartAmount()
const purchasedItems = useState(() => cart.value)
const sessionId = useState(() => uuidv4())

const totalPayment = computed(() => {
  if (purchasedItems.value) {
    const total = purchasedItems.value.reduce((acc, item) => {
      const itemTotal = item.price * item.amount;
      return acc + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);

    return total;
  }
  return 0;
});

const stripePayment = useState(() => {
  return Math.floor(totalPayment.value * 100)
})

const saveCartAndStock = async () => {
  try {
    if (user.value) {

      const response = await $fetch('/api/save-cart', {
        method: 'POST',
        body: {
          userId: user.value.id,
          cart: cart.value,
          sessionId: sessionId.value
        }
      });

      if (response) {
        console.log('Cart saved successfully:', response);
      } else {
        throw new Error('Failed to save cart');
      }

      const stockResponse = await $fetch('/api/products/update-stock', {
        method: 'POST',
        body: cart.value.map(product => ({
          id: product.id,
          stock: product.stock
        }))
      });

      if (stockResponse.message === 'Stock updated successfully') {
        console.log('Stock updated successfully:', stockResponse);
      } else {
        throw new Error('Failed to update stock');
      }
    }
  } catch (error) {
    console.error('Failed to save cart and update stock:', error);
    alert('Failed to save cart and update stock. Please try again.');
    throw error;
  }
};

const config = useRuntimeConfig()
const {stripePK} = config.public
let stripe
let elements
let clientSecret

onMounted(async () => {
  stripe = await Stripe(stripePK)
  const initialize = async () => {
    const {data} = await useFetch('/api/stripe/payment', {
      method: 'post',
      body: {
        amount: stripePayment.value
      }
    })

    clientSecret = data.value
    console.log(clientSecret)
    const appearance = {
      theme: 'stripe'
    }

    const paymentElementOptions = {
      layouts: 'tabs'
    }

    elements = stripe.elements({
      appearance,
      clientSecret,
    })

    const paymentElement = elements.create('payment', paymentElementOptions)
    paymentElement.mount('#payment-element')
  }

  initialize()
  checkStatus()
})

const handlePayment = async () => {
  setLoading(true);
  await saveCartAndStock();
  cart.value = [];
  localStorage.removeItem('cart');
  totalProductAmount.value = 0;
  await navigateTo('/');

  const {error} = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: "https://mynuxtstore.netlify.app/success-payment",
    },
  });

  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occurred.");
  }

  setLoading(false);
}

async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  const {paymentIntent} = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent.status) {
    case "succeeded":
      showMessage("Payment succeeded!");
      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageContainer.textContent = "";
  }, 4000);
}

function setLoading(isLoading) {
  if (isLoading) {
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}

definePageMeta({
  middleware: [
    async (to, from) => {
      if (from.name !== 'cart') {
        return await navigateTo('/');
      }
    }
  ]
});

</script>

<template>
  <div class="p-6">
    <HomepageButton/>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Checkout</h1>
      <div v-if="purchasedItems && purchasedItems.length">
        <h2 class="text-xl font-semibold mb-2">Summary</h2>
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Product name</th>
              <th scope="col" class="px-6 py-3">Amount</th>
              <th scope="col" class="px-6 py-3">Price</th>
              <th scope="col" class="px-6 py-3">Total price for product</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in purchasedItems" :key="item.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">{{ item.title }}</td>
              <td class="px-6 py-4">{{ item.amount }}</td>
              <td class="px-6 py-4">${{ Number(item.price).toFixed(2) }}</td>
              <td class="px-6 py-4">${{ (item.price * item.amount).toFixed(2) }}</td>
            </tr>
            </tbody>
          </table>
          <div class="p-4">
            <div class="mt-4">Total price to pay: ${{ Number(totalPayment).toFixed(2) }}</div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No saved carts found.</p>
      </div>
    </div>

    <div class="mt-6 mb-8 flex items-center justify-center">
      <div class="max-w-lg w-full space-y-8 p-10 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 z-10">
        <h2 class="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Complete Your Payment</h2>
        <form @submit.prevent="handlePayment" id="payment-form">
          <div id="payment-element">
          </div>
          <button class="w-full" id="submit">
            <span class="spinner hidden" id="spinner"></span>
            <span
                class="w-full block py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" id="button-text">Pay now</span>
          </button>
          <div id="payment-message" class="hidden"></div>
        </form>
      </div>
    </div>
  </div>
</template>


