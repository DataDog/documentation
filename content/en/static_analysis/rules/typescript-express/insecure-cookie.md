---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-express/insecure-cookie
  language: TypeScript
  severity: Warning
title: Avoid setting insecure cookie settings
---
## Metadata
**ID:** `typescript-express/insecure-cookie`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
When using cookies in your application, one should ensure appropriate security options are set to lessen the risk of exploits and unauthorized users. 

This rule will detect when `secure` and `httpOnly` are set to `false` in a multitude of ways.

#### Learn More
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely)

## Non-Compliant Code Examples
```typescript
const cookie = {
    secure: false,
    httpOnly: false,
}

const options = {
    cookie: {
        secure: false,
        httpOnly: false,
    }
}

cookieSession({ secure: false })
```

## Compliant Code Examples
```typescript
const cookie = {
    secure: true,
    httpOnly: true,
}

const options = {
    cookie: {
        secure: true,
        httpOnly: true,
    }
}

cookieSession({ secure: true })
```
