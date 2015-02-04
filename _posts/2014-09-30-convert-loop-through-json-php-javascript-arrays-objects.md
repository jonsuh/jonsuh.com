---
layout: post
title: Convert and Loop through JSON with PHP and JavaScript Arrays/Objects
date: "2014-09-30 09:17:00"
comments: false
tags:
- development
- tutorial
- front-end-development
- javascript
- json
- php
---

If you’re working with JSON (JavaScript Object Notation) and either need to convert a JSON string to array or object and loop through it or vice-versa, take an array or object and convert it to a JSON string to return, both can be done in PHP or JavaScript.

<!--more-->

I broke up this post into three sections:

- <a href="#php">Working with PHP</a>
- <a href="#javascript">Working with JavaScript</a>
- <a href="#php-javascript">Working with both PHP and JavaScript</a>

<a id="php"></a>

## Convert JSON String to PHP Array or Object

PHP >= 5.2.0 features a function, `json_decode`, that decodes a JSON string into a PHP variable. By default it returns an object. The second parameter accepts a boolean that when set as `true`, tells it to return the objects as associative arrays. You can learn more about the `json_decode` function from <a href="http://php.net/manual/en/function.json-decode.php" target="_blank">PHP’s documentation</a>.

{% highlight php %}
<?php
  // JSON string
  $someJSON = '[{"name":"Jonathan Suh","gender":"male"},{"name":"William Philbin","gender":"male"},{"name":"Allison McKinnery","gender":"female"}]';

  // Convert JSON string to Array
  $someArray = json_decode($someJSON, true);
  print_r($someArray);        // Dump all data of the Array
  echo $someArray[0]["name"]; // Access Array data

  // Convert JSON string to Object
  $someObject = json_decode($someJSON);
  print_r($someObject);      // Dump all data of the Object
  echo $someObject[0]->name; // Access Object data
?>
{% endhighlight %}

## Loop through PHP Array or Object

Loop through a PHP array or object with a `foreach` loop.

{% highlight php %}
<?php
  // Loop through Array
  $someArray = ...; // Replace ... with your PHP Array
  foreach ($someArray as $key => $value) {
    echo $value["name"] . ", " . $value["gender"] . "<br>";
  }

  // Loop through Object
  $someObject = ...; // Replace ... with your PHP Object
  foreach($someObject as $key => $value) {
    echo $value->name . ", " . $value->gender . "<br>";
  }
?>
{% endhighlight %}

Note the differences in accessing the values of an array vs an object.

## Convert PHP Array or Object to JSON String

PHP also features a `json_encode` function to convert an array or object into a string. Read more about the `json_encode` function from <a href="http://php.net/manual/en/function.json-encode.php" target="_blank">PHP’s documentation</a>.

{% highlight php %}
<?php
  // Array
  $someArray = [
    [
      "name"   => "Jonathan Suh",
      "gender" => "male"
    ],
    [
      "name"   => "William Philbin",
      "gender" => "male"
    ],
    [
      "name"   => "Allison McKinnery",
      "gender" => "female"
    ]
  ];

  // Convert Array to JSON String
  $someJSON = json_encode($someArray);
  echo $someJSON;
?>
{% endhighlight %}

Note that I’m using the short array syntax that’s featured in PHP 5.4+.

{% highlight php %}
<?php
  $array = array(
    "foo" => "bar",
    "bar" => "foo"
  );

  // as of PHP 5.4
  $array = [
    "foo" => "bar",
    "bar" => "foo"
  ];
?>
{% endhighlight %}

***

<a id="javascript"></a>

## Convert JSON String to JavaScript Object

JavaScript has a built-in `JSON.parse()` method that parses a JSON string and returns an object.

{% highlight javascript %}
<script>
  // Convert JSON String to JavaScript Object
  var JSONString = '[{"name":"Jonathan Suh","gender":"male"},{"name":"William Philbin","gender":"male"},{"name":"Allison McKinnery","gender":"female"}]';

  var JSONObject = JSON.parse(JSONString);
  console.log(JSONObject);      // Dump all data of the Object in the console
  alert(JSONObject[0]["name"]); // Access Object data
</script>
{% endhighlight %}

`JSON.parse()` is very well-supported, but there are browsers that do not support it (i.e. <= IE 7. More information at <a href="http://caniuse.com/#feat=json" target="_blank">caniuse.com</a>).

jQuery 1.x has a `$.parseJSON()` method that should fill in the gaps for those browsers if you’re needing to support them. You can also use the <a href="https://github.com/douglascrockford/JSON-js" target="_blank">JSON-js</a> library as a polyfill.

{% highlight javascript %}
<script>
  // Convert JSON String to JavaScript Object with jQuery
  var JSONString = "..."; // Replace ... with your JSON String

  var JSONObject = $.parseJSON(JSONString);
  console.log(JSONObject);      // Dump all data of the Object in the console
  alert(JSONObject[0]["name"]); // Access Object data
