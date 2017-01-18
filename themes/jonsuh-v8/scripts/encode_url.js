/*
  {% encode_url https://www.google.com %}
*/
hexo.extend.tag.register('encode_url', function(args, content) {
  return encodeURIComponent(args[0]);
}, {ends: false});
