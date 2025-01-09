---
aliases:
- /continuous_integration/static_analysis/rules/javascript-express/insecure-cookie
- /static_analysis/rules/javascript-express/insecure-cookie
dependencies: []
disable_edit: true
group_id: javascript-express
meta:
  category: Security
  id: javascript-express/insecure-cookie
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid setting insecure cookie settings
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-express/insecure-cookie`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [1004](https://cwe.mitre.org/data/definitions/1004.html)

## Description
When using cookies in your application, one should ensure appropriate security options are set to lessen the risk of exploits and unauthorized users. 

This rule will detect when `secure` and `httpOnly` are set to `false` in a multitude of ways.

#### Learn More

- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely)

## Non-Compliant Code Examples
```javascript
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
```javascript
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
