---
aliases:
- /continuous_integration/static_analysis/rules/javascript-node-security/jwt-sensitive-data
- /static_analysis/rules/javascript-node-security/jwt-sensitive-data
dependencies: []
disable_edit: true
group_id: javascript-node-security
meta:
  category: Security
  id: javascript-node-security/jwt-sensitive-data
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Do not put sensitive data in objects
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-node-security/jwt-sensitive-data`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [312](https://cwe.mitre.org/data/definitions/312.html)

## Description
Never include sensitive information in a JWT. Instead, only use non-personal information to identify the end-user.

## Non-Compliant Code Examples
```javascript
jwt.sign(
    {user: { email: 'foo@bar.com'}}
)

jwt.sign(
    {user: { lastname: 'babar'}}
)

```

## Compliant Code Examples
```javascript
jwt.sign(
    {user: { id: 42}}
)
```
