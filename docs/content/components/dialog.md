+++
title = "Dialog"
weight = 13
description = "Modal dialogs using native <dialog> with a custom WebComponent."

[extra]
webcomponent = true
+++

Wrap a `<dialog>` in `<lm-dialog>`. Use `data-trigger` on the open button and `data-close` on close buttons.

{% demo() %}
```html
<lm-dialog>
  <button data-trigger>Open dialog</button>
  <dialog>
    <header>
      <h2>Dialog Title</h2>
      <p>This is a dialog description.</p>
    </header>
    <div>
      <p>Dialog content goes here. You can put any HTML inside.</p>
      <p>Click outside or press Escape to close.</p>
    </div>
    <footer>
      <button class="outline" data-close>Cancel</button>
      <button data-close>Confirm</button>
    </footer>
  </dialog>
</lm-dialog>
```
{% end %}
