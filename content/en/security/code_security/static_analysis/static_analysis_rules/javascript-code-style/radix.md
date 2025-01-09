---
aliases:
- /continuous_integration/static_analysis/rules/javascript-code-style/radix
- /static_analysis/rules/javascript-code-style/radix
dependencies: []
disable_edit: true
group_id: javascript-code-style
meta:
  category: Best Practices
  id: javascript-code-style/radix
  language: JavaScript
  severity: Notice
  severity_rank: 3
title: Consistent use of the radix argument using parseInt
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-code-style/radix`

**Language:** JavaScript

**Severity:** Notice

**Category:** Best Practices

## Description
When utilizing the `parseInt()` function, many often skip the second parameter (the radix), allowing the function to deduce the number type based on the initial argument. By default, `parseInt()` can recognize both decimal and hexadecimal numbers, the latter through the `0x` prefix. However, before ECMAScript 5, the function also mistakenly recognized octal numbers, leading to issues as many developers presumed a starting `0` would be disregarded.

## Non-Compliant Code Examples
```javascript
parseInt();
parseInt();
parseInt("10");
parseInt("10",);
parseInt((0, "10"));
parseInt((0, "10"),);
parseInt("10", null);
parseInt("10", undefined);
parseInt("10", true);
parseInt("10", "foo");
parseInt("10", "123");
parseInt("10", 1);
parseInt("10", 37);
parseInt("10", 10.5);
Number.parseInt();
Number.parseInt();
Number.parseInt("10");
Number.parseInt("10", 1);
Number.parseInt("10", 37);
Number.parseInt("10", 10.5);
parseInt?.("10");
Number.parseInt?.("10");
Number?.parseInt("10");
(Number?.parseInt)("10");

```

## Compliant Code Examples
```javascript
parseInt("10", 10);
parseInt("10", 2);
parseInt("10", 36);
parseInt("10", 0x10);
parseInt("10", 1.6e1);
parseInt("10", 10.0);
parseInt("10", foo);
Number.parseInt("10", foo);
parseInt("10", 10);
parseInt("10", 8);
parseInt("10", foo);
parseInt
Number.foo();
Number[parseInt]();
class C { #parseInt; foo() { Number.#parseInt(); } }
class C { #parseInt; foo() { Number.#parseInt(foo); } }
class C { #parseInt; foo() { Number.#parseInt(foo, 'bar'); } }
class C { #parseInt; foo() { Number.#parseInt(foo, 10); } }

// shadowed not supported
// Ignores if it's shadowed or disabled.
// var parseInt; parseInt();
// var parseInt; parseInt(foo);
// var parseInt; parseInt(foo, 10);
// var Number; Number.parseInt();
// var Number; Number.parseInt(foo);
// var Number; Number.parseInt(foo, 10);
// /* globals parseInt:off */ parseInt(foo);
// Number.parseInt(foo, 10);
```
