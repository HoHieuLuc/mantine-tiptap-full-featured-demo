module.exports = {
    root: false,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:jest/recommended',
    ],
    plugins: [
        '@typescript-eslint',
        'react',
        'testing-library',
        'jest',
    ],
    env: {
        browser: true,
        es6: true,
        node: true
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect'
        }
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module'
    },
    ignorePatterns: [
        '.eslintrc.cjs',
        'vite.config.ts',
        'jest.*.ts',
    ],
    overrides: [
        {
            files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
            extends: ['plugin:testing-library/react'],
            rules: {
                '@typescript-eslint/no-unsafe-call': 'off',
            },
        },
    ],
    rules: {
        '@typescript-eslint/semi': [
            'error'
        ],
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_'
            }
        ],
        '@typescript-eslint/no-explicit-any': 1,
        '@typescript-eslint/no-unsafe-argument': 1,
        'no-case-declarations': 0,
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 0,
        'no-duplicate-imports': [
            'error',
            {
                includeExports: true
            }
        ],
        'indent': [
            'error',
            4,
            {
                'SwitchCase': 1
            }
        ],
        'quotes': [
            'error',
            'single',
            {
                'allowTemplateLiterals': true
            }
        ],
        'jsx-quotes': [
            'error',
            'prefer-single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'eqeqeq': [
            'error',
            'always'
        ],
        'no-unused-vars': [
            'warn',
            {
                'argsIgnorePattern': '^_'
            }
        ],
        'object-curly-spacing': [
            'error',
            'always'
        ],
        'arrow-spacing': [
            'error',
            {
                'before': true,
                'after': true
            }
        ],
        'no-console': 'warn',
    },
};