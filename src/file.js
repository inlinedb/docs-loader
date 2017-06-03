const loaderUtils = require('loader-utils');
const path = require('path');

const getPaths = function (context) {

  const options = loaderUtils.getOptions(context);

  const filename = loaderUtils.getCurrentRequest(context).split('!').pop();
  const currentPath = path.dirname(filename);

  const basePath = path.join(options.basePath, 'docs');

  return {
    basePath,
    currentPath,
    filename
  };

};

module.exports = {
  getPaths
};
