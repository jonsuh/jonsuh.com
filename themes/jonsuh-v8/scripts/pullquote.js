/*
  {% pullquote [wide] [cite="Full Name"] %}
    Lorem ipsum dolor sit amet.
  {% endpullquote %}
*/
hexo.extend.tag.register('pullquote', function(args, content) {
  content = hexo.render.renderSync({
    text: content,
    engine: 'markdown'
  });

  let className = "pullquote";
  let cite = "";

  args.forEach(function(value) {
    if (value === "wide") {
      className += " pullquote--wide";
    }

    if (value.match(/cite=/)) {
      value = hexo.render.renderSync({
        text: value,
        engine: 'markdown'
      });

      value = value.replace("cite=", "")
                   .replace(/<\/p>/g,"")
                   .replace(/<p>/g,"");

      cite = `<cite class="pullquote-cite">${value}</cite>`;
    }
  });

  return `<blockquote class="${className}">${content}${cite}</blockquote>`;
}, {ends: true});
