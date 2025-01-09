---
aliases:
- /continuous_integration/static_analysis/rules/javascript-node-security/command-injection
- /static_analysis/rules/javascript-node-security/command-injection
dependencies: []
disable_edit: true
group_id: javascript-node-security
meta:
  category: Security
  id: javascript-node-security/command-injection
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid command injection
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-node-security/command-injection`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [78](https://cwe.mitre.org/data/definitions/78.html)

## Description
When executing a command, never use unchecked variables. Make sure that each variable in the command has been checked.

## Non-Compliant Code Examples
```javascript
childprocess.exec(`mv ${src} ${dst}`, (error, stdout, stderr) => {});
childprocess.exec('mv ' + src + " " + dst, (error, stdout, stderr) => {});
```

## Compliant Code Examples
```javascript
childprocess.exec('mv /tmp/src /tmp/dst', (error, stdout, stderr) => {});

```
