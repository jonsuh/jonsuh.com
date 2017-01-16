const yaml = require('hexo-front-matter');

hexo.extend.filter.register('after_post_render', function(data) {
  let excerpt = yaml.parse(data.raw).excerpt;

  if (excerpt !== undefined) {
    excerpt = hexo.render.renderSync({
      text: excerpt,
      engine: 'markdown'
    });

    data.excerpt = excerpt;
  }

  return data;
});
