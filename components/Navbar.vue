<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();

let totalCartAmount = useTotalCartAmount();
let searchField = useSearchField()
let searchResult = useSearchResult();
const isValid = useState(() => null);
const isNotValid = useState(() => null);

const {data} = await useFetch('/api/search', {
  immediate: false,
  query: {
    input: searchField
  },
  transform: data => {
    searchResult.value = data;
  }
});

const handleLogout = async () => {
  const {error} = await supabase.auth.signOut();
  if (error) {
    isValid.value = null;
    isNotValid.value = error.message;
    return
  }

  isValid.value = 'You were successful logout';
  setTimeout(async () => {
    isValid.value = null;
    await navigateTo('/login')
  }, 2000)
};

definePageMeta({
  middleware: [
    async () => {
      const user = useSupabaseUser();
      if (!user.value) await navigateTo('/login');
    }
  ]
})

</script>

<template>
  <nav>
    <div class="navbar flex flex-col sm:flex-row bg-base-100 border-b border-gray-300 fixed top-0 left-0 w-full z-50">
      <div class="flex-1">
        <NuxtLink to="/" class="btn btn-ghost text-xl">NuxtStore</NuxtLink>
      </div>

      <div class="navbar-container flex items-center">
        <NuxtLink to="/add-product" class="mr-5 hover:text-white">Add your product</NuxtLink>

        <div class="form-control">
          <input v-model="searchField" type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto"/>
        </div>
        <div class="flex items-center gap-1">
          <div v-if="user" class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
              <div class="indicator">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <span class="badge badge-sm indicator-item">{{ totalCartAmount }}</span>
              </div>
            </div>
            <div tabindex="0" class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
              <div class="card-body">
                <span class="text-lg font-bold">Products in cart: {{ totalCartAmount }}</span>
                <div class="card-actions">
                  <NuxtLink class="w-full block" to="/cart">
                    <button class="btn btn-primary btn-block ">View cart</button>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img
                    alt="Tailwind CSS Navbar component"
                    src="/public/images/user-avatar.png"/>
              </div>
            </div>
            <ul v-if="user" tabindex="0"
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-64 p-2 shadow">
              <li>
                <NuxtLink to="/my-account" class="justify-between text-lg">My account</NuxtLink>
              </li>
              <li>
                <button class="text-lg" @click="handleLogout">Logout</button>
              </li>
            </ul>
            <ul v-else
                tabindex="0"
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <NuxtLink to="/login" class="justify-between text-lg">Login</NuxtLink>
              </li>
              <li>
                <NuxtLink class="text-lg" to="/registration">Register</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
    <div :class="isValid" class="text-center">{{isValid}}</div>
  </nav>
</template>

