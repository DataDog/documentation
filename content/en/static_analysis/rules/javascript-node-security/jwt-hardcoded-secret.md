---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-node-security/jwt-hardcoded-secret
  language: JavaScript
  severity: Error
title: Do not use hardcoded secret with a JWT
---
## Metadata
**ID:** `javascript-node-security/jwt-hardcoded-secret`

**Language:** JavaScript

**Severity:** Error

**Category:** Security

## Description
Never hardcode secrets. Instead, use secrets from environment variables or a secret vault.


## Non-Compliant Code Examples
```javascript
var jwt = require("jsonwebtoken");

var token = jwt.sign({ foo: "bar" }, "secret");

var token = jwt.sign({ foo: "bar" }, 'secret');

var token = jwt.sign({ foo: "bar" }, `secret`);
```

## Compliant Code Examples
```javascript
var jwt = require("jsonwebtoken");

  var token = jwt.sign({ foo: "bar" }, process.env.JWT_SECRET);
```
