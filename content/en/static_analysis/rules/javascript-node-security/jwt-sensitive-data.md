---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-node-security/jwt-sensitive-data
  language: JavaScript
  severity: Warning
title: Do not put sensitive data in objects
---
## Metadata
**ID:** `javascript-node-security/jwt-sensitive-data`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

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
