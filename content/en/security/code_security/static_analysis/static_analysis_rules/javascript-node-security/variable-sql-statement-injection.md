---
aliases:
- /continuous_integration/static_analysis/rules/javascript-node-security/variable-sql-statement-injection
- /static_analysis/rules/javascript-node-security/variable-sql-statement-injection
dependencies: []
disable_edit: true
group_id: javascript-node-security
meta:
  category: Security
  id: javascript-node-security/variable-sql-statement-injection
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid SQL injections
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-node-security/variable-sql-statement-injection`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [89](https://cwe.mitre.org/data/definitions/89.html)

## Description
Check for variable declarations in a SQL statement where there is potential for SQL injections.

## Non-Compliant Code Examples
```javascript
var table = 'baz';

const foo = "SELECT foo FROM " + table;
const select = `SELECT foo FROM ${table}`;
var del = `DELETE FROM ${table} WHERE condition;`;
let update = ' UPDATE ' +
             table +
             "SET column1 = value1, column2 = value2" +
             "WHERE condition;";
```
