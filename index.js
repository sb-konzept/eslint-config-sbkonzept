module.exports = {
  plugins: ['react-hooks'],
  extends: [
    './base',
    'eslint-config-airbnb/rules/react',
    'eslint-config-airbnb/rules/react-a11y',
    './rules'
  ].map(require.resolve),
  rules: {}
}
