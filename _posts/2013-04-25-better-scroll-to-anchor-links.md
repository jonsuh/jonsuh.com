---
layout: post
title: Better Scroll-To Anchor Links
date: "2013-04-25"
comments: false
excerpt: Traditional scroll-to approaches do not play well with all responsive sites. Here I’ll present the problem with the traditional approach and present a better solution.
tags:
- development
- tutorial
- front-end-development
- javascript
---

We’ve all seen sites that have anchor links (links that navigate you to the top or to another position or section of the page). Some take extra steps to enhance that experience by using JavaScript to scroll you to that position.

However, traditional scroll-to approaches do not play well with all responsive sites. Here I’ll present the problem with the traditional approach and present a better solution.

Let’s look at a traditional jQuery approach:

{% gist 5462198 scroll-to.html %}

{% gist 5462198 traditional-scroll-to.js %}

This method works by getting the y offset of the target anchor, and uses jQuery’s animate to generate a sliding effect, where the duration is 100ms.

Here’s the problem: Whether the page needs to slide 1,000 pixels to get to the position or 10,000 pixels, it’ll only take 100ms. Sliding 1,000 pixels in 100ms will produce a smooth animation whereas sliding 10,000 pixels in 100ms will not.

Linearly, if 1,000 pixels = 100ms, then 10,000 pixels = 1,000ms.

This inconsistency is a problem with the growth of responsive design because in many cases, as the viewport becomes more narrow, the height of the page increases.

Here’s a better solution:

{% gist 5462198 better-scroll-to.js %}

This method first calculates the absolute distance between the link and the anchor. It’ll then calculate the directly proportional speed needed to travel that distance based on the value of `base_speed` (time in ms to travel 1,000 pixels).

With this solution, it’ll take 100ms to travel 1,000 pixels and 1,000ms to travel 10,000 pixels. You can experiment with `base_speed` for different results.

You can also take this solution and make it abstract so you can reuse the code throughout your site. Here’s a real simple example:

{% gist 5462198 abstract-better-scroll-to.js %}

Though this solution is an improvement to the first, keep in mind that jQuery animate’s default easing function is `swing`. Read <a href="https://medium.com/design-ux/926eb80d64e3" target="_blank">Transition Interfaces</a> by <a href="http://psql.me" target="_blank">Pasquale D’Silva</a>.

You can experiment with more easing functions using the <a href="http://gsgd.co.uk/sandbox/jquery/easing" target="_blank">jQuery Easing Plugin</a>, then do the following:

{% gist 5462198 better-scroll-to-easing.js %}

Check out jQuery’s <a href="http://jqueryui.com/resources/demos/effect/easing.html">demo of different easing functions</a> for visual examples.

I realize my solution isn’t perfect—For instance, if the distance needed to be traveled is 500,000 pixels, you wouldn’t want it to take 50,000ms. Experiment and see what you come up with.