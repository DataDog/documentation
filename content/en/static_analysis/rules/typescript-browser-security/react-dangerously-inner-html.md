---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-browser-security/react-dangerously-inner-html
  language: TypeScript
  severity: Warning
title: Do not inject unsanitized HTML
---
## Metadata
**ID:** `typescript-browser-security/react-dangerously-inner-html`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Always sanitize HTML data before injecting it in the DOM. Use libraries such as [DOMPurify](https://github.com/cure53/DOMPurify) before using it.

## Non-Compliant Code Examples
```typescript
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
```typescript
const App = () => {
  const data = `lorem <b onmouseover="alert('mouseover');">ipsum</b>`;

  return (
    <div
      dangerouslySetInnerHTML={{__html: sanitize(data)}}
    />
  );
}
```
