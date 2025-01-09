---
aliases:
- /continuous_integration/static_analysis/rules/javascript-express/access-restriction
- /static_analysis/rules/javascript-express/access-restriction
dependencies: []
disable_edit: true
group_id: javascript-express
meta:
  category: Security
  id: javascript-express/access-restriction
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Limit exposure to sensitive directories and files
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-express/access-restriction`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [548](https://cwe.mitre.org/data/definitions/548.html)

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
