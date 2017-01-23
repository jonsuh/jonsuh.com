/*
  {% labs_url /path/to/page %}
*/
const url = require('url');

hexo.extend.tag.register('labs_url', function(args, content) {
  return url.resolve(hexo.config.labs_url, args[0]);
}, {ends: false});
