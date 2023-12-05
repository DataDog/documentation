---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-node-security/chmod-permissions
  language: JavaScript
  severity: Warning
title: Do not give 777 permissions to a file
---
## Metadata
**ID:** `javascript-node-security/chmod-permissions`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

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
