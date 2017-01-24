/*
  {% page_scripts yaml %}
*/
const path = require('path');
const fs = require('hexo-fs');
const uglify = require('uglify-js');

hexo.extend.helper.register('page_scripts', function(scripts) {
  let scriptsDir = hexo.config.scripts_dir;

  let html = "";

  if (scripts !== undefined) {
    scripts.forEach(function(script) {
      if ( ! script.includes("://") && script.charAt(0) !== "/") {
        if (script.includes(".inline.js")) {
          let scriptContent = "";

          script = path.join(hexo.theme_dir, '/source/', scriptsDir, script);

          if (hexo.config.environment === "production") {
            scriptContent = uglify.minify(script).code;
          }
          else {
            scriptContent = fs.readFileSync(script);
          }

          script = `<script>${scriptContent}</script>`;
        }
        else {
          script = '<script src="' + path.join(scriptsDir, script) + '"></script>';
        }
      }
      else {
        script = `<script src="${script}"></script>`;
      }

      html += script + "\n";
    });
  }

  return html;
});
