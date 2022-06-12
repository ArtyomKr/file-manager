import path from 'path';
import { mkdir, readdir, rename, unlink } from 'fs/promises';
import fs from 'fs';
import { EOL, cpus, homedir, userInfo, platform } from 'os';

function checkIfSubDir (parent, dir) {
  const relative = path.relative(parent, dir);
  return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
}

function ifExist (file) {
  return fs.existsSync(file)
}

export const logErr = (err) =>  {
  console.error('\x1b[31m%s\x1b[0m', `Operation fail. Message:\n${err.message}`);
}

export const parseUser = () => {
  const userName = process.argv.find((item) => item.startsWith('--username'));
  return userName ? userName.match(/(?<==)\w+/).toString() : 'unknown user';
};

export const createDir = async (username) => {
  const workingDir = path.join(process.cwd(), `./${username}`);
  try {
    await mkdir(workingDir);
  } catch (err) {}

  return workingDir;
};

export const exit = (username) => {
  console.log(`Thank you for using File Manager, ${username}!`);
  process.exit();
}

export const goUp = (workingDir) => {
  if (process.cwd() !== workingDir) {
    process.chdir('..');
    console.log(`You are currently in ${process.cwd()}`);
  } else console.log(`You cannot go above root directory!`);
}

export const goTo = (parentDir, dir) => {
  if (checkIfSubDir(parentDir, dir)) {
    path.isAbsolute(dir) ? process.chdir(dir) : process.chdir(path.join(parentDir, dir));
    console.log(`You are currently in ${process.cwd()}`);
  } else console.log(`You cannot go above root directory!`);
}

export const list = async () => {
  const dirFiles = await readdir(process.cwd());
  for (const file of dirFiles) console.log('\x1b[5m%s\x1b[0m', file);
};

export const read = async (file) => {
  const stream = fs.createReadStream(file);
  stream.on('data', (chunk) => {
    process.stdout.write(chunk + '\n');
  });
  stream.on ('error', (err) => {
    logErr(err);
  });
};

export const createFile = async (file) => {
  const stream = fs.createWriteStream(file);
  stream.write('');
  stream.on ('error', (err) => {
    logErr(err);
  });
};

export const renameFile = (file, newName) => {
  if (!ifExist(file)) throw new Error('Path does not exist');
  rename(file, newName).catch((err) => logErr(err));
};

export const copyFile = (file, dir) => {
  try {
    if (!ifExist(file) || !ifExist(dir)) throw new Error('Path does not exist');
    const readStream = fs.createReadStream(file);
    readStream.on ('error', (err) => {
      logErr(err);
    });

    const writeStream = fs.createWriteStream(path.join(dir, path.basename(file)));
    writeStream.on ('error', (err) => {
      logErr(err);
    });

    readStream.pipe(writeStream);
  } catch (err) {
    logErr(err);
  }
};

export const moveFile = (file, dir) => {
  try {
    if (!ifExist(file) || !ifExist(dir)) throw new Error('Path does not exist');
    const readStream = fs.createReadStream(file);
    readStream.on ('error', (err) => {
      logErr(err);
    });

    const writeStream = fs.createWriteStream(path.join(dir, path.basename(file)));
    writeStream.on ('error', (err) => {
      logErr(err);
    });

    readStream.pipe(writeStream).on ('finish', () => {
      unlink(file);
    });
  } catch (err) {
    logErr(err);
  }
};

export const deleteFile = (file) => {
  unlink(file).catch((err) => logErr(err));
};

export const getEOL = () => {
  console.log(JSON.stringify(EOL));
};

export const getCPU = () => {
  const parsed = cpus().map(obj => `Name: ${obj.model}\nClock rate: ${obj.speed}\n`)
  console.log(`Number of CPUs: ${parsed.length}\n${parsed.join('')}`);
};

export const getHomedir = () => {
  console.log(`Home directory: ${homedir()}`);
};

export const getUser = () => {
  console.log(`User name: ${userInfo().username}`);
};

export const getArch = () => {
  console.log(`Architecture: ${platform()}`);
};
