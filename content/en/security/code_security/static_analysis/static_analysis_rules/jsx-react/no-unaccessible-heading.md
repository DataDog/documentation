---
aliases:
- /continuous_integration/static_analysis/rules/jsx-react/no-unaccessible-heading
- /static_analysis/rules/jsx-react/no-unaccessible-heading
dependencies: []
disable_edit: true
group_id: jsx-react
meta:
  category: Code Style
  id: jsx-react/no-unaccessible-heading
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Headings must be accessible
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `jsx-react/no-unaccessible-heading`

**Language:** JavaScript

**Severity:** Warning

**Category:** Code Style

## Description
This rule ensures that all heading elements in your JavaScript code are accessible to all users, including those using assistive technologies like screen readers. This helps ensure that your web pages are inclusive and accessible to all users, regardless of their abilities or disabilities.

In the non-compliant code example, the heading element `<h1 aria-hidden>Foo</h1>` is marked with the `aria-hidden` attribute, which hides the element from assistive technologies. This is a violation of the rule because it makes the heading inaccessible to users who rely on these technologies.

To avoid these violations, ensure that all your heading elements are visible to assistive technologies and provide useful information. Don't use the `aria-hidden` attribute on them unless it's absolutely necessary.

## Non-Compliant Code Examples
```jsx
function Test() {
  return (
    <>
      <h1 aria-hidden>Foo</h1>
      <h1/>
    </>
  );
}
```

## Compliant Code Examples
```jsx
function Test() {
  return (
    <h1>Foo</h1>
  );
}
```
