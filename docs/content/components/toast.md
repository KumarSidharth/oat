+++
title = "Toast"
weight = 15
description = "Dynamic toasts using a custom WebComponent."

[extra]
webcomponent = true
+++

Add `<lm-toast-container>` to your page. Call `container.show({ message, variant })` to display toasts.

{% demo() %}
```html
<button onclick="showToast('default')">Default Toast</button>
<button onclick="showToast('success')" class="outline">Success Toast</button>
<button onclick="showToast('error')" class="outline">Error Toast</button>
<button onclick="showToast('warning')" class="outline">Warning Toast</button>
```
{% end %}

```js
const container = document.querySelector('lm-toast-container');
container.show({
  message: 'Your changes have been saved!',
  variant: 'success'
});
```
