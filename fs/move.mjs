import fs from 'fs';
import { unlink } from 'fs/promises';
import path from 'path';
import { ifExist, logErr } from '../utils/utils.mjs';

const moveFile = (file, dir) => {
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

export default moveFile;