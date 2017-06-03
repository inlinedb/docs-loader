const loaderUtils = require('loader-utils');
const path = require('path');

const defaultOptions = {
  docsDirectory: 'docs'
};

const getPaths = function (context) {

  const options = Object.assign(
    {},
    defaultOptions,
    loaderUtils.getOptions(context)
  );

  if (!options.basePath) {

    throw new Error('An absolute base path is required in the loader options.');

  }

  const filename = loaderUtils.getCurrentRequest(context).split('!').pop();
  const currentPath = path.dirname(filename);

  const basePath = path.join(options.basePath, options.docsDirectory);

  return {
    basePath,
    currentPath,
    filename
  };

};

module.exports = {
  getPaths
};
