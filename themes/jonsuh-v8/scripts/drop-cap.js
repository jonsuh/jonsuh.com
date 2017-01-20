/*
  {% dropcap %}
    Lorem ipsum dolor sit amet.
  {% enddropcap %}
*/
hexo.extend.tag.register('dropcap', function(args, content) {
  const firstLetter = content[0].toLowerCase();

  let className = "drop-cap";

  className += " drop-cap--" + firstLetter;

  content = hexo.render.renderSync({
    text: content,
    engine: 'markdown'
  });

  content = content.replace(/<p>/g,"<p class='" + className + "'>");

  return content;
}, {ends: true});
