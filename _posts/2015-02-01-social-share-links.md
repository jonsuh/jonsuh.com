---
layout: post
title: Responsible Social Share Links
date: "2015-02-01 08:00:00"
updated: "2015-03-26 10:10:00"
comments: false
tags:
- development
- tutorial
- front-end-development
- javascript
- performance
---

Social share scripts are convenient and easy to copy & paste but rely on JavaScript and add additional overhead to your site, which means more HTTP requests and slower load times. Instead, use share links that don’t require you to load scripts for each social site.

<!--more-->

## Stop loading third-party scripts

It’s important to design and build sites responsibly—people pay for data and to truly serve a global audience where 3G and 4G networks are luxuries or nonexistent, every byte of data transferred matters.

Here’s a breakdown of loading social sharing scripts from some of the most popular sites:

| Site       | Files  | Size        |
| :--------- |:------:| -----------:|
| Google+    | 1      | 15.1KB      |
| Facebook   | 3      | 73.3KB      |
| LinkedIn   | 2      | 47.7KB      |
| Pinterest  | 3      | 12.9KB      |
| Tumblr     | 1      | 1.5KB       |
| Twitter    | 4      | 52.7KB      |
| **Total**  | **14** | **203.2KB** |

That’s 14 additional requests and although it took 1.3 seconds to load on my connection, my connection advertises 50-105 Mbps. When I throttle the loading to an EDGE network, it takes 7.7 seconds.

The privacy of your users is another thing to consider—loading third-party share scripts allows them to track users on your site. Using share links not dependent on third-party scripts is not only faster, but you’re being more responsible and cautious with the privacy of your users, which is another huge plus.

## Use Share URLs

Each social network has its own unique share URL that accepts custom parameters used to pull in the information to be displayed. Most importantly, social share links work without JavaScript.

Let’s take a look at Facebook’s share URL:

```html
https://www.facebook.com/sharer/sharer.php?u=URL_TO_SHARE
```

Facebook’s only accepts one parameter, `u`, and you’ll replace the URL you want shared with `URL_TO_SHARE`.

### URL Encode

It’s important to note that values of parameters must be URL encoded—spaces and certain special characters will not be read, and URL encoding converts them into readable values. An encoded URL looks like the following:

```text
http%3A%2F%2Fjonsuh.com%2F
```

Depending on the language(s) or framework you’re using, there are various ways to URL encode. With PHP:

```php
<?php echo urlencode('https://jonsuh.com/'); ?>
```

With Jekyll I use <a href="https://gist.github.com/jonsuh/2a88c7799461623d9d82" target="_blank">this plugin</a> and do the following:

```ruby
{% raw %}
{{ 'https://jonsuh.com/' | url_encode }}
{% endraw %}
```

### Construct the Share URL

Construct the Facebook share URL by appending the encoded URL immediately after `u=` (the question mark denotes the start of query strings):

```html
https://www.facebook.com/sharer/sharer.php?u={{ 'https://jonsuh.com/' | encode_url }}
```

Then create the share link by using an anchor `<a>` with `target=_blank`, which should look like the following:

*<small>(The code has been broken up into several lines for readability—remember to remove any spaces and line breaks in the `href` if you copy & paste.)</small>*

```html
<a href="https://www.facebook.com/sharer/sharer.php
     ?u={{ 'https://jonsuh.com/' | encode_url }}"
   target="_blank">Share on Facebook</a>
```

### Multiple parameters

Facebook’s sharer is simple because it only accepts one parameter, but let’s take a look at Twitter’s, which accepts more than one.

```html
https://twitter.com/intent/tweet?text=TWEET_TO_SHARE&url=URL_TO_SHARE&via=USERNAME_TO_SHARE
```

This example accepts 3 parameters: `text`, `url` and `via`. It’s important to note the ampersands are not part of the parameter values—they’re query string separators.

Let’s take the corresponding values and construct the share URL:

```html
<!--
text: Check out this website!
url : https://jonsuh.com/
via : jonsuh
-->
<a href="https://twitter.com/intent/tweet/
     ?text={{ 'Check out this website!' | encode_url }}
     &url={{ 'https://jonsuh.com/' | encode_url }}
     &via=jonsuh" 
   target="_blank">Share on Twitter</a>
```

<a href="https://twitter.com/intent/tweet/?text=Check%20out%20my%20new%20website!&url=https%3A%2F%2Fjonsuh.com%2F&via=jonsuh" class="button" target="_blank">Share on Twitter (_blank)</a>

You can also replace the “Share on Twitter” text with a custom image:

