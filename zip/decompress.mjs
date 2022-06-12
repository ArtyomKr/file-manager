import fs from 'fs';
import { createBrotliDecompress } from 'zlib';
import { logErr } from '../utils/utils.mjs';

const decompress = (file, dir) => {
  const unzip = createBrotliDecompress();
  const source = fs.createReadStream(file);
  source.on ('error', (err) => {
    logErr(err);
  });
  const destination = fs.createWriteStream(dir);
  destination.on ('error', (err) => {
    logErr(err);
  });
  source.pipe(unzip).pipe(destination);
};

export default decompress;