---
layout: work
title: JS Bible
slug: jsbible
introduction: "Created for ministries to fill a need."
date: "2013-03-13"
---
<div class="hero hero--{{ page.slug }}">
  <div class="align">
    <div class="align-cell">
      <img src="/assets/images/work/{{ page.slug }}/logo.png"
           srcset="/assets/images/work/{{ page.slug }}/logo.png 1x,
                   /assets/images/work/{{ page.slug }}/logo@2x.png 2x" class="{{ page.slug }}-logo" alt="JS Bible">
    </div>
  </div>
</div>
<div class="section">
  <div class="container">
    <div class="{{ page.slug }}-need">
      <h2>The need</h2>
      <p>Churches and individuals have approached or contacted me about how they could have the same Bible widget that I developed for <a href="http://www.fbchammond.com/resources/online-bible/" target="_blank">fbchammond.com</a>. They were looking for a relatively easy way to embed the Bible on their ministry website.</p>
      <p>My first implementation required a database, and although I open-sourced it, many of these individuals have very little HTML experience let alone database experience—That was a major problem.</p>
      <p>I got tired of always giving them a solution that was too difficult for them to implement, so while the idea was hot on my mind, I quickly moved to search for an alternate.</p></p>
    </div>
  </div>
</div>
<div class="section section--{{ page.slug }}-build">
  <div class="container">
    <div class="{{ page.slug }}-build-image">
      <p><img src="/assets/images/work/{{ page.slug }}/jquery.png" alt="jQuery" class="{{ page.slug }}-build-image-jquery">
        <img src="/assets/images/work/{{ page.slug }}/plus.png" alt="+" class="{{ page.slug }}-build-image-plus">
        <img src="/assets/images/work/{{ page.slug }}/biblia.png" alt="Biblia" class="{{ page.slug }}-build-image-biblia"></p>
    </div>
    <div class="{{ page.slug }}-build-description">
      <p>To eliminate the database-dependency variable, I needed an alternative. I quickly searched for a reliable and fast Bible text API that ideally supported JSON. I landed on <a href="http://www.logos.com/" target="_blank">Logos</a>’ <a href="http://api.biblia.com/" target="_blank">Biblia API service</a>.</p>
      <p>It had been a while since I’d developed a jQuery plugin so I had to look through a few jQuery boilerplate examples and shake some dust off before starting the build.</p></p>
    </div>
  </div>
</div>
<div class="section">
  <div class="container">
    <div class="{{ page.slug }}-website">
      <h2>The website</h2>
      <p>I created a landing page to house the information, basic documentation, a working demo, and a link to download the source files.</p>
      <img src="/assets/images/work/{{ page.slug }}/website.jpg" alt="">
    </div>
  </div>
</div>
<div class="section section--{{ page.slug }}-open-source">
  <div class="container">
    <div class="{{ page.slug }}-open-source">
      <h2>Open Source</h2>
      <p>JS Bible was created to fill a need; therefore, I felt it was only fitting I open-source it by making it available on Github for your forking pleasure.</p>
      <a href="https://github.com/jonsuh/jsbible/" class="jsbible-open-source-link" target="_blank">Fork it on Github</a>
    </div>
  </div>
</div>