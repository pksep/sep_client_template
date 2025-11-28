#!/usr/bin/env node
import prompts from 'prompts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const main = async () => {
  const { pm: packageName } = await prompts({
    type: 'select',
    name: 'pm',
    message: 'Which package manager do you want to use?',
    choices: [
      { title: 'npm', value: 'npm' },
      { title: 'pnpm', value: 'pnpm' },
      { title: 'yarn', value: 'yarn' },
      { title: 'bun', value: 'bun' }
    ]
  });

  if (!packageName) {
    console.log('Package manager is required');
    return;
  }

  const { name: nameProject } = await prompts({
    type: 'text',
    name: 'name',
    message: 'Enter the name of the project'
  });

  if (!nameProject) {
    console.log('Project name is required');
    return;
  }

  // Путь до шаблона внутри пакета
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const templateDir = path.join(__dirname, 'template');

  let targetDir = process.cwd();

  if (fs.existsSync(nameProject)) {
    console.log(`dir with name '${nameProject}' arledy exist`);
    return;
  }

  fs.mkdirSync(nameProject);

  targetDir = path.join(process.cwd(), nameProject);
  // Переходим в созданную директорию
  process.chdir(targetDir);

  copyRecursive(templateDir, targetDir);

  console.log('Project created');

  try {
    execSync(`${packageName} install`, { stdio: 'inherit' });
    console.log('✔ Dependencies installed!');
  } catch (e) {
    console.log(
      '⚠ Failed to install dependencies. You can run the command manually.'
    );
  }
};

// Копирование файлов
function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const file of fs.readdirSync(src)) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

main();
