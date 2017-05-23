---
layout: post
title: Enhance Google Search Results with Rich Snippets
date: "2015-03-20 10:00:00"
share_image: search-result.png
tags:
- development
- tutorial
- front-end-development
- rich-snippets
- microdata
---

Allow Google to create and provide rich snippets—detailed, relevant information for users based on their search queries, such as the average rating of a product or restaurant, or preparation time and rating of a recipe.

<!--more-->

{% figure src="search-result.png" caption="Example search result with Rich Snippets" %}

Google can better understand the content of your pages to create rich snippets with the following markup formats: Microdata (recommended), Microformats, and RDFa. It can provide rich snippets for reviews, people, products, businesses and organizations, recipes, events, music, and videos.

I’ll be covering the Microdata format since it’s recommended and what I use and using the [schema.org](http://schema.org) markup vocabulary to define items.

## Microdata

Microdata uses HTML element attributes (most commonly using `<div>` and `<span>` elements) to give your content context using items and properties. Let’s take the following:

```html
<div>
  <p>Hey! My name is Jonathan Suh.</p>
</div>
```

and give it some context using Microdata:

```html
<div itemscope itemtype="http://schema.org/Person">
  <p>Hey! My name is <span itemprop="name">Jonathan Suh</span>.</p>
</div>
```

- `itemscope` tells us that the content in the `<div>` is an item that consists of properties (name-value pairs).
- The properties of `itemscope` are defined by `itemtype="http://schema.org/Person"`, which tells us that the item is a Person.
- The property `itemprop="name"` tells us that the Person’s name is Jonathan Suh.

Here’s a slightly more complex example:

```html
<div>
  Hey! My name is Jonathan Suh. I’m a Web Developer
  at Juice Interactive in Chicago, IL.
</div>
```

with Microdata and nested items:

```html
<div itemscope itemtype="http://schema.org/Person">
  <p>Hey! My name is
    <span itemprop="name">Jonathan Suh</span>. I’m a
    <span itemprop="jobTitle">Web Developer</span> at
    <span itemprop="affiliation" itemscope itemtype="http://schema.org/Organization">
      <span itemprop="name">Juice Interactive</span> in
      <span itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
        <span itemprop="addressLocality">Chicago</span>,
        <span itemprop="addressRegion">IL</span>
      </span>
    </span>
  .</p>
</div>
```

### Date and time

Use the `<time>` element and the `datetime` attribute to specify dates and times. The `datetime` value must be in the ISO date format (time zone is optional).

```html
<time itemprop="datePublished" datetime="2015-01-02T12:34-06:00">
  January 1, 2015 12:34PM
</time>
```

### Non-visible content

Google doesn’t display content that isn’t visible to the user; however, there are some exceptions where content is valuable to search engines to show detailed information in search results but you may not want to show the user.

For example, if your blog post gives the product a review of 8 stars, users may assume the rating is based on a scale of 1–10, but a search engine won’t assume this; therefore, you must indicate this, which you can do using the `<meta>` element and `content` attribute:

```html
<div itemprop="reviewRating" itemscope itemtype="http://schema.org/Rating">
  Rating: <span itemprop="ratingValue">8</span>
  <meta itemprop="bestRating" content="10">
</div>
```

## Types of Rich Snippets

Google can understand the markup of your content to provide rich snippets for [businesses and organizations](https://support.google.com/webmasters/answer/answer.py?answer=146861), [events](https://support.google.com/webmasters/answer/answer.py?answer=164506), [music](https://support.google.com/webmasters/answer/1623047?hl=en), [people](https://support.google.com/webmasters/answer/answer.py?answer=146646), [products](https://support.google.com/webmasters/answer/answer.py?answer=146750), [recipes](https://support.google.com/webmasters/answer/answer.py?answer=173379), and [reviews](https://support.google.com/webmasters/answer/answer.py?answer=146645).

Each type can contain a different number of properties, but Google recognizes specific vocabulary based on the item type to create rich snippets. I’ll cover reviews as examples, but the links in the paragraph above provide documentation for the corresponding item types.

### Reviews

Review rich snippets are designed to provide review information (star ratings, name of the reviewer, and/or a total number of reviews) about a product or service. There are two types of reviews:

1. Individual - One reviewer.
2. Aggregate - A set of reviews and where the star rating is the average of all the reviews.

**Individual review**

An individual review indicates one reviewer and one star rating by the reviewer. Let’s take the following product review of the August Smart Lock:

```html
<div>
  <h1>August Smart Lock</h1>
  <p>By Jonathan Suh<br>
    January 19, 2015<br>
    Rating: 7.5</p>
  <div>
    <p>Spend less time fiddling with keys when unlocking your door;
       instead, unlock your door with an app on your smartphone.</p>
  </div>
</div>
```

and mark it up using Microdata:

```html
<div itemscope itemtype="http://schema.org/Review">
  <h1 itemprop="name">August Smart Lock</h1>
  <p>By <span itemprop="author">Jonathan Suh</span><br>
    <span itemprop="datePublished" content="2015-01-19T12:34-06:00">
      January 19, 2015
    </span><br>
    Rating: <span itemprop="reviewRating" itemscope itemtype="http://schema.org/Rating">
      <span itemprop="ratingValue">7.5</span>
      <meta itemprop="bestRating" content="10">
    </span></p>
  <div itemprop="reviewBody">
    <p>Spend less time fiddling with keys when unlocking your door;
       instead, unlock your door with an app on your smartphone.</p>
  </div>
</div>
```

**Aggregate reviews**

Aggregate reviews indicates a set of reviews from various reviewers, and the star rating is the average of all of the ratings. (i.e. 10 user reviews and an average star rating of 8.5 of 10 based on 20 ratings)

```html
<div>
  <h1>August Smart Lock</h1>
  <p>Rating: 7 (based on 20 ratings)<br>
    10 user reviews</p>
</div>
```

```html
<div itemscope itemtype="http://schema.org/Product">
  <h1 itemprop="name">August Smart Lock</h1>
  <p>Rating:
    <span itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
      <span itemprop="ratingValue">8.5</span>
      <meta itemprop="bestRating" content="10">
      (based on <span itemprop="ratingCount">20</span> ratings)<br>
      <span itemprop="reviewCount">10</span> user reviews
    </span>
  </p>
</div>
```

## Resources

Google offers great resources about structured data along with tools for testing and validating your structured data markup.

### Documentation

Google provides [documentation](https://developers.google.com/structured-data/rich-snippets/) to help you make your pages eligible for rich snippets in search results. You can also read the documentation for each rich snippet type Google supports:

- [Product](https://developers.google.com/structured-data/rich-snippets/products)
- [Recipe](https://developers.google.com/structured-data/rich-snippets/recipes)
- [Review](https://developers.google.com/structured-data/rich-snippets/reviews)
- [Event](https://developers.google.com/structured-data/rich-snippets/events)
- [Article](https://developers.google.com/structured-data/rich-snippets/articles)
- [Software Application](https://developers.google.com/structured-data/rich-snippets/sw-app)

### Testing Tool

Google’s [Structured Data Testing Tool](https://developers.google.com/structured-data/testing-tool/) validates your markup.

{% figure src="testing-tool.png" alt="Google Developers Structured Data Testing Tool" %}

It’s extremely useful to help make sure your structured data is valid and readable by Google. You can reference a URL or directly input the HTML.

### Google Webmaster Tools

Once you’ve made your structured data live on your site, Google Webmaster Tools allows you to see data on how many structured data items are present on your site along with any errors that were detected.

{% figure src="structured-data.png" alt="Google Developers Structured Data Testing Tool" %}

Your site must be registered on Google Webmaster Tools and you can access the data in Search Appearance > Structured Data.
