module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:react/recommended', 'prettier'],
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error'
  },
};
