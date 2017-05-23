---
layout: post
title: Animate SVG with CSS
date: "2014-7-09 08:30:00"
tags:
- design
- development
- tutorial
- css
- front-end-development
- svg
css:
- blog/animate-svg-with-css.css
---

Animating SVG with CSS is like animating any other element with CSS—it can be done with transitions, transforms, and keyframe animations. Once you’re familiar with the markup of an SVG, the rest is fairly straight forward.

<!--more-->

I recently played around with animating SVG with CSS, and wanted to share what I did along with my findings and techniques.

We’ll start by taking a drawing, exporting it as an SVG, and adding some animations to it. Here’s the animation we’ll achieve:

{% raw %}
<section class="svg-container blog-post-animate-svg-with-css">
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 450 250" enable-background="new 0 0 450 250" xml:space="preserve" class="svg ufo-building">
    <g class="ufo-building-float">
      <g class="building">
        <path class="building-roof" d="M416 60H267V48h149V60z M270 57h143v-6H270V57z"/>
        <path class="building-windows" d="M271.8 57.2V84h139.1V57.2H271.8z M343.5 59.5h34.6v22.1h-34.6V59.5z M341.1 81.7h-33.2V59.5 h33.2V81.7z M274.2 59.5h31.4v22.1h-31.4V59.5z M408.6 81.7h-28.2V59.5h28.2V81.7z"/>
        <g class="building-body">
          <path d="M410.9 151.9V81.9H271.8v70.1h-5.3v11.5h15.1l1.3 7.4h6.5l0.7 6h11.7l0.9-6h78.6l0.7 6h11.7l0.9-6h5.4 l1.3-7.4h15v-11.5H410.9z M274.2 84.2h134.4v67.7h-53.1v-34.6h-28.3v34.6h-53.1V84.2z M353.2 151.7h-10.6v-32.1h10.6V151.7z M340.2 151.7h-10.6v-32.1h10.6V151.7z M268.9 161.1v-6.8h2.9h8.3l1.2 6.8H268.9z M299.8 174.5h-7.6l-0.4-3.5h8.5L299.8 174.5z M391.7 174.5h-7.5l-0.4-3.5h8.5L391.7 174.5z M398 168.5H284.9l-2.4-13.9h117.9L398 168.5z M414 161.1h-12.3l1.2-6.8h8.1h3V161.1 z"/>
          <path d="M300.8 102.4c-7.5 0-13.6 6.1-13.6 13.6c0 7.5 6.1 13.6 13.6 13.6s13.6-6.1 13.6-13.6 C314.4 108.5 308.3 102.4 300.8 102.4z M300.8 127.3c-1.6 0-3.1-0.3-4.5-1l5.9-6l-1.7-1.7l-6.4 6.4c-0.8-0.6-1.5-1.2-2.1-1.9 l9.7-9.7l-1.7-1.7l-9.3 9.3c-0.8-1.5-1.3-3.3-1.3-5.2c0-6.2 5.1-11.3 11.3-11.3s11.3 5.1 11.3 11.3S307 127.3 300.8 127.3z"/>
          <path d="M382.2 129.7c7.5 0 13.6-6.1 13.6-13.6c0-7.5-6.1-13.6-13.6-13.6c-7.5 0-13.6 6.1-13.6 13.6 C368.5 123.5 374.6 129.7 382.2 129.7z M382.2 104.8c6.2 0 11.3 5.1 11.3 11.3s-5.1 11.3-11.3 11.3c-1.6 0-3.1-0.3-4.5-1l5.9-6 l-1.7-1.7l-6.4 6.4c-0.8-0.6-1.5-1.2-2.1-1.9l9.7-9.7l-1.7-1.7l-9.3 9.3c-0.8-1.5-1.3-3.3-1.3-5.2 C370.9 109.8 375.9 104.8 382.2 104.8z"/>
        </g>
        <g class="building-flames">
          <path d="M295.7 201.3l-1.1-3.2c-0.4-1.1-3.9-11.2-3.9-13.8c0-3.1 2.2-5.6 5-5.6c2.8 0 5 2.5 5 5.6 c0 2.6-3.5 12.7-3.9 13.8L295.7 201.3z M295.7 181.1c-1.5 0-2.7 1.5-2.7 3.3c0 1.3 1.4 5.8 2.7 9.8c1.3-3.9 2.7-8.5 2.7-9.8 C298.4 182.5 297.2 181.1 295.7 181.1z"/>
          <path d="M387.9 201.3l-1.1-3.2c-0.4-1.1-3.9-11.2-3.9-13.8c0-3.1 2.2-5.6 5-5.6c2.8 0 5 2.5 5 5.6 c0 2.6-3.5 12.7-3.9 13.8L387.9 201.3z M387.9 181.1c-1.5 0-2.7 1.5-2.7 3.3c0 1.3 1.4 5.8 2.7 9.8c1.3-3.9 2.7-8.5 2.7-9.8 C390.6 182.5 389.4 181.1 387.9 181.1z"/>
        </g>
      </g>
      <g class="ufo-big">
        <path class="ufo-big-body" d="M143.1 108.7l-1.3-0.7c-8.5-4.8-16-9-26.3-11.6c0 0 0-0.1 0-0.1c0-7.7-3-14-8.7-18.2 c-4.9-3.6-11.7-5.6-19.5-5.8v-4.7c1.4-0.5 2.4-1.8 2.4-3.3c0-1.9-1.6-3.5-3.5-3.5c-1.9 0-3.5 1.6-3.5 3.5c0 1.5 0.9 2.8 2.3 3.3 v4.7c-7.8 0.2-14.5 2.2-19.4 5.8c-5.7 4.2-8.7 10.5-8.7 18.2c0 0.1 0 0.2 0 0.3c-4.2 1.1-8.3 2.5-12.4 4.3c-5.1 2.2-9.9 4.8-13.9 7 l-1.3 0.7l2.4 2.6h31.5c4.9 5.4 12.6 8.1 23 8.1c10.4 0 18.1-2.7 23-8.1h31.5L143.1 108.7z M86.1 63.2c0.6 0 1.2 0.5 1.2 1.2 c0 0.6-0.5 1.2-1.2 1.2c-0.6 0-1.2-0.5-1.2-1.2C84.9 63.8 85.5 63.2 86.1 63.2z M61.1 86.7c1.3-2.6 3.2-4.9 5.7-6.7 c4.8-3.5 11.4-5.3 19.3-5.3c7.9 0 14.5 1.8 19.3 5.3c2.5 1.8 4.4 4.1 5.7 6.7c1.3 2.7 2.1 5.8 2.1 9.3H59.4H59 C59.1 92.5 59.8 89.4 61.1 86.7z M100.6 114.6c-3.9 1.7-8.8 2.6-14.5 2.6c-5.8 0-10.6-0.9-14.5-2.6c-2-0.9-3.7-1.9-5.2-3.2h39.5 C104.3 112.7 102.6 113.8 100.6 114.6z M33.3 109.1c12-6.6 19.1-9.1 26.4-10.8h53.7c10.1 2.4 17.1 6.1 25.5 10.8H33.3z"/>
        <g class="ufo-big-lights">
          <path class="ufo-big-lights-light ufo-big-lights-light--1" d="M64.7 94.4c1.9 0 3.5-1.6 3.5-3.5c0-1.9-1.6-3.5-3.5-3.5s-3.5 1.6-3.5 3.5C61.2 92.8 62.8 94.4 64.7 94.4z M64.7 89.7c0.6 0 1.2 0.5 1.2 1.2c0 0.6-0.5 1.2-1.2 1.2c-0.6 0-1.2-0.5-1.2-1.2C63.6 90.3 64.1 89.7 64.7 89.7z"/>
          <path class="ufo-big-lights-light ufo-big-lights-light--2" d="M75.4 94.4c1.9 0 3.5-1.6 3.5-3.5c0-1.9-1.6-3.5-3.5-3.5c-1.9 0-3.5 1.6-3.5 3.5 C71.9 92.8 73.5 94.4 75.4 94.4z M75.4 89.7c0.6 0 1.2 0.5 1.2 1.2c0 0.6-0.5 1.2-1.2 1.2c-0.6 0-1.2-0.5-1.2-1.2 C74.2 90.3 74.8 89.7 75.4 89.7z"/>
          <path class="ufo-big-lights-light ufo-big-lights-light--3" d="M86.1 94.4c1.9 0 3.5-1.6 3.5-3.5c0-1.9-1.6-3.5-3.5-3.5c-1.9 0-3.5 1.6-3.5 3.5 C82.6 92.8 84.2 94.4 86.1 94.4z M86.1 89.7c0.6 0 1.2 0.5 1.2 1.2c0 0.6-0.5 1.2-1.2 1.2c-0.6 0-1.2-0.5-1.2-1.2 C84.9 90.3 85.5 89.7 86.1 89.7z"/>
          <path class="ufo-big-lights-light ufo-big-lights-light--4" d="M96.8 94.4c1.9 0 3.5-1.6 3.5-3.5c0-1.9-1.6-3.5-3.5-3.5c-1.9 0-3.5 1.6-3.5 3.5 C93.3 92.8 94.9 94.4 96.8 94.4z M96.8 89.7c0.6 0 1.2 0.5 1.2 1.2c0 0.6-0.5 1.2-1.2 1.2c-0.6 0-1.2-0.5-1.2-1.2 C95.6 90.3 96.1 89.7 96.8 89.7z"/>
          <path class="ufo-big-lights-light ufo-big-lights-light--5" d="M107.5 94.4c1.9 0 3.5-1.6 3.5-3.5c0-1.9-1.6-3.5-3.5-3.5c-1.9 0-3.5 1.6-3.5 3.5 C104 92.8 105.6 94.4 107.5 94.4z M107.5 89.7c0.6 0 1.2 0.5 1.2 1.2c0 0.6-0.5 1.2-1.2 1.2c-0.6 0-1.2-0.5-1.2-1.2 C106.3 90.3 106.8 89.7 107.5 89.7z"/>
        </g>
      </g>
      <g class="ufo-small">
        <path class="ufo-small-body" d="M184.9 164.8c-0.4-0.2-4.3-1.2-10.2-2.3c-1.1-0.2-2.2-0.4-3.5-0.6c-0.1-3.9-2.2-7.2-6.1-9.5 c-3.6-2.1-8.4-3.1-14-3.1c-5.4 0-10.4 1.2-14 3.3c-3.8 2.2-5.9 5.4-6.1 9c-1.2 0.2-2.4 0.3-3.4 0.5c-5.5 0.8-9.5 1.7-10.1 2 c-1 0.5-1.7 1.8-1.6 3.1c0.1 1.2 0.9 2 2 2.3c6.9 1.6 25.4 1.8 33 1.8c22.8 0 30.7-0.8 33.4-1.2c1-0.2 1.7-1.1 1.8-2.3 C186.4 166.1 185.7 165.1 184.9 164.8z M138.3 154.5c3.3-1.9 7.8-3 12.9-3c5.1 0 9.7 1 12.9 2.9c2.2 1.3 4.8 3.5 5 7.3 c-5-0.7-11.2-1.2-18-1.2c-6.8 0-12.9 0.5-17.8 1C133.7 157.9 136.2 155.7 138.3 154.5z M184 167.8c-6.1 1-23.2 1.2-32.9 1.2 c-15.7 0-27.8-0.6-32.5-1.7c-0.2-0.1-0.3-0.2-0.4-0.4c0-0.4 0.2-0.8 0.3-0.9c1.2-0.4 14.9-3.5 32.5-3.5c17.9 0 31.8 3.9 32.9 4.2 C184.2 167 184.2 167.6 184 167.8z"/>
      </g>
    </g>
    <image src="/assets/images/blog/animate-svg-with-css/ufo-building.png"/>
  </svg>
