+++
title = "12-column grid"
weight = 17
description = "12-column responsive grid using container queries and CSS flex."
+++

Use `.container`, `.row`, and `.col` classes. Column widths use `.col-{n}` and responsive variants like `.col-md-{n}`.

{% demo() %}
```html
<div class="container" style="background: var(--lm-muted); padding: var(--lm-space-4); border-radius: var(--lm-radius);">
  <div class="row">
    <div class="col col-12 col-md-6 col-lg-4" style="background: var(--lm-primary); color: var(--lm-primary-foreground); padding: var(--lm-space-4); border-radius: var(--lm-radius);">
      col-12 col-md-6 col-lg-4
    </div>
    <div class="col col-12 col-md-6 col-lg-4" style="background: var(--lm-primary); color: var(--lm-primary-foreground); padding: var(--lm-space-4); border-radius: var(--lm-radius);">
      col-12 col-md-6 col-lg-4
    </div>
    <div class="col col-12 col-lg-4" style="background: var(--lm-primary); color: var(--lm-primary-foreground); padding: var(--lm-space-4); border-radius: var(--lm-radius);">
      col-12 col-lg-4
    </div>
  </div>
</div>
```
{% end %}
