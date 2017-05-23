---
layout: post
title: Take Grunt to the Next Level
date: "2014-06-08 12:30:00"
tags:
- development
- tutorial
- grunt
- front-end-development
---

Now that you’ve started to integrate Grunt into your development workflow, here are a few tips to tidy up and optimize your Grunt setup along with plugins that you may find useful for development.

<!--more-->

If Grunt is brand-new territory or you’re relatively new to it, you may want to read my post, [Get Started with Grunt](/blog/get-started-with-grunt), which is designed to help you learn the basics of Grunt and get you going in integrating it into your development workflow.

## Autoload plugins with jit-grunt

Traditionally every time you install a new plugin, you have tell Grunt to load it:

```js
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-sass');
```

Then every time you uninstall a plugin, you have to remove the `grunt.loadNpmTasks` function that loads that plugin, otherwise your Grunt tasks will fail.

[jit-grunt](https://github.com/shootaroo/jit-grunt) (Just In Time) auto-loads the necessary plugins to run your tasks without your thinking about adding or removing the load task in your `Gruntfile.js`.

Install jit-grunt by running the following in the command line at the root directory of your project:

```bash
npm install jit-grunt --save-dev
```

Then require jit-grunt by adding the following at the top of your `Gruntfile.js`:

```js
module.exports = function(grunt) {
  require('jit-grunt')(grunt);
...
```

You can now safely remove all lines of `grunt.loadNpmTasks('function-name');` from your `Gruntfile.js`, and you’re done! Grunt will now auto-magically know which tasks to load as you run your tasks.

## Build time with time-grunt

To get a better understanding of how each task is performing, [time-grunt](https://github.com/sindresorhus/time-grunt) gives you a breakdown of each task and how long it took to run.

Like you did with jit-grunt, install time-grunt:

```bash
npm install time-grunt --save-dev
```

Then require time-grunt at the top of your `Gruntfile.js`.

```js
module.exports = function(grunt) {
  require('time-grunt')(grunt);
...
```

That’s it! Now when you run a task, you should get a breakdown of each task and its time of execution:

{% figure src="time-grunt.png" %}

## Only build files that have changed with grunt-newer

Every time you run a build task, it will rebuild all of the files that are pertinent to the task; however, it’s unlikely that you’ve made changes to all of them, so why waste time and resources to rebuild them?

Rebuild only the files that you’ve made changes to with [grunt-newer](https://github.com/tschaub/grunt-newer).

Install grunt-newer:

```bash
npm install grunt-newer --save-dev
```

Then for your tasks, prepend `newer:` to them like such:

```js
grunt.registerTask('build', ['newer:concat', 'newer:sass:dist']);
```

## Reuse tasks

You may have a build task for development and another for production that may look like such:

```js
grunt.registerTask('build', ['concat', 'sass']);
grunt.registerTask('production', ['concat', 'sass', 'cssmin', 'uglify']);
```

The only difference is production runs cssmin and uglify. Since the build task already exists, reuse the build task in the production task:

```js
grunt.registerTask('build', ['concat', 'sass']);
grunt.registerTask('production', ['build', 'cssmin', 'uglify']);
```

In the event you add another task in the build task, you’ll know that the new task will run in production as well before cssmin and uglify are run.

## Run shell commands with grunt-shell

There may be an instance where you’d want to run something from the command line to streamline your workflow.

[grunt-shell](https://github.com/sindresorhus/grunt-shell) allows you to interact with the CLI from Grunt. For example, I deploy my site with Capistrano. To deploy I first run `grunt production` to prep my files, then `bundle exec cap production deploy` to execute Capistrano. With grunt-shell, I can configure my production task to run my Capistrano command after my production files are built.

Install grunt-shell:

```bash
npm install grunt-shell --save-dev
```

Create a new task:

```js
grunt.initConfig({
  shell: {
    options: {
      stdout: true,
      stderr: true
    },
    deploy: {
      command: 'bundle exec cap production deploy'
    }
  },
});
```

Then run shell in your task:

```js
grunt.registerTask('production', ['build', 'cssmin', 'uglify', 'shell:deploy']);
```

If you need to run multiple shell commands, grunt-shell allows you to let them run synchronously or asynchronously. Make sure to [read the config](https://github.com/sindresorhus/grunt-shell#multiple-commands) on how to do this.

## Run multiple tasks concurrently with grunt-concurrent

Run multiple blocking tasks (like watch, nodemon, and jekyll’s built-in watch) or running heavier, slowers tasks in parallel to increase your build time.

[grunt-concurrent](https://github.com/sindresorhus/grunt-concurrent) will allow you to split up these tasks into two spawns so they can run in parallel.

Install grunt-concurrent:

```bash
npm install grunt-concurrent --save-dev
```

Set up your concurrent task:

```js
grunt.initConfig({
  concurrent: {
    first: {
      tasks: ['watch']
    },
    second: {
      tasks: ['jekyll:watch']
    }
  },
});
```

Then set up concurrent with one of your tasks:

```js
grunt.registerTask('default', ['sass', 'concat', 'jekyll:build',
                   'concurrent:first', 'concurrent:second']);
```

## In closing

I hope this was useful enough for you to get on your way to creating and optimizing your master Grunt setup.

If you have any suggestions, feel free to hit me up on Twitter [@jonsuh](https://twitter.com/jonsuh)—I’d be interested in learning about your findings and what’s worked for you.
