---
layout: post
title: Unroot Your Droid Eris
date: "2010-09-24"
comments: false
excerpt: Here is a simple step-by-step guide to unroot your Droid Eris, making it safe to return to Verizon!
tags:
- tutorial
- android
- tech
---

I’d like to hope and think that the only reason you’re unrooting your Droid Eris is because you have a problem with it and you need to return it to Verizon for a replacement. The custom 2.1 and 2.2 ROMs (i.e. KaosFroyo) available for the Eris are far superior to the stock firmware. Anyway, here is a simple step-by-step guide to unroot your Droid Eris, making it safe to return to Verizon!

## Download and run RUU

Running RUU (Rom Upgrade Utility) is your way of getting your Eris back to stock. There are other methods of unrooting, but I feel after doing all my research that RUU is the safest, easiest route to go; however, RUU requires you to be in a Windows machine. If you’re on a Mac, you can always run Windows virtually using software like Parallels or VMWare Fusion.

1.  Make sure you have the proper drivers for the Eris so your machine recognizes your device.
If you are unsure, download and install HTC Sync from [http://www.htc.com/us/support/droid-eris-verizon/downloads](http://www.htc.com/us/support/droid-eris-verizon/downloads), which should install the proper drivers on your computer.
2.  [Download](http://shipped-roms.com/shipped/Desire/RUU_Desire_C_Verizon_WWE_2.36.605.1_release_signed_with_driver.exe) and run RUU.
3.  Follow the simple prompts.  
(If during the RUU process it times out after Waiting for Bootloader..., click Exit, do not unplug your phone, restart RUU and follow the prompts again.)

For more help on running RUU, go to [http://forum.xda-developers.com/showthread.php?t=606699&page=2](http://forum.xda-developers.com/showthread.php?t=606699&page=2).

## Getting a version error?

There are reports of people getting a version error when running RUU; don’t panic. If you are, you need to first run jcase’s "Flash any RUU." You will need to run ADB commands; therefore, if you do not have the Android SDK installed, you will need it.

1.  If you don’t have the Android SDK installed, [download](http://developer.android.com/sdk/index.html) and install it.
2.  [Download flash_image](https://docs.google.com/open?id=0B1Z3FsizLUAGTmxtb0FwZnNMak0) from jcase’s Flash any RUU.
3.  [Download misc.img](https://docs.google.com/open?id=0B1Z3FsizLUAGai1kWFVlMFFFQzg) from jcase’s Flash any RUU.
4.  Connect your phone to your computer using a USB cable (do not mount your phone).
5.  Open Command Prompt or typecmdin run to get to the Command Prompt.
6.  Push the files to your phone by using the following commands in Command Prompt:
7.  Reboot your phone.
8.  Scroll back up and rerun RUU.

For more help on jcase’s Flash any RUU go to [http://forum.xda-developers.com/showthread.php?t=726885](http://forum.xda-developers.com/showthread.php?t=726885).

## Return your Eris

Your Eris should be stock and safe to return to your nearest Verizon Wireless dealer! Now hope that they give you an Incredible as a replacement? Maybe?