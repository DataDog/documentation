---
aliases:
- /continuous_integration/static_analysis/rules/javascript-express/default-session-config
- /static_analysis/rules/javascript-express/default-session-config
dependencies: []
disable_edit: true
group_id: javascript-express
meta:
  category: Security
  id: javascript-express/default-session-config
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Enforce overriding default config
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-express/default-session-config`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [523](https://cwe.mitre.org/data/definitions/523.html)

## Description
Avoid leaving your session cookies open to exploits or unauthorized access, by overriding default values.

Setting the `name` value to something generic is better than using the default value.

#### Learn More
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely)

## Non-Compliant Code Examples
```javascript
const session = require('express-session')

app.use(
    session({
        secret: "secret"
    })
)
```

## Compliant Code Examples
```javascript
const session = require('express-session')

app.use(
    session({
        secret: "secret",
        name: 'sessionId'
    })
)
```
