---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-node-security/command-injection
  language: JavaScript
  severity: Warning
title: Avoid command injection
---
## Metadata
**ID:** `javascript-node-security/command-injection`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

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
