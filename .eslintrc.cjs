module.exports = {
  env: { browser: true, node: true, jest: true },
  globals: { testUtils: 'readonly', global: 'readonly' },
  extends: ['eslint:recommended'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    'no-undef': 'warn',
    'no-unused-vars': 'warn',
  },
};
