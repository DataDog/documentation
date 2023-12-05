---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-express/path-traversal
  language: JavaScript
  severity: Warning
title: Avoid allowing access to unintended directories or files
---
## Metadata
**ID:** `javascript-express/path-traversal`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
By not sanitizing user input prior to using it in path resolution methods you open your application's access to unintended directories and files.

> If you're using `replace` on a user input, this rule will assume you've done so correctly and will not report a violation

#### Learn More
- [OWASP path traversal](https://owasp.org/www-community/attacks/Path_Traversal)

## Non-Compliant Code Examples
```javascript
const path = require("path");

app.get("/", (req, res) => {
  path.join("/user/", req.params.path)

  var pathname = path.join("/public/", req.body.foo)
  path.resolve(pathname)

  path.resolve(__dirname, req.body.foo)
  path.resolve(__dirname, `${req.body.foo}`)
})
```

## Compliant Code Examples
```javascript
const path = require("path");

app.get("/", (req, res) => {
  path.join("/user/", req.params.path.replace(/^(\.\.(\/|\\|$))+/, ''))

  var pathname = path.join("/public/", req.body.foo.replace(/^(\.\.(\/|\\|$))+/, ''))
  path.resolve(pathname)

  path.resolve(__dirname, req.body.foo.replace(/^(\.\.(\/|\\|$))+/, ''))
  path.resolve(__dirname, `${req.body.foo.replace(/^(\.\.(\/|\\|$))+/, '')}`)
})
```
