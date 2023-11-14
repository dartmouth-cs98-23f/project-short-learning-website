// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro',
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/devtools',
    '@nuxt/image',
    '@nuxtjs/plausible',
    '@nuxtjs/fontaine',
    '@nuxtjs/google-fonts',
    '@nuxthq/studio',
    '@vueuse/nuxt',
    'nuxt-og-image'
  ],
  routeRules: {
    // Pre-render
    '/api/search.json': { prerender: true },
    // '/sitemap.xml': { prerender: true },
    // Redirects
    '/docs': { redirect: '/docs/architecture', prerender: false }
    
  },
  nitro: {
    prerender: {
      // failOnError: false
    },
    hooks: {
      'prerender:generate' (route) {
        // TODO: fix issue with recursive fetches with query string, e.g.
        // `/enterprise/agencies?region=europe&amp;amp;amp;service=ecommerce&amp;amp;service=ecommerce&amp;service=content-marketing`
        if (route.route?.includes('&amp;')) {
          route.skip = true
        }
      }
    }
  },
  $development: {
    runtimeConfig: {
      public: {
        website: {
          url: 'http://localhost:3000'
        }
      }
    }
  },
  colorMode: {
    preference: 'dark'
  },
  fontMetrics: {
    fonts: ['DM Sans']
  },
  googleFonts: {
    display: 'swap',
    download: true,
    families: {
      'DM+Sans': [400, 500, 600, 700]
    }
  },
  ui: {
    icons: ['simple-icons', 'ph', 'uil', 'heroicons', 'octicon', 'logos']
  },
  content: {
    navigation: {
      fields: ['titleTemplate']
    },
    highlight: {
      preload: [
        'bash',
        'css',
        'diff',
        'html',
        'ini',
        'javascript',
        'json',
        'markdown',
        'php',
        'python',
        'scss',
        'shell',
        'typescript',
        'yaml'
      ]
    }
  },
  typescript: {
    strict: false
  },
  experimental: {
    appManifest: true
  },
  devtools: {
    enabled: false
  }
})
