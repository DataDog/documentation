---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/no-console
- /static_analysis/rules/javascript-best-practices/no-console
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Best Practices
  id: javascript-best-practices/no-console
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid leaving console debug statements
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/no-console`

**Language:** JavaScript

**Severity:** Warning

**Category:** Best Practices

## Description
Debugging with `console` (such as `console.log` or `console.info`) is not considered a bad practice, but these statements can be accidentally left in production code, leading to unnecessary log pollution. It is important to remove or replace these debugging statements to maintain clean and secure production builds.

## Non-Compliant Code Examples
```javascript
console.log(foo) // General-purpose logging which can expose internal information 
console.error(foo) // Error logging which can expose sensitive information
console.info(foo) // Informational logging which can clutter production logs
console.warn(foo) // Warning logging which can be excessive for production
```

## Compliant Code Examples
```javascript
Console.info(foo) // Example placeholder for a custom logging method or library
```
