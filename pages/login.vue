<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const email = useState(() => null);
const password = useState(() => null);
const isValid = useState(() => false);
const isNotValid = useState(() => false);

if (user.value) {
  await navigateTo('/');
}

const handleLogin = async () => {
  const {data, error} = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    isValid.value = null;
    isNotValid.value = error.message;
    return;
  }

  isNotValid.value = null;
  isValid.value = 'Redirecting...';
  setTimeout(async () => {
    isValid.value = null;
    await navigateTo('/');
  }, 2000);
};

const handleGithubLogin = async () => {
  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: 'github',
  });

  if (error) {
    isValid.value = null;
    isNotValid.value = error.message;
    return;
  }

  isNotValid.value = null;
  isValid.value = 'Redirecting...';
  setTimeout(async () => {
    isValid.value = null;
    await navigateTo('/');
  }, 2000);
};

const handleGoogleLogin = async () => {
  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    isValid.value = null;
    isNotValid.value = error.message;
    return;
  }

  isNotValid.value = null;
  isValid.value = 'Redirecting...';
  setTimeout(async () => {
    isValid.value = null;
    await navigateTo('/');
  }, 2000);
};
</script>

<template>
  <div class="p-6">
    <HomepageButton/>
    <div class="flex items-center justify-center">
      <div
          class="max-w-lg w-full space-y-8 p-4 md:p-10 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 z-10">
        <h2 class="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Login to Your Account</h2>
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="Email" class="block text-sm font-medium text-gray-700 dark:text-gray-400">Email</label>
            <input v-model="email"
                   type="email"
                   id="Email"
                   name="email"
                   class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                   required
            />
          </div>
          <div>
            <label for="Password" class="block text-sm font-medium text-gray-700 dark:text-gray-400">Password</label>
            <input v-model="password"
                   type="password"
                   id="Password"
                   name="password"
                   class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                   required
            />
          </div>
          <div>
            <button @click="handleLogin"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          </div>
          <div class="space-y-4">
            <button @click="handleGithubLogin" type="button"
                    class="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-700"
            >
              <svg class="w-5 h-5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
              </svg>
              Sign in with Github
            </button>
            <button @click="handleGoogleLogin" type="button"
                    class="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              <svg class="w-5 h-5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd"/>
              </svg>
              Sign in with Google
            </button>
          </div>
          <div>
            <p v-if="isNotValid" class="mt-2 text-xs text-red-600 dark:text-red-400">There is an error</p>
            <p v-if="isValid" class="mt-2 text-xs text-green-600 dark:text-green-400">You successfully logged in.</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
