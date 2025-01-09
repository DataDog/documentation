---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/no-delete-var
- /static_analysis/rules/javascript-best-practices/no-delete-var
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Best Practices
  id: javascript-best-practices/no-delete-var
  language: JavaScript
  severity: Error
  severity_rank: 1
title: Avoid using delete on variables directly
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/no-delete-var`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

**CWE**: [480](https://cwe.mitre.org/data/definitions/480.html)

## Description
The `delete` operator is designed to remove properties from objects in JavaScript. When used correctly, it can help manage object properties. However, using the `delete` operator on anything other than object properties can lead to unpredictable behavior.

## Non-Compliant Code Examples
```javascript
delete x
```

## Compliant Code Examples
```javascript
delete x.prop;
```
