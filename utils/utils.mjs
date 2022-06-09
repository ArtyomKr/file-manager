export const parseUser = () => {
  const userName = process.argv.find((item) => item.startsWith('--username'));
  return userName ? userName.match(/(?<==)\w+/).toString() : 'unknown user';
};
