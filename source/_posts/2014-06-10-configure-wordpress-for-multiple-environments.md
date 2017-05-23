---
layout: post
title: Configure WordPress for Multiple Environments
date: "2014-06-10 09:30:00"
tags:
- development
- tutorial
- php
- wordpress
---

By default, WordPress is set up to run in one environment—it has one configuration file, `wp-config.php`, that holds one set of database credentials along with authentication keys/salts and debugging options. With just a few tweaks, you can get WordPress set up to handle multiple environments with different databases and options for each environment.

<!--more-->

*The following is an adapted version of what I’ve done for my CodeIgniter applications.*

Let’s say the following environments exist for your website:

```
Local      : http://website.local
Development: http://dev.website.com
Staging    : http://staging.website.com
Production : http://website.com
```

It’s important to separate databases and authentication keys and salts for each environment, as well as have debugging turned on for local, development, and even staging but off for production.

Edit your `wp-config.php` file so it looks like the following:

```php
<?php

// Set your environment/url pairs
$environments = array(
  'local'       => 'website.local',
  'development' => 'development.website.com',
  'staging'     => 'staging.website.com',
  'production'  => 'website.com'
);

// Get the hostname
$http_host = $_SERVER['HTTP_HOST'];

// Loop through $environments to see if there’s a match
foreach($environments as $environment => $hostname) {
  if (stripos($http_host, $hostname) !== FALSE) {
    define('ENVIRONMENT', $environment);
    break;
  }
}

// Exit if ENVIRONMENT is undefined
if (!defined('ENVIRONMENT')) exit('No database configured for this host');

// Location of environment-specific configuration
$wp_db_config = 'wp-config/wp-db-' . ENVIRONMENT . '.php';

// Check to see if the configuration file for the environment exists
if (file_exists(__DIR__ . '/' . $wp_db_config)) {
  require_once($wp_db_config);
} else {
  // Exit if configuration file does not exist
  exit('No database configuration found for this host');
}

/* That’s all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
  define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
```

Edit `$environments` accordingly so they match your environments and their corresponding hostnames.

Then create a `wp-config` directory in the root of your project and create the following files inside:

```text
website.com
├── wp-config
│   ├── wp-db-local.php
│   ├── wp-db-development.php
│   ├── wp-db-staging.php
└── └── wp-db-production.php
```

Edit and add the following lines to each of your `wp-db-*.php` files:

```php
<?php
// Prevent file from being accessed directly
if (!defined('ABSPATH')) exit();

define('DB_NAME',     'database_name_here');
define('DB_USER',     'username_here');
define('DB_PASSWORD', 'password_here');
define('DB_HOST',     'localhost');
define('DB_CHARSET',  'utf8');
define('DB_COLLATE',  '');

define('AUTH_KEY',         'put your unique phrase here');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');

$table_prefix = 'wp_';

define('WPLANG',   '');
define('WP_DEBUG', true);
```

For `wp-db-production.php` turn debugging off by defining `WP_DEBUG` to `false`

```php
define('WP_DEBUG', false);
```

Voila—Now all you need to do is drop in the correct credentials for each of your environments and you’re done!
