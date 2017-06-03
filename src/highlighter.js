const Prism = require('prismjs');

const rename = {
  'js': 'javascript'
};

const highlight = (source, language) => {

  if (!language) {

    return source;

  }

  const name = rename[language] || language;

  require(`prismjs/components/prism-${name}`);

  return Prism.highlight(source, Prism.languages[name]);

};

module.exports = {
  highlight
};
