+++
title = "Cards"
weight = 6
description = "Card containers using the semantic <article> tag."
+++

Use `<article>` for cards. Optionally include `<header>` and `<footer>`.

{% demo() %}
```html
<article>
  <header>
    <h3>Card Title</h3>
    <p>Card description goes here.</p>
  </header>
  <p>This is the card content. It can contain any HTML.</p>
  <footer>
    <button class="outline">Cancel</button>
    <button>Save</button>
  </footer>
</article>
```
{% end %}
