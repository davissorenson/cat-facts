module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: ['./tsconfig.json'],
    },
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:react/recommended'
    ],
    rules: {
      'semi': 'off',
      // typescript uses semicolons in places like interface definitions
      '@typescript-eslint/semi': ['error', 'never'],
      'quotes': ['error', 'double', { 'allowTemplateLiterals': true }],
      'max-len': ['error', { 'code': 120 }]
    }
  };