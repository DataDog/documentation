---
aliases:
- /continuous_integration/static_analysis/rules/typescript-code-style/no-self-compare
- /static_analysis/rules/typescript-code-style/no-self-compare
dependencies: []
disable_edit: true
group_id: typescript-code-style
meta:
  category: Error Prone
  id: typescript-code-style/no-self-compare
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid comparisons where both sides are exactly the same
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-code-style/no-self-compare`

**Language:** TypeScript

**Severity:** Warning

**Category:** Error Prone

## Description
Comparing a variable to itself is most likely a mistake.

## Non-Compliant Code Examples
```typescript
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
```typescript
if (x === y) { }
if (1 === 2) { }
y=x*x
foo.bar.baz === foo.bar.qux
class C { #field; foo() { this.#field === this['#field']; } }
class C { #field; foo() { this['#field'] === this.#field; } }
```
