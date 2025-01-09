---
aliases:
- /continuous_integration/static_analysis/rules/javascript-express/external-filename-upload
- /static_analysis/rules/javascript-express/external-filename-upload
dependencies: []
disable_edit: true
group_id: javascript-express
meta:
  category: Security
  id: javascript-express/external-filename-upload
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid using unsanitized user input with sendFile
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-express/external-filename-upload`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [73](https://cwe.mitre.org/data/definitions/73.html)

## Description
Using unsanitized user input in a `sendFile` method can allow attackers to access unintended resources.

Set the `root` option directly in your `sendFile` options will make this rule not report a violation.

#### Learn More
- [Express sendFile API reference](http://expressjs.com/en/5x/api.html#res.sendFile)

## Non-Compliant Code Examples
```javascript
app.post("/upload", (req, res) => {
    res.sendFile(req.params.filename)

    // options passed, but no root set
    res.sendFile(req.params.filename, { maxAge: 0 })

    // options passed, but no root set, and a callback is set
    res.sendFile(req.params.filename, { maxAge: 0 }, (err) => console.log(err))
})
```

## Compliant Code Examples
```javascript
app.post("/upload", (req, res) => {
    res.sendFile("foo")

    const options = { maxAge: 0, root: path.join(__dirname, "upload") }

    // options with root set
    res.sendFile(req.params.filename, options)
    res.sendFile(req.params.filename, { maxAge: 0, root: path.join(__dirname, "upload") })

    // options with root set (and a callback is set)
    res.sendFile(req.params.filename, options, (err) => console.log(err))
    res.sendFile(req.params.filename, { maxAge: 0, root: path.join(__dirname, "upload") }, (err) => console.log(err))
})
```
