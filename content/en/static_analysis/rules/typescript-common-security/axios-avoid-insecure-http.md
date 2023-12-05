---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-common-security/axios-avoid-insecure-http
  language: TypeScript
  severity: Warning
title: Avoid insecure HTTP requests with Axios
---
## Metadata
**ID:** `typescript-common-security/axios-avoid-insecure-http`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Avoid connecting to `http` services. Use `https` services for security reasons.

## Non-Compliant Code Examples
```typescript
const dataFromBackend = axios.get('http://backend.my.app')

```

## Compliant Code Examples
```typescript
const dataFromBackend = axios.get('https://backend.my.app')

```
