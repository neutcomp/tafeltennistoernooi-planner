// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Tafeltennis Toernooi Planner!',
      meta: [
        {
          name: 'description',
          content: 'Welkom bij de Tafeltennis Toernooi Planner. Alles om je tafeltennis toernooi te organiseren.',
        },
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
  auth: {
    provider: {
      type: 'authjs',
    },
    // globalAppMiddleware: {
    //   isEnabled: true,
    // },
  },
  modules: ['nuxt-icon', 'dayjs-nuxt', 'nuxt-server-utils', '@sidebase/nuxt-auth'],
  typescript: {
    shim: false,
  },
  runtimeConfig: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_URL: process.env.AUTH_SECRET,
    NEXTAUTH_SECRET: process.env.AUTH_SECRET,
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_FROM: process.env.EMAIL_FROM,
  },
});
