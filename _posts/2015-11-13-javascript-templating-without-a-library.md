---
layout: post
title: JavaScript Templating Without a Library
date: "2015-11-13 06:00:00"
share_image: share.png
comments: false
tags:
- front-end-development
- development
- javascript
- tutorial
---

You may have heard of or even used JavaScript templating engines such as [Handlebars.js](http://handlebarsjs.com/), [Mustache.js](https://github.com/janl/mustache.js/) or [Underscore.js](http://underscorejs.org/). They can make rendering and updating dynamic content on your website a breeze, but if your needs are dead simple, you might not need a library.

<!--more-->

## Why JavaScript Templating?

JavaScript templating can be useful if you want dynamic content but don’t have server-side templating available. It also can argubly minimize the amount of data that’s returned to the client (e.g. data as JSON only instead of the entire markup), making sites faster and servers more responsive by lowering bandwidth and load. Let’s say you have a list, and each list item has the following markup:

```html
<li class="list-item">
  <div class="list-item-column list-item-column--avatar">
    <img src="http://example.com/assets/images/avatars/01.png" class="list-item-avatar">
  </div>
  <div class="list-item-column list-item-column--info">
    <h3 class="list-item-name">Eva Ferguson</h3>
    <h4 class="list-item-title">Founder &amp; Lead Developer</h4>
    <div class="list-item-biography">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam quisquam asperiores laborum quae doloremque voluptates explicabo libero deserunt qui. Atque!</p>
    </div>
  </div>
</li>
```

If a list needs 50+ of these items, with server-side templating we’d typically get the entire markup back from the Ajax call. Instead, if a template of the markup is available client-side, we can get just the data via Ajax (as a JSON object or an array), then parse the data and generate the final HTML using the template.

## type=\"text/template\"

We can use the `<script type=\"text/template\"></script>` technique to implement templating client-side. The browser ignores the script because the type is not recognized, but the content is still accessible, which we can use when generating HTML.

Let’s say we want to generate an unordered list like the following:

<ul id="list">
  <li data-id="5"><a href="https://basecamp.com">Basecamp</a>, Chicago, IL</li>
  <li data-id="17"><a href="https://google.com">Google</a>, Mountain View, CA</li>
</ul>

Let‘s “templatize” the markup of one of the items by using placeholders for the data like:

```html
<ul id="list">
  <!--Generated list items will go here-->
</ul>

<script id="template-list-item" type="text/template">
  {% raw %}<li>
    <a href="{{url}}">{{name}}</a>, {{city}}, {{state}}
  </li>{% endraw %}
</script>
```

Placeholder formats like `{% raw %}{{url}}{% endraw %}` should be unique since we’ll be using search-and-replace, but they’re arbitrary and can be replaced with whatever you want (i.e. `%url%`, `<% url %>`).

## Templating with JSON Objects

Now we need to parse the data and generate the HTML. Here’s an example JSON object:

```json
0: {
  "id": 5,
  "name": "Basecamp",
  "city": "Chicago",
  "state": "IL",
  "url": "https://basecamp.com/"
},
1: {
  "id": 17,
  "name": "Google",
  "city": "Mountain View",
  "state": "CA",
  "url": "http://google.com/"
}
```

The following JavaScript parses the data and replaces the placeholders of the template with the data from the JSON object.

```javascript
// JSON object we’re working with
{% raw %}var dataJSON = {
  0: {"id":5,"name":"Basecamp","city":"Chicago","state":"IL","url":"https://basecamp.com/"},
  1: {"id":17,"name":"Google","city":"Mountain View","state":"CA","url":"http://google.com/"}
};

// Cache of the template
var template = document.getElementById("template-list-item");
// Get the contents of the template
var templateHtml = template.innerHTML;
// Final HTML variable as empty string
var listHtml = "";

// Loop through JSON object dataJSON, replace placeholder tags
// with actual data, and generate final HTML
for (var key in dataJSON) {
  listHtml += templateHtml.replace(/{{id}}/g, dataJSON[key]["id"])
                          .replace(/{{name}}/g, dataJSON[key]["name"])
                          .replace(/{{city}}/g, dataJSON[key]["city"])
                          .replace(/{{state}}/g, dataJSON[key]["state"])
                          .replace(/{{url}}/g, dataJSON[key]["url"]);
}

// Replace the HTML of #list with final HTML
document.getElementById("list").innerHTML = listHtml;

{% endraw %}
```

By taking the HTML of the template, we can replace the placeholder with the actual data using JavaScript’s [`replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) and a regular expression `//g` to do a global replace (replace all occurrences).

We can also use dot notation since we’re working with an object:

```javascript
{% raw %}for (var key in dataJSON) {
  listHtml += templateHtml.replace(/{{id}}/g, dataJSON[key].id)
                          .replace(/{{name}}/g, dataJSON[key].name)
                          .replace(/{{city}}/g, dataJSON[key].city)
                          .replace(/{{state}}/g, dataJSON[key].state)
                          .replace(/{{url}}/g, dataJSON[key].url);
}{% endraw %}
```

## Templating with Arrays

If you prefer or need to work with arrays, the implementation is slightly different. For this example we’ll just use the data from above and convert it to an array before looping through it.

```javascript
// Convert dataJSON to an array
{% raw %}var dataArray = Object.keys(dataJSON).map(function(k) { return dataJSON[k]; });

// Loop through array dataArray, replace placeholder tags
// with actual data, and generate final HTML
for (i = 0; i < dataArray.length; i++) {
  listHtml += templateHtml.replace(/{{id}}/g, dataArray[i]["id"])
                          .replace(/{{name}}/g, dataArray[i]["name"])
                          .replace(/{{city}}/g, dataArray[i]["city"])
                          .replace(/{{state}}/g, dataArray[i]["state"])
                          .replace(/{{url}}/g, dataArray[i]["url"]);
}

// Replace the HTML of #list with final HTML
document.getElementById("list").innerHTML = listHtml;{% endraw %}
```

## Hooking It Up to Ajax

Now that we got the parsing of the data and generating of the HTML figured out, let’s implement the solution (with a few modifications) into a scenario where we’re getting the data via Ajax.

```javascript
{% raw %}var template = document.getElementById("template-list-item");
var templateHtml = template.innerHTML;

// Ajax Call
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState == XMLHttpRequest.DONE) {
    // On success
    if (xhr.state == 200) {
      document.getElementById("list").innerHTML = listCreateHtml(xhr.responseText);
    }
  }
}

xhr.open("GET", "/url/to/get-data/", true);
xhr.send();

// Function to generate and returns the HTML.
// Accepts an object as a parameter
function listCreateHtml(dataJSON) {
  var listHtml = "";

  for (key in dataJSON) {
    listHtml += templateHtml.replace(/{{id}}/g, dataJSON[key]["id"])
                            .replace(/{{name}}/g, dataJSON[key]["name"])
                            .replace(/{{city}}/g, dataJSON[key]["city"])
                            .replace(/{{state}}/g, dataJSON[key]["state"])
                            .replace(/{{url}}/g, dataJSON[key]["url"]);
  }

  return listHtml;
}{% endraw %}
```

Note that we created a helper function `listCreateHtml` that accepts an object to help us create the HTML.

And if you’re using jQuery for your Ajax, this is what your call could look like:

```javascript
$.ajax({
  type: "GET",
  url: "/url/to/get-data/",
  dataType: "json",
  success: function(data) {
    document.getElementById("list").innerHTML = listCreateHtml(data);
  }
});
```

## Find the Right Tool for the Job

Based on your needs, you may want to rely on a more robust JavaScript templating library like Underscore.js or Mustache.js; you may need something even more powerful like [AngularJS](https://angularjs.org/), [Backbone.js](http://backbonejs.org/), [Ember.js](http://emberjs.com/), [React.js](https://facebook.github.io/react/). 

There are a plethora of tools, frameworks, and libraries you can depend on, but the key is to properly assess your needs and find the right tools for the job. In some cases, a simple JavaScript-only solution with no dependency or library may be all you need, but that’s something that I can’t determine for you.