#!/usr/bin/env node
import chalk from 'chalk';

const args = process.argv.slice(2);
let commandBase = `tsx ${getLibraryPath()}/src/index.ts`;

const command = `${commandBase} --command test --ref ${args.slice(1).join(' ')}`;
console.log(chalk.yellow(`Running command: ${command}`));
