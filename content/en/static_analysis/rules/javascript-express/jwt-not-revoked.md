---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-express/jwt-not-revoked
  language: JavaScript
  severity: Warning
title: Ensure an isRevoked method is used for tokens
---
## Metadata
**ID:** `javascript-express/jwt-not-revoked`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
Consider a method to revoke JWTs, especially when they contain sensitive information, to ensure they remain short-lived.

#### Learn More
- [ExpressJWT revoking documentation](https://github.com/auth0/express-jwt#revoked-tokens)

## Non-Compliant Code Examples
```javascript
const { expressjwt: jwt } = require("express-jwt")

app.get(
  "/protected",
  jwt({
    secret: "shhhhhhared-secret",
    algorithms: ["HS256"]
  }),
  function (req, res) {
    if (!req.auth.admin) return res.sendStatus(401);
    res.sendStatus(200);
  }
);
```

```javascript
import { expressjwt } from "express-jwt";

app.get(
  "/protected",
  expressjwt({
    secret: "shhhhhhared-secret",
    algorithms: ["HS256"],
  }),
  function (req, res) {
    if (!req.auth.admin) return res.sendStatus(401);
    res.sendStatus(200);
  }
);
```

## Compliant Code Examples
```javascript
const { expressjwt } = require("express-jwt")

app.get(
  "/protected",
  expressjwt({
    secret: "shhhhhhared-secret",
    algorithms: ["HS256"],
    isRevoked: isRevokedCallback,
  }),
  function (req, res) {
    if (!req.auth.admin) return res.sendStatus(401);
    res.sendStatus(200);
  }
);
```

```javascript
import { expressjwt as jwt } from "express-jwt";

app.get(
  "/protected",
  jwt({
    secret: "shhhhhhared-secret",
    algorithms: ["HS256"],
    isRevoked: isRevokedCallback,
  }),
  function (req, res) {
    if (!req.auth.admin) return res.sendStatus(401);
    res.sendStatus(200);
  }
);
```
