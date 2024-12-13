const baseConfig = require('@repo/lint-staged-config')

module.exports = {
  ...baseConfig,
  '**/*!(package*).{js,json,*rc}': ['prettier --write'],
}
