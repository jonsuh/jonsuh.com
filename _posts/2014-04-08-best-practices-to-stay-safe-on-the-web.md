---
layout: post
title: Best Practices to Stay Safe on the Web
date: "2014-04-08 20:00:00"
comments: false
tags:
- tutorial
- security
- software
---

A serious security vulnerability that affects a large part of the web was discovered this week&mdash;this is a good time to reevaluate how you log in to websites and use the web, and implement best practices to keep yourself safe.

<!--more-->

## Heartbleed bug

A serious security vulnerability that affects OpenSSL, an extremely popular crytographic library used to secure web servers, was made public on April 7, which was discovered by Google Security and has been dubbed as &ldquo;Heartbleed.&rdquo;

In short, the bug allows secret keys used to encrypt data to be compromised. OpenSSL is used by many web services (e.g. company sites, eCommerce sites, email servers, chat servers, VPNs, etc.); therefore if the service you’re using is vulnerable to the Heartbleed bug, sensitive data such as usernames, passwords, emails, instant messages, and additional sensitive information could be compromised.

Although the bug only affects web servers with specific builds of OpenSSL, <a href="http://theverge.com/2014/4/8/5594266/how-heartbleed-broke-the-internet" target="_blank">The Verge</a> reports that "as many as two out of three servers on the web rely on OpenSSL."

Here’s a list of websites where you need to go change your passwords immediately: <a href="http://mashable.com/2014/04/09/heartbleed-bug-websites-affected" target="_blank">mashable.com/2014/04/09/heartbleed-bug-websites-affected</a>

More information about the Heartbleed Bug:

- <a href="http://heartbleed.com" target="_blank">heartbleed.com</a>
- <a href="http://openssl.org/news/secadv_20140407.txt" target="_blank">openssl.org/news/secadv_20140407.txt</a>
- <a href="http://mattslifebytes.com/?p=533" target="_blank">mattslifebytes.com/?p=533</a>

## Best Practices

As the digital web space grows and becomes an intricate part of our lives, it’s extremely important that you take precaution when possible by putting into place best practices to keep you and your data safe.

### Plan to change your passwords

**Do you use the same password for two or more services?** If you answered **yes**, you should plan a time to change your passwords. Even if not, it has probably been a while since you’ve last changed it/them, and this is a good week to do it.

As the web is scrambling to update their servers to patch the bug, changing your passwords on a still-vulnerable server does no good, so it’s best to do some homework to see whether their servers were updated before changing your passwords.

You may have already received a few emails from services recommending that you change passwords. Most of your frequently-used, sensitive and critical services have already patched their servers, so it’s a good idea to start changing your passwords immediately.

Mashable has a great list of services that were vulnerable to Heartbleed and where you need to go in and change your passwords immediately: <a href="http://mashable.com/2014/04/09/heartbleed-bug-websites-affected" target="_blank">mashable.com/2014/04/09/heartbleed-bug-websites-affected</a>

Only in an ideal world will 100% of vulnerable servers be updated and patched ASAP, so although many have done the work, eventually you should still change all of passwords even if you have to change one in the future.

### Use strong, unique passwords for every service

Having a unique password for each service is important in the event that the service gets compromised and you need to change the password. Although it can be a pain to log into each service with a different password, it’s much easier to change one password than hundreds if and when you have to.

It’s also futile to protect your highly sensitive information with a weak password. Use a random password generator to create strong, unique passwords. The longer the password, generally the better it is. I generate passwords between 16 and 32 characters in length* and almost always use a mixture of alphanumeric and special characters*.

In addition, it’s possible that the service is not properly encrypting your passwords but instead, storing them as plain text into their database.

This is how your credentials should look in a service’s database:

```text
username: your-email@domain.com
password: $2a$10$w9ZxPcakBohcreA7DBo3/.buxGJTC9BtRH0/p4/JOGsgPLNJk8jOO
```

Unfortunately, there are those services that have unfortunately hired web developers who didn’t really know what they were doing that will store your password in plain text:

```text
username: your-email@domain.com
password: abc123
```

Assuming that we don’t know whether or not the service is encrypting passwords before storing them, it’s best to take the safe route.

I’m subscribed to nearly 300 services, and yes, I have a unique password for each of them.

<small>* Although this is rare, some websites do not allow passwords longer than X characters. It’s usually a bad sign when you get a warning stating that your password is too long&mdash;it’s a pretty good indication that they’re storing them as plain text into their databases as opposed to encrypting them&mdash;Shame on them. In addition, some websites do not allow special characters when creating passwords.</small>

### Use a password manager

To keep track of all your passwords and their corresponding services, use a password manager.

![](https://da9ipfiyfnxgu.cloudfront.net/images/pristine/1Password4Mac/1password.png?1396755858)

I use <a href="https://agilebits.com/onepassword" target="_blank">1Password</a>, which has coverage for Mac, Windows, iPhone, iPad and Android. It has a very useful browser extension that allows you to quickly log in to services from inside the browser itself. It also syncs your data across multiple devices with iCloud, Dropbox, or locally over Wi-Fi.

Many password managers have built-in password generators with recipes to help you generate secure passwords and easily assign newly-generated passwords to a new entry.

Another popular alternative is <a href="https://lastpass.com" target="_blank">LastPass</a>.

### Enable multi-factor authentication

Many services out there, such as Google, Facebook, Twitter, and PayPal, offer 2-factor authentication.

Multi-factor authentication adds additional layer(s) of security by requiring you to provide additional means of authentication, such as a random pin number sent to your phone via SMS.

Although this can be a huge pain, it just makes it that much more difficult for a thief to gain access to your data in the event he has access to your password.

Here’s great resource that lists many of the common services that offer 2-factor authentication: <a href="http://evanhahn.com/2fa" target="_blank">evanhahn.com/2fa</a>

## Additional recommendations

The following are some additional recommendations I feel shouldn’t go unaddressed.

### Use up-to-date software

If you’re using an outdated browser, such as Internet Explorer 10 or lower, or even an outdated operating system, it’s time you upgrade.

Microsoft officially discontinued support for Windows XP on April 8, 2014.

> After April 8, 2014, support and security updates for Windows XP will no longer be available.
> Source: <a href="http://microsoft.com/windows/en-us/xp/default.aspx" target="_blank">Microsoft.com</a>

I personally recommend <a href="https://www.google.com/intl/en/chrome/browser/" target="_blank">Google Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Mozilla Firefox</a>.

### Use an adblocker when browsing

I understand there are plenty of businesses that rely on ad-based revenue; however, there are enough ad-based websites out there that are infested with malware and vulgar advertisements, and that’s enough of a reason for me to take precaution to avoid any advertisements that I can.

<a href="https://adblockplus.org/" target="_blank">AdBlock Plus</a> is a browser extension that works extremely well and supports Chrome, Firefox, Safari, and Internet Explorer. By the way, with Adblock, websites load a heck of a lot faster!

## Conclusion

These recommendations are not fool proof; however, I’m advocating preventative maintenance as opposed to reactive maintenance, especially when it concerns the protection of your sensitive data on the web.

As the digital web space grows, cyber attacks and breaches will become more and more common, and although security measures will improve, cyber terrorists won’t stop.