---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: typescript-browser-security/local-storage-sensitive-data
  language: TypeScript
  severity: Warning
title: Do not store sensitive data to local storage
---
## Metadata
**ID:** `typescript-browser-security/local-storage-sensitive-data`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
Do not store sensitive data in `localStorage` and keep the data safe from any malicious software that could read this data.

#### Learn More
 - [CWE-312 - Cleartext Storage of Sensitive Information](https://cwe.mitre.org/data/definitions/312.html)

## Non-Compliant Code Examples
```typescript
localStorage.setItem('user', email)

localStorage.setItem('user', user.email)
```

## Compliant Code Examples
```typescript
localStorage.setItem('user', uuid)

localStorage.setItem('user', user.id)
```
