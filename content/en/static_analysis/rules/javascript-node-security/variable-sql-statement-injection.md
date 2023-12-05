---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-node-security/variable-sql-statement-injection
  language: JavaScript
  severity: Warning
title: Avoid SQL injections
---
## Metadata
**ID:** `javascript-node-security/variable-sql-statement-injection`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

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
