---
aliases:
- /continuous_integration/static_analysis/rules/typescript-express/insecure-allow-origin
- /static_analysis/rules/typescript-express/insecure-allow-origin
dependencies: []
disable_edit: true
group_id: typescript-express
meta:
  category: Security
  id: typescript-express/insecure-allow-origin
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid using an insecure Access-Control-Allow-Origin header
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-express/insecure-allow-origin`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

**CWE**: [346](https://cwe.mitre.org/data/definitions/346.html)

## Description
Setting an Access-Control-Allow-Origin header with an unverified user-defined input can lead to sharing sensitive data with an unintended user.

If this is unavoidable, consider comparing the input against a safe-list.

#### Learn More

- [OWASP Origin & Access-Control-Allow-Origin](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side_Testing/07-Testing_Cross_Origin_Resource_Sharing)


## Non-Compliant Code Examples
```typescript
app.get('/', function (req: Request, res: Response) {
    res.set('Access-Control-Allow-Origin', req.headers.foo)
    res.set({ "foo": "bar", 'Access-Control-Allow-Origin': req.query.foo })
    res.header('Access-Control-Allow-Origin', req.params.foo)
    res.setHeader('Access-Control-Allow-Origin', req.body.foo);
    res.writeHead(200, { "foo": "bar", 'Access-Control-Allow-Origin': req.cookies.foo })
});
```

## Compliant Code Examples
```typescript
app.get('/', function (req: Request, res: Response) {
    res.set('Access-Control-Allow-Origin', "foo_url")
    res.set({ "foo": "bar", 'Access-Control-Allow-Origin': "foo_url" })
    res.header('Access-Control-Allow-Origin', "foo_url")
    res.setHeader('Access-Control-Allow-Origin', "foo_url");
    res.writeHead(200, { "foo": "bar", 'Access-Control-Allow-Origin': "foo_url" })
});
```
