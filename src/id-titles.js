const {getPrefix} = require('./prefix');

const kebab = text => text.toLowerCase().replace(/\s+/g, '-');
const getId = (prefix, text) => `${prefix}-${kebab(text)}`;

const idWrappers = ($, prefix) =>
  $('section#wrapper')
    .each((i, elem) => {

      $(elem).attr('id', prefix);

    });

const idH1s = ($, prefix) =>
  $('h1')
    .each((i, elem) => {

      if (i > 0) {

        const $element = $(elem);

        $element.attr('id', getId(prefix, $element.text()));

      }

    });

const idH2s = ($, prefix) =>
  $('h2')
    .each((i, elem) => {

      const $element = $(elem);

      $element.attr('id', getId(prefix, $element.text()));

    });

const idH3s = ($, prefix) =>
  $('h3')
    .each((i, elem) => {

      const $element = $(elem);

      $element.attr('id', getId(prefix, $element.text()));

    });

const idTitles = ($, basePath, filename) => {

  const prefix = getPrefix(basePath, filename);

  idWrappers($, prefix);
  idH1s($, prefix);
  idH2s($, prefix);
  idH3s($, prefix);

};

module.exports = {
  idTitles
};
