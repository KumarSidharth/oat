+++
title = "Buttons"
weight = 2
description = "Button variants and sizes"
+++

The `<button>` element is styled by default. Add classes for variants.

{% demo() %}
```html
<button>Primary</button>
<button class="secondary">Secondary</button>
<button class="outline">Outline</button>
<button class="ghost">Ghost</button>
<button class="destructive">Destructive</button>
<button disabled>Disabled</button>
```
{% end %}

### Sizes

Use `.sm` or `.lg` for size variants.

{% demo() %}
```html
<button class="sm">Small</button>
<button>Default</button>
<button class="lg">Large</button>
```
{% end %}

### Button group

Wrap buttons in `.btn-group` for connected buttons.

{% demo() %}
```html
<div class="btn-group">
  <button class="outline">Left</button>
  <button class="outline">Center</button>
  <button class="outline">Right</button>
</div>
```
{% end %}
