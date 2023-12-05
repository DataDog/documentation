---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-express/external-resource
  language: TypeScript
  severity: Warning
title: Avoid rendering resource based on unsanitized user input
---
## Metadata
**ID:** `typescript-express/external-resource`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Rendering resources based on unsanitized user input should be avoided. At a minimum, one should use a safelist to restrict the potential resources that are exposed.

## Non-Compliant Code Examples
```typescript
app.get("/", (req: Request, res: Response) => {
    res.render(req.body.path)
    res.render(req.cookies.path)
    res.render(req.headers.path)
    res.render(req.params.path)
    res.render(req.query.path)
})
```

## Compliant Code Examples
```typescript
app.get("/", (req: Request, res: Response) => {
    const path = req.body.path
    if (["posts", "pages"].includes(path)) {
        return res.render(`${path}/success`)
    }
    res.render("error-page")
})
```
