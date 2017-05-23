---
layout: post
title: Faster Font Loading with Font Events
date: "2015-03-28 01:30:00"
share_image: foit-solved.jpg
tags:
- development
- tutorial
- javascript
- performance
---

[Web fonts](https://google.com "EHEHEHHE") are great and make the web a more beautiful space; however, loading them can be slow, which results in an unwanted side effect: FOIT (Flash of Invisible Text). I’ve experienced FOIT on my website, particular on mobile connections, but with the help of some homework and fantastic resources, plus some JavaScript and CSS, I managed to fix it.

<!--more-->

## Flash of Invisible Text

FOIT is a result of the browser timing out by displaying text in a default font after attempting to load a web font. During its attempt to load the web font, the browser hides the text for a period of time, usually a few seconds but is known to go up as high as 30 seconds. Here’s what FOIT looked like on my site when I loaded fonts with CSS `@font-face` rules:

{% figure src="foit.jpg" caption="FOIT when traditionally loading custom web fonts (throttled on a 3G network)" async="1" %}

Notice that as the page loads, the text becomes invisible in frames 2 and 3 (the type is set in Helvetica in frame 1 and Roboto in frame 4), which makes the content of the page unreadable. Although in many cases the FOIT lasted only 2–4 seconds, it’s definitely noticeable. I’ve also experienced the worst-case scenario, which is the content being permanently invisible.

The goal here is to get the content to your users as quickly as possible at the expense of FOUT and visual changes that occur when the font becomes available.

## Detect when fonts have been loaded

This is where [Font Load Events](https://dev.opera.com/articles/better-font-face/) come in, which is designed to do just that. [Bram Stein](https://twitter.com/bramstein) created [Font Face Observer](https://github.com/bramstein/fontfaceobserver), a lightweight (2.7KB minified, 1.1KB gzipped) polyfill for the font event API to allow you to detect if and when a font has been loaded.

<p class="small">Alternatively I could have gone with a full-featured font loader like [Web Font Loader](https://github.com/typekit/webfontloader) by Google and Typekit, but I decided to go with Font Face Observer in favor of its weight and approach.</p>

Load your fonts like you normally would (whether it be custom `@font-face` rules in your CSS or using a font service such as [Google Fonts](https://fonts.google.com) or [Typekit](https://typekit.com)). Then set up Font Face Observer for each font family:

```js
var observer = new FontFaceObserver("Font Name", {
  weight: 400
});

observer.check().then(function() {
  console.log("Font is available");
}, function() {
  console.log("Font is not available");
});
```

`check()` starts observing font loads and `then()` handles the callback when it finishes (which is done through a [Promise](https://promisesaplus.com/)).

One thing to note about Font Face Observer is that by default it will give up if the font loading exceeds 3 seconds. You can change the duration of the timeout by passing in an integer in milliseconds as the second parameter of `check()`:

```js
observer.check(null, 5000).then(function() {
  console.log("Font is available");
}, function() {
  console.log("Font is not available after waiting 5 seconds");
});
```

Read more about how to use Font Face Observer by [reading its documentation](https://github.com/bramstein/fontfaceobserver#readme).

## Progressively loading fonts with Font Events

Using font events with Font Face Observer, specify a fallback font to the `body` as the fonts are loading, then add a class to `<html>` once the fonts are done loading.

```css
body {
  font-family: Helvetica, Arial, sans-serif;
}

.fonts-loaded body {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
}
```

```js
var roboto = new FontFaceObserver("Roboto", {
  weight: 400
});

roboto.check().then(function() {
  document.getElement.className += "fonts-loaded";
});
```

You can also hook this up to handle multiple font families and/or weights, which I was able to figure out with the help of the smart folks at [Filament Group](http://www.filamentgroup.com) and their [Font Loading Revisited with Font Events](http://www.filamentgroup.com/lab/font-events.html) post by [Scott Jehl](https://twitter.com/scottjehl):

```js
var roboto400 = new FontFaceObserver("Roboto", {
  weight: 400
});
var roboto500 = new FontFaceObserver("Roboto", {
  weight: 500
});
var roboto700 = new FontFaceObserver("Roboto", {
  weight: 700
});

Promise.all([
  roboto400.check(),
  roboto500.check(),
  roboto700.check()
]).then(function() {
  document.documentElement.className += " fonts-loaded";
});
```

This method also uses a Promise. Keep in mind if you’re not using Font Face Observer’s standalone version (which comes baked with the [Promise polyfill](https://github.com/bramstein/promis)), be sure to include it separately.

The result? No sign of FOIT!

{% figure src="foit-solved.jpg" caption="Detecting the loading of custom web fonts with Font Face Observer (throttled on a 3G network)" async="1" %}

You can see that although Roboto wasn’t available until the 3rd frame, the text was visible the entire time.

Another note about Font Face Observer—if the connection is extremely slow and it gives up on checking the font loading, the given solution above will cause the document to stay in its fallback state (in this case the text will remain set in `Helvetica, Arial, sans-serif`).

We can use the catch to give the `html` element a unique class name to handle the timeout state.

```js
Promise.all([
  roboto400.check(),
  roboto500.check(),
  roboto700.check()
]).then(function() {
  document.documentElement.className += " fonts-loaded";
}, function() {
  document.documentElement.className += " fonts-unavailable";
});
```

## Local fonts

By loading fonts with `@font-face` rules and font events, we’ve eliminated FOIT, but the user will still notice FOUT (Flash of Unstyled Text). The ideal situation is to have the text styled properly the moment it loads, which requires the user to have the font installed locally. While there’s only a small possibility the user may have it installed, we can work a solution to accommodate the ideal situation by trying to reference the local font and using fallback fonts if it fails to combat FOUT, all while still eliminating FOIT.

Alongside the solution presented above, let’s also create a custom `font-family` name using a custom `@font-face` rule that references the local font in the `src`. Then include the name as the first of the `font-family` stack. The string inside of `local("")` should be the font’s family name and/or PostScript name.

```css
@font-face {
  font-family: "RobotoLocal";
  font-style: normal;
  font-weight: 400;
  src: local("Roboto"),
       local("Roboto-Regular");
}

body {
  font-family: "RobotoLocal", Helvetica, Arial, sans-serif;
}

.fonts-loaded body {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
}
```

This ensures that the local font will be used before the completion of the font event if the local font is available, and if it’s available, we’ve eliminated both FOIT and FOUT.

## Resources

I set up a demo page to show you font events in action.

<a href="{% labs_url /font-loading-with-font-events/ %}">Font Loading with Font Events Demo</a>

Here are some great posts and resources on font loading and font events:

- [Better @font-face with Font Load Events](https://dev.opera.com/articles/better-font-face/)
- [Font Loading Revisited with Font Events](http://www.filamentgroup.com/lab/font-events.html)
- [Font Face Observer](https://github.com/bramstein/fontfaceobserver)
- [Web Font Loader](https://github.com/typekit/webfontloader)
- [How to Improve Page Performance with a Font Loader](http://www.sitepoint.com/improve-page-performance-font-loader/)
