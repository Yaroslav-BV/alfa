import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import ora from 'ora'
import prompts from 'prompts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function runCommand(command, description) {
  const spinner = ora(description).start()
  try {
    execSync(command, { stdio: 'ignore' })
    spinner.succeed(`${description} - Done`)
  } catch (error) {
    spinner.fail(`${description} - Failed`)
    console.error(error.message)
  }
}

async function setupRepository() {
  console.log('\n📦 Setting up your repository...\n')

  const huskyPath = path.join(process.cwd(), '.husky/_')
  if (!fs.existsSync(huskyPath)) {
    runCommand('npx husky install', 'Installing Husky')
  } else {
    console.log('✅ Husky is already installed, skipping.')
  }

  const response = await prompts({
    type: 'multiselect',
    name: 'tasks',
    message: 'Select the setup steps you want to perform:',
    hint: 'Press Space to select, Enter to confirm.',
    choices: [
      { title: 'Install Turbo CLI globally', value: 'installTurbo', selected: false },
      { title: 'Install NestJS CLI globally', value: 'installNestCLI', selected: false },
      { title: 'Install Commitizen globally', value: 'installCommitizen', selected: false },
      { title: 'Disable Turbo telemetry', value: 'disableTelemetry', selected: false },
    ],
    instructions: false,
  })

  if (response.tasks.includes('installTurbo')) {
    runCommand('npm install -g turbo', 'Installing Turbo CLI')
  }

  if (response.tasks.includes('installNestCLI')) {
    runCommand('npm install -g @nestjs/cli', 'Installing NestJS CLI')
  }

  if (response.tasks.includes('installCommitizen')) {
    runCommand('npm install -g commitizen', 'Installing Commitizen globally')
  }

  if (response.tasks.includes('disableTelemetry')) {
    runCommand('npx turbo telemetry disable', 'Disabling Turbo telemetry')
  }

  console.log('\n🎉 Repository setup is complete!\n')
}

setupRepository()
