#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function run(command, cwd = process.cwd()) {
  console.log(`Running: ${command}`);
  try {
    execSync(command, { 
      cwd,
      stdio: 'inherit',
      shell: true
    });
  } catch (error) {
    console.error(`Command failed: ${command}`);
    process.exit(1);
  }
}

console.log('Building Auto Hybrid Services...\n');

// Install root dependencies
console.log('Installing root dependencies...');
run('npm install');

// Install client dependencies
console.log('\nInstalling client dependencies...');
const clientDir = path.join(__dirname, 'client');
run('npm ci', clientDir);

// Build React app using npm script
console.log('\nBuilding React app...');
run('npm run build', clientDir);

console.log('\n✅ Build complete!');


