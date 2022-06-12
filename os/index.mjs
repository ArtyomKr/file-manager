import { cpus, EOL, homedir, platform, userInfo } from 'os';

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