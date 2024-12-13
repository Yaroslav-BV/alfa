import baseConfig from '@repo/lint-staged-config'

export default {
  ...baseConfig,
  '**/*!(package*).{js,json,*rc}': ['prettier --write'],
}
