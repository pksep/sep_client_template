// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import { globalIgnores } from 'eslint/config';
import {
  defineConfigWithVueTs,
  vueTsConfigs
} from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import pluginImport from 'eslint-plugin-import';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },

  globalIgnores([
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    '**/node_modules/**',
    '**/.storybook/**'
  ]),

  ...pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  pluginImport.flatConfigs.recommended,

  {
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.ts', '.js', '.vue']
        }
      }
    },

    rules: {
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'CONTENT',
            'GLOBAL',
            'UNIQUE',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'ATTR_STATIC',
            'ATTR_SHORTHAND_BOOL',
            'ATTR_DYNAMIC'
          ],
          alphabetical: true
        }
      ],

      'vue/html-self-closing': [
        'warn',
        {
          html: {
            void: 'any',
            normal: 'any',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }
      ],

      'vue/no-dupe-keys': [
        'warn',
        {
          groups: []
        }
      ],

      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-unsafe-optional-chaining': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'no-var': 'error',
      'prefer-const': 'warn',
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
          singleQuote: true,
          trailingComma: 'none',
          tabWidth: 2,
          useTabs: false,
          printWidth: 80,
          semi: true,
          bracketSpacing: true,
          arrowParens: 'avoid'
        }
      ]
    }
  },
  skipFormatting
);
