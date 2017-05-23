---
layout: post
title: jQuery Ajax Call to PHP Script with JSON Return
date: "2012-09-18"
excerpt: Ajax allows you to run server-side validations, form submissions, data retrieval, and other server-side stuff in the background (asynchronously) without interfering with the existing page where the request was made. It’s a beautiful thing, but best of all it’s not very difficult to do.
tags:
- development
- tutorial
- front-end-development
- javascript
- jquery
- json
- php
---

User experience plays a vital role in excellent web design. Ajax allows you to run server-side validations, form submissions, data retrieval, and other server-side stuff in the background (asynchronously) without interfering with the existing page where the request was made. It’s a beautiful thing, but best of all it’s not very difficult to do.

<!--more-->

<a href="{% labs_url /jquery-ajax-php-json/ %}">See the Demo</a>

## HTML

We’ll first start with a form that you’d like to process with Ajax.

```html
<form action="return.php" class="js-ajax-php-json" method="post" accept-charset="utf-8">
  <input type="text" name="favorite_beverage" value="" placeholder="Favorite restaurant" />
  <input type="text" name="favorite_restaurant" value="" placeholder="Favorite beverage" />
  <select name="gender">
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
  <input type="submit" name="submit" value="Submit form"  />
</form>
```

You’ll add the form somewhere in the `<body>`. I added two input fields and one dropdown field for this demo to give you a preview of how the information is processed and returned.

Now we’ll add just a placeholder `<div>` that we’ll use to give you a visual of the information returned.

```html
<div class="the-return">
  [HTML is replaced when successful.]
</div>
```

## PHP

This is where the information that is given from the form will be passed through and processed. In this demo, we’ll save the file as `response.php` in the same location of the HTML file above.

```php
<?php
if (is_ajax()) {
  if (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
    $action = $_POST["action"];
    switch($action) { //Switch case for value of action
      case "test": test_function(); break;
    }
  }
}

//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function test_function(){
  $return = $_POST;

  //Do what you need to do with the info. The following are some examples.
  //if ($return["favorite_beverage"] == ""){
  //  $return["favorite_beverage"] = "Coke";
  //}
  //$return["favorite_restaurant"] = "McDonald's";

  $return["json"] = json_encode($return);
  echo json_encode($return);
}
?>
```

**Line 2:** First, check that the request that’s being made is an Ajax request with `is_ajax()`.

**Line 6:** Check the value of `action` with a switch statement, iterating through the values you declared.

Once a switch value match is found for `action`, in this example `test`, it will run `test_function()`, which is where you’ll run things like validating, database storing, or anything else you want run before anything is returned.

**Line 17**: Store `$_POST` to `$return`, and make any changes to `$return` so the original values of `$_POST` aren’t tampered with.

**Line 25**: Encode `$return` to JSON, set it as `$return["json"]`, and return the JSON in the next line.

## JavaScript

This is where the magic of processing the form and getting the returned values by `response.php` asynchronously happens. You’ll put the following in the `<head>`.

```js
<script type="text/javascript">
$("document").ready(function(){
  $(".js-ajax-php-json").submit(function(){
    var data = {
      "action": "test"
    };
    data = $(this).serialize() + "&" + $.param(data);
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "response.php", //Relative or absolute path to response.php file
      data: data,
      success: function(data) {
        $(".the-return").html(
          "Favorite beverage: " + data["favorite_beverage"] + "<br />Favorite restaurant: " + data["favorite_restaurant"] + "<br />Gender: " + data["gender"] + "<br />JSON: " + data["json"]
        );

        alert("Form submitted successfully.\nReturned json: " + data["json"]);
      }
    });
    return false;
  });
});
</script>
```

For this demo, you’ll be pointing to `response.php` relatively because it should be in the same location.

**Line 5:** This is where you set the value of action which will be matched up against the case values in the switch statement from `response.php`. This way you can have multiple Ajax scripts pointing to `response.php` and separate different functions by adding additional action values set corresponding functions in `response.php`.

When the form is processed successfully, it’ll run the scripts in **lines 14-18**. You can access individual returned values by `data["value_name"]`. For example to get the favorite beverage, since the name of the input is favorite_beverage, it’ll be `data["favorite_beverage"]`. For the full JSON value, use `data["json"]`.

## Demo

Here’s a demo for you to try and also download the source code so you can test it out for yourself and manipulate it to your liking. Enjoy!

<a href="{% labs_url /jquery-ajax-php-json/ %}">Try the Demo</a>
