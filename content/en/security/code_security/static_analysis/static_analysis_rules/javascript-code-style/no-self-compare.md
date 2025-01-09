---
aliases:
- /continuous_integration/static_analysis/rules/javascript-code-style/no-self-compare
- /static_analysis/rules/javascript-code-style/no-self-compare
dependencies: []
disable_edit: true
group_id: javascript-code-style
meta:
  category: Error Prone
  id: javascript-code-style/no-self-compare
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid comparisons where both sides are exactly the same
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-code-style/no-self-compare`

**Language:** JavaScript

**Severity:** Warning

**Category:** Error Prone

## Description
Comparing a variable to itself is most likely a mistake.

## Non-Compliant Code Examples
```javascript
if (x === x) { }
if (x !== x) { }
if (x > x) { }
if ('x' > 'x') { }
do {} while (x === x)
x === x
x !== x
x == x
x != x
x > x
x < x
x >= x
x <= x
foo.bar().baz.qux >= foo.bar().baz.qux
class C { #field; foo() { this.#field === this.#field; } }
```

## Compliant Code Examples
```javascript
if (x === y) { }
if (1 === 2) { }
y=x*x
foo.bar.baz === foo.bar.qux
class C { #field; foo() { this.#field === this['#field']; } }
class C { #field; foo() { this['#field'] === this.#field; } }
```
