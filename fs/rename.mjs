import { rename } from 'fs/promises';
import { ifExist, logErr } from '../utils/utils.mjs';

const renameFile = (file, newName) => {
  if (!ifExist(file)) throw new Error('Path does not exist');
  rename(file, newName).catch((err) => logErr(err));
};

export default renameFile;