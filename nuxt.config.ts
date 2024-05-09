// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-lucide-icons'
  ],
  lucide: {
    namePrefix: 'Icon'
  },
  plugins: [
    { src: '~/plugins/jquery.js', mode: 'client' },
  ],
  app: {
    head: {
      script: [
        { src: 'https://unpkg.com/@material-tailwind/html@latest/scripts/script-name.js'}
      ]
    }
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api'
    }
  }
})
