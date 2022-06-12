import fs from 'fs';
import { logErr } from '../utils/utils.mjs';

const read = (file) => {
  const stream = fs.createReadStream(file);
  stream.on('data', (chunk) => {
    process.stdout.write(`'${chunk}'\n`);
  });
  stream.on ('error', (err) => {
    logErr(err);
  });
};

export default read;