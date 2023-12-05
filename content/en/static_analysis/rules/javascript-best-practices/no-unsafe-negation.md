---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: javascript-best-practices/no-unsafe-negation
  language: JavaScript
  severity: Warning
title: Avoid negating the left operand of relational operators
---
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
