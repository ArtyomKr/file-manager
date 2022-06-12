import fs from 'fs';

export function ifExist (file) {
  return fs.existsSync(file)
}

export const logErr = (err) =>  {
  console.error('\x1b[31m%s\x1b[0m', `Operation fail. Message:\n${err.message}`);
}

export const parseUser = () => {
  const userName = process.argv.find((item) => item.startsWith('--username'));
  return userName ? userName.match(/(?<==)\w+/).toString() : 'unknown user';
};