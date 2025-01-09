---
aliases:
- /continuous_integration/static_analysis/rules/javascript-node-security/chmod-permissions
- /static_analysis/rules/javascript-node-security/chmod-permissions
dependencies: []
disable_edit: true
group_id: javascript-node-security
meta:
  category: Security
  id: javascript-node-security/chmod-permissions
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Do not give 777 permissions to a file
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-node-security/chmod-permissions`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [732](https://cwe.mitre.org/data/definitions/732.html)

## Description
Always make sure you restrict permissions of your application files. Application files should not allow write and execution for other users as it may leak data and information. Always restrict the number of users and applications that can access your application data.

## Non-Compliant Code Examples
```javascript
const fs = require('fs');
const fsPromises = fs.promises;

fs.chmodSync("/tmp/myfile", 0o777);
fsPromises.chmod("/tmp/fsPromises", 0o777);

```

## Compliant Code Examples
```javascript
const fs = require('fs');
const fsPromises = fs.promises;

fs.chmodSync(myPath, 0o770);
fsPromises.chmod("/tmp/fsPromises", 0o770);

```
