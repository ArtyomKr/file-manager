import fs from 'fs';
import { logErr } from '../utils/utils.mjs';

const createFile = (file) => {
  const stream = fs.createWriteStream(file);
  stream.write('');
  stream.on ('error', (err) => {
    logErr(err);
  });
};

export default createFile;