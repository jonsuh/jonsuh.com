---
layout: post
title: Retina Image Replacement
date: "2014-06-27 09:11:00"
comments: false
tags:
- design
- development
- tutorial
- javascript
- front-end-development
---

To ensure your images are sharp and crisp on retina-enabled devices, you want to serve images that are twice as large and scale them down appropriately; however, keeping mobile users and their limited speeds and data plans in mind, it’s important to only serve retina images on retina-enabled devices or when necessary.

Here’s a quick-and-easy way to do it with just a few lines of vanilla JavaScript or jQuery.

<!--more-->

*Note: A buddy of mine, Matt <a href="https://twitter.com/inlikealion" target="_blank">@inlikealion</a>, reminded me that there’s a future-friendly way to achieve this with the `src` and `srcset` attributes <a href="http://www.w3.org/html/wg/drafts/srcset/w3c-srcset/#additions-to-the-img-element" target="_blank">w3.org</a>. Support is poor cross browser <a href="http://caniuse.com/srcset" target="_blank">caniuse.com/srcset</a> but it’ polyfillable. For a future-friendly implementation, you may want to look into that.*

For your images, let’s utilize the `data` attribute for your 1x and 2x images:

```js
<img src=""
     data-1x="/images/photo.jpg"
     data-2x="/images/photo@2x.jpg">
```

## Vanilla JavaScript

I came up with the following more as a learning exercise but also to keep myself on my toes and from always using a library or someone else’s solution.

```js
// Select all images with `data-1x` attribute
// (It assumes that if you have `data-1x` attribute set,
//  it also has `data-2x` attribute set as well)
var images = document.querySelectorAll("img[data-1x]");
 
// If the device is retina-enabled (has pixel ratio of 2)
if (window.devicePixelRatio == 2) {
  // Loop through the array `images`
  Array.prototype.forEach.call(images, function(el, i) {
    // Get the value of the `data-2x` attribute
    var src = el.getAttribute("data-2x");
    
    // Set var `src` as the value of the element's `src` attribute
    el.setAttribute("src", src);
  });
 
// Else the device is not retina-enabled
} else {
  // Loop through the array `images`
  Array.prototype.forEach.call(images, function(el, i) {
    // Get the value of the `data-1x` attribute
    var src = el.getAttribute("data-1x");
 
    // Set var `src` as the value of the element's `src` attribute
    el.setAttribute("src", src);
  });
}
```

## jQuery

The same as above, except using jQuery and without comments.

```js
var $images = $("img[data-1x]");
 
if (window.devicePixelRatio == 2) {
  $.each($images, function() {
    var $this = $(this);
 
    $this.attr("src", $this.data("2x"));
  });
} else {
  $.each($images, function() {
    var $this = $(this);
 
    $this.attr("src", $this.data("1x"));
  });
}
```

## retina.js class

I created a `retina.js` class to reuse this in future applications.

```js
var Retina = Retina || {};
 
Retina = {
  init: function() {
    var images = document.querySelectorAll("img[data-1x]");
    if (Retina.isRetina() == true) {
      Array.prototype.forEach.call(images, function(el, i) {
        var src = el.getAttribute("data-2x");
        el.setAttribute("src", src);
      });
    } else {
      Array.prototype.forEach.call(images, function(el, i) {
        var src = el.getAttribute("data-1x");
        el.setAttribute("src", src);
      });
    }
  },
 
  isRetina: function() {
    if (window.devicePixelRatio == 2) {
      return true;
    } else {
      return false;
    }
  }
};
```

Load `retina.js`* in your application

```html
<script src="retina.js"></script>
```

or concatenate it with your other scripts.

Then run it: `Retina.init();`

In this class, I decided to create a separate function, `isRetina`, in case I wanted to use it elsewhere in my application:

```js
if (Retina.isRetina() == true) {
  //
} else {
  //
}
```

<small>* <a href="https://gist.github.com/jonsuh/25eecda57806ef0ee51f#file-retina-jquery-js" target="_blank">jQuery version also available</a>.</small>

## Graceful degredation

Since this image replacement method requires JavaScript to run, (it’s not pretty) you can use a combination of CSS and the `<noscript>` tag to gracefully degrade to a traditional image tag in browsers without JavaScript.

```js
<style>
  img.no-js {
    display: none;
  }
</style>
 
<img src=""
     data-1x="/images/photo.jpg"
     data-2x="/images/photo@2x.jpg"
     class="no-js">
<noscript>
  <img src="/images/photo.jpg">
</noscript>
```

Again, this solution doesn’t have all the bells and whistles other libraries may offer&mdash;it’s a lightweight, barebone solution for replacing images based on retina or non-retina devices, but feel free to add your own conditional stuff (i.e. on retina devices, use the 2x images on screen sizes > 480px wide, otherwise use the 1x images).
