---
aliases:
- /continuous_integration/static_analysis/rules/tsx-react/no-string-refs
- /static_analysis/rules/tsx-react/no-string-refs
dependencies: []
disable_edit: true
group_id: tsx-react
meta:
  category: Best Practices
  id: tsx-react/no-string-refs
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid using string references
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `tsx-react/no-string-refs`

**Language:** TypeScript

**Severity:** Warning

**Category:** Best Practices

## Description
String references are a legacy feature of React. Use a reference callback instead.

## Non-Compliant Code Examples
```typescript
var Hello = createReactClass({
 render: function() {
  return <div ref="hello" a="foo" />;
 }
});
var Hello = createReactClass({
 render: function() {
  return <div ref="hello">Hello, world.</div>;
 }
});
var Hello = createReactClass({
  componentDidMount: function() {
    var component = this.refs.hello;
    // ...do something with component
  },
  render: function() {
    return <div ref="hello">Hello, world.</div>;
  }
});
```

## Compliant Code Examples
```typescript
var Hello = createReactClass({
  componentDidMount: function() {
    var component = this.hello;
    // ...do something with component
  },
  render() {
    return <div ref={(c) => { this.hello = c; }}>Hello, world.</div>;
  }
});
```
