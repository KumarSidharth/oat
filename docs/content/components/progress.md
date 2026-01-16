+++
title = "Progress & spinner"
weight = 9
description = "Progress bars using the native <progress> element. Spinners with role=\"status\"."
+++

### Progress bar

Use the native `<progress>` element.

{% demo() %}
```html
<progress value="60" max="100"></progress>
<progress value="30" max="100"></progress>
<progress value="90" max="100"></progress>
```
{% end %}

### Spinner

Use `.spinner` with `role="status"` for loading indicators. Size with `.sm` or `.lg`.

{% demo() %}
```html
<div role="status" class="spinner sm"></div>
<div role="status" class="spinner"></div>
<div role="status" class="spinner lg"></div>
```
{% end %}
