---
aliases:
- /continuous_integration/static_analysis/rules/tsx-react/no-tabindex-positive
- /static_analysis/rules/tsx-react/no-tabindex-positive
dependencies: []
disable_edit: true
group_id: tsx-react
meta:
  category: Best Practices
  id: tsx-react/no-tabindex-positive
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Do not use positive values for a span's tabIndex attribute
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `tsx-react/no-tabindex-positive`

**Language:** TypeScript

**Severity:** Notice

**Category:** Best Practices

## Description
This rule is to help ensure a logical and efficient tab order in web applications. The `tabIndex` attribute specifies the tab order of an element, with a positive value indicating that the element should be included in the tab order. However, using positive values can disrupt the natural tab order, leading to a confusing and potentially inaccessible user interface.

This rule is particularly important for ensuring accessibility and usability. Users who rely on keyboard navigation, such as those with motor disabilities or vision impairments, may struggle to navigate a page if the tab order is not logical and predictable.

To adhere to this rule, you should avoid using positive values for the `tabIndex` attribute. Instead, use a `tabIndex` of `0` to include an element in the tab order based on its position in the document flow, or a `tabIndex` of `-1` to exclude an element from the tab order.

## Non-Compliant Code Examples
```typescript
function Menu() {
    return (
        <div>
            <span tabIndex="5">item1</span>
            <span tabIndex={3}>item2</span>
        </div>
    );
}
```

## Compliant Code Examples
```typescript
function Menu() {
    return (
        <div>
            <span tabIndex="-1">item1</span>
            <span tabIndex={0}>item2</span>
        </div>
    );
}
```
