/*
  {% page_css yaml %}
*/
const path = require('path');
const fs = require('hexo-fs');

hexo.extend.helper.register('page_css', function(css) {
  let cssDir = hexo.config.css_dir;

  let html = "";

  if (css !== undefined) {
    css.forEach(function(css) {
      if ( ! css.includes("://") && css.charAt(0) !== "/") {
        css = path.join(cssDir, css);
      }

      css = `<link rel="stylesheet" href="${css}">`;

      html += css + "\n";
    });
  }

  return html;
});
