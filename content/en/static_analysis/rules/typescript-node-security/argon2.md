---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-node-security/argon2
  language: TypeScript
  severity: Error
title: Use strong security mechanisms with argon2
---
## Metadata
**ID:** `typescript-node-security/argon2`

**Language:** TypeScript

**Severity:** Error

**Category:** Security

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
