---
layout: post
title: Integrating React with gulp
date: "2015-09-29 08:00:00"
date_updated: "2016-02-17 18:05:00"
excerpt: "Setting up gulp to include React in a local development environment."
share_image: share.png
tags:
- development
- tutorial
- front-end-development
- gulp
- javascript
- react
---

*Note: This post was updated to (1) accommodate the change in React 0.14 where they split up React into a core library and a DOM adapter (ReactDOM) and (2) remove Bower in favor of npm.*

I’ve been learning [React](https://facebook.github.io/react), a JavaScript library by Facebook for building user interfaces, for the past few days during my commute—it’s been challenging, but a lot of fun. After a couple of days of learning the basics (reading their [Getting Started](https://facebook.github.io/react/docs/getting-started.html) introduction to React and following their [tutorial](https://facebook.github.io/react/docs/tutorial.html)), I reconfigured my `gulpfile.js` to include React in my local development environment.

<!--more-->

## Setup

*Note: If you’re new to gulp, you may want to get familiarized with it before continuing (this post assumes you’re familiar with it). Here are [two](http://alistapart.com/blog/post/getting-started-with-gulp) [articles](https://css-tricks.com/getting-started-gulp/) that’ll help you get started with gulp.*

My gulp workflow features the following:

- Sass and Autoprefixer
- Convert JSX to JavaScript
- Concatenate JavaScript files
- BrowserSync with auto-refresh of CSS changes
- ESLint to identify JSX and JavaScript errors/problems
- Sourcemaps to help debug JSX, JavaScript and Sass
- Error reporting in console without pipe breaking

I’ll only be covering in detail the JavaScript and JSX parts of this guide. Here’s a look at my barebone project file structure:

```text
example.com
├── assets
│   ├── js
│   │   └── src
│   │       ├── components
│   │       └── vendor
│   │
│   └── sass
│
├── .gitignore
├── node_modules
├── bower.json
├── gulpfile.js
├── index.html
└── package.json
```

...and the `package.json` file, where I define any gulp dependencies I’ll be using:

```json
{
  "name": "example.com",
  "version": "1.0.0",
  "dependencies": {},
  "devDependencies": {
    "browser-sync": "^2.9.6",
    "gulp": "^3.9.0",
    "gulp-autoprefixer": "^3.0.2",
    "gulp-babel": "^5.2.1",
    "gulp-concat": "^2.6.0",
    "gulp-eslint": "^1.0.0",
    "gulp-filter": "^3.0.1",
    "gulp-newer": "^0.5.1",
    "gulp-notify": "^2.2.0",
    "gulp-plumber": "^1.0.1",
    "gulp-sass": "^2.0.4",
    "gulp-sourcemaps": "^1.5.2",
    "react": "^0.14.7",
    "react-dom": "^0.14.7"
  }
}
```

Assuming that you have npm and gulp installed, run `npm install` and you should be set.

### gulpfile.js

The meat of the setup is in my `gulpfile.js` file, which looks like the following:

```js
var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var babel        = require('gulp-babel');
var browserSync  = require('browser-sync');
var concat       = require('gulp-concat');
var eslint       = require('gulp-eslint');
var filter       = require('gulp-filter');
var newer        = require('gulp-newer');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var reload       = browserSync.reload;
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');

var onError = function(err) {
  notify.onError({
    title:    "Error",
    message:  "<%= error %>",
  })(err);
  this.emit('end');
};

var plumberOptions = {
  errorHandler: onError,
};

var jsFiles = {
  vendor: [

  ],
  source: [
    'assets/js/src/Utility.js',
    'assets/js/src/components/ComponentForm.jsx',
    'assets/js/src/components/Component.jsx',
  ]
};

// Lint JS/JSX files
gulp.task('eslint', function() {
  return gulp.src(jsFiles.source)
    .pipe(eslint({
      baseConfig: {
        "ecmaFeatures": {
           "jsx": true
         }
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Copy react.js and react-dom.js to assets/js/src/vendor
// only if the copy in node_modules is "newer"
gulp.task('copy-react', function() {
  return gulp.src('node_modules/react/dist/react.js')
    .pipe(newer('assets/js/src/vendor/react.js'))
    .pipe(gulp.dest('assets/js/src/vendor'));
});
gulp.task('copy-react-dom', function() {
  return gulp.src('node_modules/react-dom/dist/react-dom.js')
    .pipe(newer('assets/js/src/vendor/react-dom.js'))
    .pipe(gulp.dest('assets/js/src/vendor'));
});

// Copy assets/js/vendor/* to assets/js
gulp.task('copy-js-vendor', function() {
  return gulp
    .src([
      'assets/js/src/vendor/react.js',
      'assets/js/src/vendor/react-dom.js'
    ])
    .pipe(gulp.dest('assets/js'));
});

// Concatenate jsFiles.vendor and jsFiles.source into one JS file.
// Run copy-react and eslint before concatenating
gulp.task('concat', ['copy-react', 'copy-react-dom', 'eslint'], function() {
  return gulp.src(jsFiles.vendor.concat(jsFiles.source))
    .pipe(sourcemaps.init())
    .pipe(babel({
      only: [
        'assets/js/src/components',
      ],
      compact: false
    }))
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('assets/js'));
});

// Compile Sass to CSS
gulp.task('sass', function() {
  var autoprefixerOptions = {
    browsers: ['last 2 versions'],
  };

  var filterOptions = '**/*.css';

  var reloadOptions = {
    stream: true,
  };

  var sassOptions = {
    includePaths: [

    ]
  };

  return gulp.src('assets/sass/**/*.scss')
    .pipe(plumber(plumberOptions))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('assets/css'))
    .pipe(filter(filterOptions))
    .pipe(reload(reloadOptions));
});

// Watch JS/JSX and Sass files
gulp.task('watch', function() {
  gulp.watch('assets/js/src/**/*.{js,jsx}', ['concat']);
  gulp.watch('assets/sass/**/*.scss', ['sass']);
});

// BrowserSync
gulp.task('browsersync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    open: false,
    online: false,
    notify: false,
  });
});

gulp.task('build', ['sass', 'copy-js-vendor', 'concat']);
gulp.task('default', ['build', 'browsersync', 'watch']);
```

## gulp Dependencies and Tasks Explained

Now that I’ve shared examples of the important files to get you going, let’s go through a few of the gulp dependencies and tasks required to get things running.

### Converting JSX to JavaScript with Babel

When building with React, you can write plain JavaScript or in [JSX](https://facebook.github.io/jsx/) (JavaScript syntax extension). JSX is a preprocessor that gives you a more concise syntax, and is arguably easier and more readable, but needs to be converted to native JavaScript. JSX is analogous to [CoffeeScript](http://coffeescript.org/), even [Sass](http://sass-lang.com/) or [LESS](http://lesscss.org/) (but for CSS).

```javascript
// JSX
React.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);

// Native JavaScript
React.render(
  React.createElement('h1', null, 'Hello, world!'),
  document.getElementById('example')
);
```

With the help of [Babel](https://babeljs.io/) and its gulp plugin, [gulp-babel](https://github.com/babel/gulp-babel), you can convert JSX to JavaScript by piping `babel()` into the `concat` task, like such:

```javascript
var jsFiles = {
  vendor: [

  ],
  source: [
    'assets/js/src/Utility.js',
    'assets/js/src/components/ComponentForm.jsx',
    'assets/js/src/components/Component.jsx',
  ]
};

//...

gulp.task('concat', ['copy-react', 'eslint'], function() {
  return gulp.src(jsFiles.vendor.concat(jsFiles.source))
    .pipe(sourcemaps.init())
    .pipe(babel({
      only: [
        'assets/js/src/components',
      ],
      compact: false
    }))
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('assets/js'));
});
```

I am passing the `only` option into `babel()` so it knows to only compile files in `assets/js/src/components` (dedicated for JSX files) since I am mixing native JS and JSX files when concatenating.

You may come across the following warning if your concatenated file is larger than 100KB:

```
[BABEL] Note: The code generator has deoptimised the styling of ".../assets/js/src/components/app.js" as it exceeds the max of "100KB".
```

The option `compact: false` can be passed to prevent the warning from showing up.

Note the `'es-lint'` on the first line: Any tasks included in the second argument of `gulp.task()` will execute before running the task. I’ve covered ESLint in this next section:

### Linting JS and JSX with ESLint

As I began writing more JavaScript, I found linting my code to be extremely helpful in helping me detect problems before testing it in the browser. I‘ve been linting my JavaScript with [JSHint](http://jshint.com/) for a while now ([gulp-jshint](https://github.com/spalger/gulp-jshint) for gulp); however, when I introduced React and JSX, I constantly came across issues that would break the pipe even when using JSHint with its [JSXHint](https://github.com/STRML/JSXHint/) module.

[ESLint](http://eslint.org/) and its gulp plugin, [gulp-eslint](https://github.com/adametry/gulp-eslint), to the rescue!

```javascript
gulp.task('eslint', function() {
  return gulp.src(jsFiles.source)
    .pipe(eslint({
      baseConfig: {
        "ecmaFeatures": {
           "jsx": true
         }
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
```

In order to get ESLint and JSX playing nicely, you have to enable JSX. Another way to set ESLint’s `baseConfig` is by creating an `.eslintrc` file in the root of the project and including the following:

```text
{
  "ecmaFeatures": {
     "jsx": true
   }
}
```

### Watching JS and JSX Files for Changes

Now that we’ve got gulp linting, compiling, and concatenating our JS/JSX files, we now want it to watch for changes and re-lint/compile/concatenate.

Let’s configure gulp’s watch task to watch for both JS and JSX files, then execute `concat` since the task handles both.

```javascript
gulp.task('watch', function() {
  gulp.watch('assets/js/src/**/*.{js,jsx}', ['concat']);
  //...
});
```

## Still Learning

I’m only a few days into learning React and this workflow is a result of my early learning stages. I’m sure I have a lot to learn and have yet to find a real-world use case to integrate React; therefore, if something is incorrect or there’s a better way to do what I’m doing, feel free to reach out [@jonsuh](https://twitter.com/jonsuh).

For the immediate future, I only find myself integrating small components here and there to sites I build (if I can find a good reason and use case). As I continue to learn, build with it, and find better ways to integrate it into my workflow, I’m sure this post is subject to change.

---

<small>Thanks [Adam](https://twitter.com/a_simpson) for reviewing this post and giving it an integrity check!</small>
