// eslint.config.js
export default [
  {
    // Files to lint
    files: ['./src/**/*.{ts,js,mjs,cjs,vue}'],

    // Files to ignore
    ignores: ['**/node_modules/**', '**/dist/**', 'auto-imports.d.ts', 'components.d.ts'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Auto-imported APIs
        ref: 'readonly',
        computed: 'readonly',
        reactive: 'readonly',
        watch: 'readonly',
        watchEffect: 'readonly',
        onMounted: 'readonly',
        onUnmounted: 'readonly',
        onBeforeMount: 'readonly',
        onBeforeUnmount: 'readonly',
        nextTick: 'readonly',
        useAttrs: 'readonly',
        useRoute: 'readonly',
        useRouter: 'readonly',
        useQuasar: 'readonly',
        defineStore: 'readonly',
        storeToRefs: 'readonly',
      },
    },

    rules: {
      semi: ['error', 'never'],
      'no-trailing-spaces': ['error'],
      // For Vue components specifically
      'vue/no-unused-components': 'off',
      // For TypeScript unused imports
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^([_]|[A-Z]\\w+$)',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^([_]|[A-Z]\\w+$)',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      'eol-last': ['error', 'never'],
    },
  },
];
