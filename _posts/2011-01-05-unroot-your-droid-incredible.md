---
layout: post
title: Unroot your Droid Incredible
date: "2011-01-05"
comments: false
excerpt: Getting the Incredible back to stock is pretty simple. This guide will not only help you remove root, but it will give you S-ON and restore your ROM, radio, and kernel back to stock, making it safe to return to Verizon.
tags:
- android
- tech
- tutorial
---

I hope that the only reason you need to unroot your Droid Incredible is because you encountered a problem or you need to return it for a replacement. Well, whatever the reason is, getting the Incredible back to stock is pretty simple. I’ve provided an easy step-by-step guide to unroot and fully restore your Incredible to stock. This guide will not only help you remove root, but it will give you S-ON and restore your ROM, radio, and kernel back to stock, making it safe to return to Verizon.

Running RUU (Rom Upgrade Utility) is your easiest and safest way to get your Incredible back to stock. Although you may come across other methods, I feel this is the safest route to go. However, RUU requires you to be running a Windows machine so try to get your hands on one or run a virtual machine using Parallels or VMWare Fusion.

If you are not on Windows or can’t get your hands on one, I have an alternative method.

### If you are running Windows

1.  Make sure you have the proper drivers for the Incredible so your machine recognizes your device. If you are unsure, download and install HTC Sync from [htc.com/us/support/droid-incredible-verizon/downloads](http://www.htc.com/us/support/droid-incredible-verizon/downloads/), which should install the proper drivers on your computer.
2.  [Download](https://docs.google.com/uc?id=0B1Z3FsizLUAGSWhSUFAybXpzWUk&export=download) and run RUU.
3.  Follow the simple prompts. (If during the RUU process it times out after "Waiting for Bootloader...", click Exit, *do not unplug your phone*, restart RUU and follow the prompts again.)

### If you are not running Windows

1.  You need to make sure you have the stock radio (2.15.00.07.28). If you do not or don’t know, [download](https://docs.google.com/uc?id=0B1Z3FsizLUAGT0NwS2I0bnV3ZnM&export=download) and flash PB31IMG.
2.  You next to first achieve S-ON. [Download](https://docs.google.com/uc?id=0B1Z3FsizLUAGenJrbzBDLW43SjA&export=download) and flash Unrevoked’s S-ON
3.  Make sure your SDCARD is formatted to FAT32.
4.  [Download the stock image](https://docs.google.com/uc?id=0B1Z3FsizLUAGRndSeWR0U0pTMHc&export=download). (build-3.26.605.1-release-152016-baseband-2.15.00.07.28-hboot-0.92.0000_PB31IMG.zip)
5.  Copy the file to the root of your SDCARD and rename it to PB31IMG.zip.
6.  Power off your phone and power it back up in HBOOT with Volume Down + Power.
7.  Wait for the prompt for the upgrade and select *Yes*.
8.  Once the process has completed, reboot!

### Back to stock

Voila! Your phone should be back to stock and ready to return without any problems.