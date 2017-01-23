/*
  {% image_url path/to/image.jpg %}
*/
const path = require('path');

hexo.extend.tag.register('image_url', function(args, content) {
  let src = args[0];

  // Set correct images directory
  let assetsDir = path.resolve(hexo.config.images_dir);

  if (src.charAt(0) !== "/") {
    assetsDir = path.join(assetsDir, path.dirname(this.path));

    src = path.join(assetsDir, src);
  }

  return src;
}, {ends: false});