</script>
{% endhighlight %}

## Loop through JavaScript Object

You can then loop through a JavaScript object using a `for in` loop.

{% highlight javascript %}
<script>
  // Loop through Object
  var JSONObject = ...; // Replace ... with your JavaScript Object

  for (var key in JSONObject) {
    if (JSONObject.hasOwnProperty(key)) {
      console.log(JSONObject[key]["name"] + ", " + JSONObject[key]["gender"]);
    }
  }
</script>
{% endhighlight %}

## Convert JavaScript Object to JSON String

JavaScript has a `JSON.stringify` method to convert a value into a JSON string.

{% highlight javascript %}
<script>
  var JSONObject = [
    {
      "name": "Jonathan Suh",
      "gender": "male"
    },
    {
      "name": "William Philbin",
      "gender": "male"
    },
    {
      "name": "Allison McKinnery",
      "gender": "female"
    }
  ];

  var JSONString = JSON.stringify(JSONObject);
  alert(JSONString);
</script>
{% endhighlight %}

Like `JSON.parse`, `JSON.stringify` is not supported in dinosaur browsers like <= IE 7. You can use the <a href="https://github.com/douglascrockford/JSON-js" target="_blank">JSON-js library</a> to polyfill `JSON.stringify` as well.

***

<a id="php-javascript"></a>

You can combine the methods above to create powerful, dynamic implementations on your website or application.

Let’s say you want to get information from a database, safely return the data as JSON, and loop through it dynamically, you can do so with a bit of PHP and JavaScript with Ajax.

## Dynamically Get JSON via Ajax and Loop Through JSON

Let’s assume your database structure looks like the following:

{% highlight text %}
Table: people
┌────┬────────────────────┬─────────┐
| id | name               | gender  |
├────┼────────────────────┼─────────┤
| 0  | Jonathan Suh       | male    |
| 1  | William Philbin    | male    |
| 2  | Allison McKinnery  | female  |
| 3  | Becky Borgster     | female  |
| 4  | Victoria Einsteen  | female  |
└────┴────────────────────┴─────────┘
{% endhighlight %}

And you want to dynamically get a list of people from the database based on gender, like this:

<p><img src="/assets/images/blog/2014/convert-loop-through-json-php-javascript-arrays-objects/dynamic-select.gif" style="max-width: 18.750em"></p>

Let’s start with the front-end file `index.html` that’ll have a select dropdown with genders to select from, a table to display the results, and the script to handle the Ajax. The JavaScript is written in jQuery.

{% highlight html %}
<select id="gender" name="gender">
  <option value="male">Male</option>
  <option value="female">Female</option>
</select>

<table id="people" border="1">
  <thead>
    <th>Name</th>
    <th>Gender</th>
  </thead>
  <tbody>

  </tbody>
</table>

<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
<script>
$("#gender").on("change", function() {
  $.ajax({
    type: "POST",
    data: {
      "gender": $("#gender").val()
    },
    url: "response.php",
    dataType: "json",
    success: function(JSONObject) {
      var peopleHTML = "";

      // Loop through Object and create peopleHTML
      for (var key in JSONObject) {
        if (JSONObject.hasOwnProperty(key)) {
          peopleHTML += "<tr>";
            peopleHTML += "<td>" + JSONObject[key]["name"] + "</td>";
            peopleHTML += "<td>" + JSONObject[key]["gender"] + "</td>";
          peopleHTML += "</tr>";
        }
      }

      // Replace table’s tbody html with peopleHTML
      $("#people tbody").html(peopleHTML);
    }
  });
});
</script>
{% endhighlight %}

Now let’s create a `response.php` file to handle the back-end logic of getting the information from the database and returning the results as a JSON string.

{% highlight php %}
<?php
  // File: response.php

  // Get POST gender value
  $gender = $_POST["gender"];

  // Connect to the database
  // replace the parameters with your proper credentials
  $connection = mysqli_connect("localhost", "username", "password", "database_name");

  // Query to run
  $query = mysqli_query($connection,
           "SELECT * FROM people WHERE gender = '" . $gender . "'");

  // Create empty array to hold query results
  $someArray = [];

  // Loop through query and push results into $someArray;
  while ($row = mysqli_fetch_assoc($query)) {
    array_push($someArray, [
      'name'   => $row['name'],
      'gender' => $row['gender']
    ]);
  }

  // Convert the Array to a JSON String and echo it
  $someJSON = json_encode($someArray);
  echo $someJSON;
?>
{% endhighlight %}

To get a more in-depth and better example of PHP-JSON-JavaScript/jQuery-Ajax interaction, read my [jQuery Ajax Call to PHP Script with JSON Return](/blog/jquery-ajax-call-to-php-script-with-json-return/) post.