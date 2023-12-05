---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-express/external-filename-upload
  language: JavaScript
  severity: Warning
title: Avoid using unsanitized user input with sendFile
---
## Metadata
**ID:** `javascript-express/external-filename-upload`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

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
