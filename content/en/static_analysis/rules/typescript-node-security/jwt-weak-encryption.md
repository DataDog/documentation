---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-node-security/jwt-weak-encryption
  language: TypeScript
  severity: Warning
title: Use default encryption from the JWT library
---
## Metadata
**ID:** `typescript-node-security/jwt-weak-encryption`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Do not use `none` as a validation algorithm for a JWT token. The none algorithm assumes that the token has been verified, which would allow attacker to create a token that would be automatically validated.

Never use the `none` algorithm, always use a valid algorithm as directed by [the documentation](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback).

## Non-Compliant Code Examples
```typescript
jwt.verify(token, secret, { algorithms: ['RS256', 'none'] }, func);
jwt.verify(token, secret, { algorithms: ['none', 'RS256'] }, func);
```

## Compliant Code Examples
```typescript
jwt.verify(token, secret, { algorithms: ['RS256', 'HS256'] }, func);
```
