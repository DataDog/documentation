---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-express/default-session-config
  language: JavaScript
  severity: Warning
title: Enforce overriding default config
---
## Metadata
**ID:** `javascript-express/default-session-config`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

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
