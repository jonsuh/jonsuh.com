---
layout: post
title: Sass BEM-Selector Support and Trailing Ampersand
date: "2014-06-06 11:42:00"
tags:
- design
- development
- tutorial
- bem
- css
- front-end-development
- sass
---

Sass 3.3 has introduced some neat features with the ampersand—it now has BEM-selector support and allows you to prepend a class to the parent element.

<!--more-->

## The Ampersand

By itself, the ampersand `&` is a shortcut to selecting the parent element. Here’s a quick example:

```scss
.link {
  color: red;

  &.is-active {
    color: blue;
  }
}
```

Resulting CSS:

```css
.link           {color: red;}
.link.is-active {color: blue;}
```

## BEM-Selector Support

BEM (Block, Element, Modifier) is a front-end naming convention. It’s a way of naming your classes to give them more contextual information and make them more human-readable. This standardizes your HTML and CSS, which allows for flexibility when multiple developers are involved on large projects and allows for more manageable scaling.

CSS Wizardry wrote a fantastic primer on BEM that has helped me get a good grasp of BEM: [MindBEMding - getting your head 'round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

Let’s say you have the following markup:

```html
<nav class="nav">
  <a href="/" class="nav__link">Home</a>
  <a href="/" class="nav__link">Work</a>
  <a href="/" class="nav__link nav__link--twitter">Twitter</a>
</nav>
```

You want `nav__link` to share much of the same attributes when it comes to the font-size, color, and padding, except the Twitter icon, which you want the font color to be blue instead of red (hence the modifier class `nav__link--twitter`).

Using the ampersand, you’ll use `&__element` and `&--modifier` to declare your element and modifier classes inside of its parent.

Here’s how the ampersand helps make your element and modifier classes a breeze:

```scss
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
```

Resulting CSS:

```css
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
```

It also supports single underscores and hyphens if you’re not a big fan of using double underscores and hyphens.

```scss
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
```

Resulting CSS:

```css
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
```

## Trailing Ampersand

The trailing ampersand allows you to prepend a class to the “master parent” element. Here’s an example of how I’ve used it:

```scss
.image {
  width: 200px;
  height: 50px;
  background: url("logo.svg") no-repeat top left;

  .no-svg & {
    background-image: url("logo.png");
  }
}
```

Resulting CSS:

```css
.image {
  width: 200px;
  height: 50px;
  background: url("logo.svg") no-repeat top left;
}
.no-svg .image {
  background-image: url("logo.png");
}
```

It will always prepend the class to the “master parent” regardless of how deep you nest is (I hope your nests aren’t this deep...)

```scss
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
```

Resulting CSS:

```scss
.no-svg .wrap .container .navigation .image {
  background-image: url("logo.png");
}
```

## Sass 3.3

In order to take advantage of BEM-selector support and the trailing ampersand, you’ll need to be running Sass >= 3.3. To upgrade Sass on your machine, run the following in your command line:

```bash
gem update sass
```

<small>You *may* have to run the command with sudo: `sudo gem update sass`</small>

To see what version of Sass you’re running, run the following:

```bash
sass -v
```
