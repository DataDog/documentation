---
aliases:
- /continuous_integration/static_analysis/rules/typescript-express/external-resource
- /static_analysis/rules/typescript-express/external-resource
dependencies: []
disable_edit: true
group_id: typescript-express
meta:
  category: Security
  id: typescript-express/external-resource
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid rendering resource based on unsanitized user input
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-express/external-resource`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

**CWE**: [706](https://cwe.mitre.org/data/definitions/706.html)

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
