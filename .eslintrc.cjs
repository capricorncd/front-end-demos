/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/01/16 15:17:15 (GMT+0900)
 */
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'arrow-spacing': 'error',
    'block-spacing': 'error',
    'brace-style': 'error',
    'comma-dangle': ['error', 'only-multiline'],
    'comma-spacing': 'error',
    'comma-style': ['error', 'last'],
    'curly': ['error', 'multi-line', 'consistent'],
    'eol-last': 'error',
    'func-call-spacing': 'error',
    'function-call-argument-newline': ['error', 'consistent'],
    'function-paren-newline': ['error', 'consistent'],
    'indent': ['error', 2],
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'linebreak-style': ['error', 'unix'],
    'no-extra-semi': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-spaces': 'error',
    'no-redeclare': ['error', { builtinGlobals: false }],
    'no-trailing-spaces': 'error',
    'no-unused-vars': 'off',
    'no-whitespace-before-property': 'error',
    'object-curly-newline': ['error', { consistent: true, multiline: true }],
    // https://eslint.org/docs/latest/rules/object-curly-spacing
    'object-curly-spacing': ['error', 'always'],
    'operator-linebreak': ['error', 'before'],
    'quote-props': ['error', 'consistent-as-needed'],
    'quotes': [2, 'single'],
    'semi': ['error', 'never'],
    'semi-spacing': 'error',
    'semi-style': ['error', 'last'],
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'switch-colon-spacing': 'error',
    'template-curly-spacing': ['error', 'never'],
    'unicode-bom': 'error',
  },
  globals: {
    // method or global variable
    // readonlyMethodOrVariable: "readonly",
    // writableMethodOrVariable: "writable"
  },
  overrides: [
    {
      files: ['*.json'],
      rules: {
        quotes: ['error', 'double']
      }
    }
  ]
}
