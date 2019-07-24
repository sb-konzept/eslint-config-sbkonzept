module.exports = {
  plugins: ['react-hooks', 'simple-import-sort'],
  extends: [
    './base',
    'eslint-config-airbnb/rules/react',
    'eslint-config-airbnb/rules/react-a11y',
    './rules'
  ].map(require.resolve),
  rules: {}
}
