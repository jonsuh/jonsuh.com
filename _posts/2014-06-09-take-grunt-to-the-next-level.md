---
layout: post
title: Take Grunt to the Next Level
date: "2014-06-08 12:30:00"
comments: false
tags:
- development
- grunt
- front-end-development
- tutorial
---

Now that you’ve started to integrate Grunt into your development workflow, here are a few tips to tidy up and optimize your Grunt setup along with plugins that you may find useful for development.

<!--more-->

If Grunt is brand-new territory or you’re relatively new to it, you may want to read my post, [Get Started with Grunt](/blog/get-started-with-grunt), which is designed to help you learn the basics of Grunt and get you going in integrating it into your development workflow.

## Autoload plugins with jit-grunt

Traditionally every time you install a new plugin, you have tell Grunt to load it: 

{% highlight javascript %}
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-sass');
{% endhighlight %}

Then every time you uninstall a plugin, you have to remove the `grunt.loadNpmTasks` function that loads that plugin, otherwise your Grunt tasks will fail.

<a href="https://github.com/shootaroo/jit-grunt" target="_blank">jit-grunt</a> (Just In Time) auto-loads the necessary plugins to run your tasks without your thinking about adding or removing the load task in your `Gruntfile.js`.

Install jit-grunt by running the following in the command line at the root directory of your project:

{% highlight bash %}
npm install jit-grunt --save-dev
{% endhighlight %}

Then require jit-grunt by adding the following at the top of your `Gruntfile.js`:

{% highlight javascript %}
module.exports = function(grunt) {
  require('jit-grunt')(grunt);
...
{% endhighlight %}

You can now safely remove all lines of `grunt.loadNpmTasks('function-name');` from your `Gruntfile.js`, and you’re done! Grunt will now auto-magically know which tasks to load as you run your tasks.

## Build time with time-grunt

To get a better understanding of how each task is performing, <a href="https://github.com/sindresorhus/time-grunt" target="_blank">time-grunt</a> gives you a breakdown of each task and how long it took to run.

Like you did with jit-grunt, install time-grunt:

{% highlight bash %}
npm install time-grunt --save-dev
{% endhighlight %}

Then require time-grunt at the top of your `Gruntfile.js`.

{% highlight javascript %}
module.exports = function(grunt) {
  require('time-grunt')(grunt);
...
{% endhighlight %}

That’s it! Now when you run a task, you should get a breakdown of each task and its time of execution:

<img src="{% cdn_url /assets/images/blog/2014/take-grunt-to-the-next-level/time-grunt.png %}">

## Only build files that have changed with grunt-newer

Every time you run a build task, it will rebuild all of the files that are pertinent to the task; however, it’s unlikely that you’ve made changes to all of them, so why waste time and resources to rebuild them?

Rebuild only the files that you’ve made changes to with <a href="https://github.com/tschaub/grunt-newer" target="_blank">grunt-newer</a>.

Install grunt-newer:

{% highlight bash %}
npm install grunt-newer --save-dev
{% endhighlight %}

Then for your tasks, prepend `newer:` to them like such:

{% highlight javascript %}
grunt.registerTask('build', ['newer:concat', 'newer:sass:dist']);
{% endhighlight %}

## Reuse tasks

You may have a build task for development and another for production that may look like such:

{% highlight javascript %}
grunt.registerTask('build', ['concat', 'sass']);
grunt.registerTask('production', ['concat', 'sass', 'cssmin', 'uglify']);
{% endhighlight %}

The only difference is production runs cssmin and uglify. Since the build task already exists, reuse the build task in the production task:

{% highlight javascript %}
grunt.registerTask('build', ['concat', 'sass']);
grunt.registerTask('production', ['build', 'cssmin', 'uglify']);
{% endhighlight %}

In the event you add another task in the build task, you’ll know that the new task will run in production as well before cssmin and uglify are run.

## Run shell commands with grunt-shell

There may be an instance where you’d want to run something from the command line to streamline your workflow.

<a href="https://github.com/sindresorhus/grunt-shell" target="_blank">grunt-shell</a> allows you to interact with the CLI from Grunt. For example, I deploy my site with Capistrano. To deploy I first run `grunt production` to prep my files, then `bundle exec cap production deploy` to execute Capistrano. With grunt-shell, I can configure my production task to run my Capistrano command after my production files are built.

Install grunt-shell:

{% highlight bash %}
npm install grunt-shell --save-dev
{% endhighlight %}

Create a new task:

{% highlight javascript %}
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
{% endhighlight %}

Then run shell in your task:

{% highlight javascript %}
grunt.registerTask('production', ['build', 'cssmin', 'uglify', 'shell:deploy']);
{% endhighlight %}

If you need to run multiple shell commands, grunt-shell allows you to let them run synchronously or asynchronously. Make sure to read the config on how to do this: <a href="https://github.com/sindresorhus/grunt-shell#multiple-commands" target="_blank">https://github.com/sindresorhus/grunt-shell#multiple-commands</a>

## Run multiple tasks concurrently with grunt-concurrent

Run multiple blocking tasks (like watch, nodemon, and jekyll’s built-in watch) or running heavier, slowers tasks in parallel to increase your build time.

<a href="https://github.com/sindresorhus/grunt-concurrent" target="_blank">grunt-concurrent</a> will allow you to split up these tasks into two spawns so they can run in parallel.

Install grunt-concurrent:

{% highlight bash %}
npm install grunt-concurrent --save-dev
{% endhighlight %}

Set up your concurrent task:

{% highlight javascript %}
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
{% endhighlight %}

Then set up concurrent with one of your tasks:

{% highlight javascript %}
grunt.registerTask('default', ['sass', 'concat', 'jekyll:build',
                   'concurrent:first', 'concurrent:second']);
{% endhighlight %}

## In closing

I hope this was useful enough for you to get on your way to creating and optimizing your master Grunt setup.

If you have any suggestions, feel free to hit me up on Twitter <a href="{{ author.twitter }}" target="_blank">@jonsuh</a>&mdash;I’d be interested in learning about your findings and what’s worked for you.