</section>
{% endraw %}

## Drawing

First step’s first—drawing. The drawings above were done in Illustrator so for this guide, I’ll be referencing it. Illustrator is also great for saving as SVG.

Size the artboard. Because we’ll be making the SVG responsive, actual size doesn’t really matter, but proportion does. Position the images on the artboard as it would look in the first frame of the animation.

{% figure src="illustrator-canvas.jpg" %}

Separate the parts of your drawing into layers and groups (like you would in Photoshop), especially if any of them are going to be animated. (I’ll further explain why later, but basically this will help you identify the components of your drawing in the markup of the SVG)

If you’ve added text with the Text Tool, convert them into outlines (if the user does not have the font installed, it’ll render in an unpredictable manner. By converting them into outlines, they’re converted into shapes and the font dependency is eliminated). Select the text, then from the menu, `Type > Create Outlines`.

## SVG

When you’re done, save it as an SVG. From Illustrator: `File > Save As...` and select `SVG (svg)` from the Format dropdown.

You’ll then be asked to set your SVG options. Set them as follows, then save:

{% figure src="illustrator-svg-options.png" %}

- SVG Profiles: SVG 1.1
- Fonts Type: SVG
- Subsetting: None

Open the SVG file in your text editor—you’ll notice the markup has the names of the layers and groups you created in Illustrator as `id`s. This is extremely helpful when identifying the elements of your illustration.

