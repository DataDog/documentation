---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-browser-security/regexp-non-literal
  language: TypeScript
  severity: Warning
title: Do not use variable for regular expressions
---
## Metadata
**ID:** `typescript-browser-security/regexp-non-literal`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Regular expressions should not use a variable as an argument since an attacker may inject values and cause a regular expression denial of service (ReDoS). Instead, use a library like [recheck](https://www.npmjs.com/package/recheck) to check that no DoS can be triggered by regular expression.

## Non-Compliant Code Examples
```typescript
const foo = new RegExp(req.something);
const bar = new RegExp(variable);
```

## Compliant Code Examples
```typescript
const foo = new RegExp(`^\\d+-${topicId}$`);
const foo = new RegExp(/something/);
const foo = new RegExp("weofiwje");
```
