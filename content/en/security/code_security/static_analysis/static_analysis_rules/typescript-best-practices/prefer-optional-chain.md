---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/prefer-optional-chain
- /static_analysis/rules/typescript-best-practices/prefer-optional-chain
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/prefer-optional-chain
  language: TypeScript
  severity: Info
  severity_rank: 4
title: Prefer an optional chain instead of chaining operators
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/prefer-optional-chain`

**Language:** TypeScript

**Severity:** Info

**Category:** Best Practices

## Description
The JavaScript optional chaining operator (`?.`) allows you to read the value of a property located deep within a chain of connected objects without having to validate that each reference in the chain is valid. This operator helps prevent potential runtime errors when dealing with nested objects that may or may not exist.

Without the optional chaining operator, you would need to perform a check at each level of the nested structure. This can result in verbose and complex code, which is harder to read and maintain. The optional chaining operator short-circuits this process, returning `undefined` if a reference is `null` or `undefined` before reaching the end of the chain.

To adhere to this rule, you should use the optional chaining operator (`?.`) whenever you're dealing with nested objects where a reference might be `null` or `undefined`.

## Non-Compliant Code Examples
```typescript
a && a.b;
a && a['b'];
a && a.b != null;

(a || {}).b;
(a || {})['b'];

!a || !a.b;
!a || !a['b'];
```

## Compliant Code Examples
```typescript
a?.b;
a?.['b']

!a?.b;
!a?.['b'];
```
