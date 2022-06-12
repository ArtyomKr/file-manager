import copyFile from './fs/copy.mjs';
import createFile from './fs/create.mjs';
import deleteFile from './fs/delete.mjs';
import moveFile from './fs/move.mjs';
import read from './fs/read.mjs';
import renameFile from './fs/rename.mjs';
import calculateHash from './hash/index.mjs';
import { getArch, getCPU, getEOL, getHomedir, getUser } from './os/index.mjs';
import { parseUser, logErr } from './utils/utils.mjs';
import { homedir } from 'os';
import { goTo, goUp, list } from './nav/nav.mjs';
import compress from './zip/compress.mjs';
import decompress from './zip/decompress.mjs';

const fileManagerCli = () => {
  const username = parseUser();
  const workingDir = homedir();
  process.chdir(workingDir);

  console.log('\x1b[33m%s\x1b[0m', `Welcome to the File Manager, ${username}!`);
  console.log(`You are currently in ${process.cwd()}`);

  process.stdin.on('data', data => {
    const [command, ...args] = data.toString().trim().split(' ');
    try {
      if (command === '.exit') process.exit();
      else if (command === 'up') goUp(workingDir);
      else if (command === 'cd') goTo(workingDir, args.join(' '));
      else if (command === 'ls') list();
      else if (command === 'cat') read(args.join(' '));
      else if (command === 'add') createFile(args.join(' '));
      else if (command === 'rn') renameFile(args[0], args[1]);
      else if (command === 'cp') copyFile(args[0], args[1]);
      else if (command === 'mv') moveFile(args[0], args[1]);
      else if (command === 'rm') deleteFile(args.join(' '));
      else if (command === 'os' && args[0] === '--EOL') getEOL();
      else if (command === 'os' && args[0] === '--cpus') getCPU();
      else if (command === 'os' && args[0] === '--homedir') getHomedir();
      else if (command === 'os' && args[0] === '--username') getUser();
      else if (command === 'os' && args[0] === '--architecture') getArch();
      else if (command === 'hash') calculateHash(args.join(' '));
      else if (command === 'compress') compress(args[0], args[1]);
      else if (command === 'decompress') decompress(args[0], args[1]);
      else console.log('\x1b[31m%s\x1b[0m', 'Invalid input ');
    } catch (err) {
      logErr(err);
    }
  });
  process.on('exit', () => {
    console.log(`Thank you for using File Manager, ${username}!`);
  });
  process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${username}!`);
  });
}

fileManagerCli();