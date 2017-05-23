---
layout: post
title: Managing Responsive Breakpoints with Sass Maps
date: "2015-05-13 00:20:00"
excerpt: "Organizing and managing responsive breakpoints with Sass maps and a custom mixin."
tags:
- design
- development
- tutorial
- front-end-development
- sass
- sass-maps
---

[Sass maps](/blog/sass-maps/) are handy for organizing values used repeatedly throughout a project (e.g. [colors](/blog/sass-maps/#loops-and-maps), [z-index values](/blog/organizing-z-index-with-sass/)). They can also help manage responsive breakpoints, and, with the help of a custom mixin, even make generating media queries a breeze.

<!--more-->

If you’ve built a responsive site, this probably looks familiar to you:

```css
.main    { width: 100%; }
.sidebar { width: 100%; }

@media screen and (min-width: 640px) {
  .main    { width: 70%; }
  .sidebar { width: 30%; }
}
@media screen and (min-width: 1024px) {
  .main    { width: 70%; }
  .sidebar { width: 30%; }
}
```

If you prefer to have media queries inline, near the affected class(es), or within the same module (instead of having a separate module or file for media queries), changing a common breakpoint requires you to change every instance of that value.

Using the example above, if we wanted to change `640px` to `800px`, and `640px` appears 30 times in the project, we’d have to do a search-and-replace for every instance. This scenario leaves room for human error. In addition, if another developer that is unfamiliar with the project is given the task of creating a new page, he’d have to do some homework (and potential guesswork) to figure out the common breakpoints used for the project.

Using Sass maps allows the commonly-used breakpoints to be in one place instead of scattered throughout the code base. This promotes maintainability and scalability by making it easier when a breakpoint needs to be changed or added. It also leaves less room for human error and guesswork, especially with a team and multiple developers.

## Sass Maps to Organize Breakpoints

First, create a map with key-value pairs, and assign each breakpoint value a generic name as its key. Keeping mobile-first in mind, order the values in ascending order.

```scss
$breakpoints: (
  small : 480px,
  medium: 800px,
  large : 1024px
);
```

Here’s the mixin that will iterate through the breakpoints map to generate the appropriate CSS:

```scss
@mixin mq($mq-breakpoint, $mq-breakpoints: $breakpoints) {
  // If $mq-breakpoint is a key that exists in
  // $mq-breakpoints, get and use the value
  @if map-has-key($mq-breakpoints, $mq-breakpoint) {
    $mq-breakpoint: map-get($mq-breakpoints, $mq-breakpoint);
  }
  
  @media screen and (min-width: #{$mq-breakpoint}) {
    @content;
  }
}
```

<small>*Note: The mixin assigns the breakpoints map as `$breakpoints` in the second argument of the mixin declaration; therefore, if your breakpoints map has a different variable name, be sure to change it in line 1 of the mixin.*</small>

We’ll then use the mixin, passing in the breakpoint name as the parameter:

```scss
.main    { width: 100%; }
.sidebar { width: 100%; }

@include mq(medium) {
  .main    { width: 60%; }
  .sidebar { width: 40%; }
}
@include mq(large) {
  .main    { width: 70%; }
  .sidebar { width: 30%; }
}
```

Which results in the following CSS:

```css
.main    { width: 100%; }
.sidebar { width: 100%; }

@media screen and (min-width: 800px) {
  .main    { width: 60%; }
  .sidebar { width: 40%; }
}
@media screen and (min-width: 1024px) {
  .main    { width: 70%; }
  .sidebar { width: 30%; }
}
```

You can also use the mixin within a selector:

```scss
.main {
  width: 100%;

  @include mq(medium) {
    width: 60%;
  }
  @include mq(large) {
    width: 70%;
  }
}
```

Using the mixin within a selector doesn’t change the resulting CSS from the previous example.

Changing breakpoints is now as simple as modifying the value in the breakpoints map. If you find the need to add an additional breakpoint, add it as a key-value pair:

```scss
$breakpoints: (
  small         : 480px,
  new-breakpoint: 555px,
  medium        : 800px,
  large         : 1024px
);
```

### Custom breakpoints

The mixin also accepts custom breakpoint values that don’t exist in the breakpoints map:

```scss
.main    { width: 100%; }
.sidebar { width: 100%; }

@include mq(large) {
  .main    { width: 70%; }
  .sidebar { width: 30%; }
}
@include mq(1280px) {
  .main    { width: 75%; }
  .sidebar { width: 25%; }
}
```

The mixin checks to see if the value passed exists as a key in the breakpoints map using Sass’ [`map-has-key` function](http://sass-lang.com/documentation/Sass/Script/Functions.html#map_has_key-instance_method). If the key exists, it’ll get and use the corresponding value with the help of Sass’ [`map-get` function](http://sass-lang.com/documentation/Sass/Script/Functions.html#map_get-instance_method) when generating the media query; if it doesn’t exist, it’ll use the custom value.

Here’s the resulting CSS:

```css
.main    { width: 100%; }
.sidebar { width: 100%; }

@media screen and (min-width: 1024px) {
  .main    { width: 70%; }
  .sidebar { width: 30%; }
}
@media screen and (min-width: 1280px) {
  .main    { width: 75%; }
  .sidebar { width: 25%; }
}
```

## Retina and Orientation

Let’s get a bit fancier by extending the mixin to account for retina (2x) and device orientation.

```scss
@mixin mq($mq-breakpoint, $mq-breakpoints: $breakpoints) {
  $mq-media-query: "screen and";
  
  @if $mq-breakpoint == landscape or $mq-breakpoint == portrait {
    $mq-media-query: "#{$mq-media-query} (orientation: #{$mq-breakpoint})";
  }
  @else if $mq-breakpoint == retina {
    $mq-media-query: "#{$mq-media-query} (-webkit-min-device-pixel-ratio: 2)," +
                     "#{$mq-media-query} (min-resolution: 2dppx)";
  }
  @else {
    // If $mq-breakpoint is a key that exists in
    // $mq-breakpoints, get and use the value
    @if map-has-key($mq-breakpoints, $mq-breakpoint) {
      $mq-breakpoint: map-get($mq-breakpoints, $mq-breakpoint);
    }
    $mq-media-query: "#{$mq-media-query} (min-width: #{$mq-breakpoint})";
  }
  
  @media #{$mq-media-query} {
    @content;
  }
}
```

You can then use the mixin as follows:

```scss
.main {
  /*...*/
  @include mq(small) {
    /*...*/
  }
  @include mq(landscape) {
    /*...*/
  }
  @include mq(retina) {
    /*...*/
  }
}
```

The mixin now checks to see if the parameter passed into `mq()` is equal to “landscape,” “portrait” or “retina.” If so, it’ll generate the appropriate media queries for orientation or pixel density; otherwise, it’ll assume it’s a breakpoint and go through the process of checking whether or not it exists in the breakpoints map before generating the media query.

Here’s the compiled CSS:

```css
.main { /*...*/ }

@media screen and (min-width: 480px) {
  /*...*/
}
@media screen and (orientation: landscape) {
  /*...*/
}
@media screen and (-webkit-min-device-pixel-ratio: 2),
       screen and (min-resolution: 2dppx) {
  /*...*/
}
```

This solution also allows for you to account for both orientation or retina along with a breakpoint by nesting the mixin, like such:

```scss
@include mq(landscape) {
  @include mq(medium) {
    .main {
      /*...*/
    }
  }
}
```

Which results in the compiled CSS:

```css
@media screen and (orientation: landscape) and (min-width: 800px) {
  .main {
    /*...*/
  }
}
```

## Conclusion

My solution is not robust—it doesn’t handle media-query ranges, max-width—but it’s not meant to be. The solution is lightweight and most of the time it works and does what I need it to—I’ve built a handful of sites with the above solution, including [my own](https://github.com/jonsuh/jonsuh.com).

I also created a Sass library [mq-sass](https://github.com/jonsuh/mq-sass) (usable with Grunt, Gulp, Compass, or alike), which does all of the above, and also includes options to convert breakpoints to `em`s and set the `em` base.

However, when I need to write a complex media query, I prefer to write it by hand. With the help of Sass’ [`map-get` function](http://sass-lang.com/documentation/Sass/Script/Functions.html#map_get-instance_method), you can write complex media queries and still take advantage of the breakpoints map:

```scss
@media screen and (min-width: map-get($breakpoints, small)) and (max-width: map-get($breakpoints, medium) - 1px) {
  .main {
    /*...*/
  }
}
```

Which results in the following:

```css
@media screen and (min-width: 480px) and (max-width: 799px) {
  .main {
    /*...*/
  }
}
```

If you’re looking for something more robust, you might want to check out [breakpoint](https://github.com/at-import/breakpoint), which handles stuff like media types, media query pairs, compound media queries, and a ton more.
