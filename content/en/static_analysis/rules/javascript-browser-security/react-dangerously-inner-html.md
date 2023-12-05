---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-browser-security/react-dangerously-inner-html
  language: JavaScript
  severity: Warning
title: Do not inject unsanitized HTML
---
## Metadata
**ID:** `javascript-browser-security/react-dangerously-inner-html`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
Always sanitize HTML data before injecting it in the DOM. Use libraries such as [DOMPurify](https://github.com/cure53/DOMPurify) before using it.

## Non-Compliant Code Examples
```javascript
const App = () => {
  const data = `lorem <b onmouseover="alert('mouseover');">ipsum</b>`;

  return (
    <div
      dangerouslySetInnerHTML={{__html: data}}
      foobar={{foo: bar}}
    >
    </div>
  );
}
```

## Compliant Code Examples
```javascript
const App = () => {
  const data = `lorem <b onmouseover="alert('mouseover');">ipsum</b>`;

  return (
    <div
      dangerouslySetInnerHTML={{__html: sanitize(data)}}
    />
  );
}
```
