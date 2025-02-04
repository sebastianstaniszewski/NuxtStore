// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],
  supabase: {
    url: process.env.API_SUPABASE_URL,
    key: process.env.API_SUPABASE_KEY,
    redirect: false
  },
  runtimeConfig: {
    stripeSK: process.env.STRIPE_SECRET_KEY,
    public: {
      stripePK: process.env.STRIPE_PUBLIC_KEY
    }
  },
  app: {
    head: {
      title: 'NuxtStore',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css'
        }
      ],
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js',
          defer: true
        },
        {
          src: 'https://js.stripe.com/v3',
          defer: true
        }
      ]
    }
  }
})
