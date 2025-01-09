---
aliases:
- /continuous_integration/static_analysis/rules/tsx-react/no-this-in-component
- /static_analysis/rules/tsx-react/no-this-in-component
dependencies: []
disable_edit: true
group_id: tsx-react
meta:
  category: Error Prone
  id: tsx-react/no-this-in-component
  language: TypeScript
  severity: Error
  severity_rank: 1
title: Do not use this in functional components
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `tsx-react/no-this-in-component`

**Language:** TypeScript

**Severity:** Error

**Category:** Error Prone

## Description
In TypeScript, particularly in the context of React, the `this` keyword is not necessary in functional components. Functional components are simpler constructs that are stateless and do not have access to the `this` keyword. Using `this` in a functional component is erroneous and leads to bugs in your code.

To adhere to this rule, always refer to props directly in functional components. Instead of using `this.props.foo`, use `props.foo`. This ensures that you are accessing the props object directly, rather than trying to access it through `this`, which is not available in functional components.

## Non-Compliant Code Examples
```typescript
function Test(props) {
    return (
        <div>{this.props.foo}</div>
    );
}
```

## Compliant Code Examples
```typescript
function Test(props) {
    return (
        <div>{props.foo}</div>
    );
}
```
