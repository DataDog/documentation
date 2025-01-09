---
aliases:
- /continuous_integration/static_analysis/rules/jsx-react/require-render-return
- /static_analysis/rules/jsx-react/require-render-return
dependencies: []
disable_edit: true
group_id: jsx-react
meta:
  category: Error Prone
  id: jsx-react/require-render-return
  language: JavaScript
  severity: Error
  severity_rank: 1
title: Enforce class for returning value in render function
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `jsx-react/require-render-return`

**Language:** JavaScript

**Severity:** Error

**Category:** Error Prone

## Description
It's easy to forget the return value of a class component render method. This rule warns when the render method does not return a value.

## Non-Compliant Code Examples
```jsx
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
```jsx
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
