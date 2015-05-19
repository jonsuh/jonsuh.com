---
layout: post
title: Google Chrome Experiments With Hiding the URL
date: "2014-05-02 10:59:00"
comments: false
tags:
- software
- tech
---

A couple of days ago, Google pushed an update to both Canary and beta builds of Google Chrome that hides the full URL of a website from the address bar. At first it drove me crazy, but now I like it.

<!--more-->

*Before*  
![](/assets/images/blog/2014/google-chrome-experiments-with-hiding-the-url/chrome-url-before.png)

*After*  
![](/assets/images/blog/2014/google-chrome-experiments-with-hiding-the-url/chrome-url-after.png)

Affected versions of Chrome:  

- Canary 36.0.1951.0
- Beta 35.0.1916.86

## To Full URL or Not To Full URL

*That is the question.*

With Chrome’s latest updates, regardless of how deep you go in a site, only the top-level domain is shown.

The interaction and functionality of the Omnibox (better known as the address bar) is not clear, especially with this update. Although the full URL is initially hidden, you can still reveal the full URL and edit it by clicking the area where the top-level domain is shown.

![](/assets/images/blog/2014/google-chrome-experiments-with-hiding-the-url/chrome-omnibox.gif)

My thought is the designers tried to build in a hint of the new functionality&mdash;you can tell when you mouseover the area where the top-level domain is, there’s a hover state that indicates &ldquo;this is a button.&rdquo;

I’ll be honest&mdash;at first it drove me crazy, but only because I didn’t know how the new Omnibox worked. Now that I know, I kinda like it. It cleans up the address bar by initially hiding the full URL, but when I want or need it, it’s available to me.

## The URL

The URL is an essential part of the web. It’s the core of how all pages are connected, organized, and shared. A site’s URL structure gives a lot of contextual information:

```text
www.example.com/blog/article-name/
www.example.com/category/category-name/
www.example.com/product/product-id/
```

Often times I rely heavily on it, and it’s a core part of how I navigate the web. However, when I don’t need it, arguments can be made that it’s unnecessary clutter. I think we’ve become so accustomed to the URL always being there that we’ve learned to ignore it except when we need it.

As a general user, I like how the full URL is hidden.

As a web developer, I don’t&mdash;the full URL structure is extremely important to me. When building a website or web application, the URL doesn’t just give contextual information to the user but also functional information to the website/application itself.

```text
www.example.com/sign-in/
www.example.com/sign-out/
www.example.com/users/confirm?token=XXXXXX
```

It’s vital that the full URL is always available to me so I can make sure the application is properly functioning and navigating the way I had intended it to.

For that reason, it’d be nice if there was a right-click menu option to toggle it on/off (Because enabling/disabling it is quite annoying).

I’m only so much more aware of the URL than probably the average person because of my experience with the web and my profession. The web community was quite outraged by this change, but I’d be curious to know how we feel about it once the dust has settled and more of us became familiar with the new Omnibox functionality&mdash;there’s a chance so many were outraged because we weren’t aware that the full URL was still easily accesible, just not at a glance.

Allen Pike wrote a thoughtful article on <a href="http://www.allenpike.com/2014/burying-the-url/" target="_blank">Burying the URL</a> that I think you should read.

## Unhide the URL

If Chrome is doing this to you and you hate it, you can disable it by doing the following:

1. Type [`chrome://flags/#origin-chip-in-omnibox`](chrome://flags/#origin-chip-in-omnibox) in the URL bar and press Enter.
2. Disable *Enable origin chip in Omnibox* by selecting *Disabled* from the dropdown.  
![](/assets/images/blog/2014/google-chrome-experiments-with-hiding-the-url/chrome-url-unhide.png)
3. Restart Chrome.