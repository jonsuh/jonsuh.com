---
layout: post
title: jQuery Ajax Call to PHP Script with JSON Return
date: "2012-09-18"
comments: false
excerpt: Ajax allows you to run server-side validations, form submissions, data retrieval, and other server-side stuff in the background (asynchronously) without interfering with the existing page where the request was made. It’s a beautiful thing, but best of all it’s not very difficult to do.
tags:
- front-end-development
- development
- javascript
- json
- jquery
- php
- tutorial
---

User experience plays a vital role in excellent web design. Ajax allows you to run server-side validations, form submissions, data retrieval, and other server-side stuff in the background (asynchronously) without interfering with the existing page where the request was made. It’s a beautiful thing, but best of all it’s not very difficult to do.

<!--more-->

<p><a href="{{ site.labs_url }}/jquery-ajax-php-json/" class="button button--labs" target="_blank">Try the <b>Demo</b></a></p>

## HTML

We’ll first start with a form that you’d like to process with Ajax.

{% gist 3739844 js-ajax-php-json.html %}

You’ll add the form somewhere in the `<body>`. I added two input fields and one dropdown field for this demo to give you a preview of how the information is processed and returned.

Now we’ll add just a placeholder `<div>` that we’ll use to give you a visual of the information returned.

{% gist 3739844 js-ajax-php-json-return.html %}

## PHP

This is where the information that is given from the form will be passed through and processed. In this demo, we’ll save the file as `response.php` in the same location of the HTML file above.

{% gist 3739844 response.php %}

**Line 2:** First, check that the request that’s being made is an Ajax request with `is_ajax()`.

**Line 6:** Check the value of `action` with a switch statement, iterating through the values you declared.

Once a switch value match is found for `action`, in this example `test`, it will run `test_function()`, which is where you’ll run things like validating, database storing, or anything else you want run before anything is returned.

**Line 17**: Store `$_POST` to `$return`, and make any changes to `$return` so the original values of `$_POST` aren’t tampered with.

**Line 25**: Encode `$return` to JSON, set it as `$return["json"]`, and return the JSON in the next line.

## JavaScript

This is where the magic of processing the form and getting the returned values by `response.php` asynchronously happens. You’ll put the following in the `<head>`.

{% gist 3739844 js-ajax-php-json-script.html %}

For this demo, you’ll be pointing to `response.php` relatively because it should be in the same location.

**Line 5:** This is where you set the value of action which will be matched up against the case values in the switch statement from `response.php`. This way you can have multiple Ajax scripts pointing to `response.php` and separate different functions by adding additional action values set corresponding functions in `response.php`.

When the form is processed successfully, it’ll run the scripts in **lines 14-18**. You can access individual returned values by `data["value_name"]`. For example to get the favorite beverage, since the name of the input is favorite_beverage, it’ll be `data["favorite_beverage"]`. For the full JSON value, use `data["json"]`.

## Demo

Here’s a demo for you to try and also download the source code so you can test it out for yourself and manipulate it to your liking. Enjoy!

<p><a href="{{ site.labs_url }}/jquery-ajax-php-json/" class="button button--labs" target="_blank">Try the <b>Demo</b></a></p>