+++
title = "Usage"
+++

## Installation

### CDN

Include the CSS and JS files directly in your HTML:

```html
<link rel="stylesheet" href="https://unpkg.com/lmui/dist/longterm.css">
<script src="https://unpkg.com/lmui/dist/longterm.js" defer></script>
```

### npm

```bash
npm install lmui
```

Then import in your project:

```js
import 'lmui/dist/longterm.css';
import 'lmui/dist/longterm.js';
```

### Download

Download the CSS and JS files from the [releases page](https://github.com/yourusername/lmui/releases) and include them in your project.

```html
<link rel="stylesheet" href="./longterm.min.css">
<script src="./longterm.min.js" defer></script>
```

## Basic usage

lmui styles semantic HTML elements by default. No classes needed for basic styling:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <link rel="stylesheet" href="longterm.css">
  <script src="longterm.js" defer></script>
</head>
<body>
  <h1>Hello World</h1>
  <p>This paragraph is styled automatically.</p>
  <button>Click me</button>
</body>
</html>
```
