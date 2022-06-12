import path from 'path';
import { readdir } from 'fs/promises';

export const goUp = () => {
  process.chdir('..');
  console.log(`You are currently in ${process.cwd()}`);
}

export const goTo = (parentDir, dir) => {
  path.isAbsolute(dir) ? process.chdir(dir) : process.chdir(path.join(parentDir, dir));
  console.log(`You are currently in ${process.cwd()}`);
}

export const list = async () => {
  const dirFiles = await readdir(process.cwd());
  for (const file of dirFiles) console.log('\x1b[5m%s\x1b[0m', file);
};