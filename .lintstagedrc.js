export default {
  '**/package.json': ['npx -y sort-package-json'],
  '**/*!(package*).{js,json,*rc}': ['prettier --write'],
}
