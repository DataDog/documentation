---
aliases:
- /continuous_integration/static_analysis/rules/javascript-common-security/axios-avoid-insecure-http
- /static_analysis/rules/javascript-common-security/axios-avoid-insecure-http
dependencies: []
disable_edit: true
group_id: javascript-common-security
meta:
  category: Security
  id: javascript-common-security/axios-avoid-insecure-http
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid insecure HTTP requests with Axios
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-common-security/axios-avoid-insecure-http`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [319](https://cwe.mitre.org/data/definitions/319.html)

## Description
Avoid connecting to `http` services. Use `https` services for security reasons.

## Non-Compliant Code Examples
```javascript
const dataFromBackend = axios.get('http://backend.my.app')

```

## Compliant Code Examples
```javascript
const dataFromBackend = axios.get('https://backend.my.app')

```
