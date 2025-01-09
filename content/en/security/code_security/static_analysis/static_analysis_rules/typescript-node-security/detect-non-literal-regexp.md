---
aliases:
- /continuous_integration/static_analysis/rules/typescript-node-security/detect-non-literal-regexp
- /static_analysis/rules/typescript-node-security/detect-non-literal-regexp
dependencies: []
disable_edit: true
group_id: typescript-node-security
meta:
  category: Security
  id: typescript-node-security/detect-non-literal-regexp
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Detects non-literal values in regular expressions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-node-security/detect-non-literal-regexp`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Creating a regular expression with user input is a security vulnerability as it could lead to a Regular Expression Denial of Service attack. In this type of attack a user could submit a very complex regular expression that takes too long to execute.

If you have an advanced use case that requires regex evaluation with user input always make sure to sanitize the data and provide a safe timeout environment.

## Non-Compliant Code Examples
```typescript
var a = new RegExp(c, 'i');
```

## Compliant Code Examples
```typescript
const REGEX = "regex"

const a = new RegExp('ab+c', 'i');
const b = new RegExp(REGEX, 'i');
```
