---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/no-octal
- /static_analysis/rules/javascript-best-practices/no-octal
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Best Practices
  id: javascript-best-practices/no-octal
  language: JavaScript
  severity: Error
  severity_rank: 1
title: Avoid using octal literals to prevent unexpected behavior
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/no-octal`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

**CWE**: [682](https://cwe.mitre.org/data/definitions/682.html)

## Description
In JavaScript, numbers that start with a leading zero (`0`) are considered octal (base-8) literals. However, octal literals can lead to unintended and unexpected behavior, especially for developers who are not familiar with this notation or when used accidentally.

## Non-Compliant Code Examples
```javascript
var a = 01234;
a = 1 + 01234;
00;
08;
09.1;
09e1;
09.1e1;
018;
019.1;
019e1;
019.1e1;
```

## Compliant Code Examples
```javascript
var a = 'hello world';
0x1234
0X5;
a = 0;
0.1
0.5e1
```
