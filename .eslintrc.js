module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    es6: true,
    ecmaVersion: 6,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  env: {
    browser: true,
    node: true
  },
  rules: {
    'no-unused-vars': 0,
    'generator-star-spacing': 'off',
    'comma-dangle': ['error', 'never'],
    'class-methods-use-this': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/prefer-default-export': 'off',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'vue/multi-word-component-names': 0,
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        ignores: []
      }
    ],
    'vue/v-on-event-hyphenation': [
      'error',
      'never',
      {
        autofix: true,
        ignore: []
      }
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
        semi: false,
        trailingComma: 'none',
        printWidth: 130
      }
    ],
    semi: ['error', 'never']
  }
}
