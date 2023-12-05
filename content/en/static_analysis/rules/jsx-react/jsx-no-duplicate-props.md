---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: jsx-react/jsx-no-duplicate-props
  language: JavaScript
  severity: Error
title: Avoid duplicate properties in JSX
---
## Metadata
**ID:** `jsx-react/jsx-no-duplicate-props`

**Language:** JavaScript

**Severity:** Error

**Category:** Error Prone

## Description
Providing duplicate properties to JSX elements can produce unexpected results in your project.

## Non-Compliant Code Examples
```jsx
<Hello name="John" name="John" />;
<Hello name="John" name="John">foo</Hello>;

```

## Compliant Code Examples
```jsx
<Hello firstname="John" lastname="Doe" />;
```
