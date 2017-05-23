---
layout: post
title: Finding the Right Development Tools
date: "2015-01-27 10:00:00"
tags:
- development
---

Modern web development is rich with an endless stream of new technologies, frameworks, tools and resources available at our fingertips. With new tools becoming available seemingly every day, it’s easy to dive in and get lost in trying them out, but once you’ve found the right ones, there’s a lot of value in developing consistency and sticking with what works.

<!--more-->

## Exploration

Make a conscious effort to keep an eye out for new development tools and technologies—sources such as Twitter, GitHub, or Designer News are great communities to find such information. When you come across one that may be helpful or particularly interesting, take time to share it amongst your team.

Keep in mind that although the technology may not be new to the web, it may be new for your team and could be the very tool that shaves off seconds from every compile, automates deployment, or speeds up the development process.

## Evaluation

It’s also important to find time to explore and experiment with a tool to gauge its value. Sometimes it’s a matter of dropping it into an existing project to see whether or not it’ll work, whereas more “load-bearing” tools, such as frameworks or architectures, will require more experience and extensive testing before coming up with a proper evaluation.

In addition, be sure to consider things such such as if it’s open-sourced, well-documented, has the support of a community and dedicated developers, and has been around for a while, especially for long-lived projects that will be actively maintained and iterated upon.

We at [Juice Interactive](http://www.juiceinteractive.com) have development meetings for the developers to get together and discuss these very things. It’s always helpful for us to not only talk about the pros and cons of something we may have tried, but also to put together and share working demos or sample projects to give live walkthroughs of what it looks like to actually use the tool during development.

## Consistency

If every project is built with an inconsistent set of tools, it may be particularly easy for the developer that worked on it to pick it back up and make changes when necessary, but finding a core set of tools that work is especially important when working with a team.

Consistency allows you to spend less time thinking about the syntax of the framework when setting up the grid or using the Active Record class, and when you have to pick up a project made by another developer (granted there will be a slight learning curve), you’ll spend less time trying to figure out how to get it up and running on your local environment. Certain types of tools should allow more flexibility than others, but finding that sweet spot and getting into a groove speeds up development and buys you more time to build.

## Our Tool Belt

Our tools have evolved and are bound to change, but here’s a list of some of the core tools we use now:

- **[CodeIgniter](http://www.codeigniter.com)**: We’re a PHP house and fans of this framework. We have a lot of experience with CI and find it easy to get a project up and running without jumping through many hoops. It has a long-standing community along with tons of resources to get us through questions or issues we come across.
- **[Git](http://git-scm.com)**: Git is our go-to version control system. It has proven itself as a valuable tool when collaborating on a project with a team and has saved our butts many times when commits or deployments break stuff.
- **[Beanstalk](http://bnst.lk/1z1MFsf)**: We use Beanstalk to manage and house our Git repos. Its deployment tools are fantastic and simple to use. It has great features such as the ability to set up multiple deployment environments and dedicate each to specific branches, set up manual or automatic deployments, and rollback to a previous commit if a deployment goes wrong.
- **[Sass](http://sass-lang.com)**: Sass is our CSS preprocessor and eliminates a lot of the pains of writing CSS. It also allows us to make our CSS modular, making our code reusable across projects and extensible. We previously used Compass to compile our Sass but now rely on libsass with the help of Grunt—we’ve found that compiling with libsass is exponentially faster.
- **[Grunt](http://gruntjs.com)**: Grunt speeds up and automates development by handling mundane tasks like compilation, concatenation, and minification. With an active community and a strong ecosystem of plugins, you can automate just about anything.
- **[AWS](http://aws.amazon.com)**: We rely on Amazon Web Services for our servers and hosting (EC2), databases (RDS) and cloud storage (S3). Although AWS is not managed, which requires us to do the sysadmin work, its rock solid, reliable and allows for easy scalability.

## Balance

Consistency is great but at the rate the web is moving, being too consistent for too long can cause you to become stale. It’s vital to be aware and conscious of its changes and know when to make incremental adjustments to the tools or how you use the tools in your tool belt (like the day we switched from making layouts with tables to divs, if you remember).

Find a healthy balance of exploring and experimenting with what’s available while also putting together a consistent tool belt and workflow. If you feel like it’s been a while since you’ve changed things up, maybe it’s time to explore; and when you think you’ve tried enough, take the valuable pieces and make yourself a killer toolset.

Remember: what works for one may not work for another—find what works for you and your team.
