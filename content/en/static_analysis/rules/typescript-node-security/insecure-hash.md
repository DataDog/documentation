---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-node-security/insecure-hash
  language: TypeScript
  severity: Warning
title: Do not use weah hash functions
---
## Metadata
**ID:** `typescript-node-security/insecure-hash`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Do not use weak hash algorithms such as MD5 or SHA1.

#### Learn More

 - [CWE-328: Use of Weak Hash](https://cwe.mitre.org/data/definitions/328.html)

## Non-Compliant Code Examples
```typescript
crypto.createHash("md5")
crypto.createHash("sha1")
```

## Compliant Code Examples
```typescript
crypto.createHash("sha256")

```
