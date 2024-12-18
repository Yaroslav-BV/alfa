module.exports = {
  '{src,test}/**/*.ts': [() => 'npm run check-types', 'npm run lint:fix'],
}
