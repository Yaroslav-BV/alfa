export default {
  'src/**/*.{ts,tsx}': [() => 'npm run check-types', 'npm run lint:fix'],
  'src/**/*.css': ['npm run lint:style'],
}
