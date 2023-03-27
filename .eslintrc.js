module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // 'no-console': ['error', { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-namespace': 'off',
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'no-return-await': 'off',
    'class-methods-use-this': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'max-classes-per-file': 'off',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/prefer-default-export': 'off',
    'func-names': ['error', 'never'],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Function: false,
        },
        extendDefaults: true,
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
