---
layout: post
title: Responsive YouTube, Vimeo, Embed, and HTML5 Video with CSS
date: "2012-07-05"
comments: false
excerpt: Make YouTube, Vimeo, embed, and HTML5 videos responsive with CSS.
tags:
- css
- front-end-development
- responsive
---

With more and more people accessing the internet with mobile devices, it’s so important that you give them best mobile experience when they visit your website. Today, I have a quick and easy tutorial on how to make YouTube, Vimeo, embed, and HTML5 videos responsive with CSS.

Resize your browser, view this page on your mobile device, or change your device orientation (landscape, portrait). You’ll see that the video resizes proportionally, not to mention the rest of this site, according to the size of your browser or orientation of your device.

<div class="flex-video widescreen"><iframe src="http://www.youtube.com/embed/wN3gueLT0D8?showinfo=0" frameborder="0" width="560" height="315"></iframe></div>

<p><a href="{{ site.labs_url }}/responsive-video-embed/" class="button button--labs" target="_blank">See the <b>Demo</b></a></p>

## HTML

The HTML is extremely simple.

{% gist 3026455 js-video.html %}

Simply wrap the iframe, embed, or video tags with a div with class `js-video`. The optional `.widescreen` gives support for widescreen 16:9 videos and `.vimeo` tweaks any Vimeo videos you embed for the best experience.

## CSS

Although the CSS is not quite as simple as the HTML, it’s pretty simple. We’ll start off with the div that’ll wrap the video.

## Video container

{% gist 3026455 js-video-basic.css %}

Because a div is a block element and by default its width is 100%, it’s horizontally responsive. However, because we want the video to be responsive, we need to be able to proportionally size the video according to its ratio.

`.js-video` sets a relative height with a hidden overflow to allow the video inside to properly resize proportionally. This is default support for a standard 4:3 video, which determined by the `padding-bottom: 67.5%`. This supports YouTube, traditional embed, and HTML5 videos.

Vimeo is just slightly different. Because of how Vimeo stages the video with their iframe video code, we remove the with `.vimeo` by removing the top padding of the div, `padding-top: 0`.

Adding support for widescreen 16:9 videos is easy by simply adjusting the padding-bottom. The additional class `widescreen` sets `padding-bottom: 57.25%`.

## Video

{% gist 3026455 js-video-video.css %}

We now need to manipulate the iframe, embed, object, or video tag inside the div. Since the proportions are set for us by the parent div, we need to position the video absolutely and set the width and height to 100%.

## Demo

To make life a little easier, I created a demo for you to try it or even download and use the source on your own website.

<p><a href="{{ site.labs_url }}/responsive-video-embed/" class="button button--labs" target="_blank">See the <b>Demo</b></a></p>