---
aliases:
- /continuous_integration/static_analysis/rules/tsx-react/require-render-return
- /static_analysis/rules/tsx-react/require-render-return
dependencies: []
disable_edit: true
group_id: tsx-react
meta:
  category: Error Prone
  id: tsx-react/require-render-return
  language: TypeScript
  severity: Error
  severity_rank: 1
title: Enforce class for returning value in render function
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
