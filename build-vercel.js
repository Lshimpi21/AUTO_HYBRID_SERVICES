#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function run(command, cwd = __dirname) {
  console.log(`Running: ${command}`);
  try {
    execSync(command, { 
      cwd,
      stdio: 'inherit',
      shell: true
    });
    console.log(`✓ Completed: ${command}\n`);
  } catch (error) {
    console.error(`✗ Failed: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

console.log('🔨 Building for Vercel...\n');

// Change to client directory
const clientDir = path.join(__dirname, 'client');

// Install dependencies
console.log('📦 Installing client dependencies...');
run('npm ci', clientDir);

// Build React app
console.log('🔨 Building React app...');
run('npm run build', clientDir);

console.log('✅ Build complete!\n');
console.log('Output directory: client/build');
