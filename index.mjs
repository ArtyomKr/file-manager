import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  createDir,
  exit,
  goTo,
  goUp,
  parseUser,
  list,
  read,
  createFile,
  renameFile,
  logErr,
  copyFile, moveFile, deleteFile, getEOL, getCPU, getHomedir, getUser, getArch
} from './utils/utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const fileManagerCli = async () => {
  const username = parseUser();
  const workingDir = await createDir(username, __dirname);
  process.chdir(workingDir);

  console.log('\x1b[33m%s\x1b[0m', `Welcome to the File Manager, ${username}!`);
  console.log(`You are currently in ${process.cwd()}`);

  process.stdin.on('data', data => {
    const [command, ...args] = data.toString().trim().split(' ');
    try {
      if (command === '.exit') exit(username);
      if (command === 'up') goUp(workingDir);
      if (command === 'cd') goTo(workingDir, args.join(' '));
      if (command === 'ls') list();
      if (command === 'cat') read(args.join(' '));
      if (command === 'add') createFile(args.join(' '));
      if (command === 'rn') renameFile(args[0], args[1]);
      if (command === 'cp') copyFile(args[0], args[1]);
      if (command === 'mv') moveFile(args[0], args[1]);
      if (command === 'rm') deleteFile(args.join(' '));
      if (command === 'os' && args[0] === '--EOL') getEOL();
      if (command === 'os' && args[0] === '--cpus') getCPU();
      if (command === 'os' && args[0] === '--homedir') getHomedir();
      if (command === 'os' && args[0] === '--username') getUser();
      if (command === 'os' && args[0] === '--architecture') getArch();
    } catch (err) {
      logErr(err);
    }
  });
}

fileManagerCli();