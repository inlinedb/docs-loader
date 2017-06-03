const cheerio = require('cheerio');
const {getLinkedModules} = require('./modules');
const {convertLinksToHash} = require('./hash-links');
const {getPaths} = require('./file');
const {highlight} = require('./highlighter');
const {idTitles} = require('./id-titles');
const markdown = require('markdown-it');

const md = markdown({
  highlight,
  html: true,
  linkify: true,
  typographer: true
});

module.exports = function (content) {

  this.cacheable();

  const {
    basePath,
    currentPath,
    filename
  } = getPaths(this);

  const html = md.render(content);
  const section = `<section id="wrapper" class="docs-section">${html}</section>`;
  const $html = cheerio.load(section);

  const links = convertLinksToHash($html, basePath, currentPath, filename);

  idTitles($html, basePath, filename);

  const template = $html.html();

  return `module.exports = 
    (${JSON.stringify({template})}).template + 
    ${getLinkedModules(links, currentPath)};
  `;

};
