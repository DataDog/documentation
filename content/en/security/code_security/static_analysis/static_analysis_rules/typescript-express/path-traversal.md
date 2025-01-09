---
aliases:
- /continuous_integration/static_analysis/rules/typescript-express/path-traversal
- /static_analysis/rules/typescript-express/path-traversal
dependencies: []
disable_edit: true
group_id: typescript-express
meta:
  category: Security
  id: typescript-express/path-traversal
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid allowing access to unintended directories or files
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-express/path-traversal`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

**CWE**: [22](https://cwe.mitre.org/data/definitions/22.html)

## Description
By not sanitizing user input prior to using it in path resolution methods you open your application's access to unintended directories and files.

> If you're using `replace` on a user input, this rule will assume you've done so correctly and will not report a violation

#### Learn More
- [OWASP path traversal](https://owasp.org/www-community/attacks/Path_Traversal)

## Non-Compliant Code Examples
```typescript
import path from "path";

app.get("/", (req: Request, res: Response) => {
  path.join("/user/", req.params.path)

  const pathname = path.join("/public/", req.body.foo)
  path.resolve(pathname)

  path.resolve(__dirname, req.body.foo)
  path.resolve(__dirname, `${req.body.foo}`)
})
```

## Compliant Code Examples
```typescript
import path from "path";

app.get("/", (req: Request, res: Response) => {
  path.join("/user/", req.params.path.replace(/^(\.\.(\/|\\|$))+/, ''))

  const pathname = path.join("/public/", req.body.foo.replace(/^(\.\.(\/|\\|$))+/, ''))
  path.resolve(pathname)

  path.resolve(__dirname, req.body.foo.replace(/^(\.\.(\/|\\|$))+/, ''))
  path.resolve(__dirname, `${req.body.foo.replace(/^(\.\.(\/|\\|$))+/, '')}`)
})
```
