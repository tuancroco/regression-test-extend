#!/usr/bin/env node
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const postInstallPath = pathToFileURL(path.join(__dirname, 'generate_tests.js'));
if (fs.existsSync(postInstallPath)) {
  console.log(chalk.yellow('generate folder visual_tests ...'));
  await import(postInstallPath);
} else {
  console.log(chalk.red('generate_tests.js not found!'));
}
