import webpack from 'webpack'
require('dotenv').config()
const { ROOT_URL } = process.env
export default {
  mode: 'universal',
  ssr: true,
  components: true,

  env: {
    ROOT_URL,
  },
  head: {
    title: 'Reshelf | プログラミングのオンライン学習マーケットプレイス',
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Reshelfは、プログラミングのオンライン学習マーケットプレイスです。学びたい受講者と、教えたい講師をオンラインでつなぐお手伝いをします。',
      },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Reshelf' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'http://www.reshelf.jp/' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Reshelf | プログラミングのオンライン学習マーケットプレイス',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Reshelfは、プログラミングのオンライン学習マーケットプレイスです。学びたい受講者と、教えたい講師をオンラインでつなぐお手伝いをします。',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content:
          'https://res.cloudinary.com/Reshelf/image/upload/v1619870944/ogp_rzf3q1.png',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [],
  },

  loading: {
    color: '#16afaf',
    height: '5px',
  },
  // loading: '~/components/atoms/Loading.vue',

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: '404error',
        path: '*',
        component: resolve('@/pages/error/404.vue'),
      })
      routes.push({
        name: '500error',
        path: '*',
        component: resolve('@/pages/error/500.vue'),
      })
    },
  },

  css: [
    'ress',
    { src: '@/assets/sass/app.scss', lang: 'scss' },
    'boxicons/css/boxicons.min.css',
    {
      src: '~/node_modules/highlight.js/styles/tomorrow-night-bright.css',
      lang: 'css',
    },
  ],

  styleResources: {
    scss: [
      '~/assets/sass/foundation/_variables.scss',
      '~/assets/sass/foundation/_mixin.scss',
    ],
  },

  plugins: [
    '@/plugins/i18n.js',
    '@/plugins/vue-highlightjs',
    { src: '@/plugins/persistedstate.js', mode: 'client' },
    // mixins
    // '@/plugins/mixins/user.js',
    // '@/plugins/mixins/cart.js',
    // util
    '@/plugins/util/comma.js',
    '@/plugins/util/moneyFormat.js',
    '@/plugins/util/numberFormat.js',
  ],

  vendor: [
    'vue-i18n', // i18n
  ],

  proxy: {
    '/api': {
      target: process.env.ROOT_URL,
      changeOrigin: true,
    },
    '/sanctum': {
      target: process.env.ROOT_URL,
      changeOrigin: true,
    },
  },

  build: {
    vendor: ['lodash'],

    // 保存時にESlintの実行
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
    cache: true,
    parallel: true,
    hardSource: true,
    standalone: true,
    // analyze: true,

    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash',
      }),
    ],
  },
  // generate: {
  //   // i18n
  //   routes: ['/', '/ja'],
  // }

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/style-resources',
    '@nuxtjs/color-mode',
  ],
  modules: [
    '@nuxtjs/proxy',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    'nuxt-client-init-module',
    '@nuxtjs/axios',
  ],
  axios: {
    proxy: true,
    credentials: true,
  },
}
