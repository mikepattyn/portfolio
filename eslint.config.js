import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', 'backend/**'],
  },
  eslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['src/**/*.js'],
    ignores: ['src/**/*.test.js'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['vite.config.js', 'src/**/*.test.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
];
