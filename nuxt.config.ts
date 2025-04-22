// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", '@pinia/nuxt', '@nuxtjs/supabase', '@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],
  supabase: {
    redirectOptions: {
      login: '/auth/sign-in',
      callback: '/home',
      exclude: ['/auth/**'] // 👈 rutas que no requieren autenticación
    },
  },
  pinia: {
    storesDirs: ['./store/**'],
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: '%s Logi Appointment',
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  pages: true,
  $development: {
    app: {
      head: {
        title: 'DEV'
      }
    }
  },

  $test: {
    app: {
      head: {
        title: 'STAGING'
      }
    }
  },
  compatibilityDate: '2025-02-20',
  i18n: {
    locales: [{
      code: 'es',
      name: 'Spanish',
      file: 'es.json'
    }, {
      code: 'en',
      name: 'English',
      file: 'en.json'
    }],
    defaultLocale: 'es',
    strategy: 'prefix_and_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieCrossOrigin: false,
      cookieSecure: false,
      alwaysRedirect: true,
      fallbackLocale: 'es',
      cookieKey: 'i18n_redirected',
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
  }
})