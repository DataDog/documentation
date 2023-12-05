---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-node-security/chmod-permissions
  language: TypeScript
  severity: Warning
title: Do not give 777 permissions to a file
---
## Metadata
**ID:** `typescript-node-security/chmod-permissions`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Always make sure you restrict the permissions of your application files. Applications should not allow write and execution for other users, as it may leak data and information. Always restrict the number of users and applications that can access your application data.

## Non-Compliant Code Examples
```typescript
const fs = require('fs');
const fsPromises = fs.promises;

fs.chmodSync("/tmp/myfile", 0o777);
fsPromises.chmod("/tmp/fsPromises", 0o777);

```

## Compliant Code Examples
```typescript
const fs = require('fs');
const fsPromises = fs.promises;

fs.chmodSync(myPath, 0o770);
fsPromises.chmod("/tmp/fsPromises", 0o770);

```
