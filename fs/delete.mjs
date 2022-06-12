import { unlink } from 'fs/promises';
import { logErr } from '../utils/utils.mjs';

const deleteFile = (file) => {
  unlink(file).catch((err) => logErr(err));
};

export default deleteFile;