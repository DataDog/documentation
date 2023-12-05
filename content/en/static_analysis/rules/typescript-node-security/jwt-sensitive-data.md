---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-node-security/jwt-sensitive-data
  language: TypeScript
  severity: Warning
title: Do not put sensitive data in objects
---
## Metadata
**ID:** `typescript-node-security/jwt-sensitive-data`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Never include sensitive information in a JWT. Instead, only use non-personal information to identify the end-user.

## Non-Compliant Code Examples
```typescript
jwt.sign(
    { user: { email: 'foo@bar.com' }}
)

jwt.sign(
    { user: { lastname: 'babar' }}
)
```

## Compliant Code Examples
```typescript
jwt.sign(
    {user: { id: 42 }}
)
```
