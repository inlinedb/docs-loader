const fs = require('fs');
const path = require('path');

const loadedModules = new Set();

const getModule = (filePath, currentPath) => {

  let moduleName = filePath;

  if (fs.statSync(filePath).isDirectory()) {

    moduleName = path.join(filePath, 'readme.md');

  }

  return {
    absolutePath: path.resolve(moduleName),
    relativePath: `./${path.relative(currentPath, moduleName).replace(/\\+/g, '/')}`
  };

};

const convertToModules = (links, currentPath) =>
  links.map(link => getModule(path.resolve(currentPath, link), currentPath));

const hasLoadedModules = module => {

  if (!loadedModules.has(module.absolutePath)) {

    loadedModules.add(module.absolutePath);

    return true;

  }

  return false;

};

const getLinkedModules = (links, currentPath) =>
  convertToModules(links, currentPath)
    .filter(hasLoadedModules)
    .map(module =>
      `require('${module.relativePath}')`
    )
    .concat('""')
    .join(' + \n');

module.exports = {
  getLinkedModules
};
