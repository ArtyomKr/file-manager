import  { dirname } from 'path';
import { fileURLToPath } from 'url';
import { parseUser} from './utils/utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const username = parseUser();

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${process.cwd()}`);
process.stdin.on('data', data => {
  if (data.toString().startsWith('.exit')) {
    console.log(`Thank you for using File Manager, ${username}!`);
    process.exit();
  }
  if (data.toString().startsWith('up')) {
    if (process.cwd() !== __dirname) {
      process.chdir('..');
      console.log(`You are currently in ${process.cwd()}`);
    } else console.log(`You are in root directory!`);
  }
});