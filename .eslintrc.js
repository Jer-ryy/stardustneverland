module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    'react',
  ],
  ignorePatterns: [
    'react/output/**', 
    'public/react/**'
  ],
  rules: {
    'func-names': 'off',
    'prefer-arrow-callback': 'off',
    'no-console': 'error',
    'react/react-in-jsx-scope': 'off',
    'no-shadow': 'off',
    'no-undef': 'off',
    'react/jsx-no-useless-fragment': 'off'
  },
};
