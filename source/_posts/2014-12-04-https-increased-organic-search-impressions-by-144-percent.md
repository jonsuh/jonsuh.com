---
layout: post
title: HTTPS Increased Organic Search Impressions by 144%
date: "2014-12-04 07:50:00"
excerpt: A few months ago, I launched the redesign of my website. I enabled HTTPS a week later, and since then I’ve noticed a significant increase in organic searches—both impressions and clicks. Impressions went up by 144% and clicks by 94% on HTTPS.
tags:
- development
- seo
js:
- chart.js
- blog/https-increased-organic-search-impressions-by-144-percent.inline.js
---

A few months ago, I launched the redesign of my website. I enabled HTTPS a week later, and since then I’ve noticed a significant increase in organic searches—both impressions and clicks.

<!--more-->

## Comparing numbers

When comparing the day with the most organic impressions and clicks on HTTP to that on HTTPS, I saw an increase of 144% with impressions and 94% with clicks on HTTPS. I created two charts to give you a visual comparison of what my impressions and clicks looked like during the transition.

### Impressions

<div class="chart">
  <canvas id="chart-canvas-impressions" width="600px" height="250px" class="chart-canvas"></canvas>
  <div id="chart-legend-impressions" class="chart-legend"></div>
</div>

Most impressions in one day:

- HTTP: 5,420
- HTTPS: 13,236 (144% Increase)

### Clicks

<div class="chart">
  <canvas id="chart-canvas-clicks" width="600px" height="250px" class="chart-canvas"></canvas>
  <div id="chart-legend-clicks" class="chart-legend"></div>
</div>

Most clicks in one day:

- HTTP: 286
- HTTPS: 554 (94% Increase)

I then took a cumulative approach and compared numbers by 3-week periods. The numbers were close: impressions increased by 133% and clicks by 95%.

My best guess is that enabling HTTPS has had a positive impact on my search rankings. One thing to note is that the launch of the redesign just that, a redesign—there were no major structural changes to how my site was organized; therefore theoretically, the new design shouldn’t have had a major impact on search rankings.

## Why did I enable HTTPS?

For a few reasons, actually.

1. I enjoy playing sysadmin on my DigitalOcean instance and wanted to go through the exercise of manually installing an SSL cert.
2. NameCheap offered discounts on SSL certs when Heartbleed was discovered and announced.
3. A few months ago I read a post that Google was going to start using HTTPS as a ranking signal.

> “We’ve seen positive results, so we’re starting to use HTTPS as a ranking signal. For now it’s only a very lightweight signal — affecting fewer than 1% of global queries, and carrying less weight than other signals such as high-quality content — while we give webmasters time to switch to HTTPS. But over time, we may decide to strengthen it, because we’d like to encourage all website owners to switch from HTTP to HTTPS to keep everyone safe on the web.”
>
> Source: [HTTPS as a ranking signal](http://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html)

Reasons 1 and 3 played the biggest role as to why I enabled HTTPS, but frankly I didn’t expect it to boost my rankings.

Either I’m part of the “fewer than 1% of global queries” category or since Google published that post, they have increased HTTPS rankings. (Maybe a combination of both, or I’m totally wrong and there’s another reason that I’m not considering)

I was also diligent about making sure my certificate was installed properly. I used an [SSL Server Test tool by Qualyss SSL Labs](https://www.ssllabs.com/ssltest/index.html) to test and make sure there weren’t any issues.

{% figure src="ssl-test.png" %}

When I had first installed the certificate, my rating was an F, but the tool informed me of the vulnerabilities, so I was able to do some homework and correct them. I’d be curious to know if security level and configuration play a role in determining search ranking.

## Securing your site with HTTPS

**Should you secure your site with HTTPS?** I don’t this is a straight-forward yes/no answer, and I’m no expert in this area by any means, but with a push to a more secure Internet, I think at least a conversation should be had and thoughtfully considered as to why you shouldn’t.

There’s a lot to consider when making the transition, such as deciding whether you need a single domain, multi-domain, or wildcard certificate; making sure that all of your third-party content supports SSL; making sure your side can fully support SSL and can be properly installed and configured (things can get pretty interesting with complex set ups, i.e. load balancers, multiple domains, etc.). Luckily my site is a straight-forward, static site so I made the jump.

Here’s an interesting post from April 2013 as to why Stack Exchange chose not to have their domains served over SSL: [Stackoverflow.com: the road to SSL](http://nickcraver.com/blog/2013/04/23/stackoverflow-com-the-road-to-ssl/)

SSL certificates can be purchased from a variety of vendors, and if you pay for hosting, there’s a good chance the same company offers SSL certificates—many times they’ll even set it up so you don’t have to do it yourself.

Google posted a helpful article, [Secure your site with HTTPS](https://support.google.com/webmasters/answer/6073543), that helps you better understand HTTPS as well as give you best practices when securing your site.
