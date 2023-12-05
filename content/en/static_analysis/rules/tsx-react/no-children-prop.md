---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: tsx-react/no-children-prop
  language: TypeScript
  severity: Warning
title: Avoid passing children as props
---
## Metadata
**ID:** `tsx-react/no-children-prop`

**Language:** TypeScript

**Severity:** Warning

**Category:** Best Practices

## Description
The children of a JSX element should appear as elements between the parent's opening and closing tags, not as props in the opening tag. This rule enforces the use of children as an element.

## Non-Compliant Code Examples
```typescript
<div children='Children' />;

<MyComponent children={<AnotherComponent />} />;
<MyComponent children={['Child 1', 'Child 2']} />;

React.createElement("div", { children: 'Children' });
```

## Compliant Code Examples
```typescript
<div>Children</div>;
<MyComponent>Children</MyComponent>;
<MyComponent>
  <span>Child 1</span>
  <span>Child 2</span>
</MyComponent>;
React.createElement("div", {}, 'Children');
React.createElement("div", 'Child 1', 'Child 2');
```
