module.exports = {
  extends: ['plugin:prettier/recommended', 'prettier/react'],
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, semi: false, arrowParens: 'always' }
    ]
  }
}
