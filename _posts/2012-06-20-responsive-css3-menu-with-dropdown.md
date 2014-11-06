---
layout: post
title: Responsive CSS3 Menu with Dropdown
date: "2012-06-20"
comments: false
excerpt: Here’s a tutorial on how to create a navigation menu with dropdowns purely in CSS. I’ll take you step-by-step to make it horizontal, vertical, and responsive.
tags:
- css
- front-end-development
- responsive
- tutorial
---

Here’s a tutorial on how to create a navigation menu with dropdowns purely in CSS. There were certain things you used to only be able to do with JavaScript that you can now do with CSS3. I’ll take you step-by-step on how to create a horizontal menu, then make it vertical with some minor CSS adjustments. Best of all, it’s important that your elements are responsive so mobile devices get the best experience.

<p><a href="{{ site.labs_url }}/responsive-css-menu-dropdown/" class="button button--labs" target="_blank">See the <b>Demo</b></a></p>

## HTML

{% highlight html %}
<ul class="js-css-menu shadow responsive vertical">
  <li><a href="#">Link</a></li>
  <li class="current"><a href="#">Current</a></li>
  <li><a href="#">Link with Menu</a>
    <div>
      <ul>
        <li><b>Col 1</b></li>
        <li><a href="#">Sublink 1</a></li>
        <li><a href="#">Sublink 2</a></li>
        <li><a href="#">Sublink 3</a></li>
      </ul>
      <ul>
        <li><b>Col 2</b></li>
        <li><a href="#">Sublink 1</a></li>
        <li><a href="#">Sublink 2</a></li>
        <li><a href="#">Sublink 3</a></li>
      </ul>
    </div>
  </li>
</ul>
{% endhighlight %}

The menu is created using an unordered list. The class "js-css-menu" is the only required class. The others are optional; if you do not want it you can simply remove it. The dropdown menu is done with a div inside of the li and adjacent to the link.

## CSS

To help you understand the CSS better, I’m going to eliminate most of the extra, fancy styling and give you the core of what you need by covering the horizontal menu, vertical version, and making it responsive; I’ll leave the styling up to you.

### Main menu

{% highlight css %}
.js-css-menu {
  display: inline-block;
}
.js-css-menu, .js-css-menu ul, .js-css-menu li {
  list-style: none; padding: 0; margin: 0;
}
.js-css-menu a {
  text-decoration: none;
}
.js-css-menu > li {
  display: inline-block; float: left;
}
.js-css-menu > li > a {
  color: #555; display: block;
}
.js-css-menu > li:hover > a {
  background-color: #eee;
}
.js-css-menu > li > a:active {
  background-color: #ddd;
}
.js-css-menu > li.current > a {
  background-color: #ccc;
}
{% endhighlight %}

Since I used an unordered list, we have to strip the margins and list styling. This is done by <span class="highlight">list-style: none; padding: 0; margin: 0</span>.

By default, list items are block elements; therefore, to make the menu horizontal, we have to make them inline. That’s done by <span class="highlight">display: inline-block</span>.

### Dropdown

{% highlight css %}
.js-css-menu > li div {
  position: absolute; display: none;
}
.js-css-menu > li div ul {
  float: left;
}
.js-css-menu > li:hover div {
  background: #b00000; display: block
}
{% endhighlight %}

The dropdown menu is created with a div. Since you want it to be hidden until you hover over the link with the menu, you want to initially hide it with <span class="highlight">display: none</span>. You’ll then display it with <span class="highlight">display: block</span> in the hover action.

### Vertical

{% highlight css %}
.js-css-menu.vertical {
  width: 100px; /* Adjust the width of the vertical menu */
}
.js-css-menu.vertical > li {
  display: block; float: none; position: relative;
}
.js-css-menu.vertical > li div {
  width: 150px; top: 0;
  left: 101px; /* Adjust the left value according to the width of the vertical menu */
}
{% endhighlight %}

Not much needs to be done to make the menu vertical. To start, add class "vertical" to the menu. Because in order to make the horizontal menu, we had to make the list-items display inline, we must go back to making them block so they can stack. You can achieve that with <span class="highlight">display: block; float: none; position: relative</span>.

Although the list-items are now block, the unordered list is still inline; therefore, we must give your menu a custom width. You’ll also have to, based on the width of your menu, adjust the left value of the dropdown div to your liking. If you want, you can even adjust the top value of the div as well. In addition,  you may have to adjust the width of the div.

### Responsive

{% highlight css %}
@media (max-width: 480px) { /* To adjust the "breaking point" of the responsive menu, change 480px to a value of your choosing. */
  .js-css-menu.responsive, .js-css-menu.responsive > li {
    width: auto!important;
    display: block;
    float: none;
  }
  .js-css-menu.responsive > li div {
    display: none!important;
  }
}
{% endhighlight %}

In order to achieve a responsive menu, we’ll be using media CSS queries. <span class="highlight">@media (max-width: 480px)</span> is strictly indicating any CSS inside of this block will only be set if the width of your browser is less-than-or-equal-to 480px (the maximum width allowed for this block of CSS is 480px).

Some styles are inherited from the styles set above; therefore, it’s sometimes necessary to set the <span class="highlight">!important</span> flag to force the style.

One the CSS is set, just add the class "responsive" to the menu.

## Demo

I created a fully-functional demo where you can play with some of the options and also download the demo files for use on your website.

<p><a href="{{ site.labs_url }}/responsive-css-menu-dropdown/" class="button button--labs" target="_blank">See the <b>Demo</b></a></p>

I hope you benefited from this tutorial.