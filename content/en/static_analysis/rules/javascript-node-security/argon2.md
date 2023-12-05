---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-node-security/argon2
  language: JavaScript
  severity: Error
title: Use strong security mechanisms with argon2
---
## Metadata
**ID:** `javascript-node-security/argon2`

**Language:** JavaScript

**Severity:** Error

**Category:** Security

## Description
Use secure and fast security mechanisms with using `argon2`.

#### Learn More

 - [argon2 types](https://github.com/ranisalt/node-argon2/wiki/Options#type)

## Non-Compliant Code Examples
```javascript
await argon2.hash('password', {type: argon2.argon2d})
await argon2.hash('password', {type: argon2.argon2i})
```

## Compliant Code Examples
```javascript
await argon2.hash('password', {type: argon2.argon2id})
await argon2.hash('password', {})
```
