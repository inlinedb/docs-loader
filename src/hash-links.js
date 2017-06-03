const {hashPath, relativePath} = require('./regexps');
const {getPrefix} = require('./prefix');
const path = require('path');

const LINKED = 'linked';

const isHash = href => hashPath.test(href);
const isRelative = href => relativePath.test(href);

const setLink = ($element, currentPath, basePath) => {

  const href = $element.attr('href');

  const absoluteLink = path.join(currentPath, href.replace('#', path.sep));
  const relativeLink = getPrefix(basePath, absoluteLink);

  $element.attr('href', `#${relativeLink}`);
  $element.data(LINKED, true);

};

const handleRelativeLinks = function ($element, basePath, currentPath, relativeLinks) {

  const href = $element.attr('href');

  if (isRelative(href)) {

    setLink($element, currentPath, basePath);

    relativeLinks.add(href.split('#')[0]);

  }

};

const handleHashLinks = function ($element, basePath, filename) {

  const href = $element.attr('href');

  if (isHash(href) && !$element.data(LINKED)) {

    setLink($element, filename, basePath);

  }

};

const convertLinksToHash = ($, basePath, currentPath, filename) => {

  const relativeLinks = new Set();

  $('a')
    .each((i, elem) => {

      const $element = $(elem);

      handleRelativeLinks($element, basePath, currentPath, relativeLinks);
      handleHashLinks($element, basePath, filename);

    });

  return Array.from(relativeLinks);

};

module.exports = {
  convertLinksToHash
};
