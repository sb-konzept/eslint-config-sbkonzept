module.exports = {
  plugins: ['react-hooks'],
  extends: [
    './base',
    'eslint-config-airbnb/rules/react',
    'eslint-config-airbnb/rules/react-a11y'
  ].map(require.resolve),
  rules: {
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['A'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton']
      }
    ],
    'react/forbid-prop-types': [
      'error',
      {
        forbid: ['any', 'array']
      }
    ],
    'react/jsx-one-expression-per-line': false,
    // only .jsx files may have JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'react/prop-types': false,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
}
