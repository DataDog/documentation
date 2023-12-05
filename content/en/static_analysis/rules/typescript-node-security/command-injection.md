---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-node-security/command-injection
  language: TypeScript
  severity: Warning
title: Avoid command injection
---
## Metadata
**ID:** `typescript-node-security/command-injection`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
When executing a command, never use unchecked variables. Make sure that each variable of the command has been checked.

## Non-Compliant Code Examples
```typescript
childprocess.exec(`mv ${src} ${dst}`, (error, stdout, stderr) => {});
childprocess.exec('mv ' + src + " " + dst, (error, stdout, stderr) => {});
```

## Compliant Code Examples
```typescript
childprocess.exec('mv /tmp/src /tmp/dst', (error, stdout, stderr) => {});

```
