---
layout: post
title: Need for Speed
date: "2014-03-11 10:00:00"
comments: false
image: need-for-speed-header.jpg
tags:
- design
- development
- front-end-development
- grunt
- sass
---

Built entirely from the ground up, my new site has a need for speed. From the workflow and build to deployment, each aspect was carefully scrutinzed, then painstakingly tailored. Let me take you through some of the technologies and processes required for this build.

<!--more-->

## Jekyll

The previous version of my site was built on [<a href="http://ellislab.com/codeigniter" target="_blank">CodeIgniter</a> and the one before that <a href="http://wordpress.org" target="_blank">WordPress</a>. I didn’t think a database was necessary and apart from any demos that required PHP, I was primarily using it for templating.

With <a href="http://jekyll.rb" target="_blank">Jekyll</a>, no more PHP includes and no more database queries. Instead, Jekyll handles the templating and some trivial logic, and compiles the site into individual static pages. With little overhead, load times are drastically low and the site is more responsive than ever.

Although Jekyll is not really designed for deploying to multiple environments, you can simulate builds for different environments with multiple config files. By default, `jekyll build` uses the `_config.yml`, which I use for my development environment.

For my production environment, using `_config.yml` as the base config file, I can override any settings by passing in a secondary config file, like such:

`jekyll build --config _config.yml,_config.production.yml`.

And here’s the breakdown for my `_config.yml` files:

{% highlight yaml %}
# _config.yml
name: Jonathan Suh
base_url: http://jonsuh.local

# _config.production.yml
base_url: http://jonsuh.com
{% endhighlight %}

## Grunt

I dove into <a href="http://gruntjs.com" target="_blank">Grunt</a>, and I’ll say that it has become a tool that is almost as valuable to me as <a href="http://sass-lang.com" target="_blank">Sass</a> is&mdash;It has sped up my development workflow and has saved me *countless* hours.

No more `compass watch` in one window and `jekyll build --watch` in another. <a href="https://github.com/sindresorhus/grunt-concurrent" target="_blank">grunt-concurrent</a> allows me to do both along with JavaScript concatenation simultaneously without breaking a sweat. Here’s a look at the concurrent task:

{% highlight javascript %}
concurrent: {
  watch: {
    tasks: ['compass:watch', 'jekyll:watch', 'watch'],
    options: {
      logConcurrentOutput: true
    }
  }
}
{% endhighlight %}

As a matter of fact, Grunt handles all of my development and production tasks: Jekyll build, Sass and Compass compile, CSS minification, JavaScript concatenation and uglification, Capistrano and Amazon S3 deployment. Here’s a look at my dependencies:

{% highlight json %}
"devDependencies": {
  "grunt": "~0.4.2",
  "load-grunt-tasks": "~0.3.0",
  "grunt-concurrent": "~0.4.2",
  "grunt-contrib-clean": "~0.5.0",
  "grunt-contrib-compass": "~0.7.1",
  "grunt-contrib-concat": "~0.3.0",
  "grunt-contrib-copy": "~0.5.0",
  "grunt-contrib-cssmin": "~0.7.0",
  "grunt-contrib-uglify": "~0.2.7",
  "grunt-contrib-watch": "~0.5.3",
  "grunt-jekyll": "~0.4.1",
  "grunt-newer": "~0.6.1",
  "grunt-sass": "~0.10.0",
  "grunt-shell": "~0.6.1",
  "jit-grunt": "~0.2.1",
  "node-sass": "~0.8.1",
  "time-grunt": "~0.2.9"
}
{% endhighlight %}

## Compass and Bourbon

Compile my Sass with <a href="https://github.com/sindresorhus/grunt-sass" target="_blank">libsass</a> or <a href="http://compass-style.org" target="_blank">Compass</a>?&mdash;that was a tough decision. Libsass was *blazing* fast. Compared to Compass, I was noticing performance increases up to 190%!

<blockquote class="twitter-tweet" data-conversation="none" lang="en"><p><a href="https://twitter.com/danielmall">@danielmall</a> Give or take ~190% performance increase with my new set up. This stuff gets me giddy <a href="http://t.co/PxCCvNsyUn">pic.twitter.com/PxCCvNsyUn</a></p>&mdash; Jonathan Suh (@jonsuh) <a href="https://twitter.com/jonsuh/statuses/429328070541967361">January 31, 2014</a></blockquote>

However, Compass has its advantages.

The fundamental difference is Libsass is just a compiler while Compass is a framework. As a result, Compass provides extremely useful helper functions like `image-url` and `font-url` which generate the correct path to the asset found in the images directory of your project. Because I deploy my assets to Amazon S3, it’s important that those paths are relative, and with these helper functions require less typing. They also offer cache busting, which was the added benefit that took it over the edge.

**Libsass/Sass**

{% highlight sass %}
background: url("../images/bg.jpg");
@font-face {
  font-family: "Webfont";
  src: url("../webfonts/webfont.eot");
}
{% endhighlight %}

**Compass**

{% highlight scss %}
background: image-url("bg.jpg");
@font-face {
  font-family: "Webfont";
  src: font-url("webfont.eot");
}

/* Result */
background: url("../images/bg.jpg?1389418864");
@font-face {
  font-family: "Webfont";
  src: url("../webfonts/webfont.eot?1471153369");
}
{% endhighlight %}

Compass also provides an extensive mixin library; however using it has a heavy payload resulting in slower compiles (its documentation is also horrendous), so I’ve chosen to use <a href="http://bourbon.io" target="_blank">Bourbon</a> instead and use Compass solely for the helper functions and cache busting.

## Foundation 5

Of all the responsive frameworks and grid solutions available, ZURB’s <a href="http://foundation.zurb.com" target="_blank">Foundation</a> is by far my favorite. It’s evolved tremendously since I first started using it way back to version 2.

Foundation 5 is crazy modular, so you can use all or as little pieces of it as you want for each project. Although I’m only using the grid component, I’m taking full advantage of all of its advanced customization by using its custom grid mixins, media queries, and core functions like `rem-calc()`, which has deemed extremely useful and valuable.

Foundation 5 is managed by <a href="http://bower.io" target="_blank">Bower</a>, so upgrading is a piece of cake, and integrating it into Compass can be done easily.

{% highlight ruby %}
# config.rb
additional_import_paths = [
  "bower_components/foundation/scss",
  "bower_components/bourbon/app/assets/stylesheets"
]
{% endhighlight %}

You can use Foundation with Grunt + Libsass or Compass: <a href="http://foundation.zurb.com/docs/sass.html" target="_blank">Read more</a>.

## Nginx

I decided to move away from <a href="http://httpd.apache.org" target="_blank">Apache</a> and serve my site using <a href="http://nginx.org" target="_blank">Nginx</a>. Although I’m still getting used to the config and vhost files, Nginx is a heck of a lot faster than Apache, and with some basic Gzip configs, it flies.

{% highlight bash %}
# nginx.conf
gzip on;
gzip_disable "msie6";

gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_buffers 16 8k;
gzip_http_version 1.1;
gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;
{% endhighlight %}

## Amazon S3

Coupled with my DigitalOcean instance, I deploy and serve my CSS, JavaScript, webfonts, and most of my images from an S3 bucket.

Using the environment "hack" for Jekyll that I described earlier, I use a similar technique using an `cdn_url` variable, that only points to the Amazon bucket when deploying to production (so I’m still referencing local assets in development).

Properly deploying my assets got a bit tricky. Without getting too in-depth, gzipping wasn’t as so easy as editing one config file like I did for Nginx. I found out that OS X has a built-in gzip Terminal command: `gzip -9 /path/to/filename.css` (Note: this command does not save a copy of the original and adds a `.gz` extension to the filename. Run `gzip -h` for help).

Once I gzipped them and dropped them in my bucket, I had to add a metadata entry key: `Content-Encoding` value: `gzip` for each asset, otherwise it’d fail on deflate.

## Capistrano

Deployment typically consisted of opening up Transit, connecting via FTP, navigating to the correct folder, then dragging-and-dropping in my new files... *every time* I made a revision.

Annoyed, I sought a more streamlined solution to for deployment. That’s when I met <a href="http://capistranorb.com" target="_blank">Capistrano</a>&mdash;Capistrano requires a server with SSH access, so I went with a <a href="https://www.digitalocean.com/?refcode=b7bd38a51314" target="_blank">DigitalOcean</a> instance.

I’ll be honest, getting Capistrano set up was no piece of cake, but when I got it successfully running, I was beyond ecstatic.

Because I’m using a static-site generator and not checking any compiled files into Git, I have to perform a non-traditional deploy method:

{% highlight ruby %}
set :deploy_via, :copy
set :repository, "_site"
{% endhighlight %}

Otherwise, I’d have to compile my site on my server after every deploy.

Unfortunately Capistrano 3.0 does not support `:deploy_via, :copy` so I’m using Bundler and Capistrano 2.15.

Now with one command in Terminal, `grunt deploy:production`, Capistrano deploys all of my production-ready files to my server, and because these files are being transferred over SSH, it’s a heck of a lot faster than FTP. In addition, Capistrano also does some smartsy-fartsy things in case something goes wrong.

Each deployment is handled as its own separate timestamped release. If something goes wrong with your deployment, it’ll intelligently roll back.

{% highlight bash %}
example.com
├── current -> /var/www/example.com/20131220203126
├── releases
│   ├── 20120101173027
│   ├── 20130630060645
└── └── 20131220203126
{% endhighlight %}

`current` is a symlink to one of the releases. When Capistrano performs a deployment, it creates a new timestamped directory, transfers the files into it, then changes the `current` symlink to point to the new directory. Therefore your vhost should point to `current`.

This method of deployment is much more effective because since no files are being overwritten, it should not cause any downtime. If for some reason you need to roll back, simply change the symlink to point to one of the previous releases.

## Learning experience

The build of this site was a tremendous learning experience. I forced myself to step into unfamiliar territory and although the going was a bit slow at first, I’ve grown tremendously as a developer. But by no means am I "done."

This post doesn’t do justice to all that I’ve learned, and for sake of length, I had to leave out a lot, but again, I’ll be sharing a lot from here on out.

Curious what my Gruntfile looks like? Want to talk ways to streamline deployment or development workflow? Or just want to say hi? I’d love to get your input and chat. Hit me up on Twitter <a href="{{ site.social.twitter}}" target="_blank">@jonsuh</a> or feel free to <a href="mailto:{{ site.email_secure }}">Email me</a>.