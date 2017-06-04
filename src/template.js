const cheerio = require('cheerio');

const decorate = html => cheerio.load(`
  <section
    class="docs-section"
    id="wrapper"
  >
    ${html}
    
    <a class="link-to-top" style="cursor: pointer" onclick="document.body.scrollTop = 0; window.location.hash = '';">
      <span style="font-size: 1.5em">&uarr;</span> Top
    </a>
  </section>  
`);

module.exports = {
  decorate
};
