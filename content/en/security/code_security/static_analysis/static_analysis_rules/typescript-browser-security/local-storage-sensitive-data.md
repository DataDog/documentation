---
aliases:
- /continuous_integration/static_analysis/rules/typescript-browser-security/local-storage-sensitive-data
- /static_analysis/rules/typescript-browser-security/local-storage-sensitive-data
dependencies: []
disable_edit: true
group_id: typescript-browser-security
meta:
  category: Security
  id: typescript-browser-security/local-storage-sensitive-data
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Do not store sensitive data to local storage
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-browser-security/local-storage-sensitive-data`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

**CWE**: [312](https://cwe.mitre.org/data/definitions/312.html)

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
