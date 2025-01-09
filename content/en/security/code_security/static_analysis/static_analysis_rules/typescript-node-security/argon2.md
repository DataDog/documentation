---
aliases:
- /continuous_integration/static_analysis/rules/typescript-node-security/argon2
- /static_analysis/rules/typescript-node-security/argon2
dependencies: []
disable_edit: true
group_id: typescript-node-security
meta:
  category: Security
  id: typescript-node-security/argon2
  language: TypeScript
  severity: Error
  severity_rank: 1
title: Use strong security mechanisms with argon2
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-node-security/argon2`

**Language:** TypeScript

**Severity:** Error

**Category:** Security

**CWE**: [327](https://cwe.mitre.org/data/definitions/327.html)

## Description
Use secure and fast security mechanisms when using `argon2`.

#### Learn More

 - [argon2 types](https://github.com/ranisalt/node-argon2/wiki/Options#type)

## Non-Compliant Code Examples
```typescript
await argon2.hash('password', {type: argon2.argon2d})
await argon2.hash('password', {type: argon2.argon2i})
```

## Compliant Code Examples
```typescript
await argon2.hash('password', {type: argon2.argon2id})
await argon2.hash('password', {})
```
