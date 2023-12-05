---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: tsx-react/require-render-return
  language: TypeScript
  severity: Error
title: Enforce class for returning value in render function
---
## Metadata
**ID:** `tsx-react/require-render-return`

**Language:** TypeScript

**Severity:** Error

**Category:** Error Prone

## Description
It's easy to forget to return a value from a class component render method. This rule warns when the render method does not return a value.

## Non-Compliant Code Examples
```typescript
var Hello = createReactClass({
  render() {
    <div>Hello</div>;
  }
});

class Hello extends React.Component {
  render() {
    <div>Hello</div>;
  }
}
```

## Compliant Code Examples
```typescript
var Hello = createReactClass({
  render() {
    return <div>Hello</div>;
  }
});

class Hello extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}
```
