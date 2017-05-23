---
layout: post
title: Terminal/Bash Command-Line Shortcuts with Aliases
date: "2015-02-12 16:30:00"
tags:
- development
- tutorial
- bash
---

Keystrokes are valuable especially if you live in the command line, and thankfully Bash (Terminal’s default command-line interpreter) allows you to create shortcuts using aliases.

<!--more-->

## Creating Aliases

Aliases are nothing more than keyboard shortcuts or abbreviations, and although they’re a bit limited, they’re great for simple commands.

Let’s create a temporary alias in the command line for `ls -al` (list all files in long listing format in the current directory). Open Terminal and run the following command:

```bash
alias ll="ls -al"
```

<small>Note: There should be no spaces before or after the equal sign. Spaces will break the command.</small>

Now if you type `ll` in the command line, you should see something like the following:

```text
-rw-------    1 user  staff   6927 Feb 12 12:51 .bash_history
-rw-r--r--    1 user  staff   2787 Jan  3 20:16 .bash_profile
-rw-r--r--    1 user  staff     58 Apr  8  2014 .bashrc
drwxr-xr-x    5 user  staff    170 Jul 21  2014 .composer
drwxr-xr-x    5 user  staff    170 Dec  4  2013 .config
drwxr-xr-x    3 user  staff    102 Nov  4  2013 .gem
-rw-r--r--    1 user  staff    811 Feb  2 15:31 .gitconfig
drwxr-xr-x    5 user  staff    170 Apr  8  2014 .go
drwxr-xr-x  687 user  staff  23358 Feb  3 19:37 .npm
```

To remove the alias, use the `unalias` command:

```bash
unalias ll
```

To see a list of all your aliases, use the `alias` command:

```bash
alias
```

## Permanent Aliases

The problem with setting an alias in the command line is that it’s not permanent—if you open a new window or restart Terminal, the alias is gone.

To make aliases permanent, we have to set them in a file that’s read when you open Terminal. Some common ones are `~/.bashrc` and `~/.bash_profile`. For this example, let’s use `~/.bash_profile`.

From the command line, open to edit the file by running the following:

```bash
nano ~/.bash_profile
```

<small>(You can also open and edit it with your code editor, i.e. `subl ~/.bash_profile`)</small>

Add the following lines either at the bottom of the file or wherever you’d like:

```bash
# -------
# Aliases
# -------
alias ll="ls -al"
```

Save and close the file. Now if you restart Terminal, the alias `ll` will be available to you. You can also tell Terminal to reload the `~/.bash_profile` file using the `source` command:

```bash
source ~/.bash_profile
```

## Useful Aliases

Here are a handful of aliases that you may find useful.

```bash
# -------
# Aliases
# -------
alias clr="clear" # Clear your terminal screen
alias flush="sudo discoveryutil udnsflushcaches" # Flush DNS (Yosemite)
alias flush="killall -HUP mDNSResponder" # Flush DNS (Mavericks, Mountain Lion, Lion)
alias flush="dscacheutil -flushcache" # Flush DNS (Snow Leopard, Leopard)
alias ip="curl icanhazip.com" # Your public IP address
alias ll="ls -al" # List all files in current directory in long list format
alias ldir="ls -al | grep ^d" # List all directories in current directory in long list format
alias o="open ." # Open the current directory in Finder
alias ut="uptime" # Computer uptime
```

If you use Git in the command-line, I also wrote a post on [Git Command-Line Shortcuts](/blog/git-command-line-shortcuts/), which includes my personal set of Git Bash aliases and functions.
