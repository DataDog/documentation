---
aliases:
- /continuous_integration/static_analysis/rules/jsx-react/jsx-no-duplicate-props
- /static_analysis/rules/jsx-react/jsx-no-duplicate-props
dependencies: []
disable_edit: true
group_id: jsx-react
meta:
  category: Error Prone
  id: jsx-react/jsx-no-duplicate-props
  language: JavaScript
  severity: Error
  severity_rank: 1
title: Avoid duplicate properties in JSX
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
