module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'eslintreact/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'react/button-has-type': 0,
    'comma-dangle': 0,
    'func-names': 0,
    'prefer-spread': 0,
    'consistent-return': 0,
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'no-console': 0,
<<<<<<< HEAD
    'linebreak-style': ['error', 'windows'],
=======
    'no-shadow': 0,
    'no-unused-vars': 0,
    'import/prefer-default-export': 0,
>>>>>>> upstream/master
  },
};
