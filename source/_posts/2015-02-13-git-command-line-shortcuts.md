---
layout: post
title: Git Command-Line Shortcuts
date: "2015-02-13 08:00:00"
share_image: git-log-graph.gif
tags:
- development
- tutorial
- bash
- git
---

A lot of my time is spent in Terminal and a majority of it is spent typing Git commands. I created a set of keyboard shortcuts with Bash aliases and functions to speed up my workflow and save me hundreds of keystrokes every day.

<!--more-->

## Git Bash Aliases and Functions

Git allows you to set aliases but they’re limited and only save you a few keystrokes (i.e. instead of `git checkout` you can type `git co`, but you still have to type `git`). Since Bash is Terminal’s default command-line interpreter, you can also set Bash aliases to reduce your keystrokes even further.

Here’s my list of Git Bash aliases and functions. To use them as your own, just add them to the file you store your aliases/functions. (i.e. `~/.bash_profile` or `~/.bashrc`)

<small>Notes: If you’ve never set an alias before, don’t know where to put them, or have no clue what I’m talking about, read my post on [Terminal/Bash Command-Line Shortcuts with Aliases](/blog/bash-command-line-shortcuts/) before continuing.</small>

<small>When copy & pasting, it’s important to keep the spacing. (i.e. for aliases, there must be no spaces before and after the equal signs, and for functions, there must be a space after the opening curly bracket of the declaration and a semicolon after the command. Don’t forget to reload your file (`source ~/.bash_profile`) or restart Terminal after making changes.</small>

```bash
# ----------------------
# Git Aliases
# ----------------------
alias ga='git add'
alias gaa='git add .'
alias gaaa='git add -A'
alias gb='git branch'
alias gbd='git branch -d '
alias gc='git commit'
alias gcm='git commit -m'
alias gco='git checkout'
alias gcob='git checkout -b'
alias gcom='git checkout master'
alias gd='git diff'
alias gda='git diff HEAD'
alias gi='git init'
alias gl='git log'
alias glg='git log --graph --oneline --decorate --all'
alias gld='git log --pretty=format:"%h %ad %s" --date=short --all'
alias gm='git merge --no-ff'
alias gp='git pull'
alias gss='git status -s'
alias gst='git stash'
alias gstl='git stash list'
alias gstp='git stash pop'
alias gstd='git stash drop'

# ----------------------
# Git Functions
# ----------------------
# Git log find by commit message
function glf() { git log --all --grep="$1"; }
```

You can quickly see how these aliases can save you keystrokes. Most of the aliases are pretty straight forward—for example, instead of `git add assets/css/screen.css`, you can run:

```bash
ga assets/css/screen.css
```

or instead of `git checkout -b <branch-name>`:

```bash
gcb <branch-name>
```

There are a few that are a but more custom. I use a couple of variations of `git log` that I find more useful. `gld` is a detailed, one-line view of `git log`:

```bash
$ gld
dba068d 2015-02-11 Remove stop propagation.
37372ec 2015-02-11 Remove third-party Twitter widget.js completely and replace with intent link.
7d1a5d2 2015-02-11 Uglify critical in production task.
d9bf43b 2015-02-11 Custom robots.
166b6bd 2015-02-11 Secondary page share images.
6c77889 2015-02-11 Fix share_image logic.
93df2b1 2015-02-10 Exclude topic and archives from sitemap. Change up priority.
f72ccc1 2015-02-09 Social share post include Reddit. Fix http to https.
6a42288 2015-02-11 Uglify critical in production task.
8564aba 2015-02-11 Configure robots for pages.
```

while `glg` is a detailed, decorative graph view of `git log`:

{% figure src="/assets/images/blog/git-command-line-shortcuts/git-log-graph.gif" %}

By default `gm`, the alias for `git merge`, defaults to `--no-ff` (no fast-forward)—many times I have more than 1 feature branch in development, each of those branches has more than 1 commit, and I feel that the history of the merges are important.

Aliases are great but are limited in scope, which is why I had to use a function for `glf`, my Git log find function. Occasionally I want to search for a commit by the commit message. Using `glf`:

```bash
glf "commit message"
```

You should get an output like follows:

```bash
$ glf "logic"
commit 95ed7d5b6f6d168047fd8ddc86579ce09ca39394
Author: Jonathan Suh <hello@jonsuh.com>
Date:   Wed Feb 11 08:51:11 2015 -0600

    Fix share_image logic.

commit 15bbdc6001d6c95d575078cb96352943b3b321e0
Author: Jonathan Suh <hello@jonsuh.com>
Date:   Tue Sep 30 20:18:29 2014 -0500

    Navigation link is-current logic.
```

I realize there are more possibilities for other Git commands, but for anything outside of these, I run them manually; however, feel free to add your own or make modifications to your liking.

I’ve personally enhanced `gs`, my alias for `git status`, as follows:

```bash
alias gs='echo ""; echo "*********************************************"; echo -e "   DO NOT FORGET TO PULL BEFORE COMMITTING"; echo "*********************************************"; echo ""; git status'
```

Every time I run `gs`, I’m reminded to pull before making a commit:

```bash
$ gs

*********************************************
   DO NOT FORGET TO PULL BEFORE COMMITTING
*********************************************

On branch master
Your branch is up-to-date with 'origin/master'.
nothing to commit, working directory clean
```

May these aliases and functions spare you thousands of keystrokes and extend your life expectancy. If you have any alias or functions that are particularly useful, I’d love for you to <a href="/contact/">share it with me</a>.
