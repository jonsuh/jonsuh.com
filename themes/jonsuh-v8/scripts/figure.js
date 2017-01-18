/*
  {% figure [wide left right] [src="https://url.to/image.jpg"] [alt="Alt text"] [caption="Full caption goes here"] %}
*/
hexo.extend.tag.register('figure', function(args, content) {
  let className = "figure";
  let alt = "";
  let caption = "";
  let src = "";

  args.forEach(function(value) {
    // wide
    if (value === "wide") {
      className += " figure--wide";
    }
    // left/right
    if (value === "left" || value === "right") {
      className += " figure--float";

      if (value === "left") {
        className += " figure--float-left";
      }
      else if (value === "right") {
        className += " figure--float-right";
      }
    }

    // alt
    if (value.match(/alt=/)) {
      alt = value.replace("alt=", "");
    }

    // caption
    if (value.match(/caption=/)) {
      value = hexo.render.renderSync({
        text: value,
        engine: 'markdown'
      });

      value = value.replace("caption=", "")
                   .replace(/<\/p>/g,"")
                   .replace(/<p>/g,"");

      caption = '<figcaption class="figure-caption">' + value + '</figcaption>';
    }

    // src
    if (value.match(/src=/)) {
      src = value.replace("src=", "");
    }
  });

  // Set correct images directory
  let assetsDir = "/assets/images/";

  if (this.layout === "post") {
    assetsDir += this.path;
  }

  src = assetsDir + src;

  return '<figure class="' + className + '"><img src="' + src + '" alt="' + alt + '" class="figure-image">' + caption + '</figure>';
}, {ends: false});
