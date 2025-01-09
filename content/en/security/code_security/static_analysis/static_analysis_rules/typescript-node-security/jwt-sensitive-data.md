---
aliases:
- /continuous_integration/static_analysis/rules/typescript-node-security/jwt-sensitive-data
- /static_analysis/rules/typescript-node-security/jwt-sensitive-data
dependencies: []
disable_edit: true
group_id: typescript-node-security
meta:
  category: Security
  id: typescript-node-security/jwt-sensitive-data
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Do not put sensitive data in objects
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-node-security/jwt-sensitive-data`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

**CWE**: [312](https://cwe.mitre.org/data/definitions/312.html)

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
