+++
title = "Switch"
weight = 4
description = "Toggle switches using checkbox with role=\"switch\". Native HTML, no JS required."
+++

Add `role="switch"` to a checkbox for toggle switch styling.

{% demo() %}
```html
<label>
  <input type="checkbox" role="switch"> Notifications
</label>
<label>
  <input type="checkbox" role="switch" checked> Dark mode
</label>
```
{% end %}

### Disabled

{% demo() %}
```html
<label>
  <input type="checkbox" role="switch" disabled> Disabled off
</label>
<label>
  <input type="checkbox" role="switch" checked disabled> Disabled on
</label>
```
{% end %}
