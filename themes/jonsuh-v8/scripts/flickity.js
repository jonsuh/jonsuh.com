/*
  {% figure %}
  http://example.com/image.jpg
  http://example.com/image.jpg "alt"
  {% endfigure %}
*/
hexo.extend.tag.register('flickity', function(args, content) {
  let arr = content.split(/\n/);

  let alt = "";
  let src = "";

  let images = "";

  arr.forEach(function(image) {
    if (image) {
      alt = "";
      src = image;

      if (image.includes('"')) {
        let imageSplit = image.split('"');

        src = imageSplit[0].trim();
        alt = imageSplit[1];
      }

      images += `<img src="${src}" alt="${alt}">`;
    }
  });

  return `<div class="js-flickity" data-flickity-options='{ "imagesLoaded": true, "percentPosition": false, "pageDots": false }'>${images}</div>`;
}, {ends: true});
