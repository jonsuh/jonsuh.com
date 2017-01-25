hexo.extend.helper.register('related_posts', function(args) {
  if ( ! args || ! args.json || args.json.length == 0) return "";

  var html = "";

  function generateHtml(post) {
    return `<li class="post__related-item"><a href="${post.path}" class="post__related-link">${post.title}</a></li>`;
  }

  args.json.forEach(function(post) {
    html += generateHtml(post);
  });

  return `<ul class="post__related">${html}</ul>`;
});
