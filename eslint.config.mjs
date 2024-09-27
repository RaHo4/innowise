import { defineConfig } from 'eslint-define-config'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import htmlPlugin from 'eslint-plugin-html'
import babelParser from '@babel/eslint-parser'

export default defineConfig([
  {
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-env'],
        },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
      },
    },
  },
  {
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
      html: htmlPlugin,
    },
  },
  {
    ignores: [
      'node_modules/',
      'build/',
      'build/',
      'webpack.config.js',
      'eslint.config.mjs',
    ],
  },
  {
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'off',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external', 'internal'],
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
        },
      ],
      'prettier/prettier': 'error',
    },
  },
  {
    rules: {
      'arrow-parens': 0,
      'no-alert': 'warn',
      'no-duplicate-imports': 'error',
    },
  },
  {
    rules: {
      'no-console': 1,
      'import/no-unresolved': [0, { commonjs: true, amd: true }],
      'import/named': 0,
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 0,
      'import/namespace': 0,
      'import/default': 0,
      'import/export': 0,
    },
  },
])
