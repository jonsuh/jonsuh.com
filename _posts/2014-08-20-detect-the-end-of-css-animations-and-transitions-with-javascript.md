---
layout: post
title: Detect the End of CSS Animations and Transitions with JavaScript
date: "2014-08-20 09:00:00"
comments: false
tags:
- design
- development
- tutorial
- css
- front-end-development
- javascript
---

CSS allows you to create animations with transitions and keyframes that once were only possible with JavaScript or Flash. Unfortunately, with CSS there’s no way to perform a callback when an animation is complete. With JavaScript, it’s possible to detect the end of a CSS transition or animation and then trigger a function.

<!--more-->

## Separate the roles

Handle the animations (with transitions or keyframes) in your CSS; handle the event timing and triggers in your JavaScript.

{% highlight css %}
.button {
  transition-property: background-color, transform;
  transition-duration: 1.5s;
  transition-timing-function: linear;
}

.animate {
  background-color: red;
  transform: translateY(50px);
}
{% endhighlight %}

{% highlight javascript %}
$(".button").click(function() {
  $(this).addClass("animate");
});
{% endhighlight %}

## Detecting and executing when transitions end with jQuery

Using JavaScript, we can detect the `transitionend` event; however for cross-browser, support we need to include the other browsers’ prefixes.

Then bind the event with jQuery’s `one` function, which ensures that it runs only once (it unbinds the event handler after it runs once). (Read more about the <a href="http://api.jquery.com/one/" target="_blank">one function</a>)

{% highlight javascript %}
$(".button").click(function(){
  $(this).addClass("animate");
  $(this).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
              function(event) {
    // Do something when the transition ends
  });
});
{% endhighlight %}

The above solution works, but the problem is, depending on the browser, it can fire twice (i.e. Chrome supports both `webkitTransitionEnd` and `transitionend`)

Here’s what the console returns when I log the event in Chrome:

<img src="{% cdn_url /assets/images/blog/2014/detect-the-end-of-css-animations-and-transitions-with-javascript/console-twice.png %}">

## Detect the supported event property name

We’ll introduce a function, `whichTransitionEvent`, to detect the supported event property name; assign a variable, in this case `transitionEvent`, to hold the event property name; and pass the variable as the first argument of the `one` function.

{% highlight javascript %}
// Function from David Walsh: http://davidwalsh.name/css-animation-callback
function whichTransitionEvent(){
  var t,
      el = document.createElement("fakeelement");

  var transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}

var transitionEvent = whichTransitionEvent();

$(".button").click(function(){
  $(this).addClass("animate");
  $(this).one(transitionEvent,
              function(event) {
    // Do something when the transition ends
  });
});
{% endhighlight %}

This ensures that, even in Chrome, the event only fires once:

<img src="{% cdn_url /assets/images/blog/2014/detect-the-end-of-css-animations-and-transitions-with-javascript/console-once.png %}">

Here’s a demo:

<p data-height="189" data-theme-id="0" data-slug-hash="rEpqJ" data-default-tab="result" class="codepen">See the Pen <a href="http://codepen.io/jonsuh/pen/rEpqJ/">rEpqJ</a> by Jonathan Suh (<a href="http://codepen.io/jonsuh">@jonsuh</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

## Detect when animations (keyframes) end

The above solution can be slightly tweaked to account for animations done with keyframes.

Like transitions have the `transitionend` event, animations have the `animationend` event. We’ll take the `whichtransitionEvent` function and swap out instances of `transition` for `animation` (case sensitive).

{% highlight javascript %}
function whichAnimationEvent(){
  var t,
      el = document.createElement("fakeelement");

  var animations = {
    "animation"      : "animationend",
    "OAnimation"     : "oAnimationEnd",
    "MozAnimation"   : "animationend",
    "WebkitAnimation": "webkitAnimationEnd"
  }

  for (t in animations){
    if (el.style[t] !== undefined){
      return animations[t];
    }
  }
}

var animationEvent = whichAnimationEvent();

$(".button").click(function(){
  $(this).addClass("animate");
  $(this).one(animationEvent,
              function(event) {
    // Do something when the animation ends
  });
});
{% endhighlight %}

## Vanilla JavaScript

With Vanilla JavaScript, it’s slightly trickier. Using the `whichTransitionEvent` function, bind `transitionEvent` with `addEventListener`.

{% highlight javascript %}
var button = document.querySelector(".button"),
    transitionEvent = whichTransitionEvent();

button.addEventListener("click", function() {
  if (button.classList) {
    button.classList.add("animate");
  } else {
    button.className += " " + "animate";
  }

  button.addEventListener(transitionEvent, customFunction);
});

function customFunction(event) {
  button.removeEventListener(transitionEvent, customFunction);

  // Do something when the transition ends
}
{% endhighlight %}

The second argument must be a function name as opposed to `function({})`. This is important because we must unbind the listener, otherwise the listener will keep running, causing it to run multiple times.

These solutions may work in your use case, but if you’re looking for more intricate, complex animations, you may want to look into a library that is feature-rich and offer more power, like <a href="http://greensock.com" target="_blank">GreenSock</a>.