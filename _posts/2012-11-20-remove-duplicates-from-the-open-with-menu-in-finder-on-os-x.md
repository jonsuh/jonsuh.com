---
layout: post
title: Remove Duplicates from the Open With Menu in Finder on OS X
date: "2012-11-20"
comments: false
excerpt: Remove duplicate entries in the Open With menu in Finder by resetting it in just 3 steps.
tags:
- tutorial
- os-x
- tech
---

When you want to open up a document or file with another application in Finder, you can easily do so by right-clicking the file and using the Open With menu. If you use the Open With menu enough, may notice duplicate entries of the same application; sometimes that list can get ridiculously long due to multiple dupliates. Fortunately, you can easily reset the Open With menu and remove those duplicates in just 3 steps.

## How to reset the Open With menu

To remove the duplicate entries in the Open With menu, you have to rebuild the Launch Services Database and then relaunch Finder.

* Open up Terminal (Applications &gt; Utilities &gt; Terminal).
* Type the following command in Terminal and press enter.

{% highlight bash %}
# For OS X 10.5+
/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister -kill -r -domain local -domain system -domain user

# For OS X 10.3 and 10.4
/System/Library/Frameworks/ApplicationServices.framework/\Frameworks/LaunchServices.framework/Support/lsregister \-kill -r -domain local -domain system -domain user
{% endhighlight %}  

* Restart Finder by typing the following command in Terminal and pressing enter.

{% highlight bash %}
killall Finder
{% endhighlight %}

Your Launch Services Database should have been rebuilt and you should no longer see duplicate application entries in your Open With menu.