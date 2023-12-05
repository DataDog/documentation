---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-node-security/detect-non-literal-regexp
  language: TypeScript
  severity: Warning
title: Detects non-literal values in regular expressions
---
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
var a = new RegExp('ab+c', 'i');

```
