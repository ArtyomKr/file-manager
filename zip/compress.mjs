import fs from 'fs';
import { createBrotliCompress } from 'zlib';
import { logErr } from '../utils/utils.mjs';

const compress = (file, dir) => {
  const gzip = createBrotliCompress();
  const source = fs.createReadStream(file);
  source.on ('error', (err) => {
    logErr(err);
  });
  const destination = fs.createWriteStream(dir);
  destination.on ('error', (err) => {
    logErr(err);
  });
  source.pipe(gzip).pipe(destination);
};

export default compress;