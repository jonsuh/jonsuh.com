---
layout: post
title: HTTPS Increased Organic Search Impressions by 144%
date: "2014-12-04 07:50:00"
excerpt: A few months ago, I launched the redesign of my website. I enabled HTTPS a week later, and since then I’ve noticed a significant increase in organic searches—both impressions and clicks. Impressions went up by 144% and clicks by 94%.
comments: false
tags:
- development
- SEO
js:
- chart.js
- blog/https-increased-organic-search-impressions-by-144-percent.js
---

A few months ago, I launched the redesign of my website. I enabled HTTPS a week later, and since then I’ve noticed a significant increase in organic searches—both impressions and clicks.

<!--more-->

## Comparing numbers

When comparing the day with the most organic impressions and clicks on HTTP to that on HTTPS, I saw an increase of 144% with impressions and 94% with clicks. I created two charts to give you a visual comparison of what my impressions and clicks looked like during the transition.

### Impressions

<div class="chart chart--no-labels">
  <canvas id="http-https-impressions" width="600px" height="250px"></canvas>
  <div id="http-https-impressions-legend" class="chart-legend"></div>
</div>

Most impressions in one day:

- HTTP: 5,420
- HTTPS: 13,236 (144% Increase)

### Clicks

<div class="chart chart--no-labels">
  <canvas id="http-https-clicks" width="600px" height="250px"></canvas>
  <div id="http-https-clicks-legend" class="chart-legend"></div>
</div>

Most clicks in one day:

- HTTP: 286
- HTTPS: 554 (94% Increase)

Instead of calculating increases by from individual days, I then took a cumulative approach and compared numbers by 3-week periods. The numbers were close: impressions increased by 133% and clicks by 95%.

My best guess is that enabling HTTPS has had a positive impact on my search rankings. One thing to note is that the launch of the redesign just that, a redesign—there were no major structural changes to how my site was organized; therefore theoretically, the new design shouldn’t have had a major impact on search rankings.

## Why did I enable HTTPS?

For a few reasons, actually.

1. I enjoy playing sysadmin on my DigitalOcean instance wanted to go through the exercise of manually installing an SSL cert.
2. NameCheap offered discounts on SSL certs when Heartbleed was discovered and announced.
3. A few months ago I read a post that Google was going to start using HTTPS as a ranking signal.

> We’ve seen positive results, so we’re starting to use HTTPS as a ranking signal. For now it’s only a very lightweight signal — affecting fewer than 1% of global queries, and carrying less weight than other signals such as high-quality content — while we give webmasters time to switch to HTTPS. But over time, we may decide to strengthen it, because we’d like to encourage all website owners to switch from HTTP to HTTPS to keep everyone safe on the web.
> 
> Source: <a href="http://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html" target="_blank">HTTPS as a ranking signal</a>

Reasons 1 and 3 played the biggest role as to why I enabled HTTPS, but frankly I didn’t expect it to boost my rankings.

Either I’m part of the “fewer than 1% of global queries” category or it’s totally possible that since Google published that post, they have increased HTTPS rankings. (Or I’m totally wrong and there’s another reason why those numbers have gone up)

When installing my certificate, I also made sure I was diligent about making sure it was properly installed. I used an <a href="https://www.ssllabs.com/ssltest/index.html" target="_blank">SSL Server Test tool by Qualyss SSL Labs</a> to test and make sure there weren’t any security issues.

![](/assets/images/blog/2014/https-increased-my-organic-search-impressions-by-144-percent/ssl-test.png)

When I had first installed the certificate my rating was an F, but the tool to informed me of the vulnerabilities, so I was able to do some homework and correct thems. I’d be curious to know if security level and configuration play a part in determining search ranking.

## Securing your site with HTTPS

Certificates can be purchased from a variety of vendors, and if you pay for hosting, there’s a good chance the same company offers SSL certificates—many times they’ll even set it up so you don’t have to do it yourself.

There are a lot of things to note before and when enabling HTTPS. Things like deciding whether you need a single domain, multi-domain, or wildcard certificate; knowing that you cannot embed HTTP content on HTTPS pages; or making sure that your certificate is properly installed by testing its security level and configuration.

Google posted a helpful article, <a href="https://support.google.com/webmasters/answer/6073543" target="_blank">Secure your site with HTTPS</a>, that helps you better understand HTTPS as well as give you best practices when securing your site.