---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-common-security/axios-avoid-insecure-http
  language: JavaScript
  severity: Warning
title: Avoid insecure HTTP requests with Axios
---
## Metadata
**ID:** `javascript-common-security/axios-avoid-insecure-http`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

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
