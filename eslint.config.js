
import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import ts from 'typescript-eslint';

export default ts.config(
  {
    ignores: ['*.d.ts', '**/coverage', '**/dist', 'node_modules/**'],
  },
  {
    extends: [
      js.configs.recommended,
      ...ts.configs.recommended,
      ...vue.configs['flat/recommended'],
    ],
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: ts.parser,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      indent: ['error', 2],
      'object-curly-newline': ['error', 'always'],
      'object-curly-spacing': ['error', 'always', {
        'arraysInObjects': false,
        'objectsInObjects': false,
      }],
      'space-in-parens': ['error', 'never'],
      'block-spacing': ['error', 'always'],
      'brace-style': ['error', 'stroustrup', {
        'allowSingleLine': true,
      }],
      curly: ['error', 'all'],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', {
        'before': false, 'after': true,
      }],
      'keyword-spacing': ['error', {
        'before': true, 'after': true,
      }],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'vue/singleline-html-element-content-newline': ['error', {
        'ignoreWhenNoAttributes': true,
        'ignoreWhenEmpty': true,
        'ignores': ['pre', 'textarea'],
        'externalIgnores': [],
      }],
      'vue/max-attributes-per-line': ['error', {
        'singleline': {
          'max': 3,
        },
        'multiline': {
          'max': 1,
        },
      }],
      'vue/attributes-order': ['error', {
        'order': [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        'alphabetical': true,
      }],
    },
  },
);
