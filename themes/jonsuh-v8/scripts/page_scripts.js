/*
  {% page_scripts yaml %}
*/
const path = require('path');

hexo.extend.helper.register('page_scripts', function(scripts) {
  let scriptsDir = hexo.config.scripts_dir;

  let html = "";

  if (scripts !== undefined) {
    scripts.forEach(function(script) {
      if ( ! script.includes("://") && script.charAt(0) !== "/") {
        script = path.join(scriptsDir, script);
      }

      html += '<script src="' + script + '"></script>' + "\n";
    });
  }

  return html;
});