{% figure src="svg-markup.png" %}

## HTML

Copy the markup between (and including) `<svg>` and `</svg>` and drop it into your HTML. Here’s the raw SVG for you to work with (view source):

<a href="/assets/images/blog/animate-svg-with-css/raw.svg">Download the example SVG</a>

Clean up the markup. The `<g>` element represent a group of paths—treat them like you would a `<div>`. I’d suggest things like converting `id` names to `class` names and declaring the fill color in the CSS.

Before you clean up the markup, you may want to run the SVG through an optimizer like [SVGO](https://github.com/svg/svgo) or [SVG-Optimiser](https://petercollingridge.appspot.com/svg_optimiser).

Wrap the SVG in a container. Here we’ll use `.svg-container`.

```xml
<div class="svg-container">
  <svg class="svg ufo-building" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 450 250" enable-background="new 0 0 450 250" xml:space="preserve">
    <g class="ufo-building-float">
      <g class="building">
        <g class="building-flames">
          <path d="M295.7,201.3l-1..."/>
          <path d="M387.9,201.3l-1..."/>
        </g>
        <g class="building-body">
          <path d="..."/>
        </g>
        <path class="building-windows" d="..."/>
      </g>
      <g class="ufo-big">
        <g class="ufo-big-lights">
          <path class="ufo-big-lights-light ufo-big-lights-light--1" d="..."/>
          <path class="ufo-big-lights-light ufo-big-lights-light--2" d="..."/>
          ...
        </g>
      </g>
      <g class="ufo-small">
        ...
      </g>
    </g>
  </svg>
</div>
```

## CSS

The beautiful thing about SVG is that it’s infinitely scalable irrespective of screen size and pixel density—a wonderful thing for responsive web design. Make the SVG responsive:

```css
.svg {
  width: 100%;
  height: auto;
}
```

You can also set the fill value of a path in CSS, like you would any other attribute.

```css
.svg path {
  fill: #000;
}

.building-flames path {
  fill: #ff0000;
}
```

## Animation

Here’s the really fun part! Now that we’ve properly grouped the elements and given them classes, we can easily target and animate them with CSS.

### Floating UFOs and building

We’ll first animate the UFOs and buildings as if they were floating. Let’s use 5 seconds as the timeline of the animation.

Since the same animation will be applied to both the UFOs and building, all of them were wrapped  in group `<g class="ufo-building-float">` like such:

```xml
<g class="ufo-building-float">
  <g class="building">
    ...
  </g>
  <g class="ufo-big">
    ...
  </g>
  <g class="ufo-small">
    ...
  </g>
</g>
```

Create a keyframe animation* named `ufo-building-float` and apply it to `.ufo-building-float`.

<small>*If you’re not familiar with CSS keyframes and animations, I suggest you read a bit about CSS3 animations and its syntax. The [CSS Animations Pocket Guide](http://valhead.com/book/) by [Val Head](http://www.valhead.com/) is a great resource.</small>

> **Note:** The following CSS examples do _not_ include browser-specific, vendor prefixes. You’ll have to add them on your own. Example:

```css
@keyframes ufo-building-float {
  0%   {transform: translateY(0)}
  25%  {transform: translateY(-25px)}
  75%  {transform: translateY(25px)}
  100% {transform: translateY(0)}
}

.ufo-building-float {
  animation: ufo-building-float 5s linear infinite;
}
```

### UFOs fading in and out

The next animation will fade the UFOs in-and-out. Create two separate keyframes and stagger the fading in-and-out so each UFO animates in separate intervals.

```css
@keyframes ufo-big {
  0%        {opacity: 0}
  15%, 70%  {opacity: 1}
  85%, 100% {opacity: 0}
}

@keyframes ufo-small {
  0%, 10%  {opacity: 0}
  25%, 85% {opacity: 1}
  100%     {opacity: 0}
}

.ufo-big {
  animation: ufo-big 5s ease infinite;
}

.ufo-small {
  animation: ufo-small 5s ease infinite;
}
```

### Blinking UFO lights

Now the synchronous blinking of the lights. Each light is its own path and has class `ufo-big-lights-light`, but also has a unique modifying class that indicates which light it is.

```html
<g class="ufo-big">
  <g class="ufo-big-lights">
    <path class="ufo-big-lights-light ufo-big-lights-light--1" d="..."/>
    <path class="ufo-big-lights-light ufo-big-lights-light--2" d="..."/>
    ...
  </g>
</g>
```

Create the keyframe animation.

```css
@keyframes ufo-big-lights {
  0%        {fill: #000}
  20%       {fill: #fbcb43}
  40%, 100% {fill: #000}
}

.ufo-big-lights-light {
  animation: ufo-big-lights 2.5s ease infinite;
}
```

Since we don’t want the lights to blink simultaneously, break up the animation of each light by `.2s` with `animation-delay`.

```css
.ufo-big-lights--2 {animation-delay: .2s}
.ufo-big-lights--3 {animation-delay: .4s}
.ufo-big-lights--4 {animation-delay: .6s}
.ufo-big-lights--5 {animation-delay: .8s}
```

### Flames

Now let’s make the flames red and animate them. To give them a flame-like effect, scale them up and down along the Y axis and loop it.

```css
@keyframes building-flames {
  0%   {transform: scale(1, 1)}
  50%  {transform: scale(1, 1.1)}
  100% {transform: scale(1, 1)}
}

.building-flames path {
  fill: #d84437;
  animation       : building-flames .15s ease infinite;
  transform-origin: center top;
}
```

A couple of notes: `transform-origin` is set as `center top`; otherwise, it will scale at the center of the element, throwing off the positioning. Firefox does not support `transform-origin` for groups; therefore, we have to animate the `path`.

## Graceful Degradation

Browsers that do not support SVG will ignore the `<svg>` tag. Using a static image as the fallback, we’ll use a [neat little trick presented by Alexey Ten](http://lynn.ru/examples/svg/en.html) with the `<image>` element and nesting it inside the SVG.

```html
<svg class="svg ufo-building" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 450 250" enable-background="new 0 0 450 250" xml:space="preserve">
  <g class="ufo-building">
    <path d="M295.7,201.3l-1..."/>
  </g>
  ...
  <image src="ufo-building-static.jpg" class="svg-fallback">
</svg>
```

## Add your own animations

Now that you’ve gone this far, go wild and add your own shapes, illustrations, and/or animations.

One idea is to make the floating of the UFOs and building more realistic—use a bezier curve as opposed to the linear timing function.

Feel free to share what you’ve done with me—I’d love to take a look <a href="https://twitter.com/jonsuh">@jonsuh</a>.
