+++
title = "Dropdown menu"
weight = 14
description = "Popover menus using the native popover API. Supports keyboard navigation."
+++

Use `popovertarget` on the trigger and `popover` on the `<menu>`. Items use `role="menuitem"`.

{% demo() %}
```html
<button popovertarget="demo-menu" class="outline">
  Options
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6" /></svg>
</button>
<menu popover id="demo-menu">
  <button role="menuitem">Profile</button>
  <button role="menuitem">Settings</button>
  <button role="menuitem">Help</button>
  <hr>
  <button role="menuitem">Logout</button>
</menu>
```
{% end %}
