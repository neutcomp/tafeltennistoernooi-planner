// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Tafeltennis Toernooi Planner!',
      meta: [
        { name: 'description', content: 'Welkom bij de Tafeltennis Toernooi Planner. Alles om je tafeltennis toernooi te organiseren.' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
        },
      ],
      script: [
        {
          type: 'text/javascript',
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js',
        },
        {
          type: 'text/javascript',
          src: 'https://code.jquery.com/jquery-3.7.1.min.js',
        },
      ],
    },
  },
  css: ['~/assets/css/tailwind.css'],
  // typescript: {
  //   shim: false
  // },
  devtools: { enabled: false },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['nuxt-icon'],
  runtimeConfig: {
    DB_SERVER: process.env.DB_SERVER,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
  }
})