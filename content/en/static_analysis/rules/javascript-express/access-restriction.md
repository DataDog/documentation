---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-express/access-restriction
  language: JavaScript
  severity: Warning
title: Limit exposure to sensitive directories and files
---
## Metadata
**ID:** `javascript-express/access-restriction`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
Exposing a directory listing could present an attacker an opportunity to access source code or other sensitive data through a file structure exploit. Restricting access to non-sensitive directories and files is strongly suggested.

#### Learn More
- [Express Serve index middleware](https://expressjs.com/en/resources/middleware/serve-index.html)


## Non-Compliant Code Examples
```javascript
const express = require("express")
const serveIndex = require("serve-index")

const app = express()

app.use(serveIndex())
```

## Compliant Code Examples
```javascript
const express = require("express")
const serveIndex = require("serve-index")

const app = express()

app.use(serveIndex("/public"))
```
