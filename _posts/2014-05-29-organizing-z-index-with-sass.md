---
layout: post
title: Organizing z-index with SASS
date: "2014-05-29 13:00:00"
comments: false
tags:
- design
- development
- tutorial
- css
- front-end-development
- sass
---

Keeping track of all your z-index values can be quite a task, especially on large projects or projects that involve more than 1 developer. SASS and its recent introduction of the `maps` data-type can help you keep track of your z-index by having them all in one place.

<!--more-->

If you’re not familiar with [SASS maps](/blog/sass-maps/), I wrote a post that should help you get familiarized with them: [SASS maps](/blog/sass-maps/)

## z-index with maps

The following is what I did for one of my most recent projects to keep track of all of my z-index values.

I first went ahead and created a map to declare all of my `z-index` values.

{% highlight sass %}
$z-index: (
  modal              : 200,
  navigation         : 100,
  footer             : 90,
  triangle           : 60,
  navigation-rainbow : 50,
  share-type         : 41,
  share              : 40,
);
{% endhighlight %}

Leave room for error and tweaks by initially setting major `z-index` values in increments of 10. You can tell by the example above that at a later date I went in and added `share-type`.

The key is to never a declare a `z-index` value in the CSS itself, but instead add another key-value pair to your map.

Using the baked-in function to access the value of a map, you can do the following:

{% highlight sass %}
.navigation {
  z-index: map-get($z-index, navigation);
}

.footer {
  z-index: map-get($z-index, footer);
}
{% endhighlight %}

Which results in the following CSS:

{% highlight css %}
.navigation {z-index: 100;}
.footer     {z-index: 90;}
{% endhighlight %}

## Custom function and mixin

I’m not a big fan of using the default `map-get` function only because it’s not that elegant and it’s redundant. Instead, I created a function to make accessing the `$z-index` map a bit more elegant.

{% highlight sass %}
@function z-index($key) {
  @return map-get($z-index, $key);
}

.navigation {
  z-index: z-index(navigation);
}
{% endhighlight %}

**One step further because I have OCD...**  
I still didn’t like the redundancy of `z-index: z-index(navigation);` so I went one step further and created a mixin (it depends on the function so don’t get rid of it).

{% highlight sass %}
@function z-index($key) {
  @return map-get($z-index, $key);
}

@mixin z-index($key) {
  z-index: z-index($key);
}

.navigation {
  @include z-index(navigation);
}
{% endhighlight %}

## Separate file

I like breaking up my SASS into separate files to keep things like variables, mixins, and functions separate.

Create a separate file, `_z-index.scss` to house your `z-index` map as well as the function and mixin:

{% highlight sass %}
$z-index: (
  modal              : 200,
  navigation         : 100,
  footer             : 90,
  triangle           : 60,
  navigation-rainbow : 50,
  share-type         : 41,
  share              : 40,
);

@function z-index($key) {
  @return map-get($z-index, $key);
}

@mixin z-index($key) {
  z-index: z-index($key);
}
{% endhighlight %}

Then wherever you need to access your `z-index`, import it at the very top of your SASS file:

{% highlight sass %}
@import "z-index";

.navigation {
  @include z-index(navigation);
}
{% endhighlight %}

This may not be necessary for smaller projects, but I feel there’s a lot of upside for large projects that are highly `z-index` dependent and projects that involve more than 1 developer&mdash;having all of your `z-index` values to reference in one spot prevents developers from stepping on each other’s toes.

It’s not perfect, but it makes things a heck of a lot easier.