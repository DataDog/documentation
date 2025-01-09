---
aliases:
- /continuous_integration/static_analysis/rules/javascript-express/missing-helmet
- /static_analysis/rules/javascript-express/missing-helmet
dependencies: []
disable_edit: true
group_id: javascript-express
meta:
  category: Security
  id: javascript-express/missing-helmet
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Express application should use Helmet
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-express/missing-helmet`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [693](https://cwe.mitre.org/data/definitions/693.html)

## Description
Per [Express documentation](https://expressjs.com/en/advanced/best-practice-security.html#use-helmet): 

> [Helmet](https://helmetjs.github.io/) can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.

This rule will check whether you've set `app.use(helmet())` within the file that you've called `express()`

## Non-Compliant Code Examples
```javascript
const express = require("express")

const app = express();

// no `app.use(helmet())` helmet detected in the file

app.get("/foo", (req, res) => res.send("foo"));

app.listen(8000);
```

## Compliant Code Examples
```javascript
const express = require("express")
const helmet = require("helmet")

const app = express();

app.use(json()); // helmet detected
app.use(helmet()); // helmet detected

app.get("/foo", (req, res) => res.send("foo"));

app.listen(8000);
```

```javascript
import express from "express"
import helmet from "helmet"

const app = express();

app.use(helmet()); // helmet detected

app.get("/foo", (req, res) => res.send("foo"));

app.listen(8000);
```
