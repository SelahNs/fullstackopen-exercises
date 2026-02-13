import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended, 
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',    // IMPORTANT: Backend uses 'require'
      globals: {
        ...globals.node,         // IMPORTANT: Allows 'process', 'console', etc.
      },
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      'no-console': 'off',
    },
  },
  {
    ignores: ['dist', 'node_modules'], 
  },
]