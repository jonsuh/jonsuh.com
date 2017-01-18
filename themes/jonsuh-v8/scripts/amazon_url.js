/*
  {% amazon_url ITEM_ID %}
  {% amazon_url https://www.amazon.com/dp/ITEM_ID %}
*/
const url = require('url');

hexo.extend.tag.register('amazon_url', function(args, content) {
  let amazonUrl = args[0];

  if ( ! amazonUrl.includes("://")) {
    amazonUrl = url.resolve("https://www.amazon.com/dp/", amazonUrl);
  }

  let tagQuery = "?tag=";

  if (hexo.config.amazon_tag) {
    tagQuery += hexo.config.amazon_tag;
  }
  else if (hexo.theme.config.amazon_tag) {
    tagQuery += hexo.theme.config.amazon_tag;
  }

  return url.resolve(amazonUrl, tagQuery);
}, {ends: false});
