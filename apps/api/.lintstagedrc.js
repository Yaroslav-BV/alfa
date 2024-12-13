const baseConfig = require('@repo/lint-staged-config')

module.exports = {
  ...baseConfig,
  '{src,test}/**/*.ts': [() => 'npm run check-types', 'npm run lint:fix'],
}
