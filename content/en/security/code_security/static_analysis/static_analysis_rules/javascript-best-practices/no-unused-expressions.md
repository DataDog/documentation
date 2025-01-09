---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/no-unused-expressions
- /static_analysis/rules/javascript-best-practices/no-unused-expressions
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Performance
  id: javascript-best-practices/no-unused-expressions
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid unused expressions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/no-unused-expressions`

**Language:** JavaScript

**Severity:** Warning

**Category:** Performance

## Description
This rule in JavaScript ensures that the code you write is actually used. An unused expression is a piece of code that is evaluated but the result is not used or assigned to a variable. These expressions do not have any effect on the program and can lead to confusion, making the code harder to read and understand.

To avoid unused expressions, always ensure that the result of each expression is either assigned to a variable, used in a larger expression, or used as an argument to a function.

## Non-Compliant Code Examples
```javascript
1

if(2) 3

{4}

func(5), {}

foo && bar()

foo, bar()

baz = foo, bar;

foo() && function funcInExpression() {baz();}

(function incompleteIIFE() {});
```

## Compliant Code Examples
```javascript
{} // This is a block, so it's ok.

function namedFunc() {}

(function realIIFE(){} ());

func()

foo = 1

new Bar

delete foo.baz

void baz
```
