---
layout: post
title: Localhost or Virtual Hosts Stopped Working and Won’t Resolve, and /etc/hosts Is Being Ignored
date: "2012-11-16"
comments: false
excerpt: Your localhost or virtual hosts stop working and won’t resolve for some reason? This problem began for me after I upgraded my OS to Mac OS X 10.8.2. The fix is easy.
tags:
- tutorial
- os-x
- tech
---

Did your localhost or virtual hosts stop working and won’t resolve for some reason? Don’t freak out, panic, and/or format your computer! (I already went through the trouble for you). This problem began for me after I upgraded my OS to Mac OS X 10.8.2. The fix is easy.

## Explanation

If your localhost or virtual hosts were working fine and then suddenly stopped working (especially after you upgraded to OS X 10.8.2), your hosts file’s line endings may have changed, causing your hosts file to be ignored—your hosts file’s (/etc/hosts) line endings needs to be set to LF.

## Solution

Before you get started, you need a text editor that will allow you to change a file’s line endings. I use [TextMate](https://github.com/textmate/textmate). Others are [TextWrangler](http://www.barebones.com/products/textwrangler), [Sublime Text 2](http://www.sublimetext.com/2).

*The steps below are instructions if you have and are using TextMate installed with shell support (Terminal).*

Open up Terminal and run the following command:

{% highlight bash %}
sudo mate /etc/hosts
{% endhighlight %}

Go to *File & Save As* and select *LF (recommended)* as your line endings and save the file. (You should see a dropdown above the *Save* button)