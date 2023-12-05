---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-node-security/detect-new-buffer
  language: TypeScript
  severity: Warning
title: Avoid Buffer(argument) with non-literal values
---
## Metadata
**ID:** `typescript-node-security/detect-new-buffer`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Dealing with binary data can achieved with Node.js Buffer class, however if used with non literal params it could lead to an attack as the attacker might control the value of the provided parameter.

For example a large number could allocate a large amount of memory leading to a denial of service attack. It is recommended to use literal values you can control to prevent attacks.

## Non-Compliant Code Examples
```typescript
var a = new Buffer(c)
```

## Compliant Code Examples
```typescript
var a = new Buffer('test')
```
