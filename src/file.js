const loaderUtils = require('loader-utils');
const path = require('path');

const getPaths = function (context) {

  const options = loaderUtils.getOptions(context);

  const filename = loaderUtils.getCurrentRequest(context).split('!').pop();
  const currentFolder = path.dirname(filename);

  const docsFolder = path.join(options.basePath, 'docs');

  return {
    currentFolder,
    docsFolder,
    filename
  };

};

module.exports = {
  getPaths
};
