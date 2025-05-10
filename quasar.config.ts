// quasar.config.ts
import { configure } from 'quasar/wrappers';
import { fileURLToPath } from 'node:url';

// Make the configure function async to handle dynamic imports
export default configure(async (ctx) => {
  // Use dynamic imports for the plugins
  const AutoImport = (await import('unplugin-auto-import/vite')).default;
  const Components = (await import('unplugin-vue-components/vite')).default;
  const { QuasarResolver } = await import('unplugin-vue-components/resolvers');

  return {
    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: ['i18n', 'axios', 'firebase'],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#css
    css: ['app.scss'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v7',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#build
    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },

      typescript: {
        strict: true,
        vueShim: true,
      },

      vueRouterMode: 'hash', // available values: 'hash', 'history'

      vitePlugins: [
        [
          '@intlify/unplugin-vue-i18n/vite',
          {
            ssr: ctx.modeName === 'ssr',
            include: [fileURLToPath(new URL('./src/i18n', import.meta.url))],
          },
        ],

        // Use the AutoImport directly for better TypeScript support
        AutoImport({
          // targets to transform
          include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/, // .vue
            /\.vue\?vue/, // .vue
          ],

          // global imports to register
          imports: [
            // presets
            'vue',
            'vue-router',
            'pinia',
            // custom Quasar imports
            {
              quasar: [
                'useQuasar',
                'Cookies',
                'LocalStorage',
                'SessionStorage',
                'Dialog',
                'Notify',
                'Loading',
                // add more Quasar APIs as needed
              ],
            },
          ],

          dts: './auto-imports.d.ts',

          eslintrc: {
            enabled: true,
            filepath: './.eslintrc-auto-import.json',
            globalsPropValue: true,
          },
        }),

        Components({
          // relative paths to the directory to search for components
          dirs: ['src/components'],

          // valid file extensions for components
          extensions: ['vue'],

          // search for subdirectories
          deep: true,

          // resolvers for third-party components
          resolvers: [
            // auto import Quasar components
            QuasarResolver(),
          ],

          // generate TypeScript declaration
          dts: './components.d.ts',

          // Allow auto import and register components
          include: [/\.vue$/, /\.vue\?vue/],

          // exclude certain patterns
          exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/],
        }),
      ],
    },

    // Rest of your config remains the same
    devServer: {
      open: false,
    },

    framework: {
      config: {},
      plugins: [],
    },

    animations: [],

    ssr: {
      prodPort: 3000,
      middlewares: ['render'],
      pwa: false,
    },

    pwa: {
      workboxMode: 'GenerateSW',
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      preloadScripts: ['electron-preload'],
      inspectPort: 5858,
      bundler: 'packager',
      packager: {},
      builder: {
        appId: 'rdm-expense',
      },
    },

    bex: {
      extraScripts: [],
    },
  };
});
