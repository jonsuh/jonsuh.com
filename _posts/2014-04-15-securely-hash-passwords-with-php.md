---
layout: post
title: Securely hash passwords with PHP
date: "2014-04-15 12:00:00"
comments: false
tags:
- development
- php
- tutorial
---

PHP 5.5+ now comes baked with a `password_hash` function to generate secure, one-way hashes along with a `password_verify` function to match a hash with the given password&mdash;If you’re a PHP developer, you should always be securely storing user passwords, **no** excuses.

<!--more-->

Developers have a huge responsibility when handling and storing user-sensitive information, such as a password. We should take extra precaution and the necessary steps to make sure the user’s data is safe and secure*.

<small>*Please keep in mind the following implementation is only part of the problem since it handles the data once the web server receives it; however, it does not address the other issue of securely sending the sensitive data over-the-air from the browser to the server, which is why a valid SSL certificate is necessary.</small>

## Hashing passwords

To hash a password, take the password string and pass it into `password_hash` the function as a parameter along with the algorithm you want to use, then store the returned hash into the database.

{% highlight php %}
password_hash( $password, $algorithm [, $options ] )
{% endhighlight %}

- `$password` string.
- `$algorithm` integer. Supports constants `PASSWORD_BCRYPT` or `PASSWORD_DEFAULT`.
- `$options` array.

`password_hash` also randomly generates a salt every time a hash is generated and is a part of the returned hash, so there’s no need to store salts in a separate column.

**$algorithm**  
`PASSWORD_BCRYPT` uses the `CRYPT_BLOWFISH` algorithm and will return a 60 character string. 

`PASSWORD_DEFAULT` uses the bcrypt algorithm. PHP documentation recommends that you set the column size to 255 in the event the algorithm changes over time.

**$options**  
`password_hash` supports the following options:

- `salt` - You can manually pass in your own salt, although `password_hash` randomly generates a salt for each password.
- `cost` - The algorithmic cost to be used. Default value is `10`.

{% highlight php %}
<?php
  $options = array(
    'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
    'cost' => 12,
  );
  $password_hash = password_hash($password_string, PASSWORD_BCRYPT, $options);
?>
{% endhighlight %}

Here’s a dirty, incomplete example that shows implementation of `password_hash`:

{% highlight php %}
<?php
  $password_string = mysqli_real_escape_string($_POST["password"]);
  // The value of $password_hash
  // should similar to the following:
  // $2y$10$aHhnT035EnQGbWAd8PfEROs7PJTHmr6rmzE2SvCQWOygSpGwX2rtW
  $password_hash = password_hash($password_string, PASSWORD_BCRYPT);

  $mysql_query = "INSERT INTO Users (email, password_hash)
                  VALUES ($email_address, $password_hash)";
  mysqli_query($mysql_connection, $mysql_query);
?>
{% endhighlight %}

## Verifying passwords

When checking passwords, you can use the handy-dandy `password_verify` function, which checks a password string against a password hash, then returns a boolean.

{% highlight php %}
password_verify( $password, $hash )
{% endhighlight %}

- `$password` string.
- `$hash` string.

{% highlight php %}
<?php
  $password_string = "abc123";
  $password_hash = "$2y$10$aHhnT035EnQGbWAd8PfEROs7PJTHmr6rmzE2SvCQWOygSpGwX2rtW";

  if (password_verify($password_string, $password_hash)) {
    // Correct password
  } else {
    // Incorrect password
  }
?>
{% endhighlight %}

## PHP 5.3.7+

There’s a very useful library that allows the `password_*` functions to be used on servers running PHP 5.3.7+: https://github.com/ircmaxell/password_compat

If you’re running an even older version of PHP, it’s time to upgrade&mdash;older versions of PHP contains a security issue with BCRYPT (<a href="http://php.net/security/crypt_blowfish.php" target="_blank">More information</a>).

## Password hashing functions

You can get a more thorough, in-depth explanation about the password hashing functions right from PHP’s documentation: http://us2.php.net/manual/en/ref.password.php. There are 2 additional functions that I didn’t cover, `password_get_info` and `password_needs_rehash`, that you may find userful.

For me, it always helps to know or better understand what’s going on in the background of these functions.