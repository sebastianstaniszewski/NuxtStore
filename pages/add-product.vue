<script setup>
import HomepageButton from "~/components/HomepageButton.vue";

const {data: products} = await useFetch('/api/products');
const supabase = useSupabaseClient();
const user = useSupabaseUser();

if (!user.value) await navigateTo('/login');

const title = useState(() => null);
const description = useState(() => null);
const price = useState(() => null);
const category = useState(() => null);
const imageUrl = useState(() => null);
const stock = useState(() => null);
const thumbnail = useState(() => null);
const imageUploadSuccess = useState(() => null);
const imageUploadError = useState(() => null);
const productAdditionSuccess = useState(() => null);
const productAdditionError = useState(() => null);
const validationError = useState(() => null);

const handleClearInputs = () => {
  title.value = null;
  description.value = null;
  price.value = null;
  category.value = null;
  imageUrl.value = null;
  stock.value = null;
  imageUploadSuccess.value = null;
  imageUploadError.value = null;
  productAdditionError.value = null;
  productAdditionSuccess.value = null;
  validationError.value = null;
}

const handleFileChange = event => {
  thumbnail.value = event.target.files[0];
}

const handleUploadImage = async () => {
  if (!thumbnail.value) {
    if (process.client) {
      alert('Please select an image to upload');
    }
    return;
  }

  const img = thumbnail.value;
  try {
    const {data, error} = await supabase.storage.from('images').upload(`public/${img.name}`, img, {
      cacheControl: '3600',
      upsert: false,
    });

    if (data) {
      imageUploadSuccess.value = 'Image Uploaded';
      const {data} = await supabase.storage.from('images').getPublicUrl(`public/${img.name}`);
      imageUrl.value = data.publicUrl;
    }

  } catch (error) {
    imageUploadError.value = error.message;
  }
}

const handleCreateProduct = async () => {
  if (!title.value || !description.value || !category.value || !price.value || !stock.value || !imageUrl.value) {
    validationError.value = 'All fields must be filled in before submitting the product.';
    return;
  } else {
    validationError.value = null;
  }

  const {data: product, error} = await useFetch('/api/products/add-product', {
    query: {
      title: title.value,
      description: description.value,
      thumbnail: imageUrl.value,
      stock: stock.value,
      category: category.value,
      price: price.value,
      userId: user.value.id
    }
  });

  if (error.value) {
    productAdditionError.value = 'An error occurred, try again';
    return;
  }

  productAdditionSuccess.value = 'Product added successfully, redirecting...';
  const productID = product.value.id;
  setTimeout(async () => {
    await navigateTo(`/product-${productID}`);
  }, 2000);
}


const categories = computed(() => {
  const uniqueCategories = new Set();
  products.value.forEach(product => {
    if (product.category) {
      uniqueCategories.add(product.category);
    }
  });
  return Array.from(uniqueCategories);
});

</script>


<template>
  <div class="p-6">
    <HomepageButton/>
    <div class="min-h-screen flex items-center justify-center">
      <form
          class="mb-10 max-w-lg w-full space-y-8 p-4 md:p-10 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div>
          <label for="title" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">Product Title</label>
          <input v-model="title" type="text" id="title"
                 class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <div>
          <label for="category" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">Product Category</label>
          <select v-model="category" id="category"
                  class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
        <div>
          <label for="stock" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">Stock</label>
          <input v-model="stock" type="number" id="stock"
                 class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <div>
          <label for="price" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">Product Price</label>
          <input v-model="price" type="number" id="price"
                 class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <div>
          <label for="description" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">Product Description</label>
          <textarea v-model="description" id="description" rows="4"
                    class="block w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your product description here..."></textarea>
        </div>
        <div>
          <label for="user_avatar" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">Upload a product image</label>
          <input @change="handleFileChange" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file">
        </div>

        <div v-if="imageUploadSuccess">
          <p id="standard_success_help" class="mt-2 text-xs text-green-600 dark:text-green-400">{{ imageUploadSuccess }}</p>
        </div>

        <div v-if="imageUploadError">
          <p id="outlined_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ imageUploadError }}</p>
        </div>

        <div v-if="validationError">
          <p id="outlined_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ validationError }}</p>
        </div>

        <button @click="handleUploadImage" type="button"
                class="w-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-4">
          Upload Image
        </button>

        <div class="inline-flex items-center justify-center w-full">
          <hr class="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700">
          <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900"></div>
        </div>

        <button @click="handleCreateProduct" type="button"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Submit Product
        </button>

        <button @click="handleClearInputs" type="button"
                class="w-full text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
          Clear Everything
        </button>

        <div v-if="productAdditionSuccess">
          <p id="standard_success_help" class="mt-2 text-xs text-green-600 dark:text-green-400">{{ productAdditionSuccess }}</p>
        </div>

        <div v-if="productAdditionError">
          <p id="outlined_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ productAdditionError }}</p>
        </div>
      </form>
    </div>
  </div>
</template>