```html
<a href="https://twitter.com/intent/tweet/
     ?text={{ 'Check out this website!' | encode_url }}
     &url={{ 'https://jonsuh.com/' | encode_url }}
     &via=jonsuh" 
   target="_blank">
  <img src="http://example.com/image.png" alt="Share on Twitter">
</a>
```

<a href="https://twitter.com/intent/tweet/?text=Check%20out%20my%20new%20website!&url=https%3A%2F%2Fjonsuh.com%2F&via=jonsuh" target="_blank" style="border: 0">
  <img src="/assets/images/blog/social-share-links/twitter-share.png"
       srcset="/assets/images/blog/social-share-links/twitter-share.png 1x,
               /assets/images/blog/social-share-links/twitter-share@2x.png 2x" 
    style="max-width: 170px">
</a>

Even better, customize it with CSS:

```html
<a class="custom-share-button" href="https://twitter.com/intent/tweet/
     ?text={{ 'Check out this website!' | encode_url }}
     &url={{ 'https://jonsuh.com/' | encode_url }}
     &via=jonsuh" 
   target="_blank">
  <span class="custom-share-button-icon"><svg viewBox="0 0 12 12" preserveAspectRatio="xMidYMid meet" class="svg-icon svg-icon-twitter"><path class="svg-icon-path" d="M10.8,3.5c0,0.1,0,0.2,0,0.3c0,3.3-2.5,7-7,7c-1.4,0-2.7-0.3-3.8-1c0.2,0,0.4,0,0.6,0c1.1,0,2.2-0.5,3.1-1.2 c-1.1,0-2-0.7-2.3-1.7c0.2,0,0.3,0,0.5,0s0.4,0,0.7-0.1c-1.1-0.2-2-1.2-2-2.4l0,0c0.3,0.2,0.7,0.3,1.1,0.3C1,4.3,0.6,3.5,0.6,2.7 c0-0.5,0.1-0.8,0.3-1.2c1.2,1.6,3,2.5,5,2.6c0-0.2-0.1-0.4-0.1-0.6c0-1.3,1.1-2.4,2.5-2.4c0.7,0,1.4,0.3,1.8,0.8 c0.6-0.1,1.1-0.3,1.6-0.6c-0.2,0.6-0.6,1.1-1.1,1.4c0.5-0.1,1-0.2,1.4-0.4C11.7,2.8,11.2,3.2,10.8,3.5z"/></svg></span>
  <span class="custom-share-button-label">Share on Twitter</span>
</a>

<style>
.custom-share-button {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  color: #fff;
  background-color: #55acee;
  padding: .8em 1.2em;
  border-radius: 3px;
  display: inline-block;
}
.custom-share-button-icon,
.custom-share-button-label {
  display: inline-block;
  vertical-align: middle;
}
.custom-share-button-icon {
  width: 1em;
  height: 1em;
  margin-right: .2em;
}
.custom-share-button-icon path { fill: #fff; }
.custom-share-button-label {
  font-size: .9em;
  font-weight: 500;
}
.custom-share-button:hover { background-color: #70b7ec; }
</style>
```

<style>
.custom-share-button {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1;
  color: #fff;
  background-color: #55acee;
  padding: .8em 1.2em;
  border: 0;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  display: inline-block;
}

.custom-share-button-icon,
.custom-share-button-label {
  display: inline-block;
  vertical-align: middle;
}

.custom-share-button-icon {
  width: 1em;
  height: 1em;
  margin-right: .2em;
}

.custom-share-button-icon path {
  fill: #fff;
}

.custom-share-button-label {
  font-size: .9em;
  font-weight: 500;
}

.custom-share-button:hover {
  color: #fff;
  background-color: #70b7ec;
}

.custom-share-button:hover .custom-share-button-label {
  color: #fff;
}
</style>

<a class="custom-share-button" href="https://twitter.com/intent/tweet/?text={{ 'Check out this website!' | encode_url }}&url={{ 'https://jonsuh.com/' | encode_url }}&via=jonsuh" target="_blank">
  <span class="custom-share-button-icon">{% strip %}{% include svg/twitter.html %}{% endstrip %}</span>
  <span class="custom-share-button-label">Share on Twitter</span>
</a>

## Enhance with JavaScript

Now that we’ve gotten social sharing links to work without JavaScript, let’s enhance them by adding some JavaScript to open the share URL in a popup window. Here’s the function we’ll use to handle the popup window.

```js
function windowPopup(url, width, height) {
  // Calculate the position of the popup so
  // it’s centered on the screen.
  var left = (screen.width / 2) - (width / 2),
      top = (screen.height / 2) - (height / 2);

  window.open(
    url,
    "",
    "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
  );
}
```

Bind `windowPopup` to when the share link is clicked. In this example, we’ll use a JavaScript-specific utility class `js-social-share`.

