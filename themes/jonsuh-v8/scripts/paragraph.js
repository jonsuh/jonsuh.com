/*
  {% paragraph [wide] [cite="Full Name"] %}
    Lorem ipsum dolor sit amet.
  {% endparagraph %}
*/
hexo.extend.tag.register('paragraph', function(args, content) {
  content = hexo.render.renderSync({
    text: content,
    engine: 'markdown'
  });

  const className = "paragraph";

  return '<div class="' + className + '">' + content + '</div>';
}, {ends: true});
