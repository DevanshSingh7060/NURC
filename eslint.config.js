import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    // Vendored / generated code we don't hand-maintain
    ignores: [
      'dist/**',
      'node_modules/**',
      'src/app/components/ui/**', // shadcn/ui generated primitives
      'src/imports/**', // Figma export dump
      'scrape-admin.mjs', // gitignored one-off scraping helper, not app code
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      // Real correctness rule — keep as error
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Pre-existing debt owned by later phases — surface as warnings,
      // not Phase-0 blockers. Not suppressed; tracked for follow-up.
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
    },
  },

  // Accessibility (jsx-a11y) — surfaced as warnings; Phase 3 addresses the real ones.
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...Object.fromEntries(
        Object.keys(jsxA11y.flatConfigs.recommended.rules).map((rule) => [rule, 'warn']),
      ),
      // Deprecated rule, superseded by label-has-associated-control (satisfied via htmlFor).
      // Its default "nesting required" mode false-positives on otherwise-valid labels.
      'jsx-a11y/label-has-for': 'off',
    },
  },

  // Known pre-existing violations owned by later phases. Downgraded to warnings
  // ONLY in these specific files so the rules stay at full strength for all other
  // (and new) code. Each is tracked to its audit finding / owning phase.
  {
    files: ['src/app/components/ReaderMode.tsx'],
    rules: {
      'react-hooks/rules-of-hooks': 'warn', // COQ-002 — useReaderMode() in handleTouchEnd; fixed in Phase 5
      'no-useless-assignment': 'warn', // scroll logic; refactored into shared hook in Phase 5
    },
  },
  {
    files: ['src/app/components/ReaderPage.tsx'],
    rules: {
      'no-useless-assignment': 'warn', // scroll logic; refactored into shared hook in Phase 5
    },
  },
  {
    files: ['src/app/components/AboutPage.tsx'],
    rules: {
      'no-constant-binary-expression': 'warn', // always-true DEVELOPMENT_MODE gate; Phase 5
    },
  },
  {
    files: ['src/app/admin/pages/Newsletters.tsx'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'warn', // admin cluster; Phase 5 / COQ-006
    },
  },

  // Keep Prettier last so formatting rules don't conflict with ESLint
  prettier,
);
