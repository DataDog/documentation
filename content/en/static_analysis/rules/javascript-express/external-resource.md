---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-express/external-resource
  language: JavaScript
  severity: Warning
title: Avoid rendering resource based on unsanitized user input
---
## Metadata
**ID:** `javascript-express/external-resource`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
Rendering resources based on unsanitized user input should be avoided. At a minimum, one should use a safelist to restrict the potential resources that are exposed.

## Non-Compliant Code Examples
```javascript
app.get("/", (req, res) => {
    res.render(req.body.path)
    res.render(req.cookies.path)
    res.render(req.headers.path)
    res.render(req.params.path)
    res.render(req.query.path)
})
```

## Compliant Code Examples
```javascript
app.get("/", (req, res) => {
    const path = req.body.path
    if (["posts", "pages"].includes(path)) {
        return res.render(`${path}/success`)
    }
    res.render("error-page")
})
```
