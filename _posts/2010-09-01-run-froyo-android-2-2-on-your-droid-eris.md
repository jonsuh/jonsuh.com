---
layout: post
title: Run Froyo (Android 2.2) on Your Droid Eris
date: "2010-09-01"
comments: false
excerpt: If you own the HTC Droid Eris, you probably feel left out. Well, now you can run latest Android OS on my Verizon HTC Droid Eris thanks to punk.kaos and the XDA Developers. I’ll run you through some simple steps on how.
tags:
- android
- tech
- tutorial
---

If you own the HTC Droid Eris, and you’re somewhat familiar with cell phones and the constant development of the Android operating system &#40;OS&#41;, you probably feel left out. The Eris and its older cousin, the Motorola Droid, sparked the now insatiable Android craze that has made Android the top-selling OS in American smart phones as of August, 2010. I purchased the Eris the day after Thanksgiving–it came stock with Android 1.5 (Cupcake)–and immediately fell in love with the OS. With the recent releases of the HTC Droid Incredible, Motorola Droid X, and the Motorola Droid 2, HTC, Motorola, and Verizon have decided to push the newest OS, Android 2.2 aka Froyo, to all the “Droid” phones except the Eris. Feeling abandoned?

I am running the latest Android OS on my Verizon HTC Droid Eris thanks to punk.kaos and the XDA Developers. They were able to successfully port over Froyo. I’ll run you through some simple steps on how you can be running Froyo on your Droid Eris today!

## A reminder to some, a disclaimer to most

Making unofficial software and firmware changes to your handset violates the warranty of your phone; therefore, if anything goes wrong during this process or in the future, you will be unable to return the phone for a replacement unless you are able to return the phone back to its original, factory settings.

In addition, if something does go wrong, there is a chance you can “brick” your phone. Basically your phone becomes nothing more than a brick, a paperweight. Therefore, if you are not confident or skeptical in any way, I advise you not to continue.

## Backup

Make sure you backup everything you need on your phone (contact list, applications, etc.). A full wipe is recommended when installing a custom ROM, which will wipe the existing data from your computer (this does not include the files in your sdcard). You can find many backup utilities on the Android Market.

## You need root

Rooting your phone gives you the ability to make unofficial software and firmware changes to your phone, giving you the ability to hack your phone to improve stability and performance. [jcase](http://forum.xda-developers.com/member.php?u=2376614) at XDA was kind enough to take the once complicated method of rooting and simplifying it with with his [Universal 1 Click Eris Root App Apk](http://forum.xda-developers.com/showthread.php?t=742228).

1.  Download and install the <a href="https://docs.google.com/open?id=0B1Z3FsizLUAGd05MMFlqWnhPU3c" target="_blank">erisone010.apk</a> on your phone.
2.  Open the program, read the disclaimer, and if you’re ready to root, click *I agree, Root Me*.
3.  Once your phone reboots, shut down your phone.
4.  Power up your phone by holding down the Volume Up button and pressing Power to reboot into recovery mode.  
<small>(If Volume Up + Power does not work for you, try Volume Down + Power and when prompted to do so in the HBOOT screen, select “Recovery” by pressing Volume Up)</small>
5.  Scroll and press trackball to select Flash zip from sdcard.
6.  Scroll and press trackball to select rootme.zip.
7.  Scroll and press trackball to select Reboot systemonce the rootme.zip has been successfully flashed.
8.  Once your phone has powered back up, go to Settings and turn on USB Debugging.
9.  Uninstall the Eris Rooter app.

For additional help on rooting your Eris with this app, go to [http://forum.xda-developers.com/showthread.php?t=742228](http://forum.xda-developers.com/showthread.php?t=742228)

## You need a Froyo ROM

The next step is to get a Froyo ROM and flash it, replacing your current firmware. There are handful of Froyo ROMS out there, but the one I currently use and recommend is [KaosFroyo v39](http://forum.xda-developers.com/showthread.php?t=685594), the mixed Cyanogen/AOSP Froyo build.

1.  Download [kaosfroyo-v39.zip](https://docs.google.com/open?id=0B1Z3FsizLUAGaFFONE81X0ZhS28). (The latest version since this was written is v39)  
    *Warning:* Do not download .zip files you will be flashing using the Safari browser or unzip/extract the files (it tends to break the signature, causing you to be unable to flash the file). My recommendation is Firefox or Internet Explorer and save the .zip file.
2.  Connect your phone to your computer with a USB cable, and mount your phone to your computer when the dialog pops up.
3.  Copy the .zip file you just downloaded to your phone (should show up as SDCARD on your computer unless you changed its name once before) in the root/base directory (not in a folder).
4.  Shut down your phone.
5.  Power up your phone by holding down the Volume Up button and pressing Power to boot into recovery mode (like you did earlier when you were rooting your phone).  
<small>(If Volume Up + Power does not work for you, try Volume Down + Power and when prompted to do so in the HBOOT screen, select “Recovery” by pressing Volume Up)</small>
6.  A full wipe is recommended, especially when you’re replacing the stock firmware or a different ROM.
    <small>(KaosFroyo may not function properly if you do not perform a full wipe before installing)</small>
    - **Yes**, I want to perform a full wipe.
        * Scroll and press trackball to select *Wipe*.
        * Perform both a and a *Dalvik-cache wipe* by selecting the options by scrolling and pressing the trackball.
    - **No,** I don’t want to perform a full wipe - Skip to Step 7.
7.  Scroll and press trackball to select *Flash zip from sdcard*.
8. Scroll and press trackball to select the name of the .zip file you copied to your phone. <small>(This may take a few minutes)</small>
9.  Scroll and press trackball to select Reboot systemonce the rootme.zip has been successfully flashed. <small>(Your phone may take a few to several minutes to initially start up. You may even experience some lag at the initial boot, but it will get faster)</small>

For more information on the KaosFroyo ROM, go to [http://forum.xda-developers.com/showthread.php?t=685594](http://forum.xda-developers.com/showthread.php?t=685594).

## Improve your phone even more

Android 2.2 itself makes the phone much faster than you would remember Stock 2.1 to be. However, there are many tweaks and custom apps you can run to make your phone even faster, more stable, and increase its battery life!

Read [Make Your Droid Eris Faster & Smoother, and Increase Battery Life](/blog/make-your-droid-eris-faster-smoother-and-increase-battery-life)!

## Enjoy

If you did everything correctly, you should be experiencing Android 2.2 Froyo for yourself. You should see increased performance and stability. One thing I should note is that Froyo ROMs do not come with HTC Sense; therefore, you will not have access to some of the widgets and apps you had on 2.1 (i.e.: weather, clock/stopwatch/timer). However, there are many comparable widgets and apps on the Android Market.

I hope this How-To was beneficial to you. I will continue to update this thread as newer versions of KaosFroyo are released.

Let me know how it went and how you like Android 2.2 Froyo over 2.1 Eclair!

## Resources

* [[ROM] KaosFroyo [FROYO]](http://forum.xda-developers.com/showthread.php?t=685594)
* [Universal 1 Click Eris Root App Apk](http://forum.xda-developers.com/showthread.php?t=742228)
* [Make Your Droid Eris Faster & Smoother, and Increase Battery Life](/blog/make-your-droid-eris-faster-smoother-and-increase-battery-life)