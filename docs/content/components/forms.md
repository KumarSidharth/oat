+++
title = "Form elements"
weight = 3
description = "Inputs, selects, textareas, checkboxes, radios, and fieldsets"
+++

Form elements are styled automatically. Wrap inputs in `<label>` for proper association.

{% demo() %}
```html
<form>
  <label>
    Name
    <input type="text" placeholder="Enter your name">
  </label>

  <label>
    Email
    <input type="email" placeholder="you@example.com">
  </label>

  <label>
    Password
    <input type="password" placeholder="Password">
  </label>

  <label>
    Country
    <select>
      <option value="">Select a country</option>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
    </select>
  </label>

  <label>
    Message
    <textarea placeholder="Your message..."></textarea>
  </label>

  <label>
    <input type="checkbox"> I agree to the terms
  </label>

  <fieldset>
    <legend>Preference</legend>
    <label><input type="radio" name="pref"> Option A</label>
    <label><input type="radio" name="pref"> Option B</label>
    <label><input type="radio" name="pref"> Option C</label>
  </fieldset>

  <label>
    Volume
    <input type="range" min="0" max="100" value="50">
  </label>

  <button type="submit">Submit</button>
</form>
```
{% end %}

### Input group

Use `.input-group` on a fieldset to combine inputs with buttons or labels.

{% demo() %}
```html
<fieldset class="input-group">
  <legend>https://</legend>
  <input type="url" placeholder="example.com">
  <button>Go</button>
</fieldset>
```
{% end %}

### Validation error

Use `aria-invalid="true"` on inputs and `.error` for the message.

{% demo() %}
```html
<div class="field">
  <label for="error-input">Email</label>
  <input type="email" id="error-input" value="invalid-email" aria-invalid="true">
  <div class="error">Please enter a valid email address.</div>
</div>
```
{% end %}
