<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const name = useState(() => null);
const email = useState(() => null);
const password = useState(() => null);
const confirmPassword = useState(() => null);
const isValid = useState(() => false);
const isNotValid = useState(() => false);

if(user.value) {
  await navigateTo('/');
}

const register = async () => {
  if (password.value !== confirmPassword.value) {
    isValid.value = null;
    isNotValid.value = 'Passwords do not match';
    return
  }

  const {data, error} = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        name: name.value,
      },
      emailRedirectTo: 'https://mynuxtstore.netlify.app/'
    }
  });

  if(error) {
    isValid.value = null;
    isNotValid.value = error.message;
    return
  }

  isNotValid.value = null;
  isValid.value = 'Redirecting...';

  setTimeout(async () => {
    isValid.value = null;
    await navigateTo('/confirmation');
  },2000)
};

</script>

<template>
  <div class="p-6">
    <HomepageButton/>
    <div class="flex items-center justify-center">
      <div
          class="max-w-lg w-full space-y-8 p-4 md:p-10 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 z-10">
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Create an account</h2>
        </div>

        <form @submit.prevent="register" class="mt-8 space-y-6">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6">
              <label for="Name" class="block text-sm font-medium text-gray-700 dark:text-gray-400">Name</label>
              <input v-model="name" id="Name" name="name" type="text" required
                     class="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400"
                     placeholder="Name" />
            </div>

            <div class="col-span-6">
              <label for="Email" class="block text-sm font-medium text-gray-700 dark:text-gray-400">Email</label>
              <input v-model="email" id="Email" name="email" type="email" required
                     class="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400"
                     placeholder="Email address" />
            </div>

            <div class="col-span-6">
              <label for="Password" class="block text-sm font-medium text-gray-700 dark:text-gray-400">Password</label>
              <input v-model="password" id="Password" name="password" type="password" required
                     class="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400"
                     placeholder="Password" />
            </div>

            <div class="col-span-6">
              <label for="ConfirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-400">Confirm Password</label>
              <input v-model="confirmPassword" id="ConfirmPassword" name="confirmPassword" type="password" required
                     class="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400"
                     placeholder="Confirm Password" />
            </div>
          </div>

          <div class="sm:flex flex-col sm:items-center sm:gap-4 mt-6">
            <button type="submit"
                    class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
              Create an account
            </button>
            <p class="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
              <NuxtLink to="login" class="hover:text-white">Or login through Gmail or GitHub account</NuxtLink>
            </p>
          </div>

          <div class="text-center mt-4">
            <p v-if="isNotValid" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ isNotValid }}</p>
            <p v-if="isValid" class="mt-2 text-xs text-green-600 dark:text-green-400">{{ isValid }}</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
