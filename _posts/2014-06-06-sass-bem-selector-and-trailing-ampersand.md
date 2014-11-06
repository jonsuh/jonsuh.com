---
layout: post
title: Sass BEM-Selector Support and Trailing Ampersand
date: "2014-06-06 11:42:00"
comments: false
tags:
- css
- front-end-development
- sass
- tutorial
---

Sass 3.3 has introduced some neat features with the ampersand&mdash;it now has BEM-selector support and allows you to prepend a class to the parent element.

<!--more-->

## The Ampersand

By itself, the ampersand `&` is a shortcut to selecting the parent element. Here’s a quick example:

{% highlight sass %}
.link {
  color: red;

  &.is-active {
    color: blue;
  }
}
{% endhighlight %}

Resulting CSS:

{% highlight css %}
.link           {color: red;}
.link.is-active {color: blue;}
{% endhighlight %}

## BEM-Selector Support

BEM (Block, Element, Modifier) is a front-end naming convention. It’s a way of naming your classes to give them more contextual information and make them more human-readable. This standardizes your HTML and CSS, which allows for flexibility when multiple developers are involved on large projects and allows for more manageable scaling.

CSS Wizardry wrote a fantastic primer on BEM that has helped me get a good grasp of BEM: <a href="http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/" target="_blank">MindBEMding - getting your head 'round BEM syntax</a>

Let’s say you have the following markup:

{% highlight html %}
<nav class="nav">
  <a href="/" class="nav__link">Home</a>
  <a href="/" class="nav__link">Work</a>
  <a href="/" class="nav__link nav__link--twitter">Twitter</a>
</nav>
{% endhighlight %}

You want `nav__link` to share much of the same attributes when it comes to the font-size, color, and padding, except the Twitter icon, which you want the font color to be blue instead of red (hence the modifier class `nav__link--twitter`).

Using the ampersand, you’ll use `&__element` and `&--modifier` to declare your element and modifier classes inside of its parent.

Here’s how the ampersand helps make your element and modifier classes a breeze:

{% highlight sass %}
.nav {
  background: white;

  // element .nav__link
  &__link {
    font-size: 1.2em;
    color: red;
    padding: 0.2em 0.5em;

    // modifier .nav__link--twitter
    &--twitter {
      color: blue;
    }
  }
}
{% endhighlight %}

Resulting CSS:

{% highlight css %}
.nav {
  background: white;
}
.nav__link {
  font-size: 1.2em;
  color: red;
  padding: 0.2em 0.5em;
}
.nav__link--twitter {
  color: blue;
}
{% endhighlight %}

It also supports single underscores and hyphens if you’re not a big fan of using double underscores and hyphens.

{% highlight sass %}
.nav {
  background: white;

  &_link {
    font-size: 1.2em;
    color: red;
    padding: 0.2em 0.5em;

    &-twitter {
      color: blue;
    }
  }
}
{% endhighlight %}

Resulting CSS:

{% highlight css %}
.nav {
  background: white;
}
.nav_link {
  font-size: 1.2em;
  color: red;
  padding: 0.2em 0.5em;
}
.nav_link-twitter {
  color: blue;
}
{% endhighlight %}

## Trailing Ampersand

The trailing ampersand allows you to prepend a class to the "master parent" element. Here’s an example of how I’ve used it:

{% highlight sass %}
.image {
  width: 200px;
  height: 50px;
  background: url("logo.svg") no-repeat top left;

  .no-svg & {
    background-image: url("logo.png");
  }
}
{% endhighlight %}

Resulting CSS:

{% highlight css %}
.image {
  width: 200px;
  height: 50px;
  background: url("logo.svg") no-repeat top left;
}
.no-svg .image {
  background-image: url("logo.png");
}
{% endhighlight %}

It will always prepend the class to the "master parent" regardless of how deep you nest is (I hope your nests aren’t this deep...)

{% highlight sass %}
.wrap {
  .container {
    .navigation {
      .image {
        .no-svg & {
          background-image: url("logo.png");
        }
      }
    }
  }
}
{% endhighlight %}

Resulting CSS:

{% highlight sass %}
.no-svg .wrap .container .navigation .image {
  background-image: url("logo.png");
}
{% endhighlight %}

## Sass 3.3

In order to take advantage of BEM-selector support and the trailing ampersand, you’ll need to be running Sass >= 3.3. To upgrade Sass on your machine, run the following in your command line:

{% highlight bash %}
gem update sass
{% endhighlight %}

<small>You *may* have to run the command with sudo: `sudo gem update sass`</small>

To see what version of Sass you’re running, run the following:

{% highlight bash %}
sass -v
{% endhighlight %}