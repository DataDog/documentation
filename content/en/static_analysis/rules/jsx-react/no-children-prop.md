---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: jsx-react/no-children-prop
  language: JavaScript
  severity: Warning
title: Avoid passing children as props
---
## Metadata
**ID:** `jsx-react/no-children-prop`

**Language:** JavaScript

**Severity:** Warning

**Category:** Best Practices

## Description
Children should be used as actual children not a JSX prop. This rule enforces the use of children as an element between the JSX element opening and closing tag.

## Non-Compliant Code Examples
```jsx
<div children='Children' />;

<MyComponent children={<AnotherComponent />} />;
<MyComponent children={['Child 1', 'Child 2']} />;

React.createElement("div", { children: 'Children' });
```

## Compliant Code Examples
```jsx
<div>Children</div>;
<MyComponent>Children</MyComponent>;
<MyComponent>
  <span>Child 1</span>
  <span>Child 2</span>
</MyComponent>;
React.createElement("div", {}, 'Children');
React.createElement("div", 'Child 1', 'Child 2');
```