```html
<a class="js-social-share" href="https://twitter.com/intent/tweet/?text={{ 'Check out this website!' | encode_url }}&url={{ 'https://jonsuh.com/' | encode_url }}&via=jonsuh" target="_blank">Share on Twitter</a>
```

```js
//jQuery
$(".js-social-share").on("click", function(e) {
  e.preventDefault();

  windowPopup($(this).attr("href"), 500, 300);
});

// Vanilla JavaScript
var jsSocialShares = document.querySelectorAll(".js-social-share");
if (jsSocialShares) {
  [].forEach.call(jsSocialShares, function(anchor) {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();

      windowPopup(this.href, 500, 300);
    });
  });
}
```

<p>
  <a href="https://twitter.com/intent/tweet/?text={{ 'Check out this website!' | encode_url }}&url={{ 'https://jonsuh.com/' | encode_url }}&via=jonsuh" class="js-social-share button" target="_blank">Share on Twitter (Popup)</a>
  <script>
  var jsSocialShares = document.querySelectorAll(".js-social-share");
  if (jsSocialShares) {
    [].forEach.call(jsSocialShares, function(anchor) {
      anchor.addEventListener("click", function(e) {
        e.stopPropagation();
        e.preventDefault();

        Utility.windowOpen(this.href, 500, 300);
      });
    });
  }
  </script>
</p>

## Share URLs

Here’s a collection of common social share URLs and examples of their structures along with links to documentations.

*<small>(The code has been broken up into several lines for readability—remember to remove any spaces and line breaks in the `href` if you copy & paste.)</small>*

### Facebook

```html
<a href="https://www.facebook.com/sharer/sharer.php
     ?u={{ 'https://jonsuh.com/' | encode_url }}"
   target="_blank">Share on Facebook</a>
```

Parameter `u` is required.

### Google+

```html
<a href="https://plus.google.com/share
     ?url={{ 'https://jonsuh.com/' | encode_url }}"
   target="_blank">Share on Google+</a>
```

Parameter `url` is required. <a href="https://developers.google.com/+/web/share/#sharelink" title="Google+ Share Link documentation" target="_blank">Read the documentation</a>

### LinkedIn

```html
<a href="https://www.linkedin.com/shareArticle
     ?mini=true
     &url={{ 'https://jonsuh.com/' | encode_url }}
     &title={{ 'Jonathan Suh' | encode_url }}
     &source={{ 'https://jonsuh.com/' | encode_url }}
     &summary={{ 'Short summary' | encode_url }}
   target="_blank">Share on LinkedIn</a>
```

Parameter `mini` is required and must be true, `url` is required. <a href="https://developer.linkedin.com/documents/share-linkedin" title="LinkedIn share URL documentation" target="_blank">Read the documentation</a>

### Pinterest

```html
<a href="https://www.pinterest.com/pin/create/button/
     ?url={{ 'https://jonsuh.com/' | encode_url }}
     &media={{ 'https://jonsuh.com/icon.png' | encode_url }}
     &description={{ 'Short description' | encode_url }}
     &hashtags=web,development" 
   target="_blank">Share on Pinterest</a>
```

Parameter `url` is required. <a href="https://developers.pinterest.com/pin_it/" title="Pinterest Pin It button documentation" target="_blank">Read the documentation</a>

### Reddit

```html
<a href="http://www.reddit.com/submit/
     ?url={{ 'https://jonsuh.com/' | encode_url }}"
   target="_blank">Share on Reddit</a>
```

Parameter `url` is required. <a href="http://www.reddit.com/buttons/" title="Reddit Share button documentation" target="_blank">Read the documentation</a>

### Twitter

```html
<a href="https://twitter.com/intent/tweet/
     ?text={{ 'Visit my website' | encode_url }}
     &url={{ 'https://jonsuh.com/' | encode_url }}
     &via=jonsuh
     &hashtags=web,development" 
   target="_blank">Share on Twitter</a>
```

All parameters are optional. <a href="https://dev.twitter.com/web/tweet-button/web-intent" title="Twitter Web Intent documentation" target="_blank">Read the documentation</a>

## Conclusion

Removing third-party social share scripts and using social share URLs will make your site leaner and faster. However, there are some limitations to using traditional share URLs (for example you can’t set custom captions and descriptions with Facebook’s; therefore, you’d have to use <a href="https://developers.facebook.com/docs/sharing/reference/feed-dialog/v2.2" target="_blank">Facebook’s SDK and Feed Dialog</a>, or not being able to show the like/tweet/share count) but unless it’s necessary, the benefits of not loading third-party scripts outweight the cons.
