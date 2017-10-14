const path = require('path');

const getPrefix = (base, filename) => {

  const parts = path.relative(base, filename).split(path.sep);
  const doubleDots = parts.filter(part => part === '..');

  parts.splice(0, doubleDots.length * 2);

  return parts
    .map(part => part.replace('.md', ''))
    .filter(part => part !== 'readme')
    .join('-');

};

module.exports = {
  getPrefix
};
