---
aliases:
- /continuous_integration/static_analysis/rules/jsx-react/no-redundant-fragments
- /static_analysis/rules/jsx-react/no-redundant-fragments
dependencies: []
disable_edit: true
group_id: jsx-react
meta:
  category: Code Style
  id: jsx-react/no-redundant-fragments
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Fragments should not be used when there is 1 child
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `jsx-react/no-redundant-fragments`

**Language:** JavaScript

**Severity:** Warning

**Category:** Code Style

## Description
This rule emphasizes that React Fragments should not be used when there is only one child within the component. React Fragments are a useful feature for grouping a list of children without adding extra nodes to the DOM. However, when there is only a single child, the use of Fragments is unnecessary and can lead to cluttered and confusing code.

To avoid violating this rule, remove the Fragment (`<>...</>`) when you have only one child in your component. Instead of wrapping a single child with a Fragment, you can return the child directly.

## Non-Compliant Code Examples
```jsx
export default function Menu() {
  return (
    <>
      <MenuText />
    </>
  );
}

function MenuText() {
  return (
    <h1>
    <>Menu</>
    </h1>
  );
}
```

## Compliant Code Examples
```jsx
export default function Menu() {
  return <MenuText />;
}

function MenuText() {
  return <h1>Menu</h1>;
}
```
