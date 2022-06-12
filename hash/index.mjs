import { createHash } from 'crypto';
import fs from 'fs';
import { logErr } from '../utils/utils.mjs';

const calculateHash = (file) => {
  const stream = fs.createReadStream(file);
  stream.on('data', (chunk) => {
    console.log(createHash('sha256').update(chunk).digest('hex'));
  });
  stream.on ('error', (err) => {
    logErr(err);
  });
};

export default calculateHash;