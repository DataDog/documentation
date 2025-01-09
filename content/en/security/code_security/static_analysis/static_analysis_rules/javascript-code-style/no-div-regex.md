---
aliases:
- /continuous_integration/static_analysis/rules/javascript-code-style/no-div-regex
- /static_analysis/rules/javascript-code-style/no-div-regex
dependencies: []
disable_edit: true
group_id: javascript-code-style
meta:
  category: Error Prone
  id: javascript-code-style/no-div-regex
  language: JavaScript
  severity: Notice
  severity_rank: 3
title: Avoid equal signs at the beginning of regular expressions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-code-style/no-div-regex`

**Language:** JavaScript

**Severity:** Notice

**Category:** Error Prone

## Description
At the start of a regular expression literal, the characters `/=` can be mistaken for a division assignment operator.

## Non-Compliant Code Examples
```javascript
var f = function() { return /=foo/; };
```

## Compliant Code Examples
```javascript
var f = function() { return /foo/ig.test('bar'); };
var f = function() { return /\\=foo/; };
```
