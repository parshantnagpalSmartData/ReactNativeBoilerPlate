module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended','@react-native-community'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  parser: 'babel-eslint',
  rules: {
    indent: ['off', 2],
    'linebreak-style': ['error', 'unix'],
    'react/prop-types': 0,
    quotes: ['error', 'double'],
    semi: ['error', 'always'],
    'no-case-declarations': 0,
  },
};
