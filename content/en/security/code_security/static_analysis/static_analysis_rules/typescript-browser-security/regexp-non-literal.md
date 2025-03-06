---
aliases:
- /code_analysis/static_analysis_rules/typescript-browser-security/regexp-non-literal
- /continuous_integration/static_analysis/rules/typescript-browser-security/regexp-non-literal
- /static_analysis/rules/typescript-browser-security/regexp-non-literal
dependencies: []
disable_edit: true
group_id: typescript-browser-security
meta:
  category: Security
  id: typescript-browser-security/regexp-non-literal
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Do not use variable for regular expressions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-browser-security/regexp-non-literal`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

**CWE**: [1333](https://cwe.mitre.org/data/definitions/1333.html)

## Description
Regular expressions should not use a variable as an argument since an attacker may inject values and cause a regular expression denial of service (ReDoS). Instead, use a library like [recheck](https://www.npmjs.com/package/recheck) to check that no DoS can be triggered by regular expression.

## Non-Compliant Code Examples
```typescript
const foo = new RegExp(req.something);
const bar = new RegExp(variable);
```

## Compliant Code Examples
```typescript
const foo = new RegExp(`^\\d+-${topicId}$`);
const foo = new RegExp(/something/);
const foo = new RegExp("weofiwje");
```
