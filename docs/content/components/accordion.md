+++
title = "Accordion"
weight = 11
description = "Collapsible sections using native <details> and <summary> elements. No JS required."
+++

Use native `<details>` and `<summary>` for collapsible content.

{% demo() %}
```html
<details>
  <summary>What is lmui?</summary>
  <p>lmui is a minimal, semantic-first UI component library with zero dependencies.</p>
</details>

<details>
  <summary>How do I use it?</summary>
  <p>Include the CSS and JS files, then write semantic HTML. Most elements are styled by default.</p>
</details>

<details>
  <summary>Is it accessible?</summary>
  <p>Yes! It uses semantic HTML and ARIA attributes. Keyboard navigation works out of the box.</p>
</details>
```
{% end %}
