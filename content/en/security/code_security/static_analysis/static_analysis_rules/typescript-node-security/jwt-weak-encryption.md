---
aliases:
- /continuous_integration/static_analysis/rules/typescript-node-security/jwt-weak-encryption
- /static_analysis/rules/typescript-node-security/jwt-weak-encryption
dependencies: []
disable_edit: true
group_id: typescript-node-security
meta:
  category: Security
  id: typescript-node-security/jwt-weak-encryption
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Use default encryption from the JWT library
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-node-security/jwt-weak-encryption`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

**CWE**: [327](https://cwe.mitre.org/data/definitions/327.html)

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
