import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

async function updatePackageJson() {
  const packageJsonPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'package.json');
  const packageJsonText = fs.readFileSync(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonText);

  const scripts = packageJson.scripts || {};
  scripts.ref = 'regressify-cli ref';
  scripts.approve = 'regressify-cli approve';
  scripts.test = 'regressify-cli test';

  packageJson.scripts = scripts;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

updatePackageJson().catch((err) => console.error('Error:', err));
