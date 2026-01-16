+++
title = "Sidebar"
weight = 16
description = "Fixed sidebar layout with collapsible sections using details/summary semantic tags."
+++

Use `.sidebar` on an `<aside>` and `.sidebar-content` on the main content area.

{% demo() %}
```html
<div style="position: relative; height: 300px; border: 1px solid var(--lm-border); border-radius: var(--lm-radius); overflow: hidden;">
  <aside class="sidebar" style="position: absolute;">
    <h4>Dashboard</h4>
    <nav>
      <a href="#" aria-current="page">Home</a>
      <a href="#">Users</a>
      <details open>
        <summary>Settings</summary>
        <div>
          <a href="#">General</a>
          <a href="#">Security</a>
          <a href="#">Billing</a>
        </div>
      </details>
    </nav>
  </aside>
  <div class="sidebar-content" style="padding: var(--lm-space-4);">
    <h3>Main Content</h3>
    <p>This area shifts to make room for the sidebar.</p>
  </div>
</div>
```
{% end %}
