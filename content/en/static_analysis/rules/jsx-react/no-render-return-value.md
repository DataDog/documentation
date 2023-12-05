---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: jsx-react/no-render-return-value
  language: JavaScript
  severity: Warning
title: Avoid usage of the return value of ReactDOM.render
---
## Metadata
**ID:** `jsx-react/no-render-return-value`

**Language:** JavaScript

**Severity:** Warning

**Category:** Best Practices

## Description
Using the return value of the render method is a legacy feature. If you have a valid reason to reference the root React instance, you should assign a callback ref to the root component.

## Non-Compliant Code Examples
```jsx
const inst = ReactDOM.render(<App />, document.body);
```

## Compliant Code Examples
```jsx
ReactDOM.render(<App ref={doSomethingWithInst} />, document.body);

ReactDOM.render(<App />, document.body, doSomethingWithInst);
```
