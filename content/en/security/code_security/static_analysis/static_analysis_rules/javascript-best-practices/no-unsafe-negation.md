---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/no-unsafe-negation
- /static_analysis/rules/javascript-best-practices/no-unsafe-negation
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Best Practices
  id: javascript-best-practices/no-unsafe-negation
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid negating the left operand of relational operators
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/no-unsafe-negation`

**Language:** JavaScript

**Severity:** Warning

**Category:** Best Practices

## Description
Negation of the left-hand side of an expression is often unintended.

## Non-Compliant Code Examples
```javascript
!a in b
(!a in b)
!(a) in b
!a instanceof b
(!a instanceof b)
!(a) instanceof b
```

## Compliant Code Examples
```javascript
a in b
a in b === false
!(a in b);
(!a) in b
a instanceof b
a instanceof b === false;
!(a instanceof b);
(!a) instanceof b;

```
