module.exports = {
    env: {
      node: true,
      commonjs: true,
      es2021: true
    },
    extends: [
      'eslint:recommended',
      'plugin:prettier/recommended'  
    ],
    parserOptions: {
      ecmaVersion: 'latest'
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-undef': 'error',
      'prettier/prettier': ['warn']
    }
  }
  