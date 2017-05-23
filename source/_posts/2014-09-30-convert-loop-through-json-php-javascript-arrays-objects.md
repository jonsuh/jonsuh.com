---
layout: post
title: Convert and Loop through JSON with PHP and JavaScript Arrays/Objects
date: "2014-09-30 09:17:00"
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

- [Working with PHP](#convert-json-string-to-php-array-or-object)
- [Working with JavaScript](#convert-json-string-to-javascript-object)
- [Working with both PHP and JavaScript](#dynamically-get-json-via-ajax-and-loop-through-json)

## Convert JSON String to PHP Array or Object

PHP >= 5.2.0 features a function, `json_decode`, that decodes a JSON string into a PHP variable. By default it returns an object. The second parameter accepts a boolean that when set as `true`, tells it to return the objects as associative arrays. You can learn more about the `json_decode` function from [PHP’s documentation](http://php.net/manual/en/function.json-decode.php).

```php
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
```

## Loop through PHP Array or Object

Loop through a PHP array or object with a `foreach` loop.

```php
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
```

Note the differences in accessing the values of an array vs an object.

## Convert PHP Array or Object to JSON String

PHP also features a `json_encode` function to convert an array or object into a string. Read more about the `json_encode` function from [PHP’s documentation](http://php.net/manual/en/function.json-encode.php).

```php
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
```

Note that I’m using the short array syntax that’s featured in PHP 5.4+.

```php
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
```

---

## Convert JSON String to JavaScript Object

JavaScript has a built-in `JSON.parse()` method that parses a JSON string and returns an object.

```js
<script>
  // Convert JSON String to JavaScript Object
  var JSONString = '[{"name":"Jonathan Suh","gender":"male"},{"name":"William Philbin","gender":"male"},{"name":"Allison McKinnery","gender":"female"}]';

  var JSONObject = JSON.parse(JSONString);
  console.log(JSONObject);      // Dump all data of the Object in the console
  alert(JSONObject[0]["name"]); // Access Object data
</script>
```

`JSON.parse()` is very well-supported, but there are browsers that do not support it (i.e. <= IE 7. More information at [caniuse.com](http://caniuse.com/#feat=json)).

jQuery 1.x has a `$.parseJSON()` method that should fill in the gaps for those browsers if you’re needing to support them. You can also use the [JSON-js](https://github.com/douglascrockford/JSON-js) library as a polyfill.

```js
<script>
  // Convert JSON String to JavaScript Object with jQuery
  var JSONString = "..."; // Replace ... with your JSON String

  var JSONObject = $.parseJSON(JSONString);
  console.log(JSONObject);      // Dump all data of the Object in the console
  alert(JSONObject[0]["name"]); // Access Object data
</script>
```

## Loop through JavaScript Object

You can then loop through a JavaScript object using a `for in` loop.

```js
<script>
  // Loop through Object
  var JSONObject = ...; // Replace ... with your JavaScript Object

  for (var key in JSONObject) {
    if (JSONObject.hasOwnProperty(key)) {
      console.log(JSONObject[key]["name"] + ", " + JSONObject[key]["gender"]);
    }
  }
</script>
```

## Convert JavaScript Object to JSON String

JavaScript has a `JSON.stringify` method to convert a value into a JSON string.

```js
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
```

Like `JSON.parse`, `JSON.stringify` is not supported in dinosaur browsers like <= IE 7. You can use the [JSON-js library](https://github.com/douglascrockford/JSON-js) to polyfill `JSON.stringify` as well.

---

You can combine the methods above to create powerful, dynamic implementations on your website or application.

Let’s say you want to get information from a database, safely return the data as JSON, and loop through it dynamically, you can do so with a bit of PHP and JavaScript with Ajax.

## Dynamically Get JSON via Ajax and Loop Through JSON

Let’s assume your database structure looks like the following:

```text
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
```

And you want to dynamically get a list of people from the database based on gender, like this:

{% figure src="dynamic-select.gif" %}

Let’s start with the front-end file `index.html` that’ll have a select dropdown with genders to select from, a table to display the results, and the script to handle the Ajax. The JavaScript is written in jQuery.

```html
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
```

Now let’s create a `response.php` file to handle the back-end logic of getting the information from the database and returning the results as a JSON string.

```php
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
```

To get a more in-depth and better example of PHP-JSON-JavaScript/jQuery-Ajax interaction, read my [jQuery Ajax Call to PHP Script with JSON Return](/blog/jquery-ajax-call-to-php-script-with-json-return/) post.
